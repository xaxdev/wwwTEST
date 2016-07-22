import config from '../../../config';

const gemstoneProperties = ['gemstone_id', 'gemstone_cut', 'gemstone_color', 'gemstone_clarity', 'gemstone_cost', 'gemstone_carat', 'gemstone_quantity', 'gemstone_origin', 'gemstone_symmetry', 'gemstone_fluorescence'];

const mapProperties = (item, record, exchangeRates) => {
    // add gemstone, if not existed
    if (item.gemstones.findIndex(gemstone => gemstone.id === record.gemstone_id) === -1) {
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

            gemstone.certificates = certificate;
        }

        // Check if gemstone is an empty object
        if (!!Object.keys(gemstone).length) {
            item.gemstones.push(gemstone);
        }
    }

    // add image, if not existed
    if (!!record.imageName && item.gallery.findIndex(image => image.original.match(new RegExp(`${record.imageName}.${record.imageType}$`)) !== null) === -1) {
        const image = {
            original: `${config.gallery.original}/${record.imageName}.${record.imageType}`,
            thumbnail: `${config.gallery.thumbnail}/${record.imageName}.${record.imageType}`
        };

        item.gallery.push(image);
    }

    // add certificate image, if not existed
    if (!!record.CertificateImageName) {
        const gemstone = item.gemstones.find(gemstone => gemstone.id === record.gemstone_id);

        if (gemstone && gemstone.certificate) {
            if (gemstone.certificate.images === undefined) {
                gemstone.certificate.images = [];
            }

            gemstone.certificate.images.push({
                original: `${config.gallery.original}/${record.CertificateImageName}.${record.CertificateImageType}`,
                thumbnail: `${config.gallery.thumbnail}/${record.CertificateImageName}.${record.CertificateImageType}`
            });
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

export { mapItem, mapMaster };
