import React, { useMemo } from 'react';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import { DownloadOutlined } from '@ant-design/icons';
import DetailTable from '@components/table/DetailTable.jsx';

const TennisTable = ({ data }) => {
    const columns = useMemo(
        () => [
            { label: '결제 상태', field: 'PAYATNM', width: '10%' },
            {
                label: '예약 상태',
                field: 'SVCSTATNM',
                width: '15%',
                render: (item) => (
                    <Badge
                        style={{ marginLeft: '20px' }}
                        badgeContent={item.SVCSTATNM}
                        color={item.SVCSTATNM === '접수중' ? 'info' : 'error'}
                    />
                ),
            },
            {
                label: '이름',
                field: 'SVCNM',
                render: (item, handleCellClick) => (
                    <Button onClick={() => handleCellClick(item)}>
                        {item.SVCNM}
                    </Button>
                ),
            },
            { label: '장소 이름', field: 'PLACENM', width: '15%' },
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
