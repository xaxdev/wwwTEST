export default function GetLotNumber(valueKeys, keycat){
    let propname = {};
    if(valueKeys != ''){
      propname['lotNumbers.'+keycat]= valueKeys;
    }else{
      propname[keycat]= valueKeys;
    }
    return propname;
}
