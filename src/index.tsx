import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as  Router} from "react-router-dom";
import {AppProvider} from './services/context'
import './index.css';
import App from './App';
// import {requestPermission} from './push-notification'
import registerServiceWorker from "./serviceWorker";

ReactDOM.render(
  <AppProvider>
    <Router>
      <App />
    </Router>
  </AppProvider>,
  document.getElementById('root')
);


// requestPermission();
registerServiceWorker();
