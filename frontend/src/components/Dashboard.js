import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/queue');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // WebSocket fallback
    const wsUrl = 'ws://api/ws/queue';
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      setIsWebSocketConnected(true);
      console.log('WebSocket connected');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsWebSocketConnected(false);
    };

    socket.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };

    // Polling fallback
    const intervalId = setInterval(() => {
      fetchData();
    }, 30000);

    return () => {
      clearInterval(intervalId);
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <strong>{item.name}</strong>: {item.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;