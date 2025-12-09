import logger from '../utils/logger';

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('error', (error, { event }) => {
    const { method, url } = event?.node.req || {};

    logger.error(`${method} ${url} - ${error.message}\nStack: ${error.stack}`);
  });
});
