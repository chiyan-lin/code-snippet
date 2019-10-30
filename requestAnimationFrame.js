// setInterval实现
/**
 * 3 requestAnimationFrame执行过程，我们知道只有当页面激活的状态下，页面刷新任务才会开始，才执行 requestAnimationFrame，当页面隐藏或最小化时，会被暂停，页面显示，会继续执行。节省了 CPU 开销。
 * 2 该函数的延时效果是精确的，没有setTimeout或setInterval不准的情况（JS是单线程的，setTimeout 任务被放进异步队列中，只有当主线程上的任务执行完以后，才会去检查该队列的任务是否需要开始执行，造成时间延时）。setTimeout的执行只是在内存中对图像属性进行改变，这个改变必须要等到下次浏览器重绘时才会被更新到屏幕上。
 * 1 requestAnimationFrame 自带函数节流功能，采用系统时间间隔，保持最佳绘制效率，不会因为间隔时间的过短，造成过度绘制，增加页面开销，也不会因为间隔时间过长，造成动画卡顿，不流程，影响页面美观。
 */

function setInterval (callback, interval) {
  let timer
  const now = Date.now
  let startTime = now()
  let endTime = startTime
  const loop = () => {
    timer = window.requestAnimationFrame(loop)
    endTime = now()
    if (endTime - startTime >= interval) {
      startTime = endTime = now()
      callback(timer)
    }
  }
  timer = window.requestAnimationFrame(loop)
  return timer
}

let a = 0
setInterval(timer => {
  console.log(a)
  a++
  if (a === 3) window.cancelAnimationFrame(timer)
}, 1000)

function setTimeout (callback, interval) {
  let timer
  const now = Date.now
  let startTime = now()
  let endTime = startTime
  const loop = () => {
    timer = window.requestAnimationFrame(loop)
    endTime = now()
    if (endTime - startTime >= interval) {
      callback(timer)
      window.cancelAnimationFrame(timer)
    }
  }
  timer = window.requestAnimationFrame(loop)
  return timer
}

let b = 0
setTimeout(timer => {
  console.log(b)
  b++
}, 1000)
