import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
            }}
        >
            <Typography
                variant="h1"
                component="h1"
                sx={{ fontSize: '5rem', fontWeight: 'bold' }}
            >
                404
            </Typography>
            <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
                페이지를 찾을 수 없습니다.
            </Typography>
            <Button variant="contained" onClick={handleGoHome}>
                홈으로 가기
            </Button>
        </Box>
    );
};

export default ErrorPage;
