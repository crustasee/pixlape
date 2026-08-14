'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ArticlesForm, ArticleFormData } from '@/components/admin/ArticlesForm';

export default function NewArticlePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ArticleFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate saving or publishing the article document
      console.log('Publishing new article:', data);
      await new Promise((resolve) => setTimeout(resolve, 800));
      router.push('/admin/document');
    } catch (err) {
      console.error('Failed to publish article:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AdminHeader
        title="Publish New Article / Web Document"
        breadcrumb={['Admin', 'Documents', 'Create Article']}
      />
      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] w-full text-text font-body">
        <ArticlesForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </main>
    </>
  );
}
