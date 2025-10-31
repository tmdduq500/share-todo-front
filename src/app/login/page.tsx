'use client';

import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6">로그인</h1>
                <LoginForm/>
            </div>
        </main>
    );
}
