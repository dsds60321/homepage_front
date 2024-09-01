import { Post } from '@utils/axiosUtil.js';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

// 액세스 토큰 갱신 함수
const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        throw new Error('리프레시 토큰이 없습니다');
    }

    const { data } = await Post('/auth/refresh-token', null, {
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    });

    localStorage.setItem('accessToken', data.result.accessToken);
    return data.result.accessToken;
};

// 로그인 함수
const loginUser = async (credentials) => {
    const { data } = await Post('/auth/sign-in', credentials);
    return data.result;
};

// 사용자 데이터 가져오기 함수
const fetchUserData = async (accessToken) => {
    const { data } = await Post('/auth/user', null, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return data.result;
};

export const useAuth = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // 로그아웃
    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        setIsAuthenticated(false);
        navigate('/auth/login'); // 로그아웃 후 로그인 페이지로 이동
    };

    useEffect(() => {
        const checkAuth = async () => {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');

            if (accessToken) {
                try {
                    // 사용자 데이터 가져오기
                    try {
                        const userData = await fetchUserData(accessToken);
                        setUser(userData);
                        setIsAuthenticated(true);
                    } catch (error) {
                        // 액세스 토큰 만료 시 리프레시 토큰으로 새로운 액세스 토큰을 시도
                        if (error.response?.status === 401 && refreshToken) {
                            try {
                                const newAccessToken =
                                    await refreshAccessToken();
                                const userData =
                                    await fetchUserData(newAccessToken);
                                setUser(userData);
                                setIsAuthenticated(true);
                            } catch (refreshError) {
                                setIsAuthenticated(false);
                                localStorage.removeItem('accessToken');
                                localStorage.removeItem('refreshToken');
                                navigate('/auth/login');
                                return;
                            }
                        } else {
                            setIsAuthenticated(false);
                            localStorage.removeItem('accessToken');
                            localStorage.removeItem('refreshToken');
                            navigate('/auth/login');
                            return;
                        }
                    }
                } catch (error) {
                    setIsAuthenticated(false);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    navigate('/auth/login');
                }
            } else {
                setIsAuthenticated(false);
                navigate('/auth/login');
            }
            setIsLoading(false);
        };

        checkAuth();
    }, [navigate]);

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            // 저장
            localStorage.setItem('tokenType', data.tokenType);
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            setUser(data); // 로그인 후 사용자 정보 업데이트
            setIsAuthenticated(true);
            navigate('/');
        },
        onError: () => {
            navigate('/error');
        },
    });

    return {
        user,
        isLoading,
        isAuthenticated,
        login: loginMutation.mutate,
        logout,
    };
};
