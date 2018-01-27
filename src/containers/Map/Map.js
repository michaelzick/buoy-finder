import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import loadGoogleMapsAPI from 'load-google-maps-api';
import Sidebar from '../../components/Sidebar/Sidebar';
import InfoWindow from '../../components/InfoWindow/InfoWindow';
import classes from './Map.css';

class Map extends Component {
  state = {
    favs: localStorage,
  };

  componentDidMount () {
    // Load the Google Map then initialize it
    loadGoogleMapsAPI().then((googleMaps) => {

      // Initialize map while setting var for transport
      const geoLayer = this.initMap(googleMaps);

      // Add events and dom stuff
      this.addDomControls(geoLayer);

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

    return georssLayer;
  }

  addToFavs = (markerData) => {
    const favsJson = {};

    // Add the markerData object to an id key for storage
    favsJson[markerData.id] = markerData;

    // Set the item in storage (has to be string)
    localStorage.setItem(markerData.id, JSON.stringify(favsJson));

    this.setState({
      favs: localStorage
    });
  }

  clearAllFavs = () => {
    localStorage.clear();

    this.setState({
      favs: localStorage
    });

    console.log(!this.state.favs.length);
  }

  // Adds custom html and click event to infoWindow
  // Action: marker click
  addDomControls = georssLayer => {
    georssLayer.addListener('click', (e) => {
      // Pass in a copy of the data, not the reference
      const newData = {...e.featureData},
            infoWindowHtml = <InfoWindow
                               element={e}
                               data={newData}
                               addFav={this.addToFavs}
                             />;

      // Set the infoWindow html
      e.featureData.infoWindowHtml = ReactDOMServer.renderToString(infoWindowHtml);
    });
  }

  render() {
    return (
      <div className={classes.mapWrap}>
        <Sidebar favs={this.state.favs} clearFavs={this.clearAllFavs} />
        <div className={classes.map} id="map"></div>
      </div>
    );
  }
}

export default Map;
