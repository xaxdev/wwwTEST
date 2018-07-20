const setSalesState = async (props,criterias) => {
    const { fields: { gemstone_quantityFrom } } = props;
    let data = {};
    await criterias.map((criteria) => {
        const keyscat = Object.keys(criteria);
        const valueKeys = criteria[keyscat[0]];
        if (keyscat.length != 0) {
            switch (keyscat[0]) {
                case 'salesChannel':
                    props.inventoryActions.setDataSalesChannel(valueKeys);
                    break;
                case 'origin':
                    props.inventoryActions.setDataOrigin(valueKeys);
                    break;
                case 'fluorescence':
                    props.inventoryActions.setDataFluorescence(valueKeys);
                    break;
                case 'treatment':
                    props.inventoryActions.setDataTreatment(valueKeys);
                    break;
                case 'symmetry':
                    props.inventoryActions.setDataSymmetry(valueKeys);
                    break;
                case 'polish':
                    props.inventoryActions.setDataPolish(valueKeys);
                    break;
                case 'certificateAgency':
                    props.inventoryActions.setDataCertificateAgency(valueKeys);
                    break;
                case 'lotNumbers.clarity':
                    props.inventoryActions.setDataClarity(valueKeys);
                    break;
                case 'colorGrade':
                    props.inventoryActions.setDataColorGrade(valueKeys);
                    break;
                case 'lotNumbers.color':
                    props.inventoryActions.setDataColor(valueKeys);
                    break;
                case 'cutGrade':
                    props.inventoryActions.setDataCutGrade(valueKeys);
                    break;
                case 'lotNumbers.cut':
                    props.inventoryActions.setDataCut(valueKeys);
                    break;
                case 'stoneType':
                    props.inventoryActions.setDatastoneType(valueKeys);
                    break;
                case 'accessoryType':
                    props.inventoryActions.setDataAccessoryType(valueKeys);
                    break;
                case 'complication':
                    props.inventoryActions.setDataComplication(valueKeys);
                    break;
                case 'strapColor':
                    props.inventoryActions.setDataStrapColor(valueKeys);
                    break;
                case 'strapType':
                    props.inventoryActions.setDataStrapType(valueKeys);
                    break;
                case 'dialMetal':
                    props.inventoryActions.setDataDialMetal(valueKeys);
                    break;
                case 'dialColor':
                    props.inventoryActions.setDataDialColor(valueKeys);
                    break;
                case 'dialIndex':
                    props.inventoryActions.setDataDialIndex(valueKeys);
                    break;
                case 'movement':
                    props.inventoryActions.setDataMovement(valueKeys);
                    break;
                case 'limitedEdition':
                    props.inventoryActions.setDataLimitedEdition(valueKeys);
                    break;
                case 'watchCategory':
                    props.inventoryActions.setDataWatchCategory(valueKeys);
                    break;
                case 'buckleType':
                    props.inventoryActions.setDataBuckleType(valueKeys);
                    break;
                case 'sparePartType':
                    props.inventoryActions.setDataSparePartType(valueKeys);
                    break;
                case 'ringSize':
                    props.inventoryActions.setDataRingSize(valueKeys);
                    break;
                case 'viewAsSet':
                    props.inventoryActions.setViewAsSet(valueKeys);
                    break;
                case 'sparePartProductSalesHierarchy':
                    props.inventoryActions.setSaveSearchSalesHierarchy(valueKeys);
                    break;
                case 'obaProductSalesHierarchy':
                    props.inventoryActions.setSaveSearchSalesHierarchy(valueKeys);
                    break;
                case 'accessoryProductSalesHierarchy':
                    props.inventoryActions.setSaveSearchSalesHierarchy(valueKeys);
                    break;
                case 'stoneProductSalesHierarchy':
                    props.inventoryActions.setSaveSearchSalesHierarchy(valueKeys);
                    break;
                case 'watchProductSalesHierarchy':
                    props.inventoryActions.setSaveSearchSalesHierarchy(valueKeys);
                    break;
                case 'jewelryProductSalesHierarchy':
                    props.inventoryActions.setSaveSearchSalesHierarchy(valueKeys);
                    break;
                case 'metalColour':
                    props.inventoryActions.setDataMetalColour(valueKeys);
                    break;
                case 'metalType':
                    props.inventoryActions.setDataMetalType(valueKeys);
                    break;
                case 'mustHave':
                    props.inventoryActions.setDataMusthave(valueKeys);
                    break;
                case 'brand':
                    props.inventoryActions.setDataBrand(valueKeys);
                    break;
                case 'collection':
                    props.inventoryActions.setDataCollection(valueKeys);
                    break;
                case 'jewelryCategory':
                    props.inventoryActions.setDataJewelryCategory(valueKeys);
                    break;
                case 'article':
                    props.inventoryActions.setDataArticle(valueKeys);
                    break;
                case 'type':
                    const types = valueKeys.split(' ');
                    if (types.length > 1) {
                        props.inventoryActions.setSalesAdvance(false);
                    }else{
                        switch (types[0]) {
                            case 'JLY':
                                props.inventoryActions.selectedTabSalesCategory(1);
                                break;
                            case 'WAT':
                                props.inventoryActions.selectedTabSalesCategory(2);
                                break;
                            case 'STO':
                                props.inventoryActions.selectedTabSalesCategory(3);
                                break;
                            case 'ACC':
                                props.inventoryActions.selectedTabSalesCategory(4);
                                break;
                            case 'OBA':
                                props.inventoryActions.selectedTabSalesCategory(5);
                                break;
                            case 'SPA':
                                props.inventoryActions.selectedTabSalesCategory(6);
                                break;
                            default:

                        }
                        props.inventoryActions.setSalesAdvance(true);
                    }
                    break;
                case 'dominantStone':
                    props.inventoryActions.setDataDominantStone(valueKeys);
                    break;
                case 'warehouse':
                    props.inventoryActions.setDataWarehouse(valueKeys);
                    break;
                case 'location':
                    props.inventoryActions.setDataLocation(valueKeys);
                    break;
                default:
                    break;
            }

            let caselot = keyscat[0].indexOf('lotNumbers.') != -1;
            switch (caselot) {
                case true :
                    data[keyscat[0].replace('lotNumbers.','')] = valueKeys;
                    break;
                default:
                    data[keyscat[0]] = valueKeys;
                    break;
            }
        }
    })
    return data;
}
export { setSalesState }
