export interface UserData {
    username: string;
    password: string;
    token: string;
}

export interface ITask {
    user: number;
    title: string;
    description: string;
    status: string;
}