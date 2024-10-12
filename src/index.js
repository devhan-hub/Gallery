import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { BrowserRouter as Router} from 'react-router-dom';
import {MediaProvider} from './components/Reducer'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <MediaProvider> 
<Router>
    <App />
    </Router>
    </MediaProvider>
  </React.StrictMode>
);

