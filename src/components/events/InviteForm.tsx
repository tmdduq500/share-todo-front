'use client';

import {
    Alert,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import React, {useState} from 'react';
import {useCreateInvitation} from "@/lib/hooks/useInvitation";

interface InviteFormProps {
    eventUid: string;
}

export default function InviteForm({eventUid}: InviteFormProps) {
    const [channel, setChannel] = useState<'EMAIL' | 'PHONE'>('EMAIL');
    const [target, setTarget] = useState('');
    const [successToken, setSuccessToken] = useState('');
    const [error, setError] = useState('');

    const createInvitation = useCreateInvitation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessToken('');

        if (!target) {
            setError('이메일 또는 전화번호를 입력해주세요.');
            return;
        }

        createInvitation.mutate(
            {eventUid, channel, target, ttlHours: 168},
            {
                onSuccess: (res) => {
                    setSuccessToken(res.token);
                    setTarget('');
                },
                onError: () => {
                    setError('초대 전송에 실패했습니다.');
                },
            }
        );
    };


    return (
        <Box
            component={Paper}
            elevation={2}
            sx={{mt: 4, p: 3, display: 'flex', flexDirection: 'column', gap: 2}}
        >
            <Typography variant="h6">일정 초대</Typography>

            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <InputLabel>초대 방식</InputLabel>
                    <Select
                        variant={"outlined"}
                        value={channel}
                        onChange={(e) => setChannel(e.target.value as 'EMAIL' | 'PHONE')}
                        label="초대 방식"
                    >
                        <MenuItem value="EMAIL">이메일</MenuItem>
                        <MenuItem value="PHONE">문자 (SMS)</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label={channel === 'EMAIL' ? '이메일 주소' : '전화번호'}
                    fullWidth
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    margin="normal"
                />
                {error && <Alert severity="error">{error}</Alert>}
                {successToken && (
                    <Alert severity="success">
                        초대 전송 완료! 토큰: <code>{successToken}</code>
                    </Alert>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={createInvitation.isPending}
                >
                    {createInvitation.isPending ? '전송 중...' : '초대 전송'}
                </Button>
            </form>
        </Box>
    );
}
