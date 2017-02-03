const Path = require('path');

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
  },
  uploadFile: {
    handler: {
      directory:   { path: Path.resolve(__dirname, '../public/upload_file') }
    },
    app: {
      name: 'uploadFile'
    }
  },
  exportFile: {
    handler: {
      directory:   { path: Path.resolve(__dirname, '../public/export_files') }
    },
    app: {
      name: 'exportFile'
    }
  },
  downloadFile: {
    handler: {
      directory:   { path: Path.resolve(__dirname, '../public/download_files') }
    },
    app: {
      name: 'downloadFile'
    }
  },
  original: {
    handler: {
      directory:   { path: Path.resolve(__dirname, '../../../../../../media/mol/MME') }
    },
    app: {
      name: 'original'
    }
  }
};
