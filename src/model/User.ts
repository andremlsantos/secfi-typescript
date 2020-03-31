import * as mongoose from 'mongoose';
import User from './IUser'

const schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    avatar: String
});

const model = mongoose.model<User & mongoose.Document>('User', schema);

export default model;

