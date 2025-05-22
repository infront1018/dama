import React, { useState } from "react";
import styled from "styled-components";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const SignupContainer = styled.div`
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

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pw);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      navigate("/login");
    } catch (err: any) {
      setError("이미 등록된 이메일이거나, 형식이 잘못됐습니다.");
    }
  };

  return (
    <SignupContainer>
      <Title>회원가입</Title>
      <form onSubmit={handleSignup}>
        <Input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="비밀번호(6자 이상)"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          minLength={6}
          required
        />
        <Button type="submit">회원가입</Button>
      </form>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <LinkStyled to="/login">이미 계정이 있으신가요?</LinkStyled>
    </SignupContainer>
  );
};

export default Signup;
