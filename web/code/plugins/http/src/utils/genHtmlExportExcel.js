import numberFormat from './convertNumberformat';
import convertDate from './convertDate';

export default (that, exportItems, userLogin, ROOT_URL)=> {
  let titles = [];
  if (that.state.showImages)
      titles.push('Images');

  titles.push('Item Reference', 'Item Description', 'SKU', 'Vendor Item Reference');
  if (userLogin.currency != 'USD') {
    if (userLogin.permission.price == 'All') {
      titles.push('Initial Cost (' + userLogin.currency + ')');
    }
    if (userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') {
      titles.push('Updated Price (' + userLogin.currency + ')');
    }
    if (userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
        || userLogin.permission.price == 'All') {
      titles.push('Retail Price (' + userLogin.currency + ')');
    }

    if (userLogin.permission.price == 'All') {
      titles.push('Initial Cost (USD)');
    }
    if (userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') {
      titles.push('Updated Price (USD)');
    }
    if (userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
        || userLogin.permission.price == 'All') {
      titles.push('Retail Price (USD)');
    }
  } else {
    if (userLogin.permission.price == 'All') {
      titles.push('Initial Cost (USD)');
    }
    if (userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') {
      titles.push('Updated Price (USD)');
    }
    if (userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
        || userLogin.permission.price == 'All') {
      titles.push('Retail Price (USD)');
    }
  }

  titles.push('Item Weight (Grams)','Ring Size', 'Jewels Weight (text)','Site','company', 'Location');
  if(that.state.allFields){
    titles.push('Ingredients','Category Name','Category', 'Article', 'Collection','Set Reference Number', 'Cut','Color',
                'Clarity','Carat Wt', 'Unit', 'Qty','Origin','Symmetry','Flourance','Batch','Gold weight (Grams)',
                'Stone Qty','Dominant Stone', 'Markup%','Certificate Number','Certificate Date', 'Vendor Code',
                'Vendor Name', 'Metal Colour', 'Metal','Brand','Complication','Strap Type','Strap Color',
                'Buckle Type','Dial Index','Dial Color','Movement','Serial #','Limited Edition',
                'Limited Edition #'
              );
  }else{
    if(that.state.ingredients) titles.push('Ingredients');
    if(that.state.categoryName) titles.push('Category Name');
    if(that.state.category) titles.push('Category');
    if(that.state.article) titles.push('Article');
    if(that.state.collection) titles.push('Collection');
    if(that.state.setReferenceNumber) titles.push('Set Reference Number');
    if(that.state.cut) titles.push('Cut');
    if(that.state.color) titles.push('Color');
    if(that.state.clarity) titles.push('Clarity');
    if(that.state.caratWt) titles.push('Carat Wt');
    if(that.state.unit) titles.push('Unit');
    if(that.state.qty) titles.push('Qty');
    if(that.state.origin) titles.push('Origin');
    if(that.state.symmetry) titles.push('Symmetry');
    if(that.state.flourance) titles.push('Flourance');
    if(that.state.batch) titles.push('Batch');
    if(that.state.netWeight) titles.push('Gold weight (Grams)');
    if(that.state.stoneQty) titles.push('Stone Qty');
    if(that.state.dominantStone) titles.push('Dominant Stone');
    if(that.state.markup) titles.push('Markup%');
    if(that.state.certificatedNumber) titles.push('Certificate Number');
    if(that.state.certificateDate) titles.push('Certificate Date');
    if(that.state.vendorCode) titles.push('Vendor Code');
    if(that.state.vendorName) titles.push('Vendor Name');
    if(that.state.metalColor) titles.push('Metal Colour');
    if(that.state.metalType) titles.push('Metal');
    if(that.state.brand) titles.push('Brand');
    if(that.state.complication) titles.push('Complication');
    if(that.state.strapType) titles.push('Strap Type');
    if(that.state.strapColor) titles.push('Strap Color');
    if(that.state.buckleType) titles.push('Buckle Type');
    if(that.state.dialIndex) titles.push('Dial Index');
    if(that.state.dialColor) titles.push('Dial Color');
    if(that.state.movement) titles.push('Movement');
    if(that.state.serial) titles.push('Serial #');
    if(that.state.limitedEdition) titles.push('Limited Edition');
    if(that.state.limitedEditionNumber) titles.push('Limited Edition #');
  }

  let data = [];
  exportItems.forEach(function(item){
    // console.log('item-->',item);
    let arrayItems = [];
    let itemReference = item.reference;

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
    let jewelsWeight = 0;
    item.gemstones.forEach(function(gemstone) {
      if(gemstone.carat != undefined){
        jewelsWeight = jewelsWeight + gemstone.carat;
      }
    });
    arrayItems.push((item.grossWeight != undefined) ? item.grossWeight : '',
                    (item.size != undefined) ? item.size : '',
                    jewelsWeight,
                    (item.site != undefined) ? item.site : '',
                    (item.company != undefined) ? item.company : '',
                    (item.warehouse != undefined) ? item.warehouse : '',
                  );

    if(that.state.allFields){
      arrayItems.push('Main',
                      (item.hierarchy != undefined) ? item.hierarchy.split('\\').pop() : '',
                      (item.type == 'ACC' || item.type == 'OBA' || item.type == 'SPA') ? item.subType : '', // category
                      (item.type == 'JLY' || item.type == 'WAT' || item.type == 'STO') ? item.subType : '', // article
                      (item.collectionName != undefined) ? item.collectionName : '',
                      (item.setReference != undefined) ? item.setReference : '',
                      (item.cut != undefined) ? item.cut : '',
                      (item.color != undefined) ? item.color : '',
                      (item.clarity != undefined) ? item.clarity : '',
                      (item.carat != undefined) ? item.carat : 0,
                      (item.unit != undefined) ? item.unit : '',
                      (item.quantity != undefined) ? item.quantity : '',
                      (item.origin != undefined) ? item.origin : '',
                      (item.symmetry != null) ? item.symmetry : '',
                      (item.fluorescence != undefined) ? item.fluorescence : '',
                      (item.lotNumber != undefined) ? item.lotNumber : '',
                      (item.netWeight != undefined) ? item.netWeight : ''
                    );
                      let stoneQty = 0;
                      item.gemstones.forEach(function(gemstone) {
                        if(gemstone.quantity != undefined){
                          stoneQty = stoneQty + gemstone.quantity;
                        }
                      });
      arrayItems.push(stoneQty,
                      (item.dominantStoneName != undefined) ? item.dominantStoneName : '',
                      (item.markup != undefined) ? item.markup : '',
                      '',
                      '',
                      (item.vendor != undefined) ? item.vendor : '',
                      (item.vendorName != undefined) ? item.vendorName : '',
                      (item.metalColorName != undefined) ? item.metalColorName : '',
                      (item.metalTypeName != undefined) ? item.metalTypeName : '',
                      (item.brandName != undefined) ? item.brandName : '',
                      (item.complicationName != undefined) ? item.complicationName : '',
                      (item.strapTypeName != undefined) ? item.strapTypeName : '',
                      (item.strapColorName != undefined) ? item.strapColorName : '',
                      (item.buckleTypeName != undefined) ? item.buckleTypeName : '',
                      (item.dialIndexName != undefined) ? item.dialIndexName : '',
                      (item.dialColorName != undefined) ? item.dialColorName : '',
                      (item.movementName != undefined) ? item.movementName : '',
                      (item.serialNumber != undefined) ? item.serialNumber : '',
                      (item.limitedEdition != undefined) ? (item.limitedEdition) ? 'Yes' : 'No' : 'No',
                      (item.limitedEditionNumber != undefined) ? item.limitedEditionNumber : ''
                    );

    }else{
      if(that.state.ingredients) arrayItems.push('Main');
      if(that.state.categoryName) arrayItems.push((item.hierarchy != undefined) ? item.hierarchy.split('\\').pop() : '');
      if(that.state.category) arrayItems.push((item.type == 'ACC' || item.type == 'OBA' || item.type == 'SPA') ? item.subType : '');
      if(that.state.article) arrayItems.push((item.type == 'JLY' || item.type == 'WAT' || item.type == 'STO') ? item.subType : '');
      if(that.state.collection) arrayItems.push((item.collectionName != undefined) ? item.collectionName : '');
      if(that.state.setReferenceNumber) arrayItems.push((item.setReference != undefined) ? item.setReference : '');
      if(that.state.cut) arrayItems.push((item.cut != undefined) ? item.cut : '');
      if(that.state.color) arrayItems.push((item.color != undefined) ? item.color : '');
      if(that.state.clarity) arrayItems.push((item.clarity != undefined) ? item.clarity : '');
      if(that.state.caratWt) arrayItems.push((item.carat != undefined) ? item.carat : 0);
      if(that.state.unit) arrayItems.push((item.unit != undefined) ? item.unit : '');
      if(that.state.qty) arrayItems.push((item.quantity != null) ? item.quantity : '');
      if(that.state.origin) arrayItems.push((item.origin != undefined) ? item.origin : '');
      if(that.state.symmetry) arrayItems.push((item.symmetry != undefined) ? item.symmetry : '');

      if(that.state.flourance) arrayItems.push((item.fluorescence != undefined) ? item.fluorescence : '');
      if(that.state.batch) arrayItems.push((item.lotNumber != undefined) ? item.lotNumber : '');
      if(that.state.netWeight) arrayItems.push((item.netWeight != undefined) ? item.netWeight : '');
      let stoneQty = 0;
                      item.gemstones.forEach(function(gemstone) {
                        if(gemstone.quantity != undefined){
                          stoneQty = stoneQty + gemstone.quantity;
                        }
                      });
      if(that.state.stoneQty) arrayItems.push((stoneQty != 0) ? stoneQty : 0);
      if(that.state.dominantStone) arrayItems.push((item.dominantStoneName != undefined) ? item.dominantStoneName : '');
      if(that.state.markup) arrayItems.push((item.markup != undefined) ? item.markup : '');
      if(that.state.certificatedNumber) arrayItems.push('');
      if(that.state.certificateDate) arrayItems.push('');
      if(that.state.vendorCode) arrayItems.push((item.vendor != undefined) ? item.vendor : '');
      if(that.state.vendorName) arrayItems.push((item.vendorName != undefined) ? item.vendorName : '');
      if(that.state.metalColor) arrayItems.push((item.metalColorName != undefined) ? item.metalColorName : '');
      if(that.state.metalType) arrayItems.push((item.metalTypeName != undefined) ? item.metalTypeName : '');
      if(that.state.brand) arrayItems.push((item.brandName != undefined) ? item.brandName : '');
      if(that.state.complication) arrayItems.push((item.complicationName != undefined) ? item.complicationName : '');
      if(that.state.strapType) arrayItems.push((item.strapTypeName != undefined) ? item.strapTypeName : '');
      if(that.state.strapColor) arrayItems.push((item.strapColorName != undefined) ? item.strapColorName : '');
      if(that.state.buckleType) arrayItems.push((item.buckleTypeName != undefined) ? item.buckleTypeName : '');
      if(that.state.dialIndex) arrayItems.push((item.dialIndexName != undefined) ? item.dialIndexName : '');
      if(that.state.dialColor) arrayItems.push((item.dialColorName != undefined) ? item.dialColorName : '');
      if(that.state.movement) arrayItems.push((item.movementName != undefined) ? item.movementName : '');
      if(that.state.serial) arrayItems.push((item.serialNumber != undefined) ? item.serialNumber : '');
      if(that.state.limitedEdition) arrayItems.push((item.limitedEdition != undefined) ? (item.limitedEdition) ? 'Yes' : 'No' : 'No');
      if(that.state.limitedEditionNumber) arrayItems.push((item.limitedEditionNumber != undefined) ? item.limitedEditionNumber : '');
    }

    if(item.gemstones.length == 0){
      data.push(arrayItems);

    }else{
      data.push(arrayItems);

      if(that.state.ingredients || that.state.allFields){
        item.gemstones.forEach(function(gemstone) {
          arrayItems = [];
        if (that.state.showImages)
            arrayItems.push(''); // images

          arrayItems.push(itemReference, // Item Reference
                          '', // Item Description
                          (gemstone.stoneTypeId != undefined) ? gemstone.stoneTypeId : '', // sku
                          ''); // Vendor ref
          if (userLogin.currency != 'USD') {
            if (userLogin.permission.price == 'All') {
              arrayItems.push(numberFormat(gemstone.cost[userLogin.currency])); // Initial Cost
            }
            if (userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') {
              arrayItems.push(''); // updated Price
            }
            if (userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
              || userLogin.permission.price == 'All') {
              arrayItems.push('');// Price
            }

            if (userLogin.permission.price == 'All') {
                arrayItems.push(numberFormat(gemstone.cost['USD'])); // Initial Cost (USD)
            }
            if (userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') {
                arrayItems.push(''); // updated Price (USD)
            }
            if (userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                || userLogin.permission.price == 'All') {
                arrayItems.push('');// Price (USD)
            }
          }else{
            if (userLogin.permission.price == 'All') {
              arrayItems.push(numberFormat(gemstone.cost['USD']));// Initial Cost (USD)
            }
            if (userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') {
              arrayItems.push(''); // updated Price (USD)
            }
            if (userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                || userLogin.permission.price == 'All') {
              arrayItems.push('');// Price (USD)
            }
          }

          arrayItems.push('', // Item Weight (Grams)
                          '', // Ring Size
                          '', // Jewels Weight
                          '', // Site
                          '', // Company
                          ''); // Location

          arrayItems.push('Ingredient');
            if(that.state.categoryName || that.state.allFields) arrayItems.push(''); // Category Name
            if(that.state.category || that.state.allFields) arrayItems.push(''); // Category
            if(that.state.article || that.state.allFields) arrayItems.push(''); // article
            if(that.state.collection || that.state.allFields) arrayItems.push(''); // Collection
            if(that.state.setReferenceNumber || that.state.allFields) arrayItems.push(''); // Set Reference Number
            if(that.state.cut || that.state.allFields) arrayItems.push((gemstone.cut != undefined) ? gemstone.cut : ''); // Cut
            if(that.state.color || that.state.allFields) arrayItems.push((gemstone.color != undefined) ? gemstone.color : ''); // Color
            if(that.state.clarity || that.state.allFields) arrayItems.push((gemstone.clarity != undefined) ? gemstone.clarity : ''); // Clarity
            if(that.state.caratWt || that.state.allFields) arrayItems.push((gemstone.carat != undefined) ? gemstone.carat : ''); // Carat Wt
            if(that.state.unit || that.state.allFields) arrayItems.push((gemstone.unit != undefined) ? gemstone.unit : ''); // Unit
            if(that.state.qty || that.state.allFields) arrayItems.push((gemstone.quantity != undefined) ? gemstone.quantity : ''); // Qty
            if(that.state.origin || that.state.allFields) arrayItems.push((gemstone.origin != undefined) ? gemstone.origin : ''); // Origin
            if(that.state.symmetry || that.state.allFields) arrayItems.push((gemstone.symmetry != undefined) ? gemstone.symmetry : ''); // symmetry
            if(that.state.flourance || that.state.allFields) arrayItems.push((gemstone.fluorescence != undefined) ? gemstone.fluorescence : ''); // Flourance
            if(that.state.batch || that.state.allFields) arrayItems.push(''); // Batch lot number
            if(that.state.netWeight || that.state.allFields) arrayItems.push(''); // Gold weight (Grams)
            if(that.state.stoneQty || that.state.allFields) arrayItems.push(0); // Stone Qty
            if(that.state.dominantStone || that.state.allFields) arrayItems.push(''); // Dominant Stone
            if(that.state.markup || that.state.allFields) arrayItems.push(''); // Markup%
            if(that.state.certificatedNumber || that.state.allFields) arrayItems.push((gemstone.certificate != undefined) ? gemstone.certificate.number : ''); // Certificate Number
            if(that.state.certificateDate || that.state.allFields) arrayItems.push((gemstone.certificate != undefined) ? convertDate(gemstone.certificate.issuedDate) : ''); // Certificate Date
            if(that.state.vendorCode || that.state.allFields) arrayItems.push(''); // Vendor Code
            if(that.state.vendorName || that.state.allFields) arrayItems.push(''); // Vendor Name
            if(that.state.metalColor || that.state.allFields) arrayItems.push(''); // Metal Color
            if(that.state.metalType || that.state.allFields) arrayItems.push(''); // Metal
            if(that.state.brand || that.state.allFields) arrayItems.push(''); // Brand
            if(that.state.complication || that.state.allFields) arrayItems.push(''); // Complication
            if(that.state.strapType || that.state.allFields) arrayItems.push(''); // Strap Type
            if(that.state.strapColor || that.state.allFields) arrayItems.push(''); // Strap Color
            if(that.state.buckleType || that.state.allFields) arrayItems.push(''); // Buckle Type
            if(that.state.dialIndex || that.state.allFields) arrayItems.push(''); // Dial Index
            if(that.state.dialColor || that.state.allFields) arrayItems.push(''); // Dial Color
            if(that.state.movement || that.state.allFields) arrayItems.push(''); // Movement
            if(that.state.serial || that.state.allFields) arrayItems.push(''); // Serial #
            if(that.state.limitedEdition || that.state.allFields) arrayItems.push((item.limitedEdition != undefined) ? (item.limitedEdition) ? 'Yes' : 'No' : 'No'); // Limited Edition
            if(that.state.limitedEditionNumber || that.state.allFields) arrayItems.push(''); // Limited Edition #
          data.push(arrayItems);
        });
      }

    }

  });
  let countColumn = 0;
  let columnIngredients = 0;
  titles.forEach(function(title){
    countColumn++;
    if(title == 'Ingredients'){
      columnIngredients = countColumn;
    }
  });

  let html = `<table id="myTable" border='1'>
                 <thead>
                  <tr>`;
  countColumn = 0;
  titles.forEach(function(title){
    countColumn++;
    if (title != 'Images') {
      if (that.state.allFields) {
        if(countColumn < columnIngredients){
          html = html + `<td bgcolor="#F79647"><b>${title}</b></td>`;
        }else{
          html = html + `<td bgcolor="#92D14F"><b>${title}</b></td>`;
        }
      } else {
        html = html + `<td bgcolor="#F79647"><b>${title}</b></td>`;
      }

    } else {
      html = html + `<td width='150' bgcolor="#F79647"><b>${title}</b></td>`;
    }
  });
      html =  html  +
                  `</tr>
                 </thead>
                 <tbody>`
  data.forEach(function(item){
    let numberField = item.length;
    let countField = 1;
    if(countField == 1){
      if(item[0] != ''){
        html = html + `<tr ${that.state.showImages ? 'height="150"': ''}>`;
      }else{
        html = html + '<tr>';
      }
    }

    item.forEach(function(feild){
      if (countField != 1) {
        html = html + `<td>${feild}</td>`;
      } else {
        if (that.state.showImages) {
          if(feild != ''){
            html = html + `<td width='150'><img height='140' src='${feild}'/></td>`;
          }else{
            html = html + `<td>${feild}</td>`;
          }
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
    let tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
        tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';

        tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
        tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';

        tab_text = tab_text + html ;
        tab_text = tab_text + '</body></html>';
  return html;
}
