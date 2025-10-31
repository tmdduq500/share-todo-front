'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useAuthStore} from '@/lib/store/authStore';

import {Alert, Box, Button, Paper, TextField, Typography,} from '@mui/material';
import {useLogin} from "@/lib/hooks/useAuth";

interface LoginInput {
    email: string;
    password: string;
}

export default function LoginForm() {
    const router = useRouter();
    const {setTokens} = useAuthStore();

    const [form, setForm] = useState<LoginInput>({email: '', password: ''});
    const [error, setError] = useState('');

    const {mutate, isPending} = useLogin();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        mutate(form, {
            onSuccess: ({accessToken, refreshToken}) => {
                setTokens(accessToken, refreshToken);
                router.push('/events');
            },
            onError: () => {
                setError('이메일 또는 비밀번호가 올바르지 않습니다.');
            },
        });
    };

    return (
        <Box
            component={Paper}
            elevation={3}
            sx={{
                maxWidth: 400,
                mx: 'auto',
                my: 8,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Typography variant="h5" fontWeight={600}>
                로그인
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="이메일"
                    name="email"
                    fullWidth
                    margin="normal"
                    value={form.email}
                    onChange={handleChange}
                />
                <TextField
                    label="비밀번호"
                    name="password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={form.password}
                    onChange={handleChange}
                />
                {error && (
                    <Alert severity="error" sx={{mt: 1}}>
                        {error}
                    </Alert>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{mt: 2}}
                    disabled={isPending}
                >
                    {isPending ? '로그인 중...' : '로그인'}
                </Button>
            </form>
            <Button
                variant="text"
                fullWidth
                sx={{mt: 1}}
                onClick={() => router.push('/signup')}
            >
                아직 회원이 아니신가요? 회원가입
            </Button>
        </Box>
    );
}
