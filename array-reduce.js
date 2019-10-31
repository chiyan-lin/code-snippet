/* eslint-disable */
Array.prototype.new_reduce = function (callback, initData) {
  // 防止数组被修改对先复制一份
  const t = Array.prototype.slice.call(this)
  let start = 1
  let pre = t[0]
  if (initData) {
    pre = initData
    start = 0
  }
  for(let i = start; i < t.length; i++) {
    pre = callback.call(t, pre, t[i], i, t)
  }
  return pre
}

const aa = [1, 2]
console.log('new_reduce', aa.new_reduce(function (a, b) {
  return a + b
}, 5))

