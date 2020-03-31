import 'dotenv/config';
import App from './main/app';
import UserController from './controller/UserController'
import UserService from './service/UserServive';
import Bcrypt from './utils/Encryptor';
import FileUpload from './utils/FileUpload'

const app = new App(
    [
        new UserController(
            new UserService(new Bcrypt()),
            new FileUpload()
        ),
    ],
);

app.listen();