'use strict';

const reduce = async (items, current) =>{
    items.push(current.reference)
    return items
}

export default async (array) => {

    await array.map(async(col,index)=>{
        let { items } = col
        col.reference = await items.reduce(reduce, [])
    })

    return array 
}