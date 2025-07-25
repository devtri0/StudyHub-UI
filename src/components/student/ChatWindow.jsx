// src/components/student/ChatWindow.jsx
import React, { useState } from "react";
import { FiArrowLeft, FiSend, FiPaperclip } from "react-icons/fi";

const ChatWindow = ({ chat, onBack, fullWidth = false }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "You",
      text: "Hello! I have a question about our study group",
      time: "10:30 AM",
      isMe: true
    },
    {
      id: 2,
      sender: chat?.sender || "Group",
      text: "Hi there! What would you like to know?",
      time: "10:32 AM",
      isMe: false
    }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "You",
          text: message,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: true
        }
      ]);
      setMessage("");
    }
  };

  return (
    <div className={`flex flex-col h-full ${fullWidth ? "w-full" : "w-2/3"}`}>
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 flex items-center">
        {onBack && (
          <button onClick={onBack} className="mr-2 text-gray-600 hover:text-gray-900">
            <FiArrowLeft className="w-5 h-5" />
          </button>
        )}
        <img 
          src={chat?.avatar} 
          alt={chat?.sender}
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <div>
          <h3 className="font-medium">{chat?.sender}</h3>
          <p className="text-xs text-gray-500">Online</p>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-xs md:max-w-md rounded-lg p-3 ${msg.isMe ? "bg-blue-600 text-white" : "bg-white border border-gray-200"}`}
              >
                {!msg.isMe && <div className="text-xs font-medium text-gray-700 mb-1">{msg.sender}</div>}
                <p>{msg.text}</p>
                <div className={`text-xs mt-1 ${msg.isMe ? "text-blue-100" : "text-gray-500"}`}>
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSend} className="flex items-center">
          <button type="button" className="p-2 text-gray-500 hover:text-gray-700">
            <FiPaperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 mx-3 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            type="submit" 
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            <FiSend className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;