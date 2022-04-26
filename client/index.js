import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store.js';

// import styles from './styles.css';
import './styles.css';

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// "dev": "concurrently \"cross-env NODE_ENV=development webpack serve --open\" \"cross-env NODE_ENV=development nodemon server/server.js\""
