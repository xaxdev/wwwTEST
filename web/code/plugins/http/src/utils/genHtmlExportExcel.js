import numberFormat from './convertNumberformat';

export default (that, exportItems, userLogin, ROOT_URL)=> {
  let titles = [];
  if (that.state.showImages) titles.push('Images');

  titles.push('Item Reference', 'Item Description', 'SKU', 'Vendor Item Reference');
  if (userLogin.currency != 'USD') {
    if (userLogin.permission.price == 'All') {
      titles.push('Actual Price');
    }
    if (userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') {
      titles.push('Updated Price');
    }
    if (userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
        || userLogin.permission.price == 'All') {
      titles.push('Public Price');
    }

    if (userLogin.permission.price == 'All') {
      titles.push('Actual Price (USD)');
    }
    if (userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') {
      titles.push('Updated Price (USD)');
    }
    if (userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
        || userLogin.permission.price == 'All') {
      titles.push('Public Price (USD)');
    }
  } else {
    if (userLogin.permission.price == 'All') {
      titles.push('Actual Price (USD)');
    }
    if (userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') {
      titles.push('Updated Price (USD)');
    }
    if (userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
        || userLogin.permission.price == 'All') {
      titles.push('Public Price (USD)');
    }
  }

  titles.push('Gross Weight','Ring Size','Site','company', 'Warehouse');
  if(that.state.allFields){
    titles.push('Ingredients','Category Name','Category', 'Collection','Set Reference Number', 'Cut','Vendor Name','Color',
                'Clarity','Carat Wt', 'Unit', 'Qty','Origin','Symmetry','Flourance','Dominant Stone', 'Markup%',
                'Certificate Number','Certificate Date', 'Vendor Code','Vendor Name', 'Metal Colour', 'Metal','Brand',
                'Complication','Strap Type','Strap Color','Buckle Type','Dial Index','Dial Color','Movement',
                'Serial #','Limited Edition','Limited Edition #'
              );
  }else{
    if(that.state.metalType) titles.push('Ingredients');
    if(that.state.metalType) titles.push('Category Name');
    if(that.state.site) titles.push('Category');
    if(that.state.size) titles.push('Collection');
    if(that.state.cut) titles.push('Set Reference Number');
    if(that.state.metalColor) titles.push('Cut');
    if(that.state.certificatedNumber) titles.push('Vendor Name');
    if(that.state.color) titles.push('Color');
    if(that.state.collection) titles.push('Clarity');
    if(that.state.certificateDate) titles.push('Carat Wt');
    if(that.state.clarity) titles.push('Unit');
    if(that.state.brand) titles.push('Qty');
    if(that.state.dominantStone) titles.push('Origin');
    if(that.state.grossWeight) titles.push('Symmetry');
    if(that.state.grossWeight) titles.push('Flourance');
    if(that.state.grossWeight) titles.push('Dominant Stone');
    if(that.state.grossWeight) titles.push('Markup%');
    if(that.state.grossWeight) titles.push('Certificate Number');
    if(that.state.grossWeight) titles.push('Certificate Date');
    if(that.state.grossWeight) titles.push('Vendor Code');
    if(that.state.grossWeight) titles.push('Vendor Name');
    if(that.state.grossWeight) titles.push('Metal Colour');
    if(that.state.grossWeight) titles.push('Metal');
    if(that.state.grossWeight) titles.push('Brand');
    if(that.state.grossWeight) titles.push('Complication');
    if(that.state.grossWeight) titles.push('Strap Type');
    if(that.state.grossWeight) titles.push('Strap Color');
    if(that.state.grossWeight) titles.push('Buckle Type');
    if(that.state.grossWeight) titles.push('Dial Index');
    if(that.state.grossWeight) titles.push('Dial Color');
    if(that.state.grossWeight) titles.push('Movement');
    if(that.state.grossWeight) titles.push('Serial #');
    if(that.state.grossWeight) titles.push('Limited Edition');
    if(that.state.grossWeight) titles.push('Limited Edition #');
  }

  var data = [];
  exportItems.forEach(function(item){
    // console.log('item-->',item);
    var arrayItems = [];

    if (that.state.showImages)
      arrayItems.push((item.gallery.length) != 0
                        ? 'http://' + ROOT_URL + item.gallery[0].thumbnail
                        : 'http://' + ROOT_URL + '/images/blank.gif');

    arrayItems.push(item.reference,item.description,item.sku,item.venderReference);

    if (userLogin.currency != 'USD') {
      if (userLogin.permission.price == 'All') {
        arrayItems.push(numberFormat(item.actualCost[userLogin.currency]));
      }
      if (userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') {
        arrayItems.push(numberFormat(item.updatedCost[userLogin.currency]));
      }
      if (userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
          || userLogin.permission.price == 'All') {
        arrayItems.push(numberFormat(item.price[userLogin.currency]));
      }

      if (userLogin.permission.price == 'All') {
        arrayItems.push(numberFormat(item.actualCost['USD']));
      }
      if (userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') {
        arrayItems.push(numberFormat(item.updatedCost['USD']));
      }
      if (userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
          || userLogin.permission.price == 'All') {
        arrayItems.push(numberFormat(item.price['USD']));
      }
    }else{
      if (userLogin.permission.price == 'All') {
        arrayItems.push(numberFormat(item.actualCost['USD']));
      }
      if (userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') {
        arrayItems.push(numberFormat(item.updatedCost['USD']));
      }
      if (userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
          || userLogin.permission.price == 'All') {
        arrayItems.push(numberFormat(item.price['USD']));
      }
    }
    arrayItems.push((item.grossWeight != undefined) ? item.grossWeight : '',
                    (item.size != undefined) ? item.size : '',
                    (item.site != undefined) ? item.site : '',
                    (item.company != undefined) ? item.company : '',
                    (item.warehouse != undefined) ? item.warehouse : '',
                  );

    if(that.state.allFields){
      arrayItems.push('',
                      (item.hierarchy != undefined) ? item.hierarchy : '',
                      '',
                      (item.collectionName != undefined) ? item.collectionName : '',
                      (item.setReference != undefined) ? item.setReference : '',
                      (item.cutName != undefined) ? item.cutName : '',
                      (item.metalColorName != undefined) ? item.metalColorName : '',
                      (item.gemstones.certificate != undefined) ? item.gemstones.certificate.number : '',
                      (item.colorName != undefined) ? item.colorName : '',
                      (item.collectionName != undefined) ? item.collectionName : '',
                      (item.gemstones.certificate != undefined) ? item.gemstones.certificate.issuedDate : '',
                      (item.clarityName != undefined) ? item.clarityName : '',
                      (item.brandName != null) ? item.brandName : '',
                      (item.dominantStoneName != undefined) ? item.dominantStoneName : '',
                      (item.grossWeight != undefined) ? item.grossWeight : ''
                    );
    }else{
      if(that.state.metalType) arrayItems.push((item.metalTypeName != undefined) ? item.metalTypeName : '');
      if(that.state.site) arrayItems.push((item.warehouseName != undefined) ? item.warehouseName : '');
      if(that.state.size) arrayItems.push((item.size != undefined) ? item.size : '');
      if(that.state.cut) arrayItems.push((item.cutName != undefined) ? item.cutName : '');
      if(that.state.metalColor) arrayItems.push((item.metalColorName != undefined) ? item.metalColorName : '');
      if(that.state.certificatedNumber) arrayItems.push((item.gemstones.certificate != undefined) ? item.gemstones.certificate.number : '');
      if(that.state.color) arrayItems.push((item.colorName != undefined) ? item.colorName : '');
      if(that.state.collection) arrayItems.push((item.collectionName != undefined) ? item.collectionName : '');
      if(that.state.certificateDate) arrayItems.push((item.gemstones.certificate != undefined) ? item.gemstones.certificate.issuedDate : '');
      if(that.state.clarity) arrayItems.push((item.clarityName != undefined) ? item.clarityName : '');
      if(that.state.brand) arrayItems.push((item.brandName != null) ? item.brandName : '');
      if(that.state.dominantStone) arrayItems.push((item.dominantStoneName != undefined) ? item.dominantStoneName : '');
      if(that.state.grossWeight) arrayItems.push((item.grossWeight != undefined) ? item.grossWeight : '');
    }

    data.push(arrayItems);
  });
  let html = `<table id="myTable">
                 <thead>
                  <tr>`;
  titles.forEach(function(title){
    if (title != 'Images') {
      html = html + `<td><b>${title}</b></td>`;
    } else {
      html = html + `<td width='150'><b>${title}</b></td>`;
    }
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
      if (countField != 1) {
        html = html + `<td>${feild}</td>`;
      } else {
        if (that.state.showImages) {
          html = html + `<td width='150'><img height='140' src='${feild}'/></td>`;
        }else{
          html = html + `<td>${feild}</td>`;
        }
      }
      countField++;
    });
    html =  html + '</tr>';
  });
        html =  html  +
                `</tbody>
              </table>`;
    var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">';
        tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';

        tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
        tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';

        tab_text = tab_text + html;
  return tab_text;
}
