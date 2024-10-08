import React, { useMemo } from 'react';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import DetailTable from '@components/table/DetailTable.jsx';

const TennisTable = ({ data, handleCellClick }) => {
    const columns = useMemo(
        () => [
            {
                label: '결제 상태',
                field: 'PAYATNM',
                width: '10%',
                isMobileView: false,
            },
            {
                label: '예약 상태',
                field: 'SVCSTATNM',
                width: '15%',
                render: (item) => (
                    <Badge
                        style={{ marginRight: '7px' }}
                        badgeContent={item.SVCSTATNM}
                        color={item.SVCSTATNM === '접수중' ? 'info' : 'error'}
                    />
                ),
            },
            {
                label: '이름',
                field: 'SVCNM',
                render: (item) => (
                    <Button onClick={() => handleCellClick(item)}>
                        {item.SVCNM}
                    </Button>
                ),
            },
            {
                label: '장소 이름',
                field: 'PLACENM',
                width: '15%',
            },
            {
                label: '테니스장 사진',
                field: 'IMGURL',
                width: '10%',
                render: (item) => (
                    <img
                        src={item.IMGURL}
                        alt="Tennis Court"
                        style={{
                            width: '100px',
                            height: 'auto',
                            cursor: 'pointer',
                        }}
                        onClick={() => window.open(item.IMGURL, '_blank')}
                    />
                ),
            },
        ],
        [],
    );

    return (
        <>
            <DetailTable columns={columns} data={data} />
        </>
    );
};

export default TennisTable;
