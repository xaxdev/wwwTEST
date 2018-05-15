export default function ResetSalesCategory(that){
    const {
        fields: {
            reference,description,certificatedNumber,sku,location,warehouse,stoneType,cut,stoneProductHierarchy,lotNumber,cutGrade,color,colorGrade,clarity,
            lotQuantityFrom,lotQuantityTo,totalCaratWeightFrom,totalCaratWeightTo,totalCostFrom,totalCostTo,totalUpdatedCostFrom,totalUpdatedCostTo,
            retailPriceFrom,retailPriceTo,markupFrom,markupTo,jewelryProductHierarchy,jewelryCategory,collection,grossWeightFrom,grossWeightTo,setReference,
            brand,mustHave,ringSize,dominantStone,metalType,metalColour,cerDateFrom,cerDateTo,polish,symmetry,treatment,fluorescence,origin,certificateAgency,
            stoneCostFrom,stoneCostTo,quantityFrom,quantityTo,watchProductHierarchy,watchCategory,limitedEdition,limitedEditionNumber,serialNumber,movement,
            proDateFrom,proDateTo,caseDimensionFrom,caseDimensionTo,preciousMetalWeightFrom,preciousMetalWeightTo,dialIndex,dialColor,dialMetal,buckleType,
            strapType,strapColor,complication,accessoryProductSalesHierarchy,accessoryType,obaProductSalesHierarchy,obaDimension,sparePartProductSalesHierarchy,sparePartType,
            salesChannel
        }, resetForm
    } = that.props;

    resetForm();
    that.props.salesActions.resetForm();
    // console.log('fields->',header.location.value)

    certificatedNumber.onChange(certificatedNumber.value);
    description.onChange(description.value);
    reference.onChange(reference.value);
    sku.onChange(sku.value);
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
    retailPriceFrom.onChange(retailPriceFrom.value);
    retailPriceTo.onChange(retailPriceTo.value);
    salesChannel.onChange(salesChannel.value);

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

    accessoryProductSalesHierarchy.value = '';
    accessoryType.value = '';

    obaProductSalesHierarchy.value = '';
    obaDimension.value = '';

    sparePartProductSalesHierarchy.value = '';
    sparePartType.value = '';
}
