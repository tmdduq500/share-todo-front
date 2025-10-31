'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useMutation} from '@tanstack/react-query';
import axios from '@/lib/axios/axios';
import {useAuthStore} from '@/lib/store/authStore';

interface LoginInput {
    email: string;
    password: string;
}

export default function LoginForm() {
    const router = useRouter();
    const {setTokens} = useAuthStore();

    const [form, setForm] = useState<LoginInput>({email: '', password: ''});
    const [error, setError] = useState('');

    const loginMutation = useMutation({
        mutationFn: (data: LoginInput) =>
            axios.post('/auth/login', data).then((res) => res.data.data),
        onSuccess: ({accessToken, refreshToken}) => {
            setTokens(accessToken, refreshToken);
            router.push('/events');
        },
        onError: (err: any) => {
            setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        loginMutation.mutate(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                name="email"
                type="email"
                placeholder="이메일"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
            />
            <input
                name="password"
                type="password"
                placeholder="비밀번호"
                value={form.password}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                disabled={loginMutation.isPending}
            >
                {loginMutation.isPending ? '로그인 중...' : '로그인'}
            </button>
        </form>
    );
}
