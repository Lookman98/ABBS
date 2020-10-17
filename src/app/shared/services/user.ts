export interface Role {
    admin?:boolean;
    bloodbankstaff?:boolean;
}

export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
   // role: Role;
}
