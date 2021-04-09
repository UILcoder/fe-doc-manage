import Vue from 'vue'
// import config from '@/config'

// 防止重复点击, 默认间隔时间1秒
export const preventReClick = Vue.directive('preventReClick', {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      const temp = el;
      if (!temp.disabled) {
        temp.disabled = true;
        setTimeout(() => {
          temp.disabled = false;
        }, binding.value || 1000);
      }
    });
  }
});



/**
 * 检测图片是否存在
 * @param url
 */
const imageIsExist = url => new Promise((resolve) => {
  let img = new Image()
  img.onload = function () {
    // 如果浏览器已完成对图像的加载
    if (this.complete) {
      resolve(true)
      img = null
    }
  }
  img.onerror = function () {
    resolve(false)
    img = null
  }
  img.src = url
})

// 默认图片地址 只能用于img标签
// const defaultImgSrc = `${config.STATIC_URL}/default.png`
const defaultImgSrc = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'

export const defaultImg = Vue.directive('defaultImg', async (el) => {
  console.log(el)
  const realImgSrc = el.getAttribute('src')
  el.setAttribute('src', defaultImgSrc)
  if (realImgSrc && realImgSrc !== defaultImgSrc) {
    const exist = await imageIsExist(realImgSrc)
    if (exist) {
      el.setAttribute('src', realImgSrc)
    }
  }
})


