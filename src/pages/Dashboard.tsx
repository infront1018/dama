import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  max-width: 650px;
  margin: 48px auto;
  padding: 2rem 1.5rem 3rem 1.5rem;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px #f2e5c5;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #ffaa18;
  font-weight: 700;
  margin-bottom: 1.2rem;
  letter-spacing: 0.03em;
`;

const Sub = styled.p`
  font-size: 1.2rem;
  color: #888;
  margin-bottom: 2rem;
`;

const LinkBtn = styled(Link)`
  display: inline-block;
  margin: 12px 16px 0 16px;
  background: #ffbb56;
  color: #fff;
  font-weight: bold;
  border-radius: 9px;
  padding: 12px 30px;
  font-size: 1.08rem;
  text-decoration: none;
  box-shadow: 0 2px 10px #fbe2b5;
  transition: background 0.2s;
  &:hover {
    background: #ffaa18;
  }
`;

const Dashboard: React.FC = () => {
  return (
    <Wrapper>
      <Title>담아(DAMA)</Title>
      <Sub>소중한 사람들의 기념일과 선물 기록을 한 번에 관리하세요.</Sub>
      <LinkBtn to="/anniversaries">기념일 전체 보기</LinkBtn>
      <LinkBtn to="/gifts">선물 기록 보기</LinkBtn>
      <br />
      <LinkBtn to="/anniversary/new">+ 기념일 등록</LinkBtn>
      <LinkBtn to="/gift/new">+ 선물 기록 추가</LinkBtn>
    </Wrapper>
  );
};

export default Dashboard;
