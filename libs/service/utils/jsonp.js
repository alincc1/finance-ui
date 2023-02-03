const mapData = {}
const jsonQueue = {}
const scriptELement = {}
const jsonCall = {}
const jsonpMap = function (data) {
  data.UTF8Encoding = false
  mapData[window._zqMapCode] = data
  if (jsonQueue[window._zqMapCode]) {
    jsonQueue[window._zqMapCode].forEach(func => {
      func(data)
    })
  }
  delete jsonCall[window._zqMapCode]
  if (scriptELement[window._zqMapCode]) {
    scriptELement[window._zqMapCode].remove()
    delete scriptELement[window._zqMapCode]
  }
}

export default {
  async loadMapJson (url, call) {
    window.jsonp = {}
    if (!window.jsonp.map) {
      window.jsonp.map = jsonpMap
    }
    const code = window._zqMapCode = url.split('/').pop().slice(0, -8)
    if (mapData[code]) {
      return call && call(mapData[code])
    }
    if (jsonQueue[code]) {
      jsonQueue[code].push(call)
      return
    }
    jsonQueue[code] = [call]
    const script = scriptELement[code] = document.createElement('script')
    script.src = url
    document.body.appendChild(script)
  }
}
