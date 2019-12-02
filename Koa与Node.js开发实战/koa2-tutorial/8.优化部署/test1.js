const log4js = require('log4js');
log4js.configure({
  appenders:{
    cheese:{      // 指定要记录的日志分类名为cheese
      type:'file',    // 指定日志的展示方式为文件类型 file
      filename: 'cheese.log'    // 指定日志输出的文件名为 cheese.log
    }
  },
  categories: {
    default: {    // 日志的默认配置项
      appenders: ['cheese'],
      level: 'error'
    }
  }
});
const logger = log4js.getLogger('cheese');
logger.trace('Entering cheese testing');
logger.debug('Got cheese');
logger.info('Cheese is Gouda.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.')