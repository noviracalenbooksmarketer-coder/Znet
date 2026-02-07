
import React, { useState, useRef } from 'react';
import { User, Post } from '../types';

interface PostCreatorProps {
  user: User;
  onPost: (post: Post) => void;
}

const PostCreator: React.FC<PostCreatorProps> = ({ user, onPost }) => {
  const [caption, setCaption] = useState('');
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [type, setType] = useState<'image' | 'video'>('image');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setType(file.type.startsWith('video') ? 'video' : 'image');
      const reader = new FileReader();
      reader.onload = (ev) => setMediaUrl(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (mediaUrl) {
      onPost({
        id: Date.now().toString(),
        authorId: user.id,
        authorName: user.username,
        authorAvatar: user.avatar,
        type,
        url: mediaUrl,
        caption,
        likes: 0,
        timestamp: Date.now()
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 h-full bg-white dark:bg-slate-900 flex flex-col">
      <h2 className="text-2xl font-black mb-8 italic uppercase tracking-tighter dark:text-white">Transmit Signal</h2>
      
      <div 
        onClick={() => fileRef.current?.click()}
        className="flex-1 border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[40px] flex items-center justify-center overflow-hidden cursor-pointer hover:border-indigo-500 transition-colors relative"
      >
        {mediaUrl ? (
          type === 'image' ? <img src={mediaUrl} className="w-full h-full object-cover" /> : <video src={mediaUrl} className="w-full h-full object-cover" controls />
        ) : (
          <div className="text-center">
            <div className="bg-indigo-50 dark:bg-slate-800 p-6 rounded-full inline-block mb-4 text-indigo-600">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Upload Photo or Video</p>
          </div>
        )}
        <input type="file" ref={fileRef} className="hidden" accept="image/*,video/*" onChange={handleFile} />
      </div>

      <div className="mt-8 space-y-4">
        <textarea 
          placeholder="Caption your transmission..."
          className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none dark:text-white"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button 
          onClick={handleSubmit}
          disabled={!mediaUrl}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-indigo-100 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Push to Network
        </button>
      </div>
    </div>
  );
};

export default PostCreator;
