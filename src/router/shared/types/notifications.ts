export interface NotificationType {
    id: number;
    imageUrl: string | null;
    meta: {
        type: string;
    };
}

export interface ConfirmCoAuthorshipNotificationType extends NotificationType {
    meta: {
        type: 'CONFIRM_CO_AUTHORSHIP';
        mashupId: number;
    };
}

export interface MashupStatusNotificationType extends NotificationType {
    meta: {
        type: 'MASHUP_STATUS';
        mashupName: string;
        published: boolean;
        reason: string;
    };
}

export interface UnpublishedMashupsNotificationType extends NotificationType {
    meta: {
        type: 'UNPUBLISHED_MASHUPS_FROM_VK';
        count: number;
    };
}

export interface GetNotificationsResponse {
    status: string;
    response: NotificationType[];
}
