'use client';
import { useState } from 'react';
import api from '@/utils/api';
import { Search, UserPlus } from 'lucide-react';

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const nextQuery = e.target.value;
    setQuery(nextQuery);

    if (nextQuery.length > 2) {
      const user = JSON.parse(localStorage.getItem('nemo_user') || '{}');
      try {
        const { data } = await api.get(`/search?q=${encodeURIComponent(nextQuery)}&userId=${user.id}`);
        setResults(data);
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      }
    } else {
      setResults([]);
    }
  };

  const sendRequest = async (targetId) => {
    const user = JSON.parse(localStorage.getItem('nemo_user') || '{}');
    try {
      await api.post('/request', { senderId: user.id, receiverId: targetId });
      alert('Handshake request sent!');
    } catch (error) {
      console.error('Failed to send request:', error);
      alert('Failed to send request.');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" />
        <input 
          type="text" 
          placeholder="Discover users globally..." 
          className="w-full p-3 pl-10 bg-nemo-slate rounded-xl border border-white/5 focus:border-nemo-emerald outline-none"
          value={query}
          onChange={handleSearch}
        />
      </div>

      <div className="mt-6 space-y-4">
        {results.map((u) => (
          <div key={u.id} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
            <div>
              <p className="font-bold">{u.username}</p>
              <p className="text-sm text-gray-400">{u.bio || 'No bio available'}</p>
            </div>
            <button 
              onClick={() => sendRequest(u.id)}
              className="p-2 bg-nemo-emerald rounded-lg hover:scale-105 transition"
            >
              <UserPlus size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
