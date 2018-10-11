import config from './config'

module.exports = async (records, cb) => {
    const itemSets = [];
    let description = [];
    let setImages = [];
    let setImagesName = [];
    let setReference = '';
    let reference = '';
    let chkcompanyName = '';
    let chkwarehouseName = '';
    let companyName = [];
    let warehouseName = [];
    try {
        for (let record of records) {
            // for each set reference
            if (record.setReference != '') {
                if (record.setReference !== setReference) {
                    description = [];
                    setImages = [];
                    setImagesName = [];
                    setReference = record.setReference;
                    companyName = [];
                    warehouseName = [];
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
                        companyName: '',
                        warehouse: record.warehouse,
                        warehouseName: '',
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
                                lastModifiedDateSetImage: `${record.lastModifiedDateSetImage}`
                            });

                        }
                    }

                    reference = record.reference
                    description.push(record.reference);

                    if (!!record.company) {
                        let isFound = companyName.find((com) => { return com == record.companyName });
                        if (isFound == undefined ) {
                            companyName.push(record.companyName);
                        }
                    }
                    if (!!record.warehouse) {
                        let isFound = warehouseName.find((ware) => { return ware == record.warehouseName });
                        if (isFound == undefined ) {
                            warehouseName.push(record.warehouseName);
                        }
                    }

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
                            original: `${!!record.gallery[0] ? record.gallery[0].original: ''}`,
                            thumbnail: `${!!record.gallery[0] ? record.gallery[0].thumbnail: ''}`,
                            defaultImage: `${record.defaultImage}`,
                            lastModifiedDateImage: `${record.lastModifiedDateImage}`
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

                    // price in USD
                    item.price.USD  = record.price['USD'];
                    item.actualCost.USD  = record.actualCost['USD'];
                    item.updatedCost.USD  = record.updatedCost['USD'];
                    item.netAmount.USD  = record.netAmount['USD'];
                    item.margin.USD  = record.margin['USD'];
                    item.marginPercent  = (record.margin['USD']/record.netAmount['USD'])*100;
                    item.discountAmount.USD  = record.discountAmountUSD;
                    item.discountPercent  = record.discPercent == 0 ? (record.discountAmountUSD/record.price['USD'])*100 : record.discPercent;
                    current.totalPrice.USD  = (current.totalPrice.USD  || 0) + Math.round(item.price.USD);
                    current.totalActualCost.USD  = (current.totalActualCost.USD  || 0) + Math.round(item.actualCost.USD);
                    current.totalUpdatedCost.USD  = (current.totalUpdatedCost.USD  || 0) + Math.round(item.updatedCost.USD);
                    current.totalNetAmount.USD  = (current.totalNetAmount.USD  || 0) + Math.round(item.netAmount.USD);
                    current.totalMargin.USD  = (current.totalMargin.USD  || 0) + Math.round(item.margin.USD);
                    current.totalMarginPercent.percent  = (current.totalMarginPercent.percent  || 0) + Math.round(item.marginPercent);
                    current.totalDiscountAmount.USD  = (current.totalDiscountAmount.USD  || 0) + Math.round(item.discountAmount.USD);
                    current.totalDiscountPercent.percent  = (current.totalDiscountPercent.percent  || 0) + Math.round(item.discountPercent);

                    current.description = description.join();
                    current.companyName = companyName.join();
                    current.warehouseName = warehouseName.join();
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
                                lastModifiedDateSetImage: `${record.lastModifiedDateSetImage}`
                            });

                        }
                    }


                    if (record.reference !== reference) {
                        reference = record.reference
                        description.push(record.reference);
                        if (!!record.company) {
                            let isFound = companyName.find((com) => { return com == record.companyName });
                            if (isFound == undefined ) {
                                companyName.push(record.companyName);
                            }
                        }
                        if (!!record.warehouse) {
                            let isFound = warehouseName.find((ware) => { return ware == record.warehouseName });
                            if (isFound == undefined ) {
                                warehouseName.push(record.warehouseName);
                            }
                        }

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
                                original: `${!!record.gallery[0] ? record.gallery[0].original: ''}`,
                                thumbnail: `${!!record.gallery[0] ? record.gallery[0].thumbnail: ''}`,
                                defaultImage: `${record.defaultImage}`,
                                lastModifiedDateImage: `${record.lastModifiedDateImage}`
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

                        // price in USD
                        item.price.USD  = record.price['USD'];
                        item.actualCost.USD  = record.actualCost['USD'];
                        item.updatedCost.USD  = record.updatedCost['USD'];
                        item.netAmount.USD  = record.netAmount['USD'];
                        item.margin.USD  = record.margin['USD'];
                        item.marginPercent  = (record.margin['USD']/record.netAmount['USD'])*100;
                        item.discountAmount.USD  = record.discountAmountUSD;
                        item.discountPercent  = record.discPercent == 0 ? (record.discountAmountUSD/record.price['USD'])*100 : record.discPercent;
                        current.totalPrice.USD  = (current.totalPrice.USD  || 0) + Math.round(item.price.USD);
                        current.totalActualCost.USD  = (current.totalActualCost.USD  || 0) + Math.round(item.actualCost.USD);
                        current.totalUpdatedCost.USD  = (current.totalUpdatedCost.USD  || 0) + Math.round(item.updatedCost.USD);
                        current.totalNetAmount.USD  = (current.totalNetAmount.USD  || 0) + Math.round(item.netAmount.USD);
                        current.totalMargin.USD  = (current.totalMargin.USD  || 0) + Math.round(item.margin.USD);
                        current.totalMarginPercent.percent  = (current.totalMarginPercent.percent  || 0) + Math.round(item.marginPercent);
                        current.totalDiscountAmount.USD  = (current.totalDiscountAmount.USD  || 0) + Math.round(item.discountAmount.USD);
                        current.totalDiscountPercent.percent  = (current.totalDiscountPercent.percent  || 0) + Math.round(item.discountPercent);

                        current.description = description.join();
                        current.companyName = companyName.join();
                        current.warehouseName = warehouseName.join();
                        current.image = setImages;

                        current.items.push(item);
                    }
                }
            }
        }
        return itemSets;
    } catch (err) {
        console.log(err);
    }
}
