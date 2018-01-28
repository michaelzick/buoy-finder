/* global localStorage */

import React, { Component } from 'react';
import loadGoogleMapsAPI from 'load-google-maps-api';
import ReactDOM from 'react-dom';
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

  addToFavs = (element, data) => {
    const favsJson = {},
          featureData = {...data};

    // Delete this so we don't get a circular DOM reference
    delete featureData.infoWindowHtml;

    // Add the object to an id key for storage
    favsJson[featureData.id] = featureData;

    // Set the item in storage (has to be string)
    localStorage.setItem(featureData.id, JSON.stringify(favsJson));

    // Change the '+' to Added!
    element.target.innerHTML = 'Added!';

    this.setState({
      favs: localStorage
    });
  }

  clearAllFavs = () => {
    localStorage.clear();

    this.setState({
      favs: localStorage
    });
  }

  deleteFav = (favId) => {
    localStorage.removeItem(favId);

    this.setState({
      favs: localStorage
    });
  }

  addDomControls = georssLayer => {
    // Adds custom html and click event to infoWindow
    // Action: marker click
    georssLayer.addListener('click', (e) => {
      const featureData = {...e.featureData}; // Copy the feature data first
      let addToFavoritesHtml = '',
          renderedFavoritesHtml;

      // Don't append add to favorites html
      // if it's already a favorite
      if (!this.state.favs[featureData.id]) {
        addToFavoritesHtml = <div>
                               <div className={classes.favBarText}>Add to favorites</div>
                               <div className={classes.favBarPlus} onClick={(element) => this.addToFavs(element, featureData)}>+</div>
                               <div className={classes.clearDiv}></div>
                             </div>;

        // Use ReactDOM to create a real DOM element
        renderedFavoritesHtml = ReactDOM.render(addToFavoritesHtml, document.createElement('div'));

        // Insert the original infoWindow html after the add favorite html
        renderedFavoritesHtml.insertAdjacentHTML('beforeend', featureData.infoWindowHtml);

        // Set the infoWindow html
        e.featureData.infoWindowHtml = renderedFavoritesHtml;
      } else {
        // If childNodes exist, it means that the above html has been set/buoy is favorited
        // Therefore, set the infoWindow html to the last node (the original html)
        if (featureData.infoWindowHtml.childNodes && featureData.infoWindowHtml.childNodes.length > 1) {
          e.featureData.infoWindowHtml = featureData.infoWindowHtml.childNodes[
                                           featureData.infoWindowHtml.childNodes.length - 1
                                         ];
        }
      }
    });
  }

  render() {
    return (
      <div className={classes.mapWrap}>
        <Sidebar
          favs={this.state.favs}
          deleteFav={this.deleteFav}
          clearFavs={this.clearAllFavs} />
        <div className={classes.map} id="map"></div>
      </div>
    );
  }
}

export default Map;
