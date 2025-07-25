import React, { useState } from 'react';
import { FiMessageSquare, FiSend, FiArrowLeft, FiPaperclip } from 'react-icons/fi';

const TutorChat = ({ messages, tutorId }) => {
  const [activeChat, setActiveChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "You",
      text: "Hello! I have a question about our session",
      time: "10:30 AM",
      isMe: true
    },
    {
      id: 2,
      sender: "John Smith",
      text: "Hi there! What would you like to know?",
      time: "10:32 AM",
      isMe: false
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        sender: "You",
        text: messageInput,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      };
      setChatMessages([...chatMessages, newMessage]);
      setMessageInput('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
      <div className="flex h-[600px]">
        {/* Conversation List */}
        <div className={`${activeChat ? 'hidden md:block md:w-1/3' : 'w-full md:w-1/3'} border-r border-gray-200`}>
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">Messages</h2>
          </div>
          <div className="overflow-y-auto h-full">
            {messages.map(message => (
              <div
                key={message.id}
                onClick={() => setActiveChat(message.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  activeChat === message.id ? 'bg-blue-50' : ''
                } ${message.unread ? 'font-semibold' : ''}`}
              >
                <div className="flex items-center">
                  <img 
                    src={message.avatar} 
                    alt={message.sender}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="truncate">{message.sender}</h3>
                    <p className="text-sm text-gray-500 truncate">{message.preview}</p>
                  </div>
                  <div className="text-xs text-gray-400 ml-2">
                    {message.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {activeChat ? (
          <div className={`${activeChat ? 'w-full md:w-2/3' : 'hidden md:block md:w-2/3'} flex flex-col`}>
            <div className="p-4 border-b border-gray-200 flex items-center">
              <button 
                onClick={() => setActiveChat(null)} 
                className="md:hidden mr-2 text-gray-600 hover:text-gray-900"
              >
                <FiArrowLeft className="w-5 h-5" />
              </button>
              <img 
                src={messages.find(m => m.id === activeChat)?.avatar} 
                alt={messages.find(m => m.id === activeChat)?.sender}
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <h3 className="font-medium">{messages.find(m => m.id === activeChat)?.sender}</h3>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {chatMessages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                        msg.isMe ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200'
                      }`}
                    >
                      {!msg.isMe && <div className="text-xs font-medium text-gray-700 mb-1">{msg.sender}</div>}
                      <p>{msg.text}</p>
                      <div className={`text-xs mt-1 ${msg.isMe ? 'text-blue-100' : 'text-gray-500'}`}>
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 bg-white">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <button type="button" className="p-2 text-gray-500 hover:text-gray-700">
                  <FiPaperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
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
        ) : (
          <div className="hidden md:flex md:w-2/3 items-center justify-center bg-gray-50">
            <div className="text-center p-6">
              <FiMessageSquare className="mx-auto text-4xl text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-500">
                Select a conversation to start chatting
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorChat;