// const log4js = require('log4js');
// module.exports = options =>{
//   return async (ctx, next) =>{
//     const start = Date.now();
//     log4js.configure({
//       apppenders:{cheese:{type: 'file', filename:'cheese.log'}},
//       categories: {default: {appenders: ['cheers'], level:'info'}}
//     });
//     const logger = log4js.getLogger('cheese');
//     await next();
//     const end = Date.now();
//     const responseTime = end - start;
//     logger.info('响应时间为${responseTime/1000}s');
//   }
// };

const log4js = require('log4js');
const methods = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark'];
module.exports = () => {
    const contextLogger = {};
    log4js.config({
        appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
        categories: { default: { appenders: ['cheers'], level: 'info' } }
    });
    return async (ctx, next) => {
        const start = Date.now();
        mothods.forEach((method, i) => {
            contextLogger[method] = (message) => {
                logger[method](message);
            }
        })
        ctx.log = contextLogger;
        await next();
        const responseTime = Date.now() - start;
        logger.info(`响应时间为${responseTime/1000}s`);
    }
}