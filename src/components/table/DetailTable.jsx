import React, { useState, useEffect } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import TennisModal from '@pages/physical/tennis/modal/TennisModal.jsx';

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        maxWidth: '100%', // 최대 너비를 100%로 설정
        overflowX: 'auto', // 수평 스크롤 활성화
        border: '1px solid #ccc',
    },
    table: {
        width: 'auto', // width를 'auto'로 설정
        minWidth: '100%', // 최소 너비 설정
        tableLayout: 'fixed',
    },
    tableCell: {
        padding: '2px',
        textAlign: 'center',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: '100%',
    },
    tableHead: {
        textAlign: 'center',
        backgroundColor: '#f2f2f2',
    },
    badge: {
        margin: '0 30px',
    },
    modalButton: {
        marginTop: theme.spacing(2),
    },
}));

const DetailTable = ({ data, columns }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // 768px 이하를 모바일로 간주
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // 초기 체크

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleCellClick = (item) => {
        setSelectedItem(item);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedItem(null);
    };

    return (
        <>
            <TableContainer
                component={Paper}
                className={classes.tableContainer}
            >
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow className={classes.tableHead}>
                            {columns.map((column, index) => {
                                // 모바일 뷰에서 열 렌더링 조건 수정
                                const shouldRender =
                                    (isMobile &&
                                        column.isMobileView !== false) ||
                                    (!isMobile && column.isMobileView !== true);
                                return (
                                    shouldRender && (
                                        <TableCell
                                            key={index}
                                            className={classes.tableCell}
                                            style={{
                                                width: column.width || 'auto',
                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    )
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index}>
                                {columns.map((column, colIndex) => {
                                    // 모바일 뷰에서 열 렌더링 조건 수정
                                    const shouldRender =
                                        (isMobile &&
                                            column.isMobileView !== false) ||
                                        (!isMobile &&
                                            column.isMobileView !== true);
                                    return (
                                        shouldRender && (
                                            <TableCell
                                                key={colIndex}
                                                className={classes.tableCell}
                                                onClick={
                                                    column.onClick
                                                        ? () =>
                                                              column.onClick(
                                                                  item,
                                                              )
                                                        : undefined
                                                }
                                            >
                                                {column.render
                                                    ? column.render(
                                                          item,
                                                          handleCellClick,
                                                      )
                                                    : item[column.field]}
                                            </TableCell>
                                        )
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TennisModal
                open={modalOpen}
                onClose={handleCloseModal}
                item={selectedItem}
            />
        </>
    );
};

export default DetailTable;
