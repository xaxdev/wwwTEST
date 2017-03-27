export default function validate(values){
    const errors = {};
    if(!!values.shareTo){
        // console.log('validate email-->',values.shareTo);
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        var emails = values.shareTo.replace(/\s/g, '').split(/,|;/);
        for(var i = 0;i < emails.length;i++) {
            if(!regex.test(emails[i])) {
                errors.validateEmailTo = false;
            }else{
                errors.validateEmailTo =  true;
            }
        }
    }
    return errors;
}
