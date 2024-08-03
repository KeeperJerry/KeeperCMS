export default interface LoginModel {
    agent: Agent;
    username: string; // email !!!
    password: string;
    clientToken: string;
    requestUser: boolean;
}

interface Agent {
    name: string;
    version: number;
}