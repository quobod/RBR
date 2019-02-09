import React from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../../AppContext';
import JournalItem from '../JournalItem';

class Journals extends React.Component {

    componentDidMount() {
        document.title = 'Journals';
    }

    render() {
        return (
            <div className="content">
                <ul>
                    <Link to="/addjournal" className="link">Add</Link>
                </ul>
                <Consumer>
                    {value => {
                        const { journals } = value;
                        if (undefined === journals || journals.length < 1) {
                            return (<h2>No Journals</h2>)
                        } else {
                            return (
                                <div className="journal-list-parent">
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
            </div>
        )
    }
}


export default Journals;
