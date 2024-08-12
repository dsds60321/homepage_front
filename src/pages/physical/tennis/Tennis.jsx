import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import useFetch from '@/hooks/useFetch.jsx';
import Loading from '@components/loading/Loading.jsx';
import Pagination from '@components/pagination';
import DataTable from './DataTable';

export default function Tennis() {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const { data, loading, error } = useFetch('/tennis/reservation', 'POST');
    const isSmallScreen = useMediaQuery('(max-width:600px)'); // 화면 크기 체크

    if (loading) return <Loading />;
    if (error)
        return <div style={{ color: 'red' }}>오류 발생: {error.message}</div>;

    const pageCount = Math.ceil(data.data.row.length / itemsPerPage);
    const currentData = data.data.row.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage,
    );

    return (
        <div>
            <DataTable data={currentData} isSmallScreen={isSmallScreen} />
            <Pagination
                pageCount={pageCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isSmallScreen={isSmallScreen}
            />
        </div>
    );
}
