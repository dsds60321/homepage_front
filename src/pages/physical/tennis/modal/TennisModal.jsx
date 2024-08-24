// ItemDetailModal.js
import React from 'react';
import DetailModal from '@components/modal/DetailModal.jsx';
import useFetch from '@/hooks/useFetch.jsx';

const TennisModal = ({ open, onClose, reservation }) => {
    // item을 reservation으로 변경
    if (!reservation) {
        return null;
    }

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
    ];

    return (
        <DetailModal
            open={open}
            onClose={onClose}
            title="상세 정보"
            columns={columns}
            rows={rows}
        />
    );
};
export default TennisModal;
