import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

// uncomment so that webpack can bundle styles
import styles from './styles.css';

render(
  <App />,
  document.getElementById('root')
);


// "dev": "concurrently \"cross-env NODE_ENV=development webpack serve --open\" \"cross-env NODE_ENV=development nodemon server/server.js\""