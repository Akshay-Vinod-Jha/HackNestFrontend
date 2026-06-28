import { FiInbox } from 'react-icons/fi';

export default function EmptyState({ 
  icon: Icon = FiInbox, 
  title = "No Data Found", 
  message = "There's nothing here yet.", 
  action 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50 rounded-3xl border border-gray-100 border-dashed">
      <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-sm">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-2xl font-extrabold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 font-medium max-w-md mb-6">{message}</p>
      {action && (
        <div>{action}</div>
      )}
    </div>
  );
}
