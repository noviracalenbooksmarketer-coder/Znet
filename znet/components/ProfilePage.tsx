
import React, { useRef } from 'react';
import { User, Post } from '../types';

interface ProfilePageProps {
  user: User;
  onUpdateAvatar: (url: string) => void;
  onLogout: () => void;
  posts: Post[];
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUpdateAvatar, onLogout, posts }) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => onUpdateAvatar(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-xl mx-auto h-full flex flex-col bg-white dark:bg-slate-950 overflow-y-auto pb-20">
      <div className="relative h-48 bg-gradient-to-r from-indigo-600 to-purple-800">
        <button 
          onClick={onLogout}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 p-2 rounded-xl backdrop-blur-md text-white transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
        </button>
      </div>

      <div className="px-6 -mt-16 relative z-10">
        <div className="relative inline-block group">
          <img src={user.avatar} className="w-32 h-32 rounded-[40px] border-4 border-white dark:border-slate-950 object-cover shadow-2xl" />
          <button 
            onClick={() => fileRef.current?.click()}
            className="absolute inset-0 bg-black/40 rounded-[40px] opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </button>
          <input type="file" ref={fileRef} className="hidden" accept="image/*" onChange={handleFileChange} />
        </div>

        <div className="mt-4">
          <h1 className="text-2xl font-black dark:text-white flex items-center gap-2 italic uppercase tracking-tighter">
            {user.username}
            <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
            </div>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{user.bio}</p>
        </div>

        <div className="flex justify-between items-center py-6 border-b border-slate-100 dark:border-slate-800">
          <div className="text-center">
            <div className="text-lg font-black dark:text-white uppercase italic">{posts.length}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Postings</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-black dark:text-white uppercase italic">{user.followersCount.toLocaleString()}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Networkers</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-black dark:text-white uppercase italic">{user.followingCount.toLocaleString()}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Following</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-black dark:text-white uppercase italic">{user.likesCount.toLocaleString()}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Endorsed</div>
          </div>
        </div>

        <div className="py-6">
          <div className="grid grid-cols-3 gap-1">
            {posts.map(post => (
              <div key={post.id} className="aspect-square relative group overflow-hidden bg-slate-100 rounded-lg">
                <img src={post.url} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                {post.type === 'video' && (
                  <div className="absolute top-2 right-2">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168l4.2 2.8a1 1 0 010 1.664l-4.2 2.8A1 1 0 018 13.56V7.84a1 1 0 011.555-.832z" /></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
