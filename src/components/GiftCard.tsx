import React from "react";
import styled from "styled-components";
import { Gift } from "../pages/GiftList";
import { Link } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

type Props = {
  gift: Gift;
  onDelete?: (id: string) => void;
};

const Card = styled.div`
  padding: 18px 20px;
  background: #f7f5fa;
  border-radius: 11px;
  box-shadow: 0 2px 12px #f1e1d2;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
`;

const Title = styled.h3`
  margin: 0 0 6px 0;
  font-size: 1.12rem;
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

const GiftCard: React.FC<Props> = ({ gift, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await deleteDoc(doc(db, "gifts", gift.id));
      if (onDelete) onDelete(gift.id);
    }
  };

  return (
    <Card>
      <Title>
        {gift.item} {gift.price && <span style={{ color: "#bbb", fontSize: "0.99rem", fontWeight: 400 }}>({gift.price.toLocaleString()}원)</span>}
      </Title>
      <Info>받는 사람: {gift.to}</Info>
      <Info>날짜: {gift.date}</Info>
      {gift.memo && <Memo>메모: {gift.memo}</Memo>}
      <BtnRow>
        <Link to={`/gift/${gift.id}/edit`}>
          <ActionBtn>수정</ActionBtn>
        </Link>
        <ActionBtn onClick={handleDelete}>삭제</ActionBtn>
      </BtnRow>
    </Card>
  );
};

export default GiftCard;
