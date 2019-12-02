const miHttpError = require('./mi-http-error');
module.exports = app =>{
  app.use(miHttpError());
}