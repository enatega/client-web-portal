import React from 'react';

const RestaurantProfileSkeleton = () => {
  return (
    <div className="flex items-center justify-center mt-8 animate-pulse">
      <div className="bg-white p-8 w-full border-2 border-dotted rounded border-inherit">
        <div className="flex items-center mb-6">
          <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
          <div className="ml-2">
            <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-48"></div>
          </div>
        </div>
        <hr className="mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(9)].map((_, index) => (
            <div key={index}>
              <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-32"></div>
            </div>
          ))}
          <div className="md:row-span-4">
            <div className="h-4 bg-gray-300 rounded w-24 mb-4"></div>
            <div className="flex space-x-2">
              <div className="w-24 h-24 bg-gray-300 rounded"></div>
              <div className="w-24 h-24 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfileSkeleton;