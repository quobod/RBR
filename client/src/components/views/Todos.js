import React from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../../AppContext';
import TodoItem from '../TodoItem';

class Todos extends React.Component {

    componentDidMount() {
        document.title = 'Todos';
    }

    render() {
        return (
            <div className="content">
                <ul className="sub-menu">
                    <Link to="/addtodo" className="link">Add</Link>
                </ul>
                <Consumer>
                    {value => {
                        const { todos } = value;
                        if (undefined === todos || todos.length < 1) {
                            return (<h2 className="no-todos">No Todos</h2>)
                        } else {
                            return (
                                <div className="todo-list-parent">
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
            </div>
        )
    }
}

export default Todos;
