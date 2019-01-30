import React from 'react';
import { Consumer } from '../AppContext';

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: props.todo.completed
        }
    }

    completed = () => {
        return ({textDecoration: this.state.completed? 'line-through': 'none'});
    }

    render() {
        const { title, _id } = this.props.todo;
        return (
            <Consumer>
                {value => {
                    const { removeTodo, removeTodoFailure, completeTodo } = value;
                    return(<li className="list-item">
                        <div className="todo-item">
                            <div className="todo-item-controls">
                                <span className="todo-completed">
                                    <input onChange={() => {
                                        completeTodo(_id);
                                        this.setState((state, props) => ({
                                            completed: state.completed === false? true:false
                                        }));
                                    }} type="checkbox" checked={this.state.completed} />&nbsp;
                                    <b className="bold">Completed?</b>
                                </span>
                            {removeTodoFailure? <h1>Unable to delete {title}</h1> : <p style={this.completed()}><b>{title}</b></p>}
                                <button onClick={()=> {
                                    removeTodo(_id);
                                }} className="todo-delete-button">
                                    <i className="fas fa-trash-alt todo-delete"></i>
                                </button>
                            </div>
                        </div>
                    </li>)
                }}
            </Consumer>
        );
    }
}

export default TodoItem;
