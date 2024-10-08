import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
} from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { styled } from '@mui/material/styles';
import { ko } from 'date-fns/locale';

// Styled Components
const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        [theme.breakpoints.down('sm')]: {
            width: '90vw',
            maxWidth: '500px',
        },
        [theme.breakpoints.up('md')]: {
            width: '70vw',
            maxWidth: '800px',
        },
    },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    fontSize: '1.4rem',
    fontWeight: 700,
    color: '#333',
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
    },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: '20px',
    color: '#555',
    [theme.breakpoints.down('sm')]: {
        padding: '16px',
    },
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    padding: '10px 20px',
    borderTop: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('sm')]: {
        padding: '8px 16px',
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    color: '#fff',
    backgroundColor: '#007bff',
    '&:hover': {
        backgroundColor: '#0056b3',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.9rem',
    },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    marginTop: theme.spacing(2),
    backgroundColor: '#f1f1f1',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.down('sm')]: {
        maxHeight: '400px',
        overflowY: 'auto',
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: '16px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    fontSize: '0.8rem',
    '&:first-of-type': {
        fontWeight: 'bold',
        backgroundColor: '#fff',
        color: '#333',
    },
    '&:last-of-type': {
        color: '#333',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.6rem',
        padding: '12px',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: '#fafafa',
    },
    '&:nth-of-type(odd)': {
        backgroundColor: '#ffffff',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.6rem',
    },
}));

const DetailModal = ({ open, onClose, title, columns, rows }) => {
    const dateRow = rows.find((row) => row.type === 'date');
    const availableDates = dateRow ? dateRow.value.split(', ') : [];

    return (
        <StyledDialog open={open} onClose={onClose}>
            <StyledDialogTitle>{title}</StyledDialogTitle>
            <StyledDialogContent>
                <StyledTableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {rows.map((row, index) => (
                                <StyledTableRow key={index}>
                                    {columns.map((column, colIndex) => (
                                        <StyledTableCell key={colIndex}>
                                            {column.render
                                                ? column.render(row)
                                                : row[column.field]}
                                        </StyledTableCell>
                                    ))}
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </StyledTableContainer>

                {availableDates.length > 0 && (
                    <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        locale={ko}
                    >
                        <StaticDatePicker
                            displayStaticWrapperAs={'desktop'}
                            openTo="day"
                            shouldDisableDate={(date) => {
                                // 시간대 오프셋을 적용하여 한국 시간으로 변환
                                let offset = date.getTimezoneOffset() * 60000; // ms 단위로 변환
                                let dateOffset = new Date(
                                    date.getTime() - offset,
                                );

                                // 한국 시간으로 날짜를 'YYYYMMDD' 형식으로 변환
                                const formattedDate = dateOffset
                                    .toISOString()
                                    .split('T')[0]
                                    .replace(/-/g, '');

                                // availableDates에 포함되어 있는지 체크
                                return !availableDates.includes(formattedDate);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                )}
            </StyledDialogContent>
            <StyledDialogActions>
                <StyledButton onClick={onClose}>닫기</StyledButton>
            </StyledDialogActions>
        </StyledDialog>
    );
};

export default DetailModal;
