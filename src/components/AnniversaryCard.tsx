import React from "react";
import styled from "styled-components";
import { Anniversary } from "../pages/AnniversaryList";
import { Link } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

type Props = {
  anniversary: Anniversary;
  onDelete?: (id: string) => void; // 삭제 후 부모에 알림
};

const Card = styled.div`
  padding: 18px 20px;
  background: #fffdfa;
  border-radius: 11px;
  box-shadow: 0 2px 12px #f9e3b4;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
`;

const Title = styled.h3`
  margin: 0 0 6px 0;
  font-size: 1.18rem;
  color: #ffaa18;
  font-weight: 600;
`;

const Info = styled.div`
  color: #888;
  font-size: 0.98rem;
`;

const Memo = styled.div`
  font-size: 1.02rem;
  color: #666;
  margin-top: 5px;
`;

const BtnRow = styled.div`
  margin-top: 0.8rem;
  display: flex;
  gap: 0.7rem;
`;

const ActionBtn = styled.button`
  background: #ffe2b7;
  color: #ffaa18;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 0.97rem;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: #ffaa18;
    color: #fff;
  }
`;

const AnniversaryCard: React.FC<Props> = ({ anniversary, onDelete }) => {
  // 삭제 핸들러
  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await deleteDoc(doc(db, "anniversaries", anniversary.id));
      if (onDelete) onDelete(anniversary.id);
    }
  };

  return (
    <Card>
      <Title>
        {anniversary.name} <span style={{ fontWeight: 400, color: "#bbb", fontSize: "0.97rem" }}>({anniversary.type})</span>
      </Title>
      <Info>날짜: {anniversary.date}</Info>
      {anniversary.memo && <Memo>메모: {anniversary.memo}</Memo>}
      <BtnRow>
        <Link to={`/anniversary/${anniversary.id}/edit`}>
          <ActionBtn>수정</ActionBtn>
        </Link>
        <ActionBtn onClick={handleDelete}>삭제</ActionBtn>
      </BtnRow>
    </Card>
  );
};

export default AnniversaryCard;
