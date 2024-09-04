import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignupSuccess = ({ username }) => {
    let navigate = useNavigate();
    return (
        <Box
            sx={{
                textAlign: 'center',
                padding: '20px',
                border: '1px solid #4CAF50',
                borderRadius: '5px',
                backgroundColor: '#f9f9f9',
                margin: '20px auto',
                width: '300px',
            }}
        >
            <Typography variant="h4">회원 가입 성공!</Typography>
            <Typography variant="body1">{username}님, 환영합니다!</Typography>
            <Typography variant="body1">
                서비스를 이용해 주셔서 감사합니다.
            </Typography>
            <Button
                variant="contained"
                color="success"
                onClick={() => navigate('/auth/login')}
                sx={{
                    marginTop: '15px',
                }}
            >
                로그인 하러 가기
            </Button>
        </Box>
    );
};

export default SignupSuccess;
