import React from 'react';

interface NarrowContainerProps {
  children: any;
  className?: String;
}

const NarrowContainer= ({children, className}: NarrowContainerProps) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  )
}

export default NarrowContainer;
