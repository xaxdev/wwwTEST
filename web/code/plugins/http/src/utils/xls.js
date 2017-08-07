var X = XLSX;

function to_csv(workbook) {
    let result = {};
    let item = [];
    let AllData = [];
    workbook.SheetNames.forEach(function(sheetName) {
      // var csv = X.utils.sheet_to_csv(workbook.Sheets[sheetName]);
      var csv = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
      if(csv.length > 0){
        csv.forEach(function(val,key){
          // console.log('key-->',key);
          // console.log('val-->',val.item);
          item.push(val.item_reference);
          AllData.push(val);
        });
      }
    });
    return {...result,'item':item,'AllData':AllData};
}
function to_formulae(workbook) {
   var result = [];
  workbook.SheetNames.forEach(function(sheetName) {
    var formulae = X.utils.get_formulae(workbook.Sheets[sheetName]);
    if(formulae.length > 0){
      result.push('SHEET: ' + sheetName);
      result.push('');
      result.push(formulae.join('\n'));
    }
  });
  return result.join('\n');
}
function to_json(workbook) {
  var result = {};
  workbook.SheetNames.forEach(function(sheetName) {
    var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
    if(roa.length > 0){
      result[sheetName] = roa;
    }
  });
  return result;
}
function get_radio_value( radioName ) {
  var radios = document.getElementsByName( radioName );
  for( var i = 0; i < radios.length; i++ ) {
    if( radios[i].checked || radios.length === 1 ) {
      return radios[i].value;
    }
  }
}

export function fixdata(data) {
  var o = '', l = 0, w = 10240;
  for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
  o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
  return o;
}

export function process_wb(wb) {
  var output = '';
  switch(get_radio_value('format')) {
    case 'json':
      output = JSON.stringify(to_json(wb), 2, 2);
      break;
    case 'form':
      output = to_formulae(wb);
      break;
    default:
    output = to_csv(wb);
    // output = this.to_json(wb);
  }
  return output;
}
