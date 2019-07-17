'use strict';

import _  from 'lodash'
import objectToArray from './objectToArray'
import pagination from './pagination'

export default async (db, page, size, owner) => {
    let allRelatedItem = []
    let pageRelatedItem = []
    
    const ownList = await db.collection('YingCatalogName').find({'owner': owner},{'name': 1}).sort({ 'name': 1 }).toArray()
    const markOwnList = ownList.map((item) => { return { ...item, shared: false } })

    const countAll = markOwnList.length

    if (markOwnList.length > 0) {
        allRelatedItem = await objectToArray(markOwnList)
    } 
    
    await allRelatedItem.map(async(col,index)=>{
        const { shared } = col
        let status = !shared? 'Owner': 'Shared'
        col.status = status
    })

    allRelatedItem = allRelatedItem.map((item) => {return {'id':item._id, 'name':item.name}})    

    return { allRelatedItem, countAll, pageRelatedItem }
}