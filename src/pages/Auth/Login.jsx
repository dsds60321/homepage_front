// components/Login.jsx
import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';
import { useAuth } from '@hooks/useAuth';

const Login = () => {
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ role: 'USER', ...credentials });
    };

    const handleGuestLogin = () => {
        // 게스트 로그인 처리 로직 (예시)
        login({ role: 'GUEST', username: 'guest', password: '12345' });
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                로그인
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="아이디"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="비밀번호"
                            name="password"
                            type="password"
                            value={credentials.password}
                            onChange={handleChange}
                            variant="outlined"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            로그인
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            onClick={handleGuestLogin}
                        >
                            게스트로 로그인
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="text" color="primary" fullWidth>
                            회원가입
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="text" color="primary" fullWidth>
                            아이디 찾기
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Login;
