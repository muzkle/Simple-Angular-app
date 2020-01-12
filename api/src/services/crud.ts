import db from './../logic/connect';

class dbQuery {
    execQuery(data: any) {
        return new Promise((resolve, reject) => {
            db.query(data, function (error, results) {
                if (error) {
                    reject(error)
                } else {
                    resolve(results);
                }
            });
        });
    }
}

export default new dbQuery();