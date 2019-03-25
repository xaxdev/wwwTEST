'use strict';

import objectToArray from './objectToArray'
import pagination from './pagination'

export default async (db, page, size) => {
    let allRelatedItem = []
    let pageRelatedItem = []
    const findAllRelatedItem = await db.collection('RelatedItem').find().toArray()
    const countAll = findAllRelatedItem.length

    if (findAllRelatedItem.length > 0) {
        allRelatedItem = await objectToArray(findAllRelatedItem)
    } 
    
    pageRelatedItem = pagination(allRelatedItem, page, size)

    allRelatedItem = allRelatedItem.map((item) => {return {'id':item._id}})    

    return { allRelatedItem, countAll, pageRelatedItem }
}