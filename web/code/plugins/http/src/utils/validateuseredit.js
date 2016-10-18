export default function validate(values){

  const errors = {};
  let FLAG_ZERO = 0x0; // 000001
  let FLAG_JLY = 0x1; // 000001
  let FLAG_WAT = 0x2; // 000010
  let FLAG_STO = 0x4; // 000100
  let FLAG_ACC = 0x8; // 001000
  let FLAG_OBA = 0x10; //010000
  let FLAG_SPA = 0x20; //100000
  let result = FLAG_ZERO;

  if(!values.firstName){
    errors.firstName = 'Plrase update some value';
  }

  if (values.productGroupJLY) {
      result = result | FLAG_JLY;
  }
  if (values.productGroupWAT) {
      result = result | FLAG_WAT;
  }
  if (values.productGroupSTO) {
      result = result | FLAG_STO;
  }
  if (values.productGroupACC) {
      result = result | FLAG_ACC;
  }
  if (values.productGroupOBA) {
      result = result | FLAG_OBA;
  }
  if (values.productGroupSPA) {
      result = result | FLAG_SPA;
  }
  // console.log('result-->',result);
  if(result == 0){
      if (values.productGroup) {
          if (Number(values.productGroup) != 1) {
              errors.productGroupErr = 'Please selected some product group';
          }
      }
  }

  return errors;
}
