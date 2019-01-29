import Axios from 'axios';
import React, { Component } from 'react';
const Context = React.createContext();

export class Provider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: JSON.parse(localStorage.getItem("token")) || "",
            loginSuccess: true,
            registrationSuccess: true,
            addTodoSuccess: true,
            removeTodoSuccess: true,
            addTodoErrorMessage: '',
            removeTodoErrorMessage: '',
            loginErrorMessage: '',
            registrationErrorMessage: ''
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
                switch(response.data.status.toLowerCase()) {
                    case 'success':
                        // console.log(response);
                        const { token, user } = JSON.parse(response.data.payload);
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("token", JSON.stringify(token));
                        this.setState({
                            user,
                            token,
                            loginSuccess: true,
                            loginErrorMessage: ''
                        });
                        this.initTodos();
                        console.log('Logged In');
                    break;

                    default:
                        this.setState({
                            user: {},
                            token: "",
                            loginSuccess: false,
                            loginErrorMessage: 'Authentication Failed'
                        });
                    break;
                        
                }
            })
            .catch(error => {
                console.log(error.message);
                this.setState({
                    user: {},
                    token: "",
                    loginSuccess: false,
                    loginErrorMessage: 'Authentication Failure'
                })
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

    register = (data) => {
       Axios.post('/auth/register', data)
        .then(response => {
            switch(response.data.status.toLowerCase()) {
                case 'success':
                    const { token, user } = JSON.parse(response.data.payload);
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("token", JSON.stringify(token));
                    this.setState({
                        user,
                        token,
                        registrationErrorMessage: '',
                        registrationSuccess: true
                    })
                break;

                default:
                    this.setState({
                        registrationSuccess: false,
                        registrationErrorMessage: response.data.reason
                    });
                    console.log(`\n\t\tReceived Error: ${response.data.reason}\n\n`);
                    break;
            }
        })
        .catch(error => {
            this.setState({
                registrationSuccess: false,
                registrationErrorMessage: error.message
            });
            console.log(`\n\t\tCaught Error: ${error.message}\n\n`);
        });
    }
    
    addTodo = (data) => {
        Axios.post('/api/todos/add', data)
            .then(response => {
                const status = response.data.status.toLowerCase();
                switch(status) {
                    case 'success':
                        this.initTodos();           
                        this.setState({
                            addTodoSuccess: true
                        });   
                    break;

                    default:            
                        this.setState({
                            addTodoSuccess: false
                        });
                    break;
                }
            })
            .catch(err => {
                console.log(err);                
                this.setState({
                    addTodoSuccess: false,
                    addTodoErrorMessage: err.message
                })
            });
    }
    
    removeTodo = (id) => {
        Axios.get(`/api/todos/remove/${id}`)
            .then(response => {
                console.log(response.data);
                this.initTodos();
            })
            .catch(err => {
                console.log(`\n\t\t${err.message}\n`);
                this.setState({
                    addTodoSuccess: false,
                    removeTodoErrorMessage: err.message
                })
            });
    }

    completeTodo = (id) => {
        Axios.get(`/api/todos/completed/${id}`)
            .then(response => {
                const { status } = response.data;
                switch(status.toLowerCase()) {
                    case 'success':
                        console.log(status);
                    break;

                    default:
                        console.log(status);
                    break;
                }
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    render() {
        return (
            <Context.Provider value={
                {
                    login: this.login,
                    logout: this.logout,
                    register: this.register,
                    addTodo: this.addTodo,
                    removeTodo: this.removeTodo,
                    token: this.state.token,                    
                    loginSuccess: this.state.loginSuccess,
                    registrationSuccess: this.state.registrationSuccess,
                    addTodoSuccess: this.state.addTodoSuccess,
                    removeTodoSuccess: this.state.removeTodoSuccess,
                    addTodoErrorMessage: this.state.addTodoErrorMessage,
                    removeTodoErrorMessage: this.state.removeTodoErrorMessage,
                    loginErrorMessage: this.state.loginErrorMessage,
                    registrationErrorMessage: this.state.registrationErrorMessage,
                    todos: this.state.todos,
                    completeTodo: this.completeTodo
                }
            }>
                { this.props.children }
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;
