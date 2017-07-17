export default function GetCodeNotUseHierarchy(notUseHierarchy, category){
    let code = '';
    if (notUseHierarchy != null) {
        if (notUseHierarchy[category] != undefined && notUseHierarchy[category].length > 0) {
            notUseHierarchy[category].map((val) => {
                code = (code == '') ? val.code : code + '|' + val.code;
            });
            // filters.push({'notUseHierarchy': code});
        }
    }
    return code;
}
