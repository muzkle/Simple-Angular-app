import * as bcrypt from 'bcrypt';

class EncryptModule {
    public async hashPass(pass: string): Promise<string> {
        const hashed = await bcrypt.hashSync(pass, bcrypt.genSaltSync(9))
        return hashed;
    }

    public async hashCompare(pass: string, user: any): Promise<boolean> {
        const compare = await bcrypt.compareSync(pass, user[0].password)
        return compare;
    }
}

export default new EncryptModule();