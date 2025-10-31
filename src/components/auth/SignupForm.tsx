'use client';

import {Alert, Box, Button, Paper, TextField, Typography,} from '@mui/material';
import {useRouter} from 'next/navigation';
import React, {useState} from 'react';
import {useSignup} from '@/lib/hooks/useAuth';

export default function SignupForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const signupMutation = useSignup();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }
        signupMutation.mutate(
            {email, password},
            {
                onSuccess: () => {
                    router.push('/login');
                },
                onError: (err: any) => {
                    setError(err.response?.data?.message || '회원가입에 실패했습니다.');
                },
            }
        );
    };

    return (
        <Box
            component={Paper}
            elevation={3}
            sx={{maxWidth: 400, mx: 'auto', my: 8, p: 4}}
        >
            <Typography variant="h5" gutterBottom>
                회원가입
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="이메일"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="비밀번호"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    label="비밀번호 확인"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && (
                    <Alert severity="error" sx={{mt: 2}}>
                        {error}
                    </Alert>
                )}
                <Button
                    type="submit"
                    variant="contained"
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
