/**
 * 请把俩个数组 [A1, A2, B1, B2, C1, C2, D1, D2] 和 [A, B, C, D]，合并为 [A1, A2, A, B1, B2, B, C1, C2, C, D1, D2, D]。
 */

/* eslint-disable */

const a = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
const b = ['A', 'B', 'C', 'D']

function concatMix (a, b) {
  let rs = []
  let last = null
  a.forEach((item, index) => {
    const tar = item.match(/(\w+)(\d+)/)
    if (tar) {
      if (tar[1] !== last) {
        if (index === 0) {
          last = tar[1]
        } else {
          b.indexOf(last) !== -1 && rs.push(last)
        }
        last = tar[1]
      }
      rs.push(item)
      if (index === a.length - 1) {
        b.indexOf(tar[1]) !== -1 && rs.push(tar[1])
      }
    }
  })
  return rs
}

console.log('m', concatMix(a, b))