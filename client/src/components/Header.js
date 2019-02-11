import React from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../AppContext';

class Header extends React.Component {

    loggedIn = (logout) => {
        return (
            <ul>
                <Link to="/todos" className="link">Todos&nbsp;</Link>
                <Link to="/journals" className="link">Journals&nbsp;</Link>  
                <Link to="/dashboard" className="link">Dashboard&nbsp;</Link> 
                <button onClick={logout} className="auth-button">
                    Signout
                </button>
            </ul>
        );
    }
    
    loggedOut = () => {
        return (
            <ul>
                <Link to="/" className="link">Home&nbsp;</Link> 
                <Link to="/about" className="link">About&nbsp;</Link>
                <Link to="/signin" className="link">Signin&nbsp;</Link>
                <Link to="/register" className="link">Signup&nbsp;</Link>               
            </ul>
        );
    }

    render() {
        return (
            <header className="nav-bar">
                <Consumer>
                    {value => {
                        const { logout, token } = value;                       
                        return (
                            <div>
                                {token ? this.loggedIn(logout) : this.loggedOut()}
                            </div>
                       )
                    }}                      
                </Consumer>
            </header>
        );
    }
}

export default Header;