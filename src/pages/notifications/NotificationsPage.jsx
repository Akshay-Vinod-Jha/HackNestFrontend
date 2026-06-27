import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiCheck, FiClock, FiInfo } from 'react-icons/fi';
import useNotificationStore from '../../store/notificationStore';
import { fadeUp, staggerContainer, staggerItem } from '../../utils/animations';

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
      <motion.div
        {...fadeUp}
        className="clay-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--clay-primary-light)', color: 'var(--clay-primary)' }}>
            <FiBell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--clay-text-primary)' }}>Notifications</h1>
            <p className="text-sm font-medium" style={{ color: 'var(--clay-text-muted)' }}>
              You have <span className="font-bold" style={{ color: 'var(--clay-primary)' }}>{unreadCount}</span> unread notifications
            </p>
          </div>
        </div>
        
        {unreadCount > 0 && (
          <button 
            onClick={() => markAllAsRead()}
            className="clay-button clay-button-secondary flex items-center justify-center gap-2 px-5 py-2.5"
          >
            <FiCheck className="w-5 h-5" /> Mark all as read
          </button>
        )}
      </motion.div>

      <div className="clay-card overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2" style={{ borderColor: 'var(--clay-primary)' }}></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ background: 'var(--clay-surface-2)' }}>
                <FiBell className="w-10 h-10" style={{ color: 'var(--clay-text-muted)' }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--clay-text-primary)' }}>You're all caught up!</h3>
            <p className="text-sm font-medium max-w-sm" style={{ color: 'var(--clay-text-muted)' }}>
                When you get team invitations, hackathon updates, or system alerts, they'll show up here.
            </p>
          </div>
        ) : (
          <motion.div
            className="divide-y"
            style={{ borderColor: 'var(--clay-border-light)' }}
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {notifications.map((notif) => (
              <motion.div 
                key={notif.id}
                variants={staggerItem}
                onClick={() => handleNotifClick(notif)}
                className="flex gap-4 p-5 sm:p-6 transition-colors cursor-pointer"
                style={{
                  background: !notif.read ? 'color-mix(in srgb, var(--clay-primary) 5%, transparent)' : 'transparent',
                }}
                whileHover={{ background: 'var(--clay-surface-2)' }}
              >
                <div className="shrink-0 mt-1">
                  {!notif.read ? (
                    <div className="w-3 h-3 rounded-full ring-4" style={{ background: 'var(--clay-primary)', ringColor: 'var(--clay-primary-light)' }}></div>
                  ) : (
                    <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: 'var(--clay-border)' }}></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 mb-1">
                    <h4 className="text-base truncate" style={{ fontWeight: !notif.read ? 700 : 600, color: !notif.read ? 'var(--clay-text-primary)' : 'var(--clay-text-secondary)' }}>
                      {notif.title}
                    </h4>
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider shrink-0" style={{ color: 'var(--clay-text-muted)' }}>
                      <FiClock className="w-3 h-3" />
                      {new Date(notif.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <p className="text-sm leading-relaxed" style={{ fontWeight: !notif.read ? 500 : 400, color: !notif.read ? 'var(--clay-text-secondary)' : 'var(--clay-text-muted)' }}>
                    {notif.message}
                  </p>
                  
                  <div className="mt-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider" style={{ background: 'var(--clay-surface-2)', color: 'var(--clay-text-muted)' }}>
                      <FiInfo className="w-3 h-3" />
                      {notif.type.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
