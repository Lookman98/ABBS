export interface Role {
    administrator?:boolean;
    bloodbankstaff?:boolean;
}

export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
}
