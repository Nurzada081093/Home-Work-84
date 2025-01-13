export interface IUser {
  username: string;
  password: string;
}

export interface IUserMutation {
  _id: string;
  username: string;
  token: string;
}

export interface ITask {
  _id: string;
  user: string;
  title: string;
  description: string;
  status: string;
}

export interface ITaskMutation {
  title: string;
  description: string;
  status: string;
}

export interface INewTask {
  task: ITaskMutation;
  token: string;
}