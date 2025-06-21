import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { toast } from 'sonner';

import Login from '@/components/Login';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface JwtPayload {
  exp: number;
  role: string;
}

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);

        if (decoded.exp * 1000 > Date.now()) {
          toast.success('Du bist bereits eingeloggt.');
          navigate('/staff', { replace: true });
        } else {
          // Token expired, remove it
          localStorage.removeItem('token');
        }
      } catch {
        // Invalid token, remove it
        localStorage.removeItem('token');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <Header />
      <Login />
      <Footer />
    </div>
  );
};

export default LoginPage;
