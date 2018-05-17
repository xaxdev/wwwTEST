export default function FindLocationWareHouse(that){
    let dataDropDownLocations = [];
    let dataDropDownWareHouse = [];
    let dataDropDownSalesLocations = [];
    let dataDropDownSalesWareHouse = [];
    const obj = {};

    if (typeof (that.props) !== 'undefined') {
        if (typeof(that.props.options) !== 'undefined') {
            if (typeof(that.props.warehouseOnHand) !== 'undefined') {
                dataDropDownWareHouse.push(that.props.warehouseOnHand.map(warehouse => {
                    return ({ value: warehouse.code, name: warehouse.name });
                }))
                dataDropDownWareHouse = dataDropDownWareHouse[0];
            }
            dataDropDownWareHouse = dataDropDownWareHouse.sortBy('value','asc');

            if (typeof(that.props.locationOnHand) !== 'undefined') {
                dataDropDownLocations.push(that.props.locationOnHand.map(location => {
                    return ({ value: location.code, name: location.name });
                }))
                dataDropDownLocations = dataDropDownLocations[0];
                dataDropDownSalesLocations.push(that.props.locationOnHand.map(location => {
                    return ({ value: location.code, name: location.name });
                }))
                dataDropDownSalesLocations = dataDropDownSalesLocations[0];
            }
            dataDropDownLocations = dataDropDownLocations.sortBy('value','asc');
            dataDropDownSalesLocations = dataDropDownSalesLocations.sortBy('value','asc');

            if (typeof(that.props.warehouseOnHand) !== 'undefined') {
                dataDropDownSalesWareHouse.push(that.props.warehouseOnHand.map(warehouse => {
                    return ({ value: warehouse.code, name: warehouse.name });
                }))
                dataDropDownSalesWareHouse = dataDropDownSalesWareHouse[0];
            }
            dataDropDownSalesWareHouse = dataDropDownSalesWareHouse.sortBy('value','asc');
        }
    }

    return {
        ...obj
        , location: dataDropDownLocations
        , warehouse: dataDropDownWareHouse
        , salesLocation: dataDropDownSalesLocations
        , salesWarehouse: dataDropDownSalesWareHouse
    };
}

const compareBy = (property, order = 'asc') => (a, b) => {
    if(!a.hasOwnProperty(property) || !b.hasOwnProperty(property)) {
        return 0;
    }
    let priceA = 0;
    let priceB = 0;
    const first = (property.toLowerCase().indexOf('price') != -1)
                  ? a[property] != undefined
                      ? a[property] != undefined ? a[property] : 0
                      : 0
                  : a[property]
    const second = (property.toLowerCase().indexOf('price') != -1)
                  ? b[property] != undefined
                      ? b[property] != undefined ? b[property] : 0
                      : 0
                  : b[property]
    if (typeof first !== typeof second) {
        return 0
    }

    let comparison = 0
    if (first > second) {
        comparison = 1
    }

    if (first < second) {
        comparison = -1
    }

    return (order === 'desc')? (comparison * -1) : comparison
}
Array.prototype.sortBy = function(property, order = 'asc') {
    return Array.prototype.sort.call(this, compareBy(property, order))
}
