
import React, { useState } from 'react';
import { Post } from '../types';

interface HomeFeedProps {
  posts: Post[];
}

const HomeFeed: React.FC<HomeFeedProps> = ({ posts }) => {
  const [search, setSearch] = useState('');

  const filteredPosts = posts.filter(post => 
    post.caption.toLowerCase().includes(search.toLowerCase()) || 
    post.authorName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto h-full flex flex-col bg-slate-50 dark:bg-slate-950">
      <div className="sticky top-0 z-40 p-4 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search signals or networkers..." 
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-6 pt-4 pb-20">
        {filteredPosts.length > 0 ? filteredPosts.map(post => (
          <div key={post.id} className="bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
            <div className="p-4 flex items-center gap-3">
              <img src={post.authorAvatar} className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500" />
              <div>
                <h3 className="font-bold text-sm dark:text-white">@{post.authorName.replace(' ', '').toLowerCase()}</h3>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Linked Now</p>
              </div>
            </div>
            {post.type === 'image' ? (
              <img src={post.url} className="w-full aspect-square object-cover" loading="lazy" />
            ) : (
              <div className="relative group">
                <video src={post.url} className="w-full aspect-square object-cover" controls muted loop />
              </div>
            )}
            <div className="p-4">
              <div className="flex gap-4 mb-3">
                <button className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  <span className="text-xs font-bold">{post.likes.toLocaleString()}</span>
                </button>
                <button className="text-slate-600 dark:text-slate-300 hover:text-indigo-500 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </button>
              </div>
              <p className="text-sm dark:text-slate-200">
                <span className="font-black mr-2 uppercase tracking-tighter italic">Signal:</span>
                {post.caption}
              </p>
            </div>
          </div>
        )) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 italic">
            <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <p className="text-sm">No signals found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeFeed;
