export default (salesPricePermission)=> {
    let permission = {
        priceSalesRTP: false,
        priceSalesUCP: false,
        priceSalesCTP: false,
        priceSalesNSP: false,
        priceSalesMGP: false,
        priceSalesDSP: false
    }

    let bitwisePriceSales = Number(salesPricePermission).toString(2);
    let checkbitsPriceSales = bitwisePriceSales.split('');
    let numberDiitPriceSales = checkbitsPriceSales.length;        

    checkbitsPriceSales.map(function(value,key){
        switch (numberDiitPriceSales) {
            case 1:
                permission.priceSalesRTP = (value == '1')?true:false;
                break;
            case 2:
                if(key == 0){
                    permission.priceSalesUCP = (value == '1')?true:false;
                }else if (key == 1) {
                    permission.priceSalesRTP = (value == '1')?true:false;
                }
                break;
            case 3:
                if(key == 0){
                    permission.priceSalesCTP = (value == '1')?true:false;
                }else if (key == 1) {
                    permission.priceSalesUCP = (value == '1')?true:false;
                }else if (key == 2) {
                    permission.priceSalesRTP = (value == '1')?true:false;
                }
                break;
            case 4:
                if(key == 0){
                    permission.priceSalesNSP = (value == '1')?true:false;
                }else if (key == 1) {
                    permission.priceSalesCTP = (value == '1')?true:false;
                }else if (key == 2) {
                    permission.priceSalesUCP = (value == '1')?true:false;
                }else if (key == 3) {
                    permission.priceSalesRTP = (value == '1')?true:false;
                }
                break;
            case 5:
                if(key == 0){
                    permission.priceSalesMGP = (value == '1')?true:false;
                }else if (key == 1) {
                    permission.priceSalesNSP = (value == '1')?true:false;
                }else if (key == 2) {
                    permission.priceSalesCTP = (value == '1')?true:false;
                }else if (key == 3) {
                    permission.priceSalesUCP = (value == '1')?true:false;
                }else if (key == 4) {
                    permission.priceSalesRTP = (value == '1')?true:false;
                }
                break;
            case 6:
                if(key == 0){
                    permission.priceSalesDSP = (value == '1')?true:false;
                }else if (key == 1) {
                    permission.priceSalesMGP = (value == '1')?true:false;
                }else if (key == 2) {
                    permission.priceSalesNSP = (value == '1')?true:false;
                }else if (key == 3) {
                    permission.priceSalesCTP = (value == '1')?true:false;
                }else if (key == 4) {
                    permission.priceSalesUCP = (value == '1')?true:false;
                }else if (key == 5) {
                    permission.priceSalesRTP = (value == '1')?true:false;
                }
                break;
            default:
            break;
        }
    });
    return permission
}