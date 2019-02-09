import React, { Component } from 'react'

export default class About extends Component {

    componentDidMount() {
        document.title = 'About';
    }

  render() {
    return (
        <div className="content">
            <h3>A React App For Reference</h3>
            <p>Version: 1.0.0</p>
        </div>
    )
  }
}
