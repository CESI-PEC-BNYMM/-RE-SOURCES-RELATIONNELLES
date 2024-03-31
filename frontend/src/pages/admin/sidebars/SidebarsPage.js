// Dans SidebarsPage.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebars.css'; 

const SidebarsPage = () => {
  return (
    <aside className="sidebars-container">
      <nav className="sidebars-nav">
        <NavLink to="/admin/users" activeClassName="active">Utilisateurs</NavLink>
        <NavLink to="/admin/roles" activeClassName="active">Rôles</NavLink>
      </nav>
    </aside>
  );
};

export default SidebarsPage;
