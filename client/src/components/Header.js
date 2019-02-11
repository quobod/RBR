import React from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../AppContext';

class Header extends React.Component {

    loggedIn = (logout) => {
        return (
            <ul>
                <li>
                    <ul>
                        <Link to="/todos" className="link">Todos&nbsp;</Link>
                        <Link to="/journals" className="link">Journals&nbsp;</Link>  
                        <Link to="/dashboard" className="link">Dashboard&nbsp;</Link> 
                    </ul>
                </li>
                <li>
                    <button onClick={logout} className="auth-button">
                        Signout
                    </button>
                </li>
            </ul>
        );
    }
    
    loggedOut = () => {
        return (
            <ul>
                <li>
                    <ul>
                        <Link to="/" className="link">Home&nbsp;</Link> 
                        <Link to="/about" className="link">About&nbsp;</Link>
                    </ul>
                </li>
                <li>
                    <ul>
                        <Link to="/signin" className="link">Signin&nbsp;</Link>                     
                        <Link to="/register" className="link">Signup&nbsp;</Link>  
                    </ul>   
                </li>     
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
                            <div className="nav-bar">
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