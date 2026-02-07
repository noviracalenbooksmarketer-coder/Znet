
export enum UserStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  AWAY = 'away'
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  status: UserStatus;
  lastSeen?: string;
  blockedUsers: string[];
  followersCount: number;
  followingCount: number;
  likesCount: number;
  postsCount: number;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  type: 'image' | 'video';
  url: string;
  caption: string;
  likes: number;
  timestamp: number;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: number;
  type: 'text' | 'image' | 'voice';
  mediaUrl?: string;
  reactions: Record<string, string[]>;
  readBy: string[];
}

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  participants: string[];
  lastMessage?: Message;
  type: 'private' | 'group' | 'public';
  unreadCount?: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
