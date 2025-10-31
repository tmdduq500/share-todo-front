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
