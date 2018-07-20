export default function SetProductGroupSales(
    that, value, name, ClearHierarchy, hierarchyDataJewelry,hierarchyDataWatch,hierarchyDataStone,hierarchyDataAccessory, hierarchyDataOBA,hierarchyDataSpare
){
    const { fields: {
        priceSalesRTP,priceSalesUCP,priceSalesCTP,priceSalesNSP,priceSalesMGP,priceSalesDSP,categoryJLY,categoryWAT,categorySTO,categoryACC,categoryOBA,
        categorySPP,notUseHierarchy
    } } = that.props;

    switch (name) {
        case 'priceSalesRTP':
            if (value) {
                priceSalesRTP.onChange(true);
            }else{
                priceSalesRTP.onChange(false);
            }
            break;
        case 'priceSalesUCP':
            if (value) {
                priceSalesUCP.onChange(true);
            }else{
                priceSalesUCP.onChange(false);
            }
            break;
        case 'priceSalesCTP':
            if (value) {
                priceSalesCTP.onChange(true);
            }else{
                priceSalesCTP.onChange(false);
            }
            break;
        case 'priceSalesNSP':
            if (value) {
                priceSalesNSP.onChange(true);
            }else{
                priceSalesNSP.onChange(false);
            }
            break;
        case 'priceSalesMGP':
            if (value) {
                priceSalesMGP.onChange(true);
            }else{
                priceSalesMGP.onChange(false);
            }
            break;
        case 'priceSalesDSP':
            if (value) {
                priceSalesDSP.onChange(true);
            }else{
                priceSalesDSP.onChange(false);
            }
            break;
        default:
    }
}
