exports.register = (server, options, next) => {

  const routes = require('./routes');
  server.route(routes);

  next();
};

exports.register.attributes = require('./package');
