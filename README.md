# lan-json-translate
多语言JSON文件翻译
language json file translation

## Usage
```
npm i

const translate = require('lan-json-translate')

let lanList = [ // 翻译语言列表
  'en',
  'ko'
]

translate(
  './src/locales', // 工作目录
  'zh-TW', // 源语言
  lanList
  )

```