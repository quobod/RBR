import Axios from 'axios';
import React, { Component } from 'react';
const Context = React.createContext();

export class Provider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: JSON.parse(localStorage.getItem("token")) || ""
        };
    }

    initTodos = () => {
        Axios.get('/api')
        .then(response => this.setState({ todos: response.data }))
        .catch(err => console.log(`Todos Error: ${err.message}`));
    }

    login = (data) => {        
        Axios.post('/auth/login', data)
            .then(response => {
                console.log(response);
                const { token, user } = JSON.parse(response.data.payload);
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", JSON.stringify(token));
                this.setState({
                    user,
                    token
                });
                this.initTodos();
                console.log('Logged In');
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    logout = () => {
        Axios.get('/auth/logout')
            .then(response => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                this.setState({
                    user: {},
                    token: ""
                });
                console.log('Logged Out');
            })
            .catch(error => {
                console.log(error);
            });
    }  
    
    addTodo = (data) => {
        Axios.post('/api/todos/add', data)
            .then(response => {
                this.initTodos();
            })
            .catch(err => console.log(err));
    }
    
    removeTodo = (id) => {
        Axios.get(`/api/todos/remove/${id}`)
            .then(response => {
                console.log(response.data);
                this.initTodos();
            })
            .catch(err => console.log(`\n\t\t${err.message}\n`));
    }

    render() {
        return (
            <Context.Provider value={
                {
                    token: this.state.token,
                    logout: this.logout,
                    login: this.login,
                    todos: this.state.todos,
                    addTodo: this.addTodo,
                    removeTodo: this.removeTodo
                }
            }>
                { this.props.children }
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;
