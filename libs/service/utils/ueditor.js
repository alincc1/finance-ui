// 前端加载 文本编辑器 统一字体设置
export function renderHtml (html, style = '') {
  if (!html) { return }
  return `<div style="font-size: 16px;${style}"  class="ueditor-content">
  ${html}
  </div>`
}

// 手机端渲染
export function renderAppHtml (html, style = '') {
  // 标题替换
  if (!html) { return }
  // eslint-disable-next-line prefer-regex-literals
  html = html.replace(new RegExp('font-size: 24px;', 'gm'), 'font-size: 20px;')
  return renderHtml(html, style)
}
