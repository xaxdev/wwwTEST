export default function FindLocationWareHouse(that){

    let dataDropDowntLocations = [];
    let dataDropDowntWareHouse = [];
    const obj = {};

    if (typeof (that.props) !== 'undefined') {
        if (typeof (that.props.options) !== 'undefined') {
            if (that.state.changedOnHandLocation) {
                if (typeof (that.props.warehouseOnHand) !== 'undefined')  {
                    dataDropDowntWareHouse.push(that.props.warehouseOnHand.map(warehouse =>{
                        return ({value: warehouse.code,name:warehouse.name});
                    })
                  )
                  dataDropDowntWareHouse = dataDropDowntWareHouse[0];
                }
            }else{
                if (that.props.warehouseOnHand) {
                    let newDate = [];
                    let data = [];
                    if(dataDropDowntLocations.length != 0){
                        dataDropDowntLocations.forEach(function(location){
                            newDate.push(_.filter(that.props.warehouseOnHand,
                                function(warehouse)
                                { return warehouse.comid == location.value}
                            ));
                        });
                    }else{
                        if(that.props.user.permission.onhandWarehouse != undefined){
                            if (that.props.user.permission.onhandWarehouse.type == 'Warehouse'
                                || that.props.user.permission.onhandWarehouse.type == 'All'
                                || that.props.user.permission.onhandWarehouse.type == 'AllWarehouse'){
                                if (that.props.user.permission.onhandWarehouse.type == 'AllWarehouse') {
                                    that.props.user.permission.onhandWarehouse.places.forEach(function(settingWarehouse){
                                        newDate.push(_.filter(that.props.warehouseOnHand,
                                            function(warehouse){
                                                if(warehouse.code != undefined){
                                                    return warehouse.code.toString() == settingWarehouse;
                                                }
                                            }
                                        ));
                                    });

                                    let subdata = [];
                                    newDate.forEach(newdata =>{
                                        newdata.forEach(subdata =>{
                                            data.push(subdata);
                                        })
                                    });

                                    dataDropDowntWareHouse.push(data.map(warehouse =>{
                                        return ({value: warehouse.code,name:warehouse.name});
                                    }))
                                    dataDropDowntWareHouse = dataDropDowntWareHouse[0];

                                } else if(that.props.user.permission.onhandWarehouse.type == 'Warehouse') {
                                    if (that.props.user.permission.onhandLocation.places.length == 0 && that.props.user.permission.onhandWarehouse.places.length != 0 ) {
                                        that.props.locationOnHand.forEach(function(settingLocation){
                                            newDate.push(_.filter(that.props.warehouseOnHand,
                                                function(warehouse){
                                                    if(warehouse.code != undefined){
                                                        return warehouse.comid.toString() == settingLocation.code.toString();
                                                    }
                                                }
                                            ));
                                        });
                                        let subdata = [];
                                        newDate.forEach(newdata =>{
                                            newdata.forEach(subdata =>{
                                                data.push(subdata);
                                            })
                                        });
                                        dataDropDowntWareHouse.push(data.map(warehouse =>{
                                            return ({value: warehouse.code,name:warehouse.name});
                                        }))
                                        dataDropDowntWareHouse = dataDropDowntWareHouse[0];
                                    }else{
                                        that.props.user.permission.onhandLocation.places.forEach(function(settingLocation){
                                            newDate.push(_.filter(that.props.warehouseOnHand,
                                                function(warehouse){
                                                    if(warehouse.code != undefined){
                                                        return warehouse.comid.toString() == settingLocation;
                                                    }
                                                }
                                            ));
                                        });
                                        let subdata = [];
                                        newDate.forEach(newdata =>{
                                            newdata.forEach(subdata =>{
                                                data.push(subdata);
                                            })
                                        });
                                        dataDropDowntWareHouse.push(data.map(warehouse =>{
                                            return ({value: warehouse.code,name:warehouse.name});
                                        }))
                                        dataDropDowntWareHouse = dataDropDowntWareHouse[0];
                                    }
                                }else if(that.props.user.permission.onhandWarehouse.type == 'All') {
                                    if (typeof (that.props.warehouseOnHand) !== 'undefined')  {
                                        dataDropDowntWareHouse.push(that.props.warehouseOnHand.map(warehouse =>{
                                            return ({value: warehouse.code,name:warehouse.name});
                                        }))
                                        dataDropDowntWareHouse = dataDropDowntWareHouse[0];
                                    }
                                }
                                dataDropDowntWareHouse = dataDropDowntWareHouse.sortBy('value','asc');
                            }
                        }
                    }
                }
            }
            if (typeof (that.props.locationOnHand) !== 'undefined') {
                dataDropDowntLocations.push(that.props.locationOnHand.map(location =>{
                    return ({value: location.code,name:location.name});
                }))
                dataDropDowntLocations = dataDropDowntLocations[0];
            }
            dataDropDowntLocations = dataDropDowntLocations.sortBy('value','asc');
        }
    }

    return {...obj,location: dataDropDowntLocations,warehouse:dataDropDowntWareHouse};
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
