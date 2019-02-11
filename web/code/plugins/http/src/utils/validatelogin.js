export default function validate(values){
    const { username, password } = values
    const errors = {};
    if(!username){
        errors.username = 'Please input username';
    }

    if(!password){
        errors.password = 'Please input password';
    }

    return errors;
}
