import React from 'react';
import DetailModal from '@components/modal/DetailModal.jsx';
import useFetch from '@/hooks/useFetch.jsx';
import Loading from '@components/loading/Loading.jsx';

// Helper function to extract available dates
const getAvailableDates = (data) => {
    if (!data || !Array.isArray(data)) return [];

    // Flatten the array to find available dates
    return data
        .filter((dateObj) => Object.values(dateObj)[0]) // Filter only the objects with true values
        .map((dateObj) => Object.keys(dateObj)[0]); // Extract date strin
};

const TennisModal = ({ open, onClose, reservation }) => {
    if (!reservation) {
        return null;
    }

    const { data, loading, error } = useFetch('/tennis/booking', 'POST', {
        url: reservation.SVCURL,
    });

    if (loading) return <Loading />;
    if (error)
        return <div style={{ color: 'red' }}>오류 발생: {error.message}</div>;

    // Extract available dates
    const availableDates = getAvailableDates(data.data);

    // Convert available dates into a suitable format for the calendar
    const formattedDates = availableDates.map(
        (date) => new Date(date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')),
    );

    const columns = [
        {
            field: 'label',
            headerName: '속성',
            render: (row) => <strong>{row.label}</strong>,
        },
        { field: 'value', headerName: '값', render: (row) => row.value },
    ];

    const rows = [
        { label: '서비스 상태', value: reservation.SVCSTATNM },
        { label: '서비스 이름', value: reservation.SVCNM },
        { label: '결제 상태', value: reservation.PAYATNM },
        { label: '장소 이름', value: reservation.PLACENM },
        { label: '사용 대상 정보', value: reservation.USETGTINFO },
        {
            label: '서비스 URL',
            value: (
                <a
                    href={reservation.SVCURL}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {reservation.SVCURL}
                </a>
            ),
        },
        { label: '접수 시작일', value: reservation.RCPTBGNDT },
        { label: '접수 종료일', value: reservation.RCPTENDDT },
        {
            label: '영업시간',
            value: `${reservation.V_MIN} ~ ${reservation.V_MAX}`,
        },
        { label: '지역 이름', value: reservation.AREANM },
        {
            label: '이미지 URL',
            value: (
                <a
                    href={reservation.IMGURL}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {reservation.IMGURL}
                </a>
            ),
        },
        {
            label: '예약 가능 날짜',
            value: availableDates.join(', '), // Add the dates directly here
            type: 'date', // Indicate that this field should render a calendar
        },
    ];

    return (
        <DetailModal
            open={open}
            onClose={onClose}
            title="상세 정보"
            columns={columns}
            rows={rows} // Pass the rows with the date field
        />
    );
};

export default TennisModal;
