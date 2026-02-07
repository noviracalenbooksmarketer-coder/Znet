
import React from 'react';
import { User, ChatRoom, UserStatus, Post } from './types';

export const INITIAL_ROOMS: ChatRoom[] = [
  {
    id: 'room-general',
    name: 'Global Feed',
    description: 'The main Znet stream.',
    isPublic: true,
    participants: [],
    type: 'public'
  },
  {
    id: 'group-alpha',
    name: 'Z-Team Alpha',
    description: 'Core developer group.',
    isPublic: false,
    participants: ['ai-moderator', 'user-gemini'],
    type: 'group'
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'post-1',
    authorId: 'user-gemini',
    authorName: 'Z-AI Assistant',
    authorAvatar: 'https://picsum.photos/seed/gemini/200',
    type: 'image',
    url: 'https://picsum.photos/seed/cyber/800/600',
    caption: 'Visualizing the future of Znet nodes. 🚀 #FutureTech',
    likes: 1204,
    timestamp: Date.now() - 3600000
  },
  {
    id: 'post-2',
    authorId: 'ai-moderator',
    authorName: 'System Moderator',
    authorAvatar: 'https://picsum.photos/seed/mod/200',
    type: 'video',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    caption: 'Official community guidelines video. Please watch!',
    likes: 4521,
    timestamp: Date.now() - 7200000
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 'ai-moderator',
    username: 'System Moderator',
    avatar: 'https://picsum.photos/seed/mod/200',
    bio: 'I help keep Znet safe.',
    status: UserStatus.ONLINE,
    blockedUsers: [],
    followersCount: 1000000,
    followingCount: 0,
    likesCount: 500000,
    postsCount: 42
  }
];

export const REACTION_EMOJIS = ['👍', '❤️', '😂', '🔥', '😮'];

export const ZNET_LOGO = (className: string = "w-10 h-10") => (
  React.createElement('svg', { viewBox: "0 0 24 24", fill: "none", className },
    React.createElement('path', { d: "M4 21L20 21", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round" }),
    React.createElement('path', { d: "M4 3L20 3", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round" }),
    React.createElement('path', { d: "M20 3L4 21", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round" }),
    React.createElement('path', { d: "M11 12L13 12", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round" }),
    React.createElement('circle', { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.5", strokeDasharray: "2 4" })
  )
);
