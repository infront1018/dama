import React from "react";
import styled from "styled-components";

const Overlay = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? "flex" : "none")};
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #0006;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 18px;
  padding: 32px 24px;
  min-width: 320px;
  max-width: 90vw;
  box-shadow: 0 4px 24px #0002;
`;

interface Props {
  open: boolean;
  onClose: () => void;
  anniversary?: any;
}
const LetterModal: React.FC<Props> = ({ open, onClose, anniversary }) => (
  <Overlay open={open}>
    <ModalBox>
      <h2>감성 편지 자동 생성</h2>
      <div style={{ margin: "16px 0" }}>
        {/* 실제 GPT 연동 전 임시 안내 */}
        <p>이곳에 감성 편지 생성 기능이 들어갑니다.</p>
        {anniversary && <div>대상: {anniversary.name}</div>}
      </div>
      <button onClick={onClose}>닫기</button>
    </ModalBox>
  </Overlay>
);

export default LetterModal;
