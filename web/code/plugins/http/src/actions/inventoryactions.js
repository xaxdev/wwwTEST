import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

import {
    RESET_FORM, SET_LOCATION, SET_WAREHOUSE, SET_STONETYPE, SET_CUT, SET_CUTGRADE, SET_COLOR, SET_COLORGRADE, SET_CLARITY, SET_POLISH, SET_SYMMETRY,
    SET_TREATMENT, SET_FLUORESCENCE, SET_ORIGIN, SET_JEWELRYCATEGORY, SET_COLLECTION, SET_BRAND, SET_MUSTHAVE, SET_RINGSIZE, SET_DOMINANTSTONE, SET_METALTYPE,
    SET_METALCOLOUR, SET_CERTIFICATEAGENCY, SET_WATCHCATEORY, SET_LIMITEDEDITION, SET_MOVEMENT, SET_DIALINDEX, SET_DIALCOLOR, SET_DIALMETAL, SET_BUCKLETYPE,
    SET_STRAPTYPE, SET_STRAPCOLOR, SET_COMPLICATION, SELECTED_TABCATEGORY, SET_ADVANCE,SET_ACCESSORYTYPE,SET_SPAREPARTTYPE,SET_HIERARCHY,
    SET_GEMS_CERTIFICATE_DATE_FROM, SET_GEMS_CERTIFICATE_DATE_TO,SET_STONE_CERTIFICATE_DATE_FROM,SET_STONE_CERTIFICATE_DATE_TO, SET_PRODUCTION_DATE_FROM,
    SET_PRODUCTION_DATE_TO,SET_SUBMITACTION,SET_SAVESEARCHHIERARCHY,SET_VIEWASSET, SET_ITEMSORDER, SET_SETREFERENCEORDER, SET_ARTICLE,SET_SALESADVANCE,
    SELECTED_TABSALESCATEGORY,SET_SALESCHANNEL, SET_SALESHIERARCHY, SET_SAVESEARCHSALESHIERARCHY, SET_GEMS_STONE_TYPE
} from '../constants/inventoryConstants';

export function setDataGemstoneStoneType(value){
    return {
        type: SET_GEMS_STONE_TYPE,
        gemstoneStoneType:value
    }
}
export function setSaveSearchSalesHierarchy(value){
    return {
        type: SET_SAVESEARCHSALESHIERARCHY,
        savesearchsaleshierarchy:value
    }
}
export function setDataSalesChannel(value){
    return {
        type: SET_SALESCHANNEL,
        salesChannel:value
    }
}
export function setSetReferenceOrder(value){
    return {
        type: SET_SETREFERENCEORDER,
        setReferenceOrder: value
    }
}
export function setItemsOrder(value){
    return {
        type: SET_ITEMSORDER,
        itemsOrder: value
    }
}
export function setViewAsSet(value){
    return {
        type: SET_VIEWASSET,
        viewAsSet: value
    }
}
export function setSubmitAction(value){
    return {
        type: SET_SUBMITACTION,
        submitActionValue: value
    }
}

export function resetForm(){
    return {
        type: RESET_FORM
    }
}
export function setProductionDateFrom(value){
    return {
        type: SET_PRODUCTION_DATE_FROM,
        productionDateFrom: value
    }
}
export function setProductionDateTo(value){
    return {
        type: SET_PRODUCTION_DATE_TO,
        productionDateTo: value
    }
}
export function setStoneCertificateDateFrom(value){
    return {
        type: SET_STONE_CERTIFICATE_DATE_FROM,
        stoneCertificateDateFrom: value
    }
}
export function setStoneCertificateDateTo(value){
    return {
        type: SET_STONE_CERTIFICATE_DATE_TO,
        stoneCertificateDateTo: value
    }
}
export function setGemsCertificateDateFrom(value){
    return {
        type: SET_GEMS_CERTIFICATE_DATE_FROM,
        certificateDateFrom: value
    }
}
export function setGemsCertificateDateTo(value){
    return {
        type: SET_GEMS_CERTIFICATE_DATE_TO,
        certificateDateTo: value
    }
}
export function setSaveSearchHierarchy(value){
    return {
        type: SET_SAVESEARCHHIERARCHY,
        savesearchhierarchy:value
    }
}
export function setHierarchy(value){
    return {
        type: SET_HIERARCHY,
        hierarchy:value
    }
}
export function setSalesHierarchy(value){
    return {
        type: SET_SALESHIERARCHY,
        salesHierarchy:value
    }
}
export function setDataSparePartType(value){
    return {
        type: SET_SPAREPARTTYPE,
        sparePartType:value
    }
}
export function setDataAccessoryType(value){
    return {
        type: SET_ACCESSORYTYPE,
        accessoryType:value
    }
}
export function setAdvance(isAdvance){
    return {
        type: SET_ADVANCE ,
        isAdvance:isAdvance
    }
}
export function setSalesAdvance(value){
    return {
        type: SET_SALESADVANCE ,
        salesIsAdvance:value
    }
}
export function selectedTabCategory(activeTab){
    return {
        type: SELECTED_TABCATEGORY ,
        tab:activeTab
    }
}
export function selectedTabSalesCategory(activeTab){
    return {
        type: SELECTED_TABSALESCATEGORY ,
        tab:activeTab
    }
}
export function setDataComplication(value){
    return {
        type: SET_COMPLICATION ,
        complication:value
    }
}
export function setDataStrapColor(value){
    return {
        type: SET_STRAPCOLOR ,
        strapColor:value
    }
}
export function setDataStrapType(value){
    return {
        type: SET_STRAPTYPE ,
        strapType:value
    }
}
export function setDataBuckleType(value){
    return {
        type: SET_BUCKLETYPE ,
        buckleType:value
    }
}
export function setDataDialMetal(value){
    return {
        type: SET_DIALMETAL ,
        dialMetal:value
    }
}
export function setDataDialColor(value){
    return {
        type: SET_DIALCOLOR ,
        dialColor:value
    }
}
export function setDataDialIndex(value){
    return {
        type: SET_DIALINDEX ,
        dialIndex:value
    }
}
export function setDataMovement(value){
    return {
        type: SET_MOVEMENT,
        movement:value
    }
}
export function setDataLimitedEdition(value){
    return {
        type: SET_LIMITEDEDITION ,
        limitedEdition:value
    }
}
export function setDataWatchCategory(value){
    return {
        type: SET_WATCHCATEORY,
        watchCategory:value
    }
}
export function setDataCertificateAgency(value){
    return {
        type: SET_CERTIFICATEAGENCY,
        certificateAgency:value
    }
}
export function setDataMetalColour(value){
    return {
        type: SET_METALCOLOUR,
        metalColour:value
    }
}
export function setDataMetalType(value){
    return {
        type: SET_METALTYPE,
        metalType:value
    }
}
export function setDataDominantStone(value){
    return {
        type: SET_DOMINANTSTONE,
        dominantStone:value
    }
}
export function setDataRingSize(value){
    return {
        type: SET_RINGSIZE,
        ringSize:value
    }
}
export function setDataMusthave(value){
    return {
        type: SET_MUSTHAVE,
        musthave:value
    }
}
export function setDataBrand(value){
    return {
        type: SET_BRAND,
        brand:value
    }
}
export function setDataCollection(value){
    return {
        type: SET_COLLECTION,
        collection:value
    }
}
export function setDataJewelryCategory(value){
    return {
        type: SET_JEWELRYCATEGORY,
        jewelryCategory:value
    }
}
export function setDataFluorescence(value){
    return {
        type: SET_FLUORESCENCE,
        fluorescence:value
    }
}
export function setDataOrigin(value){
    return {
        type: SET_ORIGIN,
        origin:value
    }
}
export function setDataTreatment(value){
    return {
        type: SET_TREATMENT,
        treatment:value
    }
}
export function setDataSymmetry(value){
    return {
        type: SET_SYMMETRY,
        symmetry:value
    }
}
export function setDataPolish(value){
    return {
        type: SET_POLISH,
        polish:value
    }
}
export function setDataClarity(value){
    return {
        type: SET_CLARITY,
        clarity:value
    }
}
export function setDataColorGrade(value){
    return {
        type: SET_COLORGRADE,
        colorGrade:value
    }
}
export function setDataColor(value){
    return {
        type: SET_COLOR,
        color:value
    }
}
export function setDataCutGrade(value){
    return {
        type: SET_CUTGRADE,
        cutGrade:value
    }
}
export function setDataCut(value){
    return {
        type: SET_CUT,
        cut:value
    }
}
export function setDataLocation(value){
    return {
        type: SET_LOCATION,
        location:value
    }
}
export function setDataWarehouse(value){
    return {
        type: SET_WAREHOUSE,
        warehouse:value
    }
}
export function setDatastoneType(value){
    return {
        type: SET_STONETYPE,
        stoneType:value
    }
}
export function setDataArticle(value){
    return {
        type: SET_ARTICLE,
        article: value
    }
}
