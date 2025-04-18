import React, { useState } from 'react';

interface Chat {
  id: number;
  message: string;
  time: string;
}

const UserProfile: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<Chat[]>([
    { id: 1, message: 'Hello AI', time: '2025-04-10 10:00 AM' },
    { id: 2, message: 'How to use this app?', time: '2025-04-10 10:05 AM' },
  ]);

  const handleDelete = () => {
    setChatHistory([]);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-[#1C1C1C] rounded-2xl p-6 flex items-center gap-4 shadow-lg">
          <img
            src="https://i.pravatar.cc/100"
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-green-500"
          />
          <div>
            <h2 className="text-2xl font-bold">Testing</h2>
            <p className="text-gray-400">testing@outlook.com</p>
          </div>
        </div>

        {/* Chat History */}
        <div className="bg-[#1C1C1C] rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Chat History</h3>
            <button
              onClick={handleDelete}
              className="text-red-400 hover:text-red-600 font-medium"
            >
              Delete All
            </button>
          </div>
          {chatHistory.length > 0 ? (
            <ul className="space-y-2">
              {chatHistory.map((chat) => (
                <li key={chat.id} className="bg-[#2A2A2A] p-4 rounded-lg">
                  <p className="text-white">{chat.message}</p>
                  <p className="text-sm text-gray-500">{chat.time}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No chat history found.</p>
          )}
        </div>

        {/* Settings */}
        <div className="bg-[#1C1C1C] rounded-2xl p-6 shadow-lg space-y-4">
          <h3 className="text-xl font-semibold">Account Settings</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white cursor-pointer">🔒 Change Password</li>
            <li className="hover:text-white cursor-pointer">📧 Update Email</li>
            <li className="hover:text-white cursor-pointer">🚪 Logout</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
