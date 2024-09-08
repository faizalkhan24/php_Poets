import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full"></div>
    </div>
  );
};

export default Loader;
