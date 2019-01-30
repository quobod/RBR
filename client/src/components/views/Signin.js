import React from 'react';
import { Redirect } from 'react-router-dom';
import { Consumer } from '../../AppContext';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {            
            usernameOrEmail: '',
            password: ''       
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
            usernameOrEmail: '',
            password: ''
        });
    }

    render() {
        return (
            <div className="content">
            <Consumer>
                {value => {
                    const { login, token, loginErrorMessage } = value;
                    
                    return (
                        <div className="form-wrapper">
                            <form className="signin-form" onSubmit={(e) => {
                                e.preventDefault();
                                const { usernameOrEmail, password } = e.target;
                                const data = { usernameOrEmail: usernameOrEmail.value, password: password.value };                                
                                login(data);
                                this.clearInputs();
                            }}>
                                <div className="input-group">
                                    <input onChange={this.handleChange} type="text" name="usernameOrEmail" value={this.state.usernameOrEmail} required placeholder="Enter username or email" />
                                </div>
                                <div className="input-group">
                                    <input onChange={this.handleChange} type="password" name="password" value={this.state.password} required placeholder="Enter password" />
                                </div>
                                <div className="input-group">
                                    <input type="submit" value="Submit" />
                                </div>
                                {
                                    token &&
                                    <Redirect to="/dashboard" />
                                }

                                {
                                    loginErrorMessage &&
                                    <p>{loginErrorMessage}</p>
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

export default Signin;
