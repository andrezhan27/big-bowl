import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
export function CTA({ href, children, variant = 'primary', className = '', target }: { href: string; children: ReactNode; variant?: 'primary' | 'outline' | 'light'; className?: string; target?: '_blank' }) {
  return <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} className={`cta cta-${variant} ${className}`}><span>{children}</span><ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" /></a>;
}
