export default function validate(values){
    const errors = {};
    let errorOld = true;
    let errorNew = true;
    if(!values.oldCatalogName && !values.oldSetCatalogName){
        errorOld = false;
    }else{
        errorOld = true;
    }
    if(!values.newCatalogName && !values.newSetCatalogName){
        errorNew = false;
    }else{
        errorNew = true;
    }
    if (values.viewAsSet != undefined) {
        if (values.viewAsSet) {
            if(!values.oldYingCatalogName){
                errorNew = false;
            }else{
                errorNew = true;
            }
        } else {
            if(!values.oldSetReference){
                errorNew = false;
            }else{
                errorNew = true;
            }
        }
    }
    
    errors.validateCatalogName = errorOld||errorNew;
    return errors;
}
