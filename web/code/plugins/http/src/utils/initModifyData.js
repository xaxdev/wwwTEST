import InitData from './initData';

export default function InitModifyData(props) {
    let {
        fields:{
            reference,description,venderReference,vendorName,certificatedNumber,sku,location,warehouse,attachment,
            stoneType,cut,stoneProductHierarchy,lotNumber,cutGrade,color,colorGrade,clarity,lotQuantityFrom,
            lotQuantityTo,totalCaratWeightFrom,totalCaratWeightTo,totalCostFrom,totalCostTo,totalUpdatedCostFrom,
            totalUpdatedCostTo,publicPriceFrom,publicPriceTo,markupFrom,markupTo,certificateLab,
            jewelryProductHierarchy,jewelryCategory,collection,grossWeightFrom,grossWeightTo,setReference,
            brand,mustHave,ringSize,dominantStone,metalType,metalColour,cerDateFrom,cerDateTo,polish,symmetry,
            treatment,fluorescence,origin,certificateAgency,stoneCostFrom,stoneCostTo,quantityFrom,quantityTo,
            watchProductHierarchy,watchCategory,limitedEdition,limitedEditionNumber,serialNumber,movement,proDateFrom,
            proDateTo,caseDimensionFrom,caseDimensionTo,preciousMetalWeightFrom,preciousMetalWeightTo,dialIndex,dialColor,
            dialMetal,buckleType,strapType,strapColor,complication,gemstone_stoneType,gemstone_cut,gemstone_cutGrade,
            gemstone_color,gemstone_clarity,gemstone_certificatedNumber,gemstone_certificateAgency,gemstone_cerDateFrom,
            gemstone_cerDateTo,gemstone_stoneCostFrom,gemstone_stoneCostTo,gemstone_quantityFrom,gemstone_quantityTo,
            gemstone_totalCaratWeightFrom,gemstone_totalCaratWeightTo,gemstone_polish,gemstone_symmetry,gemstone_treatment,
            gemstone_fluorescence,gemstone_origin,accessoryProductHierarchy,accessoryType,obaProductHierarchy,
            obaDimension,sparePartProductHierarchy,sparePartType,article
        },
        searchResult
    } = props;

    // Header Search
    let paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;

    if(reference != undefined){
        reference.value = InitData(paramsSearch,reference.value,'reference');
        // reference.onChange(reference.value);
        if(paramsSearch != null)
            paramsSearch.reference = reference.value
    }

    if(description != undefined){
        description.value = InitData(paramsSearch,description.value,'description');
        if(paramsSearch != null)
            paramsSearch.description = description.value
    }
    if(venderReference != undefined){
        venderReference.value = InitData(paramsSearch,venderReference.value,'venderReference');
        if(paramsSearch != null)
            paramsSearch.venderReference = venderReference.value
    }
    if(vendorName != undefined){
        vendorName.value = InitData(paramsSearch,vendorName.value,'vendorName');
        if(paramsSearch != null)
            paramsSearch.vendorName = vendorName.value
    }
    if(certificatedNumber != undefined){
        certificatedNumber.value = InitData(paramsSearch,certificatedNumber.value,'certificatedNumber');
        if(paramsSearch != null)
            paramsSearch.certificatedNumber = certificatedNumber.value
    }
    if(sku != undefined){
        sku.value = InitData(paramsSearch,sku.value,'sku');
        if(paramsSearch != null)
            paramsSearch.sku = sku.value
    }
    if(location != undefined){
        location.value = InitData(paramsSearch,location.value,'location');
        if(paramsSearch != null)
            paramsSearch.location = location.value
    }
    if(warehouse != undefined){
        warehouse.value = InitData(paramsSearch,warehouse.value,'warehouse');
        if(paramsSearch != null)
            paramsSearch.warehouse = warehouse.value
    }

    // Stone Search
    // console.log('stone-->');

    if(stoneProductHierarchy != undefined){
        stoneProductHierarchy.value = InitData(paramsSearch,stoneProductHierarchy.value,'stoneProductHierarchy');
        if(paramsSearch != null)
            paramsSearch.stoneProductHierarchy = stoneProductHierarchy.value
    }
    if(stoneType != undefined){
        stoneType.value = InitData(paramsSearch,stoneType.value,'stoneType');
        if(paramsSearch != null)
            paramsSearch.stoneType = stoneType.value
    }
    if(cut != undefined){
        cut.value = InitData(paramsSearch,cut.value,'cut');
        if(paramsSearch != null)
            paramsSearch.cut = cut.value
    }
    if(cutGrade != undefined){
        cutGrade.value = InitData(paramsSearch,cutGrade.value,'cutGrade');
        if(paramsSearch != null)
            paramsSearch.cutGrade = cutGrade.value
    }
    if(color != undefined){
        color.value = InitData(paramsSearch,color.value,'color');
        if(paramsSearch != null)
            paramsSearch.color = color.value
    }
    if(colorGrade != undefined){
        colorGrade.value = InitData(paramsSearch,colorGrade.value,'colorGrade');
        if(paramsSearch != null)
            paramsSearch.colorGrade = colorGrade.value
    }
    if(clarity != undefined){
        clarity.value = InitData(paramsSearch,clarity.value,'clarity');
        if(paramsSearch != null)
            paramsSearch.clarity = clarity.value
    }
    if(lotNumber != undefined){
        lotNumber.value = InitData(paramsSearch,lotNumber.value,'lotNumber');
        if(paramsSearch != null)
            paramsSearch.lotNumber = lotNumber.value
    }
    if(lotQuantityFrom != undefined){
        lotQuantityFrom.value = InitData(paramsSearch,lotQuantityFrom.value,'lotQuantityFrom');
        if(paramsSearch != null)
            paramsSearch.lotQuantityFrom = lotQuantityFrom.value
    }
    if(lotQuantityTo != undefined){
        lotQuantityTo.value = InitData(paramsSearch,lotQuantityTo.value,'lotQuantityTo');
        if(paramsSearch != null)
            paramsSearch.lotQuantityTo = lotQuantityTo.value
    }
    if(totalCaratWeightFrom != undefined){
        totalCaratWeightFrom.value = InitData(paramsSearch,totalCaratWeightFrom.value,'totalCaratWeightFrom');
        if(paramsSearch != null)
            paramsSearch.totalCaratWeightFrom = totalCaratWeightFrom.value
    }
    if(totalCaratWeightTo != undefined){
        totalCaratWeightTo.value = InitData(paramsSearch,totalCaratWeightTo.value,'totalCaratWeightTo');
        if(paramsSearch != null)
            paramsSearch.totalCaratWeightTo = totalCaratWeightTo.value
    }
    if(totalCostFrom != undefined){
        totalCostFrom.value = InitData(paramsSearch,totalCostFrom.value,'totalCostFrom');
        if(paramsSearch != null)
            paramsSearch.totalCostFrom = totalCostFrom.value
    }
    if(totalCostTo != undefined){
        totalCostTo.value = InitData(paramsSearch,totalCostTo.value,'totalCostTo');
        if(paramsSearch != null)
            paramsSearch.totalCostTo = totalCostTo.value
    }
    if(totalUpdatedCostFrom != undefined){
        totalUpdatedCostFrom.value = InitData(paramsSearch,totalUpdatedCostFrom.value,'totalUpdatedCostFrom');
        if(paramsSearch != null)
            paramsSearch.totalUpdatedCostFrom = totalUpdatedCostFrom.value
    }
    if(totalUpdatedCostTo != undefined){
        totalUpdatedCostTo.value = InitData(paramsSearch,totalUpdatedCostTo.value,'totalUpdatedCostTo');
        if(paramsSearch != null)
            paramsSearch.totalUpdatedCostTo = totalUpdatedCostTo.value
    }
    if(publicPriceFrom != undefined){
        publicPriceFrom.value = InitData(paramsSearch,publicPriceFrom.value,'publicPriceFrom');
        if(paramsSearch != null)
            publicPriceFrom.stoneType = publicPriceFrom.value
    }
    if(publicPriceTo != undefined){
        publicPriceTo.value = InitData(paramsSearch,publicPriceTo.value,'publicPriceTo');
        if(paramsSearch != null)
            paramsSearch.publicPriceTo = publicPriceTo.value
    }
    if(markupFrom != undefined){
        markupFrom.value = InitData(paramsSearch,markupFrom.value,'markupFrom');
        if(paramsSearch != null)
            paramsSearch.markupFrom = markupFrom.value
    }
    if(markupTo != undefined){
        markupTo.value = InitData(paramsSearch,markupTo.value,'markupTo');
        if(paramsSearch != null)
            paramsSearch.markupTo = markupTo.value
    }
    if(certificatedNumber != undefined){
        certificatedNumber.value = InitData(paramsSearch,certificatedNumber.value,'certificatedNumber');
        if(paramsSearch != null)
            paramsSearch.certificatedNumber = certificatedNumber.value
    }
    if(certificateLab != undefined){
        certificateLab.value = InitData(paramsSearch,certificateLab.value,'certificateLab');
        if(paramsSearch != null)
            paramsSearch.certificateLab = certificateLab.value
    }
    if(cerDateFrom != undefined){
        cerDateFrom.value = InitData(paramsSearch,cerDateFrom.value,'cerDateFrom');
        if(paramsSearch != null)
            paramsSearch.cerDateFrom = cerDateFrom.value
    }
    if(cerDateTo != undefined){
        cerDateTo.value = InitData(paramsSearch,cerDateTo.value,'cerDateTo');
        if(paramsSearch != null)
            paramsSearch.cerDateTo = cerDateTo.value
    }
    if(polish != undefined){
      polish.value = InitData(paramsSearch,polish.value,'polish');
        if(paramsSearch != null)
          paramsSearch.polish = polish.value
    }
    if(symmetry != undefined){
        symmetry.value = InitData(paramsSearch,symmetry.value,'symmetry');
        if(paramsSearch != null)
            paramsSearch.symmetry = symmetry.value
    }
    if(treatment != undefined){
        treatment.value = InitData(paramsSearch,treatment.value,'treatment');
        if(paramsSearch != null)
            paramsSearch.treatment = treatment.value
    }
    if(fluorescence != undefined){
        fluorescence.value = InitData(paramsSearch,fluorescence.value,'fluorescence');
        if(paramsSearch != null)
            paramsSearch.fluorescence = fluorescence.value
    }
    if(origin != undefined){
        origin.value = InitData(paramsSearch,origin.value,'origin');
        if(paramsSearch != null)
            paramsSearch.origin = origin.value
    }

    //
    // Jewelry Search
    //

    if(jewelryProductHierarchy != undefined){
        jewelryProductHierarchy.value = InitData(paramsSearch,jewelryProductHierarchy.value,'jewelryProductHierarchy');
        if(paramsSearch != null)
            paramsSearch.jewelryProductHierarchy = jewelryProductHierarchy.value
    }
    if(jewelryCategory != undefined){
        jewelryCategory.value = InitData(paramsSearch,jewelryCategory.value,'jewelryCategory');
        if(paramsSearch != null)
            paramsSearch.jewelryCategory = jewelryCategory.value
    }
    if(collection != undefined){
        collection.value = InitData(paramsSearch,collection.value,'collection');
        if(paramsSearch != null)
            paramsSearch.collection = collection.value
    }
    if(brand != undefined){
        brand.value = InitData(paramsSearch,brand.value,'brand');
        if(paramsSearch != null)
            paramsSearch.brand = brand.value
    }
    if(mustHave != undefined){
        mustHave.value = InitData(paramsSearch,mustHave.value,'mustHave');
        if(paramsSearch != null)
            paramsSearch.mustHave = mustHave.value
    }
    if(ringSize != undefined){
        ringSize.value = InitData(paramsSearch,ringSize.value,'ringSize');
        if(paramsSearch != null)
            paramsSearch.ringSize = ringSize.value
    }
    if(totalCostFrom != undefined){
        totalCostFrom.value = InitData(paramsSearch,totalCostFrom.value,'totalCostFrom');
        if(paramsSearch != null)
            paramsSearch.totalCostFrom = totalCostFrom.value
    }
    if(totalCostTo != undefined){
        totalCostTo.value = InitData(paramsSearch,totalCostTo.value,'totalCostTo');
        if(paramsSearch != null)
            paramsSearch.totalCostTo = totalCostTo.value
    }
    if(totalUpdatedCostFrom != undefined){
        totalUpdatedCostFrom.value = InitData(paramsSearch,totalUpdatedCostFrom.value,'totalUpdatedCostFrom');
        if(paramsSearch != null)
            paramsSearch.totalUpdatedCostFrom = totalUpdatedCostFrom.value
    }
    if(totalUpdatedCostTo != undefined){
        totalUpdatedCostTo.value = InitData(paramsSearch,totalUpdatedCostTo.value,'totalUpdatedCostTo');
        if(paramsSearch != null)
            paramsSearch.totalUpdatedCostTo = totalUpdatedCostTo.value
    }
    if(publicPriceFrom != undefined){
        publicPriceFrom.value = InitData(paramsSearch,publicPriceFrom.value,'publicPriceFrom');
        if(paramsSearch != null)
            paramsSearch.publicPriceFrom = publicPriceFrom.value
    }
    if(publicPriceTo != undefined){
        publicPriceTo.value = InitData(paramsSearch,publicPriceTo.value,'publicPriceTo');
        if(paramsSearch != null)
            paramsSearch.publicPriceTo = publicPriceTo.value
    }
    if(markupFrom != undefined){
        markupFrom.value = InitData(paramsSearch,markupFrom.value,'markupFrom');
        if(paramsSearch != null)
            paramsSearch.markupFrom = markupFrom.value
    }
    if(markupTo != undefined){
        markupTo.value = InitData(paramsSearch,markupTo.value,'markupTo');
        if(paramsSearch != null)
            paramsSearch.markupTo = markupTo.value
    }
    if(grossWeightFrom != undefined){
        grossWeightFrom.value = InitData(paramsSearch,grossWeightFrom.value,'grossWeightFrom');
        if(paramsSearch != null)
            paramsSearch.grossWeightFrom = grossWeightFrom.value
    }
    if(grossWeightTo != undefined){
        grossWeightTo.value = InitData(paramsSearch,grossWeightTo.value,'grossWeightTo');
        if(paramsSearch != null)
            paramsSearch.grossWeightTo = grossWeightTo.value
    }
    if(setReference != undefined){
        setReference.value = InitData(paramsSearch,setReference.value,'setReference');
        if(paramsSearch != null)
            paramsSearch.setReference = setReference.value
    }
    if(dominantStone != undefined){
        dominantStone.value = InitData(paramsSearch,dominantStone.value,'dominantStone');
        if(paramsSearch != null)
            paramsSearch.dominantStone = dominantStone.value
    }
    if(metalType != undefined){
        metalType.value = InitData(paramsSearch,metalType.value,'metalType');
        if(paramsSearch != null)
            paramsSearch.metalType = metalType.value
    }
    if(metalColour != undefined){
        metalColour.value = InitData(paramsSearch,metalColour.value,'metalColour');
        if(paramsSearch != null)
            paramsSearch.metalColour = metalColour.value
    }
    if(article != undefined){
        article.value = InitData(paramsSearch,article.value,'article');
        if(paramsSearch != null)
            paramsSearch.article = article.value
    }
    //
    // Gemstones Search
    //

    if(gemstone_stoneType != undefined){
        gemstone_stoneType.value = InitData(paramsSearch,gemstone_stoneType.value,'gemstone_stoneType');
        if(paramsSearch != null)
            paramsSearch.gemstone_stoneType = gemstone_stoneType.value
    }
    if(gemstone_cut != undefined){
        gemstone_cut.value = InitData(paramsSearch,gemstone_cut.value,'gemstone_cut');
        if(paramsSearch != null)
            paramsSearch.gemstone_cut = gemstone_cut.value
    }
    if(gemstone_cutGrade != undefined){
        gemstone_cutGrade.value = InitData(paramsSearch,gemstone_cutGrade.value,'gemstone_cutGrade');
        if(paramsSearch != null)
            paramsSearch.gemstone_cutGrade = gemstone_cutGrade.value
    }
    if(gemstone_color != undefined){
        gemstone_color.value = InitData(paramsSearch,gemstone_color.value,'gemstone_color');
        if(paramsSearch != null)
            paramsSearch.gemstone_color = gemstone_color.value
    }
    if(gemstone_clarity != undefined){
        gemstone_clarity.value = InitData(paramsSearch,gemstone_clarity.value,'gemstone_clarity');
        if(paramsSearch != null)
            paramsSearch.gemstone_clarity = gemstone_clarity.value
    }
    if(gemstone_certificatedNumber != undefined){
        gemstone_certificatedNumber.value = InitData(paramsSearch,gemstone_certificatedNumber.value,'gemstone_certificatedNumber');
        if(paramsSearch != null)
            paramsSearch.gemstone_certificatedNumber = gemstone_certificatedNumber.value
    }
    if(gemstone_certificateAgency != undefined){
        gemstone_certificateAgency.value = InitData(paramsSearch,gemstone_certificateAgency.value,'gemstone_certificateAgency');
        if(paramsSearch != null)
            paramsSearch.gemstone_certificateAgency = gemstone_certificateAgency.value
    }
    if(gemstone_cerDateFrom != undefined){
        gemstone_cerDateFrom.value = InitData(paramsSearch,gemstone_cerDateFrom.value,'gemstone_cerDateFrom');
        if(paramsSearch != null)
            paramsSearch.gemstone_cerDateFrom = gemstone_cerDateFrom.value
    }
    if(gemstone_cerDateTo != undefined){
        gemstone_cerDateTo.value = InitData(paramsSearch,gemstone_cerDateTo.value,'gemstone_cerDateTo');
        if(paramsSearch != null)
            paramsSearch.gemstone_cerDateTo = gemstone_cerDateTo.value
    }
    if(gemstone_stoneCostFrom != undefined){
        gemstone_stoneCostFrom.value = InitData(paramsSearch,gemstone_stoneCostFrom.value,'gemstone_stoneCostFrom');
        if(paramsSearch != null)
            paramsSearch.gemstone_stoneCostFrom = gemstone_stoneCostFrom.value
    }
    if(gemstone_stoneCostTo != undefined){
        gemstone_stoneCostTo.value = InitData(paramsSearch,gemstone_stoneCostTo.value,'gemstone_stoneCostTo');
        if(paramsSearch != null)
            paramsSearch.gemstone_stoneCostTo = gemstone_stoneCostTo.value
    }
    if(gemstone_totalCaratWeightFrom != undefined){
        gemstone_totalCaratWeightFrom.value = InitData(paramsSearch,gemstone_totalCaratWeightFrom.value,'gemstone_totalCaratWeightFrom');
        if(paramsSearch != null)
            paramsSearch.gemstone_totalCaratWeightFrom = gemstone_totalCaratWeightFrom.value
    }
    if(gemstone_totalCaratWeightTo != undefined){
        gemstone_totalCaratWeightTo.value = InitData(paramsSearch,gemstone_totalCaratWeightTo.value,'gemstone_totalCaratWeightTo');
        if(paramsSearch != null)
            paramsSearch.gemstone_totalCaratWeightTo = gemstone_totalCaratWeightTo.value
    }
    if(gemstone_quantityFrom != undefined){
        gemstone_quantityFrom.value = InitData(paramsSearch,gemstone_quantityFrom.value,'gemstone_quantityFrom');
        if(paramsSearch != null)
            paramsSearch.gemstone_quantityFrom = gemstone_quantityFrom.value
    }
    if(gemstone_quantityTo != undefined){
        gemstone_quantityTo.value = InitData(paramsSearch,gemstone_quantityTo.value,'gemstone_quantityTo');
        if(paramsSearch != null)
            paramsSearch.gemstone_quantityTo = gemstone_quantityTo.value
    }
    if(gemstone_origin != undefined){
        gemstone_origin.value = InitData(paramsSearch,gemstone_origin.value,'gemstone_origin');
        if(paramsSearch != null)
            paramsSearch.gemstone_origin = gemstone_origin.value
    }
    if(gemstone_polish != undefined){
        gemstone_polish.value = InitData(paramsSearch,gemstone_polish.value,'gemstone_polish');
        if(paramsSearch != null)
            paramsSearch.gemstone_polish = gemstone_polish.value
    }
    if(gemstone_symmetry != undefined){
        gemstone_symmetry.value = InitData(paramsSearch,gemstone_symmetry.value,'gemstone_symmetry');
        if(paramsSearch != null)
            paramsSearch.gemstone_symmetry = gemstone_symmetry.value
    }
    if(gemstone_treatment != undefined){
        gemstone_treatment.value = InitData(paramsSearch,gemstone_treatment.value,'gemstone_treatment');
        if(paramsSearch != null)
            paramsSearch.gemstone_treatment = gemstone_treatment.value
    }
    if(gemstone_fluorescence != undefined){
        gemstone_fluorescence.value = InitData(paramsSearch,gemstone_fluorescence.value,'gemstone_fluorescence');
        if(paramsSearch != null)
            paramsSearch.gemstone_fluorescence = gemstone_fluorescence.value
    }

    // Watch Search

    if(watchProductHierarchy != undefined){
        watchProductHierarchy.value = InitData(paramsSearch,watchProductHierarchy.value,'watchProductHierarchy');
        if(paramsSearch != null)
            paramsSearch.watchProductHierarchy = watchProductHierarchy.value
    }
    if(watchCategory != undefined){
        watchCategory.value = InitData(paramsSearch,watchCategory.value,'watchCategory');
        if(paramsSearch != null)
            paramsSearch.watchCategory = watchCategory.value
    }
    if(collection != undefined){
        collection.value = InitData(paramsSearch,collection.value,'collection');
        if(paramsSearch != null)
            paramsSearch.collection = collection.value
    }
    if(brand != undefined){
        brand.value = InitData(paramsSearch,brand.value,'brand');
        if(paramsSearch != null)
            paramsSearch.brand = brand.value
    }
    if(mustHave != undefined){
        mustHave.value = InitData(paramsSearch,mustHave.value,'mustHave');
        if(paramsSearch != null)
            paramsSearch.mustHave = mustHave.value
    }
    if(metalType != undefined){
        metalType.value = InitData(paramsSearch,metalType.value,'metalType');
        if(paramsSearch != null)
            paramsSearch.metalType = metalType.value
    }
    if(metalColour != undefined){
        metalColour.value = InitData(paramsSearch,metalColour.value,'metalColour');
        if(paramsSearch != null)
            paramsSearch.metalColour = metalColour.value
    }
    if(dominantStone != undefined){
        dominantStone.value = InitData(paramsSearch,dominantStone.value,'dominantStone');
        if(paramsSearch != null)
            paramsSearch.dominantStone = dominantStone.value
    }
    if(limitedEdition != undefined){
        limitedEdition.value = InitData(paramsSearch,limitedEdition.value,'limitedEdition');
        if(paramsSearch != null)
            paramsSearch.limitedEdition = limitedEdition.value
    }
    if(limitedEditionNumber != undefined){
        limitedEditionNumber.value = InitData(paramsSearch,limitedEditionNumber.value,'limitedEditionNumber');
        if(paramsSearch != null)
            paramsSearch.limitedEditionNumber = limitedEditionNumber.value
    }
    if(serialNumber != undefined){
        serialNumber.value = InitData(paramsSearch,serialNumber.value,'serialNumber');
        if(paramsSearch != null)
            paramsSearch.serialNumber = serialNumber.value
    }
    if(movement != undefined){
        movement.value = InitData(paramsSearch,movement.value,'movement');
        if(paramsSearch != null)
            paramsSearch.movement = movement.value
    }
    if(totalCostFrom != undefined){
        totalCostFrom.value = InitData(paramsSearch,totalCostFrom.value,'totalCostFrom');
        if(paramsSearch != null)
            paramsSearch.totalCostFrom = totalCostFrom.value
    }
    if(totalCostTo != undefined){
        totalCostTo.value = InitData(paramsSearch,totalCostTo.value,'totalCostTo');
        if(paramsSearch != null)
            paramsSearch.totalCostTo = totalCostTo.value
    }
    if(totalUpdatedCostFrom != undefined){
        totalUpdatedCostFrom.value = InitData(paramsSearch,totalUpdatedCostFrom.value,'totalUpdatedCostFrom');
        if(paramsSearch != null)
            paramsSearch.totalUpdatedCostFrom = totalUpdatedCostFrom.value
    }
    if(totalUpdatedCostTo != undefined){
        totalUpdatedCostTo.value = InitData(paramsSearch,totalUpdatedCostTo.value,'totalUpdatedCostTo');
        if(paramsSearch != null)
            paramsSearch.totalUpdatedCostTo = totalUpdatedCostTo.value
    }
    if(publicPriceFrom != undefined){
        publicPriceFrom.value = InitData(paramsSearch,publicPriceFrom.value,'publicPriceFrom');
        if(paramsSearch != null)
            paramsSearch.publicPriceFrom = publicPriceFrom.value
    }
    if(publicPriceTo != undefined){
        publicPriceTo.value = InitData(paramsSearch,publicPriceTo.value,'publicPriceTo');
        if(paramsSearch != null)
            paramsSearch.publicPriceTo = publicPriceTo.value
    }
    if(markupFrom != undefined){
        markupFrom.value = InitData(paramsSearch,markupFrom.value,'markupFrom');
        if(paramsSearch != null)
            paramsSearch.markupFrom = markupFrom.value
    }
    if(markupTo != undefined){
        markupTo.value = InitData(paramsSearch,markupTo.value,'markupTo');
        if(paramsSearch != null)
            paramsSearch.markupTo = markupTo.value
    }
    if(grossWeightFrom != undefined){
        grossWeightFrom.value = InitData(paramsSearch,grossWeightFrom.value,'grossWeightFrom');
        if(paramsSearch != null)
            paramsSearch.grossWeightFrom = grossWeightFrom.value
    }
    if(grossWeightTo != undefined){
        grossWeightTo.value = InitData(paramsSearch,grossWeightTo.value,'grossWeightTo');
        if(paramsSearch != null)
            paramsSearch.grossWeightTo = grossWeightTo.value
    }
    if(proDateFrom != undefined){
        proDateFrom.value = InitData(paramsSearch,proDateFrom.value,'proDateFrom');
        if(paramsSearch != null)
            paramsSearch.proDateFrom = proDateFrom.value
    }
    if(proDateTo != undefined){
        proDateTo.value = InitData(paramsSearch,proDateTo.value,'proDateTo');
        if(paramsSearch != null)
            paramsSearch.proDateTo = proDateTo.value
    }
    if(caseDimensionFrom != undefined){
        caseDimensionFrom.value = InitData(paramsSearch,caseDimensionFrom.value,'caseDimensionFrom');
        if(paramsSearch != null)
            paramsSearch.caseDimensionFrom = caseDimensionFrom.value
    }
    if(caseDimensionTo != undefined){
        caseDimensionTo.value = InitData(paramsSearch,caseDimensionTo.value,'caseDimensionTo');
        if(paramsSearch != null)
            paramsSearch.caseDimensionTo = caseDimensionTo.value
    }
    if(preciousMetalWeightFrom != undefined){
        preciousMetalWeightFrom.value = InitData(paramsSearch,preciousMetalWeightFrom.value,'preciousMetalWeightFrom');
        if(paramsSearch != null)
            paramsSearch.preciousMetalWeightFrom = preciousMetalWeightFrom.value
    }
    if(preciousMetalWeightTo != undefined){
        preciousMetalWeightTo.value = InitData(paramsSearch,preciousMetalWeightTo.value,'preciousMetalWeightTo');
        if(paramsSearch != null)
            paramsSearch.preciousMetalWeightTo = preciousMetalWeightTo.value
    }
    if(dialIndex != undefined){
        dialIndex.value = InitData(paramsSearch,dialIndex.value,'dialIndex');
        if(paramsSearch != null)
            paramsSearch.dialIndex = dialIndex.value
    }
    if(dialColor != undefined){
        dialColor.value = InitData(paramsSearch,dialColor.value,'dialColor');
        if(paramsSearch != null)
            paramsSearch.dialColor = dialColor.value
    }
    if(dialMetal != undefined){
        dialMetal.value = InitData(paramsSearch,dialMetal.value,'dialMetal');
        if(paramsSearch != null)
            paramsSearch.dialMetal = dialMetal.value
    }
    if(buckleType != undefined){
        buckleType.value = InitData(paramsSearch,buckleType.value,'buckleType');
        if(paramsSearch != null)
            paramsSearch.buckleType = buckleType.value
    }
    if(strapType != undefined){
        strapType.value = InitData(paramsSearch,strapType.value,'strapType');
        if(paramsSearch != null)
            paramsSearch.strapType = strapType.value
    }
    if(strapColor != undefined){
        strapColor.value = InitData(paramsSearch,strapColor.value,'strapColor');
        if(paramsSearch != null)
            paramsSearch.strapColor = strapColor.value
    }
    if(complication != undefined){
        complication.value = InitData(paramsSearch,complication.value,'complication');
        if(paramsSearch != null)
            paramsSearch.complication = complication.value
    }

    // Accessory Search

    if(accessoryProductHierarchy != undefined){
        accessoryProductHierarchy.value = InitData(paramsSearch,accessoryProductHierarchy.value,'accessoryProductHierarchy');
        if(paramsSearch != null)
            paramsSearch.accessoryProductHierarchy = accessoryProductHierarchy.value
    }
    if(accessoryType != undefined){
        accessoryType.value = InitData(paramsSearch,accessoryType.value,'accessoryType');
        if(paramsSearch != null)
            paramsSearch.accessoryType = accessoryType.value
    }

    // OBA

    if(obaProductHierarchy != undefined){
        obaProductHierarchy.value = InitData(paramsSearch,obaProductHierarchy.value,'obaProductHierarchy');
        if(paramsSearch != null)
            paramsSearch.obaProductHierarchy = obaProductHierarchy.value
    }
    if(obaDimension != undefined){
        obaDimension.value = InitData(paramsSearch,obaDimension.value,'obaDimension');
        if(paramsSearch != null)
            paramsSearch.obaDimension = obaDimension.value
    }

    // Spare Part

    if(sparePartProductHierarchy != undefined){
        sparePartProductHierarchy.value = InitData(paramsSearch,sparePartProductHierarchy.value,'sparePartProductHierarchy');
        if(paramsSearch != null)
            paramsSearch.sparePartProductHierarchy = sparePartProductHierarchy.value
    }
    if(sparePartType != undefined){
        sparePartType.value = InitData(paramsSearch,sparePartType.value,'sparePartType');
        if(paramsSearch != null)
            paramsSearch.sparePartType = sparePartType.value
    }
}
