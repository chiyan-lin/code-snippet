/*
 * @Description: 测试三种循环的性能
 * @Author: gaidy
 * @Date: 2019-09-28 16:28:17
 * @LastEditTime: 2019-09-28 18:20:17
 * @conclusion: fon-in 的循环最差 别用
 */

const arr = new Array(9000000).fill(1)

const s1 = new Date().getTime()
let sum1 = 0
for (let i1 = 0; i1 <= arr.length; i1++) {
  sum1 += i1
}
const e1 = new Date().getTime()
console.log(sum1, 'method for cost', e1 - s1)

const s2 = new Date().getTime()
let sum2 = 0
let i2 = 0
while (i2 < arr.length) {
  i2++
  sum2 += i2
}
const e2 = new Date().getTime()
console.log(sum2, 'method while cost', e2 - s2)

const s3 = new Date().getTime()
let sum3 = 0
let i3 = 0
for (i in arr) {
  i3++
  sum3 += i3
}
const e3 = new Date().getTime()
console.log(sum3, 'method fo-in cost', e3 - s3)
