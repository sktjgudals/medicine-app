export interface User_TYPE {
  id: string;
  image: string;
  nickname: string;
  email?: string;
  introduction?: string | undefined | null;
  createdAt: number;
  type: string;
}
