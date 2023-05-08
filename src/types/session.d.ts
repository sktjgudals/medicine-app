export type SESSIONTYPE = {
  id: string;
  email: string | null;
  iss: string;
  nickname: string;
  role: string;
  type: string;
  iat: number;
  exp: number;
};
