export default function InitDataSalesCompany(CompanyValue, userLogin){
    let dataDropDowntCompanies = [];
    let newDate = [];
    // console.log('InitDataLocation->');
    if(userLogin.permission.salesLocation.places.length != 0){
        userLogin.permission.salesLocation.places.map(place =>{
            newDate.push(_.filter(CompanyValue,
                function(company)
                { return company.code == place}));
        });
        dataDropDowntCompanies.push(newDate.map(company =>{
            return ({value: company[0].code,label:company[0].code +' ['+ company[0].name + ']'});
        }));
    }else{
        dataDropDowntCompanies.push(CompanyValue.map(company =>{
            return ({value: company.code,label:company.code +' [' + company.name + ']'});
        }));
    }
    return dataDropDowntCompanies[0];
}
