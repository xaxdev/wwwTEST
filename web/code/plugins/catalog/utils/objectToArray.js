'use strict';

const reduce = (items, current) =>{
    items.push(current.reference)
    return items
}

export default async (array) => {

    array = await array.map((col,index)=>{
        let { items } = col
        if (!!items) {
            col.reference = items.reduce(reduce, [])    
        }
        return col
    })

    return array 
}