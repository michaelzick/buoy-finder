import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackCdnPlugin from 'webpack-cdn-plugin';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
