import { FETCH_ALLITEMS, FETCH_ITEM, FETCH_SORTING, NEWSEARCH, MODIFY_SEARCH, SET_PARAMS, SET_CURRENTPAGE,
          SET_PAGESIZE, SET_SORTBY, SET_SORTDIRECTION, SET_SHOWGRIDVIEW, SET_SHOWLISTVIEW, WRITE_HTML,
          POST_SAVESEARCH, SET_ISSAVESEARCH, SET_CLOSEALERTMSG, GET_LISTSAVESEARCH, SET_SHAREDSAVESEARCH,
          GET_SAVECRITERIA, DELETE_SAVESEARCH, SET_IDDELETESAVESEARCH, SET_IDEDITSAVESEARCH
        } from '../../constants/itemconstants';
import { RESET_FORM, SET_LOCATION, SET_WAREHOUSE, SET_STONETYPE, SET_CUT, SET_CUTGRADE, SET_COLOR, SET_COLORGRADE, SET_CLARITY,
          SET_CERTIFICATELAB, SET_POLISH, SET_SYMMETRY, SET_TREATMENT, SET_FLUORESCENCE, SET_ORIGIN, SET_JEWELRYCATEGORY, SET_COLLECTION,
          SET_BRAND, SET_MUSTHAVE, SET_RINGSIZE, SET_DOMINANTSTONE, SET_METALTYPE, SET_METALCOLOUR, SET_CERTIFICATEAGENCY,
          SET_WATCHCATEORY, SET_LIMITEDEDITION, SET_MOVEMENT, SET_DIALINDEX, SET_DIALCOLOR, SET_DIALMETAL, SET_BUCKLETYPE, SET_STRAPTYPE,
          SET_STRAPCOLOR, SET_COMPLICATION, SELECTED_TABCATEGORY, SET_ADVANCE,SET_ACCESSORYTYPE,SET_SPAREPARTTYPE,
          SET_HIERARCHY,SET_GEMS_CERTIFICATE_DATE_FROM,SET_GEMS_CERTIFICATE_DATE_TO,SET_STONE_CERTIFICATE_DATE_FROM,
          SET_STONE_CERTIFICATE_DATE_TO,SET_PRODUCTION_DATE_FROM,SET_PRODUCTION_DATE_TO,SET_SUBMITACTION, SET_SAVESEARCHHIERARCHY,
          SET_VIEWASSET
        } from '../../constants/inventoryConstants';

const INITIAL_STATE = { datas:null, item: null, options:[], errors: null, currentPage:1, totalpage:null, totalpublicprice:null,
                        totalupdatedcost:null, allItems:null, WarehouseValue:[], LocationValue:[], StoneTypeValue:[],
                        CutValue:[], CutGradeValue:[], ColorValue:[], ColorGradeValue:[], ClarityValue:[], CertificateLabValue:[],
                        PolishValue:[], SymmetryValue:[], TreatmentValue:[], FluorescenceValue:[], OriginValue:[], JewelryCategoryValue:[],
                        CollectionValue:[], BrandValue:[], MustHaveValue:[], RingSizeValue:[], DominantStoneValue:[], MetalTypeValue:[],
                        MetalColourValue:[], CutValue:[], CertificateAgencyValue:[], ComplicationValue:[], StrapColorValue:[],
                        StrapTypeValue:[], BuckleTypeValue:[], DialMetalValue:[], DialColorValue:[], DialIndexValue:[],
                        MovementValue:[], LimitedEditionValue:[], WatchCategoryValue:[], activeTabCategory:1, allItems:[],
                        filters:[], AccessoryTypeValue:[], SparePartTypeValue:[], paramsSearch:null, IsAdvance:false,
                        HierarchyValue:null, SearchAction:'New', exportItems:[], maxPrice:null, minPrice:null, avrgPrice:null,
                        GemCertificateDateFrom:null, GemCertificateDateTo:null, StoneCertificateDateFrom:null,
                        StoneCertificateDateTo:null, ProductionDateFrom:null, ProductionDateTo:null, PageSize:16,
                        SortingBy:'itemCreatedDate', SortDirection:'desc', ShowGridView: true, ShowListView: false,
                        SubmitAction: null, saveSearchStatus: false, msg: '',saveSearchStatusCode: 100,
                        isSAveSearch: false, listSaveSearch: null, criteriaSaveSearch:null, saveSearchHierarchy: null,
                        idDeleteSaveSearch: null, idEditSaveSearch: null, nameEditSaveSearch: null, viewAsSet: false
                      };

  export default function(state = INITIAL_STATE, action){
    // console.log('action-->',action);
    switch(action.type){
        case SET_VIEWASSET:
            return {...state,  viewAsSet: action.viewAsSet};
            break;
        case SET_IDEDITSAVESEARCH :
            // console.log('action SET_IDEDITSAVESEARCH -->',action);
            return {...state,  idEditSaveSearch: action.params.id, nameEditSaveSearch: action.params.name};
        case SET_IDDELETESAVESEARCH :
            return {...state,  idDeleteSaveSearch: action.id};
        case DELETE_SAVESEARCH :
            return {...state,  saveSearchStatus: (action.data.statusCode >= 400) ? false : true,
                saveSearchStatusCode : action.data.statusCode,
                msg: action.data.message};
        case GET_SAVECRITERIA :
            // console.log('action GET_SAVECRITERIA -->',action);
            return {...state,  criteriaSaveSearch: action.data };
        case SET_SHAREDSAVESEARCH :
            return {...state,  saveSearchStatus: (action.data.statusCode >= 400) ? false : true,
                saveSearchStatusCode : action.data.statusCode,
                msg: action.data.message};
        case GET_LISTSAVESEARCH :
            // console.log('action GET_LISTSAVESEARCH -->',action);
            return {...state,  listSaveSearch: action.data}
        case SET_CLOSEALERTMSG :
            return {...state,  saveSearchStatusCode: action.closeAlertMsg, saveSearchStatus: false, msg: ''}
        case POST_SAVESEARCH :
        //   console.log('action POST_SAVESEARCH -->',action);
          return {...state,  saveSearchStatus: (action.data.statusCode >= 400) ? false : true,
              saveSearchStatusCode : action.data.statusCode,
              msg: action.data.message};
        case SET_SUBMITACTION:
            return {...state, SubmitAction: action.submitActionValue };
      case RESET_FORM:
        // console.log('RESET_FORM state-->');
        return { ...state,WarehouseValue:[], LocationValue:[], StoneTypeValue:[], CutValue:[], CutGradeValue:[],
                ColorValue:[], ColorGradeValue:[], ClarityValue:[], CertificateLabValue:[], PolishValue:[], SymmetryValue:[],
                TreatmentValue:[], FluorescenceValue:[], OriginValue:[], JewelryCategoryValue:[], CollectionValue:[],
                BrandValue:[], MustHaveValue:[], RingSizeValue:[], DominantStoneValue:[], MetalTypeValue:[], MetalColourValue:[],
                CutValue:[], CertificateAgencyValue:[], ComplicationValue:[], StrapColorValue:[], StrapTypeValue:[],
                BuckleTypeValue:[], DialMetalValue:[], DialColorValue:[],DialIndexValue:[], MovementValue:[],
                LimitedEditionValue:[], WatchCategoryValue:[], filters:[], AccessoryTypeValue:[], paramsSearch:null,
                SparePartTypeValue:[], SearchAction:'New', GemCertificateDateFrom:null, GemCertificateDateTo:null,
                StoneCertificateDateFrom:null, StoneCertificateDateTo:null, ProductionDateFrom:null, ProductionDateTo:null,
                ListCatalogName: [],SubmitAction: null, saveSearchStatus: false, msg: '',saveSearchStatusCode: 100,
                isSAveSearch: false, listSaveSearch: null, criteriaSaveSearch:null, saveSearchHierarchy: null,
                idDeleteSaveSearch: null, idEditSaveSearch: null, nameEditSaveSearch: null
              };
    //   case WRITE_HTML :
    //     // console.log('SET_POLISH -->',action);
    //     return {...state, ShowGridView: action.showGridView };
      case SET_SHOWGRIDVIEW :
        // console.log('SET_POLISH -->',action);
        return {...state, ShowGridView: action.showGridView };

      case SET_SHOWLISTVIEW :
        // console.log('SET_POLISH -->',action);
        return {...state, ShowListView: action.showListView };
      case SET_CURRENTPAGE :
        // console.log('SET_POLISH -->',action);
        return {...state, currentPage: action.currentPage };
      case SET_SORTBY :
        // console.log('SET_SORTBY -->',action.sortingBy);
        return {...state, SortingBy: action.sortingBy };
      case SET_SORTDIRECTION :
        // console.log('SET_PAGESIZE -->',action.pageSize);
        return {...state, SortDirection: action.sortDirection };
      case SET_PAGESIZE :
        // console.log('SET_PAGESIZE -->',action.pageSize);
        return {...state, PageSize: action.pageSize };
      case SET_PRODUCTION_DATE_FROM :
        // console.log('SET_POLISH -->',action);
        return {...state, ProductionDateFrom: action.productionDateFrom };
      case SET_PRODUCTION_DATE_TO :
        // console.log('SET_POLISH -->',action);
        return {...state, ProductionDateTo: action.productionDateTo };
      case SET_STONE_CERTIFICATE_DATE_FROM :
        // console.log('SET_POLISH -->',action);
        return {...state, StoneCertificateDateFrom: action.stoneCertificateDateFrom };
      case SET_STONE_CERTIFICATE_DATE_TO :
        // console.log('SET_POLISH -->',action);
        return {...state, StoneCertificateDateTo: action.stoneCertificateDateTo };
      case SET_GEMS_CERTIFICATE_DATE_FROM :
        // console.log('SET_POLISH -->',action);
        return {...state, GemCertificateDateFrom: action.certificateDateFrom };
      case SET_GEMS_CERTIFICATE_DATE_TO :
        // console.log('SET_POLISH -->',action);
        return {...state, GemCertificateDateTo: action.certificateDateTo };
      case SET_ACCESSORYTYPE :
        // console.log('SET_POLISH -->',action);
        return {...state, AccessoryTypeValue: action.accessoryType };
      case SET_HIERARCHY :
        // console.log('SET_HIERARCHY -->',action);
        return {...state, HierarchyValue: action.hierarchy };
      case SET_SAVESEARCHHIERARCHY:
        // console.log('SET_SAVESEARCHHIERARCHY -->',action);
        return {...state, saveSearchHierarchy: action.savesearchhierarchy, SearchAction:'New' };
      case SET_SPAREPARTTYPE :
        // console.log('SET_POLISH -->',action);
        return {...state, SparePartTypeValue: action.sparePartType };
      case SET_ADVANCE :
        // console.log('SET_POLISH -->',action);
        return {...state, IsAdvance: action.isAdvance };
      case SELECTED_TABCATEGORY :
        // console.log('SET_POLISH -->',action);
        return {...state, activeTabCategory: action.tab };
      case SET_WATCHCATEORY :
        // console.log('SET_POLISH -->',action);
        return {...state, WatchCategoryValue: action.watchCategory };
      case SET_LIMITEDEDITION :
        // console.log('SET_POLISH -->',action);
        return {...state, LimitedEditionValue: action.limitedEdition };
      case SET_MOVEMENT :
        // console.log('SET_POLISH -->',action);
        return {...state, MovementValue: action.movement };
      case SET_DIALINDEX :
        // console.log('SET_POLISH -->',action);
        return {...state, DialIndexValue: action.dialIndex };
      case SET_DIALCOLOR :
        // console.log('SET_POLISH -->',action);
        return {...state, DialColorValue: action.dialColor };
      case SET_DIALMETAL :
        // console.log('SET_POLISH -->',action);
        return {...state, DialMetalValue: action.dialMetal };
      case SET_BUCKLETYPE :
        // console.log('SET_POLISH -->',action);
        return {...state, BuckleTypeValue: action.buckleType };
      case SET_STRAPTYPE :
        // console.log('SET_POLISH -->',action);
        return {...state, StrapTypeValue: action.strapType };
      case SET_STRAPCOLOR :
        // console.log('SET_POLISH -->',action);
        return {...state, StrapColorValue: action.strapColor };
      case SET_COMPLICATION :
        // console.log('SET_POLISH -->',action);
        return {...state, ComplicationValue: action.complication };
      case SET_CUT:
        // console.log('SET_POLISH -->',action);
        return {...state, CutValue: action.cut };
      case SET_CERTIFICATEAGENCY:
        // console.log('SET_POLISH -->',action);
        return {...state, CertificateAgencyValue: action.certificateAgency };
      case SET_BRAND:
        // console.log('SET_POLISH -->',action);
        return {...state, BrandValue: action.brand };
      case SET_MUSTHAVE:
        // console.log('SET_POLISH -->',action);
        return {...state, MustHaveValue: action.musthave };
      case SET_RINGSIZE:
        // console.log('SET_POLISH -->',action);
        return {...state, RingSizeValue: action.ringSize };
      case SET_DOMINANTSTONE:
        // console.log('SET_POLISH -->',action);
        return {...state, DominantStoneValue: action.dominantStone };
      case SET_METALTYPE:
        // console.log('SET_POLISH -->',action);
        return {...state, MetalTypeValue: action.metalType };
      case SET_METALCOLOUR:
        // console.log('SET_POLISH -->',action);
        return {...state, MetalColourValue: action.metalColour };
      case SET_COLLECTION:
        // console.log('SET_POLISH -->',action);
        return {...state, CollectionValue: action.collection };
      case SET_JEWELRYCATEGORY:
        // console.log('SET_POLISH -->',action);
        return {...state, JewelryCategoryValue: action.jewelryCategory };
      case SET_ORIGIN:
        // console.log('SET_ORIGIN -->',action.origin);
        return {...state, OriginValue: action.origin };
      case SET_FLUORESCENCE:
        // console.log('SET_POLISH -->',action);
        return {...state, FluorescenceValue: action.fluorescence };
      case SET_TREATMENT:
        // console.log('SET_POLISH -->',action);
        return {...state, TreatmentValue: action.treatment };
      case SET_SYMMETRY:
        // console.log('SET_POLISH -->',action);
        return {...state, SymmetryValue: action.symmetry };
      case SET_POLISH:
        // console.log('SET_POLISH -->',action);
        return {...state, PolishValue: action.polish };
      case SET_CERTIFICATELAB:
        // console.log('SET_LOCATION -->',action);
        return {...state, CertificateLabValue: action.certificateLab};
      case SET_CLARITY:
        // console.log('SET_LOCATION -->',action);
        return {...state, ClarityValue: action.clarity};
      case SET_COLORGRADE:
        // console.log('SET_LOCATION -->',action);
        return {...state, ColorGradeValue: action.colorGrade};
      case SET_COLOR:
        // console.log('SET_LOCATION -->',action);
        return {...state, ColorValue: action.color};
      case SET_CUTGRADE:
        // console.log('SET_LOCATION -->',action);
        return {...state, CutGradeValue: action.cutGrade};
      case SET_CUT:
        // console.log('SET_LOCATION -->',action);
        return {...state, CutValue: action.cut};
      case SET_LOCATION:
        // console.log('SET_LOCATION -->',action);
        return {...state, LocationValue: action.location};
      case SET_WAREHOUSE:
        // console.log('SET_WAREHOUSE -->',action.warehouse);
        return {...state, WarehouseValue: action.warehouse};
      case SET_STONETYPE:
        // console.log('SET_STONETYPE -->',action);
        return {...state, StoneTypeValue: action.stoneType};
      case NEWSEARCH:
        return { ...state, filters:[], paramsSearch:null,WarehouseValue:[], LocationValue:[], StoneTypeValue:[], CutValue:[], CutGradeValue:[],
                ColorValue:[], ColorGradeValue:[], ClarityValue:[], CertificateLabValue:[], PolishValue:[], SymmetryValue:[],
                TreatmentValue:[], FluorescenceValue:[], OriginValue:[], JewelryCategoryValue:[], CollectionValue:[],
                BrandValue:[], MustHaveValue:[], RingSizeValue:[], DominantStoneValue:[], MetalTypeValue:[], MetalColourValue:[],
                CutValue:[], CertificateAgencyValue:[], ComplicationValue:[], StrapColorValue:[], StrapTypeValue:[],
                BuckleTypeValue:[], DialMetalValue:[], DialColorValue:[],DialIndexValue:[], MovementValue:[],
                LimitedEditionValue:[], WatchCategoryValue:[], currentPage:1,datas:null,allItems:[], totalpage:null,
                totalpublicprice:null, totalupdatedcost:null, AccessoryTypeValue:[], SparePartTypeValue:[], SearchAction:'New',
                exporttems:[], maxPrice:null, minPrice:null, avrgPrice:null, GemCertificateDateFrom:null,
                GemCertificateDateTo:null, StoneCertificateDateFrom:null, StoneCertificateDateTo:null, ProductionDateFrom:null,
                ProductionDateTo:null, PageSize:16, ShowGridView: true, showListView: false, ListCatalogName: []
              }
      case SET_PARAMS:
        // console.log('action.params-->',action.params);
        return { ...state, paramsSearch:action.params }
      case MODIFY_SEARCH:
        return { ...state, paramsSearch:action.params, datas:null,allItems:[], totalpage:null,
        totalpublicprice:null, totalupdatedcost:null,SearchAction:'Modify',exportItems:[],
        maxPrice:null,minPrice:null,avrgPrice:null,listFileName:null }
      case FETCH_ALLITEMS:
        // console.log('action-->',action.type);
        // console.log('action.data.summary-->',action.data.summary);
        return { ...state, datas: action.data.data, totalpage:Math.ceil(action.data.summary.count/action.data.pageSize),
                totalpublicprice: action.data.summary.price, totalupdatedcost: action.data.summary.cost,
                currentPage:action.currPage, allItems: action.data.allData, exportItems: action.data.exportData,
                maxPrice: action.data.summary.maxPrice,minPrice: action.data.summary.minPrice,
                avrgPrice: action.data.summary.avrgPrice,listFileName: action.data.listFileName};
      case FETCH_SORTING:
        // console.log('action-->',action);
        switch(action.sortDirections){
          case 'desc':
            // sort by date descending
            action.data.datas = _.sortBy(action.data.datas, action.sortBy, action.sortDirections).reverse()
            return { ...state, datas: action.data.datas, totalpage:state.totalpage,
                    totalpublicprice: state.totalpublicprice, totalupdatedcost: state.totalupdatedcost};
          case 'asc':
          // sort by name ascending
          action.data.datas = _.sortBy(action.data.datas, action.sortBy, action.sortDirections)
          return { ...state, datas: action.data.datas, totalpage:state.totalpage,
                  totalpublicprice: state.totalpublicprice, totalupdatedcost: state.totalupdatedcost};
          default:
           action.data.datas;
           return { ...state, datas: action.data.datas, totalpage:state.totalpage,
                   totalpublicprice: state.totalpublicprice, totalupdatedcost: state.totalupdatedcost};
        }
      default:
        return {...state};
    }
  }
