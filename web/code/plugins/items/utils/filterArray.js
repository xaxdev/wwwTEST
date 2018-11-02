export default (array, values, propertyName) => {
    let newResult = []
    let result = []
    values.map((value)=>{
        result = array.filter(function (arrayItem) {
            return value === arrayItem[propertyName];
        });
        newResult = [...newResult,...result]
    })
    return newResult
}
