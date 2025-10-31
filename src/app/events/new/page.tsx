'use client';

import EventForm from '@/components/events/EventForm';
import {AuthGuard} from "@/components/auth/AuthGuard";

export default function EventNewPage() {
    return (
        <AuthGuard>
            <EventForm />
        </AuthGuard>
    );
}
