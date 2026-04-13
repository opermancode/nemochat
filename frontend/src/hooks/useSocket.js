import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Point this to your Nginx proxy URL
    const newSocket = io(process.env.NEXT_PUBLIC_API_URL || '/', {
      path: '/socket.io',
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return socket;
};