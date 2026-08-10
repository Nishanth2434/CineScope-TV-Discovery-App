import { SearchX } from 'lucide-react';

export default function EmptyState({ title, message, icon: Icon = SearchX, action }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="bg-gray-800 p-4 rounded-full mb-4">
        <Icon size={48} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-light mb-2">{title}</h3>
      <p className="text-gray-400 mb-6 max-w-md">{message}</p>
      {action}
    </div>
  );
}
