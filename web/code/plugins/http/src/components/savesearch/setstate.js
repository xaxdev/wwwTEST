const setstate = async (props,criterias) => {
    const { fields: { gemstone_quantityFrom } } = props;
    let data = {};
    await criterias.map((criteria) => {
        const keyscat = Object.keys(criteria);
        const valueKeys = criteria[keyscat[0]];
        // console.log('criteria-->',criteria);
        // console.log('valueKeys-->',valueKeys);
        switch (keyscat[0]) {
            case 'sparePartProductHierarchy':
                props.inventoryActions.setSaveSearchHierarchy(valueKeys);
                break;
            case 'obaProductHierarchy':
                props.inventoryActions.setSaveSearchHierarchy(valueKeys);
                break;
            case 'accessoryProductHierarchy':
                props.inventoryActions.setSaveSearchHierarchy(valueKeys);
                break;
            case 'stoneProductHierarchy':
                props.inventoryActions.setSaveSearchHierarchy(valueKeys);
                break;
            case 'watchProductHierarchy':
                props.inventoryActions.setSaveSearchHierarchy(valueKeys);
                break;
            case 'jewelryProductHierarchy':
                props.inventoryActions.setSaveSearchHierarchy(valueKeys);
                break;
            case 'gemstones.certificateAgency':
                props.inventoryActions.setDataCertificateAgency(valueKeys);
                break;
            case 'gemstones.origin':
                props.inventoryActions.setDataOrigin(valueKeys);
                break;
            case 'gemstones.symmetry':
                props.inventoryActions.setDataSymmetry(valueKeys);
                break;
            case 'gemstones.clarity':
                props.inventoryActions.setDataClarity(valueKeys);
                break;
            case 'gemstones.color':
                props.inventoryActions.setDataColor(valueKeys);
                break;
            case 'gemstones.cut':
                props.inventoryActions.setDataCut(valueKeys);
                break;
            case 'gemstones.stoneType':
                props.inventoryActions.setDatastoneType(valueKeys);
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
            // case 'hierarchy':
            //     props.inventoryActions.setHierarchy(valueKeys);
            //     break;
            case 'type':
                const types = valueKeys.split(' ');
                if (types.length > 1) {
                    props.inventoryActions.setAdvance(false);
                }else{
                    switch (types[0]) {
                        case 'JLY':
                            props.inventoryActions.selectedTabCategory(1);
                            break;
                        case 'WAT':
                            props.inventoryActions.selectedTabCategory(2);
                            break;
                        case 'STO':
                            props.inventoryActions.selectedTabCategory(3);
                            break;
                        case 'ACC':
                            props.inventoryActions.selectedTabCategory(4);
                            break;
                        case 'OBA':
                            props.inventoryActions.selectedTabCategory(5);
                            break;
                        case 'SPA':
                            props.inventoryActions.selectedTabCategory(6);
                            break;
                        default:

                    }
                    props.inventoryActions.setAdvance(true);
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
        // console.log('keyscat[0]-->',keyscat[0]);
        let casegem = keyscat[0].indexOf('gemstones.') != -1;
        switch (casegem) {
            case true :
                data[keyscat[0].replace('gemstones.','gemstone_')] = valueKeys;
                break;
            default:
                data[keyscat[0]] = valueKeys;
                break;
        }
    })
    return data;
}
export { setstate }
