import React from 'react';
import moment from 'moment';
import { Consumer } from '../AppContext';

class JournalItem extends React.Component {

    componentDidMount() {
        this.loadAccordionScript();
    }

    cap = (str) => {
        if ((Array.isArray(str), null !== str && 
            undefined !== str) ||
            (null !== str && 
                undefined !== str && 
                (str instanceof Object))) {
            let newStr = '';

            for (let s in str) {
                let word = str[s];
                if (word){
                    newStr += `${word.substr(0,1).toUpperCase()}${word.substr(1)} `;
                }
            }

            return newStr.trim();
        }
        return `${str.substr(0,1).toUpperCase()}${str.substr(1)}`;
    }

    formatDate = (date, format) => moment(date).format(format);
    
    date = (arg) => this.formatDate(arg, 'MMMM Do YYYY');

    loadAccordionScript = () => {
        const script = document.createElement('script');
        script.src = '/js/accordion.js';
        document.body.appendChild(script);
    }

    render() {
        const { title, body, user, createdAt, updatedAt } = this.props.journal;
        return (
                <Consumer>
                    {value => {
                        // const { removeJournal, canCommentJournal } = value;
                        return (<li className="list-item">
                            <button className="accordion"><b>{title}</b></button>
                            <div className="panel">
                                <p className="body">{body}</p>
                                <div className="detail">
                                    <div className="author">
                                        <label><b>Author:</b> {this.cap([user.firstName.trim(), user.lastName.trim()])}</label>
                                        <label><b>Created:</b> {this.date(createdAt)}</label>
                                        <label><b>Last Update:</b> {this.date(updatedAt)}</label>
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
