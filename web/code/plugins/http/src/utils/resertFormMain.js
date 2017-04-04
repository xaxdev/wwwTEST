export default function ResetFormMain(that){
  const { fields: { reference,description,venderReference,vendorName,certificatedNumber,sku,location,warehouse,
                    stoneType,cut,stoneProductHierarchy,lotNumber,cutGrade,color,colorGrade,clarity,lotQuantityFrom,
                    lotQuantityTo,totalCaratWeightFrom,totalCaratWeightTo,totalCostFrom,totalCostTo,totalUpdatedCostFrom,
                    totalUpdatedCostTo,publicPriceFrom,publicPriceTo,markupFrom,markupTo,
                    jewelryProductHierarchy,jewelryCategory,collection,grossWeightFrom,grossWeightTo,setReference,
                    brand,mustHave,ringSize,dominantStone,metalType,metalColour,viewAsSet,
                    cerDateFrom,cerDateTo,polish,symmetry,treatment,fluorescence,origin,
                    certificateAgency,stoneCostFrom,stoneCostTo,quantityFrom,quantityTo,
                    watchProductHierarchy,watchCategory,limitedEdition,limitedEditionNumber,serialNumber,movement,proDateFrom,
                    proDateTo,caseDimensionFrom,caseDimensionTo,preciousMetalWeightFrom,preciousMetalWeightTo,dialIndex,dialColor,
                    dialMetal,buckleType,strapType,strapColor,complication,gemstone_stoneType,gemstone_cut,gemstone_cutGrade,
                    gemstone_color,gemstone_clarity,gemstone_certificatedNumber,gemstone_certificateAgency,gemstone_cerDateFrom,
                    gemstone_cerDateTo,gemstone_stoneCostFrom,gemstone_stoneCostTo,gemstone_quantityFrom,gemstone_quantityTo,
                    gemstone_totalCaratWeightFrom,gemstone_totalCaratWeightTo,gemstone_polish,gemstone_symmetry,gemstone_treatment,
                    gemstone_fluorescence,gemstone_origin,accessoryProductHierarchy,accessoryType,obaProductHierarchy,
                    obaDimension,sparePartProductHierarchy,sparePartType
                  },
          resetForm
         } = that.props;

  // resetForm();
  that.props.inventoryActions.resetForm();
  // console.log('fields->',header.location.value)
  reference.value = '';
  description.value = '';
  venderReference.value = '';
  vendorName.value = '';
  certificatedNumber.value = '';
  sku.value = '';
  location.value = '';
  // that.props.optionsActions.setDataLocation([]);
  warehouse.value = '';

  stoneProductHierarchy.value = '';
  stoneType.value = '';
  cut.value = '';
  cutGrade.value = '';
  color.value = '';
  colorGrade.value = '';
  clarity.value = '';
  lotNumber.value = '';
  lotQuantityFrom.value = '';
  lotQuantityTo.value = '';
  totalCaratWeightFrom.value = '';
  totalCaratWeightTo.value = '';
  totalCostFrom.value = '';
  totalCostTo.value = '';
  totalUpdatedCostFrom.value = '';
  totalUpdatedCostTo.value = '';
  // publicPriceFrom.value = '';
  // publicPriceTo.value = '';
  markupFrom.value = '';
  markupTo.value = '';
  certificatedNumber.value = '';
  certificateAgency.value = '';
  cerDateFrom.value = '';
  cerDateTo.value = '';
  polish.value = '';
  symmetry.value = '';
  treatment.value = '';
  fluorescence.value = '';
  origin.value = '';
  //
  jewelryProductHierarchy.value = '';
  jewelryCategory.value = '';
  collection.value = '';
  brand.value = '';
  mustHave.value = '';
  ringSize.value = '';
  viewAsSet.value = false;
  totalCostFrom.value = '';
  totalCostTo.value = '';
  totalUpdatedCostFrom.value = '';
  totalUpdatedCostTo.value = '';
  // publicPriceFrom.value = '';
  // publicPriceTo.value = '';
  markupFrom.value = '';
  markupTo.value = '';
  grossWeightFrom.value = '';
  grossWeightTo.value = '';
  setReference.value = '';
  dominantStone.value = '';
  metalType.value = '';
  metalColour.value = '';
  //
  gemstone_stoneType.value = '';
  gemstone_cut.value = '';
  gemstone_cutGrade.value = '';
  gemstone_color.value = '';
  gemstone_clarity.value = '';
  gemstone_certificatedNumber.value = '';
  gemstone_certificateAgency.value = '';
  gemstone_cerDateFrom.value = '';
  gemstone_cerDateTo.value = '';
  gemstone_stoneCostFrom.value = '';
  gemstone_stoneCostTo.value = '';
  gemstone_quantityFrom.value = '';
  gemstone_quantityTo.value = '';
  gemstone_totalCaratWeightFrom.value = '';
  gemstone_totalCaratWeightTo.value = '';
  gemstone_polish.value = '';
  gemstone_symmetry.value = '';
  gemstone_treatment.value = '';
  gemstone_fluorescence.value = '';
  gemstone_origin.value = '';
  //
  watchProductHierarchy.value = '';
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
  // publicPriceFrom.value = '';
  // publicPriceTo.value = '';
  markupFrom.value = '';
  markupTo.value = '';
  grossWeightFrom.value = '';
  grossWeightTo.value = '';
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
  // this.onUpdate('test');

  accessoryProductHierarchy.value = '';
  accessoryType.value = '';

  obaProductHierarchy.value = '';
  obaDimension.value = '';

  sparePartProductHierarchy.value = '';
  sparePartType.value = '';

}
