import React, { Component } from 'react';
import loadGoogleMapsAPI from 'load-google-maps-api';
import Sidebar from '../../components/Sidebar/Sidebar';
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

  addToFavs = (newData) => {
    const favsJson = {};

    // Add the newData object to an id key for storage
    favsJson[newData.id] = newData;

    // Set the item in storage (has to be string)
    localStorage.setItem(newData.id, JSON.stringify(favsJson));

    this.setState({
      favs: localStorage
    });

    console.log(this.state.favs);
  }

  // Adds custom html and click event to infoWindow
  // Action: marker click
  addDomControls = georssLayer => {
    georssLayer.addListener('click', (e) => {
      const newData = {...e.featureData}, // Copy the feature data first
          infoWinDiv = document.createElement('div'),
          clearDiv = document.createElement('div'),
          favBarDiv = document.createElement('div'),
          favBarPlusDiv = document.createElement('div'),
          favBarTextDiv = document.createElement('div'),
          favBarText = document.createTextNode('Add to favorites'),
          favBarPlus = document.createTextNode('+');

      // Div to clear floats (utility);
      clearDiv.classList.add(classes.clearDiv);

      favBarTextDiv.appendChild(favBarText); // Add the text to the span element
      favBarPlusDiv.appendChild(favBarPlus); // Add the '+' to the div element

      // Adds classes to the elements
      favBarTextDiv.classList.add(classes.favBarText);
      favBarPlusDiv.classList.add(classes.favBarPlus);

      // Clicking '+' updates state and adds to favs
      favBarPlusDiv.addEventListener('click', () => {
        this.addToFavs(newData);
      });

      favBarDiv.appendChild(favBarTextDiv); // Add the text to the parent div
      favBarDiv.appendChild(favBarPlusDiv); // Add the '+' to the parent div
      favBarDiv.appendChild(clearDiv); // Add the clearDiv to the parent div

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
        <Sidebar favs={this.state.favs} />
        <div className={classes.map} id="map"></div>
      </div>
    );
  }
}

export default Map;
