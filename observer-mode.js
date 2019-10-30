// https://user-images.githubusercontent.com/18718461/53536375-228ba180-3b41-11e9-9737-d71f85040cfc.png

/*
 * 观察者模式
 意图：定义对象的一种一对多的依赖关系，当一个对象的状态发生改变时候，所有依赖它的对象都被通知并且更新状态。
 核心：在抽象类里有一个ArrayList存在观察者们
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
    this.observerList = []
  }
  add (observer) {
    this.observerList.push(observer)
    return this
  }
  count () {
    return this.observerList.length
  }
  get (index) {
    if (index > -1 && index < this.observerList.length) {
      return this.observerList[index]
    }
  }
  indexOf (obj, startIndex) {
    let i = startIndex
    while (i < this.observerList.length) {
      if (this.observerList[i] === obj) {
        return i
      }
      i++
    }
    return -1
  }
  removeAt (index, num) {
    this.observerList.splice(index, num)
  }
}

// 社订
class Subject {
  constructor () {
    this.observers = new Manager()
  }
  // 报民订报
  register (observer) {
    this.observers.add(observer)
  }
  // 取消订报
  remove (observer) {
    this.observer.removeAt(this.observers.indexOf(observer, 0))
  }
  // 发报
  notify (content) {
    console.log(content)
    let observerCount = this.observers.count()
    for (let index = 0; index < observerCount; index++) {
      this.observers.get(index).update(content)
    }
    // console.log(content, ...subs)
    // subs.forEach((sub) => {
    //   this.observers.get(this.observers.indexOf(sub)).update(content)
    // })
  }
}

class Observer {
  constructor (id) {
    this.id = id
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

let student1 = new Observer('小李')
let student2 = new Observer('小明')
let teacher = new Subject()
teacher.register(student1)
teacher.register(student2)

teacher.notify('请问谁会 java')
