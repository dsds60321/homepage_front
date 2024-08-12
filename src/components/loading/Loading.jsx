import React from 'react';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/material';
import './styles.css';

const Loading = () => {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // 반투명 검은색 배경
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999, // 다른 요소 위에 표시
                animation: 'fadeIn 0.3s', // 페이드 인 애니메이션
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default Loading;
