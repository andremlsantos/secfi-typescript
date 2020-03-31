import Bcrypt from "../utils/Encryptor";
import IUser from '../model/IUser';

interface IUserService {
    encryption: Bcrypt;

    getUsers();
    getUser(id: string);
    createUser(data: IUser);
    updateUser(id: string, data: IUser)
    deleteUser(id: string);
}

export default IUserService;
