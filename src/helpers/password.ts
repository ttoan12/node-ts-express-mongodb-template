import bcrypt from "bcrypt";
const saltRounds: number = 10;

export async function hash(password: string) {
    let hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword;
}

export async function check(password: string, hashPassword: string) {
    let result = await bcrypt.compare(password, hashPassword);
    return result;
}
