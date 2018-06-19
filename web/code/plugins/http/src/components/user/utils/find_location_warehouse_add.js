export default function FindLocationWareHouse(that){
    
    let dataDropDowntLocations = [];
    let dataDropDowntWareHouse = [];
    const obj = {};

    if (typeof (that.props) !== 'undefined') {
        if (typeof(that.props.options) !== 'undefined') {
            if (typeof(that.props.warehouseOnHand) !== 'undefined') {
                dataDropDowntWareHouse.push(that.props.warehouseOnHand.map(warehouse => {
                    return ({
                        value: warehouse.code,
                        name: warehouse.name
                    });
                }))
                dataDropDowntWareHouse = dataDropDowntWareHouse[0];
            }
            if (typeof(that.props.locationOnHand) !== 'undefined') {
                dataDropDowntLocations.push(that.props.locationOnHand.map(location => {
                    return ({
                        value: location.code,
                        name: location.name
                    });
                }))
                dataDropDowntLocations = dataDropDowntLocations[0];
            }
        }
    }

    return {...obj,location: dataDropDowntLocations,warehouse:dataDropDowntWareHouse};
}
