// src/App.js

import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import FilActualite from './pages/FilActualite/FilActualite';
// import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { isExpired, decodeToken } from "react-jwt";

const App = () => {
    // si il y a un token dans le localStorage, on considère que l'utilisateur est connecté
    // const token = localStorage.getItem('token');
    // let isLoggedIn = false;
    // if (token) {
    //     const myDecodedToken = decodeToken(token);
    //     const isMyTokenExpired = isExpired(token);
    //     isLoggedIn = myDecodedToken && !isMyTokenExpired;
    // }

    return (
        <div className="App">
            {/* {isLoggedIn && <Header />} */}
            <Header />
            <Routes>
                {/* {!isLoggedIn && <Route path="*" element={<Login />} />} */}
                {/* {isLoggedIn && <Route path="/login" element={<Navigate to="/fil-d-actualite" />} />} */}
                {/* {isLoggedIn && <Route path="/fil-d-actualite" element={<FilActualite />} />} */}
                {/* {isLoggedIn && <Route path="/administration/utilisateurs" element={<Utilisateurs />} />} */}
                {/* {isLoggedIn && <Route path="/administration/roles" element={<Roles />} />} */}
                {/* {isLoggedIn && <Route path="/" element={<FilActualite />} />} */}
                {/* {isLoggedIn && <Route path="*" element={<NotFound />} />} */}
                <Route path="/fil-d-actualite" element={<FilActualite />} />
                {/* <Route path="/espace-personnel/mes-publications" element={<MesPublications />} /> */}
                {/* <Route path="/espace-personnel/gestion-d-amis" element={<GestionAmis />} /> */}
                {/* <Route path="/support/contact" element={<Contact />} /> */}
                {/* <Route path="/support/faq" element={<FAQ />} /> */}

                <Route path="/" element={<FilActualite />} />
                <Route path="*" element={<NotFound />} />
                {/* <Route path="/login" element={<Login />} /> */}

            </Routes>
        </div>
    );
}

export default App;
