export type InvitationChannel = 'EMAIL' | 'PHONE';

export interface InvitationRequest {
    eventUid: string;
    channel: InvitationChannel;
    target: string;
    ttlHours?: number;
}

export interface InvitationResponse {
    invitationUid: string;
    token: string;
}
