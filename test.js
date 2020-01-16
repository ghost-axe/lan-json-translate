let translate = require('./index')

let lanList = [
  'en',
  'ko'
]

translate('./src/locales', 'zh-TW', lanList)
