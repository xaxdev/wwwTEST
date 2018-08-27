import numberFormat from './convertNumberformat';
import convertDate from './convertDate';

export default function MyCatalogPrintAll(items, userLogin){
    let temPlate = '';

    items.map(function(item, index){
        let imagesProduct = '';
        let itemDate = '';
        let lblDate = '';
        let price = '';
        let actualCost = '';
        let updatedCost = '';
        let itemName = '';
        let itemNameCat = '';
        let lblActualCost = '';
        let lblPrice = '';
        let lblUpdatedCost = '';
        let isSpecialDisc = false;
        if (item.id != null) {
            lblActualCost = `Cost Price (USD)`;
            lblPrice = `Price (USD)`;
            lblUpdatedCost = `Update Cost (USD)`;
            imagesProduct = (item.authorization)
                ? (item.gallery.length) != 0
                    ? item.gallery[0].original
                    : '/images/blank.gif'
                :'/images/login-logo@2x.png';
            imagesProduct = (item.availability) ? imagesProduct : '/images/imagesoldout@2x.png';
            itemDate = (item.authorization)
                ? (item.type != 'CER') ? convertDate(item.itemCreatedDate) : convertDate(item.itemCreatedDate)
                : '';
            lblDate = (item.authorization)
                ? (item.type != 'CER') ? 'Created Date:' : 'Certificate Date:'
                : '';
            price = (item.authorization)
                ? (item.price != -1)? numberFormat(item.price) + ' ' + 'USD': '- ' + 'USD'
                : '- ' + 'USD';
            actualCost = (item.authorization)
                ? (item.actualCost != -1)? numberFormat(item.actualCost) + ' ' + 'USD': '- ' + 'USD'
                : '- ' + 'USD';
            updatedCost = (item.authorization)
                ? (item.updatedCost != -1)? numberFormat(item.updatedCost) + ' ' + item.userCurrency: '- ' + 'USD'
                : '- ' + 'USD';
            itemName = (item.authorization)
                ? (item.type != 'CER')?
                    (item.description != undefined) ?
                        (item.description.length <= 80) ? item.description : item.description.substring(0, 80) + '...'
                        : '-' :
                    item.name
                : '';
            itemNameCat = (item.authorization)
                ? (item.type != 'CER')? item.description: item.name
                : '';
            isSpecialDisc = item.specialDiscount != undefined ? item.specialDiscount == 1?true:false : false;
        }else{
            lblActualCost = 'Total Cost Price (USD)';
            lblPrice = 'Total Price (USD)';
            lblUpdatedCost = 'Total Update Cost (USD)';
            imagesProduct = (item.image) != undefined ? item.image.length != 0 ?item.image[0].original : '/images/blank.gif' : '/images/login-logo@2x.png';

            imagesProduct = (item.availability) ? imagesProduct : '/images/imagesoldout@2x.png';

            itemDate = (item.authorization)
                ? (item.type != 'CER') ? convertDate(item.createdDate) : convertDate(item.createdDate)
                : '';
            lblDate = (item.authorization)
                ? (item.type != 'CER') ? 'Created Date:' : 'Certificate Date:'
                : '';
            price = (item.authorization)
                ? (item.totalPrice['USD'] != -1)? numberFormat(item.totalPrice['USD']) + ' ' + 'USD': '- ' + 'USD'
                : '- ' + 'USD';
            actualCost = (item.authorization)
                ? (item.totalActualCost['USD'] != -1)? numberFormat(item.totalActualCost['USD']) + ' ' + 'USD': '- ' + 'USD'
                : '- ' + 'USD';
            updatedCost = (item.authorization)
                ? (item.totalUpdatedCost['USD'] != -1)? numberFormat(item.totalUpdatedCost['USD']) + ' ' + 'USD': '- ' + 'USD'
                : '- ' + 'USD';
            itemName = (item.authorization)
                ? (item.type != 'CER')?
                    (item.description != undefined) ?
                    (item.description.length <= 80) ? item.description : item.description.substring(0, 80) + '...'
                    : '-' :
                    item.name
                : '';
            itemNameCat = (item.authorization)
                ? (item.type != 'CER')? item.description: item.name
                : '';
            isSpecialDisc = item.specialDiscount != undefined ? item.specialDiscount == 1?true:false : false;
        }
        temPlate = temPlate + `
        <div class="col-md-3 col-sm-3 nopadding">
            <div class="searchresult-prodcut ">`
            if (isSpecialDisc) {
                temPlate = temPlate +
                `<span class="tagbar-special"></span>`
            }else{
                temPlate = temPlate +
                `<span class=""></span>`
            }
        temPlate = temPlate + `
                <div class="thumbnaillgrid">
                    <img  src="${imagesProduct}" />
                </div>
                <p class="font-b fc-000">
                    <span>${item.reference}</span><br/>
                    <span>${(item.authorization)?item.sku!=undefined?item.sku:'':''}</span>
                </p>
                <p class="product-detail-h">
                    ${itemName}
                </p>
                <span class="fc-ae8f3b font-b price ${(item.authorization)?(item.type != 'CER') ? '' : 'hidden':''}">${price}</span>
                <span class="line"></span>
            </div>
        </div>`;
    });
    return `
        <div>
            ${temPlate}
        </div>`;
}
