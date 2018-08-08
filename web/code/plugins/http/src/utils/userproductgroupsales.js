export default function ProductGroupSales(userLogin){
  var productGroupSalesSTO=false;
  var productGroupSalesJLY=false;
  var productGroupSalesWAT=false;
  var productGroupSalesACC=false;
  var productGroupSalesOBA=false;
  var productGroupSalesSPA=false;

  var permission = userLogin.permission;
  var bitwise = Number(permission.productGroupSales).toString(2);
  var checkbits = bitwise.split('')
  var numberDiit = checkbits.length;

  var objProductGroupSales = {};

  checkbits.map(function(value,key){
    switch (numberDiit) {
      case 1:
        productGroupSalesJLY = (value == '1')?true:false;
        break;
      case 2:
        if(key == 0){
          productGroupSalesWAT = (value == '1')?true:false;
        }else if (key == 1) {
          productGroupSalesJLY = (value == '1')?true:false;
        }
        break;
      case 3:
        if(key == 0){
          productGroupSalesSTO = (value == '1')?true:false;
        }else if (key == 1) {
          productGroupSalesWAT = (value == '1')?true:false;
        }else if (key == 2) {
          productGroupSalesJLY = (value == '1')?true:false;
        }
        break;
      case 4:
        if(key == 0){
          productGroupSalesACC = (value == '1')?true:false;
        }else if (key == 1) {
          productGroupSalesSTO = (value == '1')?true:false;
        }else if (key == 2) {
          productGroupSalesWAT = (value == '1')?true:false;
        }else if (key == 3) {
          productGroupSalesJLY = (value == '1')?true:false;
        }
        break;
      case 5:
        if(key == 0){
          productGroupSalesOBA = (value == '1')?true:false;
        }else if (key == 1) {
          productGroupSalesACC = (value == '1')?true:false;
        }else if (key == 2) {
          productGroupSalesSTO = (value == '1')?true:false;
        }else if (key == 3) {
          productGroupSalesWAT = (value == '1')?true:false;
        }else if (key == 4) {
          productGroupSalesJLY = (value == '1')?true:false;
        }
        break;
      case 6:
        if(key == 0){
          productGroupSalesSPA = (value == '1')?true:false;
        }else if (key == 1) {
          productGroupSalesOBA = (value == '1')?true:false;
        }else if (key == 2) {
          productGroupSalesACC = (value == '1')?true:false;
        }else if (key == 3) {
          productGroupSalesSTO = (value == '1')?true:false;
        }else if (key == 4) {
          productGroupSalesWAT = (value == '1')?true:false;
        }else if (key == 5) {
          productGroupSalesJLY = (value == '1')?true:false;
        }
        break;
      default:
        break;
    }
  });
  objProductGroupSales = {
    productGroupSalesSPA:productGroupSalesSPA,
    productGroupSalesOBA:productGroupSalesOBA,
    productGroupSalesACC:productGroupSalesACC,
    productGroupSalesWAT:productGroupSalesWAT,
    productGroupSalesJLY:productGroupSalesJLY,
    productGroupSalesSTO:productGroupSalesSTO
  }
  return objProductGroupSales;
}
