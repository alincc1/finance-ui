// 划词搜索
function selectionSearch (ele, val) {
  ele.classList.add('position-relative')
  ele.addEventListener('mousedown', function (e) {
    if (!e.target.classList.contains('selection-search-tooltip')) {
      clearShow()
    }
    this.isMouseDown = true
  })
  ele.addEventListener('mouseout', function (e) {
    if (e.target === ele) {
      clearShow()
      this.isMouseDown = false
    }
  })
  ele.addEventListener('mouseup', function (e) {
    if (this.isMouseDown) {
      console.log('mouseup', e)
      doSelection(this, e.layerX, e.layerY)
    }
    this.isMouseDown = false
  })
  ele.addEventListener('dbclick', function (e) {
    this.isMouseDown = false
    clearShow()
    doSelection(this, e.layerX, e.layerY)
  })
  let tooltip
  let timer

  function clearShow () {
    if (tooltip) {
      clearTimeout(timer)
      tooltip.style.display = 'none'
    }
  }

  function doSelection (ele, layerX, layerY) {
    const text = window.getSelection().toString()
    if (!text.trim() || text.length > 30) { return }
    if (!tooltip) {
      tooltip = document.createElement('div')
      tooltip.classList.add('selection-search-tooltip')
      tooltip.classList.add('position-absolute')
      tooltip.classList.add('cursor-pointer')
      tooltip.classList.add('pl-10')
      tooltip.classList.add('pr-10')
      tooltip.classList.add('fz-14')
      tooltip.style.lineHeight = '25px'
      tooltip.style.background = 'white'
      tooltip.style.color = 'rgb(1,66,154)'
      tooltip.style.border = '1px solid #333'
      tooltip.style.display = 'none'
      tooltip.style.textDecoration = 'underline'
      ele.appendChild(tooltip)
    }
    tooltip.style.left = layerX + 'px'
    tooltip.style.top = layerY - 20 + 'px'
    tooltip.innerHTML = `搜索"${text}"`
    timer = setTimeout(function () {
      tooltip.style.display = 'block';
      (function (tooltip, text) {
        tooltip.onclick = function () {
          window.Z.constant.router.push('/search?keyword=' + encodeURIComponent(text))
        }
      })(tooltip, text)
    }, 500)
  }
}

export default {
  selectionSearch: {
    inserted (el, building) {
      if (window.Z.service.robot.common.enumConfig.getValue('regionConfig.www.search.config', {}, 'root').delimit !== 'Y') { return false }
      selectionSearch(el, building.value)
    },
    unbind (el, building) {
    }
  }
}
