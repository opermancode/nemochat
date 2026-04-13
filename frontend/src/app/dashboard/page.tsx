'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GlobalSearch from '@/components/GlobalSearch';
import { MessageSquare, LogOut, Shield } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('nemo_user');
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-nemo-slate border-r border-white/5 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-10 text-nemo-emerald">
            <Shield size={28} />
            <h1 className="text-xl font-bold tracking-tighter">NEMOCHAT</h1>
          </div>
          
          <nav className="space-y-4">
            <p className="text-xs font-semibold text-gray-500 uppercase">Personal</p>
            <div className="flex items-center gap-3 p-3 bg-nemo-emerald/10 text-nemo-emerald rounded-xl cursor-pointer">
              <MessageSquare size={20} />
              <span className="font-medium">Active Chats</span>
            </div>
          </nav>
        </div>

        <div className="pt-6 border-t border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-nemo-emerald/20 border border-nemo-emerald flex items-center justify-center font-bold">
              {user.username[0].toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold">{user.username}</p>
              <p className="text-xs text-gray-400">Owner Status</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition text-sm"
          >
            <LogOut size={16} /> Logout Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <header className="mb-10">
          <h2 className="text-3xl font-bold">Welcome back, {user.username}</h2>
          <p className="text-gray-400">Discover new connections or resume your isolated sessions.</p>
        </header>

        {/* Global Search Component */}
        <section className="bg-nemo-slate/30 p-8 rounded-3xl border border-white/5">
          <h3 className="text-xl font-semibold mb-4">Global Discovery Pulse</h3>
          <GlobalSearch />
        </section>
      </main>
    </div>
  );
}