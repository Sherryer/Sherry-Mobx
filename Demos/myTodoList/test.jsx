import {observable, computed, action} from "mobx";
import {observer} from "mobx-react";
import React, {Component} from "react";
import reactDom from "react-dom";

class Task {
    constructor (z){
        this.content = z
    }
    id = Math.random();
    @observable finish = false;
    done = ()=>{
        this.finish = !this.finish;
    }
}

class Store {
    @observable list = [];
    num = 0;
     get getFinish (){
        return this.list.filter(todo => !todo.finish)
    }
     get getDone (){
        return this.list.filter(done => done.finish)
    }

     get filter (){
        return this.list.filter(todo =>{
            if(Number(todo.content)>Number(this.num))
                return true
        })
    }
}

let addList = action("add-list",function (z) {
    store.list.push(z)
});


@observer
class Test extends Component{
    append = ()=>{
        if(this.value){
            addList(new Task(this.value))
        }
    };

    change = (e)=>{
        this.value = e.target.value;
    };

    click = (value)=>{
        value.done();
    };

    filter = () => {

        console.log(this.props.store.filter)

    };

    setNum = (e) =>{
        this.props.store.num = e.target.value;
    };

    render(){
        const {store,...other} = this.props;

        return (
            <div>
                <h2>todo list</h2>
                <ul>
                    {
                        store.getFinish.map((value)=>(
                            <li key={value.id}><input type="checkbox" onClick={this.click.bind(this,value)} checked={value.finish} />{value.content}</li>
                        ))
                    }
                </ul>
                Tasks left:{store.list.length}
                <h4>append list</h4>
                <input type="text" onChange={this.change.bind(this)}/>
                <button onClick={this.append.bind(this)}>append</button>

                <h2>done</h2>
                <ul>
                    {
                        store.getDone.map(value => (
                            <li  key={value.id}><del>{value.content}</del></li>
                        ))
                    }
                </ul>

                <h2>filter</h2>
                <input type="text" onChange={this.setNum.bind()}/>
                <button onClick={this.filter.bind(this)}>过滤</button>
            </div>
        )
    }
}

let store = new Store();
store.list.push(new Task(1),new Task(2),new Task(3));


reactDom.render(<Test z="z" store={store}/>,document.getElementById("mount"));