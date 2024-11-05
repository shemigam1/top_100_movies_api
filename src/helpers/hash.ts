import bcrypt, { genSalt, hash, compare } from 'bcrypt'

const saltRounds = 10;
export const hashPassword = async (password: string) => {
    const hashed = await bcrypt.hash(password, saltRounds)

    // console.log('hash: ', hash)
    if (!hashed) return
    return hashed
}

export const comparePassword = (userPassword: string, password: string) => {
    const match = bcrypt.compareSync(password, userPassword)
    // console.log(`userPassword......${userPassword}`);
    // console.log(`password......${password}`);

    // if (!match) throw new Error('something went wrong')
    return match
}