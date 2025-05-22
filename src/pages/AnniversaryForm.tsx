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

const Select = styled.select`
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

const AnniversaryForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState("");
  const [type, setType] = useState("생일");
  const [date, setDate] = useState("");
  const [memo, setMemo] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // 수정 모드: 기존 데이터 불러오기
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const docRef = doc(db, "anniversaries", id);
          const snapshot = await getDoc(docRef);
          if (snapshot.exists()) {
            const data = snapshot.data();
            setName(data.name || "");
            setType(data.type || "생일");
            setDate(data.date || "");
            setMemo(data.memo || "");
          }
        } catch (e) {
          setError("기존 데이터를 불러올 수 없습니다.");
        }
      };
      fetchData();
    } else {
      // 신규 등록일 땐 모든 필드 초기화
      setName("");
      setType("생일");
      setDate("");
      setMemo("");
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
        const docRef = doc(db, "anniversaries", id);
        await updateDoc(docRef, {
          name,
          type,
          date,
          memo,
        });
      } else {
        // 신규 등록
        await addDoc(collection(db, "anniversaries"), {
          name,
          type,
          date,
          memo,
          userId: auth.currentUser.uid,
          createdAt: serverTimestamp(),
        });
      }
      navigate("/anniversaries");
    } catch (err: any) {
      setError("저장에 실패했습니다. 다시 시도해주세요.");
    }
    setLoading(false);
  };

  return (
    <Container>
      <Title>{id ? "기념일 수정" : "새 기념일 등록"}</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="기념일 이름 (예: 엄마 생일)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="생일">생일</option>
          <option value="결혼기념일">결혼기념일</option>
          <option value="기타">기타</option>
        </Select>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
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

export default AnniversaryForm;
