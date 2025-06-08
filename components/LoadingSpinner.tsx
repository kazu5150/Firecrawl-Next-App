export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full animate-spin">
          <div className="w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full"></div>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 animate-pulse">
        Processing your request...
      </p>
    </div>
  );
}