export default function validate(values){

    const errors = {};
  let errorOld = true;
  let errorNew = true;
  if(!values.oldSetCatalogName){
      errorOld = false;
  }else{
      errorOld = true;
  }
  if(!values.newSetCatalogName){
      errorNew = false;
  }else{
      errorNew = true;
  }
    errors.validateCatalogName = errorOld||errorNew;
  return errors;
}
