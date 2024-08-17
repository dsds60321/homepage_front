import React, { useState } from 'react';
import useFetch from '@/hooks/useFetch.jsx';
import Loading from '@components/loading/Loading.jsx';
import Paging from '@components/paging/index.jsx';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import TennisTable from '@pages/physical/tennis/table/index.jsx';

export default function Tennis() {
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [reservationStatus, setReservationStatus] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const itemsPerPage = 10;
    const { data, loading, error } = useFetch('/tennis/reservation', 'POST');
    const reservations = data?.data || [];

    if (loading) return <Loading />;
    if (error)
        return <div style={{ color: 'red' }}>오류 발생: {error.message}</div>;

    const filteredReservations = reservations.filter((item) => {
        const matchesSearchTerm = Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
        );
        const matchesReservationStatus =
            reservationStatus === '' || item.SVCSTATNM === reservationStatus;
        const matchesPaymentStatus =
            paymentStatus === '' || item.PAYATNM === paymentStatus;

        return (
            matchesSearchTerm &&
            matchesReservationStatus &&
            matchesPaymentStatus
        );
    });

    const pageCount = Math.ceil(filteredReservations.length / itemsPerPage);
    const currentData = filteredReservations.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage,
    );

    const handleSearchTermChange = (term) => {
        setSearchTerm(term);
        setCurrentPage(0);
    };

    return (
        <div>
            <div style={{ display: 'flex', marginBottom: '16px' }}>
                <TextField
                    label="이름 검색"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => handleSearchTermChange(e.target.value)}
                    style={{ marginRight: '16px', flex: 1 }}
                />
                <FormControl style={{ minWidth: 120, marginRight: '16px' }}>
                    <InputLabel>예약 상태</InputLabel>
                    <Select
                        value={reservationStatus}
                        onChange={(e) => setReservationStatus(e.target.value)}
                    >
                        <MenuItem value="">전체</MenuItem>
                        <MenuItem value="접수중">접수중</MenuItem>
                        <MenuItem value="완료">완료</MenuItem>
                    </Select>
                </FormControl>
                <FormControl style={{ minWidth: 120 }}>
                    <InputLabel>결제 상태</InputLabel>
                    <Select
                        value={paymentStatus}
                        onChange={(e) => setPaymentStatus(e.target.value)}
                    >
                        <MenuItem value="">전체</MenuItem>
                        <MenuItem value="무료">무료</MenuItem>
                        <MenuItem value="유료">유료</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <TennisTable data={currentData} />
            <Paging
                pageCount={pageCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}
