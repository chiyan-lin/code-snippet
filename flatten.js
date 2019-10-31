// 将数组扁平化 可以设置扁平化的级别

// Array.prototype.re_flatten = function () {
//   // level Infinity
//   const len = this.length
//   for (let i = 0; i <= len; i++) {
//     if (Array.isArray(this[i])) {
//       const rs = Array.prototype.re_flatten.call(this[i])
//       this.splice(i, rs.length, ...rs)
//     }
//   }
//   return this
// }
/* eslint-disable */

Array.prototype.re_flatten = function (level) {
  // level Infinity 
  let arr = Array.prototype.slice.call(this)
  let index = 1
  let lv = 0
  let rs = []
  while (arr.length && index < arr.length) {
    if (Array.isArray(arr[index]) && lv < level) {
      lv++
      const header = arr.slice(0, index)
      const footer = arr.slice(index - arr.length + 1)
      rs = rs.concat(header)
      arr = arr[index].concat(footer)
      index = 1
    }
    if (lv === level) {
      rs = rs.concat(arr)
      arr.length = 0
    }
    index++
  }
  return rs
}

const aa = [1, 3, [1, 2, [3, 6], 4, 6, [3, 7, 8, 9, [4, 5]]], 7]
// const aa = [1, 2]
console.log('re_flatten', aa.re_flatten(2))



// https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/54
/*
const flatten = array => array.reduce((acc, cur) => (Array.isArray(cur) ? [...acc, ...flatten(cur)] : [...acc, cur]), [])
*/
let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]]

const flatten = function (arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}

console.log(flatten(arr))