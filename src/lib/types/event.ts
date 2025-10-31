import {PageResponse} from "@/lib/types/response";

export type Visibility = 'PRIVATE' | 'PUBLIC';

export interface EventInput {
    title: string;
    description?: string;
    startAt: string;
    endAt: string;
    location?: string;
    allDay: boolean;
    visibility: Visibility;
}

export interface EventListItem {
    uid: string;
    title: string;
    startsAtUtc: string;
    endsAtUtc: string;
    location: string;
    allDay: boolean;
    visibility: 'PRIVATE' | 'PUBLIC';
}
export type EventListResponse = PageResponse<EventListItem>;
