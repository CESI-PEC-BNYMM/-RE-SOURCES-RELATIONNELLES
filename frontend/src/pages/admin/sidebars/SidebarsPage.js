// Dans SidebarsPage.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebars.css';

const SidebarsPage = () => {
  return (
    <aside className="sidebars-container">
      <nav className="sidebars-nav">
        <NavLink to="/administration/utilisateurs" activeclassname="active">Utilisateurs</NavLink>
        <NavLink to="/administration/roles" activeclassname="active">Rôles</NavLink>
      </nav>
    </aside>
  );
};

export default SidebarsPage;
