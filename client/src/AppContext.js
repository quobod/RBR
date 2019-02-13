import Axios from 'axios';
import React, { Component } from 'react';
const Context = React.createContext();

export class Provider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            journals: [],
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: JSON.parse(localStorage.getItem("token")) || "",
            registrationSuccess: true,
            addTodoSuccess: true,
            removeTodoSuccess: true,
            addTodoErrorMessage: '',
            removeTodoErrorMessage: '',
            loginErrorMessage: '',
            registrationErrorMessage: '',
            addJournalSuccess: true
        };
    }

    initTodos = () => {
        Axios.get('/api/todos')
        .then(response => this.setState({ todos: response.data }))
        .catch(err => console.log(`Todos Error: ${err.message}`));
    }

    initJournals = () => {
        Axios.get('/api/journals')
        .then(response => this.setState({ journals: response.data }))
        .catch(err => console.log(`Journals Error: ${err.message}`));
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
                            loginErrorMessage: ''
                        });
                        this.initTodos();
                        this.initJournals();
                        console.log('Logged In');
                    break;

                    default:
                        this.setState({
                            user: {},
                            token: "",
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

    addJournal = (data) => {
        Axios.post('/api/journals/add', data)
            .then(response => {
                console.log(response.data);
                switch(response.data.status.toLowerCase()) {
                    case 'success':
                        this.setState({
                            addJournalSuccess: true
                        })
                        this.initJournals();
                    break;

                    default:
                        this.setState({
                            addJournalSuccess: false
                        })
                    break;
                }
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    removeJournal = (id) => {
        Axios.get(`/api/journals/remove/${id}`)
            .then(response => {
                console.log(response.data);
                this.initJournals();
            })
            .catch(err => {
                console.log(`\n\t\t${err.message}\n`);
            });
    }

    canCommentJournal = (id) => {
        console.log(`\n\n\t\t\tCommenting Journal ID: ${id}\n\n`);
    }

    editJournal = (id) => {
        console.log(`\n\n\t\t\tCommenting Journal ID: ${id}\n\n`);
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
                    registrationSuccess: this.state.registrationSuccess,
                    addTodoSuccess: this.state.addTodoSuccess,
                    removeTodoSuccess: this.state.removeTodoSuccess,
                    addTodoErrorMessage: this.state.addTodoErrorMessage,
                    removeTodoErrorMessage: this.state.removeTodoErrorMessage,
                    loginErrorMessage: this.state.loginErrorMessage,
                    registrationErrorMessage: this.state.registrationErrorMessage,
                    todos: this.state.todos,
                    journals: this.state.journals,
                    addJournal: this.addJournal,
                    addJournalSuccess: this.state.addJournalSuccess,
                    removeJournal: this.removeJournal,
                    canCommentJournal: this.canCommentJournal,
                    editJournal: this.editJournal,
                    completeTodo: this.completeTodo
                }
            }>
                { this.props.children }
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;
