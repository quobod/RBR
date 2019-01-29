import React from 'react';
import { Redirect } from 'react-router-dom';
import { Consumer } from '../../AppContext';

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {            
            user: JSON.parse(localStorage.getItem("user")) || {},
            title: '',
            submitted: false      
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    clearInputs = () => {
        this.setState({
            title: ''
        });
    }

    render() {
        return (
            <div className="content">
                <Consumer>
                    {value => {
                        const { addTodo, addTodoSuccess } = value;
                        
                        return (
                            <div className="form-wrapper">
                                <form className="add-todo-form" onSubmit={(e) => {
                                    e.preventDefault();
                                    const { title, user } = e.target;
                                    const data = { title: title.value, user: user.value };
                                    addTodo(data);
                                    this.clearInputs();
                                    this.setState({
                                        submitted: addTodoSuccess,
                                        error: (addTodoSuccess?false:true)
                                    });
                                }}>
                                    <div className="input-group">
                                        <input onChange={this.handleChange} type="text" name="title" value={this.state.title} required placeholder="Enter title" />
                                    </div>
                                    <div className="input-group">
                                        <input type="hidden" name="user" value={this.state.user._id} required />
                                    </div>
                                    <div className="input-group">
                                        <input type="submit" value="Submit" />
                                    </div>
                                    {
                                        this.state.error &&
                                        <p className="error">New Todo Failure</p>
                                    }
                                    {
                                        this.state.submitted &&
                                        <Redirect to="/todos" />
                                    }
                                </form>
                            </div>
                        )
                    }}
                </Consumer>
            </div>
        );
    }
}

export default TodoForm;