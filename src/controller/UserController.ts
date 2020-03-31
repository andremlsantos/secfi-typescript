import * as express from 'express';
import Controller from './IUserController';
import IUserService from '../service/IUserService'
import IUser from 'model/IUser';
import FileUpload from '../utils/FileUpload'

class UserController implements Controller {
    public path = '/users';
    public router = express.Router();
    public service: IUserService;
    public storage: FileUpload;

    constructor(service: IUserService, storage: FileUpload) {
        this.service = service;
        this.storage = storage;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path, this.storage.upload("avatar"), this.createUser);
        this.router.get(this.path, this.getUsers);
        this.router.get(`${this.path}/:id`, this.getUser);
        this.router.put(`${this.path}/:id`, this.storage.upload("avatar"), this.updateUser);
        this.router.delete(`${this.path}/:id`, this.deleteUser);
    }

    private getUsers = async (request: express.Request, response: express.Response) => {
        try {
            const users = await this.service.getUsers();
            console.info("Retrieved all users");
            response.status(200).json({
                total: users.length,
                users: users
            });
        } catch (err) {
            console.error(err);
            response.status(500).json(err);
        }
    }

    private getUser = async (request: express.Request, response: express.Response) => {
        const id = request.params.id;
        try {
            const user = await this.service.getUser(id);
            console.info("Retrieved user");
            response.status(200).json({ user: user });
        } catch (err) {
            console.error(err);
            response.status(500).json(err);
        }
    }

    private updateUser = async (request: express.Request, response: express.Response) => {
        const id = request.params.id;
        const userData: IUser = request.body;
        userData.avatar = request.file.filename;

        try {
            const user = await this.service.updateUser(id, userData);
            console.info("User Updated");
            response.status(200).json({ "ok": "User Updated" });
        } catch (err) {
            console.error(err);
            response.status(500).json(err);
        }
    }

    private createUser = async (request: express.Request, response: express.Response) => {
        const userData: IUser = request.body;
        userData.avatar = request.file.filename;

        try {
            await this.service.createUser(userData);
            console.info("User Created");
            response.status(200).json({ "ok": "User Created" })
        } catch (err) {
            response.status(500).json(err)
        }
    }

    private deleteUser = async (request: express.Request, response: express.Response) => {
        const id = request.params.id;
        try {
            await this.service.deleteUser(id);
            console.info("User deleted");
            response.status(200).json({ "ok": "User deleted" });
        } catch (err) {
            console.error(err);
            response.status(500).json(err);
        }
    }
}

export default UserController;