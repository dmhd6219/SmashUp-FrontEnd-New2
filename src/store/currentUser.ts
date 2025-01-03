import { create } from 'zustand';
import { NotificationType } from '@/types/api/notifications.ts';

interface CurrentUserState {
    notifications: null | NotificationType[];
    updateNotifications: (newNotifications: NotificationType[]) => void;
}

export const useCurrentUserStore = create<CurrentUserState>((set) => ({
    notifications: null,
    updateNotifications: (newNotifications: NotificationType[]) =>
        set(() => ({ notifications: newNotifications }))
}));
