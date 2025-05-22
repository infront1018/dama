import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin: 12px 0;
  box-shadow: 0 2px 8px #0001;
  transition: background 0.2s;
  &:hover {
    background: var(--primary);
  }
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
const Button: React.FC<Props> = ({ children, ...rest }) => (
  <StyledButton {...rest}>{children}</StyledButton>
);

export default Button;
