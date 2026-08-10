export default function LoadingSkeleton({ count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-dark-paper rounded-xl overflow-hidden border border-gray-800 animate-pulse flex flex-col h-full">
          <div className="aspect-[210/295] w-full bg-gray-700"></div>
          <div className="p-4 flex flex-col flex-grow">
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="mt-auto h-10 bg-gray-700 rounded w-full"></div>
          </div>
        </div>
      ))}
    </>
  );
}
