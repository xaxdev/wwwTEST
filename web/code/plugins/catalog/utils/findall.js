'use strict';

import _  from 'lodash'
import objectToArray from './objectToArray'
import pagination from './pagination'

export default async (db, page, size, owner) => {
    let allRelatedItem = []
    let pageRelatedItem = []
    
    const ownList = await db.collection('YingCatalogName').find({'owner': owner},{'name': 1}).sort({ 'name': 1 }).toArray()
    const markOwnList = ownList.map((item) => { return { ...item, shared: false } })

    const sharedList = await db.collection('YingCatalogName').find({'users.id': { $in: [owner] }},{'name': 1}).sort({ 'name': 1 }).toArray()
    const markSharedList = sharedList.map((item) => { return { ...item, shared: true } })

    const findAllRelatedItem = _.union(markOwnList, markSharedList)


    const countAll = findAllRelatedItem.length

    if (findAllRelatedItem.length > 0) {
        allRelatedItem = await objectToArray(findAllRelatedItem)
    } 
    
    pageRelatedItem = pagination(allRelatedItem, page, size)
    await pageRelatedItem.map(async(col,index)=>{
        const { shared } = col
        let status = !shared? 'Owner': 'Shared'
        col.status = status
    })

    allRelatedItem = allRelatedItem.map((item) => {return {'id':item._id}})    

    return { allRelatedItem, countAll, pageRelatedItem }
}