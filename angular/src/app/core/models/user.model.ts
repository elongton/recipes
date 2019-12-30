export interface IUser {
    uid: string;
    displayName: string;
    firstName: string;
    picture: string;
    loading?: boolean;
    error?: string;
}

export class User implements IUser {
    constructor(public uid: string, public displayName: string, public firstName: string, public picture: string, ) { }
}
