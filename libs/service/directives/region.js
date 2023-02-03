export default {
  regionName: {
    inserted (el, building) {
      if (isNaN(building.value)) {
        el.innerHTML = el.title = building.value
        return
      }
      el.__$lastRegionValue = building.value
      el.isSearch = true
      window.Z.global.base.getRegionName(building.value, name => {
        name = name.replace(/\w+/, '')
        el.isSearch = false
        el.innerHTML = el.title = name
      }, building.modifiers.join ? ' ' : '')
    },
    componentUpdated (el, building) {
      if (isNaN(building.value)) {
        el.innerHTML = el.title = building.value
        return
      }
      if (el.__$lastRegionValue === building.value) { return }
      el.__$lastRegionValue = building.value
      if (!el.isSearch) {
        el.isSearch = true
        window.Z.global.base.getRegionName(building.value, name => {
          name = name.replace(/\w+/, '')
          el.isSearch = false
          el.innerHTML = el.title = name
        }, building.modifiers.join ? ' ' : '')
      }
    }
  },
  regionOneName: {
    inserted (el, building) {
      el.__$lastRegionOneValue = building.value
      el.innerHTML = el.title = window.Z.service.utils.region.getRegionName(building.value)
    },
    componentUpdated (el, building) {
      if (el.__$lastRegionOneValue === building.value) { return }
      el.__$lastRegionOneValue = building.value
      el.innerHTML = el.title = window.Z.service.utils.region.getRegionName(building.value)
    }
  }
}
