import { observable, computed } from 'mobx';
import { observer } from "mobx-react";
import React,{ Component } from "react";
import ReactDOM from 'react-dom';

class Todo {
    id = Math.random();
    @observable content;
    @observable finished = false;
    constructor(content) {
        this.content = content;
    }
    finish() {
        this.finished = true
    }
}
class TodoList {
    @observable todos = [];
    @computed get unFinishedList() {
        return this.todos.filter(todo => !todo.finished);
    }
    @computed get finishedList() {
        return this.todos.filter(todo => todo.finished);
    }
    addTodo(content) {
        if (content){
            this.todos.push(new Todo(content))
        }
    }
}

@observer
class TodoListView extends Component {

    render() {
        const { todoList } = this.props;

        let onChange = (event) => {
            this.value = event.target.value
        }
        let onClick = () => { todoList.addTodo(this.value) }
        return (<div>
            <h2>添加任务</h2>
            <input type="text" onChange={ onChange }/>
            <button type="button" onClick={ onClick }>添加</button>
            <h2>未完成任务</h2>
            <ol>
                {todoList.unFinishedList.map((todo,index) =>
                    <TodoView todo={todo} key={todo.id} />
                )}
            </ol>
            Tasks left: {todoList.unFinishedList.length}
            <h2>已完成任务</h2>
            <ol>
                {todoList.finishedList.map((todo) =>
                    <FinishedView todo={todo} key={todo.id} />
                )}
            </ol>
        </div>)
    }
}

const TodoView = observer((props) =>
    {
        let { todo } = props;
        return (<li>
            <input
                type="checkbox"
                checked={todo.finished}
                onClick={todo.finish.bind(todo)}
            />{todo.content}
        </li>)
    }
);

// @observer
class FinishedView extends Component{
    render() {
        let { todo } = this.props;
        return (<li>
            <del>{todo.content}</del>
        </li>)
    }
}



const store = new TodoList();
ReactDOM.render(<TodoListView todoList={store} />, document.getElementById("content"));

store.todos.push(
    new Todo("Get Coffee"),
    new Todo("Write simpler code")
);

