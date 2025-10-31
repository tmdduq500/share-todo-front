import axios from '@/lib/axios/axios';
import { InvitationRequest, InvitationResponse } from '@/lib/types/invitation';

export const createInvitation = async (
    payload: InvitationRequest
): Promise<InvitationResponse> => {
    const res = await axios.post('/api/invitations', payload);
    return res.data.data;
};
