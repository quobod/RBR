import React from 'react';

class TodoItem extends React.Component {

    render() {
        const { title } = this.props.todo;
        return (
            <li className="list-item">
                <div className="todo-item">
                    <h2>{title}</h2>
                    <div className="todo-item-controls">
                        <span className="todo-completed">
                            <input type="checkbox" />&nbsp;
                            <b className="bold">Completed?</b>
                        </span>
                        <i className="fas fa-trash-alt todo-delete"></i>
                    </div>
                </div>
            </li>
        );
    }
}

export default TodoItem;
