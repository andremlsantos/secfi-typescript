import * as express from 'express';

const logger = (req: express.Request, resp: express.Response, next: express.NextFunction) => {
    console.info(req.method, req.originalUrl);
    const start = new Date().getTime();

    resp.on('finish', () => {
        const elapsed = new Date().getTime() - start;
        console.info(req.method, req.originalUrl, resp.statusCode, elapsed + 'ms');
    });

    // we call next because we have additional middleware
    next();
}

export { logger };