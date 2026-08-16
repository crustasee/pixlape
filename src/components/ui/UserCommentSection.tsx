'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, Send, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface UserComment {
  id: string;
  author: string;
  avatar: string;
  role: string;
  content: string;
  rating: number;
  timestamp: string;
  likes: number;
  userLiked?: boolean;
}

const DEFAULT_COMMENTS: UserComment[] = [
  {
    id: 'c1',
    author: 'Galih Addi',
    avatar: '⚡',
    role: 'VERIFIED DEVELOPER',
    content: 'Top tier neo-brutalist asset vault! Clean SVGs and zero bloat framework code.',
    rating: 5,
    timestamp: '2 hours ago',
    likes: 18,
  },
  {
    id: 'c2',
    author: 'Rizky Dev',
    avatar: '💻',
    role: 'COMMUNITY MEMBER',
    content: 'Fast download pipeline with no telemetry or popup ads. High quality vector packs!',
    rating: 5,
    timestamp: '5 hours ago',
    likes: 12,
  },
  {
    id: 'c3',
    author: 'Sarah V.',
    avatar: '🎨',
    role: 'VISUAL ARCHITECT',
    content: 'Super sleek design tokens and Space Grotesk layout. Will definitely use for my next build.',
    rating: 5,
    timestamp: '1 day ago',
    likes: 9,
  },
];

const LOCAL_STORAGE_KEY = 'pixlape_user_comments';

export const UserCommentSection: React.FC = () => {
  const [comments, setComments] = useState<UserComment[]>(DEFAULT_COMMENTS);
  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [selectedAvatar, setSelectedAvatar] = useState('🔥');
  const [submittedMessage, setSubmittedMessage] = useState('');

  const avatarOptions = ['🔥', '⚡', '🎨', '📦', '💻', '🚀', '💎', '👾'];

  // Load comments from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setComments(parsed);
        }
      }
    } catch (e) {
      console.warn('Could not load comments from localStorage:', e);
    }
  }, []);

  // Save comments to localStorage when changed
  const saveComments = (newComments: UserComment[]) => {
    setComments(newComments);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newComments));
    } catch (e) {
      console.warn('Could not save comments to localStorage:', e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: UserComment = {
      id: `comment_${Date.now()}`,
      author: authorName.trim() || 'Anonymous Dev',
      avatar: selectedAvatar,
      role: 'VAULT MEMBER',
      content: commentText.trim(),
      rating,
      timestamp: 'Just now',
      likes: 1,
      userLiked: true,
    };

    const updated = [newComment, ...comments];
    saveComments(updated);

    setCommentText('');
    setAuthorName('');
    setSubmittedMessage('✓ Comment posted successfully to vault forum!');
    setTimeout(() => setSubmittedMessage(''), 3500);
  };

  const handleLike = (id: string) => {
    const updated = comments.map((c) => {
      if (c.id === id) {
        const userLiked = !c.userLiked;
        return {
          ...c,
          likes: userLiked ? c.likes + 1 : c.likes - 1,
          userLiked,
        };
      }
      return c;
    });
    saveComments(updated);
  };

  return (
    <div className="w-full border rounded-lg p-4 shadow-hard-sm bg-green-100 flex flex-col gap-2 text-darkteal font-mono">
      {/* ====================================Header================================================== */}
      <div className="flex items-center justify-between border-border-color pb-3">
        <div className="flex items-center gap-2 text-sm sm:text-base font-black uppercase text-darkteal">
          <MessageSquare className="w-5 h-5 text-cayenne" aria-hidden="true" />
          <span>VAULT COMMUNITY COMMENTS ({comments.length})</span>
        </div>
        <span className="badge bg-yellow-green text-darkteal text-xs font-bold px-2.5 py-1 rounded border border-border-color shadow-hard-sm">
          ● LIVE FORUM
        </span>
      </div>

      {/* =========================================Comment Form================================== */}
      <form onSubmit={handleSubmit} className="bg-green-200 border border-border-color rounded-lg p-4 sm:p-5 shadow-hard-sm flex flex-col gap-4 w-full max-w-full">
        <div className="flex flex-col w-full max-w-full relative sm:flex-col gap-2">
        </div>
        <div className="font-mono font-black text-lg uppercase text-darkteal flex items-center justify-between">
          <span>+++++ LEAVE A VAULT COMMENT</span>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-lg transition-transform hover:scale-125 focus:outline-none ${
                  star <= rating ? 'text-cayenne' : 'text-gray-300'
                }`}
                title={`${star} Star Rating`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* =========================================Input Fields================================== */}
        <div className="flex flex-col max-w-full sm:grid-cols-1 gap-7">
          <div>
            <label className="flex flex-wrap max-w-full w-full text-sm font-bold uppercase text-darkteal mb-1">
              ▩ USERNAME:
            </label>
            <input
              type="text"
              placeholder="e.g. Alex Dev"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full max-w-full px-3 py-2 bg-white text-darkteal border border-border-color rounded-lg text-xs font-mono placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cayenne"
            />
          </div>
        </div>

        <div>
          <label className="flex flex-wrap text-sm font-bold uppercase text-darkteal">
            ▩ Your Feedback / Comment:
          </label>
          <textarea
            required
            rows={3}
            placeholder="Write your thoughts on assets, tools, or design requests..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full px-2 py-2 bg-white text-darkteal border border-border-color rounded-lg text-xs font-mono placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cayenne"
          />
        </div>

        {submittedMessage && (
          <div className="bg-yellow-100 text-darkteal px-3 py-2 rounded-lg border border-border-color text-xs font-bold animate-fade-in">
            {submittedMessage}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full sm:w-auto self-end py-2.5 px-5 bg-yellow-green text-white font-mono font-black text-xs uppercase rounded-lg border border-border-color shadow-hard-sm hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>POST COMMENT ▶▶</span>
        </Button>
      </form>
    
      {/* ==============================Comments List======================================================== */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm sm:text-base font-black uppercase text-darkteal">
        </div>
      </div>
    
      <div className="flex flex-col gap-2  max-h-[720px] overflow-y-auto pr-1 border-border-color rounded-lg p-6 pb-7">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-yellow-50 text-darkteal border-2 border-border-color rounded-xl p-4 shadow-hard-sm flex flex-col gap-2 transition-all hover:bg-yellow-green"
          >
            <div className="flex items-center justify-between border-b border-border-color pb-2">
              <div className="flex items-center gap-6">
                <span className="w-9 h-9 rounded-sm bg-white border border-border-color flex items-center justify-center text-sm select-none">
                  {comment.avatar}
                </span>
                <div className="flex flex-col">
                  <div className="flex items-center gap-5">
                    <span className="font-bold text-sm text-darkteal">{comment.author}</span>
                    <span className="bg-green-300 text-darkteal text-xs px-4 py-0.5 rounded border border-border-color">
                      {comment.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating Stars */}
              <div className="flex text-xs text-cayenne">
                {comment.timestamp}
              </div>
            </div>

            <p className="flex text-sm leading-relaxed font-mono text-darkteal">
            <span className="pl-12">&quot;</span>
              {comment.content}
            </p>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => handleLike(comment.id)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold border transition-all cursor-pointer ${
                  comment.userLiked
                    ? 'bg-cayenne text-white border-border-color shadow-hard-sm'
                    : 'bg-white text-darkteal border-border-color hover:bg-yellow-green'
                }`}
              >
                <ThumbsUp className="w-3 h-3" />
                <span>{comment.likes}</span>
              </button>

              <span className="text-xs text-darkteal font-bold flex items-center gap-4">
                <UserCheck className="w-3 h-3 text-green-600" />
                Verified
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
