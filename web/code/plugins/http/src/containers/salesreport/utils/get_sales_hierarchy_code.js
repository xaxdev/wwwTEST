export default function GetHierarchyCode(valueKeys){
    let propname = {};
    if(valueKeys.length == 1){
        propname['hierarchy'] = valueKeys[0].code;
    }else{
        let code = '';
        valueKeys.forEach((objHi)=>{
            code = (code == '') ? objHi.code : code + '|' + objHi.code;
        });
        propname['hierarchy'] = code.trim();
    }
    return propname;
}
