const { baidu } = require('translation.js')
const fs = require('fs')
const path = require('path')

var workDir = ''
var srcLan = ''
var lanList = []
var translating = false
var transData = []
var transedData = []
var SrcData = {}
var stringData = ''
var box = []

function translate (w, s, l) {

  workDir = w
  srcLan = s
  lanList = l

  if (!workDir || !srcLan || lanList.length == 0) {
    console.error('请设置 workDir, srcLan, lanList..............')
    return
  }

  SrcData = JSON.parse(fs.readFileSync(path.resolve(workDir, (srcLan.toLowerCase() + '.json'))))

  console.log('翻译开始...')
  start()

  translating = true
  stringData = transData.join('\n')
  stringCut(stringData)

  doTrans()
}

function start () {
  for (let k in SrcData) {
    travelObj(SrcData, k)
  }
}

function travelObj (data, key) {
  if (data[key] instanceof Object) {
    for (let k in data[key]) {
      travelObj(data[key], k)
    }
  } else {
    transData.push(data[key])
    if (translating) {
      data[key] = transedData.shift()
    }
  }
}

function stringCut (data) {
  if (data.length > 1800) {
    let index = data.indexOf('\n', 1700)
    box.push(data.substring(0, index))
    stringCut(data.substring(index))
  } else {
    box.push(data)
  }
}

async function doTrans () {
  for (let lan of lanList) {
    transedData = []
    for (let data of box) {
      let res = await baidu.translate({
        text: data,
        from: srcLan,
        to: lan
      })
      for (let item of res.result) {
        transedData.push(item)
      }
    }
    start()
    let disData = formatResult(JSON.stringify(SrcData))
    fs.writeFileSync(path.resolve(workDir, (lan + '.json')), disData, 'utf8')
    console.log(lan + '.json')
  }
  console.log('翻译完成...')
}

function formatResult (data) {
  let resString = ''
  let level = 0
  for (let i = 0; i < data.length; i++) {
    switch (data[i]) {
      case '{':
        if (data[i+1] == '"') {
          resString += '{\n'
          level++
          for (let i = 0; i < level; i++) {
            resString += '\t'
          }
          resString += '"'
          i++
          continue
        } else {
          resString += '{'
          continue
        }
      case '}':
        if (data[i-1] == '"') {
          resString += '\n'
          level--
          for (let i = 0; i < level; i++) {
            resString += '\t'
          }
          if (data[i+1] && data[i+1] == ',') {
            resString += '},\n'
            for (let i = 0; i < level; i++) {
              resString += '\t'
            }
            i++
          } else {
            resString += '}\n'
          }
          continue
        } else {
          resString += '}'
          continue
        }
      case ',':
        if (data[i-1] == '"' && data[i+1] == '"') {
          resString += ',\n'
          for (let i = 0; i < level; i++) {
            resString += '\t'
          }
          resString += '"'
          i++
          continue
        } else {
          resString += ','
          continue
        }
      case ':':
        resString += ': '
        continue
      default:
        resString += data[i]
    }
  }
  return resString
}

module.exports = translate
