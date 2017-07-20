关于 decorators 教程：https://zhuanlan.zhihu.com/p/20139834?columnSlug=FrontendMagazine

Object.defineProperty(obj, prop, descriptor)，
3 个参数：
obj: 目标对象
prop: 属性名
descriptor: 针对该属性的描述符


例如：
对方法（Dog）使用装饰器
Object.defineProperty(Dog.prototype, 'bark', {
  value: function () { return 'wang!wang!' },
  enumerable: false,
  configurable: true,
  writable: true
})

对类class（Dog）使用装饰器
target是类本身
function doge (target) {
  target.isDoge = true
}

@doge
class Dog {}

console.log(Dog.isDoge)
// true

如果希望有参数调节（思路也是用理解执行函数加参数返回一个函数作为装饰器，用参数控制返回函数的部分内容）
function doge (isDoge) {
  return function(target) {
    target.isDoge = isDoge
  }
}

@doge(true) //这里是吧doge的返回值当作 Dog的装饰器了
class Dog {}

console.log(Dog.isDoge)

@doge(false)
class Human {}
console.log(Human.isDoge)
