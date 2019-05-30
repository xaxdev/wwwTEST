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
    originalCSL: {
        handler: {
            directory:   { path: Path.resolve(__dirname, '../../../../../../../../../../../mnt/mol/CSL') }
        },
        app: {
            name: 'originalCSL'
        }
    },
    originalMAM: {
        handler: {
            directory:   { path: Path.resolve(__dirname, '../../../../../../../../../../../mnt/mol/MAM') }
        },
        app: {
            name: 'originalMAM'
        }
    },
    originalMAT: {
        handler: {
            directory:   { path: Path.resolve(__dirname, '../../../../../../../../../../../mnt/mol/MAT') }
        },
        app: {
            name: 'originalMAT'
        }
    },
    originalMBS: {
        handler: {
            directory:   { path: Path.resolve(__dirname, '../../../../../../../../../../../mnt/mol/MBS') }
        },
        app: {
            name: 'originalMBS'
        }
    },
    originalMDO: {
        handler: {
            directory:   { path: Path.resolve(__dirname, '../../../../../../../../../../../mnt/mol/MDO') }
        },
        app: {
            name: 'originalMDO'
        }
    },
    originalMDT: {
        handler: {
            directory:   { path: Path.resolve(__dirname, '../../../../../../../../../../../mnt/mol/MDT') }
        },
        app: {
            name: 'originalMDT'
        }
    },
    originalMJW: {
        handler: {
            directory:   { path: Path.resolve(__dirname, '../../../../../../../../../../../mnt/mol/MJW') }
        },
        app: {
            name: 'originalMJW'
        }
    },
    originalMKU: {
        handler: {
            directory:   { path: Path.resolve(__dirname, '../../../../../../../../../../../mnt/mol/MKU') }
        },
        app: {
            name: 'originalMKU'
        }
    },
    originalMME: {
        handler: {
            directory:   { path: Path.resolve(__dirname, '../../../../../../../../../../../mnt/mol/MME') }
        },
        app: {
            name: 'originalMME'
        }
    },
    originalMMF: {
        handler: {
            directory:   { path: Path.resolve(__dirname, '../../../../../../../../../../../mnt/mol/MMF') }
        },
        app: {
            name: 'originalMMF'
        }
    },
    originalMMU: {
        handler: {
            directory:   { path: Path.resolve(__dirname, '../../../../../../../../../../../mnt/mol/MMU') }
        },
        app: {
            name: 'originalMMU'
        }
    },
    originalSTD: {
        handler: {
            directory:   { path: Path.resolve(__dirname, '../../../../../../../../../../../mnt/mol/STD') }
        },
        app: {
            name: 'originalSTD'
        }
    },
    originalSTS: {
        handler: {
            directory:   { path: Path.resolve(__dirname, '../../../../../../../../../../../mnt/mol/STS') }
        },
        app: {
            name: 'originalSTS'
        }
    },
    originalSTSA: {
        handler: {
            directory:   { path: Path.resolve(__dirname, '../../../../../../../../../../../mnt/mol/STSA') }
        },
        app: {
            name: 'originalSTSA'
        }
    },
    originalOLD: {
        handler: {
            directory:   { path: Path.resolve(__dirname, '../../../../../../../../../../../mnt/oldmol/Images') }
        },
        app: {
            name: 'originalOLD'
        }
    },
    imagesProduct: {
        handler: {
            directory:   { path: Path.resolve(__dirname, '../../../../../../../../../../../mnt/u01/mol/images/products') }
        },
        app: {
            name: 'imagesProduct'
        }
    }
};
