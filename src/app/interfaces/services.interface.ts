export interface IResponse<T> {
  status: 0 | 1 | 2;
  message: T;
}

export interface IResponseLogin {
  accessToken: string;
}

export interface IToken {
  exp: number;
  sub: number;
  iat: number;
  session: IUsers;
}

export interface IUsers {
  idUser: number;
  email: string;
  name: string;
}
