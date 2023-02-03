export default {
  // 设置内容时 同时设置title 用于超出显示...
  title: {
    inserted (el, building) {
      el.textContent = el.title = building.value
    },
    componentUpdated (el, building) {
      el.textContent = el.title = building.value
    }
  }
}
