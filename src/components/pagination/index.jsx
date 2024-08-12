// Index.js
import React from 'react';
import ReactPaginate from 'react-paginate';
import { Button, Grid } from '@mui/material';
import './pagination.css';

const Index = ({ pageCount, currentPage, setCurrentPage, isSmallScreen }) => {
    const handlePageClick = (event) => setCurrentPage(event.selected);

    if (isSmallScreen) {
        const startPage = Math.max(0, currentPage - 2);
        const endPage = Math.min(pageCount - 1, startPage + 4);
        return (
            <Grid
                container
                justifyContent="center"
                style={{ marginTop: '16px' }}
            >
                {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                    <Button
                        key={startPage + index}
                        variant={
                            currentPage === startPage + index
                                ? 'contained'
                                : 'outlined'
                        }
                        onClick={() => setCurrentPage(startPage + index)}
                        style={{ margin: '0 2px' }}
                    >
                        {startPage + index + 1}
                    </Button>
                ))}
            </Grid>
        );
    }

    return (
        <ReactPaginate
            previousLabel={'이전'}
            nextLabel={'다음'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
        />
    );
};

export default Index;
