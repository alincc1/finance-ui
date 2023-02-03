/* eslint-disable prefer-const */
/* eslint-disable one-var,no-undef */
export default {
  getMd5: async file => {
    await window.Z.service.utils.script.install('jsSparkMd5')
    return new Promise((resolve, reject) => {
      if (typeof SparkMD5 === 'undefined') { return resolve(('h5-' + Date.now() + Math.random()).replace('.', '-')) }
      let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
        chunkSize = 104857600, // Read in chunks of 100MB
        chunks = Math.ceil(file.size / chunkSize),
        currentChunk = 0,
        spark = new SparkMD5.ArrayBuffer(),
        fileReader = new FileReader()
      fileReader.onload = function (e) {
        console.log('read chunk nr', currentChunk + 1, 'of', chunks)
        window.Z.service.utils.upload.setProgressText(`分析文件结构进度${(currentChunk / chunks * 100) | 0}%`)
        spark.append(e.target.result) // Append array buffer
        currentChunk++

        if (currentChunk < chunks) {
          loadNext()
        } else {
          const md5 = spark.end()
          console.log('finished loading')
          console.info('computed hash') // Compute hash
          window.Z.service.utils.upload.setProgressText('分析完成，准备上传...')
          // if (callback) callback('success', md5)
          resolve(md5)
        }
      }
      fileReader.onerror = function (data) {
        // if (callback) callback('error', md5)
        reject(data)
        console.warn('oops, something went wrong.')
      }

      function loadNext () {
        const start = currentChunk * chunkSize
        const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize
        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
      }
      loadNext()
    })
  }
}
