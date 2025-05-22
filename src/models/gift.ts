export {};

// 선물 기록 모델 타입
export interface Gift {
  id: string;
  userId: string;
  anniversaryId?: string; // 연결된 기념일 ID (선택)
  recipient: string;
  item: string;
  date: string; // YYYY-MM-DD
  price?: number;
  memo?: string;
  createdAt: number;
}
