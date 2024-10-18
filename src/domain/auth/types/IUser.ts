export interface IUser {
  id: string;
  email: string;
  name: string;
  role: string;

  /* auth tokens */
  token: string;
  refreshToken: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
