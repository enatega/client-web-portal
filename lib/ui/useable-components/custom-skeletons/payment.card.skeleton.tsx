export default function PaymentCardSkeleton() {
    return (
      <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-100 animate-pulse">
        <div className="w-24 h-24 bg-gray-300 rounded-full mb-6"></div>
        <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-48 mb-4"></div>
        <div className="h-8 bg-gray-300 rounded w-36"></div>
      </div>
    );
  }
  