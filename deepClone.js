/*
 * @Description: 深拷贝
 * @Author: gaidy
 * @Date: 2019-09-28 18:20:37
 * @LastEditTime: 2019-10-03 13:54:57
 */

function cycle (array, iteratee) {
  let index = -1
  const length = array.length
  while (++index < length) {
    iteratee(array[index], index)
  }
  return array
}

function type (target) {
  return Object.prototype.toString.call(target).match(/\[object\s(.+)\]/)[1]
}

function getInit (target) {
  const Ctor = target.constructor
  return new Ctor()
}

function isObject (target) {
  const type = typeof target
  return target !== null && (type === 'object' || type === 'function')
}

function cloneFunction (func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m
  const paramReg = /(?<=\().+(?=\)\s+{)/
  const funcString = func.toString()
  if (func.prototype) {
    console.log('普通函数')
    const param = paramReg.exec(funcString)
    const body = bodyReg.exec(funcString)
    if (body) {
      console.log('匹配到函数体：', body[0])
      if (param) {
        const paramArr = param[0].split(',')
        console.log('匹配到参数：', paramArr)
        return new Function(...paramArr, body[0])
      } else {
        return new Function(body[0])
      }
    } else {
      return null
    }
  } else {
    return eval(funcString)
  }
}

function cloneSymbol (targe) {
  return Object(Symbol.prototype.valueOf.call(targe))
}

function cloneReg (targe) {
  const reFlags = /\w*$/
  const result = new targe.constructor(targe.source, reFlags.exec(targe))
  result.lastIndex = targe.lastIndex
  return result
}

function clone (target, map = new WeakMap()) {
  if (!isObject(target)) {
    return target
  }

  let cloneTarget = type(target) === 'Object' ? getInit(target) : []
  if (map.get(target)) {
    return map.get(target)
  }
  map.set(target, cloneTarget)

  // 克隆set
  if (type === 'Set') {
    target.forEach(value => {
      cloneTarget.add(clone(value, map))
    })
    return cloneTarget
  }

  // 克隆map
  if (type === 'Map') {
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value, map))
    })
    return cloneTarget
  }

  if (type === 'Function') {
    return cloneFunction(target)
  }

  if (type === 'RegExp') {
    return cloneReg(target)
  }

  if (type === 'Symbol') {
    return cloneSymbol(target)
  }

  cycle(Object.keys(target), (val, key) => {
    const tvType = type(target[val])
    // 处理引用类型的拷贝
    if (tvType === 'Object' || tvType === 'Array') {
      return (cloneTarget[val] = clone(target[val], map))
    }
    // 对于非引用直接赋值
    cloneTarget[val] = target[val]
  })

  return cloneTarget
}

const field5 = [1, 2, 3]
const test = {
  field1: 1,
  field2: undefined,
  field3: 'ConardLi',
  field4: {
    child: 'child',
    child2: {
      child2: 'child2'
    }
  },
  field5
}
test.test = test

const rs = clone(test)
console.log('rs', rs)

field5[0] = 444
console.log('rs', rs)
