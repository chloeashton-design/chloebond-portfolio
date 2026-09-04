import type { CSSProperties, ReactNode } from 'react';

export default function HandNote({
  children,
  rotate = -2,
  style,
  className,
}: {
  children: ReactNode;
  rotate?: number;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <span
      className={`hand-note${className ? ` ${className}` : ''}`}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
    >
      {children}
    </span>
  );
}
