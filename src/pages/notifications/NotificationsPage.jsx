import React, { useEffect } from 'react';
import { FiBell, FiCheck, FiClock, FiInfo } from 'react-icons/fi';
import useNotificationStore from '../../store/notificationStore';

export default function NotificationsPage() {
  const { notifications, fetchNotifications, markAsRead, markAllAsRead, unreadCount, isLoading } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleNotifClick = (notif) => {
    if (!notif.read) {
      markAsRead(notif.id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <FiBell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Notifications</h1>
            <p className="text-sm font-medium text-gray-500">
              You have <span className="font-bold text-blue-600">{unreadCount}</span> unread notifications
            </p>
          </div>
        </div>
        
        {unreadCount > 0 && (
          <button 
            onClick={() => markAllAsRead()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl transition-colors active:scale-95"
          >
            <FiCheck className="w-5 h-5" /> Mark all as read
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-16 text-center text-gray-500 flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <FiBell className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">You're all caught up!</h3>
            <p className="text-sm font-medium text-gray-500 max-w-sm">
                When you get team invitations, hackathon updates, or system alerts, they'll show up here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notif) => (
              <div 
                key={notif.id}
                onClick={() => handleNotifClick(notif)}
                className={`flex gap-4 p-5 sm:p-6 transition-colors cursor-pointer hover:bg-gray-50 ${!notif.read ? 'bg-blue-50/20' : ''}`}
              >
                <div className="shrink-0 mt-1">
                  {!notif.read ? (
                    <div className="w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-50"></div>
                  ) : (
                    <div className="w-3 h-3 rounded-full border-2 border-gray-300"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 mb-1">
                    <h4 className={`text-base truncate ${!notif.read ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>
                      {notif.title}
                    </h4>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0">
                      <FiClock className="w-3 h-3" />
                      {new Date(notif.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <p className={`text-sm leading-relaxed ${!notif.read ? 'font-medium text-gray-700' : 'text-gray-500'}`}>
                    {notif.message}
                  </p>
                  
                  <div className="mt-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider">
                      <FiInfo className="w-3 h-3" />
                      {notif.type.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
