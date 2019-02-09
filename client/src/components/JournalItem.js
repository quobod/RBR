import React from 'react';
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
        const { title, body, user, createdAt, updatedAt } = this.props.journal;
        const { cap, displayDate } = Utils;
        return (
            <Consumer>
                {value => {
                    // const { removeJournal, canCommentJournal } = value;
                    return (<li className="list-item">
                        <button onClick={this.accClicked} className="accordion"><b>{cap(title)}</b></button>
                        <div className="panel">
                            <p className="journal-body">{body}</p>
                            <div className="journal-detail">
                                <div className="journal-author">
                                    <label className="detail">Author: {cap([user.firstName.trim(),user.lastName.trim()])}</label>
                                    <label className="detail">Created: {displayDate(createdAt)}</label>
                                    <label className="detail">Last Update: {displayDate(updatedAt)}</label>
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
