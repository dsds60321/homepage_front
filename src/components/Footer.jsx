/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 10px 20px;
  text-align: center;
  border-top: 1px solid #e9ecef;
  font-size: 14px;
  color: #6c757d;
`;


const Footer = () => {
  return (
    <FooterContainer>
      <p>© 2024 My App. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;