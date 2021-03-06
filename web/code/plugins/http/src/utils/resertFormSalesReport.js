export default function ResetFormMain(that){
    const { fields: {
        reference,description,certificatedNumber,sku,location,warehouse,stoneType,cut,stoneProductSalesHierarchy,lotNumber,cutGrade,color,colorGrade,clarity,
        lotQuantityFrom,lotQuantityTo,totalCaratWeightFrom,totalCaratWeightTo,totalCostFrom,totalCostTo,totalUpdatedCostFrom,totalUpdatedCostTo,
        retailPriceFrom,retailPriceTo,markupFrom,markupTo,jewelryProductSalesHierarchy,jewelryCategory,collection,grossWeightFrom,grossWeightTo,setReference,
        brand,mustHave,ringSize,dominantStone,metalType,metalColour,polish,symmetry,treatment,fluorescence,origin,certificateAgency,
        stoneCostFrom,stoneCostTo,quantityFrom,quantityTo,watchProductSalesHierarchy,watchCategory,limitedEdition,limitedEditionNumber,serialNumber,movement,
        proDateFrom,proDateTo,caseDimensionFrom,caseDimensionTo,preciousMetalWeightFrom,preciousMetalWeightTo,dialIndex,dialColor,dialMetal,buckleType,
        strapType,strapColor,complication,accessoryProductSalesHierarchy,accessoryType,obaProductSalesHierarchy,obaDimension,sparePartProductSalesHierarchy,sparePartType,
        salesChannel,invoiceDateFrom,invoiceDateTo
    }, resetForm } = that.props;

    // resetForm();
    that.props.salesActions.resetForm();
    that.props.salesActions.setCustomerSearch('');
    reference.value = '';
    description.value = '';
    certificatedNumber.value = '';
    sku.value = '';
    location.value = '';
    warehouse.value = '';
    salesChannel.value = '';

    stoneProductSalesHierarchy.value = '';
    stoneType.value = '';
    cut.value = '';
    cutGrade.value = '';
    color.value = '';
    colorGrade.value = '';
    clarity.value = '';
    lotNumber.value = '';
    lotQuantityFrom.value = '';
    lotQuantityTo.value = '';
    totalCostFrom.value = '';
    totalCostTo.value = '';
    totalUpdatedCostFrom.value = '';
    totalUpdatedCostTo.value = '';
    markupFrom.value = '';
    markupTo.value = '';
    certificatedNumber.value = '';
    certificateAgency.value = '';
    polish.value = '';
    symmetry.value = '';
    treatment.value = '';
    fluorescence.value = '';
    origin.value = '';
    invoiceDateFrom.value = '';
    invoiceDateTo.value = '';
    //
    jewelryProductSalesHierarchy.value = '';
    jewelryCategory.value = '';
    collection.value = '';
    brand.value = '';
    mustHave.value = '';
    ringSize.value = '';
    totalCostFrom.value = '';
    totalCostTo.value = '';
    totalUpdatedCostFrom.value = '';
    totalUpdatedCostTo.value = '';
    markupFrom.value = '';
    markupTo.value = '';
    grossWeightFrom.value = '';
    grossWeightTo.value = '';
    setReference.value = '';
    dominantStone.value = '';
    metalType.value = '';
    metalColour.value = '';
    //
    watchProductSalesHierarchy.value = '';
    watchCategory.value = '';
    collection.value = '';
    brand.value = '';
    mustHave.value = '';
    metalType.value = '';
    metalColour.value = '';
    dominantStone.value = '';
    limitedEdition.value = '';
    limitedEditionNumber.value = '';
    serialNumber.value = '';
    movement.value = '';
    totalCostFrom.value = '';
    totalCostTo.value = '';
    totalUpdatedCostFrom.value = '';
    totalUpdatedCostTo.value = '';
    proDateFrom.value = '';
    proDateTo.value = '';
    caseDimensionFrom.value = '';
    caseDimensionTo.value = '';
    preciousMetalWeightFrom.value = '';
    preciousMetalWeightTo.value = '';
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
