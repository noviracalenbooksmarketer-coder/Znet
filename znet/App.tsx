
import React, { useState, useEffect } from 'react';
import { User, ChatRoom, AuthState, Message, Post } from './types';
import { INITIAL_ROOMS, MOCK_POSTS } from './constants';
import BottomNav from './components/BottomNav';
import HomeFeed from './components/HomeFeed';
import VideoFeed from './components/VideoFeed';
import ChatPage from './components/ChatPage';
import ProfilePage from './components/ProfilePage';
import PostCreator from './components/PostCreator';
import Auth from './components/Auth';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem('znet_auth');
    return saved ? JSON.parse(saved) : { user: null, isAuthenticated: false };
  });

  const [activeTab, setActiveTab] = useState<'home' | 'video' | 'post' | 'chat' | 'profile'>('home');
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('znet_posts');
    return saved ? JSON.parse(saved) : MOCK_POSTS;
  });

  const [rooms, setRooms] = useState<ChatRoom[]>(() => {
    const saved = localStorage.getItem('znet_rooms');
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  });

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('znet_theme') === 'dark');

  useEffect(() => {
    localStorage.setItem('znet_auth', JSON.stringify(auth));
    localStorage.setItem('znet_posts', JSON.stringify(posts));
    localStorage.setItem('znet_rooms', JSON.stringify(rooms));
  }, [auth, posts, rooms]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('znet_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleUpdateAvatar = (newAvatar: string) => {
    if (auth.user) {
      setAuth({ ...auth, user: { ...auth.user, avatar: newAvatar } });
    }
  };

  const handleCreatePost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    setActiveTab('home');
  };

  const handleCreateRoom = (newRoom: ChatRoom) => {
    setRooms([...rooms, newRoom]);
  };

  if (!auth.isAuthenticated) {
    return <Auth onLogin={(u) => setAuth({ user: u, isAuthenticated: true })} darkMode={darkMode} onToggleTheme={() => setDarkMode(!darkMode)} />;
  }

  return (
    <div className={`h-screen w-full flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-200`}>
      <main className="flex-1 overflow-hidden pb-16">
        {activeTab === 'home' && <HomeFeed posts={posts} />}
        {activeTab === 'video' && <VideoFeed posts={posts.filter(p => p.type === 'video')} />}
        {activeTab === 'post' && <PostCreator user={auth.user!} onPost={handleCreatePost} />}
        {activeTab === 'chat' && <ChatPage user={auth.user!} rooms={rooms} onCreateRoom={handleCreateRoom} />}
        {activeTab === 'profile' && (
          <ProfilePage 
            user={auth.user!} 
            onUpdateAvatar={handleUpdateAvatar} 
            onLogout={() => setAuth({ user: null, isAuthenticated: false })}
            posts={posts.filter(p => p.authorId === auth.user?.id)}
          />
        )}
      </main>

      <BottomNav activeTab={activeTab} onSelectTab={setActiveTab} />
    </div>
  );
};

export default App;
