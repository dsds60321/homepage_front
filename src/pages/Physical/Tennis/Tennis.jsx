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
import TennisTable from '@pages/Physical/Tennis/table/index.jsx';
import { useInput } from '@/hooks/useHooks.jsx';
import { usePaging } from '@/context/Paging.jsx';
import TennisModal from '@pages/Physical/Tennis/modal/TennisModal.jsx';

const ReservationFilter = ({
    searchTerm,
    setSearchTerm,
    reservationStatus,
    setReservationStatus,
    paymentStatus,
    setPaymentStatus,
}) => (
    <div style={{ display: 'flex', marginBottom: '16px' }}>
        <TextField
            label="이름 검색"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
                <MenuItem value="접수종료">접수종료</MenuItem>
                <MenuItem value="예약일시중지">예약일시중지</MenuItem>
                <MenuItem value="완료">완료</MenuItem>
                <MenuItem value="예약마감">예약마감</MenuItem>
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
);

const filterReservations = (
    reservations,
    searchTerm,
    reservationStatus,
    paymentStatus,
) => {
    return reservations.filter((item) => {
        const matchesSearchTerm = Object.values(item).some(
            (value) =>
                value != null &&
                value
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()),
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
};

export default function Tennis() {
    const [selectedReservation, setSelectedReservation] = useState(null);
    const { data, loading, error } = useFetch('/tennis/reservation', 'POST');
    const { currentPage, setCurrentPage, calculatePagination } = usePaging();
    const [searchTerm, setSearchTerm] = useInput('');
    const [reservationStatus, setReservationStatus] = useInput('');
    const [paymentStatus, setPaymentStatus] = useInput('');
    const reservations = data?.result || [];

    if (loading) return <Loading />;
    if (error)
        return <div style={{ color: 'red' }}>오류 발생: {error.message}</div>;

    const filteredReservations = filterReservations(
        reservations,
        searchTerm,
        reservationStatus,
        paymentStatus,
    );
    const { pageCount, currentData } =
        calculatePagination(filteredReservations);

    const handleCellClick = (item) => {
        setSelectedReservation(item);
    };

    return (
        <div>
            <ReservationFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                reservationStatus={reservationStatus}
                setReservationStatus={setReservationStatus}
                paymentStatus={paymentStatus}
                setPaymentStatus={setPaymentStatus}
            />
            <TennisTable data={currentData} handleCellClick={handleCellClick} />
            <Paging
                pageCount={pageCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            {selectedReservation && (
                <TennisModal
                    open={!!selectedReservation}
                    onClose={() => setSelectedReservation(null)}
                    reservation={selectedReservation}
                />
            )}
        </div>
    );
}
