# lan-json-translate
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
  './src', // 工作目录
  'zh-TW', // 源语言
  lanList
  )

```