const parameters = items => {
    const parameters = {
        'index': 'mol',
        'type': 'items',
        'size': items.length,
        'filter_path': '**._source',
        'body': {
            'query': {
                'constant_score': {
                    'query': {
                        'bool': {
                            'should': []
                        }
                    }
                }
            }
        }
    }

    parameters.body.query.constant_score.query.bool.should.push(items.map(item => ({ 'match': { 'id': String(item.id) } })))

    return parameters
}

const parametersReference = items => {
    const parameters = {
        'index': 'mol',
        'type': 'items',
        'size': items.length,
        'filter_path': '**._source',
        'body': {
            'query': {
                'constant_score': {
                    'query': {
                        'bool': {
                            'must': [],
                            'must_not':[{
                                'match': {
                                    'warehouse': {
                                        'query': 'MME.CONS'
                                    }
                                }
                            }]
                        }
                    }
                }
            }
        }
    }

    parameters.body.query.constant_score.query.bool.must.push(items.map(item => ({ 'match': { 'reference': String(item) } })))

    return parameters
}

const source = x => x._source

const inventory = stock => item => {
    if (!!stock.hits && !!stock.hits.hits) {
        const onHand = stock.hits.hits.map(source).find(i => Number(i.id) === Number(item.id))
        return { ...item, ...onHand, availability: !!onHand }
    } else {
        return { ...item, availability: false }
    }
}

const inventoryReference = stock => item => {    
    if (!!stock.hits && !!stock.hits.hits) {        
        const onHand = stock.hits.hits.map(source).find(i => {
            return i.reference === item
        })        
        return { ...onHand, availability: !!onHand }
    } else {
        return { reference: item, availability: false }
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
    // if no availability is set, assume it's from single-item api
    // and it exists in inventory
    item.availability = item.availability || true
    if (item.availability && item.authorization) {
        const currency = user.currency
        const actualCost = getPriceIn(currency)(item.actualCost) || -1
        const actualCostInUSD = getPriceIn('USD')(item.actualCost) || -1
        const actualCostInHomeCurrency = getPriceIn(item.currency)(item.actualCost) || -1
        const updatedCost = getPriceIn(currency)(item.updatedCost) || -1
        const updatedCostInUSD = getPriceIn('USD')(item.updatedCost) || -1
        const updatedCostInHomeCurrency = getPriceIn(item.currency)(item.updatedCost) || -1
        const price = getPriceIn(currency)(item.price) || -1
        const priceInUSD = getPriceIn('USD')(item.price) || -1
        const priceInHomeCurrency = getPriceIn(item.currency)(item.price) || -1
        const userCurrency = user.currency
        const actualCostInCurrency = {
            'USD': actualCostInUSD,
            'CHF': getPriceIn('CHF')(item.actualCost) || -1,
            'JOD': getPriceIn('JOD')(item.actualCost) || -1,
            'KWD': getPriceIn('KWD')(item.actualCost) || -1,
            'OMR': getPriceIn('OMR')(item.actualCost) || -1,
            'QAR': getPriceIn('QAR')(item.actualCost) || -1,
            'SAR': getPriceIn('SAR')(item.actualCost) || -1
        }
        const updatedCostInCurrency = {
            'USD': updatedCostInUSD,
            'CHF': getPriceIn('CHF')(item.updatedCost) || -1,
            'JOD': getPriceIn('JOD')(item.updatedCost) || -1,
            'KWD': getPriceIn('KWD')(item.updatedCost) || -1,
            'OMR': getPriceIn('OMR')(item.updatedCost) || -1,
            'QAR': getPriceIn('QAR')(item.updatedCost) || -1,
            'SAR': getPriceIn('SAR')(item.updatedCost) || -1
        }
        const priceInCurrency = {
            'USD': priceInUSD,
            'CHF': getPriceIn('CHF')(item.price) || -1,
            'JOD': getPriceIn('JOD')(item.price) || -1,
            'KWD': getPriceIn('KWD')(item.price) || -1,
            'OMR': getPriceIn('OMR')(item.price) || -1,
            'QAR': getPriceIn('QAR')(item.price) || -1,
            'SAR': getPriceIn('SAR')(item.price) || -1
        }
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
            userCurrency,
            actualCostInCurrency,
            updatedCostInCurrency,
            priceInCurrency
        }
        result.gemstones.forEach(gemstone => delete gemstone.cost)

        switch (user.permission.price.toUpperCase()) {
            case 'PUBLIC':
                delete result.actualCost
                delete result.actualCostInUSD
                delete result.actualCostInHomeCurrency
                delete result.updatedCost
                delete result.updatedCostInUSD
                delete result.updatedCostInHomeCurrency
                delete result.markup
                delete result.actualCostInCurrency
                delete result.updatedCostInCurrency
                break;
            case 'UPDATED':
                delete result.actualCost
                delete result.actualCostInUSD
                delete result.actualCostInHomeCurrency
                delete result.actualCostInCurrency
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
    productGroupPermission,
    parametersReference,
    inventoryReference: (data, stock) => data.map(inventoryReference(stock))
}
