import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n';

import App from './modules/ui/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
