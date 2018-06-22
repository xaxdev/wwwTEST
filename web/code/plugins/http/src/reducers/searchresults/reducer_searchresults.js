import {FETCH_ALLITEMS, FETCH_ITEM, FETCH_SORTING, NEWSEARCH, MODIFY_SEARCH, SET_PARAMS, SET_CURRENTPAGE, SET_PAGESIZE, SET_SORTBY, SET_SORTDIRECTION,
    SET_SHOWGRIDVIEW, SET_SHOWLISTVIEW, WRITE_HTML, POST_SAVESEARCH, SET_ISSAVESEARCH, SET_CLOSEALERTMSG, GET_LISTSAVESEARCH, SET_SHAREDSAVESEARCH,
    GET_SAVECRITERIA, DELETE_SAVESEARCH, SET_IDDELETESAVESEARCH, SET_IDEDITSAVESEARCH,FETCH_ALLPDF,FETCH_EXPORTITEMS,SET_IDEDITSALESSAVESEARCH,
    GET_SAVESALESCRITERIA, SET_SALESPARAMS, MODIFY_SALESSEARCH, SET_SALESSHAREDSAVESEARCH, SET_IDDELETESALESSAVESEARCH, DELETE_SALESSAVESEARCH,
    GET_SALESSAVECRITERIA, POST_SALESSAVESEARCH, SET_CLOSEALERTMSGSALES,FETCH_ALLSALESITEMS,SET_SALESSORTBY,SET_SALESSORTDIRECTION,SET_SALESPAGESIZE,
    SET_SALESSHOWGRIDVIEW, SET_SALESSHOWLISTVIEW, NEWSALESSEARCH, SET_ITEMSSALESORDER, SET_SETREFERENCESALESORDER,FETCH_EXPORTSALESITEMS,FETCH_SALESALLPDF
} from '../../constants/itemconstants';

import { RESET_FORM, SET_LOCATION, SET_WAREHOUSE, SET_STONETYPE, SET_CUT, SET_CUTGRADE, SET_COLOR, SET_COLORGRADE, SET_CLARITY, SET_CERTIFICATELAB, SET_POLISH,
    SET_SYMMETRY, SET_TREATMENT, SET_FLUORESCENCE, SET_ORIGIN, SET_JEWELRYCATEGORY, SET_COLLECTION, SET_BRAND, SET_MUSTHAVE, SET_RINGSIZE, SET_DOMINANTSTONE,
    SET_METALTYPE, SET_METALCOLOUR, SET_CERTIFICATEAGENCY, SET_WATCHCATEORY, SET_LIMITEDEDITION, SET_MOVEMENT, SET_DIALINDEX, SET_DIALCOLOR, SET_DIALMETAL,
    SET_BUCKLETYPE, SET_STRAPTYPE, SET_STRAPCOLOR, SET_COMPLICATION, SELECTED_TABCATEGORY, SET_ADVANCE,SET_ACCESSORYTYPE,SET_SPAREPARTTYPE, SET_HIERARCHY,
    SET_GEMS_CERTIFICATE_DATE_FROM, SET_GEMS_CERTIFICATE_DATE_TO,SET_STONE_CERTIFICATE_DATE_FROM, SET_STONE_CERTIFICATE_DATE_TO, SET_PRODUCTION_DATE_FROM,
    SET_PRODUCTION_DATE_TO,SET_SUBMITACTION, SET_SAVESEARCHHIERARCHY, SET_VIEWASSET, SET_ITEMSORDER,SET_SETREFERENCEORDER, SET_ARTICLE, SET_SALESCHANNEL,
    SET_SALESHIERARCHY, SET_SALESADVANCE, SELECTED_TABSALESCATEGORY, SET_SAVESEARCHSALESHIERARCHY, SET_GEMS_STONE_TYPE
} from '../../constants/inventoryConstants';

const INITIAL_STATE = { datas:null, item: null, options:[], errors: null, currentPage:1, totalpage:null, totalpublicprice:null, totalupdatedcost:null,
    allItems:null, WarehouseValue:[], LocationValue:[], StoneTypeValue:[], CutValue:[], CutGradeValue:[], ColorValue:[], ColorGradeValue:[], ClarityValue:[],
    CertificateLabValue:[], PolishValue:[], SymmetryValue:[], TreatmentValue:[], FluorescenceValue:[], OriginValue:[], JewelryCategoryValue:[],
    CollectionValue:[], BrandValue:[], MustHaveValue:[], RingSizeValue:[], DominantStoneValue:[], MetalTypeValue:[], MetalColourValue:[], CutValue:[],
    CertificateAgencyValue:[], ComplicationValue:[], StrapColorValue:[], StrapTypeValue:[], BuckleTypeValue:[], DialMetalValue:[], DialColorValue:[],
    DialIndexValue:[], MovementValue:[], LimitedEditionValue:[], WatchCategoryValue:[], activeTabCategory:1, allItems:[], filters:[], AccessoryTypeValue:[],
    SparePartTypeValue:[], paramsSearch:null, IsAdvance:false, HierarchyValue:null, SearchAction:'New', exportItems:[], maxPrice:null, minPrice:null,
    avrgPrice:null, GemCertificateDateFrom:null, GemCertificateDateTo:null, StoneCertificateDateFrom:null, StoneCertificateDateTo:null, ProductionDateFrom:null,
    ProductionDateTo:null, PageSize:16, SortingBy:'itemCreatedDate', SortDirection:'desc', ShowGridView: true, ShowListView: false, SubmitAction: null,
    saveSearchStatus: false, msg: '',saveSearchStatusCode: 100, isSAveSearch: false, listSaveSearch: null, criteriaSaveSearch:null, saveSearchHierarchy: null,
    idDeleteSaveSearch: null, idEditSaveSearch: null, nameEditSaveSearch: null, viewAsSet: false, itemsOrder:null,setReferenceOrder:null,tempPDF:null,
    ArticleValue:[],
    SalesChannelValue:[], SalesHierarchyValue:null,SalesIsAdvance:false, activeTabSalesCategory:1, idEditSalesSaveSearch: null,
    nameEditSalesSaveSearch: null, criteriaSalesSaveSearch: null, paramsSalesSearch:null, saveSalesSearchStatus: false, msgSales: '',
    saveSalesSearchStatusCode: 100, idDeleteSalesSaveSearch: null, saveSearchSalesHierarchy: null, SalesSortingBy:'postedDate', SalesSortDirection:'desc',
    currentSalesPage: 1, SalesPageSize: 16, itemsSalesOrder:null, setReferenceSalesOrder:null, SalesShowGridView: true, SalesShowListView: false,
    totalnetamount: null,totaldiscount: null,totalmargin:null, GemStoneTypeValue:[]
};

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case SET_GEMS_STONE_TYPE:
            return {...state, GemStoneTypeValue: action.gemstoneStoneType};
            break;
        case FETCH_SALESALLPDF:
            return {...state,  tempPDF: action.temp};
            break;
        case FETCH_EXPORTSALESITEMS:
            return {...state, currentSalesPage: action.currSalesPage };
            break;
        case SET_SETREFERENCESALESORDER:
            return {...state,  setReferenceSalesOrder: action.setReferenceSalesOrder};
            break;
        case SET_ITEMSSALESORDER:
            return {...state,  itemsSalesOrder: action.itemsSalesOrder};
            break;
        case NEWSALESSEARCH:
            return {...state, filters:[], paramsSalesSearch:null,WarehouseValue:[], LocationValue:[], StoneTypeValue:[], CutValue:[], CutGradeValue:[],
                ColorValue:[],ColorGradeValue:[], ClarityValue:[], CertificateLabValue:[], PolishValue:[], SymmetryValue:[], TreatmentValue:[], RingSizeValue:[],
                FluorescenceValue:[],OriginValue:[], JewelryCategoryValue:[], CollectionValue:[], BrandValue:[], MustHaveValue:[], DominantStoneValue:[],
                MetalTypeValue:[], MetalColourValue:[], CutValue:[], CertificateAgencyValue:[], ComplicationValue:[], StrapColorValue:[], StrapTypeValue:[],
                BuckleTypeValue:[], DialMetalValue:[], DialColorValue:[],DialIndexValue:[], MovementValue:[], LimitedEditionValue:[], WatchCategoryValue:[],
                currentSalesPage:1,datas:null,allItems:[], totalpage:null, totalpublicprice:null, totalupdatedcost:null, AccessoryTypeValue:[], SparePartTypeValue:[],
                SearchAction:'New', exportItems:[], maxPrice:null, minPrice:null, avrgPrice:null, GemCertificateDateFrom:null, GemCertificateDateTo:null,
                StoneCertificateDateFrom:null, StoneCertificateDateTo:null, ProductionDateFrom:null, ProductionDateTo:null, SalesPageSize:16, viewAsSet: false,
                SalesShowGridView: true, SalesShowListView: false, ListCatalogName: [], ArticleValue:[], SalesChannelValue:[], totalnetamount: null,
                totaldiscount: null,totalmargin:null
            }
            break;
        case SET_SALESSHOWLISTVIEW :
            return {...state, SalesShowListView: action.salesShowListView };
            break;
        case SET_SALESSHOWGRIDVIEW :
            return {...state, SalesShowGridView: action.salesShowGridView };
            break;
        case SET_SALESPAGESIZE :
            return {...state, SalesPageSize: action.salesPageSize };
            break;
        case SET_SALESSORTDIRECTION :
            return {...state, SalesSortDirection: action.salesSortDirection };
            break;
        case SET_SALESSORTBY :
            return {...state, SalesSortingBy: action.salesSortingBy };
            break;
        case FETCH_ALLSALESITEMS:
            return {...state, datas: action.data.data, totalpage:Math.ceil(action.data.summary.count/action.data.pageSize),
                totalpublicprice: action.data.summary.price, totalupdatedcost: action.data.summary.cost, currentPage: action.currentSalesPage,
                allItems: action.data.allData, exportItems: action.data.exportData, maxPrice: action.data.summary.maxPrice,
                minPrice: action.data.summary.minPrice, avrgPrice: action.data.summary.avrgPrice, totalnetamount: action.data.summary.netAmount,
                totaldiscount: action.data.summary.disconst,totalmargin: action.data.summary.margin
            };
            break;
        case SET_CLOSEALERTMSGSALES :
            return {...state,  saveSalesSearchStatusCode: action.closeAlertMsgSales, saveSalesSearchStatus: false, msgSales: ''}
            break;
        case POST_SALESSAVESEARCH :
            return {...state,  saveSalesSearchStatus: (action.data.statusCode >= 400) ? false : true, saveSalesSearchStatusCode : action.data.statusCode,
                msgSales: action.data.message, idEditSalesSaveSearch: action.data.id, criteriaSalesSaveSearch: action.data.criteria
            };
            break;
        case SET_SAVESEARCHSALESHIERARCHY:
            return {...state, saveSearchSalesHierarchy: action.savesearchsaleshierarchy, SearchAction:'New' };
            break;
        case GET_SALESSAVECRITERIA :
            return {...state,  criteriaSalesSaveSearch: action.data };
            break;
        case DELETE_SALESSAVESEARCH :
            return {...state, saveSalesSearchStatus: (action.data.statusCode >= 400) ? false : true, saveSalesSearchStatusCode : action.data.statusCode,
                msgSales: action.data.message
            };
            break;
        case SET_IDDELETESALESSAVESEARCH :
            return {...state,  idDeleteSalesSaveSearch: action.id};
            break;
        case SET_SALESSHAREDSAVESEARCH :
            return {...state,  saveSalesSearchStatus: (action.data.statusCode >= 400) ? false : true, saveSalesSearchStatusCode : action.data.statusCode,
                msgSales: action.data.message
            };
            break;
        case SET_SALESPARAMS:
            return { ...state, paramsSalesSearch:action.params }
            break;
        case MODIFY_SALESSEARCH:
            return {...state, paramsSalesSearch:action.params, datas:null,allItems:[], totalpage:null, totalpublicprice:null, totalupdatedcost:null,
                SearchAction:'Modify',exportItems:[], maxPrice:null, minPrice:null,avrgPrice:null,listFileName:null, totalnetamount:null,totaldiscount:null,
                totalmargin:null
            }
            break;
        case SET_IDEDITSALESSAVESEARCH :
            return {...state,  idEditSalesSaveSearch: action.params.id, nameEditSalesSaveSearch: action.params.name};
            break;
        case SELECTED_TABSALESCATEGORY :
            return {...state, activeTabSalesCategory: action.tab };
            break;
        case SET_SALESADVANCE :
            return {...state, SalesIsAdvance: action.salesIsAdvance };
            break;
        case SET_SALESHIERARCHY :
            return {...state, SalesHierarchyValue: action.salesHierarchy };
            break;
        case SET_SALESCHANNEL:
            return {...state, SalesChannelValue: action.salesChannel};
            break;
        case SET_ARTICLE:
            return {...state, ArticleValue: action.article};
            break;
        case FETCH_ALLPDF:
            return {...state,  tempPDF: action.temp};
            break;
        case SET_SETREFERENCEORDER:
            return {...state,  setReferenceOrder: action.setReferenceOrder};
            break;
        case SET_ITEMSORDER:
            return {...state,  itemsOrder: action.itemsOrder};
            break;
        case SET_VIEWASSET:
            return {...state,  viewAsSet: action.viewAsSet};
            break;
        case SET_IDEDITSAVESEARCH :
            return {...state,  idEditSaveSearch: action.params.id, nameEditSaveSearch: action.params.name};
            break;
        case SET_IDDELETESAVESEARCH :
            return {...state,  idDeleteSaveSearch: action.id};
            break;
        case DELETE_SAVESEARCH :
            return {...state, saveSearchStatus: (action.data.statusCode >= 400) ? false : true, saveSearchStatusCode : action.data.statusCode,
                msg: action.data.message
            };
            break;
        case GET_SAVECRITERIA :
            return {...state,  criteriaSaveSearch: action.data };
            break;
        case SET_SHAREDSAVESEARCH :
            return {...state,  saveSearchStatus: (action.data.statusCode >= 400) ? false : true, saveSearchStatusCode : action.data.statusCode,
                msg: action.data.message
            };
            break;
        case GET_LISTSAVESEARCH :
            return {...state,  listSaveSearch: action.data}
            break;
        case SET_CLOSEALERTMSG :
            return {...state,  saveSearchStatusCode: action.closeAlertMsg, saveSearchStatus: false, msg: ''}
            break;
        case POST_SAVESEARCH :
            return {...state,  saveSearchStatus: (action.data.statusCode >= 400) ? false : true, saveSearchStatusCode : action.data.statusCode,
                msg: action.data.message, idEditSaveSearch: action.data.id, criteriaSaveSearch: action.data.criteria
            };
            break;
        case SET_SUBMITACTION:
            return {...state, SubmitAction: action.submitActionValue };
            break;
        case RESET_FORM:
            return {...state,WarehouseValue:[], LocationValue:[], StoneTypeValue:[], CutValue:[], CutGradeValue:[], ColorValue:[], ColorGradeValue:[],
                ClarityValue:[], CertificateLabValue:[], PolishValue:[], SymmetryValue:[], TreatmentValue:[], FluorescenceValue:[], OriginValue:[],
                JewelryCategoryValue:[], CollectionValue:[], BrandValue:[], MustHaveValue:[], RingSizeValue:[], DominantStoneValue:[], MetalTypeValue:[],
                MetalColourValue:[], CutValue:[], CertificateAgencyValue:[], ComplicationValue:[], StrapColorValue:[], StrapTypeValue:[], BuckleTypeValue:[],
                DialMetalValue:[], DialColorValue:[],DialIndexValue:[], MovementValue:[], LimitedEditionValue:[], WatchCategoryValue:[], filters:[],
                AccessoryTypeValue:[], paramsSearch:null, SparePartTypeValue:[], SearchAction:'New', GemCertificateDateFrom:null, GemCertificateDateTo:null,
                StoneCertificateDateFrom:null, StoneCertificateDateTo:null, ProductionDateFrom:null, ProductionDateTo:null, ListCatalogName: [], msg: '',
                SubmitAction: null, saveSearchStatus: false, saveSearchStatusCode: 100, isSAveSearch: false, listSaveSearch: null, criteriaSaveSearch:null,
                saveSearchHierarchy: null, idDeleteSaveSearch: null, idEditSaveSearch: null, nameEditSaveSearch: null,viewAsSet: false, ArticleValue:[],
                SalesChannelValue:[], idEditSalesSaveSearch: null, nameEditSalesSaveSearch: null, criteriaSalesSaveSearch: null, paramsSalesSearch:null,
                saveSalesSearchStatus: false, msgSales: '', saveSalesSearchStatusCode: 100, idDeleteSalesSaveSearch: null, SaveSearchSalesHierarchy: null,
                GemStoneTypeValue:[]
            };
            break;
        case SET_SHOWGRIDVIEW :
            return {...state, ShowGridView: action.showGridView };
            break;
        case SET_SHOWLISTVIEW :
            return {...state, ShowListView: action.showListView };
            break;
        case SET_CURRENTPAGE :
            return {...state, currentPage: action.currentPage };
            break;
        case SET_SORTBY :
            return {...state, SortingBy: action.sortingBy };
            break;
        case SET_SORTDIRECTION :
            return {...state, SortDirection: action.sortDirection };
            break;
        case SET_PAGESIZE :
            return {...state, PageSize: action.pageSize };
            break;
        case SET_PRODUCTION_DATE_FROM :
            return {...state, ProductionDateFrom: action.productionDateFrom };
            break;
        case SET_PRODUCTION_DATE_TO :
            return {...state, ProductionDateTo: action.productionDateTo };
            break;
        case SET_STONE_CERTIFICATE_DATE_FROM :
            return {...state, StoneCertificateDateFrom: action.stoneCertificateDateFrom };
            break;
        case SET_STONE_CERTIFICATE_DATE_TO :
            return {...state, StoneCertificateDateTo: action.stoneCertificateDateTo };
            break;
        case SET_GEMS_CERTIFICATE_DATE_FROM :
            return {...state, GemCertificateDateFrom: action.certificateDateFrom };
            break;
        case SET_GEMS_CERTIFICATE_DATE_TO :
            return {...state, GemCertificateDateTo: action.certificateDateTo };
            break;
        case SET_ACCESSORYTYPE :
            return {...state, AccessoryTypeValue: action.accessoryType };
            break;
        case SET_HIERARCHY :
            return {...state, HierarchyValue: action.hierarchy };
            break;
        case SET_SAVESEARCHHIERARCHY:
            return {...state, saveSearchHierarchy: action.savesearchhierarchy, SearchAction:'New' };
            break;
        case SET_SPAREPARTTYPE :
            return {...state, SparePartTypeValue: action.sparePartType };
            break;
        case SET_ADVANCE :
            return {...state, IsAdvance: action.isAdvance };
            break;
        case SELECTED_TABCATEGORY :
            return {...state, activeTabCategory: action.tab };
            break;
        case SET_WATCHCATEORY :
            return {...state, WatchCategoryValue: action.watchCategory };
            break;
        case SET_LIMITEDEDITION :
            return {...state, LimitedEditionValue: action.limitedEdition };
            break;
        case SET_MOVEMENT :
            return {...state, MovementValue: action.movement };
            break;
        case SET_DIALINDEX :
            return {...state, DialIndexValue: action.dialIndex };
            break;
        case SET_DIALCOLOR :
            return {...state, DialColorValue: action.dialColor };
            break;
        case SET_DIALMETAL :
            return {...state, DialMetalValue: action.dialMetal };
            break;
        case SET_BUCKLETYPE :
            return {...state, BuckleTypeValue: action.buckleType };
            break;
        case SET_STRAPTYPE :
            return {...state, StrapTypeValue: action.strapType };
            break;
        case SET_STRAPCOLOR :
            return {...state, StrapColorValue: action.strapColor };
            break;
        case SET_COMPLICATION :
            return {...state, ComplicationValue: action.complication };
            break;
        case SET_CUT:
            return {...state, CutValue: action.cut };
            break;
        case SET_CERTIFICATEAGENCY:
            return {...state, CertificateAgencyValue: action.certificateAgency };
            break;
        case SET_BRAND:
            return {...state, BrandValue: action.brand };
            break;
        case SET_MUSTHAVE:
            return {...state, MustHaveValue: action.musthave };
            break;
        case SET_RINGSIZE:
            return {...state, RingSizeValue: action.ringSize };
            break;
        case SET_DOMINANTSTONE:
            return {...state, DominantStoneValue: action.dominantStone };
            break;
        case SET_METALTYPE:
            return {...state, MetalTypeValue: action.metalType };
            break;
        case SET_METALCOLOUR:
            return {...state, MetalColourValue: action.metalColour };
            break;
        case SET_COLLECTION:
            return {...state, CollectionValue: action.collection };
            break;
        case SET_JEWELRYCATEGORY:
            return {...state, JewelryCategoryValue: action.jewelryCategory };
            break;
        case SET_ORIGIN:
            return {...state, OriginValue: action.origin };
            break;
        case SET_FLUORESCENCE:
            return {...state, FluorescenceValue: action.fluorescence };
            break;
        case SET_TREATMENT:
            return {...state, TreatmentValue: action.treatment };
            break;
        case SET_SYMMETRY:
            return {...state, SymmetryValue: action.symmetry };
            break;
        case SET_POLISH:
            return {...state, PolishValue: action.polish };
            break;
        case SET_CERTIFICATELAB:
            return {...state, CertificateLabValue: action.certificateLab};
            break;
        case SET_CLARITY:
            return {...state, ClarityValue: action.clarity};
            break;
        case SET_COLORGRADE:
            return {...state, ColorGradeValue: action.colorGrade};
            break;
        case SET_COLOR:
            return {...state, ColorValue: action.color};
            break;
        case SET_CUTGRADE:
            return {...state, CutGradeValue: action.cutGrade};
            break;
        case SET_CUT:
            return {...state, CutValue: action.cut};
            break;
        case SET_LOCATION:
            return {...state, LocationValue: action.location};
            break;
        case SET_WAREHOUSE:
            return {...state, WarehouseValue: action.warehouse};
            break;
        case SET_STONETYPE:
            return {...state, StoneTypeValue: action.stoneType};
            break;
        case NEWSEARCH:
            return {...state, filters:[], paramsSearch:null,WarehouseValue:[], LocationValue:[], StoneTypeValue:[], CutValue:[], CutGradeValue:[], ColorValue:[],
                ColorGradeValue:[], ClarityValue:[], CertificateLabValue:[], PolishValue:[], SymmetryValue:[], TreatmentValue:[], FluorescenceValue:[],
                OriginValue:[], JewelryCategoryValue:[], CollectionValue:[], BrandValue:[], MustHaveValue:[], RingSizeValue:[], DominantStoneValue:[],
                MetalTypeValue:[], MetalColourValue:[], CutValue:[], CertificateAgencyValue:[], ComplicationValue:[], StrapColorValue:[], StrapTypeValue:[],
                BuckleTypeValue:[], DialMetalValue:[], DialColorValue:[],DialIndexValue:[], MovementValue:[], LimitedEditionValue:[], WatchCategoryValue:[],
                currentPage:1,datas:null,allItems:[], totalpage:null, totalpublicprice:null, totalupdatedcost:null, AccessoryTypeValue:[], SparePartTypeValue:[],
                SearchAction:'New', exportItems:[], maxPrice:null, minPrice:null, avrgPrice:null, GemCertificateDateFrom:null, GemCertificateDateTo:null,
                StoneCertificateDateFrom:null, StoneCertificateDateTo:null, ProductionDateFrom:null, ProductionDateTo:null, PageSize:16, ShowGridView: true,
                showListView: false, ListCatalogName: [], viewAsSet: false, ArticleValue:[], paramsSalesSearch:null, SalesChannelValue:[], currentSalesPage: 1,
                GemStoneTypeValue:[]
            }
            break;
        case SET_PARAMS:
            return { ...state, paramsSearch:action.params }
            break;
        case MODIFY_SEARCH:
            return {...state, paramsSearch:action.params, datas:null,allItems:[], totalpage:null,
                totalpublicprice:null, totalupdatedcost:null,SearchAction:'Modify',exportItems:[], maxPrice:null,
                minPrice:null,avrgPrice:null,listFileName:null
            }
            break;
        case FETCH_ALLITEMS:
            return {...state, datas: action.data.data, totalpage:Math.ceil(action.data.summary.count/action.data.pageSize),
                totalpublicprice: action.data.summary.price, totalupdatedcost: action.data.summary.cost, currentPage: action.currPage,
                allItems: action.data.allData, exportItems: action.data.exportData, maxPrice: action.data.summary.maxPrice,
                minPrice: action.data.summary.minPrice, avrgPrice: action.data.summary.avrgPrice, listFileName: action.data.listFileName
            };
            break;
        case FETCH_EXPORTITEMS:
            return {...state, currentPage: action.currPage };
            break;
        case FETCH_SORTING:
            switch(action.sortDirections){
                case 'desc':
                    // sort by date descending
                    action.data.datas = _.sortBy(action.data.datas, action.sortBy, action.sortDirections).reverse()
                    return {...state, datas: action.data.datas, totalpage:state.totalpage,
                          totalpublicprice: state.totalpublicprice, totalupdatedcost: state.totalupdatedcost
                    };
                case 'asc':
                    // sort by name ascending
                    action.data.datas = _.sortBy(action.data.datas, action.sortBy, action.sortDirections)
                    return { ...state, datas: action.data.datas, totalpage:state.totalpage,
                        totalpublicprice: state.totalpublicprice, totalupdatedcost: state.totalupdatedcost
                    };
                default:
                    action.data.datas;
                    return { ...state, datas: action.data.datas, totalpage:state.totalpage,
                         totalpublicprice: state.totalpublicprice, totalupdatedcost: state.totalupdatedcost
                    };
            }
      default:
            return {...state};
    }
}
