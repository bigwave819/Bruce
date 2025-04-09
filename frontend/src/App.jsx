import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Booking from "./pages/Booking"
import Contact from "./pages/Contact"
import Music from "./pages/Music"
import Products from "./pages/Products"
import NotFound from "./pages/NotFound"
import NavBar from "./components/Navbar"
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast"

const App = () => {
  return(
  <>
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/booking" element={<Booking />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/music" element={<Music/>}/>
        <Route path="/product" element={<Products/>} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Footer />
    </Router>
    <Toaster 
      toastOptions={{
        className: "",
        style: {
          fontSize: "13px"
        },
      }}
      />
  </>
    
  )
}

export default App