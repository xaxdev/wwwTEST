'use strict';

const Crypto = require('crypto');

exports.register = (server, options, next) => {

  const cryptography = {
    encrypt: (text) => {

      const cipher = Crypto.createCipher(options.algorithm, options.key);
      return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    },
    decrypt: (text) => {

      const decipher = Crypto.createDecipher(options.algorithm, options.key);
      return decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
    }
  };

  server.decorate('request', 'cryptography', cryptography);

  next();
};

exports.register.attributes = require('./package');
