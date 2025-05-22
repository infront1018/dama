import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AnniversaryList from "./pages/AnniversaryList";
import AnniversaryForm from "./pages/AnniversaryForm";
import GiftList from "./pages/GiftList";
import GiftForm from "./pages/GiftForm";
import { auth } from "./firebase";
import { GlobalStyle, theme } from "./styles";

// **로그인한 유저만 접근할 수 있게 하는 HOC**
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const user = auth.currentUser;
  // 로그인이 안 되어있으면 로그인 페이지로 리다이렉트
  return user ? children : <Navigate to="/login" replace />;
};

const Main = styled.main`
  min-height: calc(100vh - 120px); /* header/footer 제외 높이 */
  background: #fffdfa;
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/anniversaries" element={
              <ProtectedRoute>
                <AnniversaryList />
              </ProtectedRoute>
            } />
            <Route path="/anniversary/new" element={
              <ProtectedRoute>
                <AnniversaryForm />
              </ProtectedRoute>
            } />
            <Route path="/anniversary/:id/edit" element={
              <ProtectedRoute>
                <AnniversaryForm />
              </ProtectedRoute>
            } />

            <Route path="/gifts" element={
              <ProtectedRoute>
                <GiftList />
              </ProtectedRoute>
            } />
            <Route path="/gift/new" element={
              <ProtectedRoute>
                <GiftForm />
              </ProtectedRoute>
            } />
            <Route path="/gift/:id/edit" element={
              <ProtectedRoute>
                <GiftForm />
              </ProtectedRoute>
            } />

            {/* 없는 경로는 대시보드로 이동 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Main>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
