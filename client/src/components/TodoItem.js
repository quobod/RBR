import React from 'react';
import { Consumer } from '../AppContext';

class TodoItem extends React.Component {

    render() {
        const { title, _id } = this.props.todo;
        return (
            <Consumer>
                {value => {
                    const { removeTodo } = value;
                    return(<li className="list-item">
                        <div className="todo-item">
                            <h2>{title}</h2>
                            <div className="todo-item-controls">
                                <span className="todo-completed">
                                    <input type="checkbox" />&nbsp;
                                    <b className="bold">Completed?</b>
                                </span>
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
