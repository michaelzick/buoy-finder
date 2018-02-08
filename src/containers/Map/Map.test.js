import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import loadGoogleMapsAPI from 'load-google-maps-api';
import { Map } from './Map';

configure({adapter: new Adapter()});

const localStorageMock = (() => {
  const store = {};

  return {
    getItem: (key) => {
      return store[key];
    },
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key) => {
      delete store[key];
    },
    getStore: () => {
      return store;
    }
  };
})();

// Define localStorage on window
Object.defineProperty(window, 'localStorage', {value: localStorageMock});

describe ('Map.getGeoRssLayer', () => {
  it('should return a GeoRSS object', () => {
    const wrapper = shallow(<Map localstorage={window.localStorage} />),
          instance = wrapper.instance();

    return loadGoogleMapsAPI().then(googleMaps => {
      const geoRssObject = instance.getGeoRssLayer(googleMaps);

      // Checks if returned object has the expected keys
      expect(Object.keys(geoRssObject)).toEqual(['gm_accessors_', 'url', 'gm_bindings_']);
    });
  });
});

describe ('Map.addToFavs', () => {
  it('should add fav to localStorage and state', () => {
    const wrapper = shallow(<Map localstorage={window.localStorage} />),
          instance = wrapper.instance(),
          element = document.createElement('div'),
          data = {
            description: 'the description',
            id: '123',
            infoWindowHtml: '<div id="info-window-html"></div>',
            name: 'Buoy A',
            snippet: 'Feb 5, 2018 snippet',
            status: 'OK'
          };

    element.target = {
      innerHTML: '+'
    };

    instance.addToFavs(element, data);

    // Checks that state.favs is equal to window.localStorage
    expect (instance.state.favs.getStore())
        .toEqual(window.localStorage.getStore());

    // Checks that '+' is changed to 'Added!'
    expect (element.target.innerHTML).toBe('Added!');
  });
});

describe ('Map.deleteFav', () => {
  it('should remove fav from localStorage and state', () => {
    const wrapper = shallow(<Map localstorage={window.localStorage} />),
          instance = wrapper.instance(),
          element = document.createElement('div'),
          dataA = {
            description: 'the description',
            id: '123',
            infoWindowHtml: '<div id="info-window-html"></div>',
            name: 'Buoy A',
            snippet: 'Feb 5, 2018 snippet',
            status: 'OK'
          },
          dataB = {
            description: 'another description',
            id: '456',
            infoWindowHtml: '<div id="info-window-html"></div>',
            name: 'Buoy B',
            snippet: 'Feb 7, 2018 snippet',
            status: 'OK'
          };

    let storeKeysLength = 0;

    element.target = {
      innerHTML: '+'
    };

    // Add favs
    instance.addToFavs(element, dataA);
    instance.addToFavs(element, dataB);

    // Remove a fav
    instance.deleteFav(dataA.id);

    // Get the number of keys in the localStorage store object
    storeKeysLength = Object.keys(window.localStorage.getStore()).length;

    // Checks that state.favs is equal to window.localStorage
    expect (instance.state.favs.getStore())
        .toEqual(window.localStorage.getStore());

    // Checks that state.favs is equal to window.localStorage
    expect(storeKeysLength).toEqual(1);
  });
});
