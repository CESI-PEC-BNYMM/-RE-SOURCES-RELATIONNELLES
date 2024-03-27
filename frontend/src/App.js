// src/App.js
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import FilActualite from './pages/FilActualite/FilActualite';
import NotFound from './pages/NotFound/NotFound';
import LoginForm from './pages/auth/LoginForm'; 
import RegisterForm from './pages/auth/RegisterForm'; 
import { useContext } from 'react';
import { AuthContext } from './utils/authContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const { isLoggedIn } = useContext(AuthContext); 
    return (
        <div className="App">
            {isLoggedIn ? <Header /> : null}
            <Routes>
                <Route path="/" element={<FilActualite />} />
                <Route path="/fil-d-actualite" element={<FilActualite />} />
                <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginForm />} />
                <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <RegisterForm />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
