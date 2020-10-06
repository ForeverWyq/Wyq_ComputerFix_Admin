// 过滤器
// 去main.js中进行配置
export function dateParse(dataString) {
  if (dataString) {
    let date = new Date(dataString)
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    return Y + M + D + h + m + s
  } else {
    return ''
  }
}

// main.js
// 导入过滤器
// import * as filters from './filters'

// 过滤器配置 全局使用
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })