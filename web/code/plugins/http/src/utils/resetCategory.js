export default function ResetCategory(that){
    const {
        fields: {
            reference,description,venderReference,vendorName,certificatedNumber,sku,location,warehouse,stoneType,cut,stoneProductHierarchy,lotNumber,cutGrade,
            color,colorGrade,clarity,lotQuantityFrom,lotQuantityTo,totalCaratWeightFrom,totalCaratWeightTo,totalCostFrom,totalCostTo,totalUpdatedCostFrom,
            totalUpdatedCostTo,publicPriceFrom,publicPriceTo,markupFrom,markupTo,jewelryProductHierarchy,jewelryCategory,collection,grossWeightFrom,grossWeightTo,
            setReference,brand,mustHave,ringSize,dominantStone,metalType,metalColour,cerDateFrom,cerDateTo,polish,symmetry,treatment,fluorescence,origin,
            certificateAgency,stoneCostFrom,stoneCostTo,quantityFrom,quantityTo,watchProductHierarchy,watchCategory,limitedEdition,limitedEditionNumber,
            serialNumber,movement,proDateFrom,proDateTo,caseDimensionFrom,caseDimensionTo,preciousMetalWeightFrom,preciousMetalWeightTo,dialIndex,dialColor,
            dialMetal,buckleType,strapType,strapColor,complication,gemstone_stoneType,gemstone_cut,gemstone_cutGrade,gemstone_color,gemstone_clarity,
            gemstone_certificateAgency,gemstone_polish,gemstone_symmetry,gemstone_treatment,gemstone_fluorescence,gemstone_origin,accessoryProductHierarchy,
            accessoryType,obaProductHierarchy,obaDimension,sparePartProductHierarchy,sparePartType, searchName, validateSearchName
        },resetForm
    } = that.props;

    resetForm();
    that.props.inventoryActions.resetForm();

    if (that.props.searchResult.idEditSaveSearch != null) {
        let editParams = {id: that.props.searchResult.idEditSaveSearch, name: searchName.value}
        that.props.saveSearchAction.setIdEditSaveSearch(editParams);
    }

    certificatedNumber.onChange(certificatedNumber.value);
    description.onChange(description.value);
    reference.onChange(reference.value);
    sku.onChange(sku.value);
    venderReference.onChange(venderReference.value);
    vendorName.onChange(vendorName.value);
    location.onChange(location.value);
    that.props.inventoryActions.setDataLocation(location.value);
    warehouse.onChange(warehouse.value);
    that.props.inventoryActions.setDataWarehouse(warehouse.value);
    dominantStone.onChange(dominantStone.value);
    that.props.inventoryActions.setDataDominantStone(dominantStone.value);
    totalCostFrom.onChange(totalCostFrom.value);
    totalCostTo.onChange(totalCostTo.value);
    totalUpdatedCostFrom.onChange(totalUpdatedCostFrom.value);
    totalUpdatedCostTo.onChange(totalUpdatedCostTo.value);
    publicPriceFrom.onChange(publicPriceFrom.value);
    publicPriceTo.onChange(publicPriceTo.value);
    searchName.onChange(searchName.value);
    validateSearchName.onChange(validateSearchName.value);

    stoneType.value = '';
    cut.value = '';
    cutGrade.value = '';
    color.value = '';
    colorGrade.value = '';
    clarity.value = '';
    certificateAgency.value = '';
    polish.value = '';
    symmetry.value = '';
    treatment.value = '';
    fluorescence.value = '';
    origin.value = '';

    jewelryCategory.value = '';
    brand.value = '';
    mustHave.value = '';
    ringSize.value = '';
    // dominantStone.value = '';
    metalType.value = '';
    metalColour.value = '';
    collection.value = '';

    gemstone_stoneType.value = '';
    gemstone_cut.value = '';
    gemstone_cutGrade.value = '';
    gemstone_color.value = '';
    gemstone_clarity.value = '';
    gemstone_certificateAgency.value = '';
    gemstone_polish.value = '';
    gemstone_symmetry.value = '';
    gemstone_treatment.value = '';
    gemstone_fluorescence.value = '';
    gemstone_origin.value = '';

    watchCategory.value = '';
    collection.value = '';
    brand.value = '';
    mustHave.value = '';
    metalType.value = '';
    metalColour.value = '';
    // dominantStone.value = '';
    limitedEdition.value = '';
    movement.value = '';
    dialIndex.value = '';
    dialColor.value = '';
    dialMetal.value = '';
    buckleType.value = '';
    strapType.value = '';
    strapColor.value = '';
    complication.value = '';

    accessoryProductHierarchy.value = '';
    accessoryType.value = '';

    obaProductHierarchy.value = '';
    obaDimension.value = '';

    sparePartProductHierarchy.value = '';
    sparePartType.value = '';
}
