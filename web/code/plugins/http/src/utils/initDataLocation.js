export default function InitDataLocation(LocationValue,userLogin){

  var dataDropDowntLocations = [];
  var newDate = [];
  // console.log('InitDataLocation->');
  if(userLogin.permission.onhandLocation.places.length != 0){
    userLogin.permission.onhandLocation.places.map(place =>{
      newDate.push(_.filter(LocationValue,
        function(location)
        { return location.code == place}));
    });
    dataDropDowntLocations.push(newDate.map(location =>{
        // console.log('location-->',location);
        return ({value: location[0].code,label:location[0].name});
      })
    );
  }else{
    dataDropDowntLocations.push(LocationValue.map(location =>{
        // console.log('location-->',location);
        return ({value: location.code,label:location.name});
      })
    );
  }
  return dataDropDowntLocations[0];
}
