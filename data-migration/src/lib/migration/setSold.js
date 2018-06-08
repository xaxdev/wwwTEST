import Path from 'path'
import config from '../../../config'
import * as file from '../utils/file'
import * as constant from './constant'
import { db } from '../utils/db'
import { es } from '../utils/es';

const getSoldItemSets = async (index, exchangeRates) => {
    
    try {
        console.log('Set Sold Items!!!');
        const query = await file.read(Path.resolve(constant.SET_SOLD_QUERY))
        const records = await db.exec(query, config.db)
        const itemSets = [];
        let description = [];
        let setImages = [];
        let setImagesName = [];
        let setReference = '';
        let reference = '';
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
                    items: [],
                    totalActualCost: {},
                    totalUpdatedCost: {},
                    totalPrice: {},
                    totalNetAmount: {},
                    totalMargin: {},
                    totalDiscountAmount: {},
                    markup: record.markup,
                    company: record.company,
                    companyName: record.companyName,
                    warehouse: record.warehouse,
                    warehouseName: record.warehouseName,
                    // type: record.type,
                    type: 'SET',
                    postedDate: record.postedDate,
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
                            thumbnail: `${config.gallery.thumbnail}/${record.setImageName}.${record.setImageType}`
                        });

                    }
                }

                reference = record.reference
                description.push(record.reference);

                const current = itemSets[itemSets.length - 1]
                const item = {
                    id: record.id,
                    reference: record.reference,
                    invoicedId: record.invoicedId,
                    invoiceDate: record.invoiceDate,
                    itemType: record.itemType,
                    priority: record.priority,
                    description: record.description,
                    image: {
                        original: `${config.gallery.original}/${record.imageName}.${record.imageType}`,
                        thumbnail: `${config.gallery.thumbnail}/${record.imageName}.${record.imageType}`
                    },
                    price: {},
                    actualCost: {},
                    updatedCost: {},
                    netAmount: {},
                    margin: {},
                    discountAmount: {},
                    markup: record.markup,
                    company: record.company,
                    companyName: record.companyName,
                    warehouse: record.warehouse,
                    warehouseName: record.warehouseName,
                    venderReference: record.venderReference,
                    sku: record.sku,
                    type: record.type,
                    hierarchy: record.hierarchy,
                    grossWeight: record.grossWeight,
                    stoneDetail: record.stoneDetail,
                    postedDate: record.postedDate
                }
                exchangeRates = exchangeRates.filter((item) => {
                    return item.fromDate <= record.invoiceDate && item.toDate >= record.invoiceDate
                });

                const exchangeRateFromUSDToHomeCurrency = exchangeRates.filter(exchangeRate => exchangeRate.from === 'USD' && exchangeRate.to === record.currency)[0];
                const rates = exchangeRates.filter(exchangeRate => exchangeRate.from === record.currency);

                // price in other currencies
                for (let rate of rates) {
                    item.price[rate.to] = record.price * rate.exchangeRate / 100;
                    item.actualCost[rate.to] = record.actualCost * rate.exchangeRate / 100;
                    item.updatedCost[rate.to] = record.updatedCost * rate.exchangeRate / 100;
                    item.netAmount[rate.to] = record.netAmount * rate.exchangeRate / 100;
                    item.margin[rate.to] = record.margin * rate.exchangeRate / 100;
                    item.discountAmount[rate.to] = record.discountAmountUSD * rate.exchangeRate / 100;
                    current.totalPrice[rate.to] = (current.totalPrice[rate.to] || 0) + item.price[rate.to];
                    current.totalActualCost[rate.to] = (current.totalActualCost[rate.to] || 0) + item.actualCost[rate.to];
                    current.totalUpdatedCost[rate.to] = (current.totalUpdatedCost[rate.to] || 0) + item.updatedCost[rate.to];
                    current.totalNetAmount[rate.to] = (current.totalNetAmount[rate.to] || 0) + item.netAmount[rate.to];
                    current.totalMargin[rate.to] = (current.totalMargin[rate.to] || 0) + item.margin[rate.to];
                    current.totalDiscountAmount[rate.to] = (current.totalDiscountAmount[rate.to] || 0) + item.discountAmount[rate.to];
                }

                // price in USD
                if (!!exchangeRateFromUSDToHomeCurrency) {
                    item.price.USD = record.price * 100 / exchangeRateFromUSDToHomeCurrency.exchangeRate;
                    item.actualCost.USD = record.actualCost * 100 / exchangeRateFromUSDToHomeCurrency.exchangeRate;
                    item.updatedCost.USD = record.updatedCost * 100 / exchangeRateFromUSDToHomeCurrency.exchangeRate;
                    item.netAmount.USD = record.netAmount * exchangeRateFromUSDToHomeCurrency.exchangeRate / 100;
                    item.margin.USD = record.margin * exchangeRateFromUSDToHomeCurrency.exchangeRate / 100;
                    item.discountAmount.USD = record.discountAmountUSD * exchangeRateFromUSDToHomeCurrency.exchangeRate / 100;
                    current.totalPrice.USD = (current.totalPrice.USD || 0) + item.price.USD;
                    current.totalActualCost.USD = (current.totalActualCost.USD || 0) + item.actualCost.USD;
                    current.totalUpdatedCost.USD = (current.totalUpdatedCost.USD || 0) + item.updatedCost.USD
                    current.totalNetAmount.USD = (current.totalNetAmount.USD || 0) + item.netAmount.USD
                    current.totalMargin.USD = (current.totalMargin.USD || 0) + item.margin.USD
                    current.totalDiscountAmount.USD = (current.totalDiscountAmount.USD || 0) + item.discountAmount.USD
                }

                // price in home currency
                item.price[record.currency] = record.price;
                item.actualCost[record.currency] = record.actualCost;
                item.updatedCost[record.currency] = record.updatedCost;
                item.netAmount[record.currency] = record.netAmount;
                item.margin[record.currency] = record.margin;
                item.discountAmount[record.currency] = record.discountAmountUSD;
                current.totalPrice[record.currency] = (current.totalPrice[record.currency] || 0) + item.price[record.currency];
                current.totalActualCost[record.currency] = (current.totalActualCost[record.currency] || 0) + item.actualCost[record.currency];
                current.totalUpdatedCost[record.currency] = (current.totalUpdatedCost[record.currency] || 0) + item.updatedCost[record.currency];
                current.totalNetAmount[record.currency] = (current.totalNetAmount[record.currency] || 0) + item.netAmount[record.currency];
                current.totalMargin[record.currency] = (current.totalMargin[record.currency] || 0) + item.margin[record.currency];
                current.totalDiscountAmount[record.currency] = (current.totalDiscountAmount[record.currency] || 0) + item.discountAmount[record.currency];

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
                            thumbnail: `${config.gallery.thumbnail}/${record.setImageName}.${record.setImageType}`
                        });

                    }
                }

                if (record.reference !== reference) {
                    reference = record.reference
                    description.push(record.reference);

                    const current = itemSets[itemSets.length - 1]
                    const item = {
                        id: record.id,
                        reference: record.reference,
                        invoicedId: record.invoicedId,
                        invoiceDate: record.invoiceDate,
                        itemType: record.itemType,
                        priority: record.priority,
                        description: record.description,
                        image: {
                            original: `${config.gallery.original}/${record.imageName}.${record.imageType}`,
                            thumbnail: `${config.gallery.thumbnail}/${record.imageName}.${record.imageType}`
                        },
                        price: {},
                        actualCost: {},
                        updatedCost: {},
                        netAmount: {},
                        margin: {},
                        discountAmount: {},
                        markup: record.markup,
                        company: record.company,
                        companyName: record.companyName,
                        warehouse: record.warehouse,
                        warehouseName: record.warehouseName,
                        venderReference: record.venderReference,
                        sku: record.sku,
                        type: record.type,
                        hierarchy: record.hierarchy,
                        grossWeight: record.grossWeight,
                        stoneDetail: record.stoneDetail,
                        postedDate: record.postedDate
                    }

                    exchangeRates = exchangeRates.filter((item) => {
                        return item.fromDate <= record.invoiceDate && item.toDate >= record.invoiceDate
                    });

                    const exchangeRateFromUSDToHomeCurrency = exchangeRates.filter(exchangeRate => exchangeRate.from === 'USD' && exchangeRate.to === record.currency)[0];
                    const rates = exchangeRates.filter(exchangeRate => exchangeRate.from === record.currency);

                    // price in other currencies
                    for (let rate of rates) {
                        item.price[rate.to] = record.price * rate.exchangeRate / 100;
                        item.actualCost[rate.to] = record.actualCost * rate.exchangeRate / 100;
                        item.updatedCost[rate.to] = record.updatedCost * rate.exchangeRate / 100;
                        item.netAmount[rate.to] = record.netAmount * rate.exchangeRate / 100;
                        item.margin[rate.to] = record.margin * rate.exchangeRate / 100;
                        item.discountAmount[rate.to] = record.discountAmountUSD * rate.exchangeRate / 100;
                        current.totalPrice[rate.to] = (current.totalPrice[rate.to] || 0) + item.price[rate.to];
                        current.totalActualCost[rate.to] = (current.totalActualCost[rate.to] || 0) + item.actualCost[rate.to];
                        current.totalUpdatedCost[rate.to] = (current.totalUpdatedCost[rate.to] || 0) + item.updatedCost[rate.to];
                        current.totalNetAmount[rate.to] = (current.totalNetAmount[rate.to] || 0) + item.netAmount[rate.to];
                        current.totalMargin[rate.to] = (current.totalMargin[rate.to] || 0) + item.margin[rate.to];
                        current.totalDiscountAmount[rate.to] = (current.totalDiscountAmount[rate.to] || 0) + item.discountAmount[rate.to];
                    }

                    // price in USD
                    if (!!exchangeRateFromUSDToHomeCurrency) {
                        item.price.USD = record.price * 100 / exchangeRateFromUSDToHomeCurrency.exchangeRate;
                        item.actualCost.USD = record.actualCost * 100 / exchangeRateFromUSDToHomeCurrency.exchangeRate;
                        item.updatedCost.USD = record.updatedCost * 100 / exchangeRateFromUSDToHomeCurrency.exchangeRate;
                        item.netAmount.USD = record.netAmount * exchangeRateFromUSDToHomeCurrency.exchangeRate / 100;
                        item.margin.USD = record.margin * exchangeRateFromUSDToHomeCurrency.exchangeRate / 100;
                        item.discountAmount.USD = record.discountAmountUSD * exchangeRateFromUSDToHomeCurrency.exchangeRate / 100;
                        current.totalPrice.USD = (current.totalPrice.USD || 0) + item.price.USD;
                        current.totalActualCost.USD = (current.totalActualCost.USD || 0) + item.actualCost.USD;
                        current.totalUpdatedCost.USD = (current.totalUpdatedCost.USD || 0) + item.updatedCost.USD
                        current.totalNetAmount.USD = (current.totalNetAmount.USD || 0) + item.netAmount.USD
                        current.totalMargin.USD = (current.totalMargin.USD || 0) + item.margin.USD
                        current.totalDiscountAmount.USD = (current.totalDiscountAmount.USD || 0) + item.discountAmount.USD
                    }

                    // price in home currency
                    item.price[record.currency] = record.price;
                    item.actualCost[record.currency] = record.actualCost;
                    item.updatedCost[record.currency] = record.updatedCost;
                    item.netAmount[record.currency] = record.netAmount;
                    item.margin[record.currency] = record.margin;
                    item.discountAmount[record.currency] = record.discountAmountUSD;
                    current.totalPrice[record.currency] = (current.totalPrice[record.currency] || 0) + item.price[record.currency];
                    current.totalActualCost[record.currency] = (current.totalActualCost[record.currency] || 0) + item.actualCost[record.currency];
                    current.totalUpdatedCost[record.currency] = (current.totalUpdatedCost[record.currency] || 0) + item.updatedCost[record.currency];
                    current.totalNetAmount[record.currency] = (current.totalNetAmount[record.currency] || 0) + item.netAmount[record.currency];
                    current.totalMargin[record.currency] = (current.totalMargin[record.currency] || 0) + item.margin[record.currency];
                    current.totalDiscountAmount[record.currency] = (current.totalDiscountAmount[record.currency] || 0) + item.discountAmount[record.currency];

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

export { getSoldItemSets }
