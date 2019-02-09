import React, { Component } from 'react';
import Utils from '../../custom_modules/Utils';

export default class Home extends Component {

    componentDidMount() {
        document.title = 'ick JW App';
    }

  render() {
      const { cap } = Utils;
    return (
        <div className="content">
            <h1>{cap(['welcome','to','rick','jW','site'])}</h1>
            <p>This is a React web application</p>
        </div>
    )
  }
}
