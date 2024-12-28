// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <Suspense>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>
  </Provider>,
)
