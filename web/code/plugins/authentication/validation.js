'use strict';

module.exports = (decoded, request, cb) => {

  const Authentication = request.collections.authentication;

  Authentication
    .findOne({
      user: decoded.email,
      device: decoded.device
     })
     .then((token) => {

       if (!token) {
         return cb(null, false);
       }

       return cb(null, true);
     })
     .catch((err) => {

       return cb(err);
     })
     .done();
};
