import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './Router';

import './components/i18n.js';

const Loader = () => (
    <div>loading...</div>
);

ReactDOM.render(
        <Suspense fallback={<Loader />}>
           <Router/>
        </Suspense>,
    document.getElementById('root')
);

