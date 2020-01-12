import crud from './../services/crud';

class ValidatorModule {
    public async Validator(body: object): Promise<object> {
        if (!body['name']) {
            return { error: true, message: 'O campo nome não pode ser vazio!' };
        }

        if (!body['email']) {
            return { error: true, message: 'O campo email não pode ser vazio!' };
        }

        if (!body['gender']) {
            return { error: true, message: 'O campo sexo não pode ser vazio!' };
        }

        if (!body['password']) {
            return { error: true, message: 'O campo senha não pode ser vazio!' };
        }

        const exist:any = await crud.execQuery(`SELECT * FROM users WHERE email='${body['email']}'`);

        if(exist.length){
            return { error: true, message: 'Já existe um usuário com este email!' };
        }

        return { error: false };
    }
}

export default new ValidatorModule();