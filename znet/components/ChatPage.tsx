
import React, { useState } from 'react';
import { User, ChatRoom } from '../types';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';

interface ChatPageProps {
  user: User;
  rooms: ChatRoom[];
  onCreateRoom?: (room: ChatRoom) => void;
}

const ChatPage: React.FC<ChatPageProps> = ({ user, rooms, onCreateRoom }) => {
  const [activeRoomId, setActiveRoomId] = useState<string | null>(rooms.length > 0 ? rooms[0].id : null);
  const [isVideoCall, setIsVideoCall] = useState(false);

  const activeRoom = rooms.find(r => r.id === activeRoomId);

  return (
    <div className="h-full flex flex-col md:flex-row bg-white dark:bg-slate-900 overflow-hidden">
      <div className="w-full md:w-80 h-1/3 md:h-full">
        <Sidebar 
          rooms={rooms} 
          activeRoomId={activeRoomId} 
          onSelectRoom={setActiveRoomId} 
          user={user} 
          onLogout={() => {}} 
          onToggleTheme={() => {}} 
          darkMode={false}
          onCreateRoom={onCreateRoom}
        />
      </div>

      <div className="flex-1 h-2/3 md:h-full border-l border-slate-100 dark:border-slate-800 relative">
        {activeRoom ? (
          <ChatWindow 
            room={activeRoom} 
            messages={[]} 
            onSendMessage={() => {}} 
            currentUser={user} 
            onReaction={() => {}} 
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 p-10 text-center">
            <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            <p className="text-sm font-bold uppercase tracking-widest italic">No signal selected</p>
            <p className="text-xs mt-2 opacity-60">Pick a direct link or node from the sidebar to begin transmitting.</p>
          </div>
        )}

        {activeRoom && (
          <button 
            onClick={() => setIsVideoCall(!isVideoCall)}
            className="absolute top-4 right-16 z-20 p-2.5 bg-green-500 text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform"
            title="Start Group Video Session"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          </button>
        )}

        {isVideoCall && (
          <div className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
              <div className="aspect-video bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden border border-white/10">
                <img src={user.avatar} className="w-full h-full object-cover grayscale" />
                <span className="absolute bottom-4 left-4 text-white text-[10px] font-black uppercase tracking-widest bg-black/40 px-3 py-1 rounded-lg backdrop-blur-md">Local Link</span>
              </div>
              <div className="aspect-video bg-slate-800 rounded-2xl flex items-center justify-center border-2 border-indigo-500 relative overflow-hidden">
                <img src="https://picsum.photos/seed/peer/400/300" className="w-full h-full object-cover" />
                <span className="absolute bottom-4 left-4 text-white text-[10px] font-black uppercase tracking-widest bg-indigo-500/80 px-3 py-1 rounded-lg backdrop-blur-md">Signal_Alpha</span>
              </div>
            </div>
            <div className="mt-12 flex gap-6">
              <button onClick={() => setIsVideoCall(false)} className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-red-500/20 active:scale-90 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
