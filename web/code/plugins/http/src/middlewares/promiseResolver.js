export default function promiseMiddleware() {
  return next => action => {
    const { promise, type, ...rest } = action;

    if (!promise) return next(action);

    const SUCCESS = type;
    const REQUEST = type + '_REQUEST';
    const FAILURE = type + '_FAILURE';
    next({ ...rest, type: REQUEST });

    return promise
      .then(function(response) {

        if(type == 'LOGIN_USER'){
          if (response.status == 200) {
              sessionStorage.setItem('token',response.headers.get('authorization'));
          }
        }

        if(type == 'VALIDATE_USER'){
          if (response.status == 200) {
              sessionStorage.setItem('token',response.headers.get('authorization'));
          }
        }

        return response.json();
      })
      .then(data => {
        if(type== 'FETCH_ALLITEMS'){
          sessionStorage.setItem('navigation',JSON.stringify(data.allData));
        }
        if(type== 'SELECTED_COMPANY'){
          const sites = data.locations
                        .filter(function(site){
                          return site.comid == action.selected;
                        });
          data.locations = sites;
        }
        if(type== 'SELECTED_WAREHOUSES'){
          const sites = data.locations
                        .filter(function(site){
                          return site.comid == action.comid;
                        });
          data.locations = sites;
          const warehouses = data.warehouses
                        .filter(function(warehouse){
                          return warehouse.locationid == action.selected;
                        });
          data.warehouses = warehouses;
        }
        if(type== 'GED_ONHANDWAREHOUSES'){
          // console.log('GED_ONHANDWAREHOUSES-->');
          const locationSelected = action.location;
          // const sites = data.locations
          //               .filter(function(site){
          //                 return site.comid == action.comid;
          //               });
          // data.locations = sites;
          var ware = [];
          locationSelected.forEach(function(location) {
            data.warehouses.forEach(function(warehouse){
              if(warehouse.locationid == location)
                ware.push(warehouse);
            });
            // ware.push(warehouses[0]);
          });
          // const warehouses = data.warehouses
          //               .filter(function(warehouse){
          //                 return warehouse.locationid == action.selected;
          //               });

          data.warehouses = ware;
        }

        // console.log('promise data-->',data);
        next({ ...rest, data, type: SUCCESS });
        return true;
      });
   };
}
