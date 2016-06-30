export default function validate(values){

  const errors = {};

  if(!values.firstName){
    errors.firstName = 'Plrase update some value';
  }

  return errors;
}
