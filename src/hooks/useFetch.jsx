import { Get, Post } from '@utils/axiosUtil.js';
import { useQuery } from '@tanstack/react-query';

const useFetch = (url, method = 'GET', body = null, config) => {
    const fetchData = async () => {
        if (method === 'POST') {
            const response = await Post(url, body, config);
            return response.data;
        } else {
            const response = await Get(url, config);
            return response.data;
        }
    };

    const { data, error, isLoading } = useQuery({
        queryKey: [url, body], // 쿼리 키를 객체 형식으로 지정
        queryFn: fetchData, // 쿼리 함수 지정
        enabled: !!url, // url이 있을 때만 쿼리 실행
    });

    return { data, error, loading: isLoading };
};

export default useFetch;
