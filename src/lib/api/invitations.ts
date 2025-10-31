import {InvitationRequest, InvitationResponse} from '@/lib/types/invitation';
import axiosInstance from "@/lib/axios/axios";

export const createInvitation = async (
    payload: InvitationRequest
): Promise<InvitationResponse> => {
    const res = await axiosInstance.post('/api/invitations', payload);
    return res.data.data;
};

export const acceptInvitation = async (token: string) => {
    const res = await axiosInstance.post('/api/invitations/accept', {token});
    return res.data.data;
};