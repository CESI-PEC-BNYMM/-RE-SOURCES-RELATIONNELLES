import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './utils/authContext';
import AdminContextProvider from './utils/adminContext';

ReactDOM.render(
    <Router>
      <AuthProvider>
        <AdminContextProvider>
          <App />
        </AdminContextProvider>
      </AuthProvider>
    </Router>,
  document.getElementById('root')
);