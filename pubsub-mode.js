// https://user-images.githubusercontent.com/18718461/53536375-228ba180-3b41-11e9-9737-d71f85040cfc.png

/*
 * 观察者模式
 意图：定义了一种一对多的关系，可以使多个观察者对象对一个主题对象进行监听，当这个主题对象发生改变时，依赖的所有对象都会被通知到。
 核心：订阅发布模式，有统一调度中心,使用订阅发布模式中发布者触发publish的时候，可以选择触发哪一些订阅者集合
 实现：一个对象（目标对象）的状态发生改变，所有的依赖对象（观察者对象）都将得到通知，进行广播通知。
 实例：报民向报社订报纸

 bad：
 1 一个被观察者对象如果有太多间接或者直接的观察者，将花费时间通知观察者
 2 如果存在循环依赖，可能导致系统崩溃
 3 观察者仅仅知道别观察者发生了变化，而不知道如何发生了变化
*/

// Manager
// 观察者模式
class Manager {
  constructor () {
    this.observerObj = {}
  }
  add (event, observer) {
    if (!this.observerObj[event]) {
      this.observerObj[event] = []
    }
    this.observerObj[event].push(observer)
    return this
  }
  count (event) {
    return this.observerObj[event] && this.observerObj[event].length
  }
  get (event) {
    return this.observerObj[event]
  }
  indexOf (event, obj, startIndex = 0) {
    let i = startIndex
    while (i < this.count(event)) {
      if (this.observerObj[event][i] === obj) {
        return i
      }
      i++
    }
    return -1
  }
  removeAt (event, index, num) {
    this.observerObj[event].splice(index, num)
  }
}

const manager = new Manager()
// 社订
class Publisher {
  // 发报
  pulish (event, content) {
    console.log(content)
    manager.get(event).forEach(obs => {
      obs.update(content)
    })
  }
}

class Subscribe {
  constructor (id) {
    this.id = id
  }
  register (event, observer) {
    manager.add(event, observer)
  }
  remove (event, observer) {
    manager.removeAt(event, manager.indexOf(event, observer))
  }
  update (content) {
    if (this.id === '小李') {
      console.log('小李', 'i can')
    }
    if (this.id === '小明') {
      console.log('小明', 'i can not')
    }
  }
}

let student1 = new Subscribe('小李')
let student2 = new Subscribe('小明')
let teacher = new Publisher()

student1.register('test', student1)
student1.register('fun', student2)

teacher.pulish('fun', '请问谁会 java')
