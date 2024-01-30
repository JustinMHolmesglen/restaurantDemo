import React from 'react'
import ReactDOM from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx'

// Global styling
// import "bootstrap-icons/font/bootstrap-icons.css";
import './styles/resets.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';


import { AuthProvider } from './contexts/AuthContext.jsx';
// import './styles/index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
      {/* <AuthProvider> */}
        <App />
      {/* </AuthProvider> */}
    {/* </BrowserRouter> */}
  </React.StrictMode>,
)
