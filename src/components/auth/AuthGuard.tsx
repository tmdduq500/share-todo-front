'use client';

import {useAuthStore} from '@/lib/store/authStore';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';

export default function AuthGuard({children}: { children: React.ReactNode }) {
    const accessToken = useAuthStore((s) => s.accessToken);
    const router = useRouter();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!accessToken) {
            router.push('/login');
        } else {
            setReady(true);
        }
    }, [accessToken, router]);

    if (!ready) return null;
    return <>{children}</>;
}
