function ueditorRender (ele) {
  const imgs = [].slice.call(ele.querySelectorAll('img'))
  // 文本编辑器里的图片路径处理
  imgs.forEach(img => {
    img.onerror = () => {
      if (img.errorLoaded) { return }
      img.errorLoaded = true
      let src = img.getAttribute('_src') || img.getAttribute('src')
      if (/^\/\w+/.test(src)) {
        src = window.CONFIG.BASE_API_URL.slice(0, -10) + '/upload' + src
      }
      img.src = src
    }
  })
}

export default {
  ueditorRender: {
    inserted (el, building) {
      ueditorRender(el)
    },
    componentUpdated (el, building) {
      ueditorRender(el)
    }
  }
}
