import { useMutation } from '@tanstack/react-query';
import { createEvent } from '@/lib/api/events';
import { EventInput } from '@/lib/types/event';

export const useCreateEvent = () =>
    useMutation({
        mutationFn: (data: EventInput) => createEvent(data),
    });
