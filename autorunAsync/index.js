import {observable, computed, action, autorunAsync, autorun} from "mobx";
import {observer} from "mobx-react";
import React, {Component} from "react";
import reactDom from "react-dom";


let obj = observable ({
    arr:[1,2,3]
});

autorunAsync(function () {
    console.log("我是异步的",obj.arr.length)
});
autorun(function () {
    console.log("我是同步的",obj.arr.length)
})

class Test extends Component{
    render (){
        
        return(
            <div>
                <div>{obj.arr.map(value => value)}</div>
                <button onClick={()=>(obj.arr.push(4))}>add</button>
            </div>
        )
    }
}

reactDom.render(<Test/>,document.getElementById("mount"))


