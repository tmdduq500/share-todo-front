'use client';

import { Box, Button, Paper, Typography } from '@mui/material';

export default function Home() {
    return (
        <Box
            component={Paper}
            elevation={3}
            sx={{
                maxWidth: 600,
                mx: 'auto',
                my: 10,
                p: 6,
                textAlign: 'center',
                borderRadius: 2,
            }}
        >
            <Typography variant="h3" fontWeight={700} gutterBottom>
                ShareTodo
            </Typography>
            <Typography variant="body1" gutterBottom>
                간단하게 일정을 만들고, 초대하고, 공유해보세요.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                size="large"
                href="/login"
                sx={{ mt: 4 }}
            >
                로그인하러 가기
            </Button>
        </Box>
    );
}
