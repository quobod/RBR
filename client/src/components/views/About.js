import React, { Component } from 'react'

export default class About extends Component {

    componentDidMount() {
        document.title = 'About';
    }

  render() {
    return (
        <div className="content">
            <h2 className="mission-parent">A React App For <i className="mission">Developer Reference</i></h2>
            <p>Version: 1.0.0</p>
            <p><a href="https://github.com/quobod/RAR" target="_blank">Repo</a></p>
        </div>
    )
  }
}
