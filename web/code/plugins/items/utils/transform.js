'use strict';

import objectToArray from './objectToArray'
import pagination from './pagination'

module.exports = async (data, page, size) => {   
    let allRelatedItem = []
    let pageRelatedItem = []
    const countAll = data.length

    if (data.length > 0) {
        allRelatedItem = await objectToArray(data)
    }

    pageRelatedItem = pagination(allRelatedItem, page, size)

    // allRelatedItem = allRelatedItem.map((item) => {return {'id':item._id}})  

    return { relatedItem: pageRelatedItem, countAll }
}