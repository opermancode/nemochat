'use client';
import { useState } from 'react';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/login', { email, password });
      localStorage.setItem('nemo_token', data.token);
      localStorage.setItem('nemo_user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err) {
      alert('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-nemo-dark">
      <form onSubmit={handleLogin} className="w-full max-w-md space-y-6 bg-nemo-slate p-8 rounded-2xl border border-white/10">
        <h1 className="text-3xl font-bold text-nemo-emerald text-center">NemoChat</h1>
        <div>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <input 
            type="email" 
            className="w-full p-3 rounded-lg bg-nemo-dark border border-white/10 focus:border-nemo-emerald outline-none"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input 
            type="password" 
            className="w-full p-3 rounded-lg bg-nemo-dark border border-white/10 focus:border-nemo-emerald outline-none"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-nemo-emerald py-3 rounded-lg font-bold hover:bg-emerald-400 transition">
          Enter The Vault
        </button>
      </form>
    </div>
  );
}
