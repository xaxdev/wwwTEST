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
                    totalMarginPercent: {},
                    totalDiscountAmount: {},
                    totalDiscountPercent: {},
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
                    let isFound = setImagesName.find((image) => { return image.name == record.setImageName });
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
                        thumbnail: `${config.gallery.thumbnail}/${record.imageName}.${record.imageType}`,
                        defaultImage: `${record.defaultImage}`,
                        lastModifiedDateImage: `${record.lastModifiedDateImage}`,
                        originalFileName: `${record.imageName}.${record.imageType}`
                    },
                    price: {},
                    actualCost: {},
                    updatedCost: {},
                    netAmount: {},
                    margin: {},
                    marginPercent: {},
                    discountAmount: {},
                    discountPercent: {},
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

                // price in USD
                item.price.USD  = record.price;
                item.actualCost.USD  = record.actualCost;
                item.updatedCost.USD  = record.updatedCost;
                item.netAmount.USD  = record.netAmount;
                item.margin.USD  = record.margin;
                item.marginPercent  = (record.margin/record.netAmount)*100;
                item.discountAmount.USD  = record.discountAmountUSD;
                item.discountPercent  = record.discPercent == 0 ? (record.discountAmountUSD/record.price)*100 : record.discPercent;
                current.totalPrice.USD  = (current.totalPrice.USD  || 0) + item.price.USD;
                current.totalActualCost.USD  = (current.totalActualCost.USD  || 0) + item.actualCost.USD;
                current.totalUpdatedCost.USD  = (current.totalUpdatedCost.USD  || 0) + item.updatedCost.USD;
                current.totalNetAmount.USD  = (current.totalNetAmount.USD  || 0) + item.netAmount.USD;
                current.totalMargin.USD  = (current.totalMargin.USD  || 0) + item.margin.USD;
                current.totalMarginPercent  = (current.totalMarginPercent  || 0) + item.marginPercent;
                current.totalDiscountAmount.USD  = (current.totalDiscountAmount.USD  || 0) + item.discountAmount.USD;
                current.totalDiscountPercent  = (current.totalDiscountPercent  || 0) + item.discountPercent;

                current.description = description.join();
                current.image = setImages;

                current.items.push(item);

            }else{
                // in each set reference
                if (!!record.setImageName && !!record.setImageType) {
                    // console.log(record.setImageName);
                    let isFound = setImagesName.find((image) => { return image.name == record.setImageName });
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
                            thumbnail: `${config.gallery.thumbnail}/${record.imageName}.${record.imageType}`,
                            defaultImage: `${record.defaultImage}`,
                            lastModifiedDateImage: `${record.lastModifiedDateImage}`,
                            originalFileName: `${record.imageName}.${record.imageType}`
                        },
                        price: {},
                        actualCost: {},
                        updatedCost: {},
                        netAmount: {},
                        margin: {},
                        marginPercent: {},
                        discountAmount: {},
                        discountPercent: {},
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

                    // price in USD
                    item.price.USD  = record.price;
                    item.actualCost.USD  = record.actualCost;
                    item.updatedCost.USD  = record.updatedCost;
                    item.netAmount.USD  = record.netAmount;
                    item.margin.USD  = record.margin;
                    item.marginPercent  = (record.margin/record.netAmount)*100;
                    item.discountAmount.USD  = record.discountAmountUSD;
                    item.discountPercent  = record.discPercent == 0 ? (record.discountAmountUSD/record.price)*100 : record.discPercent;
                    current.totalPrice.USD  = (current.totalPrice.USD  || 0) + item.price.USD;
                    current.totalActualCost.USD  = (current.totalActualCost.USD  || 0) + item.actualCost.USD;
                    current.totalUpdatedCost.USD  = (current.totalUpdatedCost.USD  || 0) + item.updatedCost.USD;
                    current.totalNetAmount.USD  = (current.totalNetAmount.USD  || 0) + item.netAmount.USD;
                    current.totalMargin.USD  = (current.totalMargin.USD  || 0) + item.margin.USD;
                    current.totalMarginPercent  = (current.totalMarginPercent  || 0) + item.marginPercent;
                    current.totalDiscountAmount.USD  = (current.totalDiscountAmount.USD  || 0) + item.discountAmount.USD;
                    current.totalDiscountPercent  = (current.totalDiscountPercent  || 0) + item.discountPercent;

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
