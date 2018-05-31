import config from '../../../config';

const sanitize = value => value.replace('(', '\\(').replace(')', '\\)').replace('.', '\\.');

const gemstoneProperties = ['gemstone_id', 'gemstone_cut', 'gemstone_cutName', 'gemstone_color', 'gemstone_colorName', 'gemstone_clarity', 'gemstone_clarityName', 'gemstone_cost', 'gemstone_carat', 'gemstone_quantity', 'gemstone_origin', 'gemstone_symmetry', 'gemstone_fluorescence', 'gemstone_stoneTypeId', 'gemstone_stoneTypeName', 'gemstone_type', 'gemstone_unit'];

const mapSalesProperties = (item, record, exchangeRates) => {
    // add image, if not existed
    if (!!record.imageName && item.gallery.findIndex(image => image.original.match(new RegExp(sanitize(`${record.imageName}.${record.imageType}$`))) !== null) === -1) {
        if (record.imageTypeId == 'Image') {
            const image = {
                original: `${config.gallery.original}/${record.imageName}.${record.imageType}`,
                thumbnail: `${config.gallery.thumbnail}/${record.imageName}.${record.imageType}`,
                conpany: `${record.imageCompany}`
            };

            item.gallery.push(image);
        }
    }

    // add COA, if not existed
    if (!!record.imageName && item.imagesCOA.findIndex(image => image.original.match(new RegExp(sanitize(`${record.imageName}.${record.imageType}$`))) !== null) === -1) {
        if (record.imageTypeId == 'COA') {
            const image = {
                original: `${config.gallery.original}/${record.imageName}.${record.imageType}`,
                thumbnail: `${config.gallery.thumbnail}/${record.imageName}.${record.imageType}`
            };

            item.imagesCOA.push(image);
        }
    }

    // add DBC, if not existed
    if (!!record.imageName && item.imagesDBC.findIndex(image => image.original.match(new RegExp(sanitize(`${record.imageName}.${record.imageType}$`))) !== null) === -1) {
        if (record.imageTypeId == 'DBC') {
            const image = {
                original: `${config.gallery.original}/${record.imageName}.${record.imageType}`,
                thumbnail: `${config.gallery.thumbnail}/${record.imageName}.${record.imageType}`
            };

            item.imagesDBC.push(image);
        }
    }

    // add Monograph, if not existed
    if (!!record.imageName && item.filesMonograph.findIndex(image => image.original.match(new RegExp(sanitize(`${record.imageName}.${record.imageType}$`))) !== null) === -1) {
        if (record.imageTypeId == 'Monograph') {
            const image = {
                original: `${config.gallery.original}/${record.imageName}.${record.imageType}`,
                thumbnail: `${config.gallery.thumbnail}/${record.imageName}.${record.imageType}`
            };

            item.filesMonograph.push(image);
        }
    }

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
}
const mapProperties = (item, record, exchangeRates) => {
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
    if (!!record.imageName && item.gallery.findIndex(image => image.original.match(new RegExp(sanitize(`${record.imageName}.${record.imageType}$`))) !== null) === -1) {
        if (record.imageTypeId == 'Image') {
            const image = {
                original: `${config.gallery.original}/${record.imageName}.${record.imageType}`,
                thumbnail: `${config.gallery.thumbnail}/${record.imageName}.${record.imageType}`,
                conpany: `${record.imageCompany}`
            };

            item.gallery.push(image);
        }
    }

    // add COA, if not existed
    if (!!record.imageName && item.imagesCOA.findIndex(image => image.original.match(new RegExp(sanitize(`${record.imageName}.${record.imageType}$`))) !== null) === -1) {
        if (record.imageTypeId == 'COA') {
            const image = {
                original: `${config.gallery.original}/${record.imageName}.${record.imageType}`,
                thumbnail: `${config.gallery.thumbnail}/${record.imageName}.${record.imageType}`
            };

            item.imagesCOA.push(image);
        }
    }

    // add DBC, if not existed
    if (!!record.imageName && item.imagesDBC.findIndex(image => image.original.match(new RegExp(sanitize(`${record.imageName}.${record.imageType}$`))) !== null) === -1) {
        if (record.imageTypeId == 'DBC') {
            const image = {
                original: `${config.gallery.original}/${record.imageName}.${record.imageType}`,
                thumbnail: `${config.gallery.thumbnail}/${record.imageName}.${record.imageType}`
            };

            item.imagesDBC.push(image);
        }
    }

    // add Monograph, if not existed
    if (!!record.imageName && item.filesMonograph.findIndex(image => image.original.match(new RegExp(sanitize(`${record.imageName}.${record.imageType}$`))) !== null) === -1) {
        if (record.imageTypeId == 'Monograph') {
            const image = {
                original: `${config.gallery.original}/${record.imageName}.${record.imageType}`,
                thumbnail: `${config.gallery.thumbnail}/${record.imageName}.${record.imageType}`
            };

            item.filesMonograph.push(image);
        }
    }

    // add certificate image, if not existed
    if (!!record.CertificateImageName) {
        const image = {
            original: `${config.gallery.original}/${record.CertificateImageName}.${record.CertificateImageType}`,
            thumbnail: `${config.gallery.thumbnail}/${record.CertificateImageName}.${record.CertificateImageType}`
        };

        if (record.type === 'STO') {
            const certificate = item.certificates.find(certificate => certificate.number === record.CertificateNo);

            if (!!certificate) {
                if (certificate.images === undefined) {
                    certificate.images = [];
                }

                if (certificate.images.findIndex(image => image.original.match(new RegExp(sanitize(`${record.CertificateImageName}.${record.CertificateImageType}$`))) !== null) === -1) {
                    certificate.images.push(image);
                }
            }
        } else {
            const gemstone = item.gemstones.find(gemstone => gemstone.id === record.gemstone_id);

            if (gemstone && gemstone.certificate) {
                if (gemstone.certificate.images === undefined) {
                    gemstone.certificate.images = [];
                }

                if (gemstone.certificate.images.findIndex(image => image.original.match(new RegExp(sanitize(`${record.CertificateImageName}.${record.CertificateImageType}$`))) !== null) === -1) {
                    gemstone.certificate.images.push(image);
                }
            }
        }
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
};

const mapPropertiesLotNumber = (item, record, exchangeRates) => {
    // console.log(record);

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
    const exchangeRateFromUSDToHomeCurrency = exchangeRates.filter(exchangeRate => exchangeRate.from === 'USD' && exchangeRate.to === item.currency)[0];
    const records = exchangeRates.filter(exchangeRate => exchangeRate.from === item.currency);

    // costs & price in other currencies
    for (let record of records) {
        actualCost[record.to] = item.actualCost * record.exchangeRate / 100;
        updatedCost[record.to] = item.updatedCost * record.exchangeRate / 100;
        price[record.to] = item.price * record.exchangeRate / 100;
        netAmount[record.to] = item.netAmount * record.exchangeRate / 100;
        margin[record.to] = item.margin * record.exchangeRate / 100;
    }

    // costs & price in USD
    if (!!exchangeRateFromUSDToHomeCurrency) {
        actualCost.USD = item.actualCost * 100 / exchangeRateFromUSDToHomeCurrency.exchangeRate;
        updatedCost.USD = item.updatedCost * 100 / exchangeRateFromUSDToHomeCurrency.exchangeRate;
        price.USD = item.price * 100 / exchangeRateFromUSDToHomeCurrency.exchangeRate;
        netAmount.USD = item.netAmount * 100 / exchangeRateFromUSDToHomeCurrency.exchangeRate;
        margin.USD = item.margin * 100 / exchangeRateFromUSDToHomeCurrency.exchangeRate;
    }

    // costs & price in home currency
    actualCost[item.currency] = item.actualCost;
    updatedCost[item.currency] = item.updatedCost;
    price[item.currency] = item.price;
    netAmount[item.currency] = item.netAmount;
    margin[item.currency] = item.margin;

    item.actualCost = actualCost;
    item.updatedCost = updatedCost;
    item.price = price;
    item.netAmount = netAmount;
    item.margin = margin;
};

const filterImages = (items) => {
    items.map((item) => {

        if (item.gallery.length > 1) {
            const finndMME = item.gallery.findIndex(image => image.conpany === 'mme');
            let image = [];
            // found MME in gallery
            if (finndMME !== -1) {
                image = item.gallery.filter(image => image.conpany === 'mme');
                item.gallery = image;
            }
        }
    });
};

const mapItem = (recordset, exchangeRates) => {
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
            calculatePrices(item, exchangeRates);
            items.push(item);
        }

        const latest = items[items.length - 1];
        mapProperties(latest, record, exchangeRates);
    }

    filterImages(items);

    return items;
};

const mapMaster = recordset => {
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

const mapCertificate = recordset => {
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
            items.push(item)
        }

        const latest = items[items.length - 1]
        mapProperties(latest, record, null)
    }

    return items
}

const mapStoneItem = (recordset, exchangeRates) => {
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
            calculatePrices(item, exchangeRates);
            items.push(item);
        }
        const latest = items[items.length - 1];
        mapProperties(latest, record, exchangeRates);
    }

    return items;
};

const mapStoneLotNumber = (recordset, exchangeRates) => {
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

const mapMovement = (recordset) => {
    const movements = [];

    for (let record of recordset) {
        const movement = {...record};
        movements.push(movement);
    }

    return movements;
};

const mapSoldItem = (recordset, exchangeRates) => {
    const soldItems = [];
    let id = 0;

    for (let record of recordset) {
        if (id != record.id) {
            id = Number(record.id);
            const soldItem = {...record};
            soldItem.gallery = [];
            soldItem.imagesCOA = [];
            soldItem.imagesDBC = [];
            soldItem.filesMonograph = [];
            calculateSalesPrices(soldItem, exchangeRates);
            soldItems.push(soldItem);
        }

        const latest = soldItems[soldItems.length - 1];
        mapSalesProperties(latest, record, exchangeRates);
    }

    filterImages(soldItems);

    return soldItems;
};

export { mapItem, mapMaster, mapCertificate, mapStoneItem, mapStoneLotNumber, mapMovement, mapSoldItem };
