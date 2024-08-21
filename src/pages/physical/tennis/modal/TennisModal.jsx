// ItemDetailModal.js
import React from 'react';
import DetailModal from '@components/modal/DetailModal.jsx';

const TennisModal = ({ open, onClose, item }) => {
    if (!item) {
        return undefined;
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
        { label: '서비스 상태', value: item.SVCSTATNM },
        { label: '서비스 이름', value: item.SVCNM },
        { label: '결제 상태', value: item.PAYATNM },
        { label: '장소 이름', value: item.PLACENM },
        { label: '사용 대상 정보', value: item.USETGTINFO },
        {
            label: '서비스 URL',
            value: (
                <a href={item.SVCURL} target="_blank" rel="noopener noreferrer">
                    {item.SVCURL}
                </a>
            ),
        },
        { label: '접수 시작일', value: item.RCPTBGNDT },
        { label: '접수 종료일', value: item.RCPTENDDT },
        { label: '영업시간', value: `${item.V_MIN} ~ ${item.V_MAX}` },
        { label: '지역 이름', value: item.AREANM },
        {
            label: '이미지 URL',
            value: (
                <a href={item.IMGURL} target="_blank" rel="noopener noreferrer">
                    {item.IMGURL}
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
