
import React, { useState, useRef, useEffect } from 'react';
import { ChatRoom, Message, User } from '../types';
import MessageBubble from './MessageBubble';

interface ChatWindowProps {
  room: ChatRoom;
  messages: Message[];
  onSendMessage: (content: string, type?: 'text' | 'image' | 'voice', url?: string) => void;
  currentUser: User;
  onReaction: (msgId: string, emoji: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ room, messages, onSendMessage, currentUser, onReaction }) => {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        onSendMessage('Shared an image', 'image', url);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleVoiceRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Mock recording
      setTimeout(() => {
        setIsRecording(false);
        onSendMessage('Voice message', 'voice', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
      }, 3000);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 relative">
      {/* Header */}
      <div className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold shadow-inner">
            {room.type === 'public' ? '#' : room.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white leading-tight">{room.name}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              {room.type === 'public' ? 'Active community' : 'Online'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
            <button className="p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </button>
            <button className="p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 pb-20 scroll-smooth"
      >
        <div className="flex justify-center mb-8">
            <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                Beginning of message history
            </div>
        </div>
        {messages.map((msg) => (
          <MessageBubble 
            key={msg.id} 
            message={msg} 
            isMe={msg.senderId === currentUser.id} 
            onReaction={(emoji) => onReaction(msg.id, emoji)}
          />
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-transparent backdrop-blur-sm absolute bottom-0 left-0 right-0">
        <form 
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto flex items-end gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-2xl shadow-slate-200 dark:shadow-none"
        >
          <div className="flex items-center gap-1">
            <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </button>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
            <button 
                type="button" 
                onClick={toggleVoiceRecording}
                className={`p-2 rounded-xl transition-all ${isRecording ? 'text-red-500 bg-red-50 animate-pulse' : 'text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'}`}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            </button>
          </div>
          
          <div className="flex-1 relative">
            <textarea
              rows={1}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white placeholder:text-slate-400 resize-none max-h-32"
            />
          </div>

          <button 
            type="submit"
            disabled={!inputText.trim()}
            className={`p-2.5 rounded-xl transition-all shadow-md ${inputText.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'}`}
          >
            <svg className="w-6 h-6 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
