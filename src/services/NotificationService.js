import { toast } from 'react-hot-toast';

/**
 * Centralized Notification Service for HackNest
 * Uses react-hot-toast to display standardized UI notifications.
 * Eliminates scattered literal strings across the codebase.
 */
class NotificationService {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Applications
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  notifyApplicationAccepted(teamName) {
    toast.success(
      `Congratulations! Your application to ${teamName || 'the team'} was accepted!`, 
      { id: `app-accepted-${Date.now()}`, duration: 5000 }
    );
  }

  notifyApplicationRejected(teamName) {
    toast.error(
      `Your application to ${teamName || 'the team'} was declined. Don't give up!`,
      { id: `app-rejected-${Date.now()}`, duration: 5000 }
    );
  }

  notifyApplicationSent(teamName) {
    toast.success(
      `Application sent to ${teamName || 'the team'} successfully!`,
      { id: `app-sent-${Date.now()}` }
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Invitations
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  notifyInvitationReceived(teamName, leaderName) {
    toast.success(
      `You received a new team invitation from ${leaderName || 'a leader'} for ${teamName || 'their team'}!`,
      { id: `inv-received-${Date.now()}`, duration: 6000, icon: '🎉' }
    );
  }

  notifyInvitationAccepted(teamName) {
    toast.success(
      `You successfully joined ${teamName || 'the team'}!`,
      { id: `inv-accepted-${Date.now()}` }
    );
  }

  notifyInvitationRejected() {
    toast.success(
      'Invitation declined successfully.',
      { id: `inv-rejected-${Date.now()}` }
    );
  }

  notifyInvitationSent() {
    toast.success(
      'Invitation sent successfully!',
      { id: `inv-sent-${Date.now()}` }
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Generic / Error
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  notifyError(message) {
    toast.error(message || 'Something went wrong. Please try again.', {
      id: `error-${Date.now()}`
    });
  }

  notifySuccess(message) {
    toast.success(message, {
      id: `success-${Date.now()}`
    });
  }
}

export default new NotificationService();
