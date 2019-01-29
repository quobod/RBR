import React from 'react';
import { Consumer } from '../../AppContext';
import TodoItem from '../TodoItem';

class Todos extends React.Component {
    render() {
        return (
            <Consumer>
                {value => {
                    const { todos } = value;
                    if (undefined === todos || todos.length < 1) {
                        return (<div className="content"><h2>No Todos</h2></div>)
                    } else {
                        return (
                            <div className="content">
                                <ul className="todo-list">
                                    {todos.map(todo => {
                                        return <TodoItem key={todo._id} todo={todo} />
                                    })}
                                </ul>
                            </div>
                        )
                    }
                }}
            </Consumer>
        )
    }
}

export default Todos;
