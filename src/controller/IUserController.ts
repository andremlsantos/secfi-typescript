import { Router } from 'express';
import IService from '../service/IUserService';

interface Controller {
    path: string;
    router: Router;
    service: IService;
}

export default Controller;