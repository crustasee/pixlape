import React from 'react';
import { BLOG_POSTS } from '@/data/blogs';
import { ArticlePage } from '@/components/blog/ArticlePage';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const targetId = parseInt(params.id, 10);
  const post = BLOG_POSTS.find((b) => b.id === targetId) || BLOG_POSTS[0];
  return {
    title: `${post.title} — PixlApe Insights`,
    description: post.excerpt,
  };
}

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const targetId = parseInt(params.id, 10);
  const post = BLOG_POSTS.find((b) => b.id === targetId);

  if (!post && !isNaN(targetId)) {
    notFound();
  }

  const articleData = post
    ? {
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        readTime: post.readTime,
        author: post.author,
        category: post.category,
        tag: post.tag,
        icon: post.icon,
        content: post.content,
        imageUrl: post.imageUrl || `/icon/stock/blog00${(post.id % 7) + 1}.svg`,
        caption: post.caption,
        shareUrls: post.shareUrls,
        highlights: post.highlights,
      }
    : undefined;

  return <ArticlePage article={articleData} />;
}
