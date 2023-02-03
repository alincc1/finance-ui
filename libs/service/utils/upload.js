
// 设置上传中显示文字
export function setProgressText (text) {
  const loading = document.querySelector('.upload-progress-dialog .el-loading-text')
  if (!loading) { return false }
  loading.innerText = text
}
