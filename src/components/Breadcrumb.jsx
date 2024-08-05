import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const BreadcrumbContainer = styled.div`
  margin-bottom: 20px;
`;

const BreadcrumbLink = styled(Link)`
  color: #0066cc;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const BreadcrumbSeparator = styled.span`
  margin: 0 5px;
`;

const Breadcrumb = ({ category, subcategory, page }) => {
  return (
    <BreadcrumbContainer>
      <BreadcrumbLink to="/">Home</BreadcrumbLink>
      <BreadcrumbSeparator>/</BreadcrumbSeparator>
      <BreadcrumbLink to={`/${category}`}>{category}</BreadcrumbLink>
      <BreadcrumbSeparator>/</BreadcrumbSeparator>
      <BreadcrumbLink to={`/${category}/${subcategory}`}>{subcategory}</BreadcrumbLink>
      <BreadcrumbSeparator>/</BreadcrumbSeparator>
      <span>{page}</span>
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;