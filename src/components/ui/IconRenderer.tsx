'use client';

import React, { useState, useEffect } from 'react';

/**
 * Checks if a string represents an image file path, URL, or data URI
 */
export function isImageIcon(icon?: string | null): boolean {
  if (!icon || typeof icon !== 'string') return false;
  const str = icon.trim().replace(/\\/g, '/');
  if (str.startsWith('<img')) return true;
  if (str.startsWith('http://') || str.startsWith('https://') || str.startsWith('//') || str.startsWith('data:image/')) return true;
  if (/\.(png|jpe?g|gif|webp|svg|ico|bmp)(\?.*)?$/i.test(str)) return true;
  if ((str.includes('/') || str.startsWith('public')) && !str.startsWith('<')) return true;
  return false;
}

/**
 * Normalizes an icon path string into a valid public web URL
 */
export function getIconSrc(icon?: string | null): string {
  if (!icon || typeof icon !== 'string') return '';
  let src = icon.trim().replace(/\\/g, '/');

  if (src.startsWith('<img')) {
    const match = src.match(/src=["']([^"']+)["']/);
    if (match && match[1]) {
      src = match[1];
    }
  }

  // Prepend leading '/' if not external link or data url
  if (!src.startsWith('/') && !src.startsWith('http://') && !src.startsWith('https://') && !src.startsWith('//') && !src.startsWith('data:')) {
    // Strip leading 'public/' or '/public/'
    if (src.startsWith('/public/')) {
      src = src.substring(7);
    } else if (src.startsWith('public/')) {
      src = src.substring(6);
    }
    if (!src.startsWith('/')) {
      src = '/' + src;
    }
  }

  return src;
}

export interface IconRendererProps {
  icon?: string | null;
  alt?: string;
  className?: string;
  size?: number;
  fallbackEmoji?: string;
}

export const IconRenderer: React.FC<IconRendererProps> = ({
  icon,
  alt = 'Icon',
  className = 'w-5 h-5 object-contain inline-block',
  size = 20,
  fallbackEmoji = '📦',
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [icon]);

  if (!icon || hasError) {
    return <span className={`inline-flex items-center justify-center font-mono ${className}`}>{fallbackEmoji}</span>;
  }

  const trimmed = icon.trim();

  // HTML String like <svg>, <i class="...">, or <link rel="stylesheet"...>
  if (trimmed.startsWith('<') && !trimmed.startsWith('<img')) {
    return (
      <span
        className={`inline-flex items-center justify-center ${className}`}
        dangerouslySetInnerHTML={{ __html: trimmed }}
      />
    );
  }

  // CSS Icon classes (e.g. "fi fi-ss-brands-windows", "fa-solid fa-windows")
  if (/^(fi|fa|bi|ri|uicon)[-\s]/.test(trimmed)) {
    return <i className={`text-base leading-none ${trimmed}`} />;
  }

  if (isImageIcon(icon)) {
    const src = getIconSrc(icon);
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={size}
        height={size}
        onError={() => setHasError(true)}
      />
    );
  }

  return <span className={`inline-flex items-center justify-center font-mono ${className}`}>{icon}</span>;
};
