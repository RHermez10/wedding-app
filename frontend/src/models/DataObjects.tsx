// TypeScript interfaces to use in sending requests to server

export interface SignUpObj {
    username: string,
    password: string,
    admin: boolean
};

export interface LoginObj {
    username: string,
    password: string
};

export interface PhotoObj {
    url: string,
    photographer: string,
    _id?: string
};
