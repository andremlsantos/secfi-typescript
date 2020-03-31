import IUser from '../model/IUser';
import User from '../model/User';
import Bcrypt from '../utils/Encryptor';
import IUserService from './IUserService';
import FileUpload from '../utils/FileUpload'

class UserService implements IUserService {
    encryption: Bcrypt;
    storage: FileUpload;

    constructor(encryption: Bcrypt) {
        console.log("Service init");
        this.encryption = encryption;
    }

    public async getUsers() {
        return new Promise((resolve, reject) => {
            User.find()
                .select("firstName lastName userName password avatar")
                .exec().then(users => {
                    resolve(users);
                }).catch(err => {
                    reject(err);
                })
        });
    }

    public async getUser(id: string) {
        return new Promise((resolve, reject) => {
            User.findById(id)
                .select("firstName lastName userName password avatar")
                .exec().then(user => {
                    resolve(user);
                }).catch(err => {
                    reject(err);
                })
        });
    }

    public async createUser(data: IUser) {
        // username unique
        const isPresent = await User.findOne({ userName: data.userName }) != null;
        if (isPresent)
            return new Promise((resolve, reject) => { reject({ "error": "Cannot create user because username its not unique" }) });

        const user = new User(data);
        const encryptedPass: any = await this.encryption.execute(user.password);
        user.password = encryptedPass;

        return new Promise((resolve, reject) => {
            user.save().then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        });
    }

    public async updateUser(id: string, data: IUser) {
        //  username must be present
        const isPresent = await User.findById(id);
        if (!isPresent)
            return new Promise((resolve, reject) => { reject({ "error": "Cannot update user due its not present" }) });

        try {
            const encryptedPass: any = await this.encryption.execute(data.password);
            data.password = encryptedPass;
        } catch (err) {
            return new Promise((resolve, reject) => { reject("A problem ocurred while updating user") })
        }

        return new Promise((resolve, reject) => {
            User.updateOne({ "_id": id }, { $set: data }).exec().then(res => {
                resolve(res);
            }).catch(err => {
                reject("A problem ocurred while updating user:" + err);
            })
        });
    }

    public async deleteUser(id: string) {
        return new Promise((resolve, reject) => {
            User.findOneAndDelete({ _id: id }).exec().then(res => {
                resolve(res);
            }).catch(err => {
                reject("A problem ocurred while deleting user" + err);
            });
        });
    }
}

export default UserService;