export default function InitData(paramsHeader,value,key){
  if (paramsHeader == null || paramsHeader == undefined){ // first render
    //not input data
    if(value == null || value == undefined){
      return '';
    }else{
      return value;
    }
  //     sku = paramsHeader.sku;
  }else{
    if(value != paramsHeader[key]){ //paramsHeader.reference
      if (value != undefined){
          return value;
      }else{
        return paramsHeader[key];
      }
    }else{
      return paramsHeader[key];
    }
  }
}
