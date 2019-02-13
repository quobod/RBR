import React from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../AppContext';
import Utils from '../custom_modules/Utils';

class JournalItem extends React.Component {
    accClicked = (e) => {
        const btn = e.target;
        btn.classList.toggle('active');
        const panel = btn.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    }

    render() {
        const { title, body, user, createdAt, updatedAt, isPublic, _id } = this.props.journal;
        const { cap, displayDate } = Utils;
        return (
            <Consumer>
                {value => {
                    const { removeJournal } = value;
                    return (<li className="list-item">
                        <button onClick={this.accClicked} className="accordion"><b>{cap(title)}</b></button>
                        <div className="panel">
                            <p className="journal-body">{body}</p>
                            <div className="journal-detail">
                                <div className="journal-author">
                                    <label className="detail">Author: {cap([user.firstName.trim(),user.lastName.trim()])}</label>
                                    <label className="detail">Created: {displayDate(createdAt)}</label>
                                    <label className="detail">Last Update: {displayDate(updatedAt)}</label>
                                    <label className="detail">Published: {isPublic?'Yes':'No'}</label>
                                </div>
                                <div className="journal-controls">
                                    <div>
                                        <button onClick={()=>{
                                            removeJournal(_id)
                                        }} className="delete-journal">
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                    <div>
                                        <Link to="/editjournal" className="edit-journal">
                                            <i className="fas fa-pencil-alt"></i>
                                        </Link>
                                    </div>
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
