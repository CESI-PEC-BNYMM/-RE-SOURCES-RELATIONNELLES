import React from 'react';
// import axios from 'axios';
import './Header.css';
// import { decodeToken } from "react-jwt";
import logo from '../../assets/Logo (RE)ssources relationnelles v4.png';
import { useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";

const Header = () => {
    // const token = localStorage.getItem('token');
    // const user = decodeToken(token);

    const [isUserDropdownActive, setIsUserDropdownActive] = React.useState(false);
    const handleUserDropdown = () => {
        setIsUserDropdownActive(!isUserDropdownActive)
    };

    // const handleLogout = async () => {
    //     try {
    //         const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/${process.env.REACT_APP_API_ROUTE_LOGOUT}`, {
    //             token: localStorage.getItem('token'),
    //             user: user.username,
    //         });
    //         localStorage.removeItem('token');
    //         window.location.reload();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const handleLeftNavDropdown = ($id, $dataPath) => {
        document.getElementById($id).classList.toggle('show');
        document.querySelector(`button[data-path="${$dataPath}"]`).classList.toggle('dropdown-selected');
    };

    return (
        <div>
            <div className="topNav">
                <div className="notification" style={{cursor: 'pointer'}}>
                    <button type="button" className="btn btn-primary position-relative" style={{padding: '0', backgroundColor: 'transparent', border: 'none', outline: 'none'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/>
                        </svg>
                        <span className="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2">
                        <span className="visually-hidden"></span></span>
                    </button>
                </div>
                <div className="user">
                    <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 0 448 512" onClick={handleUserDropdown} style={{cursor: 'pointer'}}><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                    {isUserDropdownActive && (
                        <div className="dropdownContent">
                            {/* <p>Connecté en tant que <b>{user.username}</b></p> */}
                            <p>Connecté en tant que *TODO*</p>
                            {/* <button onClick={handleLogout} className="logout">Déconnexion</button> */}
                            <button className='personalInfos'>Informations personnelles</button>
                            <button className='profileSettings'>Paramètres du compte</button>
                            <button className="logout">Déconnexion</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="leftNav">
                <div className="logo">
                    <a href="/">
                        <img src={logo} alt="logo" width="150" />
                    </a>
                </div>
                <div className="menu">
                    <NavLink to={`/fil-d-actualite`} data-path="/fil-d-actualite" className={({ isActive }) => isActive ? "active menuItem": "menuItem"}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
                        <p>Fil d'actualité</p>
                    </NavLink>

                    <button className="menuItem" to={`/espace-personnel`} onClick={() => handleLeftNavDropdown('dropdown-espace-personnel', "/espace-personnel")} data-path="/espace-personnel">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M352 320c88.4 0 160-71.6 160-160c0-15.3-2.2-30.1-6.2-44.2c-3.1-10.8-16.4-13.2-24.3-5.3l-76.8 76.8c-3 3-7.1 4.7-11.3 4.7H336c-8.8 0-16-7.2-16-16V118.6c0-4.2 1.7-8.3 4.7-11.3l76.8-76.8c7.9-7.9 5.4-21.2-5.3-24.3C382.1 2.2 367.3 0 352 0C263.6 0 192 71.6 192 160c0 19.1 3.4 37.5 9.5 54.5L19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L297.5 310.5c17 6.2 35.4 9.5 54.5 9.5zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
                        <p>Espace personnel</p>
                    </button>
                        <div id="dropdown-espace-personnel" className="dropdown" dropdown-parent="/espace-personnel">
                            <NavLink className={({ isActive }) => isActive ? "active menuItem dropdown-content": "menuItem dropdown-content"}  to={`/espace-personnel/mes-publications`}  data-path="/espace-personnel/mes-publications">
                                <p>Mes publications</p>
                            </NavLink>
                            <NavLink className={({ isActive }) => isActive ? "active menuItem dropdown-content": "menuItem dropdown-content"} to={`/espace-personnel/gestion-d-amis`} data-path="/espace-personnel/gestion-d-amis">
                                <p>Gestion d'amis</p>
                            </NavLink>
                        </div>

                    <button className="menuItem" to={`/support`} onClick={() => handleLeftNavDropdown('dropdown-support', "/support")} data-path="/support">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M352 320c88.4 0 160-71.6 160-160c0-15.3-2.2-30.1-6.2-44.2c-3.1-10.8-16.4-13.2-24.3-5.3l-76.8 76.8c-3 3-7.1 4.7-11.3 4.7H336c-8.8 0-16-7.2-16-16V118.6c0-4.2 1.7-8.3 4.7-11.3l76.8-76.8c7.9-7.9 5.4-21.2-5.3-24.3C382.1 2.2 367.3 0 352 0C263.6 0 192 71.6 192 160c0 19.1 3.4 37.5 9.5 54.5L19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L297.5 310.5c17 6.2 35.4 9.5 54.5 9.5zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
                        <p>Support</p>
                    </button>
                        <div id="dropdown-support" className="dropdown" dropdown-parent="/support">
                            <NavLink className={({ isActive }) => isActive ? "active menuItem dropdown-content": "menuItem dropdown-content"}  to={`/support/contact`}  data-path="/support/contact">
                                <p>Contact</p>
                            </NavLink>
                            <NavLink className={({ isActive }) => isActive ? "active menuItem dropdown-content": "menuItem dropdown-content"} to={`/support/faq`} data-path="/support/faq">
                                <p>FAQ</p>
                            </NavLink>
                        </div>

                    <button className="menuItem" to={`/demandes`} onClick={() => handleLeftNavDropdown('dropdown-administration', "/administration")} data-path="/administration">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M352 320c88.4 0 160-71.6 160-160c0-15.3-2.2-30.1-6.2-44.2c-3.1-10.8-16.4-13.2-24.3-5.3l-76.8 76.8c-3 3-7.1 4.7-11.3 4.7H336c-8.8 0-16-7.2-16-16V118.6c0-4.2 1.7-8.3 4.7-11.3l76.8-76.8c7.9-7.9 5.4-21.2-5.3-24.3C382.1 2.2 367.3 0 352 0C263.6 0 192 71.6 192 160c0 19.1 3.4 37.5 9.5 54.5L19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L297.5 310.5c17 6.2 35.4 9.5 54.5 9.5zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
                        <p>Administration</p>
                    </button>
                        <div id="dropdown-administration" className="dropdown" dropdown-parent="/administration">
                            <NavLink className={({ isActive }) => isActive ? "active menuItem dropdown-content": "menuItem dropdown-content"}  to={`/administration/utilisateurs`}  data-path="/administration/utilisateurs">
                                <p>Utilisateurs</p>
                            </NavLink>
                            <NavLink className={({ isActive }) => isActive ? "active menuItem dropdown-content": "menuItem dropdown-content"} to={`/administration/roles`} data-path="/administration/roles">
                                <p>Rôles</p>
                            </NavLink>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
