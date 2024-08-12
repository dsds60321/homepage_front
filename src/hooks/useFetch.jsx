// useFetch.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Post } from '@utils/axiosUtil.js';

const useFetch = (url, method = 'GET', body = null, config) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                let response;
                if (method === 'POST') {
                    response = await Post(url, body, config);
                } else {
                    response = await axios.get(url, config);
                }
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (url) {
            fetchData();
        }
    }, [url, method, body]);

    return { data, loading, error };
};

export default useFetch;
