import * as bcrypt from 'bcrypt';

class Bcrypt {

    constructor() {
        console.log("Bcrypt init");
    }

    public async execute(password: string) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    reject(null);
                } else {
                    resolve(hash);
                }
            });
        });
    }
}

export default Bcrypt;