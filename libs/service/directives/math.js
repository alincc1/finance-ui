function toFixed (el, building) {
  let num = building.value
  if (!num && building.modifiers.empty) {
    el.innerHTML = ''
    return
  }
  if (num === 0) {
    el.innerHTML = 0
    return
  }
  num -= 0
  el.innerHTML = ''
  if (!num) {
    if (building.modifiers.zero) { el.innerHTML = 0 }
    return 0
  }
  el.innerHTML = num.toFixed(building.modifiers.two ? 2 : 4)
}

export default {
  toFixed: {
    inserted (el, building, vnode) {
      toFixed(el, building)
    },
    componentUpdated (el, building, vnode) {
      toFixed(el, building)
    }
  }
}
