export default function SetProductGroup(that, value, name, ClearHierarchy, hierarchyDataJewelry,
                    hierarchyDataWatch,hierarchyDataStone, hierarchyDataAccessory, hierarchyDataOBA,
                    hierarchyDataSpare){
    const { fields: {
                productGroupSTO,productGroupJLY,productGroupWAT,productGroupACC,productGroupOBA,
                productGroupSPA,categoryJLY,categoryWAT,categorySTO,categoryACC,categoryOBA,categorySPP,
                notUseHierarchy
          } } = that.props;

      switch (name) {
          case 'productGroupSPA':
              if (value) {
                  productGroupSPA.onChange(true);
              }else{
                  productGroupSPA.onChange(false);
                  categorySPP.onChange(false);
                  ClearHierarchy(hierarchyDataSpare);
              }
              break;
          case 'productGroupOBA':
              if (value) {
                  productGroupOBA.onChange(true);
              }else{
                  productGroupOBA.onChange(false);
                  categoryOBA.onChange(false);
                  ClearHierarchy(hierarchyDataOBA);
              }
              break;
          case 'productGroupACC':
              if (value) {
                  productGroupACC.onChange(true);
              }else{
                  productGroupACC.onChange(false);
                  categoryACC.onChange(false);
                  ClearHierarchy(hierarchyDataAccessory);
              }
              break;
          case 'productGroupSTO':
              if (value) {
                  productGroupSTO.onChange(true);
              }else{
                  productGroupSTO.onChange(false);
                  categorySTO.onChange(false);
                  ClearHierarchy(hierarchyDataStone);
              }
              break;
          case 'productGroupWAT':
              if (value) {
                  productGroupWAT.onChange(true);
              }else{
                  productGroupWAT.onChange(false);
                  categoryWAT.onChange(false);
                  ClearHierarchy(hierarchyDataWatch);
              }
              break;
          case 'productGroupJLY':
              if (value) {
                  productGroupJLY.onChange(true);
              }else{
                  productGroupJLY.onChange(false);
                  categoryJLY.onChange(false);
                  ClearHierarchy(hierarchyDataJewelry);
              }
              break;
          default:
      }
}
