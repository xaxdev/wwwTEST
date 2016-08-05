export default function validate(values){

  const errors = {};

  if(!values.firstName){
    errors.firstName = 'Enter First Name';
  }

  if(!values.lastName){
    errors.lastName = 'Enter Last Name';
  }

  if(!values.username){
    errors.username = 'Enter User Name';
  }
  if(!values.email){
    errors.email = 'Enter Email';
  }
  if(!values.password){
    errors.password = 'Enter Password';
  }
  if(!values.role){
    errors.role = 'Enter Role';
  }
  if(!values.currency){
    errors.currency = 'Enter Currency';
  }
  if(!values.status){
    errors.status = 'Select Status';
  }
  if(!values.company){
    errors.company = 'Enter Company';
  }
  if(!values.location){
    errors.location = 'Enter location';
  }

  return errors;

}
