import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Replace with your backend Socket.IO URL
const socket = io("https://my-career-compass.onrender.com", {
  transports: ["websocket"],
  secure: true,
  withCredentials: true,
});

const GroupedChatRoom = ({ userInterest, userName }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    if (userInterest) {
      socket.emit("joinRoom", userInterest);
    }

    socket.on("receiveMessage", ({ message, user }) => {
      setMessages((prev) => [...prev, { message, user }]);
    });

    socket.on("chatCleared", () => setMessages([]));

    return () => {
      socket.off("receiveMessage");
      socket.off("chatCleared");
    };
  }, [userInterest]);

  const handleSend = () => {
    if (newMsg.trim()) {
      const msgObj = {
        room: userInterest,
        message: newMsg,
        user: userName,
      };

      // Emit message to server
      socket.emit("sendMessage", msgObj);

      // Add message locally to show instantly
      setMessages((prev) => [...prev, { message: newMsg, user: userName }]);

      setNewMsg("");
    }
  };

  const handleClear = () => {
    socket.emit("clearChat", userInterest);
  };

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-xl mx-auto">
      <button
        onClick={() => window.location.reload()}
        className="mb-4 text-blue-500 underline"
      >
        ← Back to Domain List
      </button>

      <h2 className="text-xl font-semibold mb-4">Chat: {userInterest}</h2>

      <div className="border p-2 h-64 overflow-y-scroll mb-4 bg-gray-100 rounded">
        {messages.map((msg, idx) => (
          <p key={idx}>
            <strong>{msg.user}:</strong> {msg.message}
          </p>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Type a message"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Send
        </button>
        <button
          onClick={handleClear}
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default GroupedChatRoom;
