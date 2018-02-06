/* global localStorage */

import React, { Component } from 'react';
import classes from './App.css';
import Map from './containers/Map/Map';

class App extends Component {
  render() {
    // this.props.localstorage is used for test
    const localstorage = this.props.localstorage || localStorage;

    return (
      <div className={classes.app}>
        <Map localstorage={localstorage} />
      </div>
    );
  }
}

export default App;
