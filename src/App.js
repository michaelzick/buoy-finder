import React, { Component } from 'react';
import classes from './App.css';
import Map from './containers/Map/Map';

class App extends Component {
  render() {
    return (
      <div className={classes.app}>
        <Map />
      </div>
    );
  }
}

export default App;
