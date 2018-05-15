export default function SetSalesCategoryHierarchy(that, value, name, ClearHierarchy, hierarchyDataJewelrySales, hierarchyDataWatchSales, hierarchyDataStoneSales,
    hierarchyDataAccessorySales, hierarchyDataOBASalesSales, hierarchyDataSpareSales){
    const { fields: {
                categorySalesJLY,categorySalesWAT,categorySalesSTO,categorySalesACC,categorySalesOBA,categorySalesSPP
          } } = that.props;

      let { fields: { notUseSalesHierarchy } } = that.props;
      let objNotUseSalesHeirarchy = notUseSalesHierarchy.value;
      console.log('SetSalesCategoryHierarchy-->',name);

      switch (name) {
          case 'categorySalesSPP':
              if (value) {
                  categorySalesSPP.onChange(true);
              }else{
                  delete objNotUseSalesHeirarchy['SPP']
                  notUseSalesHierarchy.onChange(objNotUseSalesHeirarchy);
                  categorySalesSPP.onChange(false);
                  ClearHierarchy(hierarchyDataSpareSales);
              }
              break;
          case 'categorySalesOBA':
              if (value) {
                  categorySalesOBA.onChange(true);
              }else{
                  delete objNotUseSalesHeirarchy['OBA']
                  notUseSalesHierarchy.onChange(objNotUseSalesHeirarchy);
                  categoryOBASales.onChange(false);
                  ClearHierarchy(hierarchyDataOBASales);
              }
              break;
          case 'categorySalesACC':
              if (value) {
                  categorySalesACC.onChange(true);
              }else{
                  delete objNotUseSalesHeirarchy['ACC']
                  notUseSalesHierarchy.onChange(objNotUseSalesHeirarchy);
                  categorySalesACC.onChange(false);
                  ClearHierarchy(hierarchyDataAccessorySales);
              }
              break;
          case 'categorySalesSTO':
              if (value) {
                  categorySalesSTO.onChange(true);
              }else{
                  delete objNotUseSalesHeirarchy['STO']
                  notUseSalesHierarchy.onChange(objNotUseSalesHeirarchy);
                  categorySalesSTO.onChange(false);
                  ClearHierarchy(hierarchyDataStoneSales);
              }
              break;
          case 'categorySalesWAT':
              if (value) {
                  categorySalesWAT.onChange(true);
              }else{
                  delete objNotUseSalesHeirarchy['WAT']
                  notUseSalesHierarchy.onChange(objNotUseSalesHeirarchy);
                  categorySalesWAT.onChange(false);
                  ClearHierarchy(hierarchyDataWatchSales);
              }
              break;
          case 'categorySalesJLY':
              if (value) {
                  categorySalesJLY.onChange(true);
              }else{
                  delete objNotUseSalesHeirarchy['JLY']
                  notUseSalesHierarchy.onChange(objNotUseSalesHeirarchy);
                  categorySalesJLY.onChange(false);
                  ClearHierarchy(hierarchyDataJewelrySales);
              }
              break;
          default:
      }
}
