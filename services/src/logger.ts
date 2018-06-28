import log4js from 'log4js'

log4js.configure({
  appenders: { 
      filelog: { 
          type: 'file', 
          filename: 'debug.log' 
      } 
  },
  categories: { 
      default: { 
        appenders: ['filelog'], 
        level: 'debug' 
    } 
  }
});

export default log4js
