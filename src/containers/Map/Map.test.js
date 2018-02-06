import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Map } from './Map';
// import loadGoogleMapsAPI from 'load-google-maps-api';

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
    }
  };
})();

// Define localStorage on window
Object.defineProperty(window, 'localStorage', {value: localStorageMock});

describe ('Map.addToFavs', () => {
  it ('should add fav to localStorage and state', () => {
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
    expect (instance.state.favs.getItem(data.id))
        .toEqual(window.localStorage.getItem(data.id));

    // Checks that '+' is changed to 'Added!'
    expect (element.target.innerHTML).toBe('Added!');
  });
});

// describe ('Map.initMap', () => {
//   it ('should return a geoRSS layer', () => {
//     const wrapper = shallow(<Map localstorage={{}} />),
//           instance = wrapper.instance(),
//           spy = jest.spyOn(instance, 'getGeoRssLayer');

//     window.localStorage.setItem('foo', 'bar');
//     console.log(window.localStorage);

//     return loadGoogleMapsAPI().then(googleMaps => {

//       // console.log(spy);

//       // expect.assertions(1);
//       expect(instance.getGeoRssLayer).toHaveBeenCalled();
//       // expect (typeof (instance.getGeoRssLayer(googleMaps)).toBe('string'))
//     }).catch(err => {
//       // console.error(err);
//     });
//   });
// });
