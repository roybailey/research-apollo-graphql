import log4js from 'log4js'


log4js.configure({
  appenders: { 
    filelog: { type: 'file', filename: 'debug.log' },
    errorlog: { type: 'file', filename: 'error.log' },
  },
  categories: { 
    default: { 
      appenders: ['filelog'], 
      level: 'debug' 
    },
    errors: { 
      appenders: ['errorlog'], 
      level: 'error' 
    } 
  }
});


export default log4js
