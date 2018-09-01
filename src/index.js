import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ButtonCounter from './ButtonCounter';
import MainCard from './card';
import MainGame from './Game';
import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<ButtonCounter />, document.getElementById('root'));
//ReactDOM.render(<MainCard  />, document.getElementById('root'));
ReactDOM.render(<MainGame  />, document.getElementById('root'));

registerServiceWorker();
