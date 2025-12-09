import logger from '../utils/logger';

export default defineEventHandler((event) => {
  const req = event.node.req;
  const { method, url } = req;

  const ip =
    event.node.req.headers['x-forwarded-for'] ||
    event.node.req.socket.remoteAddress;

  logger.info(`${method} ${url} - IP: ${ip}`);
});
