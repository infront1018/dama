import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Gift } from "./GiftList";

const Container = styled.div`
  max-width: 450px;
  margin: 48px auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px #f7e4c7;
  padding: 2.2rem 1.5rem 2.8rem 1.5rem;
`;

const Title = styled.h2`
  text-align: center;
  color: #ffaa18;
  font-weight: 700;
  margin-bottom: 1.2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #dadada;
  border-radius: 8px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #dadada;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
`;

const Button = styled.button`
  background: #ffbb56;
  color: #fff;
  font-weight: bold;
  padding: 13px;
  border: none;
  border-radius: 8px;
  font-size: 1.09rem;
  cursor: pointer;
  margin-top: 12px;
  &:hover {
    background: #ffaa18;
  }
`;

const ErrorMsg = styled.div`
  color: #ff6b6b;
  text-align: center;
  margin-top: 4px;
  font-size: 0.95rem;
`;

const GiftForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [memo, setMemo] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // 수정 모드일 경우 데이터 불러오기
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const docRef = doc(db, "gifts", id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setItem(data.item || "");
          setTo(data.to || "");
          setDate(data.date || "");
          setPrice(data.price || undefined);
          setMemo(data.memo || "");
        }
      };
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!auth.currentUser) {
      setError("로그인이 필요합니다.");
      setLoading(false);
      return;
    }

    try {
      if (id) {
        // 수정
        const docRef = doc(db, "gifts", id);
        await updateDoc(docRef, {
          item,
          to,
          date,
          price,
          memo,
        });
      } else {
        // 신규 등록
        await addDoc(collection(db, "gifts"), {
          item,
          to,
          date,
          price,
          memo,
          userId: auth.currentUser.uid,
          createdAt: serverTimestamp(),
        });
      }
      navigate("/gifts");
    } catch (err: any) {
      setError("저장에 실패했습니다. 다시 시도해주세요.");
    }
    setLoading(false);
  };

  return (
    <Container>
      <Title>{id ? "선물 기록 수정" : "새 선물 기록"}</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="선물명 (예: 꽃다발)"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="누구에게 (예: 엄마)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="가격 (선택)"
          value={price === undefined ? "" : price}
          min={0}
          onChange={(e) => setPrice(e.target.value === "" ? undefined : Number(e.target.value))}
        />
        <TextArea
          placeholder="메모 (선택)"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          rows={3}
        />
        <Button type="submit" disabled={loading}>
          {id ? "수정하기" : "등록하기"}
        </Button>
      </Form>
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </Container>
  );
};

export default GiftForm;
