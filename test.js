let translate = require('./index')

let lanList = [
  'en',
  'ko',
  'ar'
]

translate('./src/locales', 'zh-TW', lanList)
