export default (that, exportItems, userLogin, ROOT_URL)=> {
  var titles = ['Item Reference', 'Description', 'SKU', 'Location', 'Vendor Item Reference', 'Vendor Name',
                'Public Price', 'Quantity', 'Unit'];
  if(that.state.allFields){
    titles.push('Metal Type', 'Warehouse', 'Size', 'Cut', 'Metal Color', 'Certificate Number', 'Case Dimension',
                'Color', 'Collection', 'Certificate Date','OBA Dimension', 'Clarity', 'Brand', 'Dominant Stone',
                'Gross Weight', 'Cut Grade');
  }else{
    if(that.state.metalType) titles.push('Metal Type');
    if(that.state.site) titles.push('Warehouse');
    if(that.state.size) titles.push('Size');
    if(that.state.cut) titles.push('Cut');
    if(that.state.metalColor) titles.push('Metal Color');
    if(that.state.certificatedNumber) titles.push('Certificate Number');
    if(that.state.caseDimension) titles.push('Case Dimension');
    if(that.state.color) titles.push('Color');
    if(that.state.collection) titles.push('Collection');
    if(that.state.certificateDate) titles.push('Certificate Date');
    if(that.state.obaDimension) titles.push('OBA Dimension');
    if(that.state.clarity) titles.push('Clarity');
    if(that.state.brand) titles.push('Brand');
    if(that.state.dominantStone) titles.push('Dominant Stone');
    if(that.state.grossWeight) titles.push('Gross Weight');
    if(that.state.cutGrade) titles.push('Cut Grade');
  }
  if (that.state.showImages) titles.push('Images');

  var data = [];
  exportItems.forEach(function(item){
    // console.log('item-->',item);
    var arrayItems = [];

    arrayItems.push(item.reference,item.description,item.sku,item.siteName,item.venderReference,item.vendor,
                    (userLogin.currency == 'AED')
                    ? item.price.AED
                      : (userLogin.currency == 'CHF') ? item.price.CHF
                      : (userLogin.currency == 'EUR') ? item.price.EUR
                      : (userLogin.currency == 'JOD') ? item.price.JOD
                      : (userLogin.currency == 'KWD') ? item.price.KWD
                      : (userLogin.currency == 'LBP') ? item.price.LBP
                      : (userLogin.currency == 'OMR') ? item.price.OMR
                      : (userLogin.currency == 'QAR') ? item.price.QAR
                      : (userLogin.currency == 'SAR') ? item.price.SAR
                      : item.price.USD
                    ,item.quantity,(item.unit != undefined) ? item.unit : '');

    if(that.state.allFields){
      arrayItems.push(item.metalType,item.warehouseName,item.size,item.cut,item.metalColor,item.certificates.number,
                      item.caseDimension,item.color,item.collection,item.certificates.issuedDate,item.obaDimension,
                      item.clarity,item.brand,item.dominantStone,item.grossWeight,item.cutGrade
                    );
    }else{
      if(that.state.metalType) arrayItems.push(item.metalType);
      if(that.state.site) arrayItems.push(item.warehouseName);
      if(that.state.size) arrayItems.push(item.size);
      if(that.state.cut) arrayItems.push(item.cut);
      if(that.state.metalColor) arrayItems.push(item.metalColor);
      if(that.state.certificatedNumber) arrayItems.push(item.certificates.number);
      if(that.state.caseDimension) arrayItems.push(item.caseDimension);
      if(that.state.color) arrayItems.push(item.color);
      if(that.state.collection) arrayItems.push(item.collection);
      if(that.state.certificateDate) arrayItems.push(item.certificates.issuedDate);
      if(that.state.obaDimension) arrayItems.push(item.obaDimension);
      if(that.state.clarity) arrayItems.push(item.clarity);
      if(that.state.brand) arrayItems.push(item.brand);
      if(that.state.dominantStone) arrayItems.push(item.dominantStone);
      if(that.state.grossWeight) arrayItems.push(item.grossWeight);
      if(that.state.cutGrade) arrayItems.push(item.cutGrade);
    }

    if (that.state.showImages)
      arrayItems.push((item.gallery.length) != 0
                        ? 'http://' + ROOT_URL + item.gallery[0].thumbnail
                        : 'http://' + ROOT_URL + '/images/blank.gif');

    data.push(arrayItems);
  });
  let html = `<table id="myTable">
                 <thead>
                  <tr>`;
  titles.forEach(function(title){
    html = html + `<td><b>${title}</b></td>`;
  });
      html =  html  +
                  `</tr>
                 </thead>
                 <tbody>`
  data.forEach(function(item){
    html = html + `<tr ${that.state.showImages ? 'height="150"': ''}>`;
    let numberField = item.length;
    let countField = 1;
    item.forEach(function(feild){
      if (countField != numberField) {
        html = html + `<td>${feild}</td>`;
      } else {
        if (that.state.showImages) {
          html = html + `<td height="150"><img height='140' src='${feild}'/></td>`;
        }
      }
      countField++;
    });
    html =  html + '</tr>';
  });
        html =  html  +
                `</tbody>
              </table>`;
    var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
        tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';

        tab_text = tab_text + '<x:Name>Items</x:Name>';

        tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
        tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';

        tab_text = tab_text + '<table border="1px">';
        tab_text = tab_text + html;
        tab_text = tab_text + '</table></body></html>';
  return tab_text;
}
