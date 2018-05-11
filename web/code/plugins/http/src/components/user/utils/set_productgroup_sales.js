export default function SetProductGroupSales(that, value, name, ClearHierarchy, hierarchyDataJewelry,
                    hierarchyDataWatch,hierarchyDataStone, hierarchyDataAccessory, hierarchyDataOBA,
                    hierarchyDataSpare){
    const { fields: {
                productGroupSalesSTO,productGroupSalesJLY,productGroupSalesWAT,productGroupSalesACC,productGroupSalesOBA,
                productGroupSalesSPA,categoryJLY,categoryWAT,categorySTO,categoryACC,categoryOBA,categorySPP,
                notUseHierarchy
          } } = that.props;

      switch (name) {
          case 'productGroupSalesSPA':
              if (value) {
                  productGroupSalesSPA.onChange(true);
              }else{
                  productGroupSalesSPA.onChange(false);
                  categorySPP.onChange(false);
                  ClearHierarchy(hierarchyDataSpare);
              }
              break;
          case 'productGroupSalesOBA':
              if (value) {
                  productGroupSalesOBA.onChange(true);
              }else{
                  productGroupSalesOBA.onChange(false);
                  categoryOBA.onChange(false);
                  ClearHierarchy(hierarchyDataOBA);
              }
              break;
          case 'productGroupSalesACC':
              if (value) {
                  productGroupSalesACC.onChange(true);
              }else{
                  productGroupSalesACC.onChange(false);
                  categoryACC.onChange(false);
                  ClearHierarchy(hierarchyDataAccessory);
              }
              break;
          case 'productGroupSalesSTO':
              if (value) {
                  productGroupSalesSTO.onChange(true);
              }else{
                  productGroupSalesSTO.onChange(false);
                  categorySTO.onChange(false);
                  ClearHierarchy(hierarchyDataStone);
              }
              break;
          case 'productGroupSalesWAT':
              if (value) {
                  productGroupSalesWAT.onChange(true);
              }else{
                  productGroupSalesWAT.onChange(false);
                  categoryWAT.onChange(false);
                  ClearHierarchy(hierarchyDataWatch);
              }
              break;
          case 'productGroupSalesJLY':
              if (value) {
                  productGroupSalesJLY.onChange(true);
              }else{
                  productGroupSalesJLY.onChange(false);
                  categoryJLY.onChange(false);
                  ClearHierarchy(hierarchyDataJewelry);
              }
              break;
          default:
      }
}
