export default function SetCategoryHierarchy(that, value, name, ClearHierarchy, hierarchyDataJewelry,
                    hierarchyDataWatch,hierarchyDataStone, hierarchyDataAccessory, hierarchyDataOBA,
                    hierarchyDataSpare){
    const { fields: {
                categoryJLY,categoryWAT,categorySTO,categoryACC,categoryOBA,categorySPP
          } } = that.props;

      let { fields: { notUseHierarchy } } = that.props;
      let objNotUseHeirarchy = notUseHierarchy.value;
      console.log('SetCategoryHierarchy-->',name);

      switch (name) {
          case 'categorySPP':
              if (value) {
                  categorySPP.onChange(true);
              }else{
                  delete objNotUseHeirarchy['SPP']
                  notUseHierarchy.onChange(objNotUseHeirarchy);
                  categorySPP.onChange(false);
                  ClearHierarchy(hierarchyDataSpare);
              }
              break;
          case 'categoryOBA':
              if (value) {
                  categoryOBA.onChange(true);
              }else{
                  delete objNotUseHeirarchy['OBA']
                  notUseHierarchy.onChange(objNotUseHeirarchy);
                  categoryOBA.onChange(false);
                  ClearHierarchy(hierarchyDataOBA);
              }
              break;
          case 'categoryACC':
              if (value) {
                  categoryACC.onChange(true);
              }else{
                  delete objNotUseHeirarchy['ACC']
                  notUseHierarchy.onChange(objNotUseHeirarchy);
                  categoryACC.onChange(false);
                  ClearHierarchy(hierarchyDataAccessory);
              }
              break;
          case 'categorySTO':
              if (value) {
                  categorySTO.onChange(true);
              }else{
                  delete objNotUseHeirarchy['STO']
                  notUseHierarchy.onChange(objNotUseHeirarchy);
                  categorySTO.onChange(false);
                  ClearHierarchy(hierarchyDataStone);
              }
              break;
          case 'categoryWAT':
              if (value) {
                  categoryWAT.onChange(true);
              }else{
                  delete objNotUseHeirarchy['WAT']
                  notUseHierarchy.onChange(objNotUseHeirarchy);
                  categoryWAT.onChange(false);
                  ClearHierarchy(hierarchyDataWatch);
              }
              break;
          case 'categoryJLY':
              if (value) {
                  categoryJLY.onChange(true);
              }else{
                  delete objNotUseHeirarchy['JLY']
                  notUseHierarchy.onChange(objNotUseHeirarchy);
                  categoryJLY.onChange(false);
                  ClearHierarchy(hierarchyDataJewelry);
              }
              break;
          default:
      }
}
