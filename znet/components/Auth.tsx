
import React, { useState } from 'react';
import { User, UserStatus } from '../types';
import { ZNET_LOGO } from '../constants';

interface AuthProps {
  onLogin: (user: User) => void;
  darkMode: boolean;
  onToggleTheme: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin, darkMode, onToggleTheme }) => {
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    // Simulate Auth with Social Stats
    // Fix: Added missing 'postsCount' property to satisfy the User interface
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: username,
      avatar: `https://picsum.photos/seed/${username}/200`,
      bio: "Connecting on Znet.",
      status: UserStatus.ONLINE,
      blockedUsers: [],
      followersCount: Math.floor(Math.random() * 500),
      followingCount: Math.floor(Math.random() * 300),
      likesCount: Math.floor(Math.random() * 2000),
      postsCount: 0
    };
    onLogin(newUser);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'dark bg-slate-950' : 'bg-slate-50'}`}>
        <div className="absolute top-4 right-4">
            <button onClick={onToggleTheme} className="p-3 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                {darkMode ? '☀️' : '🌙'}
            </button>
        </div>

      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 p-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-300 dark:shadow-none transform hover:rotate-12 transition-transform duration-500">
            {ZNET_LOGO("w-12 h-12 text-white")}
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter uppercase italic">Znet</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Networking at the speed of thought.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Identity Handle</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="@username"
              className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 rounded-2xl py-4 px-6 text-sm transition-all dark:text-white outline-none font-bold"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-200 dark:shadow-none active:scale-95 transition-all"
          >
            {isLogin ? 'Establish Link' : 'Initialize Identity'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs font-black uppercase tracking-wider text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            {isLogin ? "No identity? Generate one" : "Active identity? Re-establish link"}
          </button>
        </div>

        <div className="mt-10 flex items-center gap-4 text-slate-300 dark:text-slate-700 text-[10px] font-black uppercase tracking-widest">
            <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800"></div>
            <span>Cross-Network Link</span>
            <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800"></div>
        </div>

        <div className="mt-6 flex gap-4">
            <button className="flex-1 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center group">
                <svg className="w-6 h-6 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-2 5.12-7.84 5.12-5.04 0-9.12-4.16-9.12-9.28s4.08-9.28 9.12-9.28c2.88 0 4.8 1.2 5.84 2.16l2.56-2.56c-1.6-1.52-4.08-2.48-8.4-2.48-6.64 0-12 5.36-12 12s5.36 12 12 12c6.88 0 11.52-4.8 11.52-11.76 0-.8-.08-1.36-.16-1.92h-11.36z"/></svg>
            </button>
            <button className="flex-1 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center group">
                <svg className="w-6 h-6 text-slate-400 group-hover:text-indigo-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
