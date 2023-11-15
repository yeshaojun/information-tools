// 判断图片格式以及长宽等信息(比image.onload方法性能开销会小很多)
function getImageInfo(file: File) {
  let width = 0;
  let height = 0;
  return new Promise((resolve, reject) => {
    if (file.type.match("image.*")) {
      const blobSlice = file.slice(0, 4); // Read the first 4 bytes
      const reader = new FileReader();
      reader.onload = function (event: ProgressEvent) {
        const view = new DataView(
          (event.target as FileReader).result as ArrayBuffer,
        );
        let format = "";
        if (view.getUint16(0, false) == 0xffd8) {
          format = "JPEG";
          const markerLength = view.byteLength;
          let offset = 2; // Start after the SOI marker

          while (offset < markerLength) {
            const marker = view.getUint16(offset, false);
            offset += 2;

            if (marker >= 0xffc0 && marker <= 0xffc3) {
              // Found SOF marker (Start Of Frame)
              offset += 3; // Skip the marker length and precision
              height = view.getUint16(offset, false);
              offset += 2;
              width = view.getUint16(offset, false);
              break;
            } else {
              offset += view.getUint16(offset, false);
            }
          }
        } else if (view.getUint32(0, false) == 0x89504e47) {
          width = view.getUint32(16, false);
          height = view.getUint32(20, false);
          format = "PNG";
        } else if (view.getUint32(0, false) == 0x47494638) {
          width = view.getUint16(6, true);
          height = view.getUint16(8, true);
          format = "GIF";
        } else if (view.getUint16(0, false) === 0x4d42) {
          // bmp
          width = view.getUint32(18, true);
          height = view.getUint32(22, true);
          format = "BMP";
        } else {
          format = "Unknown";
        }
        resolve({
          format,
          width,
          height,
        });
      };
      reader.readAsArrayBuffer(blobSlice);
    } else {
      reject("文件格式错误！");
    }
  });
}

function blobToData(blob: Blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.readAsBinaryString(blob);
  });
}

function getFileExt(filename: string): string {
  return filename.split(".").pop() || "";
}

export { getImageInfo, blobToData, getFileExt };
