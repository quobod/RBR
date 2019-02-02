import React from 'react';
import { Consumer } from '../AppContext';

class JournalItem extends React.Component {

    componentDidMount() {
        const script = document.createElement('script');
        script.src = '/js/accordion.js';
        document.body.appendChild(script);
    }

    render() {
        const { title, body } = this.props.journal;
        return (
                <Consumer>
                    {value => {
                        // const { removeJournal, canCommentJournal } = value;
                        return(<li className="list-item">
                            <button className="accordion">{title}</button>
                            <div className="panel">
                                <p>{body}</p>
                            </div>
                        </li>)
                    }}
                </Consumer>
        );
    }
}

export default JournalItem;
