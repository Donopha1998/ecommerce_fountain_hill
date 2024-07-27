import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import 'antd/dist/reset.css';
import NavigationBar from './components/Navigation/NavigationBar';
import ProtectedRoute from './Utils//ProtectedRoute';
import PublicRoute from './Utils/PublicRoute';
import { Navigate } from 'react-router-dom';
import { CartProvider } from './context/cartContext';
import Cart from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
const App = () => {
  return (
    <Router>
      <CartProvider>
      <AuthProvider>
          <NavigationBar />
          <Routes>
         
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />


            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
               <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
              <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route
              path="*"
              element={<Navigate to="/login" />}
            />

          </Routes>
      </AuthProvider>
      </CartProvider>
    </Router>
  );
};

export default App;
