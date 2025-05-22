import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import AnniversaryCard from "../components/AnniversaryCard";
import { Link } from "react-router-dom";

// 타입 정의
export type Anniversary = {
  id: string;
  name: string;
  date: string; // yyyy-mm-dd
  type: string; // 생일, 결혼, 기타
  memo?: string;
  userId?: string;
  createdAt?: string;
};

const Container = styled.div`
  max-width: 720px;
  margin: 42px auto;
  padding: 2rem 1.5rem 3rem 1.5rem;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px #f7e4c7;
`;

const Title = styled.h2`
  color: #ffaa18;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 16px;
  align-items: center;
  justify-content: space-between;
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #dadada;
  font-size: 1rem;
  width: 180px;
`;

const Select = styled.select`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #dadada;
  font-size: 1rem;
  width: 140px;
`;

const NewBtn = styled(Link)`
  background: #ffbb56;
  color: #fff;
  padding: 9px 20px;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
  font-size: 1rem;
  box-shadow: 0 2px 8px #fbe2b5;
  &:hover {
    background: #ffaa18;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const AnniversaryList: React.FC = () => {
  const [anniversaries, setAnniversaries] = useState<Anniversary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 검색/필터/정렬 상태
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("전체");
  const [sort, setSort] = useState("date"); // "date" | "name"

  // Firestore 전체 가져오기 (실제 서비스에선 where절로 유저별로 필터!)
  useEffect(() => {
    const fetchAnniversaries = async () => {
      const q = query(collection(db, "anniversaries"), orderBy("date"));
      const snapshot = await getDocs(q);
      const list: Anniversary[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Anniversary, "id">),
      }));
      setAnniversaries(list);
      setLoading(false);
    };
    fetchAnniversaries();
  }, []);

  // 검색/필터/정렬된 목록 만들기
  const filteredList = anniversaries
    .filter(
      (item) =>
        // 이름 또는 메모에 검색어 포함
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        (item.memo && item.memo.toLowerCase().includes(search.toLowerCase()))
    )
    .filter(
      (item) => typeFilter === "전체" || item.type === typeFilter
    )
    .sort((a, b) => {
      if (sort === "date") {
        return a.date.localeCompare(b.date); // 오름차순
      } else if (sort === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  // 삭제 콜백
  const handleDelete = (id: string) => {
    setAnniversaries((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Container>
      <Title>기념일 목록</Title>
      <Controls>
        <SearchInput
          type="text"
          placeholder="이름·메모 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="전체">전체</option>
          <option value="생일">생일</option>
          <option value="결혼기념일">결혼기념일</option>
          <option value="기타">기타</option>
        </Select>
        <Select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="date">날짜순</option>
          <option value="name">이름순</option>
        </Select>
        <NewBtn to="/anniversary/new">+ 새 기념일 등록</NewBtn>
      </Controls>
      {loading ? (
        <div>불러오는 중...</div>
      ) : filteredList.length === 0 ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        <List>
          {filteredList.map((item) => (
            <AnniversaryCard key={item.id} anniversary={item} onDelete={handleDelete} />
          ))}
        </List>
      )}
    </Container>
  );
};

export default AnniversaryList;
