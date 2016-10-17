export default function InitDataLocation(CompanyValue,userLogin){

  var dataDropDowntCompanies = [];
  var newDate = [];
  // console.log('InitDataLocation->');
  if(userLogin.permission.onhandLocation.places.length != 0){
    userLogin.permission.onhandLocation.places.map(place =>{
      newDate.push(_.filter(CompanyValue,
        // function(location)
        // { return location.code == place}));
        function(company)
        { return company.code == place}));
    });
    dataDropDowntCompanies.push(newDate.map(company =>{
        // console.log('location-->',location);
        return ({value: company[0].code,label:company[0].code +' ['+ company[0].name + ']'});
      })
    );
  }else{
    dataDropDowntCompanies.push(LocationValue.map(company =>{
        // console.log('location-->',location);
        return ({value: company.code,label:company.code +' [' + company.name + ']'});
      })
    );
  }
  return dataDropDowntCompanies[0];
}
