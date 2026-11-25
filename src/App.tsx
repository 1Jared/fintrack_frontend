import React, { useEffect} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth';
import { ProtectedRoute} from './components/ProtectedRoute';
import {Login} from './pages/Login';
import {Register} from './pages/Register';
import {Dashboard} from './pages/Dashboard';
import {PortfolioDetails} from './pages/PortfolioDetails';
import './index.css';

export const App: React.FC = () => {
  const initFromStorage = useAuthStore((state) => state.initFromStorage);

  useEffect(() => {
    initFromStorage();
  },[initFromStorage]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
         path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
         }
         />
         <Route
         path="/portfolios/:id"
         element={
          <ProtectedRoute>
            <PortfolioDetails />
          </ProtectedRoute>
         }
         />
         <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;