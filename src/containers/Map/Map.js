import React, { Component } from 'react';
import loadGoogleMapsAPI from 'load-google-maps-api';
import Sidebar from '../../components/Sidebar/Sidebar';
import classes from './Map.css';

class Map extends Component {
  state = {
    sidebarInfo: null,
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

  addToFavs = (newData) => {
    const favsJson = {};

    favsJson[newData.id] = newData;

    localStorage.setItem(newData.id, JSON.stringify(favsJson));

    console.log(localStorage);
  }

  addDomControls = georssLayer => {
    georssLayer.addListener('click', (e) => {
      const newData = {...e.featureData}, // Copy the feature data first
          infoWinDiv = document.createElement('div'),
          favBarDiv = document.createElement('div'),
          favBarPlusDiv = document.createElement('div'),
          favBarTextDiv = document.createElement('div'),
          favBarText = document.createTextNode('Add to favorites'),
          favBarPlus = document.createTextNode('+');

      favBarTextDiv.appendChild(favBarText); // Add the text to the span element
      favBarPlusDiv.appendChild(favBarPlus); // Add the + to the div element

      favBarTextDiv.classList.add('fav-bar-text');
      favBarPlusDiv.classList.add('fav-bar-plus');

      favBarPlusDiv.addEventListener('click', () => {
          this.setState({
            sidebarInfo: newData
          });

        this.addToFavs(newData);
      });

      favBarDiv.appendChild(favBarTextDiv); // Add the text/+ to the parent div
      favBarDiv.appendChild(favBarPlusDiv); // Add the text/+ to the parent div

      infoWinDiv.appendChild(favBarDiv);

      infoWinDiv.insertAdjacentHTML('beforeend', e.featureData.infoWindowHtml);

      // Add custom html to the infoWindow
      newData.infoWindowHtml = infoWinDiv;

      // Set the infoWindow html
      e.featureData.infoWindowHtml = newData.infoWindowHtml;
    });
  }

  render() {
    return (
      <div className={classes.mapWrap}>
        <Sidebar info={this.state.sidebarInfo} />
        <div className={classes.map} id="map"></div>
      </div>
    );
  }
}

export default Map;
