import React from 'react';
import moment from 'moment';
import { Consumer } from '../AppContext';

class JournalItem extends React.Component {
    
    cap = (str) => `${str.substr(0,1).toUpperCase()}${str.substr(1)}`;

    formatDate = (date, format) => moment(date).format(format);

    render() {
        const { title, body, user, createdAt, updatedAt } = this.props.journal;
        return (
                <Consumer>
                    {value => {
                        // const { removeJournal, canCommentJournal } = value;
                        return (<li className="list-item">
                            <button className="accordion"><b>{this.cap(title)}</b></button>
                            <div className="panel">
                                <p className="body">{body}</p>
                                <div className="detail">
                                    <div className="author">
                                        <label><b>Author:</b> {this.cap(user.firstName.trim())} {this.cap(user.lastName.trim())}</label>
                                        <label><b>Created:</b> {this.displayDate(createdAt)}</label>
                                        <label><b>Last Update:</b> {this.displayDate(updatedAt)}</label>
                                    </div>
                                </div>
                            </div>
                        </li>)
                    }}
                </Consumer>
        );
    }
}

export default JournalItem;
