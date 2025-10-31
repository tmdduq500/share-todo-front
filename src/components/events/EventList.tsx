'use client';

import {Alert, Box, Card, CardContent, CircularProgress, Grid, MenuItem, Select, Typography,} from '@mui/material';
import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';
import axios from '@/lib/axios/axios';
import dayjs from 'dayjs';

interface Event {
    uid: string;
    title: string;
    startsAtUtc: string;
    endsAtUtc: string;
    location: string;
    visibility: string;
}

interface EventListResponse {
    content: Event[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export default function EventList() {
    const [size, setSize] = useState(10);

    const {data, isLoading, error} = useQuery<EventListResponse>({
        queryKey: ['events', size],
        queryFn: () =>
            axios
                .get(`/events?size=${size}`)
                .then((res) => res.data.data),
    });

    if (isLoading) {
        return (
            <Box textAlign="center" mt={10}>
                <CircularProgress/>
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">일정 목록을 불러오지 못했습니다.</Alert>;
    }

    return (
        <Box sx={{maxWidth: 800, mx: 'auto', my: 6}}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight={600}>
                    내 일정 목록
                </Typography>
                <Select
                    variant="outlined"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    size="small"
                >
                    {[5, 10, 20, 50].map((s) => (
                        <MenuItem key={s} value={s}>
                            {s}개씩 보기
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            <Grid container spacing={2}>
                {data?.content.map((event) => (
                    <Grid key={event.uid}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{event.title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {dayjs(event.startsAtUtc).format('YYYY-MM-DD HH:mm')} ~{' '}
                                    {dayjs(event.endsAtUtc).format('HH:mm')}
                                </Typography>
                                <Typography variant="body2" mt={0.5}>
                                    장소: {event.location || '없음'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    공개 여부: {event.visibility}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
