// 기념일 모델 타입
export interface Anniversary {
  id: string;
  userId: string;
  name: string; // 대상 이름
  type: '생일' | '결혼기념일' | '기타';
  date: string; // YYYY-MM-DD
  memo?: string;
  createdAt: number;
}
