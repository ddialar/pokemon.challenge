import {Middleware} from '@loopback/express';

export const loggerMiddleware: Middleware = async (middlewareCtx, next) => {
  const {request} = middlewareCtx;
  const requestTime = Date.now();
  try {
    console.log(
      `[INFO ] Request ${request.method} ${request.url} started at ${((new Date(requestTime)).toLocaleString())}.
        Request Details:
        - Referer:                ${request.headers.referer}
        - User-Agent:             ${request.headers['user-agent']}
        - Remote Address:         ${request.connection.remoteAddress}
        - Remote Address (Proxy): ${request.headers['x-forwarded-for']}`
    );
    const result = await next();
    return result;
  } catch (err) {
    console.error(
      `[ERROR] Request ${request.method} ${request.url} failed. Error :: ${JSON.stringify(err)} ${err}`,
    );
    throw err;
  } finally {
    console.log(
      `[INFO] Request ${request.method} ${request.url} completed in ${Date.now() - requestTime}ms`,
    );
  }
};
