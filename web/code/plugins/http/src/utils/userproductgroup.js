export default function ProductGroup(userLogin){
  var productGroupSTO=false;
  var productGroupJLY=false;
  var productGroupWAT=false;
  var productGroupACC=false;
  var productGroupOBA=false;
  var productGroupSPP=false;

  var permission = userLogin.permission;
  var bitwise = Number(permission.productGroup).toString(2);
  var checkbits = bitwise.split('')
  var numberDiit = checkbits.length;

  var objProductGroup = {};

  checkbits.map(function(value,key){
    switch (numberDiit) {
      case 1:
        productGroupJLY = (value == '1')?true:false;
        break;
      case 2:
        if(key == 0){
          productGroupWAT = (value == '1')?true:false;
        }else if (key == 1) {
          productGroupJLY = (value == '1')?true:false;
        }
        break;
      case 3:
        if(key == 0){
          productGroupSTO = (value == '1')?true:false;
        }else if (key == 1) {
          productGroupWAT = (value == '1')?true:false;
        }else if (key == 2) {
          productGroupJLY = (value == '1')?true:false;
        }
        break;
      case 4:
        if(key == 0){
          productGroupACC = (value == '1')?true:false;
        }else if (key == 1) {
          productGroupSTO = (value == '1')?true:false;
        }else if (key == 2) {
          productGroupWAT = (value == '1')?true:false;
        }else if (key == 3) {
          productGroupJLY = (value == '1')?true:false;
        }
        break;
      case 5:
        if(key == 0){
          productGroupOBA = (value == '1')?true:false;
        }else if (key == 1) {
          productGroupACC = (value == '1')?true:false;
        }else if (key == 2) {
          productGroupSTO = (value == '1')?true:false;
        }else if (key == 3) {
          productGroupWAT = (value == '1')?true:false;
        }else if (key == 4) {
          productGroupJLY = (value == '1')?true:false;
        }
        break;
      case 6:
        if(key == 0){
          productGroupSPP = (value == '1')?true:false;
        }else if (key == 1) {
          productGroupOBA = (value == '1')?true:false;
        }else if (key == 2) {
          productGroupACC = (value == '1')?true:false;
        }else if (key == 3) {
          productGroupSTO = (value == '1')?true:false;
        }else if (key == 4) {
          productGroupWAT = (value == '1')?true:false;
        }else if (key == 5) {
          productGroupJLY = (value == '1')?true:false;
        }
        break;
      default:
        break;
    }
  });
  objProductGroup = {
    productGroupSPP:productGroupSPP,
    productGroupOBA:productGroupOBA,
    productGroupACC:productGroupACC,
    productGroupWAT:productGroupWAT,
    productGroupJLY:productGroupJLY,
    productGroupSTO:productGroupSTO
  }
  return objProductGroup;
}
