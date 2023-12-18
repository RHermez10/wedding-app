import bcrypt from 'bcryptjs';
const saltRounds: number = 10;

// bcrypt hash function
export const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

// bcrypt compare function
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    const samePassword: boolean = await bcrypt.compare(password, hash);
    return samePassword;
};

