import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './utils/authContext';
import AdminContextProvider from './utils/adminContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <AdminContextProvider>
          <App />
        </AdminContextProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);