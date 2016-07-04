import { FETCH_ALLITEMS, FETCH_ITEM, FETCH_SORTING, NEWSEARCH, MODIFY_SEARCH, SET_PARAMS } from '../../constants/itemconstants';
import { RESET_FORM, SET_LOCATION, SET_WAREHOUSE, SET_STONETYPE, SET_CUT, SET_CUTGRADE, SET_COLOR, SET_COLORGRADE, SET_CLARITY,
          SET_CERTIFICATELAB, SET_POLISH, SET_SYMMETRY, SET_TREATMENT, SET_FLUORESCENCE, SET_ORIGIN, SET_JEWELRYCATEGORY, SET_COLLECTION,
          SET_BRAND, SET_MUSTHAVE, SET_RINGSIZE, SET_DOMINANTSTONE, SET_METALTYPE, SET_METALCOLOUR, SET_CERTIFICATEAGENCY,
          SET_WATCHCATEORY, SET_LIMITEDEDITION, SET_MOVEMENT, SET_DIALINDEX, SET_DIALCOLOR, SET_DIALMETAL, SET_BUCKLETYPE, SET_STRAPTYPE,
          SET_STRAPCOLOR, SET_COMPLICATION, SELECTED_TABCATEGORY, SET_ADVANCE,SET_ACCESSORYTYPE,SET_SPAREPARTTYPE,
          SET_HIERARCHY
        } from '../../constants/inventoryConstants';

const INITIAL_STATE = { datas:null, item: null, options:[], errors: null, currentPage:1, totalpage:null, totalpublicprice:null,
                        totalupdatedcost:null, allItems:null, WarehouseValue:[], LocationValue:[], StoneTypeValue:[],
                        CutValue:[], CutGradeValue:[], ColorValue:[], ColorGradeValue:[], ClarityValue:[], CertificateLabValue:[],
                        PolishValue:[], SymmetryValue:[], TreatmentValue:[], FluorescenceValue:[], OriginValue:[], JewelryCategoryValue:[],
                        CollectionValue:[], BrandValue:[], MustHaveValue:[], RingSizeValue:[], DominantStoneValue:[], MetalTypeValue:[],
                        MetalColourValue:[], CutValue:[], CertificateAgencyValue:[], ComplicationValue:[], StrapColorValue:[],
                        StrapTypeValue:[], BuckleTypeValue:[], DialMetalValue:[], DialColorValue:[], DialIndexValue:[],
                        MovementValue:[], LimitedEditionValue:[], WatchCategoryValue:[], activeTabCategory:1,allItems:[],
                        filters:[], AccessoryTypeValue:[],SparePartTypeValue:[], paramsSearch:null,IsAdvance:false,
                        HierarchyValue:null,SearchAction:'New'
                      };

  export default function(state = INITIAL_STATE, action){
    // console.log('action-->',action);
    switch(action.type){
      case RESET_FORM:
        // console.log('RESET_FORM state-->');
        return { ...state,WarehouseValue:[], LocationValue:[], StoneTypeValue:[], CutValue:[], CutGradeValue:[],
                ColorValue:[], ColorGradeValue:[], ClarityValue:[], CertificateLabValue:[], PolishValue:[], SymmetryValue:[],
                TreatmentValue:[], FluorescenceValue:[], OriginValue:[], JewelryCategoryValue:[], CollectionValue:[],
                BrandValue:[], MustHaveValue:[], RingSizeValue:[], DominantStoneValue:[], MetalTypeValue:[], MetalColourValue:[],
                CutValue:[], CertificateAgencyValue:[], ComplicationValue:[], StrapColorValue:[], StrapTypeValue:[],
                BuckleTypeValue:[], DialMetalValue:[], DialColorValue:[],DialIndexValue:[], MovementValue:[],
                LimitedEditionValue:[], WatchCategoryValue:[],filters:[], AccessoryTypeValue:[], paramsSearch:null,
                SparePartTypeValue:[],HierarchyValue:null,SearchAction:'New'
              };
      case SET_ACCESSORYTYPE :
        // console.log('SET_POLISH -->',action);
        return {...state, AccessoryTypeValue: action.accessoryType };
      case SET_HIERARCHY :
        // console.log('SET_POLISH -->',action);
        return {...state, HierarchyValue: action.hierarchy };
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
        // console.log('SET_POLISH -->',action);
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
                totalpublicprice:null, totalupdatedcost:null, AccessoryTypeValue:[],SparePartTypeValue:[],SearchAction:'New'
              }
      case SET_PARAMS:
        // console.log('action.params-->',action.params);
        return { ...state, paramsSearch:action.params }
      case MODIFY_SEARCH:
        return { ...state, paramsSearch:action.params, datas:null,allItems:[], totalpage:null,
        totalpublicprice:null, totalupdatedcost:null,SearchAction:'Modify' }
      case FETCH_ALLITEMS:
        // console.log('action-->',action.type);
        // console.log('action-->',action);
        return { ...state, datas: action.data.data, totalpage:Math.ceil(action.data.summary.count/8),
                totalpublicprice: action.data.summary.price, totalupdatedcost: action.data.summary.cost,
                currentPage:action.currPage, allItems: action.data.allData};
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
