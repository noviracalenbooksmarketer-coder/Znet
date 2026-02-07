
import React from 'react';
import { Post } from '../types';

interface VideoFeedProps {
  posts: Post[];
}

const VideoFeed: React.FC<VideoFeedProps> = ({ posts }) => {
  return (
    <div className="h-full w-full bg-black snap-y snap-mandatory overflow-y-scroll">
      {posts.map(post => (
        <div key={post.id} className="h-full w-full snap-start relative flex flex-col justify-center">
          <video 
            src={post.url} 
            className="w-full h-full object-contain" 
            autoPlay 
            loop 
            muted 
            playsInline
          />
          
          <div className="absolute right-4 bottom-24 flex flex-col gap-6 items-center">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-lg">
                <img src={post.authorAvatar} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="text-center text-white">
              <button className="bg-white/10 p-3 rounded-full backdrop-blur-md mb-1">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </button>
              <span className="text-xs font-bold">{post.likes}</span>
            </div>
            <div className="text-center text-white">
              <button className="bg-white/10 p-3 rounded-full backdrop-blur-md mb-1">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </button>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-16 text-white p-4 bg-gradient-to-t from-black/60 to-transparent rounded-2xl">
            <h4 className="font-bold text-lg mb-1">@{post.authorName.replace(' ', '').toLowerCase()}</h4>
            <p className="text-sm opacity-90">{post.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoFeed;
