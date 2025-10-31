import {useAuthStore} from "@/lib/store/authStore";
import {useRouter} from "next/navigation";
import React, {useEffect} from "react";

export function AuthGuard({children}: { children: React.ReactNode }) {
    const token = useAuthStore((s) => s.accessToken);
    const router = useRouter();

    useEffect(() => {
        if (!token) router.replace('/login');
    }, [token]);

    return token ? <>{children}</> : null;
}
