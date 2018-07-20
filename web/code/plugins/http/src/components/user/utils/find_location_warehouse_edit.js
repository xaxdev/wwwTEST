export default function FindLocationWareHouse(that){
    let dataDropDownLocations = [];
    let dataDropDownWareHouse = [];
    let dataDropDownSalesLocations = [];
    let dataDropDownSalesWareHouse = [];

    const obj = {};

    if (typeof (that.props) !== 'undefined') {
        if (typeof (that.props.options) !== 'undefined') {
            if (that.state.changedOnHandLocation) {
                if (typeof (that.props.warehouseOnHand) !== 'undefined')  {
                    dataDropDownWareHouse.push(that.props.warehouseOnHand.map(warehouse =>{
                        return ({value: warehouse.code,name:warehouse.name});
                    })
                  )
                  dataDropDownWareHouse = dataDropDownWareHouse[0];
                }
            }else{
                if (that.props.warehouseOnHand) {
                    let newDate = [];
                    let data = [];
                    if(dataDropDownLocations.length != 0){
                        dataDropDownLocations.forEach(function(location){
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
                                    
                                    dataDropDownWareHouse.push(data.map(warehouse =>{
                                        return ({value: warehouse.code,name:warehouse.name});
                                    }))
                                    dataDropDownWareHouse = dataDropDownWareHouse[0];

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
                                        dataDropDownWareHouse.push(data.map(warehouse =>{
                                            return ({value: warehouse.code,name:warehouse.name});
                                        }))
                                        dataDropDownWareHouse = dataDropDownWareHouse[0];
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
                                        dataDropDownWareHouse.push(data.map(warehouse =>{
                                            return ({value: warehouse.code,name:warehouse.name});
                                        }))
                                        dataDropDownWareHouse = dataDropDownWareHouse[0];
                                    }
                                }else if(that.props.user.permission.onhandWarehouse.type == 'All') {
                                    if (typeof (that.props.warehouseOnHand) !== 'undefined')  {
                                        dataDropDownWareHouse.push(that.props.warehouseOnHand.map(warehouse =>{
                                            return ({value: warehouse.code,name:warehouse.name});
                                        }))
                                        dataDropDownWareHouse = dataDropDownWareHouse[0];
                                    }
                                }
                                dataDropDownWareHouse = dataDropDownWareHouse.sortBy('value','asc');
                            }
                        }
                    }
                }
            }

            if (that.state.changedSalesLocation) {
                if (typeof (that.props.warehouseSales) !== 'undefined')  {
                    dataDropDownSalesWareHouse.push(that.props.warehouseSales.map(warehouse =>{
                        return ({value: warehouse.code,name:warehouse.name});
                    }))
                    dataDropDownSalesWareHouse = dataDropDownSalesWareHouse[0];
                }
            }else{
                if (that.props.warehouseSales) {
                    let newDate = [];
                    let data = [];
                    if(dataDropDownSalesLocations.length != 0){
                        dataDropDownSalesLocations.forEach(function(location){
                            newDate.push(_.filter(that.props.warehouseSales,
                                function(warehouse)
                                { return warehouse.comid == location.value}
                            ));
                        });
                    }else{
                        if(that.props.user.permission.salesWarehouse != undefined){
                            if (that.props.user.permission.salesWarehouse.type == 'SalesWarehouse'
                              || that.props.user.permission.salesWarehouse.type == 'All'
                              || that.props.user.permission.salesWarehouse.type == 'AllSalesWarehouse'){
                                  if (that.props.user.permission.salesWarehouse.type == 'AllSalesWarehouse') {
                                      that.props.user.permission.salesWarehouse.places.forEach(function(settingWarehouse){
                                          newDate.push(_.filter(that.props.warehouseSales,
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

                                      dataDropDownSalesWareHouse.push(data.map(warehouse =>{
                                          return ({value: warehouse.code,name:warehouse.name});
                                      }))
                                      dataDropDownSalesWareHouse = dataDropDownSalesWareHouse[0];

                                  } else if(that.props.user.permission.salesWarehouse.type == 'SalesWarehouse') {
                                      if (that.props.user.permission.salesLocation.places.length == 0 && that.props.user.permission.salesWarehouse.places.length != 0 ) {
                                          that.props.locationsales.forEach(function(settingLocation){
                                              newDate.push(_.filter(that.props.warehouseSales,
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
                                          dataDropDownSalesWareHouse.push(data.map(warehouse =>{
                                              return ({value: warehouse.code,name:warehouse.name});
                                          }))
                                          dataDropDownSalesWareHouse = dataDropDownSalesWareHouse[0];
                                      }else{
                                          that.props.user.permission.salesLocation.places.forEach(function(settingLocation){
                                              newDate.push(_.filter(that.props.warehouseSales,
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
                                          dataDropDownSalesWareHouse.push(data.map(warehouse =>{
                                              return ({value: warehouse.code,name:warehouse.name});
                                          }))
                                          dataDropDownSalesWareHouse = dataDropDownSalesWareHouse[0];
                                      }
                                  }else if(that.props.user.permission.salesWarehouse.type == 'All') {
                                      if (typeof (that.props.warehouseSales) !== 'undefined')  {
                                          dataDropDownSalesWareHouse.push(that.props.warehouseSales.map(warehouse =>{
                                              return ({value: warehouse.code,name:warehouse.name});
                                          }))
                                          dataDropDownSalesWareHouse = dataDropDownSalesWareHouse[0];
                                      }
                                  }
                                  dataDropDownSalesWareHouse = dataDropDownSalesWareHouse.sortBy('value','asc');
                            }
                        }else{
                            if (typeof (that.props.warehouseSales) !== 'undefined')  {
                                dataDropDownSalesWareHouse.push(that.props.warehouseSales.map(warehouse =>{
                                    return ({value: warehouse.code,name:warehouse.name});
                                }))
                                dataDropDownSalesWareHouse = dataDropDownSalesWareHouse[0];
                            }
                        }
                    }
                }
            }

            if (typeof (that.props.locationOnHand) !== 'undefined') {
                dataDropDownLocations.push(that.props.locationOnHand.map(location =>{
                    return ({value: location.code,name:location.name});
                }))
                dataDropDownLocations = dataDropDownLocations[0];
                dataDropDownSalesLocations.push(that.props.locationOnHand.map(location =>{
                    return ({value: location.code,name:location.name});
                }))
                dataDropDownSalesLocations = dataDropDownSalesLocations[0];
            }
            dataDropDownLocations = dataDropDownLocations.sortBy('value','asc');
            dataDropDownSalesLocations = dataDropDownSalesLocations.sortBy('value','asc');
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
