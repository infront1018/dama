import React from "react";
import styled from "styled-components";

const FooterBar = styled.footer`
  width: 100%;
  padding: 2rem 0 1rem 0;
  background: #fffbea;
  color: #888;
  font-size: 1rem;
  text-align: center;
  border-top: 1px solid #ececec;
  margin-top: 2rem;
`;

const Footer: React.FC = () => {
  return (
    <FooterBar>
      © {new Date().getFullYear()} DAMA. All rights reserved. | Designed by 막대기
    </FooterBar>
  );
};

export default Footer;
