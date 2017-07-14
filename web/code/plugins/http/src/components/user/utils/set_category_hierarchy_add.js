export default function SetCategoryHierarchy(that, value, name, ClearHierarchy, hierarchyDataJewelry,
                    hierarchyDataWatch,hierarchyDataStone, hierarchyDataAccessory, hierarchyDataOBA,
                    hierarchyDataSpare){
    const { fields: {
                categoryJLY,categoryWAT,categorySTO,categoryACC,categoryOBA,categorySPP,
                notUseHierarchy
          } } = that.props;

    switch (name) {
        case 'categorySPP':
            if (value) {
                categorySPP.onChange(true);
            }else{
                categorySPP.onChange(false);
                ClearHierarchy(hierarchyDataSpare);
            }
            break;
        case 'categoryOBA':
            if (value) {
                categoryOBA.onChange(true);
            }else{
                categoryOBA.onChange(false);
                ClearHierarchy(hierarchyDataOBA);
            }
            break;
        case 'categoryACC':
            if (value) {
                categoryACC.onChange(true);
            }else{
                categoryACC.onChange(false);
                ClearHierarchy(hierarchyDataAccessory);
            }
            break;
        case 'categorySTO':
            if (value) {
                categorySTO.onChange(true);
            }else{
                categorySTO.onChange(false);
                ClearHierarchy(hierarchyDataStone);
            }
            break;
        case 'categoryWAT':
            if (value) {
                categoryWAT.onChange(true);
            }else{
                categoryWAT.onChange(false);
                ClearHierarchy(hierarchyDataWatch);
            }
            break;
        case 'categoryJLY':
            if (value) {
                categoryJLY.onChange(true);
            }else{
                categoryJLY.onChange(false);
                ClearHierarchy(hierarchyDataJewelry);
            }
            break;
        default:
    }
}
