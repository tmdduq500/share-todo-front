import axios from '@/lib/axios/axios';
import { EventInput } from '@/lib/types/event';

export const createEvent = async (data: EventInput) => {
    const payload = {
        title: data.title,
        startAtLocal: data.startAt,
        endAtLocal: data.endAt,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        allDay: data.allDay,
        visibility: data.visibility,
        ...(data.description ? { description: data.description } : {}),
        ...(data.location ? { location: data.location } : {}),
    };

    const res = await axios.post('/api/events', payload);
    return res.data.data;
};
