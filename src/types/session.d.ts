export type SESSIONTYPE = {
  id: string;
  email: string | null;
  image: string | null;
  nickname: string;
  iss: string;
  role: string;
  type: string;
  iat: number;
  exp: number;
};
