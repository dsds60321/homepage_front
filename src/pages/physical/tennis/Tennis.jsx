import React from 'react';
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
import { useInput } from '@/hooks/useHooks.jsx';
import { usePaging } from '@/context/Paging.jsx'; // Context 사용

export default function Tennis() {
    const { data, loading, error } = useFetch('/tennis/reservation', 'POST');
    const { currentPage, setCurrentPage, calculatePagination } = usePaging(); // Context에서 값 가져오기

    const [searchTerm, setSearchTerm] = useInput('');
    const [reservationStatus, setReservationStatus] = useInput('');
    const [paymentStatus, setPaymentStatus] = useInput('');
    const reservations = data?.data || [];

    if (loading) return <Loading />;
    if (error)
        return <div style={{ color: 'red' }}>오류 발생: {error.message}</div>;

    // 검색에 대한 필터링
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

    // 상태 변경 핸들러
    const handleInputChange = (setter) => (value) => {
        setter(value);
        setCurrentPage(0); // 페이지 초기화
    };

    // 페이징 계산
    const { pageCount, currentData } =
        calculatePagination(filteredReservations);

    return (
        <div>
            <div style={{ display: 'flex', marginBottom: '16px' }}>
                <TextField
                    label="이름 검색"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) =>
                        handleInputChange(setSearchTerm)(e.target.value)
                    }
                    style={{ marginRight: '16px', flex: 1 }}
                />
                <FormControl style={{ minWidth: 120, marginRight: '16px' }}>
                    <InputLabel>예약 상태</InputLabel>
                    <Select
                        value={reservationStatus}
                        onChange={(e) =>
                            handleInputChange(setReservationStatus)(
                                e.target.value,
                            )
                        }
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
                        onChange={(e) =>
                            handleInputChange(setPaymentStatus)(e.target.value)
                        }
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
