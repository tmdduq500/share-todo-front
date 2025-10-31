'use client';

import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {Alert, Box, Button, CircularProgress, Paper, Typography,} from '@mui/material';
import {useAcceptInvitation} from '@/lib/hooks/useInvitation';

export default function InviteAcceptPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [eventUid, setEventUid] = useState<string | null>(null);
    const [error, setError] = useState('');
    const {mutate, isPending} = useAcceptInvitation();

    useEffect(() => {
        if (!token) return;

        mutate(token, {
            onSuccess: (data) => {
                setEventUid(data.eventUid);
            },
            onError: (err: any) => {
                setError(err.response?.data?.message || '초대 수락에 실패했습니다.');
            },
        });
    }, [token]);

    if (!token) {
        return <Alert severity="error">초대 토큰이 누락되었습니다.</Alert>;
    }

    return (
        <Box
            component={Paper}
            elevation={3}
            sx={{maxWidth: 500, mx: 'auto', my: 6, p: 4, textAlign: 'center'}}
        >
            <Typography variant="h5" gutterBottom>
                일정 초대 수락
            </Typography>

            {isPending && <CircularProgress/>}

            {error && <Alert severity="error">{error}</Alert>}

            {eventUid && (
                <>
                    <Alert severity="success" sx={{mb: 2}}>
                        초대를 수락했습니다!
                    </Alert>
                    <Button
                        variant="outlined"
                        color="primary"
                        href={`/ics/${token}.ics`}
                    >
                        캘린더에 추가 (.ics)
                    </Button>
                </>
            )}
        </Box>
    );
}
