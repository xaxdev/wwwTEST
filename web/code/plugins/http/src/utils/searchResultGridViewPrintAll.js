import numberFormat from './convertNumberformat';
import convertDate from './convertDate';
import GetPriceWithCurrency from './getPriceWithCurrency';
import compareBy from './compare';

export default function SearchResultListViewPrintAll(items, userLogin, ViewAsSet){
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

        if (ViewAsSet) {
            lblActualCost = 'Total Initial Cost (USD)';
            lblPrice = 'Total Price (USD)';
            lblUpdatedCost = 'Total Update Cost (USD)';

            let imagesGallery = [];
            let imagesOrder = [];

            if (item.image.length > 1) {
                // First checked defaultImage = 1
                imagesGallery = item.image.find((im) => {
                    return im.defaultSetImage == 1;
                })
                if (!!imagesGallery) {
                    // If has defaultImage = 1
                    imagesProduct = (imagesGallery) != undefined
                        ? imagesGallery.original : '/images/blank.gif';
                }else{
                    // checked lastModifiedDateImage by using lastModifiedDateImage
                    imagesOrder = item.image.sort(compareBy('lastModifiedDateSetImage','desc',null));
                    imagesProduct = (imagesOrder.length) != 0 ? imagesOrder[0].original : '/images/blank.gif';
                }
            }else{
                imagesProduct = (item.image) != undefined
                    ? item.image.length != 0 ?item.image[0].original : '/images/blank.gif'
                    : '/images/blank.gif';
            }

            itemDate = convertDate(item.createdDate);
            lblDate = 'Created Date:';
            price = numberFormat(item.totalPrice['USD']) + ' ' + 'USD';
            actualCost = numberFormat(item.totalActualCost['USD']) + ' ' + 'USD';
            updatedCost = numberFormat(item.totalUpdatedCost['USD']) + ' ' + 'USD';

            itemName = (item.type != 'CER')
                ? (item.description != undefined) ?
                    (item.description.length <= 80) ? item.description : item.description.substring(0, 80) + '...'
                : '-' :
                item.name ;
        }else{
            lblActualCost = `Initial Cost (${userLogin.currency})`;
            lblPrice = `Price (${userLogin.currency})`;
            lblUpdatedCost = `Update Cost (${userLogin.currency})`;

            let imagesGallery = [];
            let imagesOrder = [];

            if (item.gallery.length > 1) {
                // First checked defaultImage = 1
                imagesGallery = item.gallery.find((gallery) => {
                    return gallery.defaultImage == 1;
                })
                if (!!imagesGallery) {
                    // If has defaultImage = 1
                    imagesProduct = (imagesGallery) != undefined
                        ? imagesGallery.original : '/images/blank.gif';
                }else{
                    // checked lastModifiedDateImage by using lastModifiedDateImage
                    imagesOrder = item.gallery.sort(compareBy('lastModifiedDateImage','desc',null));
                    imagesProduct = (imagesOrder.length) != 0 ? imagesOrder[0].original : '/images/blank.gif';
                }
            }else{
                imagesProduct = (item.gallery) != undefined
                    ? (item.gallery.length) != 0 ? item.gallery[0].original : '/images/blank.gif'
                    : '/images/blank.gif';
            }

            itemDate = (item.type) != undefined
                ? (item.type != 'CER') ? convertDate(item.itemCreatedDate) : convertDate(item.itemCreatedDate)
                : '-';
            lblDate = (item.type) != undefined
                ? (item.type != 'CER') ? 'Created Date:' : 'Certificate Date:'
                : '-';

            price = GetPriceWithCurrency(item,'price');
            actualCost = GetPriceWithCurrency(item,'actualCost');
            updatedCost = GetPriceWithCurrency(item,'updatedCost');

            itemName = (item.description != undefined)
                ? (item.description.length <= 80) ? item.description : item.description.substring(0, 80) + '...'
                : '-'
            itemNameCat = (item.type != 'CER')? item.description: item.name;
            isSpecialDisc = item.specialDiscount != undefined ? item.specialDiscount == 1?true:false : false;
        }
        temPlate = temPlate + `
            <div class="col-md-3 col-sm-3 nopadding">
                <div class="searchresult-prodcut ">
                    <div className="thumbnaillgrid">
                        <span className="tagbar-soldout"></span>
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
            </div>
        `;
    });

    return `
        <div>
            ${temPlate}
        </div>
    `;
}
