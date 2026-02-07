
import React, { useState } from 'react';
import { Message } from '../types';
import { REACTION_EMOJIS } from '../constants';

interface MessageBubbleProps {
  message: Message;
  isMe: boolean;
  onReaction: (emoji: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isMe, onReaction }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} group mb-1`}>
      <div className={`flex items-end gap-2 max-w-[80%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar Placeholder */}
        {!isMe && (
            <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-slate-500">
                {message.senderName.charAt(0)}
            </div>
        )}

        <div className="relative group/content">
          <div className={`px-4 py-2.5 rounded-2xl shadow-sm text-sm break-words whitespace-pre-wrap ${
            isMe 
              ? 'bg-indigo-600 text-white rounded-tr-none' 
              : 'bg-white dark:bg-slate-900 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-800'
          }`}>
            {!isMe && <p className="text-[10px] font-bold mb-1 opacity-70 uppercase tracking-tighter">{message.senderName}</p>}
            
            {message.type === 'text' && message.content}
            
            {message.type === 'image' && (
              <img src={message.mediaUrl} alt="Shared content" className="max-w-xs rounded-lg mt-1 cursor-pointer hover:opacity-90 transition-opacity" />
            )}
            
            {message.type === 'voice' && (
              <div className="flex items-center gap-3 py-1">
                <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </button>
                <div className="flex-1 h-1 bg-white/20 rounded-full relative overflow-hidden min-w-[120px]">
                    <div className="absolute inset-0 bg-white w-1/3"></div>
                </div>
                <span className="text-[10px] opacity-80 font-mono">0:03</span>
              </div>
            )}
          </div>

          {/* Timestamp */}
          <span className={`text-[10px] text-slate-400 mt-1 block px-1 ${isMe ? 'text-right' : 'text-left'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>

          {/* Reactions Overlay */}
          <div className={`absolute -bottom-3 ${isMe ? 'left-0' : 'right-0'} flex gap-1 z-10`}>
            {/* Fix: cast userIds to string[] to resolve 'unknown' type error */}
            {Object.entries(message.reactions).map(([emoji, userIds]) => {
                const ids = userIds as string[];
                return ids.length > 0 && (
                    <button 
                        key={emoji}
                        onClick={() => onReaction(emoji)}
                        className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full px-1.5 py-0.5 text-[10px] shadow-sm hover:scale-110 transition-transform flex items-center gap-1"
                    >
                        <span>{emoji}</span>
                        <span className="text-slate-500">{ids.length}</span>
                    </button>
                );
            })}
          </div>

          {/* Emoji Trigger */}
          <div className={`absolute top-0 ${isMe ? '-left-8' : '-right-8'} opacity-0 group-hover/content:opacity-100 transition-opacity flex flex-col gap-1`}>
            <button 
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-1.5 text-slate-400 hover:text-indigo-500 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-full shadow-sm"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>
          </div>

          {/* Simple Emoji Picker */}
          {showEmojiPicker && (
              <div className="absolute top-0 z-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1.5 flex gap-1 shadow-xl animate-in fade-in zoom-in duration-150">
                {REACTION_EMOJIS.map(emoji => (
                    <button 
                        key={emoji} 
                        onClick={() => { onReaction(emoji); setShowEmojiPicker(false); }}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-lg transition-transform hover:scale-125"
                    >
                        {emoji}
                    </button>
                ))}
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
