let translate = require('./index.js')

let lanList = [
  'en',
  'ko'
]

translate('./src/locales', 'zh-TW', lanList)
