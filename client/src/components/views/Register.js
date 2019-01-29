import React from 'react';
import { Redirect } from 'react-router-dom';
import { Consumer } from '../../AppContext';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            uname: '',
            email: '',
            pwd: '',
            pwd2: ''
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    clearInputs = () => {
        this.setState({
            fname: '',
            lname: '',
            uname: '',
            email: '',
            pwd: '',
            pwd2: ''
        })
    }
    
    render() {
        return (
            <div className="content">
                <Consumer>
                    {value => {
                        const { register, registrationSuccess, registrationErrorMessage, token } = value;
                        return (
                            <div className="form-wrapper">
                                <form className="register-form" onSubmit={(e)=>{
                                    e.preventDefault();
                                    const { fname, lname, uname, email, pwd, pwd2 } = e.target;
                                    const data = {
                                        fname: fname.value,
                                        lname: lname.value,
                                        uname: uname.value,
                                        email: email.value,
                                        pwd: pwd.value,
                                        pwd2: pwd2.value
                                    };

                                    register(data);
                                    if (registrationSuccess) {
                                        this.clearInputs();
                                    }
                                }}>
                                    <div className="input-group">
                                        <input onChange={this.handleChange} type="text" name="fname" value={this.state.fname} placeholder="Enter your first name" required/>
                                    </div>
                                    <div className="input-group">
                                        <input onChange={this.handleChange} type="text" name="lname" value={this.state.lname} placeholder="Enter your last name" required/>
                                    </div>
                                    <div className="input-group">
                                        <input onChange={this.handleChange} type="text" name="uname" value={this.state.uname} placeholder="Create a username" required/>
                                    </div>
                                    <div className="input-group">
                                        <input onChange={this.handleChange} type="email" name="email" value={this.state.email} placeholder="Enter your email" required/>
                                    </div>
                                    <div className="input-group">
                                        <input onChange={this.handleChange} type="password" name="pwd" value={this.state.pwd} placeholder="Create a password" required/>
                                    </div>
                                    <div className="input-group">
                                        <input onChange={this.handleChange} type="password" name="pwd2" value={this.state.pwd2} placeholder="Confirm password" required/>
                                    </div>
                                    <div className="input-group">
                                        <input type="submit" value="Submit"/>
                                    </div>
                                    {
                                        token && 
                                        <Redirect to="/todos" />
                                    }
                                   
                                    {
                                        registrationErrorMessage &&
                                        <p className="error">{registrationErrorMessage}</p>
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

export default Register;
