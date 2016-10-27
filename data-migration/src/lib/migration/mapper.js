import config from '../../../config';

const sanitize = value => value.replace('(', '\\(').replace(')', '\\)').replace('.', '\\.');

const gemstoneProperties = ['gemstone_id', 'gemstone_cut', 'gemstone_cutName', 'gemstone_color', 'gemstone_colorName', 'gemstone_clarity', 'gemstone_clarityName', 'gemstone_cost', 'gemstone_carat', 'gemstone_quantity', 'gemstone_origin', 'gemstone_symmetry', 'gemstone_fluorescence', 'gemstone_stoneTypeId', 'gemstone_stoneTypeName', 'gemstone_type', 'gemstone_unit'];

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

    // add image, if not existed
    if (!!record.imageName && item.gallery.findIndex(image => image.original.match(new RegExp(sanitize(`${record.imageName}.${record.imageType}$`))) !== null) === -1) {
        const image = {
            original: `${config.gallery.original}/${record.imageName}.${record.imageType}`,
            thumbnail: `${config.gallery.thumbnail}/${record.imageName}.${record.imageType}`
        };

        item.gallery.push(image);
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
            calculatePrices(item, exchangeRates);
            items.push(item);
        }

        const latest = items[items.length - 1];
        mapProperties(latest, record, exchangeRates);
    }

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
            item.gallery = []
            items.push(item)
        }

        const latest = items[items.length - 1]
        mapProperties(latest, record, null)
    }

    return items
}

export { mapItem, mapMaster, mapCertificate };
