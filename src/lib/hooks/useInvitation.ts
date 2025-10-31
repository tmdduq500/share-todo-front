import { useMutation } from '@tanstack/react-query';
import { createInvitation } from '@/lib/api/invitations';
import { InvitationRequest, InvitationResponse } from '@/lib/types/invitation';

export const useCreateInvitation = () =>
    useMutation<InvitationResponse, any, InvitationRequest>({
        mutationFn: (data) => createInvitation(data),
    });
