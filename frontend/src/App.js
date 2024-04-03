import React, { useContext } from 'react';
import { AuthContext } from './utils/authContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './pages/admin/AdminLayout';
import LoginForm from './pages/auth/LoginForm';
import RegisterForm from './pages/auth/RegisterForm';
import UserPage from './pages/admin/users/UserPage';
import RolePage from './pages/admin/roles/RolePage';
import NotFound from './pages/NotFound/NotFound';
import Header from './components/Header/Header';
import FilActualite from './pages/FilActualite/FilActualite';
import Contact from './pages/Support/Contact/Contact';
import FAQ from './pages/Support/FAQ/FAQ';
import { AdminContextProvider } from './utils/adminContext';
import ProtectedRoute from './routes/protectedRoute';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const { isLoggedIn, isAdmin } = useContext(AuthContext); 
  
    const AdminRoute = ({ children }) => {
      return isLoggedIn && isAdmin ? children : <Navigate to="/login" />;
    };

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<FilActualite />} />
                <Route path="/fil-d-actualite" element={<FilActualite />} />
                <Route path="/support/contact" element={<Contact />} />
                <Route path="/support/faq" element={<FAQ />} />
                <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginForm />} />
                <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <RegisterForm />} />
                <Route path="/administration/*" element={<AdminLayout />}>
                    <Route index element={<Navigate to="utilisateurs" />} /> {/* Redirection par défaut à /admininistration/utilisateurs */}
                    <Route path="utilisateurs" element={<AdminRoute><UserPage /></AdminRoute>} />
                    <Route path="roles" element={<AdminRoute><RolePage /></AdminRoute>} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
