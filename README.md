# Welcome to the Buoy Finding & Favoriting (BFF) app! <br>Your BFF when it comes to finding waves.

## Installation is easy

- In the terminal of your choice, make sure you have Node v6.11.2 or later installed:

`$ node -v`

- If you don't, I recommend the [NVM way](https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/).

- Next, head over to the [GitHub repo](https://github.com/zickonezero/sl), click the Clone or download menu and choose SSH or HTTPS.

- Once it's cloned locally, install the dependencies:

`$ npm install --progress`

- When that's done, run the server and start the app:

`$ npm start`

A new browser tab or window should open and you should see buoy markers on a Google Map and a favorites sidebar on the left.

Select a marker in the map to view the live buoy readings from [NDBC](http://www.ndbc.noaa.gov/rss/ndbc_obs_search.php?lat=40N&lon=73W&radius=100).
To add a favorite buoy just click the [ + ] button.
Your favorites will be stored in your local browser storage, so you won't lose em
if you refresh or close the page.

## That's it!

##### Some technical details:

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app),
however the Webpack config files were exposed using `$ npm run eject`. The reason for this
was to customize the CSS modules, and enable the inlining of classes from regular CSS files.

For more information [read this](https://medium.com/nulogy/how-to-use-css-modules-with-create-react-app-9e44bec2b5c2).
