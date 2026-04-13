'use client';
import { useState, useEffect, useRef } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { Send } from 'lucide-react';

export default function ChatWindow({ roomId, currentUser, targetUser }) {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!socket) return;

    // Join the authorized room
    socket.emit('join_room', { 
      room_id: roomId, 
      user_id: currentUser.id, 
      target_id: targetUser.id 
    });

    // Listen for incoming messages
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [socket, roomId, currentUser?.id, targetUser?.id]);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || !socket) return;

    const msgData = {
      room_id: roomId,
      sender_id: currentUser.id,
      target_id: targetUser.id,
      message_text: input,
    };

    socket.emit('send_message', msgData);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[600px] bg-nemo-dark/50 rounded-2xl border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-nemo-slate border-b border-white/5 font-bold flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-nemo-emerald animate-pulse" />
        {targetUser.username}
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender_id === currentUser.id ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-3 rounded-2xl ${
              msg.sender_id === currentUser.id 
              ? 'bg-nemo-emerald text-white rounded-tr-none' 
              : 'bg-nemo-slate text-gray-200 rounded-tl-none'
            }`}>
              <p className="text-sm">{msg.message_text}</p>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={sendMessage} className="p-4 bg-nemo-slate flex gap-2">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type an encrypted message..."
          className="flex-1 bg-nemo-dark border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-nemo-emerald"
        />
        <button type="submit" className="p-2 bg-nemo-emerald rounded-xl hover:scale-105 transition">
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
