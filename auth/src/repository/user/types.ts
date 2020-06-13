export interface Password {
  hash: string;
  salt: string;
}

export interface JwtPayload {
  id: string
}
