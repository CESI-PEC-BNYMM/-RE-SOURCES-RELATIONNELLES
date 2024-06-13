
import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "../pages/auth/LoginForm";
import RegisterForm from "../pages/auth/RegisterForm";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const UserRoutes = () => {
  return (
    <>
      <Navbar /> 
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <Footer /> 
    </>
  );
};

export default UserRoutes;
