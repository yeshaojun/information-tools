import { ref } from "vue";
import sparkMd5 from "spark-md5";
import { getFileExt } from "./file";
const CHUNK_SIZE = 1 * 1024 * 1024;

type ChunkItem = {
  index: number;
  file: Blob;
};

type FullChunkItem = {
  hash: string;
  chunk: Blob;
  name: string;
  index: number;
  progress: number;
};

type HashType = "idle" | "worker" | "sample";

interface UploadType {
  file: File;
  chunkSize?: number;
  hashType?: HashType;
  limit?: number;
  errorCount?: number;
  checkFn: (
    ext: string,
    hash: string,
  ) => Promise<{ uploaded: boolean; uploadedList: string[] }>;
  uploadFn: (
    form: FormData,
    cb: (progress: { loaded: number; total: number }) => void,
  ) => Promise<void>;
  mergeFn: (hash: string) => Promise<void>;
}

interface FileFormItem {
  form: FormData;
  index: number;
  error: number;
}

// 创建切片
function createFileChunk(file: File, size = CHUNK_SIZE) {
  // 生成文件块 Blob.slice语法
  const chunks: ChunkItem[] = [];
  let cur = 0;
  while (cur < file.size) {
    chunks.push({ index: cur, file: file.slice(cur, cur + size) });
    cur += size;
  }
  return chunks;
}

export async function useUploadSliceFile({
  file,
  checkFn,
  uploadFn,
  mergeFn,
  chunkSize = 1,
  hashType = "idle",
  limit = 4,
  errorCount = 3,
}: UploadType) {
  const error = ref("");
  const success = ref(false);
  const loading = ref(false);
  const progress = ref(0);
  const hashProgress = ref(0);
  const chunks = ref<FullChunkItem[]>([]);
  const hash = ref("");
  const uploadChunkSize = chunkSize * CHUNK_SIZE;

  if (!file) {
    error.value = "文件不存在！";
    return;
  }
  // 1.分割文件,并设置格式
  const list = createFileChunk(file, uploadChunkSize);
  chunks.value = list.map((chunk, index) => {
    const chunkName = hash.value + "-" + index;
    return {
      hash: hash.value,
      chunk: chunk.file,
      name: chunkName,
      index,
      // 设置进度条
      progress: uploadedList.indexOf(chunkName) > -1 ? 100 : 0,
    };
  });
  // 2.生成文件hash
  if (hashType === "idle") {
    hash.value = await calculateHashIdle();
  } else if (hashType === "worker") {
    hash.value = await calculateHashWorker();
  } else if (hashType === "sample") {
    hash.value = await calculateHashSample();
  }
  // 3.检查hash上传情况
  const { uploaded, uploadedList } = await checkFn(
    getFileExt(file.name),
    hash.value,
  );
  if (uploaded) {
    // 已经上传成功
    success.value = true;
    return;
  }
  // 4.上传文件
  await uploadChunks(uploadedList);

  // 浏览器空闲计算
  function calculateHashIdle(): Promise<string> {
    return new Promise((resolve) => {
      const spark = new sparkMd5.ArrayBuffer();
      let count = 0;
      const appendToSpark = async (file: Blob) => {
        return new Promise(() => {
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = (e: ProgressEvent<FileReader>) => {
            spark.append(e.target?.result as ArrayBuffer);
          };
        });
      };
      const workLoop = async (deadline: IdleDeadline) => {
        // timeRemaining 检查是否有空余时间
        while (count < chunks.value.length && deadline.timeRemaining() > 1) {
          await appendToSpark(chunks.value[count].chunk);
          count++;
          if (count < chunks.value.length) {
            hashProgress.value = Number(
              ((100 * count) / chunks.value.length).toFixed(2),
            );
          } else {
            hashProgress.value = 100;
            resolve(spark.end());
          }
        }
      };
      window.requestIdleCallback(workLoop);
    });
  }

  // web-worker线程计算
  function calculateHashWorker(): Promise<string> {
    return new Promise((resolve) => {
      // web-worker 防止卡顿主线程
      const worker = new Worker("/hash.js");
      worker.postMessage({ chunks });
      worker.onmessage = (e) => {
        const { progress, hash } = e.data;
        hashProgress.value = Number(progress.toFixed(2));
        if (hash) {
          resolve(hash);
        }
      };
    });
  }

  // 抽样计算
  function calculateHashSample(): Promise<string> {
    return new Promise((resolve) => {
      const spark = new sparkMd5.ArrayBuffer();
      const reader = new FileReader();
      // 文件大小
      const size = file.size;
      let offset = 2 * 1024 * 1024;

      let chunks = [file.slice(0, offset)];

      // 前面100K
      let cur = offset;
      while (cur < size) {
        // 最后一块全部加进来
        if (cur + offset >= size) {
          chunks.push(file.slice(cur, cur + offset));
        } else {
          // 中间的 前中后去两个字节
          const mid = cur + offset / 2;
          const end = cur + offset;
          chunks.push(file.slice(cur, cur + 2));
          chunks.push(file.slice(mid, mid + 2));
          chunks.push(file.slice(end - 2, end));
        }
        // 前取两个子杰
        cur += offset;
      }
      // 拼接
      reader.readAsArrayBuffer(new Blob(chunks));

      // 最后100K
      reader.onload = (e: ProgressEvent) => {
        spark.append((e.target as FileReader).result as ArrayBuffer);
        hashProgress.value = 100;
        resolve(spark.end());
      };
    });
  }

  // 切片上传
  async function uploadChunks(uploadedList: string[]) {
    const needUploadList = chunks.value
      .filter((chunk) => uploadedList.indexOf(chunk.name) === -1)
      .map(({ chunk, name, hash, index }, i) => {
        const form = new FormData();
        form.append("chunkname", name);
        form.append("hash", hash);
        form.append("file", chunk);
        form.append("ext", getFileExt(file.name));
        return { form, index, error: 0 };
      });
    try {
      await sendRequest([...needUploadList], limit);
      // 如果没有报错，则进行合并
      if (uploadedList.length + list.length === chunks.value.length) {
        mergeFn && mergeFn(hash.value);
      }
    } catch (err: any) {
      // 表示重新上传试了3次，也还是有失败的
      error.value = err.message;
    }
  }

  // 上传文件，控制并发量，以及文件失败之后的重试次数
  function sendRequest(forms: FileFormItem[], limit: number) {
    return new Promise((resolve, reject) => {
      const len = forms.length;
      let counter = 0;
      let isStop = false;

      const start = async () => {
        if (isStop) {
          return;
        }
        const task = forms.shift();
        if (task) {
          const { form, index } = task;
          try {
            await uploadFn(form, (progress) => {
              chunks.value[index].progress = Number(
                ((progress.loaded / progress.total) * 100).toFixed(2),
              );
            });
            if (counter === len - 1) {
              resolve(true);
            } else {
              counter++;
              start();
            }
          } catch (error) {
            chunks.value[index].progress = -1;
            // 如果执行失败了，则尝试重新发送
            if (task.error < errorCount) {
              task.error++;
              // 队首进去 准备重试
              forms.unshift(task);
              start();
            } else {
              // 错误3次了 直接结束
              isStop = true;
              reject();
            }
          }
        }
      };

      // 并发，同时请求4次
      while (limit > 0) {
        start();
        limit -= 1;
      }
    });
  }

  return {
    error,
    success,
    loading,
    progress,
    hashProgress,
  };
}
