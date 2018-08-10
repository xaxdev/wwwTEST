const parameters = setitems => {
    const parameters = {
        "index": "mol",
        "type": "setitems",
        "size": setitems.length,
        "filter_path": "**._source",
        "body": {
            "query": {
                "constant_score": {
                    "query": {
                        "bool": {
                            "should": []
                        }
                    }
                }
            }
        }
    }

    parameters.body.query.constant_score.query.bool.should.push(setitems.map(setitem => ({ "match": { "reference": String(setitem.reference) } })))

    return parameters
}

const source = x => x._source

const inventory = stock => item => {
    if (!!stock.hits && !!stock.hits.hits) {
        const onHand = stock.hits.hits.map(source).find(i => i.reference === item.reference)
        return { ...item, ...onHand, availability: !!onHand }
    } else {
        return { ...item, availability: false }
    }
}

const productGroups = {
    JLY: 1,
    WAT: 2,
    STO: 4,
    ACC: 8,
    OBA: 16,
    SPA: 32
}

const productGroupPermission = (user, item) => (user.permission.productGroup & productGroups[item.type]) === productGroups[item.type]

const applyAuthorization = (user, item) => {
    const companies = user.permission.onhandLocation.places
    const warehouses = user.permission.onhandWarehouse.places
    const authorization = ((companies.length === 0 || (!!item.company && companies.indexOf(item.company) !== -1))
    && (warehouses.length === 0 || (!!item.warehouse && warehouses.indexOf(item.warehouse) !== -1))) && productGroupPermission(user, item)
    return { ...item, authorization }
}

const getPriceIn = currency => price => price[currency]

const applyPermission = (user, item) => {
    // console.log('item-->',JSON.stringify(item,null,4));
    // if no availability is set, assume it's from single-item api
    // and it exists in inventory
    item.availability = item.availability || true
    if (item.availability && item.authorization) {
        const currency = user.currency
        const actualCost = getPriceIn(currency)(item.totalActualCost) || -1
        const actualCostInUSD = getPriceIn('USD')(item.totalActualCost) || -1
        const actualCostInHomeCurrency = getPriceIn(item.currency)(item.totalActualCost) || -1
        const updatedCost = getPriceIn(currency)(item.totalUpdatedCost) || -1
        const updatedCostInUSD = getPriceIn('USD')(item.totalUpdatedCost) || -1
        const updatedCostInHomeCurrency = getPriceIn(item.currency)(item.totalUpdatedCost) || -1
        const price = getPriceIn(currency)(item.totalPrice) || -1
        const priceInUSD = getPriceIn('USD')(item.totalPrice) || -1
        const priceInHomeCurrency = getPriceIn(item.currency)(item.totalPrice) || -1
        const userCurrency = user.currency
        const result = {
            ...item,
            actualCost,
            actualCostInUSD,
            actualCostInHomeCurrency,
            updatedCost,
            updatedCostInUSD,
            updatedCostInHomeCurrency,
            price,
            priceInUSD,
            priceInHomeCurrency,
            userCurrency
        }

        switch (user.permission.price.toUpperCase()) {
            case "PUBLIC":
            delete result.actualCost
            delete result.actualCostInUSD
            delete result.actualCostInHomeCurrency
            delete result.updatedCost
            delete result.updatedCostInUSD
            delete result.updatedCostInHomeCurrency
            delete result.markup
            break;
            case "UPDATED":
            delete result.actualCost
            delete result.actualCostInUSD
            delete result.actualCostInHomeCurrency
            break;
        }
        return result
    } else {
        return {
            id: item.id,
            reference: item.reference,
            description: item.description,
            priceInUSD: item.priceInUSD,
            setReference: item.setReference,
            lastModified: item.lastModified,
            availability: item.availability,
            authorization: item.authorization
        }
    }

    return { ...item }
}

const authorize = user => data => {
    // console.log(JSON.stringify(data, null, 4))
    if (Array.isArray(data)) {
        return data.map(item => applyAuthorization(user, item))
    } else {
        return applyAuthorization(user, data)
    }
}

const permission = user => data => {
    // console.log(JSON.stringify(data, null, 4))
    if (Array.isArray(data)) {
        return data.map(item => applyPermission(user, item))
    } else {
        return applyPermission(user, data)
    }
}

const compose = (...fs) => x => fs.reduce((p, f) => f(p), x)

export default {
    parameters,
    inventory: (data, stock) => data.map(inventory(stock)),
    authorization: (user, data) => {
        return compose(authorize(user), permission(user))(data)
    },
    productGroupPermission
}
