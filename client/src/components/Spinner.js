import React from 'react';
import spinner from './spinner.gif';

export default () => {
  return (
    <div className="content">
      <img className="spinner"
        src={spinner}
        alt="Loading..."
      />
    </div>
  );
};