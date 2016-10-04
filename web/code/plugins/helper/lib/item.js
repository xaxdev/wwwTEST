const parameters = items => {
    const parameters = {
        "index": "mol",
        "type": "items",
        "size": items.length,
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

    parameters.body.query.constant_score.query.bool.should.push(items.map(item => ({ "match": { "id": String(item.id) } })))

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

const applyAuthorization = (user, item) => {
    const sites = user.permission.onhandLocation.places
    const warehouses = user.permission.onhandWarehouse.places
    const authorization = ((sites.length === 0 || (!!item.site && sites.indexOf(item.site) !== -1))
        && (warehouses.length === 0 || (!!item.warehouse && warehouses.indexOf(item.warehouse) !== -1)))
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
        const updatedCost = getPriceIn(currency)(item.updatedCost) || -1
        const price = getPriceIn(currency)(item.price) || -1
        const result = { ...item, actualCost, updatedCost, price }
        result.gemstones.forEach(gemstone => delete gemstone.cost)

        switch (user.permission.price.toUpperCase()) {
            case "PUBLIC":
                delete result.actualCost
                delete result.updatedCost
                delete result.markup
                break;
            case "UPDATED":
                delete result.actualCost
                break;
        }
        return result
    } else {
        return {
            id: item.id,
            reference: item.reference,
            description: item.description,
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
    }
}
