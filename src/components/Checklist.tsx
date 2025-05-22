import React from "react";
import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 18px 0;
  display: flex;
  gap: 18px;
  justify-content: center;
`;

const Item = styled.li<{ checked: boolean }>`
  background: ${({ checked }) => (checked ? "var(--accent)" : "#eee")};
  color: ${({ checked }) => (checked ? "#fff" : "#555")};
  border-radius: 10px;
  padding: 10px 18px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
`;

interface ChecklistItem {
  text: string;
  checked: boolean;
}
interface Props {
  items: ChecklistItem[];
  onToggle: (item: string) => void;
}
const Checklist: React.FC<Props> = ({ items, onToggle }) => (
  <List>
    {items.map((item) => (
      <Item
        key={item.text}
        checked={item.checked}
        onClick={() => onToggle(item.text)}
      >
        {item.checked ? "✅" : "⬜"} {item.text}
      </Item>
    ))}
  </List>
);

export default Checklist;
