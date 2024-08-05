/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaHome } from 'react-icons/fa';
import menuItems from "../data/sidebar.js";

const SidebarContainer = styled.nav`
  width: 250px;
  padding: 20px;
  background-color: #ffffff;
  border-right: 1px solid #e9ecef;
  overflow-y: auto;
  height: calc(100vh - 60px); // 헤더 높이를 뺀 값
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    position: fixed;
    top: 60px;
    left: 0;
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    z-index: 1000;
  }
`;

const CategoryTitle = styled.h2`
  margin-top: 20px;
  font-size: 16px;
  color: #495057;
  display: flex;
  align-items: center;
  cursor: pointer; // 클릭 가능하게 변경
`;

const SubcategoryTitle = styled.h3`
  margin-top: 10px;
  font-size: 14px;
  color: #6c757d;
`;

const PageList = styled.ul`
  list-style-type: none;
  padding-left: 20px;
`;

const PageItem = styled.li`
  margin-bottom: 5px;
`;

const PageLink = styled(Link)`
  text-decoration: none;
  color: #495057;
  font-size: 14px;
  &:hover {
    color: #228be6;
  }
`;

const Icon = styled.span`
  margin-right: 10px;
`;

const Sidebar = ({ isOpen, closeSidebar }) => {
  const [openSubcategories, setOpenSubcategories] = useState({});

  const toggleSubcategory = (category) => {
    setOpenSubcategories(prevState => ({
      ...prevState,
      [category]: !prevState[category]
    }));
  };

  // 아이콘을 동적으로 가져오는 함수
  const getIcon = (iconName) => {
    const icons = { FaHome }; // 아이콘 매핑
    return icons[iconName] || null; // 해당 아이콘이 없으면 null 반환
  };

  return (
    <SidebarContainer isOpen={isOpen} onClick={closeSidebar}>
      {menuItems.map((item) => (
        <div key={item.category}>
          <CategoryTitle onClick={() => toggleSubcategory(item.category)}>
            <Icon>{item.icon}</Icon>
            {item.category}
          </CategoryTitle>
          {openSubcategories[item.category] && item.subcategories.map((sub) => (
            <div key={sub.name}>
              <SubcategoryTitle>{sub.name}</SubcategoryTitle>
              <PageList>
                {sub.pages.map((page, index) => (
                  <PageItem key={page}>
                    <PageLink to={sub.url[index]}>{page}</PageLink> {/* URL을 사용하여 링크 설정 */}
                  </PageItem>
                ))}
              </PageList>
            </div>
          ))}
        </div>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
