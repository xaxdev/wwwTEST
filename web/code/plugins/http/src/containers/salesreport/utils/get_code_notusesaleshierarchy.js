export default function GetCodeNotUseSalesHierarchy(notUseSalesHierarchy, category){
    let code = '';
    if (notUseSalesHierarchy != null) {
        if (notUseSalesHierarchy[category] != undefined && notUseSalesHierarchy[category].length > 0) {
            notUseSalesHierarchy[category].map((val) => {
                code = (code == '') ? val.code : code + '|' + val.code;
            });
            // filters.push({'notUseSalesHierarchy': code});
        }
    }
    return code;
}
