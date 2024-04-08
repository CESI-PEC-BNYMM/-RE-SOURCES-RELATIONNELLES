import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

// Contextes
import { AuthContext } from './utils/authContext';
import { AdminContextProvider } from './utils/adminContext';

// Composants de mise en page et pages
import Header from './components/Header/Header';
import LoginForm from './pages/auth/LoginForm';
import RegisterForm from './pages/auth/RegisterForm';
import UserProfile from './pages/UserProfile';

import AdminLayout from './pages/admin/AdminLayout';
import UserPage from './pages/admin/users/UserPage';
import RolePage from './pages/admin/roles/RolePage';
import NotFound from './pages/NotFound/NotFound';
import FilActualite from './pages/FilActualite/FilActualite';
import Contact from './pages/Support/Contact/Contact';
import FAQ from './pages/Support/FAQ/FAQ';
import MesPublications from './pages/EspacePersonnel/MesPublications/MesPublications';
import GestionAmis from './pages/EspacePersonnel/GestionAmis/GestionAmis';
import CookiesBanner from './components/CookiesBanner/CookiesBanner';


// Route protégée
import ProtectedRoute from './routes/protectedRoute';

// Styles
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const { isLoggedIn, isAdmin } = useContext(AuthContext);
    const [cookies, setCookies] = useState([]);

    // Route protégée pour les administrateurs
    const AdminRoute = ({ children }) => {
        return isLoggedIn && isAdmin ? children : <Navigate to="/login" />;
    };

    useEffect(() => {
        if (localStorage.getItem('cookies') && localStorage.getItem('cookies').length > 0) {
            setCookies(JSON.parse(localStorage.getItem('cookies')));
        }
    }, []);

    useEffect(() => {
        if (cookies && cookies.length > 0) {
            localStorage.setItem('cookies', JSON.stringify(cookies));
        }
    }, [cookies]);

    return (
        <div className="App">
            <Header />
            {cookies === undefined || cookies.length === 0 ? <CookiesBanner setCookies={setCookies} /> : null}
            <AdminContextProvider>
                <Routes>
                    <Route path="/" element={<FilActualite />} />
                    <Route path="/fil-d-actualite" element={<FilActualite />} />
                    <Route path="/fil-d-actualite/*" element={<FilActualite />} />
                    <Route path="/support/contact" element={<Contact />} />
                    <Route path="/support/faq" element={<FAQ />} />
                    <Route path="/espace-personnel/mes-publications" element={<MesPublications />} />
                    <Route path="/espace-personnel/gestion-d-amis" element={<GestionAmis />} />
                    <Route path="/espace-personnel/profil" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                    <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginForm />} />
                    <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <RegisterForm />} />
                    <Route path="/administration/*" element={<AdminLayout />}>
                        <Route index element={<Navigate to="utilisateurs" />} />
                        <Route path="utilisateurs" element={<AdminRoute><UserPage /></AdminRoute>} />
                        <Route path="roles" element={<AdminRoute><RolePage /></AdminRoute>} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AdminContextProvider>
        </div>
    );
};

export default App;
