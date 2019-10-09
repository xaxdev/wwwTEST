'use strict';

export default (array, page, size) => {
    return array.slice( (page - 1) * size, page * size ) 
}