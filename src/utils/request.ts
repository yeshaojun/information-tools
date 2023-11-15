// 仿useFetch
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { toValue, type MaybeRefOrGetter, type Fn } from "@vueuse/core";
import { ref, shallowRef, toRef, watch, type Ref } from "vue";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "";

export interface BeforeFetchContext {
  url: string;
  options: Omit<AxiosRequestConfig, "url">;
  cancel: Fn;
}

export interface UseRequestReturn<T> {
  error: Ref<any>;
  data: Ref<T | null>;
  statusCode: Ref<number | null>;
  response: Ref<AxiosResponse | null>;
  loading: Ref<boolean>;
  isFinished: Ref<boolean>;
  aborted: Ref<boolean>;
  execute: () => Promise<any>;
}

interface useRequestOption {
  immediate?: boolean;
  refetch?: boolean;
  beforeRequest?: (ctx: BeforeFetchContext) => Promise<any>;
}

export function useRequest<T>(
  url: MaybeRefOrGetter<string>,
): UseRequestReturn<T> & PromiseLike<UseRequestReturn<T>>;
export function useRequest<T>(
  url: MaybeRefOrGetter<string>,
  axiosOptions: Omit<AxiosRequestConfig, "url">,
): UseRequestReturn<T> & PromiseLike<UseRequestReturn<T>>;
export function useRequest<T>(
  url: MaybeRefOrGetter<string>,
  axiosOptions: Omit<AxiosRequestConfig, "url">,
  useRequestOption: useRequestOption,
): UseRequestReturn<T> & PromiseLike<UseRequestReturn<T>>;
export function useRequest<T>(
  url: MaybeRefOrGetter<string>,
  ...args: any[]
): UseRequestReturn<T> & PromiseLike<UseRequestReturn<T>> {
  const token = localStorage.getItem("token") || "";
  // 创建一个 CancelToken.source
  // let cancelSource = axios.CancelToken.source();
  let controller: AbortController | undefined;
  let options: useRequestOption = { immediate: true, refetch: false };
  let requestOptions: any = {
    method: "GET",
  };
  const defaultOptions = {
    headers: {
      token,
    },
  };
  if (args.length > 0) {
    requestOptions = { ...requestOptions, ...args[0] };
  }

  if (args.length === 2) {
    options = { ...options, ...args[1] };
  }

  const error = shallowRef<any>(null);
  const data = shallowRef<any>(null);
  const statusCode = ref<number | null>(null);
  const response = shallowRef<AxiosResponse | null>(null);
  const loading = ref(false);
  const isFinished = ref(false);
  const aborted = ref(false);

  const setLoading = (isLoading: boolean) => {
    loading.value = isLoading;
    isFinished.value = !isLoading;
  };

  const abort = () => {
    controller?.abort();
    controller = new AbortController();
    controller.signal.onabort = () => (aborted.value = true);
    requestOptions = {
      ...requestOptions,
      signal: controller.signal,
    };
  };

  const execute = async () => {
    // 1. 取消 about,避免频繁重复请求
    abort();
    // 2. set loading
    setLoading(true);

    error.value = null;
    statusCode.value = null;
    aborted.value = false;

    let isCanceled = false;

    const context = {
      url: toValue(url),
      options: requestOptions,
      cancel: () => {
        isCanceled = true;
      },
    };

    if (options.beforeRequest) {
      Object.assign(context, await options.beforeRequest(context));
      console.log("context", context);
    }

    if (isCanceled) {
      setLoading(false);
      return Promise.resolve(null);
    }
    return new Promise<AxiosResponse | null>((resolve, reject) => {
      axios({
        url: context.url,
        ...context.options,
        headers: {
          ...defaultOptions.headers,
          ...context.options?.headers,
        },
      })
        .then((res: AxiosResponse) => {
          response.value = res;
          console.log("4");
          resolve(null);
          if (res.status === 200) {
            statusCode.value = res.data.code;
            // 请求成功
            if (res.data.code === 0) {
              // 预期结果
              data.value = res.data.data;
            } else if (res.data.code === 401) {
              // 去登录页面
            }
          } else {
            error.value = res.data.msg;
          }
        })
        .catch((err) => {
          error.value = err;
          return reject(err);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const refetch = toRef(options.refetch);

  watch([refetch, toRef(url)], ([refetch]) => refetch && execute(), {
    deep: true,
  });

  function until() {
    let stop: Function | null = null;
    return new Promise((resolve) => {
      watch([isFinished], ([v1]) => {
        if (v1 === true) {
          stop?.();
          resolve(v1);
        }
      });
    });
  }

  function waitUntilFinished() {
    return new Promise<UseRequestReturn<T>>((resolve, reject) => {
      until()
        .then(() => resolve(shell))
        .catch((error) => reject(error));
    });
  }

  const shell: UseRequestReturn<T> = {
    error,
    data,
    statusCode,
    response,
    loading,
    isFinished,
    aborted,
    execute,
  };

  if (options.immediate) {
    Promise.resolve().then(() => execute());
  }

  // 为了确保，某些时候需要保证执行顺序，加一个then方法
  return {
    ...shell,
    then(onFulfilled, onRejected) {
      return waitUntilFinished().then(onFulfilled, onRejected);
    },
  };
}

// axios返回结果全局处理
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    console.log("error", error.message);
    // throw error
    return Promise.reject(error.message || "接口请求异常");
  },
);

// 如果useFetch使用习惯的话，建议使用useFetch
// 下面为实现代码
// 具体用法可以参考我的文章： https://juejin.cn/post/7238911457847623736 【也可以阅读源码。实现并不复杂】
// import { createFetch } from '@vueuse/core'

// const base = 'https://api.yeshaojun.com/v1/'
// const useMyFetch = createFetch({
//   baseUrl: base,
//   options: {
//     beforeFetch(ctx: any) {
//       ctx.options.headers.token = (localStorage.getItem('token') as string) || ''
//       return ctx
//     },
//     onFetchError(ctx) {
//       console.log('ctx', ctx)
//       if (JSON.parse(ctx.data).errorCode === 10006) {
//         window.location.href = '/login'
//         localStorage.clear()
//         return ctx
//       }
//       const msg = JSON.parse(ctx.data).msg
//       if (typeof msg === 'string') {
//       } else {
//       }
//       return Promise.reject(msg)
//     }
//   },
//   fetchOptions: {
//     mode: 'cors'
//   }
// })

// export { useMyFetch }
