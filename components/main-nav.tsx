'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center justify-center px-4 max-w-7xl mx-auto">
        <Link 
          href="/" 
          className="text-xl font-bold gradient-text"
          style={{ 
            background: 'linear-gradient(45deg, #ff6b00, #ff8e3c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Reubica.me
        </Link>
      </div>
    </div>
  );
}