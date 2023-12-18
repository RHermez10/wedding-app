const nedb = require('nedb-promise');

// DATABASES
export const accounts: any = new nedb({
    filename: "./databases/accounts.db",
    autoload: true
});

export const photos: any = new nedb({
    filename: "./databases/photos.db",
    autoload: true
});


// DATABASE INTERFACES
export interface Account {
    username: string,
    password: string,
    admin: boolean
};

export interface Login {
    username: string,
    password: string
};


export interface Photo {
    url: string,
    photographer?: string
};


export interface ResObj {
    success: boolean,
    data?: {}
};