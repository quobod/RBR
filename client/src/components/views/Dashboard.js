import React from 'react';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        document.title = 'Dashboard';
    }

    render() {
        return (
            <div className="content">
                <h2>Dashboard</h2>
            </div>
        );
    }
}

export default Dashboard;
