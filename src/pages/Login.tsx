import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export const Login = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('Please fill all fields');
      return;
    }
    setIsLoading(true);
    try {
      await login({ identifier, password });
      navigate('/');
    } catch {
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#F5E7C6" }}>
      {/* Left side */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-center p-16 text-white" style={{ backgroundColor: "#222222" }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center mb-8">
            <div className="bg-white/60 p-4 rounded-2xl backdrop-blur-md">
              <img src="logo2.png" alt="Custom Shield" className="w-24 h-24" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight ml-4">{t('app_name')}</h1>
          </div>
          <h2 className="text-4xl font-extrabold mb-6 leading-tight text-center">
            हर योजना,हर <br />
            <span style={{ color: "#FF6D1F" }}>जरूरतमंद</span> तक
          </h2>
        </motion.div>

        {/* Flashcards */}
        <div className="cards-container flex gap-6 justify-center mt-6">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <img src="/images/photo1.jpeg" alt="img1" className="w-48 h-64 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <img src="/images/photo2.jpeg" alt="img2" className="w-48 h-64 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <img src="/images/photo3.jpeg" alt="img3" className="w-48 h-64 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform" />
          </motion.div>
        </div>

        <div className="mt-auto pt-10 text-blue-200 font-medium text-center ">
          © 2026 PrishPush Project. All rights reserved.
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
              <div className="bg-white/50 p-4 rounded-2xl backdrop-blur-md">
                <img src="/images/logo.png" alt="Custom Shield" className="w-24 h-24" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-wider">{t('app_name')}</h1>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-2">{t('login')}</h3>
            <p className="text-slate-500">Enter your credentials to access your portal.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 text-white">
            <Input
              placeholder="Username/Mobile/Aadhaar"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              leftIcon={<User className="w-5 h-5" />}
              error={error.includes('fields') && !identifier ? 'Required' : ''}
            />
            <div className="relative">
              <Input
                label={t('password')}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-5 h-5" />}
                error={error.includes('fields') && !password ? 'Required' : ''}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-gray-400 hover:text-white">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-slate-600 font-medium">Remember me</span>
              </label>
              <button type="button" className="text-blue-600 hover:underline font-semibold">Forgot password?</button>
            </div>
            <Button type="submit" className="w-full h-12 text-lg" isLoading={isLoading}>{t('login')}</Button>
          </form>

          <div className="mt-8 text-center text-slate-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline font-bold">{t('register')}</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
