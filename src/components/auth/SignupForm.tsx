'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useMutation} from '@tanstack/react-query';
import axios from '@/lib/axios/axios';

import {Alert, Box, Button, Paper, TextField, Typography,} from '@mui/material';

interface SignupInput {
    email: string;
    password: string;
    confirmPassword: string;
}

export default function SignupForm() {
    const router = useRouter();
    const [form, setForm] = useState<SignupInput>({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');

    const signupMutation = useMutation({
        mutationFn: (data: { email: string; password: string }) =>
            axios.post('/accounts/signup', data).then((res) => res.data.data),
        onSuccess: () => {
            router.push('/login');
        },
        onError: (err: any) => {
            setError(err.response?.data?.message || '회원가입에 실패했습니다.');
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (form.password !== form.confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (form.password.length < 8) {
            setError('비밀번호는 최소 8자 이상이어야 합니다.');
            return;
        }

        signupMutation.mutate({email: form.email, password: form.password});
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
                회원가입
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
                <TextField
                    label="비밀번호 확인"
                    name="confirmPassword"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={form.confirmPassword}
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
                    disabled={signupMutation.isPending}
                >
                    {signupMutation.isPending ? '가입 중...' : '회원가입'}
                </Button>
            </form>
        </Box>
    );
}
