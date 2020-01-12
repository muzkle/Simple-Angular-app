import { Response } from 'express';
import IGetUserAuthInfoRequest from '../interfaces/req.interface';
import * as mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'bausotzrbiblisqxlif4-mysql.services.clever-cloud.com',
    port: '3306',
    user: 'uro1ke6aiksh5zqz',
    password: 'L1e3lm84mhnlHfmOEScN',
    database: 'bausotzrbiblisqxlif4'
});

connection.connect(function (err) {
    if (err) return console.log(err);
    console.log('CONNECTED TO DATABASE!');
    createTable(connection)
});

function createTable(conn: any) {
    const sql = "CREATE TABLE IF NOT EXISTS users (\n" +
        "id int NOT NULL AUTO_INCREMENT,\n" +
        "name varchar(150) NOT NULL,\n" +
        "email varchar(150) NOT NULL,\n" +
        "gender varchar(150) NOT NULL,\n" +
        "password char(60) NOT NULL,\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    conn.query(sql, function (error, results, fields) {
        if (error) return console.log(error);
    });
}

export default connection;
