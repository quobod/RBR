import React from 'react';
import { Consumer } from '../../AppContext';
import Spinner from '../Spinner';

class Site extends React.Component {

    render() {
        return (
            <Consumer>
                {value => {
                    const { users } = value;
                    if (undefined === users || users.length < 1) {
                        return <Spinner />
                    } else {
                        return (
                            <div className="content">
                                <ul className="user-list">
                                    {users.map(user => {
                                        return <li key={user.email}>{user.name}</li>
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

export default Site;
