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

export interface DonationForm{
    donationform_id: string;
    one?: string;
    two?: string;
    three?: string;
    fourA?: string;
    fourB?: string;
    fourC?: string;
    fourD?: string;
    five?: string;
    six?: string;
    seven?: string;
    eight?: string;
    disease?: string;
}
