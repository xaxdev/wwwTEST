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
                      { return warehouse.comid == location.value})
                    );
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
                                // console.log('warehouse.id-->',warehouse.id);
                                if(warehouse.code != undefined){
                                  return warehouse.code.toString() == settingWarehouse;
                                }
                              })
                            );
                          });

                          let subdata = [];
                          newDate.forEach(newdata =>{
                              newdata.forEach(subdata =>{
                                data.push(subdata);
                              })
                          });

                          dataDropDowntWareHouse.push(data.map(warehouse =>{
                              return ({value: warehouse.code,name:warehouse.name});
                            })
                          )
                          dataDropDowntWareHouse = dataDropDowntWareHouse[0];

                        } else if(that.props.user.permission.onhandWarehouse.type == 'Warehouse') {
                          that.props.user.permission.onhandLocation.places.forEach(function(settingLocation){
                            newDate.push(_.filter(that.props.warehouseOnHand,
                              function(warehouse){
                                // console.log('warehouse.id-->',warehouse.id);
                                if(warehouse.code != undefined){
                                  return warehouse.comid.toString() == settingLocation;
                                }
                              })
                            );
                          });
                          let subdata = [];
                          newDate.forEach(newdata =>{
                              newdata.forEach(subdata =>{
                                data.push(subdata);
                              })
                          });
                          dataDropDowntWareHouse.push(data.map(warehouse =>{
                              return ({value: warehouse.code,name:warehouse.name});
                            })
                          )
                          dataDropDowntWareHouse = dataDropDowntWareHouse[0];
                        }else if(that.props.user.permission.onhandWarehouse.type == 'All') {
                          if (typeof (that.props.warehouseOnHand) !== 'undefined')  {
                              dataDropDowntWareHouse.push(that.props.warehouseOnHand.map(warehouse =>{
                                return ({value: warehouse.code,name:warehouse.name});
                              })
                            )
                            dataDropDowntWareHouse = dataDropDowntWareHouse[0];
                          }
                        }
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
        }
    }

    return {...obj,location: dataDropDowntLocations,warehouse:dataDropDowntWareHouse};
}
