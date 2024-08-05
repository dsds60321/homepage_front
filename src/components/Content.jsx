import React from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import Breadcrumb from './Breadcrumb';
import Pagination from './Pagination';

const ContentContainer = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const ContentTitle = styled.h1`
  font-size: 24px;
  color: #343a40;
  margin-bottom: 20px;
`;

const Content = () => {
  const { category, subcategory, page } = useParams();
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const totalItems = 100; // 예시 데이터

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <ContentContainer>
      <Breadcrumb category={category} subcategory={subcategory} page={page} />
      <ContentTitle>{page}</ContentTitle>
      <p>This is the content for {category} / {subcategory} / {page}</p>
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </ContentContainer>
  );
};

export default Content;