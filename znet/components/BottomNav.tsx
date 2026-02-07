
import React from 'react';

type Tab = 'home' | 'video' | 'post' | 'chat' | 'profile';

interface BottomNavProps {
  activeTab: Tab;
  onSelectTab: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  const tabs = [
    { id: 'home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Home' },
    { id: 'video', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Video' },
    { id: 'post', icon: 'M12 4v16m8-8H4', label: 'Post', primary: true },
    { id: 'chat', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', label: 'Chat' },
    { id: 'profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around px-2 z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelectTab(tab.id as Tab)}
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all ${
            tab.primary 
              ? 'bg-indigo-600 text-white -mt-8 shadow-xl shadow-indigo-200 dark:shadow-none active:scale-90 scale-110' 
              : activeTab === tab.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
          </svg>
          {!tab.primary && <span className="text-[10px] mt-1 font-bold uppercase tracking-tighter">{tab.label}</span>}
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
