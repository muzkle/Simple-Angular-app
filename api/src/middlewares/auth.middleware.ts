import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import IGetUserAuthInfoRequest from '../interfaces/req.interface';
let secret: string = 'this is just a test';

class AuthModule {
    public async isAuthorized(req: IGetUserAuthInfoRequest, res: express.Response, next): Promise<any> {
        let token: any = req.headers.authorization;

        if (!token && !token.length) {
            return res.status(401).json({ error: true, message: 'Token não foi fornecido!', auth: false });
        }

        token = token.split(' ')[1];
        jwt.verify(token, secret, function (err, user) {
            
            if (err) {
                return res.status(401).json({ error: true, auth: false, message: 'Sua sessão expirou!' });
            }

            req.userId = <any>user;
            next();
        })
    }

    public async logout(req: IGetUserAuthInfoRequest, res: express.Response, next): Promise<any> {
        req.userId = null;
        next();
    }
}

export default new AuthModule();