import { Response } from "express";
import * as jwt from "jsonwebtoken";
import IGetUserAuthInfoRequest from "../interfaces/req.interface";
import crud from "./../services/crud";
import validator from "./../validators/validator";
import encrypt from "./../modules/encrypt";
let secret: string = "this is just a test";

class UserController {
  //list users
  public async index(
    req: IGetUserAuthInfoRequest,
    res: Response
  ): Promise<Response> {
    const users = await crud.execQuery(
      "SELECT id, name, email, gender FROM users"
    );
    return res.json(users);
  }

  //get user
  public async find(
    req: IGetUserAuthInfoRequest,
    res: Response
  ): Promise<Response> {
    const user = await crud.execQuery(
      `SELECT name, email, gender FROM users WHERE id=${req.params.id}`
    );
    return res.json(user);
  }

  //login
  public async login(
    req: IGetUserAuthInfoRequest,
    res: Response
  ): Promise<Response> {
    //check if user exist
    const exist: any = await crud.execQuery(
      `SELECT * FROM users WHERE email='${req.body.email}'`
    );

    if (!exist.length) {
      return res.json({ error: true, message: "Usuário inexistente!" });
    }

    let validPass = await encrypt.hashCompare(req.body.password, exist);

    if (validPass) {
      let token = await jwt.sign({ _id: exist.id }, secret, {
        expiresIn: "1d"
      });
      console.log(exist);
      return res.json({
        error: false,
        message: "Usuário conectado com sucesso!",
        token: token,
        email: exist[0].email,
        name: exist[0].name,
        gender: exist[0].gender
      });
    } else {
      return res.json({ error: true, message: "Credenciais inválidas." });
    }
  }

  //register
  public async register(
    req: IGetUserAuthInfoRequest,
    res: Response
  ): Promise<Response> {
    const validate: any = await validator.Validator(req.body);

    if (!validate.error) {
      req.body.password = await encrypt.hashPass(req.body.password);
      const insert: any = await crud.execQuery(
        `INSERT INTO users(name, email, gender, password ) VALUES('${req.body.name}','${req.body.email}','${req.body.gender}','${req.body.password}')`
      );
      if (insert.insertId) {
        //usuário cadastrado, fazer login
        const user: any = await crud.execQuery(
          `SELECT * FROM users WHERE id=${insert.insertId}`
        );
        let token = await jwt.sign({ _id: user.id }, secret, {
          expiresIn: "1d"
        });

        if (user) {
          const response = {
            name: user[0].name,
            email: user[0].email,
            token: token,
            gender: user[0].gender
          };
          return res.json(response);
        }
      }
    } else {
      return res.json(validate);
    }
  }

  //update user
  public async update(
    req: IGetUserAuthInfoRequest,
    res: Response
  ): Promise<Response> {
    const user: any = await crud.execQuery(
      `UPDATE users SET name='${req.body.name}', gender='${req.body.gender}' WHERE id=${req.body.id}`
    );
    if (user.affectedRows) {
      const response = await crud.execQuery(
        `SELECT id, name, email, gender FROM users WHERE id=${req.body.id}`
      );
      return res.json({
        error: false,
        message: "Usuário atualizado com sucesso!",
        user: response
      });
    } else {
      return res.json({
        error: true,
        message: "Não foi possível atualizar ou usuário não existe!"
      });
    }
  }

  //delete user
  public async delete(
    req: IGetUserAuthInfoRequest,
    res: Response
  ): Promise<Response> {
    const user: any = await crud.execQuery(
      `DELETE FROM users WHERE id=${req.params.id}`
    );
    if (user.affectedRows) {
      return res.json({
        error: false,
        message: "Usuário removido com sucesso!"
      });
    } else {
      return res.json({
        error: true,
        message: "Não foi possível remover ou usuário não existe!"
      });
    }
  }
}

export default new UserController();
