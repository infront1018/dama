import React, { useState } from "react";
import styled from "styled-components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const LoginContainer = styled.div`
  max-width: 380px;
  margin: 80px auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px #ececec;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  color: #334;
  margin-bottom: 16px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #dadada;
  font-size: 1rem;
`;

const Button = styled.button`
  background: #ffbb56;
  color: #222;
  font-weight: 600;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 10px;

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

const LinkStyled = styled(Link)`
  text-align: right;
  color: #888;
  margin-top: 12px;
  font-size: 0.95rem;
  text-decoration: underline;
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, pw);
      navigate("/"); // 대시보드 등 메인으로 이동
    } catch (err: any) {
      setError("이메일 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <LoginContainer>
      <Title>로그인</Title>
      <form onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          required
        />
        <Button type="submit">로그인</Button>
      </form>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <LinkStyled to="/signup">회원가입하기</LinkStyled>
    </LoginContainer>
  );
};

export default Login;
