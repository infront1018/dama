import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import GiftCard from "../components/GiftCard";
import { Link } from "react-router-dom";

// 타입 정의
export type Gift = {
  id: string;
  item: string;        // 선물명
  to: string;          // 누구에게
  date: string;        // 선물한 날짜 yyyy-mm-dd
  price?: number;      // 가격(선택)
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

const PriceFilter = styled.input`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #dadada;
  font-size: 1rem;
  width: 100px;
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

const GiftList: React.FC = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 검색/필터/정렬 상태
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date"); // "date" | "name" | "price"
  const [minPrice, setMinPrice] = useState<string>("");

  useEffect(() => {
    const fetchGifts = async () => {
      const q = query(collection(db, "gifts"), orderBy("date", "desc"));
      const snapshot = await getDocs(q);
      const list: Gift[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Gift, "id">),
      }));
      setGifts(list);
      setLoading(false);
    };
    fetchGifts();
  }, []);

  // 검색/필터/정렬 적용된 목록
  const filteredList = gifts
    .filter(
      (item) =>
        item.item.toLowerCase().includes(search.toLowerCase()) ||
        item.to.toLowerCase().includes(search.toLowerCase()) ||
        (item.memo && item.memo.toLowerCase().includes(search.toLowerCase()))
    )
    .filter(
      (item) =>
        minPrice === "" || (item.price !== undefined && item.price >= Number(minPrice))
    )
    .sort((a, b) => {
      if (sort === "date") {
        return b.date.localeCompare(a.date); // 최신순
      } else if (sort === "name") {
        return a.item.localeCompare(b.item);
      } else if (sort === "price") {
        // undefined 가격은 뒤로
        if (a.price === undefined) return 1;
        if (b.price === undefined) return -1;
        return b.price - a.price;
      }
      return 0;
    });

  // 삭제 콜백
  const handleDelete = (id: string) => {
    setGifts((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Container>
      <Title>선물 기록 목록</Title>
      <Controls>
        <SearchInput
          type="text"
          placeholder="선물명·받는사람·메모 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <PriceFilter
          type="number"
          min={0}
          placeholder="최소 금액"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <Select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="date">날짜순</option>
          <option value="name">이름순</option>
          <option value="price">금액순</option>
        </Select>
        <NewBtn to="/gift/new">+ 새 선물 기록</NewBtn>
      </Controls>
      {loading ? (
        <div>불러오는 중...</div>
      ) : filteredList.length === 0 ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        <List>
          {filteredList.map((item) => (
            <GiftCard key={item.id} gift={item} onDelete={handleDelete} />
          ))}
        </List>
      )}
    </Container>
  );
};

export default GiftList;
