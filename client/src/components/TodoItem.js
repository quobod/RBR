import React from 'react';
import { Consumer } from '../AppContext';

class TodoItem extends React.Component {

    render() {
        const { title, _id } = this.props.todo;
        return (
            <Consumer>
                {value => {
                    const { removeTodo, removeTodoFailure } = value;
                    return(<li className="list-item">
                        <div className="todo-item">
                            {removeTodoFailure? <h1>Unable to delete {title}</h1> : <h3>{title}</h3>}
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
