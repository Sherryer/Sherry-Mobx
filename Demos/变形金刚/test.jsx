function decorateArmour(target, key, descriptor) {
    console.log(target,key,descriptor);
    const method = descriptor.value;
    let moreDef = 100;
    let ret;

    descriptor.value = (...args)=>{
        args[0] += moreDef;
        ret = method.apply(target, args);
        return ret;
    }
    return descriptor;
}




function moreAtk(target, key, descriptor){
    let changeFunction = descriptor.value;
    let moreatk = 100;
    descriptor.value = (...args)=>{
        args[1] += moreatk
        return changeFunction.apply(target,args)
    }
}


function moreHealth(target,key,descriptor){
    let method = descriptor.value;
    let morehealth = 100;
    descriptor.value = (...args)=>{
        args[2] += morehealth;
        return method.apply(target,args)
    }
}


function addFly(canFly){
    return function(target){
        target.canFly = canFly;
        let extra = canFly ? '(技能加成:飞行能力)' : '';
        let method = target.prototype.toString;   //toString是原函数的播报函数（已经被修改了）
        target.prototype.toString = (...args)=>{
            return method.apply(target.prototype,args) + extra;
        };
        return target;
    }
}


@addFly(true)
class Man{
    constructor(def = 2,atk = 3,hp = 3){
        this.init(def,atk,hp);
    }


    // @moreHealth
    // @moreAtk
    @decorateArmour
    init(def,atk,hp){
        this.def = def; // 防御值
        this.atk = atk;  // 攻击力
        this.hp = hp;  // 血量
    }

    toString(){
        return `防御力:${this.def},攻击力:${this.atk},血量:${this.hp}`;
    }
}

var tony = new Man();
//
console.log(`当前状态 ===> ${tony}`);
// 输出：当前状态 ===> 防御力:102,攻击力:3,血量:3
