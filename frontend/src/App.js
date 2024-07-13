import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Contextes
import { AuthContext } from './utils/authContext';
import { AdminContextProvider } from './utils/adminContext';

// Composants de mise en page et pages
import Header from './components/Header/Header';
import LoginForm from './pages/auth/LoginForm';
import RegisterForm from './pages/auth/RegisterForm';
import InformationsPersonnelles from './pages/InformationsPersonnelles/InformationsPersonnelles';

import AdminLayout from './pages/admin/AdminLayout';
import UserPage from './pages/admin/users/UserPage';
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
import RGPD from './pages/RGPD/RGPD';
import ParametresCompte from './pages/ParametresCompte/ParametresCompte';
import ManageArticles from './pages/admin/ManageArticles/ManageArticles';
import ManageCategories from './pages/admin/ManageCategories/ManageCategories';
import ManageCommentaires from './pages/admin/ManageCommentaires/ManageCommentaires';
import ManageTickets from './pages/admin/ManageTickets/ManageTickets';

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
                    <Route path="/espace-personnel/mes-publications/*" element={<MesPublications />} />
                    <Route path="/espace-personnel/gestion-d-amis" element={<GestionAmis />} />
                    <Route path="/informations-personnelles" element={<ProtectedRoute><InformationsPersonnelles /></ProtectedRoute>} />
                    {/* <Route path="/parametres-du-compte" element={<ProtectedRoute><ParametresCompte /></ProtectedRoute>} /> */}
                    <Route path="/parametres-du-compte" element={<ParametresCompte />} />
                    <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginForm />} />
                    <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <RegisterForm />} />
                    <Route path="/administration/*" element={<AdminLayout />}>
                        <Route index element={<Navigate to="utilisateurs" />} />
                        <Route path="utilisateurs" element={<AdminRoute><UserPage /></AdminRoute>} />
                        <Route path="articles" element={<AdminRoute><ManageArticles /></AdminRoute>} />
                        <Route path="categories" element={<AdminRoute><ManageCategories /></AdminRoute>} />
                        <Route path="commentaires" element={<AdminRoute><ManageCommentaires /></AdminRoute>} />
                        <Route path="tickets" element={<AdminRoute><ManageTickets /></AdminRoute>} />
                    </Route>
                    <Route path="/rgpd" element={<RGPD />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AdminContextProvider>
        </div>
    );
};

export default App;
