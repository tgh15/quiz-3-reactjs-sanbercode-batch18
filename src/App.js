import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes />
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
