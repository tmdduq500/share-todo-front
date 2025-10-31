'use client';

import {Alert, Box, Button, Paper, TextField, Typography,} from '@mui/material';
import {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import axios from '@/lib/axios/axios';
import {AuthGuard} from "@/components/auth/AuthGuard";

export default function PasswordChangePage() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const passwordChangeMutation = useMutation({
        mutationFn: () =>
            axios.post('/api/accounts/password/change', {
                currentPassword,
                newPassword,
            }),
        onSuccess: () => {
            setSuccess(true);
            setError('');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        },
        onError: (err: any) => {
            setSuccess(false);
            setError(err.response?.data?.message || '비밀번호 변경에 실패했습니다.');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(false);
        setError('');
        if (newPassword !== confirmPassword) {
            setError('새 비밀번호가 일치하지 않습니다.');
            return;
        }
        if (newPassword.length < 8) {
            setError('비밀번호는 8자 이상이어야 합니다.');
            return;
        }
        passwordChangeMutation.mutate();
    };

    return (
        <AuthGuard>
            <Box
                component={Paper}
                elevation={3}
                sx={{maxWidth: 500, mx: 'auto', my: 6, p: 4}}
            >
                <Typography variant="h5" gutterBottom>
                    비밀번호 변경
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="현재 비밀번호"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <TextField
                        label="새 비밀번호"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        label="새 비밀번호 확인"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {error && <Alert severity="error" sx={{mt: 1}}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{mt: 1}}>비밀번호가 변경되었습니다.</Alert>}

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{mt: 2}}
                        disabled={passwordChangeMutation.isPending}
                    >
                        {passwordChangeMutation.isPending ? '변경 중...' : '비밀번호 변경'}
                    </Button>
                </form>
            </Box>
        </AuthGuard>
    );
}
