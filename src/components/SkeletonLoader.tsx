import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="w-full h-[190px] md:h-[270px] bg-gray-300 rounded"></div>
      <div className="w-full px-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-gray-300 h-64 rounded"></div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
