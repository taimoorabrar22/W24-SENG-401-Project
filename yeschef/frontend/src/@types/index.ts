export interface IRECIPE {
    title: string;
    description: string;
    note?: string;
    ingredients: string;
}

export interface IRECIPEPAYLOAD extends IRECIPE {
    image: File;
}

export interface IRECIPERESPONSE extends IRECIPE {
    _id: string;
    image: any;
    user: {
        email: string;
    };
}

export interface IRECIPEUSER extends Omit<IRECIPERESPONSE, "user"> {
    user: string;
}

export interface ILOGINRESPONSE {
    email: string,
    token: string,
    id: string;
}

export interface IUpdateResponse {
    id: string;
    newEmail: string,
    token: string,
    email: string,
}

export interface IPAYLOAD {
    email: string;
    password: string;
}

export interface IPAYLOADUPDATE {
    newEmail: string;
    email: string;
    newPassword: string;
}



export interface AUTH_TYPE {
    user: string;
    loading: boolean;
    onLogin: (payload: IPAYLOAD) => void;
    onRegister: (payload: IPAYLOAD) => void;
    onLogout: () => void;
    onUpdate: (payload: IPAYLOADUPDATE) => void;
}