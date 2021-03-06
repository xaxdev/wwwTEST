import config from '../../../config';
import * as item from './item';
import fs from 'fs';
import moment from 'moment-timezone';

const exist = async (file) => {
    try {
        return await new Promise((resolve, reject) => {
            fs.stat(file, (err, stats) => {
                if(err == null) {
                    //Exist
                    resolve(true)
                    // return true
                } else if(err.code == 'ENOENT') {
                    // NO exist
                    resolve(false)
                    // return false
                }
            })
        })
    } catch (err) {
        throw err
    }
}

const sanitize = value => value.replace('(', '\\(').replace(')', '\\)').replace('.', '\\.');

const gemstoneProperties = ['gemstone_id', 'gemstone_cut', 'gemstone_cutName', 'gemstone_color', 'gemstone_colorName', 'gemstone_clarity', 'gemstone_clarityName', 'gemstone_cost', 'gemstone_carat', 'gemstone_quantity', 'gemstone_origin', 'gemstone_symmetry', 'gemstone_fluorescence', 'gemstone_stoneTypeId', 'gemstone_stoneTypeName', 'gemstone_type', 'gemstone_unit'];

const mapSalesProperties = async (item, record, exchangeRates) => {
    // add gemstone, if not existed
    if (!!record.gemstone_id && item.gemstones.findIndex(gemstone => gemstone.id === record.gemstone_id) === -1) {
        const gemstone = {};

        gemstoneProperties.forEach(property => {
            if (record[property] !== undefined) {
                const match = property.match(/^gemstone_(\w+)$/);
                if (match) {
                    gemstone[match[1]] = record[property];
                }
            }
        });

        // calculate cost in different currencies
        if (gemstone.cost !== undefined) {
            const exchangeRateFromUSDToHomeCurrency = exchangeRates.filter(exchangeRate => exchangeRate.from === 'USD' && exchangeRate.to === item.currency)[0];
            const records = exchangeRates.filter(exchangeRate => exchangeRate.from === item.currency);
            const cost = {};

            // costs in other currencies
            for (let record of records) {
                cost[record.to] = gemstone.cost * record.exchangeRate / 100;
            }

            // cost in USD
            if (!!exchangeRateFromUSDToHomeCurrency) {
                cost.USD = gemstone.cost * 100 / exchangeRateFromUSDToHomeCurrency.exchangeRate;
            }

            // cost in home currency
            cost[item.currency] = gemstone.cost;

            gemstone.cost = cost;
        }

        // add certificate
        if (!!record.CertificateNo) {
            const certificate = {
                number: record.CertificateNo,
                agency: record.CertificateAgency,
                site: record.CertificateWarehouse,
                issuedDate: record.CertifiedDate
            };

            gemstone.certificate = certificate;
        }

        item.gemstones.push(gemstone);
    }

    if (record.type === 'STO' && !!record.CertificateNo) {
        const certificate = {
            number: record.CertificateNo,
            agency: record.CertificateAgency,
            site: record.CertificateWarehouse,
            issuedDate: record.CertifiedDate
        };

        if (item.certificates.findIndex(current => current.number === certificate.number ) === -1) {
            item.certificates.push(certificate);
        }
    }

    if (record.type === 'STO' && !!record.lotNumber) {
        const stoneLotNumber = {
            stoneType: record.subType,
            stoneTypeName: record.subTypeName,
            cut: record.cut,
            cutName: record.cutName,
            color: record.color,
            colorName: record.colorName,
            clarity: record.clarity,
            clarityName: record.clarityName,
            lotNumber: record.lotNumber,
            lotQty: record.quantity,
            carat: record.carat,
            markup: record.markup,
            certificateNo: record.CertificateNo,
            laboratory: record.CertificateAgency,
            certifiedDate: record.CertifiedDate
        };
        item.lotNumbers.push(stoneLotNumber);
    }

    // add image, if not existed
    let fileName = encodeURIComponent(`${record.imageName}.${record.imageType}`)
    if (!!record.imageName && item.gallery.findIndex(image => image.original.match(new RegExp(sanitize(`${fileName}`))) !== null) === -1) {
        if (record.imageTypeId == 'Image') {
            if (record.isOldData == 1) {
                let imagePathExsits = `${config.gallery.oldPhysicalPath}/${record.imageName}.${record.imageType}`
                let hasFile = false;
                hasFile = await exist(imagePathExsits)
                let physicalFile = ''
                let originalFileName = ''
                // not found file
                if (!hasFile) {
                    if (record.imageType == 'JPG') {
                        fileName = encodeURIComponent(`${record.imageName}.jpg`)
                        originalFileName = `${record.imageName}.jpg`
                    } else if (record.imageType == 'jpg') {
                        fileName = encodeURIComponent(`${record.imageName}.JPG`)
                        originalFileName = `${record.imageName}.JPG`
                    }
                }else{
                    originalFileName = `${record.imageName}.${record.imageType}`
                }
                
                physicalFile = `${config.gallery.oldPhysicalFile}/${fileName}`

                const image = {
                    original: `${config.gallery.original}/${fileName}`,
                    thumbnail: `${config.gallery.thumbnail}/${fileName}`,
                    company: `${record.imageCompany}`,
                    defaultImage: `${record.defaultImage}`,
                    lastModifiedDateImage: `${record.lastModifiedDateImage}`,
                    physicalFile: physicalFile,
                    physicalCompany: !hasFile? 'mme': record.imageCompany.toLowerCase(),
                    originalFileName: originalFileName
                };
                item.gallery.push(image);
            } else {
                let imagePathExsits = `${config.gallery.physicalpath}/${record.imageCompany.toUpperCase()}/${record.imageName}.${record.imageType}`
                let hasFile = false;
                hasFile = await exist(imagePathExsits)
                let physicalFile = `${config.gallery.physicalfile}/${record.imageCompany.toLowerCase()}/${fileName}`
                if (!hasFile) {
                    physicalFile = `${config.gallery.physicalfile}/mme/${fileName}`
                }
                const image = {
                    original: `${config.gallery.original}/${fileName}`,
                    thumbnail: `${config.gallery.thumbnail}/${fileName}`,
                    company: `${record.imageCompany}`,
                    defaultImage: `${record.defaultImage}`,
                    lastModifiedDateImage: `${record.lastModifiedDateImage}`,
                    physicalFile: physicalFile,
                    physicalCompany: !hasFile? 'mme': record.imageCompany.toLowerCase(),
                    originalFileName: `${record.imageName}.${record.imageType}`
                };
                item.gallery.push(image);
            }            
        }
    }

    // add COA, if not existed
    const imageOtherName = record.imageOtherName
    const imageOtherType = !!record.imageOtherType? record.imageOtherType: ''
    const imageOtherTypeId = !!record.imageOtherTypeId ? record.imageOtherTypeId: ''
    const imageOtherCompany = !!record.imageOtherCompany? record.imageOtherCompany: ''
    const fileNameOtherDB = !!imageOtherName? `${imageOtherName}.${imageOtherType}`: ''
    const fileNameOther =  encodeURIComponent(fileNameOtherDB)

    if (!!imageOtherName && item.imagesCOA.findIndex(image => image.original.match(new RegExp(sanitize(`${fileNameOther}`))) !== null) === -1) {
        if (imageOtherTypeId == 'COA') {
            const image = {
                original: `${config.gallery.original}/${fileNameOther}`,
                thumbnail: `${config.gallery.thumbnail}/${fileNameOther}`,
                physicalFile: `${config.gallery.physicalfile}/${imageOtherCompany}/${fileNameOther}`,
                originalFileName: `${imageOtherName}.${imageOtherType}`
            };

            item.imagesCOA.push(image);
        }
    }

    // add DBC, if not existed
    if (!!imageOtherName && item.imagesDBC.findIndex(image => image.original.match(new RegExp(sanitize(`${fileNameOther}`))) !== null) === -1) {
        if (imageOtherTypeId == 'DBC') {
            const image = {
                original: `${config.gallery.original}/${fileNameOther}`,
                thumbnail: `${config.gallery.thumbnail}/${fileNameOther}`,
                physicalFile: `${config.gallery.physicalfile}/${imageOtherCompany}/${fileNameOther}`,
                originalFileName: `${imageOtherName}.${imageOtherType}`
            };

            item.imagesDBC.push(image);
        }
    }

    // add Monograph, if not existed
    if (!!imageOtherName && item.filesMonograph.findIndex(image => image.original.match(new RegExp(sanitize(`${fileNameOther}`))) !== null) === -1) {
        if (imageOtherTypeId == 'Monograph') {
            const image = {
                original: `${config.gallery.original}/${fileNameOther}`,
                thumbnail: `${config.gallery.thumbnail}/${fileNameOther}`,
                physicalFile: `${config.gallery.physicalfile}/${imageOtherCompany}/${fileNameOther}`,
                originalFileName: `${imageOtherName}.${imageOtherType}`
            };

            item.filesMonograph.push(image);
        }
    }

    // add certificate image, if not existed
    const fileNameCertificate = encodeURIComponent(`${record.CertificateImageName}.${record.CertificateImageType}`)
    if (!!record.CertificateImageName) {
        let imagePathExsits = `${config.gallery.physicalpath}/${record.CertificateImageCompany.toUpperCase()}/${fileNameCertificate}`
        let hasFile = false;
        hasFile = await exist(imagePathExsits)
        let physicalFile = `${config.gallery.physicalfile}/${record.CertificateImageCompany.toLowerCase()}/${fileNameCertificate}`
        if (!hasFile) {
            physicalFile = `${config.gallery.physicalfile}/mme/$${fileNameCertificate}`
        }
        const image = {
            original: `${config.gallery.original}/${fileNameCertificate}`,
            thumbnail: `${config.gallery.thumbnail}/${fileNameCertificate}`,
            defaultImage: `${record.certificateDefaultImage}`,
            lastModifiedDateImage: `${record.certificateLastModifiedDateImage}`,
            physicalFile: physicalFile,
            physicalCompany: !hasFile? 'mme': record.CertificateImageCompany.toLowerCase(),
            originalFileName: `${record.CertificateImageName}.${record.CertificateImageType}`
        }

        if (record.type === 'STO') {
            const certificate = item.certificates.find(certificate => certificate.number === record.CertificateNo);

            if (!!certificate) {
                if (certificate.images === undefined) {
                    certificate.images = [];
                }

                if (certificate.images.findIndex(image => image.original.match(new RegExp(sanitize(`${fileNameCertificate}`))) !== null) === -1) {
                    certificate.images.push(image);
                }
            }
        } else {
            const gemstone = item.gemstones.find(gemstone => gemstone.id === record.gemstone_id);

            if (gemstone && gemstone.certificate) {
                if (gemstone.certificate.images === undefined) {
                    gemstone.certificate.images = [];
                }

                if (gemstone.certificate.images.findIndex(image => image.original.match(new RegExp(sanitize(`${fileNameCertificate}`))) !== null) === -1) {
                    gemstone.certificate.images.push(image);
                }
            }
        }
    }

    item.customerSearch = item.customer + ' ' +  item.customerName + ' ' +  item.customerEmail + ' ' +  item.customerPhone

    gemstoneProperties.forEach(property => {
        if (item[property] !== undefined) {
            delete item[property];
        }
    });

    if (item.imageName !== undefined) {
      delete item.imageName;
    }

    if (item.imageTypeId !== undefined) {
      delete item.imageTypeId
    }

    if (item.imageCompany !== undefined) {
      delete item.imageCompany
    }

    if (item.imageType !== undefined) {
      delete item.imageType
    }

    if (item.CertificateNo !== undefined) {
        delete item.CertificateNo;
    }

    if (item.CertificateAgency !== undefined) {
        delete item.CertificateAgency;
    }

    if (item.CertificateWarehouse !== undefined) {
        delete item.CertificateWarehouse;
    }

    if (item.CertifiedDate !== undefined) {
        delete item.CertifiedDate;
    }

    if (item.CertificateImageName !== undefined) {
        delete item.CertificateImageName;
    }

    if (item.CertificateImageType !== undefined) {
        delete item.CertificateImageType;
    }
}

const mapProperties = async (item, record, exchangeRates) => {
    // add gemstone, if not existed
    if (!!record.gemstone_id && item.gemstones.findIndex(gemstone => gemstone.id === record.gemstone_id) === -1) {
        const gemstone = {};

        gemstoneProperties.forEach(property => {
            if (record[property] !== undefined) {
                const match = property.match(/^gemstone_(\w+)$/);
                if (match) {
                    gemstone[match[1]] = record[property];
                }
            }
        });

        // calculate cost in different currencies
        if (gemstone.cost !== undefined) {
            const exchangeRateFromUSDToHomeCurrency = exchangeRates.filter(exchangeRate => exchangeRate.from === 'USD' && exchangeRate.to === item.currency)[0];
            const records = exchangeRates.filter(exchangeRate => exchangeRate.from === item.currency);
            const cost = {};

            // costs in other currencies
            for (let record of records) {
                cost[record.to] = gemstone.cost * record.exchangeRate / 100;
            }

            // cost in USD
            if (!!exchangeRateFromUSDToHomeCurrency) {
                cost.USD = gemstone.cost * 100 / exchangeRateFromUSDToHomeCurrency.exchangeRate;
            }

            // cost in home currency
            cost[item.currency] = gemstone.cost;

            gemstone.cost = cost;
        }

        // add certificate
        if (!!record.CertificateNo) {
            const certificate = {
                number: record.CertificateNo,
                agency: record.CertificateAgency,
                site: record.CertificateWarehouse,
                issuedDate: record.CertifiedDate
            };

            gemstone.certificate = certificate;
        }

        item.gemstones.push(gemstone);
    }

    if (record.type === 'STO' && !!record.CertificateNo) {
        const certificate = {
            number: record.CertificateNo,
            agency: record.CertificateAgency,
            site: record.CertificateWarehouse,
            issuedDate: record.CertifiedDate
        };

        if (item.certificates.findIndex(current => current.number === certificate.number ) === -1) {
            item.certificates.push(certificate);
        }
    }

    if (record.type === 'STO' && !!record.lotNumber) {
        const stoneLotNumber = {
            stoneType: record.subType,
            stoneTypeName: record.subTypeName,
            cut: record.cut,
            cutName: record.cutName,
            color: record.color,
            colorName: record.colorName,
            clarity: record.clarity,
            clarityName: record.clarityName,
            lotNumber: record.lotNumber,
            lotQty: record.quantity,
            carat: record.carat,
            markup: record.markup,
            certificateNo: record.CertificateNo,
            laboratory: record.CertificateAgency,
            certifiedDate: record.CertifiedDate
        };
        item.lotNumbers.push(stoneLotNumber);
    }

    // add image, if not existed
    const fileName = encodeURIComponent(`${record.imageName}.${record.imageType}`)
    if (!!record.imageName && item.gallery.findIndex(image => image.original.match(new RegExp(sanitize(`${fileName}`))) !== null) === -1) {
        if (record.imageTypeId == 'Image') {
            let imagePathExsits = `${config.gallery.physicalpath}/${record.imageCompany.toUpperCase()}/${fileName}`;
            let hasFile = false;
            hasFile = await exist(imagePathExsits)
            let physicalFile = `${config.gallery.physicalfile}/${record.imageCompany.toLowerCase()}/${fileName}`
            if (!hasFile) {
                physicalFile = `${config.gallery.physicalfile}/mme/${fileName}`
            }
            const image = {
                original: `${config.gallery.original}/${fileName}`,
                thumbnail: `${config.gallery.thumbnail}/${fileName}`,
                company: `${record.imageCompany}`,
                defaultImage: `${record.defaultImage}`,
                lastModifiedDateImage: `${record.lastModifiedDateImage}`,
                physicalFile: physicalFile,
                physicalCompany: !hasFile? 'mme': record.imageCompany.toLowerCase(),
                originalFileName: `${record.imageName}.${record.imageType}`
            };
            item.gallery.push(image);
        }
    }

    // add COA, if not existed
    const imageOtherName = record.imageOtherName
    const imageOtherType = !!record.imageOtherType? record.imageOtherType: ''
    const imageOtherTypeId = !!record.imageOtherTypeId ? record.imageOtherTypeId: ''
    const imageOtherCompany = !!record.imageOtherCompany? record.imageOtherCompany: ''
    const fileNameOtherDB = !!imageOtherName? `${imageOtherName}.${imageOtherType}`: ''
    const fileNameOther =  encodeURIComponent(fileNameOtherDB)

    // const fileNameOther = encodeURIComponent(`${record.imageOtherName}.${record.imageOtherType}`)
    if (!!imageOtherName && item.imagesCOA.findIndex(image => image.original.match(new RegExp(sanitize(`${fileNameOther}`))) !== null) === -1) {
        if (imageOtherTypeId == 'COA') {
            const image = {
                original: `${config.gallery.original}/${fileNameOther}`,
                thumbnail: `${config.gallery.thumbnail}/${fileNameOther}`,
                physicalFile: `${config.gallery.physicalfile}/${imageOtherCompany}/${fileNameOther}`,
                originalFileName: `${imageOtherName}.${imageOtherType}`
            };
            item.imagesCOA.push(image);
        }
    }

    // add DBC, if not existed
    if (!!imageOtherName && item.imagesDBC.findIndex(image => image.original.match(new RegExp(sanitize(`${fileNameOther}`))) !== null) === -1) {
        if (imageOtherTypeId == 'DBC') {
            const image = {
                original: `${config.gallery.original}/${fileNameOther}`,
                thumbnail: `${config.gallery.thumbnail}/${fileNameOther}`,
                physicalFile: `${config.gallery.physicalfile}/${imageOtherCompany}/${fileNameOther}`,
                originalFileName: `${imageOtherName}.${imageOtherType}`
            };
            item.imagesDBC.push(image);
        }
    }

    // add Monograph, if not existed
    if (!!imageOtherName && item.filesMonograph.findIndex(image => image.original.match(new RegExp(sanitize(`${fileNameOther}`))) !== null) === -1) {
        if (imageOtherTypeId == 'Monograph') {
            const image = {
                original: `${config.gallery.original}/${fileNameOther}`,
                thumbnail: `${config.gallery.thumbnail}/${fileNameOther}`,
                physicalFile: `${config.gallery.physicalfile}/${imageOtherCompany}/${fileNameOther}`,
                originalFileName: `${imageOtherName}.${imageOtherType}`
            };
            item.filesMonograph.push(image);
        }
    }

    // add Bom, if not existed
    const bomDocName = record.bomDocName
    const bomDocType = !!record.bomDocType? record.bomDocType: ''
    const bomDocTypeId = !!record.bomDocTypeId ? record.bomDocTypeId: ''
    const bomDocCompany = !!record.bomDocCompany? record.bomDocCompany: ''
    const fileNameDB = !!bomDocName? `${bomDocName}.${bomDocType}`: ''
    const fileNameBom =  encodeURIComponent(fileNameDB)
    // if (!!record.bomDocName && item.filesBom.findIndex(image => image.original.match(new RegExp(sanitize(`${fileNameBom}`))) !== null) === -1) {
    if (!!bomDocName && item.filesBom.findIndex(image => image.original.match(new RegExp(sanitize(`${fileNameBom}`))) !== null) === -1) {
        if (bomDocTypeId == 'File') {
            const image = {
                original: `${config.gallery.original}/${fileNameBom}`,
                thumbnail: `${config.gallery.thumbnail}/${fileNameBom}`,
                physicalFile: `${config.gallery.physicalfile}/${bomDocCompany}/${fileNameBom}`,
                originalFileName: `${bomDocName}.${bomDocType}`
            };
            item.filesBom.push(image);
        }
    }

    // add certificate image, if not existed
    const fileNameCertificate = encodeURIComponent(`${record.CertificateImageName}.${record.CertificateImageType}`)
    if (!!record.CertificateImageName) {
        let imagePathExsits = `${config.gallery.physicalpath}/${record.CertificateImageCompany.toUpperCase()}/${fileNameCertificate}`
        let hasFile = false;
        hasFile = await exist(imagePathExsits)
        let physicalFile = `${config.gallery.physicalfile}/${record.CertificateImageCompany.toLowerCase()}/${fileNameCertificate}`
        if (!hasFile) {
            physicalFile = `${config.gallery.physicalfile}/mme/${fileNameCertificate}`
        }
        const image = {
            original: `${config.gallery.original}/${fileNameCertificate}`,
            thumbnail: `${config.gallery.thumbnail}/${fileNameCertificate}`,
            defaultImage: `${record.certificateDefaultImage}`,
            lastModifiedDateImage: `${record.certificateLastModifiedDateImage}`,
            physicalFile: physicalFile,
            physicalCompany: !hasFile? 'mme': record.CertificateImageCompany.toLowerCase(),
            originalFileName: `${record.CertificateImageName}.${record.CertificateImageType}`
        }

        if (record.type === 'STO') {
            const certificate = item.certificates.find(certificate => certificate.number === record.CertificateNo);

            if (!!certificate) {
                if (certificate.images === undefined) {
                    certificate.images = [];
                }
                if (certificate.images.findIndex(image => image.original.match(new RegExp(sanitize(`${fileNameCertificate}`))) !== null) === -1) {
                    certificate.images.push(image);
                }
            }
        } else {
            const gemstone = item.gemstones.find(gemstone => gemstone.id === record.gemstone_id);

            if (gemstone && gemstone.certificate) {
                if (gemstone.certificate.images === undefined) {
                    gemstone.certificate.images = [];
                }
                if (gemstone.certificate.images.findIndex(image => image.original.match(new RegExp(sanitize(`${fileNameCertificate}`))) !== null) === -1) {
                    gemstone.certificate.images.push(image);
                }
            }
        }
    }

    // add setName
    if (record.type === 'JLY') {
        item.setName = (record.romanceNote != '' || record.romanceNote != '') ? `${record.romanceNote} ${record.viewSetName}` : ''
    }

    gemstoneProperties.forEach(property => {
        if (item[property] !== undefined) {
            delete item[property];
        }
    });

    if (item.imageName !== undefined) {
      delete item.imageName;
    }

    if (item.imageType !== undefined) {
      delete item.imageType
    }

    if (item.CertificateNo !== undefined) {
        delete item.CertificateNo;
    }

    if (item.CertificateAgency !== undefined) {
        delete item.CertificateAgency;
    }

    if (item.CertificateWarehouse !== undefined) {
        delete item.CertificateWarehouse;
    }

    if (item.CertifiedDate !== undefined) {
        delete item.CertifiedDate;
    }

    if (item.CertificateImageName !== undefined) {
        delete item.CertificateImageName;
    }

    if (item.CertificateImageType !== undefined) {
        delete item.CertificateImageType;
    }

    if (item.romanceNote !== undefined) {
      delete item.romanceNote;
    }

    if (item.viewSetName !== undefined) {
      delete item.viewSetName;
    }
};

const mapPropertiesImagesMME = async (item, record, exchangeRates) => {

    // add COA, if not existed
    const imageOtherName = record.imageOtherNameMME
    const imageOtherType = record.imageOtherTypeMME
    const imageOtherTypeId = record.imageOtherTypeIdMME
    const imageOtherCompany = record.imageOtherCompanyMME
    const fileNameOtherDB = !!imageOtherName? `${imageOtherName}.${imageOtherType}`: ''
    const fileNameOther =  encodeURIComponent(fileNameOtherDB)

    // const fileNameOther = encodeURIComponent(`${record.imageOtherName}.${record.imageOtherType}`)
    if (!!imageOtherName && item.imagesCOA.findIndex(image => image.original.match(new RegExp(sanitize(`${fileNameOther}`))) !== null) === -1) {
        if (imageOtherTypeId == 'COA') {
            const image = {
                original: `${config.gallery.original}/${fileNameOther}`,
                thumbnail: `${config.gallery.thumbnail}/${fileNameOther}`,
                physicalFile: `${config.gallery.physicalfile}/${imageOtherCompany}/${fileNameOther}`,
                originalFileName: `${imageOtherName}.${imageOtherType}`
            };
            item.imagesCOA.push(image);
        }
    }

    // add DBC, if not existed
    if (!!imageOtherName && item.imagesDBC.findIndex(image => image.original.match(new RegExp(sanitize(`${fileNameOther}`))) !== null) === -1) {
        if (imageOtherTypeId == 'DBC') {
            const image = {
                original: `${config.gallery.original}/${fileNameOther}`,
                thumbnail: `${config.gallery.thumbnail}/${fileNameOther}`,
                physicalFile: `${config.gallery.physicalfile}/${imageOtherCompany}/${fileNameOther}`,
                originalFileName: `${imageOtherName}.${imageOtherType}`
            };
            item.imagesDBC.push(image);
        }
    }

    // add Monograph, if not existed
    if (!!imageOtherName && item.filesMonograph.findIndex(image => image.original.match(new RegExp(sanitize(`${fileNameOther}`))) !== null) === -1) {
        if (imageOtherTypeId == 'Monograph') {
            const image = {
                original: `${config.gallery.original}/${fileNameOther}`,
                thumbnail: `${config.gallery.thumbnail}/${fileNameOther}`,
                physicalFile: `${config.gallery.physicalfile}/${imageOtherCompany}/${fileNameOther}`,
                originalFileName: `${imageOtherName}.${imageOtherType}`
            };
            item.filesMonograph.push(image);
        }
    }

    // add Bom, if not existed
    const bomDocName = record.bomDocNameMME
    const bomDocType = record.bomDocTypeMME
    const bomDocTypeId = record.bomDocTypeIdMME
    const bomDocCompany = record.bomDocCompanyMME
    const fileNameDB = !!bomDocName? `${bomDocName}.${bomDocType}`: ''
    const fileNameBom =  encodeURIComponent(fileNameDB)
    // if (!!record.bomDocName && item.filesBom.findIndex(image => image.original.match(new RegExp(sanitize(`${fileNameBom}`))) !== null) === -1) {
    if (!!bomDocName && item.filesBom.findIndex(image => image.original.match(new RegExp(sanitize(`${fileNameBom}`))) !== null) === -1) {
        if (bomDocTypeId == 'File') {
            const image = {
                original: `${config.gallery.original}/${fileNameBom}`,
                thumbnail: `${config.gallery.thumbnail}/${fileNameBom}`,
                physicalFile: `${config.gallery.physicalfile}/${bomDocCompany}/${fileNameBom}`,
                originalFileName: `${bomDocName}.${bomDocType}`
            };
            item.filesBom.push(image);
        }
    }

    // add setName
    if (record.type === 'JLY') {
        item.setName = (record.romanceNote != '' || record.romanceNote != '') ? `${record.romanceNote} ${record.viewSetName}` : ''
    }

    if (item.romanceNote !== undefined) {
      delete item.romanceNote;
    }

    if (item.viewSetName !== undefined) {
      delete item.viewSetName;
    }
};

const mapPropertiesImagesMMESoldItem = async (item, record, exchangeRates) => {

    // add COA, if not existed
    const imageOtherName = record.imageOtherNameMME
    const imageOtherType = record.imageOtherTypeMME
    const imageOtherTypeId = record.imageOtherTypeIdMME
    const imageOtherCompany = record.imageOtherCompanyMME
    const fileNameOtherDB = !!imageOtherName? `${imageOtherName}.${imageOtherType}`: ''
    const fileNameOther =  encodeURIComponent(fileNameOtherDB)

    // const fileNameOther = encodeURIComponent(`${record.imageOtherName}.${record.imageOtherType}`)
    if (!!imageOtherName && item.imagesCOA.findIndex(image => image.original.match(new RegExp(sanitize(`${fileNameOther}`))) !== null) === -1) {
        if (imageOtherTypeId == 'COA') {
            const image = {
                original: `${config.gallery.original}/${fileNameOther}`,
                thumbnail: `${config.gallery.thumbnail}/${fileNameOther}`,
                physicalFile: `${config.gallery.physicalfile}/${imageOtherCompany}/${fileNameOther}`,
                originalFileName: `${imageOtherName}.${imageOtherType}`
            };
            item.imagesCOA.push(image);
        }
    }

    // add DBC, if not existed
    if (!!imageOtherName && item.imagesDBC.findIndex(image => image.original.match(new RegExp(sanitize(`${fileNameOther}`))) !== null) === -1) {
        if (imageOtherTypeId == 'DBC') {
            const image = {
                original: `${config.gallery.original}/${fileNameOther}`,
                thumbnail: `${config.gallery.thumbnail}/${fileNameOther}`,
                physicalFile: `${config.gallery.physicalfile}/${imageOtherCompany}/${fileNameOther}`,
                originalFileName: `${imageOtherName}.${imageOtherType}`
            };
            item.imagesDBC.push(image);
        }
    }

    // add Monograph, if not existed
    if (!!imageOtherName && item.filesMonograph.findIndex(image => image.original.match(new RegExp(sanitize(`${fileNameOther}`))) !== null) === -1) {
        if (imageOtherTypeId == 'Monograph') {
            const image = {
                original: `${config.gallery.original}/${fileNameOther}`,
                thumbnail: `${config.gallery.thumbnail}/${fileNameOther}`,
                physicalFile: `${config.gallery.physicalfile}/${imageOtherCompany}/${fileNameOther}`,
                originalFileName: `${imageOtherName}.${imageOtherType}`
            };
            item.filesMonograph.push(image);
        }
    }

    // add setName
    if (record.type === 'JLY') {
        item.setName = (record.romanceNote != '' || record.romanceNote != '') ? `${record.romanceNote} ${record.viewSetName}` : ''
    }

    if (item.romanceNote !== undefined) {
      delete item.romanceNote;
    }

    if (item.viewSetName !== undefined) {
      delete item.viewSetName;
    }
};

const mapPropertiesLotNumber = (item, record, exchangeRates) => {
    gemstoneProperties.forEach(property => {
        if (item[property] !== undefined) {
            delete item[property];
        }
    });

    if (item.imageName !== undefined) {
      delete item.imageName;
    }

    if (item.imageType !== undefined) {
      delete item.imageType
    }

    if (item.CertificateNo !== undefined) {
        delete item.CertificateNo;
    }

    if (item.CertificateAgency !== undefined) {
        delete item.CertificateAgency;
    }

    if (item.CertificateWarehouse !== undefined) {
        delete item.CertificateWarehouse;
    }

    if (item.CertifiedDate !== undefined) {
        delete item.CertifiedDate;
    }

    if (item.CertificateImageName !== undefined) {
        delete item.CertificateImageName;
    }

    if (item.CertificateImageType !== undefined) {
        delete item.CertificateImageType;
    }
};

const calculatePrices = (item, exchangeRates) => {
    const actualCost = {};
    const updatedCost = {};
    const price = {};
    const exchangeRateFromUSDToHomeCurrency = exchangeRates.filter(exchangeRate => exchangeRate.from === 'USD' && exchangeRate.to === item.currency)[0];
    const records = exchangeRates.filter(exchangeRate => exchangeRate.from === item.currency);

    // costs & price in other currencies
    for (let record of records) {
        actualCost[record.to] = item.actualCost * record.exchangeRate / 100;
        updatedCost[record.to] = item.updatedCost * record.exchangeRate / 100;
        price[record.to] = item.price * record.exchangeRate / 100;
    }

    // costs & price in USD
    if (!!exchangeRateFromUSDToHomeCurrency) {
        actualCost.USD = item.actualCost * 100 / exchangeRateFromUSDToHomeCurrency.exchangeRate;
        updatedCost.USD = item.updatedCost * 100 / exchangeRateFromUSDToHomeCurrency.exchangeRate;
        price.USD = item.price * 100 / exchangeRateFromUSDToHomeCurrency.exchangeRate;
    }

    // costs & price in home currency
    actualCost[item.currency] = item.actualCost;
    updatedCost[item.currency] = item.updatedCost;
    price[item.currency] = item.price;

    item.actualCost = actualCost;
    item.updatedCost = updatedCost;
    item.price = price;
};

const calculateSalesPrices = (item, exchangeRates) => {
    const actualCost = {};
    const updatedCost = {};
    const price = {};
    const netAmount = {};
    const margin = {};
    let marginPercent = 0;
    let discountPercent = 0;
    const exchangeRateFromUSDToHomeCurrency = exchangeRates.filter(exchangeRate => exchangeRate.from === 'USD' && exchangeRate.to === item.currency)[0];
    const records = exchangeRates.filter(exchangeRate => exchangeRate.from === item.currency);

    // costs & price in USD
    actualCost.USD = item.actualCost;
    updatedCost.USD = item.updatedCost;
    price.USD = item.price;
    netAmount.USD = item.netAmount;
    margin.USD = item.margin;
    marginPercent = (item.margin/item.netAmount)*100;
    discountPercent = item.discPercent == 0 ? (item.discountAmountUSD/item.price)*100 : item.discPercent;

    item.actualCost = actualCost;
    item.updatedCost = updatedCost;
    item.price = price;
    item.netAmount = netAmount;
    item.margin = margin;
    item.marginPercent = marginPercent;
    item.discountPercent = discountPercent;
};

const filterImages = async (items) => {
    items.map((item) => {
        if (item.gallery.length > 1) {
            const finndMME = item.gallery.findIndex(image => image.company === 'mme');
            let image = [];
            // found MME in gallery
            if (finndMME !== -1) {
                image = item.gallery.filter(image => image.company === 'mme');
                item.gallery = image;
            }
        }
    });
};

const mapItem = async (recordset, exchangeRates) => {
    const items = [];
    let id = 0;

    for (let record of recordset) {
        if (id != record.id) {
            id = Number(record.id);
            const item = {...record};
            item.gemstones = [];
            item.gallery = [];
            item.certificates = [];
            item.imagesCOA = [];
            item.imagesDBC = [];
            item.filesMonograph = [];
            item.filesBom = [];
            calculatePrices(item, exchangeRates);
            items.push(item);
        }

        const latest = items[items.length - 1];
        await mapProperties(latest, record, exchangeRates)
    }
    await filterImages(items);

    return items;
};

const mapMaster = async recordset => {
    const records = [];
    let id = 0;

    for (let record of recordset) {
      id++;
      const row = {
        ...record,
        id
      };
      records.push(row);
    }

    return records;
};

const mapCertificate = async recordset => {
    const items = []
    let id = 0

    for (let record of recordset) {
        if (id != record.id) {
            id = Number(record.id)
            const item = {...record}
            item.gallery = [];
            item.imagesCOA = [];
            item.imagesDBC = [];
            item.filesMonograph = [];
            item.filesBom = [];
            items.push(item)
        }

        const latest = items[items.length - 1]
        mapProperties(latest, record, null)
    }

    return items
}

const mapStoneItem = async (recordset, exchangeRates) => {
    const items = [];
    let id = 0;

    for (let record of recordset) {
        if (id != record.id) {
            id = Number(record.id);
            const item = {...record};
            item.gemstones = [];
            item.gallery = [];
            item.certificates = [];
            item.lotNumbers = [];
            item.imagesCOA = [];
            item.imagesDBC = [];
            item.filesMonograph = [];
            item.filesBom = [];
            calculatePrices(item, exchangeRates);
            items.push(item);
        }
        const latest = items[items.length - 1];
        mapProperties(latest, record, exchangeRates);
    }

    return items;
};

const mapStoneLotNumber = async (recordset, exchangeRates) => {
    const lotNumbers = [];
    let id = 0;

    for (let record of recordset) {
        const item = {...record};
        calculatePrices(item, exchangeRates);
        lotNumbers.push(item);

        const latest = lotNumbers[lotNumbers.length - 1];
        mapPropertiesLotNumber(latest, record, exchangeRates);
    }

    return lotNumbers;
};

const mapMovement = async (recordset) => {
    const movements = [];

    for (let record of recordset) {
        const movement = {...record};
        movements.push(movement);
    }

    return movements;
};

const mapSoldItem = async (recordset, exchangeRates) => {
    const soldItems = [];
    let id = 0;

    for (let record of recordset)  {
        if (id != record.id) {

            exchangeRates = exchangeRates.filter((item) => {
                return item.fromDate <= record.invoiceDate && item.toDate >= record.invoiceDate
            });

            id = Number(record.id);
            const soldItem = {...record};
            soldItem.gemstones = [];
            soldItem.gallery = [];
            soldItem.certificates = [];
            soldItem.imagesCOA = [];
            soldItem.imagesDBC = [];
            soldItem.filesMonograph = [];
            soldItem.filesBom = [];
            soldItem.customerNameFullTextSearch = record.customerName;
            soldItem.customerNameSplitTextSearch = record.customerName;
            calculateSalesPrices(soldItem, exchangeRates);
            soldItems.push(soldItem);
        }

        const latest = soldItems[soldItems.length - 1];
        await mapSalesProperties(latest, record, exchangeRates);
    }

    await filterImages(soldItems);

    return soldItems;
};

const mapImage = async (recordset, exchangeRates) => {
    const items = [];
    let id = 0;

    for (let record of recordset) {
        if (id != record.id) {
            id = Number(record.id);
            const item = {...record};
            item.gallery = [];
            item.imagesCOA = [];
            item.imagesDBC = [];
            item.filesMonograph = [];
            item.filesBom = [];
            calculatePrices(item, exchangeRates);
            items.push(item);
        }

        const latest = items[items.length - 1];
        await mapPropertiesImagesMME(latest, record, exchangeRates)
    }
    await filterImages(items);

    return items;
};

const mapImageSoldItem = async (recordset, exchangeRates) => {
    const items = [];
    let id = 0;

    for (let record of recordset) {
        if (id != record.id) {
            id = Number(record.id);
            const item = {...record};
            item.gallery = [];
            item.imagesCOA = [];
            item.imagesDBC = [];
            item.filesMonograph = [];
            item.filesBom = [];
            calculatePrices(item, exchangeRates);
            items.push(item);
        }

        const latest = items[items.length - 1];
        await mapPropertiesImagesMMESoldItem(latest, record, exchangeRates)
    }
    await filterImages(items);

    return items;
};

export { mapItem, mapMaster, mapCertificate, mapStoneItem, mapStoneLotNumber, mapMovement, mapSoldItem, mapImage, mapImageSoldItem };
