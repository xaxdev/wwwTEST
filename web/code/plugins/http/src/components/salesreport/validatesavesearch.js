export default function validate(values){
    const errors = {};
    if(!!values.searchName){
        if(values.searchName != '') {
            // key search name
            errors.validateSearchName = false;
        }else{
            // not key search name
            errors.validateSearchName =  true;
        }
    }else{
        // not key search name undefined
        errors.validateSearchName =  true;
    }
    return errors;
}
