export default function validate(values){

  const errors = {};
  if(!values.username){
    errors.username = 'Please input username';
  }

  if(!values.password){
    errors.password = 'Please input password';
  }
  return errors;
}
