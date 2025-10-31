'use client';

import {
    Alert,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useMutation} from '@tanstack/react-query';
import axios from '@/lib/axios/axios';
import InviteForm from "@/components/events/InviteForm";

interface EventInput {
    title: string;
    description: string;
    startAt: string;
    endAt: string;
    location: string;
    allDay: boolean;
    visibility: 'PRIVATE' | 'PUBLIC';
}

export default function EventForm() {
    const router = useRouter();
    const [form, setForm] = useState<EventInput>({
        title: '',
        description: '',
        startAt: '',
        endAt: '',
        location: '',
        allDay: false,
        visibility: 'PRIVATE',
    });
    const [error, setError] = useState('');
    const [createdUid, setCreatedUid] = useState<string | null>(null);

    const createMutation = useMutation({
        mutationFn: (data: EventInput) => {
            const payload = {
                title: data.title,
                startAtLocal: data.startAt,
                endAtLocal: data.endAt,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                allDay: data.allDay,
                visibility: data.visibility,
                ...(data.description ? { description: data.description } : {}),
                ...(data.location ? { location: data.location } : {}),
            };

            return axios.post('/api/events', payload).then((res) => res.data.data);
        },
        onSuccess: (data) => {
            setCreatedUid(data.uid);
        },
        onError: (err: any) => {
            setError(err.response?.data?.message || '일정 등록에 실패했습니다.');
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    };

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.checked});
    };

    const handleSelect = (e: any) => {
        setForm({...form, visibility: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!form.title || !form.startAt || !form.endAt) {
            setError('제목, 시작/종료 시간을 입력해주세요.');
            return;
        }
        createMutation.mutate(form);
    };

    return (
        <Box
            component={Paper}
            elevation={3}
            sx={{
                maxWidth: 600,
                mx: 'auto',
                my: 6,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Typography variant="h5" fontWeight={600}>
                일정 등록
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    label="제목"
                    name="title"
                    fullWidth
                    margin="normal"
                    value={form.title}
                    onChange={handleChange}
                />
                <TextField
                    label="설명"
                    name="description"
                    fullWidth
                    multiline
                    rows={3}
                    margin="normal"
                    value={form.description}
                    onChange={handleChange}
                />
                <TextField
                    label="시작 시간"
                    name="startAt"
                    type="datetime-local"
                    fullWidth
                    margin="normal"
                    value={form.startAt}
                    onChange={handleChange}
                    InputLabelProps={{shrink: true}}
                />
                <TextField
                    label="종료 시간"
                    name="endAt"
                    type="datetime-local"
                    fullWidth
                    margin="normal"
                    value={form.endAt}
                    onChange={handleChange}
                    InputLabelProps={{shrink: true}}
                />
                <TextField
                    label="장소"
                    name="location"
                    fullWidth
                    margin="normal"
                    value={form.location}
                    onChange={handleChange}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>공개 여부</InputLabel>
                    <Select value={form.visibility} onChange={handleSelect} label="공개 여부" variant={"outlined"}>
                        <MenuItem value="PRIVATE">비공개</MenuItem>
                        <MenuItem value="PUBLIC">공개</MenuItem>
                    </Select>
                </FormControl>
                <FormControlLabel
                    control={
                        <Checkbox
                            name="allDay"
                            checked={form.allDay}
                            onChange={handleCheckbox}
                        />
                    }
                    label="종일"
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
                    disabled={createMutation.isPending}
                >
                    {createMutation.isPending ? '등록 중...' : '일정 등록'}
                </Button>
            </form>
            {createdUid && <InviteForm eventUid={createdUid} />}
        </Box>
    );
}
