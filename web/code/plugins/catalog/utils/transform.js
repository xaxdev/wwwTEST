'use strict';

import objectToArray from './objectToArray'
import pagination from './pagination'

export default async (data, page, size) => {
    let allDetails = []
    let pageDetail = []
    const countAll = data.length

    if (data.length > 0) {
        allDetails = await objectToArray(data)
    }

    pageDetail = pagination(allDetails, page, size)

    allDetails = allDetails.map((item) => {return {'id':item._id}})  

    return { yingCatalogDetail: pageDetail, countAll, allDetails }
}