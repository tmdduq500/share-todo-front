import axios from '@/lib/axios/axios';
import {EventInput, EventListResponse} from '@/lib/types/event';
import {ApiResponse} from "@/lib/types/response";

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

export const fetchEventList = async (size: number): Promise<EventListResponse> => {
    const res = await axios.get<ApiResponse<EventListResponse>>(`/api/events?size=${size}`);
    return res.data.data;
};