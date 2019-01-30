import React from 'react';
import { Consumer } from '../AppContext';

class JournalItem extends React.Component {
    render() {
        const { title, _id, body } = this.props.journal;
        return (
            <Consumer>
                {value => {
                    const { removeJournal, canCommentJournal } = value;
                    return(<li className="list-item">
                        <div className="journal-item">
                            
                        </div>
                    </li>)
                }}
            </Consumer>
        );
    }
}

export default JournalItem;
