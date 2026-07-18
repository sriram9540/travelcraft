import React from 'react';
import { cn } from '../lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        'relative bg-white/10 backdrop-blur-3xl border border-white/20 shadow-2xl rounded-[40px] overflow-hidden group',
        className
      )}
      {...props}
    >
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-orange-400/20 to-transparent pointer-events-none"></div>
      <div className="relative z-10 w-full h-full p-8 md:p-10 flex flex-col">
        {children}
      </div>
    </div>
  );
}
