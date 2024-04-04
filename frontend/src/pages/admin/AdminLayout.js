// AdminLayout.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SidebarsPage from './sidebars/SidebarsPage';

import UserPage from './users/UserPage';
import RolePage from './roles/RolePage';


const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <SidebarsPage />
      <div className="admin-content">
        <Routes>
          <Route path="utilisateurs" element={<UserPage />} />
          <Route path="roles" element={<RolePage />} />

        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
