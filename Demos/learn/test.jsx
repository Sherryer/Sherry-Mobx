import {Atom, autorun} from "mobx";
class Clock {
    atom;
    intervalHandler = null;
    currentDateTime;
    constructor() {
        // 创建一个Atom实例
        this.atom = new Atom(
            // 第一个参数: Atom实例的名字, 调试用的
            "Clock",
            // 第二个参数（可选）: 从不被监听到被监听时的回调函数.
            () => this.startTicking(),
            // 第三个参数（可选）: 从被监听到不被监听时的回调函数
            // 注意，atom实例会多次在这两种状态见转换
            () => this.stopTicking()
        );
    }
    getTime() {
        // 如果Atom实例被响应函数调用，则reportObserved返回true。
        // 同时，reportObserved会通知mobx这个实例在响应回调中被使用了，它还会触发实例的第二个参数（startTicking）
        if (this.atom.reportObserved()) {
            return this.currentDateTime;
        } else {
            // 当没有响应函数调用Atom实例的时候，就不会触发startTicking。
            // 根据不同的情况，这里也可以做不同的处理，比如抛出一个错误，返回一个默认值等等。
            return new Date();
        }
    }
    tick() {
        this.currentDateTime = new Date();
        // 通知mobx当前值发生了变化
        this.atom.reportChanged();
    }
    startTicking() {
        this.tick(); // 初始化时钟
        this.intervalHandler = setInterval(
            () => this.tick(),
            1000
        );
    }
    stopTicking() {
        clearInterval(this.intervalHandler);
        this.intervalHandler = null;
    }
}
const clock = new Clock();
const disposer = autorun(() => console.log(clock.getTime()));
// ... 每秒打印时间
disposer();
