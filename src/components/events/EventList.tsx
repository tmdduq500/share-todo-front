'use client';

import {Box, Button, CircularProgress, MenuItem, Paper, Select, Typography,} from '@mui/material';
import {useEventList} from '@/lib/hooks/useEvents';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

export default function EventList() {
    const router = useRouter();
    const [size, setSize] = useState(10);

    const {data, isLoading, error} = useEventList(size);

    return (
        <Box
            component={Paper}
            elevation={3}
            sx={{maxWidth: 800, mx: 'auto', my: 6, p: 4}}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight={600}>
                    내 일정 목록
                </Typography>
                <Box display="flex" gap={1}>
                    <Select
                        variant={"outlined"}
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))}
                        size="small"
                    >
                        {[5, 10, 20].map((s) => (
                            <MenuItem key={s} value={s}>
                                {s}개씩 보기
                            </MenuItem>
                        ))}
                    </Select>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => router.push('/events/new')}
                    >
                        일정 등록
                    </Button>
                </Box>
            </Box>

            {isLoading && <CircularProgress/>}
            {error && <Typography color="error">불러오기 실패</Typography>}
            {data && (
                <Box display="flex" flexDirection="column" gap={2}>
                    {data.content.map((item) => (
                        <Box key={item.uid} p={2} border="1px solid #ccc" borderRadius={2}>
                            <Typography fontWeight={600}>{item.title}</Typography>
                            <Typography variant="body2">
                                {item.startsAtUtc} ~ {item.endsAtUtc}
                            </Typography>
                            <Typography variant="body2">{item.location}</Typography>
                            <Typography variant="caption">
                                {item.visibility === 'PUBLIC' ? '공개' : '비공개'} /{' '}
                                {item.allDay ? '종일' : '시간 지정'}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
}
