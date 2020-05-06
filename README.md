# Secfi Back-End Assignment TypeScript

The idea is to create a microservice that allows CRUD operations on a “users” table. The service should allow read and write operations following this interface:

```
interface IUser {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    avatar: string;
}
```

<ul>
    <li> Service runs in a Docker container </li>
    <li> Passwords are stored in encrypted format </li>
    <li> Avatars are also stored </li>
</ul>

## Getting Started

Claim your API_KEY Alpha Vantage API_KEY <a href="https://www.alphavantage.co/support/#api-key">here</a>
Update App.tsx with your API_KEY

### Prerequisites

```
Install Node.js first. Built with latest version
```

### Installing

Runs on docker container

```
git clone https://github.com/andremlsantos/secfi-typescript.git
docker build -t secfi-typescript .
docker run -it -p 3000:3000 secfi-typescript
```

## Built With

-   [TypeScript](https://www.npmjs.com/package/typescript)
-   [Express](https://expressjs.com/) - Web application server framework
-   [Bcrypt](https://www.npmjs.com/package/bcrypt) - A library to help you hash passwords
-   [Mongoose](https://mongoosejs.com/) - Elegant mongodb object modeling for node.js
-   [Multer](https://github.com/expressjs/multer) - Middleware for handling multipart/form-data, which is primarily used for uploading files
-   [Body-parser](https://github.com/expressjs/body-parser) - Node.js body parsing middleware.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
