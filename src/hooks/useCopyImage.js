// import { useRef } from "react";
import { toPng, toJpeg, toSvg } from "html-to-image";
import { dataURItoBlob } from "../utils/utils";
import { Toast } from "@douyinfe/semi-ui";
import { useTranslation } from "react-i18next";
/**
 * 
 * toPng(document.getElementById("canvas")).then(function (dataUrl) {
      const blob = dataURItoBlob(dataUrl);
      navigator.clipboard
        .write([new ClipboardItem({ "image/png": blob })])
        .then(() => {
          Toast.success(t("copied_to_clipboard"));
        })
        .catch(() => {
          Toast.error(t("oops_smth_went_wrong"));
        });
    });
 */
export default function useCopyImage() {
  const { t } = useTranslation();

  /**
   * 将DOM元素复制到剪贴板作为图像
   * @param {HTMLElement|React.RefObject} element - 要复制的DOM元素或React引用
   * @param {Object} options - 复制选项
   * @param {string} options.type - 图像类型 (png, jpeg, svg)，默认为png
   * @param {Object} options.imageOptions - 传递给html-to-image的选项
   */
  const copyElement = (element, options = {}) => {
    let { type = "png", imageOptions = {} } = options;
    if (!element) {
      Toast.error(t("图片复制失败"));
      return;
    }

    // 如果传入的是React ref，则获取其current属性
    const targetElement = element?.current || element;

    if (!targetElement) {
      Toast.error(t("图片复制失败"));
      return;
    }

    let convertFunction;
    let mimeType;

    switch (type) {
      case "jpeg":
        convertFunction = toJpeg;
        mimeType = "image/jpeg";
        break;
      // TODO: 如果用svg，不会成功
      /**
       * InvalidCharacterError: Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.
       * at dataURItoBlob (utils.js:4:22)
       * at useCopyImage.js:71:22
       */
      case "svg":
        convertFunction = toSvg;
        imageOptions = Object.assign(imageOptions, {
          filter: (node) => node.tagName !== "i",
        });
        mimeType = "image/svg+xml";
        break;
      case "png":
      default:
        convertFunction = toPng;
        mimeType = "image/png";
        break;
    }

    convertFunction(targetElement, imageOptions)
      .then((dataUrl) => {
        console.log(dataUrl);
        const blob = dataURItoBlob(dataUrl);
        navigator.clipboard
          .write([new ClipboardItem({ [mimeType]: blob })])
          .then(() => {
            Toast.success(t("图片已复制到剪贴板"));
          })
          .catch((e) => {
            console.log(e);
            Toast.error(t("图片复制失败"));
          });
      })
      .catch((e) => {
        console.log(e);
        Toast.error(t("图片复制失败"));
      });
  };

  return { copyElement };
}
