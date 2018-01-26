import React, { Component } from 'react';
import './App.css';
import loadGoogleMapsAPI from 'load-google-maps-api';
import Map from './containers/Map/Map';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Map />
      </div>
    );
  }
}

export default App;
