import { Get, Post } from '@utils/axiosUtil.js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const fetchUser = async () => {
    const { data } = await Get('/auth/session');
    if (!data) {
        throw new Error('User not found');
    }

    return data;
};

const loginUser = async (credentials) => {
    const { data } = await Post('/auth/sign-in', credentials);
    return data;
};

export const useAuth = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const userQuery = useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
        onError: () => {
            navigate('/auth/login');
        },
    });

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            // 로그인 성공 시 사용자 정보를 캐시할 수 있습니다.
            queryClient.setQueryData(['user'], data);
        },
    });

    const isAuthenticated = !!userQuery.data; // 데이터가 존재한다면 인증으로 간주

    return {
        user: userQuery.data,
        isLoading: userQuery.isLoading,
        isError: userQuery.isError,
        isAuthenticated,
        login: loginMutation,
    };
};
