import InitData from './initData';

export default function InitModifySalesData(props) {
    let {
        fields:{
            reference, description, certificatedNumber, sku, location, warehouse, dominantStone, customer, salesPersonName, salesChannel, invoiceNo, stoneType,
            invoiceDateFrom, invoiceDateTo, totalCostFrom, totalCostTo, totalUpdatedCostFrom, totalUpdatedCostTo, retailPriceFrom, retailPriceTo, netSalesFrom,
            netSalesTo, marginFrom, marginTo, discountFrom, discountTo, cut, stoneProductSalesHierarchy, lotNumber, cutGrade, color, colorGrade, clarity, polish,
            lotQuantityFrom, lotQuantityTo, certificateAgency, symmetry, treatment, fluorescence, origin, jewelryCategory, brand, mustHave, ringSize, metalType,
            metalColour, collection, watchCategory, limitedEdition, movement, dialIndex, dialColor, dialMetal, buckleType, strapType, strapColor, complication,
            accessoryProductSalesHierarchy, accessoryType, obaProductSalesHierarchy, obaDimension, sparePartProductSalesHierarchy, sparePartType, attachment,
            setReference, searchName, jewelryProductSalesHierarchy, markupFrom, markupTo, grossWeightFrom, grossWeightTo, watchProductSalesHierarchy, article,
            limitedEditionNumber, serialNumber, proDateFrom, proDateTo, caseDimensionFrom, caseDimensionTo, preciousMetalWeightFrom, preciousMetalWeightTo,
            viewAsSet, cerDateFrom, cerDateTo, totalCaratWeightFrom, totalCaratWeightTo, validateSearchName
        },
        searchResult
    } = props;

    // Header Search
    let paramsSalesSearch = (searchResult.paramsSalesSearch != null)?
                          searchResult.paramsSalesSearch:
                          null;

    if(reference != undefined){
        reference.value = InitData(paramsSalesSearch,reference.value,'reference');
        // reference.onChange(reference.value);
        if(paramsSalesSearch != null)
            paramsSalesSearch.reference = reference.value
    }

    if(description != undefined){
        description.value = InitData(paramsSalesSearch,description.value,'description');
        if(paramsSalesSearch != null)
            paramsSalesSearch.description = description.value
    }

    if(certificatedNumber != undefined){
        certificatedNumber.value = InitData(paramsSalesSearch,certificatedNumber.value,'certificatedNumber');
        if(paramsSalesSearch != null)
            paramsSalesSearch.certificatedNumber = certificatedNumber.value
    }
    if(sku != undefined){
        sku.value = InitData(paramsSalesSearch,sku.value,'sku');
        if(paramsSalesSearch != null)
            paramsSalesSearch.sku = sku.value
    }
    if(location != undefined){
        location.value = InitData(paramsSalesSearch,location.value,'location');
        if(paramsSalesSearch != null)
            paramsSalesSearch.location = location.value
    }
    if(warehouse != undefined){
        warehouse.value = InitData(paramsSalesSearch,warehouse.value,'warehouse');
        if(paramsSalesSearch != null)
            paramsSalesSearch.warehouse = warehouse.value
    }
    if(customer != undefined){
        customer.value = InitData(paramsSalesSearch,customer.value,'customer');
        if(paramsSalesSearch != null)
            paramsSalesSearch.customer = customer.value
    }
    if(salesPersonName != undefined){
        salesPersonName.value = InitData(paramsSalesSearch,salesPersonName.value,'salesPersonName');
        if(paramsSalesSearch != null)
            paramsSalesSearch.salesPersonName = salesPersonName.value
    }
    if(salesChannel != undefined){
        salesChannel.value = InitData(paramsSalesSearch,salesChannel.value,'salesChannel');
        if(paramsSalesSearch != null)
            paramsSalesSearch.salesChannel = salesChannel.value
    }
    if(invoiceNo != undefined){
        invoiceNo.value = InitData(paramsSalesSearch,invoiceNo.value,'invoiceNo');
        if(paramsSalesSearch != null)
            paramsSalesSearch.invoiceNo = invoiceNo.value
    }
    if(invoiceDateFrom != undefined){
        invoiceDateFrom.value = InitData(paramsSalesSearch,invoiceDateFrom.value,'invoiceDateFrom');
        if(paramsSalesSearch != null)
            paramsSalesSearch.invoiceDateFrom = invoiceDateFrom.value
    }
    if(invoiceDateTo != undefined){
        invoiceDateTo.value = InitData(paramsSalesSearch,invoiceDateTo.value,'invoiceDateTo');
        if(paramsSalesSearch != null)
            paramsSalesSearch.invoiceDateTo = invoiceDateTo.value
    }
    if(netSalesFrom != undefined){
        netSalesFrom.value = InitData(paramsSalesSearch,netSalesFrom.value,'netSalesFrom');
        if(paramsSalesSearch != null)
            paramsSalesSearch.netSalesFrom = netSalesFrom.value
    }
    if(netSalesTo != undefined){
        netSalesTo.value = InitData(paramsSalesSearch,netSalesTo.value,'netSalesTo');
        if(paramsSalesSearch != null)
            paramsSalesSearch.netSalesTo = netSalesTo.value
    }
    if(marginFrom != undefined){
        marginFrom.value = InitData(paramsSalesSearch,marginFrom.value,'marginFrom');
        if(paramsSalesSearch != null)
            paramsSalesSearch.marginFrom = marginFrom.value
    }
    if(marginTo != undefined){
        marginTo.value = InitData(paramsSalesSearch,marginTo.value,'marginTo');
        if(paramsSalesSearch != null)
            paramsSalesSearch.marginTo = marginTo.value
    }
    if(discountFrom != undefined){
        discountFrom.value = InitData(paramsSalesSearch,discountFrom.value,'discountFrom');
        if(paramsSalesSearch != null)
            paramsSalesSearch.discountFrom = discountFrom.value
    }
    if(discountTo != undefined){
        discountTo.value = InitData(paramsSalesSearch,discountTo.value,'discountTo');
        if(paramsSalesSearch != null)
            paramsSalesSearch.discountTo = discountTo.value
    }

    // Stone Search
    // console.log('stone-->');

    if(stoneProductSalesHierarchy != undefined){
        stoneProductSalesHierarchy.value = InitData(paramsSalesSearch,stoneProductSalesHierarchy.value,'stoneProductSalesHierarchy');
        if(paramsSalesSearch != null)
            paramsSalesSearch.stoneProductSalesHierarchy = stoneProductSalesHierarchy.value
    }
    if(stoneType != undefined){
        stoneType.value = InitData(paramsSalesSearch,stoneType.value,'stoneType');
        if(paramsSalesSearch != null)
            paramsSalesSearch.stoneType = stoneType.value
    }
    if(cut != undefined){
        cut.value = InitData(paramsSalesSearch,cut.value,'cut');
        if(paramsSalesSearch != null)
            paramsSalesSearch.cut = cut.value
    }
    if(cutGrade != undefined){
        cutGrade.value = InitData(paramsSalesSearch,cutGrade.value,'cutGrade');
        if(paramsSalesSearch != null)
            paramsSalesSearch.cutGrade = cutGrade.value
    }
    if(color != undefined){
        color.value = InitData(paramsSalesSearch,color.value,'color');
        if(paramsSalesSearch != null)
            paramsSalesSearch.color = color.value
    }
    if(colorGrade != undefined){
        colorGrade.value = InitData(paramsSalesSearch,colorGrade.value,'colorGrade');
        if(paramsSalesSearch != null)
            paramsSalesSearch.colorGrade = colorGrade.value
    }
    if(clarity != undefined){
        clarity.value = InitData(paramsSalesSearch,clarity.value,'clarity');
        if(paramsSalesSearch != null)
            paramsSalesSearch.clarity = clarity.value
    }
    if(lotNumber != undefined){
        lotNumber.value = InitData(paramsSalesSearch,lotNumber.value,'lotNumber');
        if(paramsSalesSearch != null)
            paramsSalesSearch.lotNumber = lotNumber.value
    }
    if(lotQuantityFrom != undefined){
        lotQuantityFrom.value = InitData(paramsSalesSearch,lotQuantityFrom.value,'lotQuantityFrom');
        if(paramsSalesSearch != null)
            paramsSalesSearch.lotQuantityFrom = lotQuantityFrom.value
    }
    if(lotQuantityTo != undefined){
        lotQuantityTo.value = InitData(paramsSalesSearch,lotQuantityTo.value,'lotQuantityTo');
        if(paramsSalesSearch != null)
            paramsSalesSearch.lotQuantityTo = lotQuantityTo.value
    }
    if(totalCaratWeightFrom != undefined){
        totalCaratWeightFrom.value = InitData(paramsSalesSearch,totalCaratWeightFrom.value,'totalCaratWeightFrom');
        if(paramsSalesSearch != null)
            paramsSalesSearch.totalCaratWeightFrom = totalCaratWeightFrom.value
    }
    if(totalCaratWeightTo != undefined){
        totalCaratWeightTo.value = InitData(paramsSalesSearch,totalCaratWeightTo.value,'totalCaratWeightTo');
        if(paramsSalesSearch != null)
            paramsSalesSearch.totalCaratWeightTo = totalCaratWeightTo.value
    }
    if(totalCostFrom != undefined){
        totalCostFrom.value = InitData(paramsSalesSearch,totalCostFrom.value,'totalCostFrom');
        if(paramsSalesSearch != null)
            paramsSalesSearch.totalCostFrom = totalCostFrom.value
    }
    if(totalCostTo != undefined){
        totalCostTo.value = InitData(paramsSalesSearch,totalCostTo.value,'totalCostTo');
        if(paramsSalesSearch != null)
            paramsSalesSearch.totalCostTo = totalCostTo.value
    }
    if(totalUpdatedCostFrom != undefined){
        totalUpdatedCostFrom.value = InitData(paramsSalesSearch,totalUpdatedCostFrom.value,'totalUpdatedCostFrom');
        if(paramsSalesSearch != null)
            paramsSalesSearch.totalUpdatedCostFrom = totalUpdatedCostFrom.value
    }
    if(totalUpdatedCostTo != undefined){
        totalUpdatedCostTo.value = InitData(paramsSalesSearch,totalUpdatedCostTo.value,'totalUpdatedCostTo');
        if(paramsSalesSearch != null)
            paramsSalesSearch.totalUpdatedCostTo = totalUpdatedCostTo.value
    }
    if(retailPriceFrom != undefined){
        retailPriceFrom.value = InitData(paramsSalesSearch,retailPriceFrom.value,'retailPriceFrom');
        if(paramsSalesSearch != null)
            paramsSalesSearch.retailPriceFrom = retailPriceFrom.value
    }
    if(retailPriceTo != undefined){
        retailPriceTo.value = InitData(paramsSalesSearch,retailPriceTo.value,'retailPriceTo');
        if(paramsSalesSearch != null)
            paramsSalesSearch.retailPriceTo = retailPriceTo.value
    }
    if(markupFrom != undefined){
        markupFrom.value = InitData(paramsSalesSearch,markupFrom.value,'markupFrom');
        if(paramsSalesSearch != null)
            paramsSalesSearch.markupFrom = markupFrom.value
    }
    if(markupTo != undefined){
        markupTo.value = InitData(paramsSalesSearch,markupTo.value,'markupTo');
        if(paramsSalesSearch != null)
            paramsSalesSearch.markupTo = markupTo.value
    }
    if(certificatedNumber != undefined){
        certificatedNumber.value = InitData(paramsSalesSearch,certificatedNumber.value,'certificatedNumber');
        if(paramsSalesSearch != null)
            paramsSalesSearch.certificatedNumber = certificatedNumber.value
    }
    if(certificateAgency != undefined){
        certificateAgency.value = InitData(paramsSalesSearch,certificateAgency.value,'certificateAgency');
        if(paramsSalesSearch != null)
            paramsSalesSearch.certificateAgency = certificateAgency.value
    }
    if(cerDateFrom != undefined){
        cerDateFrom.value = InitData(paramsSalesSearch,cerDateFrom.value,'cerDateFrom');
        if(paramsSalesSearch != null)
            paramsSalesSearch.cerDateFrom = cerDateFrom.value
    }
    if(cerDateTo != undefined){
        cerDateTo.value = InitData(paramsSalesSearch,cerDateTo.value,'cerDateTo');
        if(paramsSalesSearch != null)
            paramsSalesSearch.cerDateTo = cerDateTo.value
    }
    if(polish != undefined){
      polish.value = InitData(paramsSalesSearch,polish.value,'polish');
        if(paramsSalesSearch != null)
          paramsSalesSearch.polish = polish.value
    }
    if(symmetry != undefined){
        symmetry.value = InitData(paramsSalesSearch,symmetry.value,'symmetry');
        if(paramsSalesSearch != null)
            paramsSalesSearch.symmetry = symmetry.value
    }
    if(treatment != undefined){
        treatment.value = InitData(paramsSalesSearch,treatment.value,'treatment');
        if(paramsSalesSearch != null)
            paramsSalesSearch.treatment = treatment.value
    }
    if(fluorescence != undefined){
        fluorescence.value = InitData(paramsSalesSearch,fluorescence.value,'fluorescence');
        if(paramsSalesSearch != null)
            paramsSalesSearch.fluorescence = fluorescence.value
    }
    if(origin != undefined){
        origin.value = InitData(paramsSalesSearch,origin.value,'origin');
        if(paramsSalesSearch != null)
            paramsSalesSearch.origin = origin.value
    }

    //
    // Jewelry Search
    //

    if(jewelryProductSalesHierarchy != undefined){
        jewelryProductSalesHierarchy.value = InitData(paramsSalesSearch,jewelryProductSalesHierarchy.value,'jewelryProductSalesHierarchy');
        if(paramsSalesSearch != null)
            paramsSalesSearch.jewelryProductSalesHierarchy = jewelryProductSalesHierarchy.value
    }
    if(jewelryCategory != undefined){
        jewelryCategory.value = InitData(paramsSalesSearch,jewelryCategory.value,'jewelryCategory');
        if(paramsSalesSearch != null)
            paramsSalesSearch.jewelryCategory = jewelryCategory.value
    }
    if(collection != undefined){
        collection.value = InitData(paramsSalesSearch,collection.value,'collection');
        if(paramsSalesSearch != null)
            paramsSalesSearch.collection = collection.value
    }
    if(brand != undefined){
        brand.value = InitData(paramsSalesSearch,brand.value,'brand');
        if(paramsSalesSearch != null)
            paramsSalesSearch.brand = brand.value
    }
    if(mustHave != undefined){
        mustHave.value = InitData(paramsSalesSearch,mustHave.value,'mustHave');
        if(paramsSalesSearch != null)
            paramsSalesSearch.mustHave = mustHave.value
    }
    if(ringSize != undefined){
        ringSize.value = InitData(paramsSalesSearch,ringSize.value,'ringSize');
        if(paramsSalesSearch != null)
            paramsSalesSearch.ringSize = ringSize.value
    }
    if(totalCostFrom != undefined){
        totalCostFrom.value = InitData(paramsSalesSearch,totalCostFrom.value,'totalCostFrom');
        if(paramsSalesSearch != null)
            paramsSalesSearch.totalCostFrom = totalCostFrom.value
    }
    if(totalCostTo != undefined){
        totalCostTo.value = InitData(paramsSalesSearch,totalCostTo.value,'totalCostTo');
        if(paramsSalesSearch != null)
            paramsSalesSearch.totalCostTo = totalCostTo.value
    }
    if(totalUpdatedCostFrom != undefined){
        totalUpdatedCostFrom.value = InitData(paramsSalesSearch,totalUpdatedCostFrom.value,'totalUpdatedCostFrom');
        if(paramsSalesSearch != null)
            paramsSalesSearch.totalUpdatedCostFrom = totalUpdatedCostFrom.value
    }
    if(totalUpdatedCostTo != undefined){
        totalUpdatedCostTo.value = InitData(paramsSalesSearch,totalUpdatedCostTo.value,'totalUpdatedCostTo');
        if(paramsSalesSearch != null)
            paramsSalesSearch.totalUpdatedCostTo = totalUpdatedCostTo.value
    }

    if(markupFrom != undefined){
        markupFrom.value = InitData(paramsSalesSearch,markupFrom.value,'markupFrom');
        if(paramsSalesSearch != null)
            paramsSalesSearch.markupFrom = markupFrom.value
    }
    if(markupTo != undefined){
        markupTo.value = InitData(paramsSalesSearch,markupTo.value,'markupTo');
        if(paramsSalesSearch != null)
            paramsSalesSearch.markupTo = markupTo.value
    }
    if(grossWeightFrom != undefined){
        grossWeightFrom.value = InitData(paramsSalesSearch,grossWeightFrom.value,'grossWeightFrom');
        if(paramsSalesSearch != null)
            paramsSalesSearch.grossWeightFrom = grossWeightFrom.value
    }
    if(grossWeightTo != undefined){
        grossWeightTo.value = InitData(paramsSalesSearch,grossWeightTo.value,'grossWeightTo');
        if(paramsSalesSearch != null)
            paramsSalesSearch.grossWeightTo = grossWeightTo.value
    }
    if(setReference != undefined){
        setReference.value = InitData(paramsSalesSearch,setReference.value,'setReference');
        if(paramsSalesSearch != null)
            paramsSalesSearch.setReference = setReference.value
    }
    if(dominantStone != undefined){
        dominantStone.value = InitData(paramsSalesSearch,dominantStone.value,'dominantStone');
        if(paramsSalesSearch != null)
            paramsSalesSearch.dominantStone = dominantStone.value
    }
    if(metalType != undefined){
        metalType.value = InitData(paramsSalesSearch,metalType.value,'metalType');
        if(paramsSalesSearch != null)
            paramsSalesSearch.metalType = metalType.value
    }
    if(metalColour != undefined){
        metalColour.value = InitData(paramsSalesSearch,metalColour.value,'metalColour');
        if(paramsSalesSearch != null)
            paramsSalesSearch.metalColour = metalColour.value
    }
    if(article != undefined){
        article.value = InitData(paramsSalesSearch,article.value,'article');
        if(paramsSalesSearch != null)
            paramsSalesSearch.article = article.value
    }

    // Watch Search

    if(watchProductSalesHierarchy != undefined){
        watchProductSalesHierarchy.value = InitData(paramsSalesSearch,watchProductSalesHierarchy.value,'watchProductSalesHierarchy');
        if(paramsSalesSearch != null)
            paramsSalesSearch.watchProductSalesHierarchy = watchProductSalesHierarchy.value
    }
    if(watchCategory != undefined){
        watchCategory.value = InitData(paramsSalesSearch,watchCategory.value,'watchCategory');
        if(paramsSalesSearch != null)
            paramsSalesSearch.watchCategory = watchCategory.value
    }
    if(collection != undefined){
        collection.value = InitData(paramsSalesSearch,collection.value,'collection');
        if(paramsSalesSearch != null)
            paramsSalesSearch.collection = collection.value
    }
    if(brand != undefined){
        brand.value = InitData(paramsSalesSearch,brand.value,'brand');
        if(paramsSalesSearch != null)
            paramsSalesSearch.brand = brand.value
    }
    if(mustHave != undefined){
        mustHave.value = InitData(paramsSalesSearch,mustHave.value,'mustHave');
        if(paramsSalesSearch != null)
            paramsSalesSearch.mustHave = mustHave.value
    }
    if(metalType != undefined){
        metalType.value = InitData(paramsSalesSearch,metalType.value,'metalType');
        if(paramsSalesSearch != null)
            paramsSalesSearch.metalType = metalType.value
    }
    if(metalColour != undefined){
        metalColour.value = InitData(paramsSalesSearch,metalColour.value,'metalColour');
        if(paramsSalesSearch != null)
            paramsSalesSearch.metalColour = metalColour.value
    }
    if(limitedEdition != undefined){
        limitedEdition.value = InitData(paramsSalesSearch,limitedEdition.value,'limitedEdition');
        if(paramsSalesSearch != null)
            paramsSalesSearch.limitedEdition = limitedEdition.value
    }
    if(limitedEditionNumber != undefined){
        limitedEditionNumber.value = InitData(paramsSalesSearch,limitedEditionNumber.value,'limitedEditionNumber');
        if(paramsSalesSearch != null)
            paramsSalesSearch.limitedEditionNumber = limitedEditionNumber.value
    }
    if(serialNumber != undefined){
        serialNumber.value = InitData(paramsSalesSearch,serialNumber.value,'serialNumber');
        if(paramsSalesSearch != null)
            paramsSalesSearch.serialNumber = serialNumber.value
    }
    if(movement != undefined){
        movement.value = InitData(paramsSalesSearch,movement.value,'movement');
        if(paramsSalesSearch != null)
            paramsSalesSearch.movement = movement.value
    }
    if(totalCostFrom != undefined){
        totalCostFrom.value = InitData(paramsSalesSearch,totalCostFrom.value,'totalCostFrom');
        if(paramsSalesSearch != null)
            paramsSalesSearch.totalCostFrom = totalCostFrom.value
    }
    if(totalCostTo != undefined){
        totalCostTo.value = InitData(paramsSalesSearch,totalCostTo.value,'totalCostTo');
        if(paramsSalesSearch != null)
            paramsSalesSearch.totalCostTo = totalCostTo.value
    }
    if(totalUpdatedCostFrom != undefined){
        totalUpdatedCostFrom.value = InitData(paramsSalesSearch,totalUpdatedCostFrom.value,'totalUpdatedCostFrom');
        if(paramsSalesSearch != null)
            paramsSalesSearch.totalUpdatedCostFrom = totalUpdatedCostFrom.value
    }
    if(totalUpdatedCostTo != undefined){
        totalUpdatedCostTo.value = InitData(paramsSalesSearch,totalUpdatedCostTo.value,'totalUpdatedCostTo');
        if(paramsSalesSearch != null)
            paramsSalesSearch.totalUpdatedCostTo = totalUpdatedCostTo.value
    }

    if(markupFrom != undefined){
        markupFrom.value = InitData(paramsSalesSearch,markupFrom.value,'markupFrom');
        if(paramsSalesSearch != null)
            paramsSalesSearch.markupFrom = markupFrom.value
    }
    if(markupTo != undefined){
        markupTo.value = InitData(paramsSalesSearch,markupTo.value,'markupTo');
        if(paramsSalesSearch != null)
            paramsSalesSearch.markupTo = markupTo.value
    }
    if(grossWeightFrom != undefined){
        grossWeightFrom.value = InitData(paramsSalesSearch,grossWeightFrom.value,'grossWeightFrom');
        if(paramsSalesSearch != null)
            paramsSalesSearch.grossWeightFrom = grossWeightFrom.value
    }
    if(grossWeightTo != undefined){
        grossWeightTo.value = InitData(paramsSalesSearch,grossWeightTo.value,'grossWeightTo');
        if(paramsSalesSearch != null)
            paramsSalesSearch.grossWeightTo = grossWeightTo.value
    }
    if(proDateFrom != undefined){
        proDateFrom.value = InitData(paramsSalesSearch,proDateFrom.value,'proDateFrom');
        if(paramsSalesSearch != null)
            paramsSalesSearch.proDateFrom = proDateFrom.value
    }
    if(proDateTo != undefined){
        proDateTo.value = InitData(paramsSalesSearch,proDateTo.value,'proDateTo');
        if(paramsSalesSearch != null)
            paramsSalesSearch.proDateTo = proDateTo.value
    }
    if(caseDimensionFrom != undefined){
        caseDimensionFrom.value = InitData(paramsSalesSearch,caseDimensionFrom.value,'caseDimensionFrom');
        if(paramsSalesSearch != null)
            paramsSalesSearch.caseDimensionFrom = caseDimensionFrom.value
    }
    if(caseDimensionTo != undefined){
        caseDimensionTo.value = InitData(paramsSalesSearch,caseDimensionTo.value,'caseDimensionTo');
        if(paramsSalesSearch != null)
            paramsSalesSearch.caseDimensionTo = caseDimensionTo.value
    }
    if(preciousMetalWeightFrom != undefined){
        preciousMetalWeightFrom.value = InitData(paramsSalesSearch,preciousMetalWeightFrom.value,'preciousMetalWeightFrom');
        if(paramsSalesSearch != null)
            paramsSalesSearch.preciousMetalWeightFrom = preciousMetalWeightFrom.value
    }
    if(preciousMetalWeightTo != undefined){
        preciousMetalWeightTo.value = InitData(paramsSalesSearch,preciousMetalWeightTo.value,'preciousMetalWeightTo');
        if(paramsSalesSearch != null)
            paramsSalesSearch.preciousMetalWeightTo = preciousMetalWeightTo.value
    }
    if(dialIndex != undefined){
        dialIndex.value = InitData(paramsSalesSearch,dialIndex.value,'dialIndex');
        if(paramsSalesSearch != null)
            paramsSalesSearch.dialIndex = dialIndex.value
    }
    if(dialColor != undefined){
        dialColor.value = InitData(paramsSalesSearch,dialColor.value,'dialColor');
        if(paramsSalesSearch != null)
            paramsSalesSearch.dialColor = dialColor.value
    }
    if(dialMetal != undefined){
        dialMetal.value = InitData(paramsSalesSearch,dialMetal.value,'dialMetal');
        if(paramsSalesSearch != null)
            paramsSalesSearch.dialMetal = dialMetal.value
    }
    if(buckleType != undefined){
        buckleType.value = InitData(paramsSalesSearch,buckleType.value,'buckleType');
        if(paramsSalesSearch != null)
            paramsSalesSearch.buckleType = buckleType.value
    }
    if(strapType != undefined){
        strapType.value = InitData(paramsSalesSearch,strapType.value,'strapType');
        if(paramsSalesSearch != null)
            paramsSalesSearch.strapType = strapType.value
    }
    if(strapColor != undefined){
        strapColor.value = InitData(paramsSalesSearch,strapColor.value,'strapColor');
        if(paramsSalesSearch != null)
            paramsSalesSearch.strapColor = strapColor.value
    }
    if(complication != undefined){
        complication.value = InitData(paramsSalesSearch,complication.value,'complication');
        if(paramsSalesSearch != null)
            paramsSalesSearch.complication = complication.value
    }

    // Accessory Search

    if(accessoryProductSalesHierarchy != undefined){
        accessoryProductSalesHierarchy.value = InitData(paramsSalesSearch,accessoryProductSalesHierarchy.value,'accessoryProductSalesHierarchy');
        if(paramsSalesSearch != null)
            paramsSalesSearch.accessoryProductSalesHierarchy = accessoryProductSalesHierarchy.value
    }
    if(accessoryType != undefined){
        accessoryType.value = InitData(paramsSalesSearch,accessoryType.value,'accessoryType');
        if(paramsSalesSearch != null)
            paramsSalesSearch.accessoryType = accessoryType.value
    }

    // OBA

    if(obaProductSalesHierarchy != undefined){
        obaProductSalesHierarchy.value = InitData(paramsSalesSearch,obaProductSalesHierarchy.value,'obaProductSalesHierarchy');
        if(paramsSalesSearch != null)
            paramsSalesSearch.obaProductSalesHierarchy = obaProductSalesHierarchy.value
    }
    if(obaDimension != undefined){
        obaDimension.value = InitData(paramsSalesSearch,obaDimension.value,'obaDimension');
        if(paramsSalesSearch != null)
            paramsSalesSearch.obaDimension = obaDimension.value
    }

    // Spare Part

    if(sparePartProductSalesHierarchy != undefined){
        sparePartProductSalesHierarchy.value = InitData(paramsSalesSearch,sparePartProductSalesHierarchy.value,'sparePartProductSalesHierarchy');
        if(paramsSalesSearch != null)
            paramsSalesSearch.sparePartProductSalesHierarchy = sparePartProductSalesHierarchy.value
    }
    if(sparePartType != undefined){
        sparePartType.value = InitData(paramsSalesSearch,sparePartType.value,'sparePartType');
        if(paramsSalesSearch != null)
            paramsSalesSearch.sparePartType = sparePartType.value
    }
}
