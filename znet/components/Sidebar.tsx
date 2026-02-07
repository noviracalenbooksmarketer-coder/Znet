
import React, { useState } from 'react';
import { ChatRoom, User, UserStatus } from '../types';
import { ZNET_LOGO } from '../constants';

interface SidebarProps {
  rooms: ChatRoom[];
  activeRoomId: string | null;
  onSelectRoom: (id: string) => void;
  user: User | null;
  onLogout: () => void;
  onToggleTheme: () => void;
  darkMode: boolean;
  onCreateRoom?: (room: ChatRoom) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  rooms, 
  activeRoomId, 
  onSelectRoom, 
  user, 
  onLogout,
  onToggleTheme,
  darkMode,
  onCreateRoom
}) => {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'chats' | 'rooms'>('chats');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');

  const filteredRooms = rooms.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) && 
    (tab === 'rooms' ? r.type === 'public' : r.type !== 'public')
  );

  const handleCreateRoom = () => {
    if (newRoomName.trim() && onCreateRoom) {
      const newRoom: ChatRoom = {
        id: `room-${Date.now()}`,
        name: newRoomName,
        description: 'A new node in the universe.',
        isPublic: tab === 'rooms',
        participants: [user?.id || ''],
        type: tab === 'rooms' ? 'public' : 'group'
      };
      onCreateRoom(newRoom);
      setNewRoomName('');
      setShowCreateModal(false);
    }
  };

  return (
    <div className="w-80 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-white dark:bg-slate-900 shadow-sm z-10 transition-all h-full">
      {/* User Header Section */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={user?.avatar} alt="Avatar" className="w-11 h-11 rounded-2xl border-2 border-indigo-500 shadow-lg shadow-indigo-100 dark:shadow-none object-cover" />
              <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 ${user?.status === UserStatus.ONLINE ? 'bg-green-500' : 'bg-slate-400'}`} />
            </div>
            <div>
              <h2 className="font-bold text-sm truncate max-w-[110px] dark:text-white flex items-center gap-1">
                {user?.username}
              </h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Node</p>
            </div>
          </div>
          <div className="flex gap-1">
            <button onClick={onToggleTheme} className="p-2 text-slate-500 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all shadow-sm">
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button onClick={onLogout} title="Logout" className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col items-center flex-1 border-r border-slate-100 dark:border-slate-800">
            <span className="text-sm font-bold dark:text-white">{(user?.followersCount || 0).toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">Followers</span>
          </div>
          <div className="flex flex-col items-center flex-1 border-r border-slate-100 dark:border-slate-800">
            <span className="text-sm font-bold dark:text-white">{(user?.followingCount || 0).toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">Following</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-sm font-bold dark:text-white">{(user?.likesCount || 0).toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">Likes</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-indigo-600 dark:text-indigo-400">{ZNET_LOGO("w-6 h-6")}</div>
          <span className="text-xs font-black tracking-widest text-slate-800 dark:text-slate-200 uppercase">Z-Signals</span>
        </div>
      </div>

      <div className="px-4 py-2">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search network..." 
            className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-2 pl-10 pr-4 text-sm transition-all dark:text-white outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>

      <div className="px-4 flex gap-1 my-2">
        <button onClick={() => setTab('chats')} className={`flex-1 py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all ${tab === 'chats' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>Direct</button>
        <button onClick={() => setTab('rooms')} className={`flex-1 py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all ${tab === 'rooms' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>Nodes</button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 space-y-1 pb-4">
        {filteredRooms.map((room) => (
          <button
            key={room.id}
            onClick={() => onSelectRoom(room.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${activeRoomId === room.id ? 'bg-indigo-50 dark:bg-indigo-900/30 ring-1 ring-indigo-100 dark:ring-indigo-800' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black overflow-hidden ${room.type === 'public' ? 'bg-indigo-500' : 'bg-emerald-500'}`}>
              {room.name.charAt(0)}
            </div>
            <div className="flex-1 text-left min-w-0">
              <h3 className="text-sm font-bold truncate dark:text-white">{room.name}</h3>
              <p className="text-xs text-slate-500 truncate">{room.description}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <button 
          onClick={() => setShowCreateModal(true)}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
        >
          Initiate New Node
        </button>
      </div>

      {showCreateModal && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xs p-6 rounded-[32px] shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in duration-200">
            <h3 className="text-xl font-black mb-4 italic uppercase tracking-tighter dark:text-white">Launch Signal</h3>
            <input 
              type="text" 
              placeholder="Signal Name..." 
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl p-4 text-sm font-bold mb-4 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              autoFocus
            />
            <div className="flex gap-2">
              <button onClick={() => setShowCreateModal(false)} className="flex-1 py-3 text-slate-400 font-black uppercase tracking-widest text-[10px]">Cancel</button>
              <button onClick={handleCreateRoom} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px]">Launch</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
