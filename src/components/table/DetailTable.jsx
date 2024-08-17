import React, { useState } from 'react';
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
import Index from '@pages/physical/tennis/modal/index.jsx';

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        maxHeight: '80%',
        overflowY: 'auto',
        border: '1px solid #ccc',
    },
    table: {
        width: '100%',
        tableLayout: 'fixed',
    },
    tableCell: {
        padding: theme.spacing(1),
        textAlign: 'left',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: '150px',
    },
    tableHead: {
        backgroundColor: '#f2f2f2',
    },
    badge: {
        margin: '0 28px',
    },
    modalButton: {
        marginTop: theme.spacing(2),
    },
}));

const DetailTable = ({ data, columns }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const classes = useStyles();

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
                            {columns.map((column, index) => (
                                <TableCell
                                    key={index}
                                    className={classes.tableCell}
                                    style={{ width: column.width || 'auto' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index}>
                                {columns.map((column, colIndex) => (
                                    <TableCell
                                        key={colIndex}
                                        className={classes.tableCell}
                                        onClick={
                                            column.onClick
                                                ? () => column.onClick(item)
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
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Index
                open={modalOpen}
                onClose={handleCloseModal}
                item={selectedItem}
            />
        </>
    );
};

export default DetailTable;
