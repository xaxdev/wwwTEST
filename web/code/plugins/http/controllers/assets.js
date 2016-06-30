const Path = require('path');
console.log(Path.resolve(__dirname, '../public/js'));
module.exports = {
  images: {
    handler: {
      directory: { path: Path.resolve(__dirname, '../public/images') }
    },
    app: {
      name: 'images'
    }
  },
  css: {
    handler: {
      directory: { path: Path.resolve(__dirname, '../public/css') }
    },
    app: {
      name: 'css'
    }
  },
  fonts: {
    handler: {
      directory: { path: Path.resolve(__dirname, '../public/fonts') }
    },
    app: {
      name: 'fonts'
    }
  },
  js: {
    handler: {
      directory:   { path: Path.resolve(__dirname, '../public/js') }
    },
    app: {
      name: 'js'
    }
  }
};
