import React, { Component } from 'react';
import loadGoogleMapsAPI from 'load-google-maps-api';
import Sidebar from '../../components/Sidebar/Sidebar';

class Map extends Component {
  state = {
    sidebarInfo: null
  };

  componentDidMount () {
    // Load the Google Map then initialize it
    loadGoogleMapsAPI().then((googleMaps) => {
      this.initMap(googleMaps);
    }).catch((err) => {
      console.error(err);
    });
  }

  initMap = (googleMaps) => {
    const map = new googleMaps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {lat: 49.496675, lng: -102.65625}
      }),
      georssLayer = new googleMaps.KmlLayer({
        url: 'http://www.ndbc.noaa.gov/rss/ndbc_obs_search.php?lat=40N&lon=73W&radius=100'
      });

    georssLayer.setMap(map);
    georssLayer.addListener('click', (e) => {
      // Copy the feature data first
    	let newData = {...e.featureData};

      // Add custom html to the infoWindow
      newData.infoWindowHtml = '<h1>hello</h1>' + e.featureData.infoWindowHtml;

      // Set the infoWindow html
      e.featureData.infoWindowHtml = newData.infoWindowHtml;

      this.setState({
        sidebarInfo: newData
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Sidebar info={this.state.sidebarInfo}/>
        <div id="map"></div>
      </div>
    );
  }
}

export default Map;
