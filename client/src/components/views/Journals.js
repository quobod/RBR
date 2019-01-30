import React from 'react';
import { Consumer } from '../../AppContext';
import JournalItem from '../JournalItem';

class Journals extends React.Component {
    render() {
        return (
            <Consumer>
                {value => {
                    const { journals } = value;
                    if (undefined === journals || journals.length < 1) {
                        return (<div className="content"><h2>No Journals</h2></div>)
                    } else {
                        return (
                            <div className="content">
                                <ul className="journal-list">
                                    {journals.map(journal => {
                                        return <JournalItem key={journal._id} journal={journal} />
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


export default Journals;
