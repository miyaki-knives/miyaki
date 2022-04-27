import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App.jsx';

// import styles from './styles.css';
import './styles.css';

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(<App />);

// "dev": "concurrently \"cross-env NODE_ENV=development webpack serve --open\" \"cross-env NODE_ENV=development nodemon server/server.js\""
