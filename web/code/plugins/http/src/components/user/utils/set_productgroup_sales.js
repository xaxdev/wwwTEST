export default function SetProductGroupSales(that, value, name, ClearHierarchy, hierarchyDataJewelrySales, hierarchyDataWatchSales,hierarchyDataStoneSales,
    hierarchyDataAccessorySales, hierarchyDataOBASales, hierarchyDataSpareSales){
    const { fields: {
                productGroupSalesSTO,productGroupSalesJLY,productGroupSalesWAT,productGroupSalesACC,productGroupSalesOBA,
                productGroupSalesSPA,categorySalesJLY,categorySalesWAT,categorySalesSTO,categorySalesACC,categorySalesOBA,categorySalesSPP,
                notUseHierarchy
          } } = that.props;

      switch (name) {
          case 'productGroupSalesSPA':
              if (value) {
                  productGroupSalesSPA.onChange(true);
              }else{
                  productGroupSalesSPA.onChange(false);
                  categorySalesSPP.onChange(false);
                  ClearHierarchy(hierarchyDataSpareSales);
              }
              break;
          case 'productGroupSalesOBA':
              if (value) {
                  productGroupSalesOBA.onChange(true);
              }else{
                  productGroupSalesOBA.onChange(false);
                  categorySalesOBA.onChange(false);
                  ClearHierarchy(hierarchyDataOBASales);
              }
              break;
          case 'productGroupSalesACC':
              if (value) {
                  productGroupSalesACC.onChange(true);
              }else{
                  productGroupSalesACC.onChange(false);
                  categorySalesACC.onChange(false);
                  ClearHierarchy(hierarchyDataAccessorySales);
              }
              break;
          case 'productGroupSalesSTO':
              if (value) {
                  productGroupSalesSTO.onChange(true);
              }else{
                  productGroupSalesSTO.onChange(false);
                  categorySalesSTO.onChange(false);
                  ClearHierarchy(hierarchyDataStoneSales);
              }
              break;
          case 'productGroupSalesWAT':
              if (value) {
                  productGroupSalesWAT.onChange(true);
              }else{
                  productGroupSalesWAT.onChange(false);
                  categorySalesWAT.onChange(false);
                  ClearHierarchy(hierarchyDataWatchSales);
              }
              break;
          case 'productGroupSalesJLY':
              if (value) {
                  productGroupSalesJLY.onChange(true);
              }else{
                  productGroupSalesJLY.onChange(false);
                  categorySalesJLY.onChange(false);
                  ClearHierarchy(hierarchyDataJewelrySales);
              }
              break;
          default:
      }
}
