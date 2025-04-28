import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Music from "./pages/Music";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./protectedRoutes";
import { Toaster } from "react-hot-toast";
import Login from "./pages/auth/Login";

const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/music"
            element={
              <ProtectedRoute>
                <Music />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </>
  );
};

export default App;
