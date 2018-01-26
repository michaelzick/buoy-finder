import React, { Component } from 'react';
import './App.css';
import loadGoogleMapsAPI from 'load-google-maps-api';

class App extends Component {
  componentDidMount () {
    loadGoogleMapsAPI().then((googleMaps) => {
      console.log(googleMaps);
      this.initMap(googleMaps);
    }).catch((err) => {
      console.error(err);
    });
  }

  initMap = (googleMaps) => {
    var map = new googleMaps.Map(document.getElementById('map'), {
      zoom: 4,
      center: {lat: 49.496675, lng: -102.65625}
    });

    var georssLayer = new googleMaps.KmlLayer({
      url: 'http://www.ndbc.noaa.gov/rss/ndbc_obs_search.php?lat=40N&lon=73W&radius=100'
    });

    georssLayer.setMap(map);

    georssLayer.addListener('click', function(e) {
    	let newData = {...e.featureData};

      newData.infoWindowHtml = '<h1>hello</h1>' + e.featureData.infoWindowHtml;

      e.featureData.infoWindowHtml = newData.infoWindowHtml;

    	console.log(newData.infoWindowHtml);
    });
  }

  render() {
    return (
      <div className="App">
        <div id="map"></div>
      </div>
    );
  }
}

export default App;
