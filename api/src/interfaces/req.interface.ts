import { Request, Response } from 'express';
export default interface IGetUserAuthInfoRequest extends Request {
    userId: object // or any other type
}