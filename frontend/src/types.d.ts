export interface IUser {
  username: string;
  password: string;
}

export interface IUserMutation {
  _id: string;
  username: string;
  token: string;
}