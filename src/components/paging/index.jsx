import React, { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Button, Grid, useMediaQuery } from '@mui/material';
import './pagination.css';

const Paging = ({ pageCount, currentPage, setCurrentPage }) => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const handlePageClick = (event) => {
        setCurrentPage(event.selected); // 현재 페이지 업데이트
    };

    if (isSmallScreen) {
        const startPage = Math.max(0, currentPage - 2);
        const endPage = Math.min(pageCount - 1, startPage + 4);

        return (
            <Grid
                container
                justifyContent="center"
                style={{ marginTop: '16px' }}
            >
                {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
                    const pageIndex = startPage + index;
                    return (
                        <Button
                            key={pageIndex}
                            variant={
                                currentPage === pageIndex
                                    ? 'contained'
                                    : 'outlined'
                            }
                            onClick={() => setCurrentPage(pageIndex)} // 페이지 클릭 시 현재 페이지 업데이트
                            style={{ margin: '0 2px' }}
                        >
                            {pageIndex + 1}
                        </Button>
                    );
                })}
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
            onPageChange={handlePageClick} // 클릭 이벤트 핸들러
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'} // 활성 페이지 클래스를 정의
            forcePage={currentPage} // 현재 페이지를 반영
        />
    );
};

export default Paging;
