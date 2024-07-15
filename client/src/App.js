import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './components/HomePage';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import ContactSupport from './components/ContactSupport';
import Terms from './components/Terms';
import PrivacyPolicy from './components/PrivacyPolicy';
import PrivateRoute from './components/PrivateRoute';
import LanguageSelector from './components/LanguageSelector';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <AuthProvider>
      <Router>
        <LanguageSelector />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<PrivateRoute component={Profile} />} />
            <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
            <Route path="/contact-support" element={<ContactSupport />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}

export default App;
