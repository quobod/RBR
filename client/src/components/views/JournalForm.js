import React from 'react';
import { Redirect } from 'react-router-dom';
import { Consumer } from '../../AppContext';

class JournalForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {            
            user: JSON.parse(localStorage.getItem("user")) || {},
            title: '',
            body: '',
            canComment: false,
            submitted: false      
        };
    }

    componentDidMount() {
        document.title = 'Add Journal';
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    clearInputs = () => {
        this.setState({
            title: '',
            body: '',
            canComment: false
        });
    }

    render() {
        return (
            <div className="content">
                <Consumer>
                    {value => {
                        const { addJournal, addJournalSuccess } = value;
                        
                        return (
                            <div className="form-wrapper">
                                <form className="add-journal-form" onSubmit={(e) => {
                                    e.preventDefault();
                                    const { title, body, canComment, user } = e.target;
                                    const data = { title: title.value, user: user.value, body: body.value, canComment: canComment.checked };
                                    addJournal(data);
                                    this.clearInputs();
                                    this.setState({
                                        submitted: addJournalSuccess
                                    });
                                }}>
                                    <div className="input-group">
                                        <input onChange={this.handleChange} type="text" name="title" value={this.state.title} required placeholder="Enter title" />
                                    </div>
                                    <div className="input-group">
                                        <textarea className="body" onChange={this.handleChange} name="body" value={this.state.body} required placeholder="Type your entry">
                                        </textarea>
                                    </div>
                                    <div className="input-group">
                                        <input onChange={() => {                                            
                                            this.setState((state, props) => ({
                                                canComment: state.canComment === false? true:false
                                            }));
                                        }} type="checkbox" name="canComment" checked={this.state.canComment} /><label>Commentable?</label>
                                    </div>
                                    <div className="input-group">
                                        <input type="hidden" name="user" value={this.state.user._id} required />
                                    </div>
                                    <div className="input-group">
                                        <input type="submit" value="Submit" />
                                    </div>
                                    {
                                        this.state.submitted &&
                                        <Redirect to="/journals" />
                                    }
                                </form>
                            </div>
                        )
                    }}
                </Consumer>
            </div>
        );
    }
}

export default JournalForm;