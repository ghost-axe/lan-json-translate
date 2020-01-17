# lan-json-translate
多语言JSON文件翻译
language json file translation

## Usage
```
npm i lan-json-translate

const translate = require('lan-json-translate')

let lanList = [ // 翻译语言列表
  'en',
  'ko'
]

translate(
  './src/locales', // 语言文件目录 (当前命令行相对路径)
  'zh-TW', // 源语言
  lanList
  )

```