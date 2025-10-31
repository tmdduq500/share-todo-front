import {useMutation, useQuery} from '@tanstack/react-query';
import {createEvent, fetchEventList} from '@/lib/api/events';
import {EventInput, EventListResponse} from '@/lib/types/event';

export const useCreateEvent = () =>
    useMutation({
        mutationFn: (data: EventInput) => createEvent(data),
    });

export const useEventList = (size: number) =>
    useQuery<EventListResponse>({
        queryKey: ['events', size],
        queryFn: () => fetchEventList(size),
    });