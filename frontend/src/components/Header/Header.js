import React from 'react';
// import axios from 'axios';
import './Header.css';
// import { decodeToken } from "react-jwt";
import logo from '../../assets/Logo (RE)ssources relationnelles v4.png';
import { useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
import { FaBorderAll, FaUser, FaEnvelope, FaComments } from 'react-icons/fa';
import { FaHouse, FaPerson, FaUserGroup, FaLifeRing, FaUsersGear, FaWrench, FaQuestion } from "react-icons/fa6";
import { PiUserCircleGearFill } from "react-icons/pi";
import { VscBell, VscBellDot } from "react-icons/vsc";
import { GoLaw } from "react-icons/go";
import { BsChat, BsPostcardFill } from "react-icons/bs";
import { BiSolidCategory } from "react-icons/bi";
import { IoTicketSharp } from "react-icons/io5";

const Header = () => {
    // const token = localStorage.getItem('token');
    // const user = decodeToken(token);

    const [isUserDropdownActive, setIsUserDropdownActive] = React.useState(false);
    const handleUserDropdown = () => {
        setIsUserDropdownActive(!isUserDropdownActive)
    };
    const [notifications, setNotifications] = React.useState([]);

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
                <div className="actions" style={{ cursor: 'pointer' }}>
                    <NavLink to={`/register`} data-path="/register" className="register">
                        <div>Inscription</div>
                    </NavLink>
                </div>
                <div className="actions" style={{ cursor: 'pointer' }}>
                    <NavLink to={`/login`} data-path="/login" className="login">
                        <div>Se connecter</div>
                    </NavLink>
                </div>
                <div className="user">
                    <FaUser onClick={handleUserDropdown} style={{ cursor: 'pointer' }} fontSize="1.3rem" />
                    {isUserDropdownActive && (
                        <div className="dropdownContent">
                            {/* <p>Connecté en tant que <b>{user.username}</b></p> */}
                            <p>Connecté en tant que *TODO*</p>
                            <NavLink to={`/informations-personnelles`} data-path="/informations-personnelles" className="personalInfos">
                                <p>Informations personnelles</p>
                            </NavLink>
                            <NavLink to={`/parametres-du-compte`} data-path="/parametres-du-compte" className="profileSettings">
                                <p>Paramètres du compte</p>
                            </NavLink>
                            {/* <button onClick={handleLogout} className="logout">Déconnexion</button> */}
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
                    <NavLink to={`/fil-d-actualite`} data-path="/fil-d-actualite" className={({ isActive }) => isActive ? "active menuItem" : "menuItem"}>
                        <FaHouse />
                        <p>Fil d'actualité</p>
                    </NavLink>
                    <button className="menuItem" to={`/espace-personnel`} onClick={() => handleLeftNavDropdown('dropdown-espace-personnel', "/espace-personnel")} data-path="/espace-personnel">
                        <FaPerson />
                        <p>Espace personnel</p>
                    </button>
                    <div id="dropdown-espace-personnel" className="dropdown" dropdown-parent="/espace-personnel">
                        <NavLink className={({ isActive }) => isActive ? "active menuItem dropdown-content" : "menuItem dropdown-content"} to={`/espace-personnel/mes-publications`} data-path="/espace-personnel/mes-publications">
                            <span></span>
                            <FaBorderAll />
                            <p>Mes publications</p>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? "active menuItem dropdown-content" : "menuItem dropdown-content"} to={`/espace-personnel/gestion-d-amis`} data-path="/espace-personnel/gestion-d-amis">
                            <span></span>
                            <FaUserGroup />
                            <p>Gestion d'amis</p>
                        </NavLink>
                    </div>
                    <button className="menuItem" to={`/support`} onClick={() => handleLeftNavDropdown('dropdown-support', "/support")} data-path="/support">
                        <FaLifeRing />
                        <p>Support</p>
                    </button>
                    <div id="dropdown-support" className="dropdown" dropdown-parent="/support">
                        <NavLink className={({ isActive }) => isActive ? "active menuItem dropdown-content" : "menuItem dropdown-content"} to={`/support/contact`} data-path="/support/contact">
                            <span></span>
                            <FaEnvelope />
                            <p>Contact</p>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? "active menuItem dropdown-content" : "menuItem dropdown-content"} to={`/support/faq`} data-path="/support/faq">
                            <span></span>
                            <FaQuestion />
                            <p>FAQ</p>
                        </NavLink>
                    </div>

                    <button className="menuItem" to={`/demandes`} onClick={() => handleLeftNavDropdown('dropdown-administration', "/administration")} data-path="/administration">
                        <FaWrench />
                        <p>Administration</p>
                    </button>
                    <div id="dropdown-administration" className="dropdown" dropdown-parent="/administration">
                        <NavLink className={({ isActive }) => isActive ? "active menuItem dropdown-content" : "menuItem dropdown-content"} to={`/administration/utilisateurs`} data-path="/administration/utilisateurs">
                            <span></span>
                            <FaUsersGear />
                            <p>Utilisateurs</p>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? "active menuItem dropdown-content" : "menuItem dropdown-content"} to={`/administration/articles`} data-path="/administration/articles">
                            <span></span>
                            <BsPostcardFill />
                            <p>Articles</p>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? "active menuItem dropdown-content" : "menuItem dropdown-content"} to={`/administration/categories`} data-path="/administration/categories">
                            <span></span>
                            <BiSolidCategory />
                            <p>Catégories</p>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? "active menuItem dropdown-content" : "menuItem dropdown-content"} to={`/administration/commentaires`} data-path="/administration/commentaires">
                            <span></span>
                            <FaComments />
                            <p>Commentaires</p>
                        </NavLink>
                        <NavLink className={({ isActive }) => isActive ? "active menuItem dropdown-content" : "menuItem dropdown-content"} to={`/administration/tickets`} data-path="/administration/tickets">
                            <span></span>
                            <IoTicketSharp />
                            <p>Tickets</p>
                        </NavLink>
                    </div>
                    <NavLink to={`/rgpd`} data-path="/rgpd" className={({ isActive }) => isActive ? "active menuItem" : "menuItem"}>
                        <GoLaw />
                        <p>RGPD</p>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Header;
