const fs = require('fs');
const path = require('path');
const { parse } = require('@vue/compiler-sfc');
const { compile } = require('@vue/compiler-dom');

const pagesDir = path.join(__dirname, 'src/pages');
const outputDir = path.join(__dirname, 'allhtml');

// 创建输出目录
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

// Vue3 CDN链接
const vueCDN = 'https://unpkg.com/vue@3.4.21/dist/vue.global.js';

// 遍历pages目录
fs.readdirSync(pagesDir).forEach(dir => {
  const vueFile = path.join(pagesDir, dir, 'index.vue');
  if (fs.existsSync(vueFile)) {
    const content = fs.readFileSync(vueFile, 'utf-8');
    
    // 解析Vue组件
    const { descriptor } = parse(content);
const template = compile(descriptor.template.content, {
  mode: 'module',
  isBrowser: false
}).code.replace('export function render', 'function render');
    
    // 生成HTML结构
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${dir}</title>
  <script src="${vueCDN}"></script>
  <script src="https://unpkg.com/pinia@3.0.1/dist/pinia.iife.js"></script>
  <script src="https://unpkg.com/axios@1.8.4/dist/axios.min.js"></script>
  <style>${descriptor.styles.map(s => s.content).join('\n')}</style>
</head>
<body>
  <div id="app">${descriptor.template?.content || ''}</div>
  <script>
    ${descriptor.script?.content.replace('export default', 'const _component = ')}
    const app = Vue.createApp(_component)
    app.use(Pinia.createPinia())
    try {
  app.mount('#app')
} catch (e) {
  console.error('Mount error:', e)
}
  </script>
</body>
</html>
    `;
    
    // 写入HTML文件
    fs.writeFileSync(path.join(outputDir, `${dir}.html`), htmlContent);
  }
});