import React from 'react';
import styled from '@emotion/styled';

const PaginationContainer = styled.div`
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin-right: 5px;
  padding: 5px 10px;
  background-color: ${props => props.active ? '#0066cc' : '#ffffff'};
  color: ${props => props.active ? '#ffffff' : '#0066cc'};
  border: 1px solid #0066cc;
  cursor: pointer;
  &:hover {
    background-color: #e6f2ff;
  }
`;

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <PaginationContainer>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
        <PageButton
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          active={pageNumber === currentPage}
        >
          {pageNumber}
        </PageButton>
      ))}
    </PaginationContainer>
  );
};

export default Pagination;