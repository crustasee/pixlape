import React from 'react';
import { IconRenderer } from '@/components/ui/IconRenderer';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: string;
  trend?: string;
  isPositive?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon = '📈',
  trend,
  isPositive = true,
}) => {
  const lowerTitle = title.toLowerCase();
  let badgeBg = 'bg-white text-black';

  if (lowerTitle.includes('download')) {
    badgeBg = 'bg-white text-black';
  } else if (lowerTitle.includes('revenue') || lowerTitle.includes('money') || lowerTitle.includes('sales') || lowerTitle.includes('price')) {
    badgeBg = 'bg-white text-black';
  } else if (lowerTitle.includes('user') || lowerTitle.includes('visitor') || lowerTitle.includes('member')) {
    badgeBg = 'bg-white text-black';
  } else if (lowerTitle.includes('product') || lowerTitle.includes('asset') || lowerTitle.includes('item')) {
    badgeBg = 'bg-white text-black';
  }

  return (
    <div className="bg-yellow-green border border-border-color rounded-lg p-5 shadow-hard-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg transition-all duration-200 group select-none relative overflow-hidden flex flex-col justify-between gap-3 text-text">
      <div className="flex items-center justify-between">
        <span className="text-darkteal text-lg font-black uppercase tracking-wider font-mono">
          {title}
        </span>
        <div className={`w-10 h-10 rounded-lg ${badgeBg} bg-yellow-100 flex items-center justify-center text-xl shadow-hard-sm group-hover:scale-105 transition-transform duration-200 p-1.5`}>
          <IconRenderer icon={icon} alt={title} className="w-9 h-9 object-contain" />
        </div>
      </div>

      <div className="flex items-baseline justify-between pt-1">
        <span className="text-2xl sm:text-3xl font-black text-cayenne tracking-tight font-head uppercase">{value}</span>
        {trend && (
          <span
            className={`text-xs font-black font-mono px-2 py-0.5 rounded-md border border-border-color shadow-[1px_1px_0_var(--border-color)] ${isPositive
              ? 'bg-neo-lime text-black'
              : 'bg-neo-pink text-white'
              }`}
          >
            <span aria-hidden="true" className="mr-0.5">{isPositive ? '↑' : '↓'}</span>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};
