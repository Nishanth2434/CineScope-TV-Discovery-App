import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl bg-red-950/20 border border-red-900/50">
      <AlertCircle size={48} className="text-red-500 mb-4" />
      <h3 className="text-xl font-bold text-red-200 mb-2">Oops! Something went wrong</h3>
      <p className="text-red-400 mb-6 max-w-md">{message || 'We could not fetch the data. Please try again later.'}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 bg-red-900 hover:bg-red-800 text-white px-6 py-2 rounded-lg transition-colors font-medium"
        >
          <RefreshCw size={18} />
          Try Again
        </button>
      )}
    </div>
  );
}
