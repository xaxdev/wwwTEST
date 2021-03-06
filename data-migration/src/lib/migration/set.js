import Path from 'path'
import config from '../../../config'
import * as file from '../utils/file'
import * as constant from './constant'
import { db } from '../utils/db'
import { es } from '../utils/es';

const getitemSets = async (index, exchangeRates) => {
    try {
        console.log('Set!!!');
        const query = await file.read(Path.resolve(constant.SET_QUERY))
        const records = await db.exec(query, config.db)
        const itemSets = [];
        let description = [];
        let setImages = [];
        let setImagesName = [];
        let setReference = '';
        let reference = '';
        let setName = ''
        let setRomanceNote = ''
        for (let record of records) {
            // for each set reference
            if (record.setReference !== setReference) {
                description = [];
                setImages = [];
                setImagesName = [];
                setReference = record.setReference;
                const itemSet = {
                    reference: record.setReference,
                    description: '',
                    setName: record.setName,
                    setRomanceNote: record.setRomanceNote,
                    items: [],
                    totalActualCost: {},
                    totalUpdatedCost: {},
                    totalPrice: {},
                    markup: record.markup,
                    company: record.company,
                    companyName: record.companyName,
                    warehouse: record.warehouse,
                    warehouseName: record.warehouseName,
                    type: record.type,
                    specialDiscount: record.specialDiscount,
                    specialDiscountPercent: record.specialDiscountPercent,
                    createdDate: record.createdDate,
                    image:[]
                }

                itemSets.push(itemSet)

                // in each set reference
                if (!!record.setImageName && !!record.setImageType) {
                    // console.log(record.setImageName);
                    let isFound = setImagesName.find((image) => {
                                                    return image.name == record.setImageName;
                                                });
                    if (isFound == undefined ) {
                        setImagesName.push({name: record.setImageName});

                        setImages.push({
                            original: `${config.gallery.original}/${record.setImageName}.${record.setImageType}`,
                            thumbnail: `${config.gallery.thumbnail}/${record.setImageName}.${record.setImageType}`,
                            defaultSetImage: `${record.defaultSetImage}`,
                            lastModifiedDateSetImage: `${record.lastModifiedDateSetImage}`,
                            originalFileName: `${record.setImageName}.${record.setImageType}`
                        });

                    }
                }

                reference = record.reference
                description.push(record.reference)
                setName = record.setName
                setRomanceNote = record.setRomanceNote

                const current = itemSets[itemSets.length - 1]
                const item = {
                    id: record.id,
                    reference: record.reference,
                    itemType: record.itemType,
                    priority: record.priority,
                    description: record.description,
                    setName: record.setName,
                    setRomanceNote: record.setRomanceNote,
                    image: {
                        original: `${config.gallery.original}/${record.imageName}.${record.imageType}`,
                        thumbnail: `${config.gallery.thumbnail}/${record.imageName}.${record.imageType}`,
                        defaultImage: `${record.defaultImage}`,
                        lastModifiedDateImage: `${record.lastModifiedDateImage}`,
                        originalFileName: `${record.imageName}.${record.imageType}`
                    },
                    price: {},
                    actualCost: {},
                    updatedCost: {},
                    markup: record.markup,
                    company: record.company,
                    companyName: record.companyName,
                    warehouse: record.warehouse,
                    warehouseName: record.warehouseName,
                    venderReference: record.venderReference,
                    specialDiscount: record.specialDiscount,
                    specialDiscountPercent: record.specialDiscountPercent,
                    sku: record.sku,
                    type: record.type,
                    hierarchy: record.hierarchy,
                    grossWeight: record.grossWeight,
                    stoneDetail: record.stoneDetail,
                    createdDate: record.createdDate
                }

                const exchangeRateFromUSDToHomeCurrency = exchangeRates.filter(exchangeRate => exchangeRate.from === 'USD' && exchangeRate.to === record.currency)[0];
                const rates = exchangeRates.filter(exchangeRate => exchangeRate.from === record.currency);

                // price in other currencies
                for (let rate of rates) {
                    item.price[rate.to] = record.price * rate.exchangeRate / 100;
                    item.actualCost[rate.to] = record.actualCost * rate.exchangeRate / 100;
                    item.updatedCost[rate.to] = record.updatedCost * rate.exchangeRate / 100;
                    current.totalPrice[rate.to] = (current.totalPrice[rate.to] || 0) + item.price[rate.to];
                    current.totalActualCost[rate.to] = (current.totalActualCost[rate.to] || 0) + item.actualCost[rate.to];
                    current.totalUpdatedCost[rate.to] = (current.totalUpdatedCost[rate.to] || 0) + item.updatedCost[rate.to];
                }

                // price in USD
                if (!!exchangeRateFromUSDToHomeCurrency) {
                    item.price.USD = record.price * 100 / exchangeRateFromUSDToHomeCurrency.exchangeRate;
                    item.actualCost.USD = record.actualCost * 100 / exchangeRateFromUSDToHomeCurrency.exchangeRate;
                    item.updatedCost.USD = record.updatedCost * 100 / exchangeRateFromUSDToHomeCurrency.exchangeRate;
                    current.totalPrice.USD = (current.totalPrice.USD || 0) + item.price.USD;
                    current.totalActualCost.USD = (current.totalActualCost.USD || 0) + item.actualCost.USD;
                    current.totalUpdatedCost.USD = (current.totalUpdatedCost.USD || 0) + item.updatedCost.USD
                }

                // price in home currency
                item.price[record.currency] = record.price;
                item.actualCost[record.currency] = record.actualCost;
                item.updatedCost[record.currency] = record.updatedCost;
                current.totalPrice[record.currency] = (current.totalPrice[record.currency] || 0) + item.price[record.currency];
                current.totalActualCost[record.currency] = (current.totalActualCost[record.currency] || 0) + item.actualCost[record.currency];
                current.totalUpdatedCost[record.currency] = (current.totalUpdatedCost[record.currency] || 0) + item.updatedCost[record.currency];

                current.description = description.join();
                current.image = setImages;

                current.items.push(item);

            }else{
                // in each set reference
                if (!!record.setImageName && !!record.setImageType) {
                    // console.log(record.setImageName);
                    let isFound = setImagesName.find((image) => {
                                                    return image.name == record.setImageName;
                                                });
                    if (isFound == undefined ) {
                        setImagesName.push({name: record.setImageName});

                        setImages.push({
                            original: `${config.gallery.original}/${record.setImageName}.${record.setImageType}`,
                            thumbnail: `${config.gallery.thumbnail}/${record.setImageName}.${record.setImageType}`,
                            defaultSetImage: `${record.defaultSetImage}`,
                            lastModifiedDateSetImage: `${record.lastModifiedDateSetImage}`,
                            originalFileName: `${record.setImageName}.${record.setImageType}`
                        });

                    }
                }

                if (record.reference !== reference) {
                    reference = record.reference
                    description.push(record.reference)
                    setName = record.setName
                    setRomanceNote = record.setRomanceNote

                    const current = itemSets[itemSets.length - 1]
                    const item = {
                        id: record.id,
                        reference: record.reference,
                        itemType: record.itemType,
                        priority: record.priority,
                        description: record.description,
                        setName: record.setName,
                        setRomanceNote: record.setRomanceNote,
                        image: {
                            original: `${config.gallery.original}/${record.imageName}.${record.imageType}`,
                            thumbnail: `${config.gallery.thumbnail}/${record.imageName}.${record.imageType}`,
                            defaultImage: `${record.defaultImage}`,
                            lastModifiedDateImage: `${record.lastModifiedDateImage}`,
                            originalFileName: `${record.imageName}.${record.imageType}`
                        },
                        price: {},
                        actualCost: {},
                        updatedCost: {},
                        markup: record.markup,
                        company: record.company,
                        companyName: record.companyName,
                        warehouse: record.warehouse,
                        warehouseName: record.warehouseName,
                        venderReference: record.venderReference,
                        specialDiscount: record.specialDiscount,
                        specialDiscountPercent: record.specialDiscountPercent,
                        sku: record.sku,
                        type: record.type,
                        hierarchy: record.hierarchy,
                        grossWeight: record.grossWeight,
                        stoneDetail: record.stoneDetail,
                        createdDate: record.createdDate
                    }

                    const exchangeRateFromUSDToHomeCurrency = exchangeRates.filter(exchangeRate => exchangeRate.from === 'USD' && exchangeRate.to === record.currency)[0];
                    const rates = exchangeRates.filter(exchangeRate => exchangeRate.from === record.currency);

                    // price in other currencies
                    for (let rate of rates) {
                        item.price[rate.to] = record.price * rate.exchangeRate / 100;
                        item.actualCost[rate.to] = record.actualCost * rate.exchangeRate / 100;
                        item.updatedCost[rate.to] = record.updatedCost * rate.exchangeRate / 100;
                        current.totalPrice[rate.to] = (current.totalPrice[rate.to] || 0) + item.price[rate.to];
                        current.totalActualCost[rate.to] = (current.totalActualCost[rate.to] || 0) + item.actualCost[rate.to];
                        current.totalUpdatedCost[rate.to] = (current.totalUpdatedCost[rate.to] || 0) + item.updatedCost[rate.to];
                    }

                    // price in USD
                    if (!!exchangeRateFromUSDToHomeCurrency) {
                        item.price.USD = record.price * 100 / exchangeRateFromUSDToHomeCurrency.exchangeRate;
                        item.actualCost.USD = record.actualCost * 100 / exchangeRateFromUSDToHomeCurrency.exchangeRate;
                        item.updatedCost.USD = record.updatedCost * 100 / exchangeRateFromUSDToHomeCurrency.exchangeRate;
                        current.totalPrice.USD = (current.totalPrice.USD || 0) + item.price.USD;
                        current.totalActualCost.USD = (current.totalActualCost.USD || 0) + item.actualCost.USD;
                        current.totalUpdatedCost.USD = (current.totalUpdatedCost.USD || 0) + item.updatedCost.USD
                    }

                    // price in home currency
                    item.price[record.currency] = record.price;
                    item.actualCost[record.currency] = record.actualCost;
                    item.updatedCost[record.currency] = record.updatedCost;
                    current.totalPrice[record.currency] = (current.totalPrice[record.currency] || 0) + item.price[record.currency];
                    current.totalActualCost[record.currency] = (current.totalActualCost[record.currency] || 0) + item.actualCost[record.currency];
                    current.totalUpdatedCost[record.currency] = (current.totalUpdatedCost[record.currency] || 0) + item.updatedCost[record.currency];

                    current.description = description.join();
                    current.image = setImages;

                    current.items.push(item);
                }
            }
        }
        await es.upload(itemSets, {...config.elasticsearch, index, type: 'setitems' })
    } catch (err) {
        throw err
    }
}

export { getitemSets }
