import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import './components/i18n.js';

const Loader = () => (
    <div>loading...</div>
);
  
ReactDOM.render(
    <Suspense fallback={<Loader />}>
  <React.StrictMode>
    <App />
  </React.StrictMode>  
  </Suspense>,
  document.getElementById('root')
);

