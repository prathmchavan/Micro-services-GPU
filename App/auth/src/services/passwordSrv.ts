
import bcrypt from 'bcryptjs';

const saltRounds = 12;

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
};

export const comparePasswords = async (candidatePassword: string, storedPassword: string): Promise<boolean> => {
    return bcrypt.compare(candidatePassword, storedPassword);
};
