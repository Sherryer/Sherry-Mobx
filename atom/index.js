import {Atom, autorun} from "mobx";

class Clock {
    atom;
    intervalHandler = null;
    currentDateTime;

    constructor() {
        console.log("begin constructor");
        // 创建一个 atom 用来和 MobX 核心算法交互
        this.atom =    new Atom(
            // 第一个参数: atom 的名字，用于调试
            "Clock-atom",
            // 第二个参数(可选的): 当 atom 从未被观察到被观察时的回调函数
            () => this.startTicking(),
            // 第三个参数(可选的): 当 atom 从被观察到不再被观察时的回调函数
            // 注意同一个 atom 在这两个状态之间转换多次
            () => this.stopTicking()
        );
    }

    getTime() {
        console.log(1);
        // 让 MobX 知道这个 observable 数据源已经使用了
        // 如果 atom 当前是被某些 reaction 观察的，那么 reportObserved 方法会返回 true
        // 如果需要的话，reportObserved 还会触发 onBecomeObserved 事件处理方法(startTicking)
        if (this.atom.reportObserved()) {
            console.log("上");
            return this.currentDateTime;
        } else {
            console.log("下");
            // 显然 getTime 被调用的同时并没有 reaction 正在运行
            // 所以，没有人依赖这个值，因此 onBecomeObserved 处理方法(startTicking)不会被触发
            // 根据 atom 的性质，在这种情况下它可能会有不同的表现(像抛出错误、返回默认值等等)
            return new Date();
        }
    }

    tick() {
        this.currentDateTime = new Date();
        // console.log(2,this.currentDateTime);
        // 让 MobX 知道这个数据源发生了改变
        this.atom.reportChanged();
    }






    startTicking() {
        console.log("当 atom 从未被观察到被观察时的回调函数");
        this.tick(); // 最初的运行
        // this.intervalHandler = setInterval(
        //     () => this.tick(),
        //     1000
        // );
        this.intervalHandler = this.tick()
    }

    stopTicking() {
        console.log("当 atom 从被观察到不再被观察时的回调函数")
        clearInterval(this.intervalHandler);
        this.intervalHandler = null;
    }
}

const clock = new Clock();

const disposer = autorun(() => console.log(clock.getTime()));

// ... 输出每一秒的时间

// disposer();

// 停止输出。如果没有人使用同一个 `clock` 的话，clock 也将停止运行。