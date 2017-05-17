import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InventoryFilter  from '../../components/inventory/inventory_filter';
import * as itemactions from '../../actions/itemactions';
import ProductGroup from '../../utils/userproductgroup';
import Modalalertmsg from '../../utils/modalalertmsg';

const Loading = require('react-loading');

class InventorySearch extends Component {
  constructor(props) {

    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static contextTypes = {

    router: PropTypes.object
  }

  handleSubmit = (data) => {
    const that = this;
    const { props } = this.props;
    let { filters, paramsSearch, activeTabCategory, isAdvance, submitAction, IdEditSaveSearch } = this.props;
    const isNotOwnerSharedSearch = this.props.searchResult.criteriaSaveSearch != null
                                    ? this.props.searchResult.criteriaSaveSearch.shared
                                    : false;
    // console.log('shared-->',this.props.searchResult.criteriaSaveSearch.shared);

    const userLogin = JSON.parse(sessionStorage.logindata);
    let saveSearchName = data.searchName;
    let jlyHierarchy = false;
    let watHierarchy = false;
    let stoHierarchy = false;
    let accHierarchy = false;
    let obaHierarchy = false;
    let sppHierarchy = false;
    // check modify search or new search
    // if have filters is mean modify search
    // console.log('data-->',data);
    // console.log('data.searchName-->',data.searchName);

    delete data.searchName;

    // set default location & warehouse
    let keyscat = Object.keys(data);
    let i=0;
    // find criterias
    keyscat.forEach((keycat) => {
      const valueKeys = data[keycat];
      if(valueKeys != '' && valueKeys != undefined){
        i++;
      }
      if(keycat == 'location'){
        if(that.props.searchResult.LocationValue != 0){
          // using from selected location
          data.location = that.props.searchResult.LocationValue;
        }else{
          //  using location permission user
          if(userLogin.permission.onhandLocation != undefined){
            data.location = userLogin.permission.onhandLocation.places.join(',');
          }else{
            data.location = [];
          }
        }
      }else if(keycat == 'warehouse'){
        if(that.props.searchResult.WarehouseValue != 0){
          // using from selected location
          data.warehouse = that.props.searchResult.WarehouseValue;
        }else{
          //  using location permission user
          if(userLogin.permission.onhandWarehouse != undefined){
            data.warehouse = userLogin.permission.onhandWarehouse.places.join(',');
          }else{
            data.warehouse = [];
          }
        }
      }
    });

    (async () => {
        if(filters.length != 0){
            await this.props.setParams(paramsSearch)
            await sessionStorage.setItem('paramsSearch', JSON.stringify(paramsSearch));
            await filters.splice(0, filters.length);
        }else{
            // if not have filters is mean new search
            // set params by new criterias
            await this.props.setParams(data);
            await sessionStorage.setItem('paramsSearch', JSON.stringify(data));
        }
    })()
    // let keyscat = Object.keys(data);
    keyscat.forEach((keycat) => {

      const valueKeys = (paramsSearch != null) ? paramsSearch[keycat] : data[keycat];

      if(valueKeys != '' && valueKeys != undefined){
        let propname = {};
        switch(keycat){
          case 'stoneProductHierarchy':
            if(valueKeys.length == 1){
              propname['hierarchy'] = valueKeys[0].code;
            }else{
              let code = '';
              valueKeys.forEach((objHi)=>{
                code = (code == '') ? objHi.code : code + '|' + objHi.code;
              });
              propname['hierarchy'] = code.trim();
            }
            stoHierarchy = true;
            break;
          case 'jewelryProductHierarchy':
            if(valueKeys.length == 1){
              propname['hierarchy'] = valueKeys[0].code;
            }else{
              let code = '';
              valueKeys.forEach((objHi)=>{
                code = (code == '') ? objHi.code : code + '|' + objHi.code;
              });
              propname['hierarchy'] = code.trim();
            }
            jlyHierarchy = true;
            break;
          case 'watchProductHierarchy':
            if(valueKeys.length == 1){
              propname['hierarchy'] = valueKeys[0].code;
            }else{
              let code = '';
              valueKeys.forEach((objHi)=>{
                code = (code == '') ? objHi.code : code + '|' + objHi.code;
              });
              propname['hierarchy'] = code.trim();
            }
            watHierarchy = true;
            break;
          case 'accessoryProductHierarchy':
            if(valueKeys.length == 1){
              propname['hierarchy'] = valueKeys[0].code;
            }else{
              let code = '';
              valueKeys.forEach((objHi)=>{
                code = (code == '') ? objHi.code : code + '|' + objHi.code;
              });
              propname['hierarchy'] = code.trim();
            }
            accHierarchy = true;
            break;
          case 'obaProductHierarchy':
            if(valueKeys.length == 1){
              propname['hierarchy'] = valueKeys[0].code;
            }else{
              let code = '';
              valueKeys.forEach((objHi)=>{
                code = (code == '') ? objHi.code : code + '|' + objHi.code;
              });
              propname['hierarchy'] = code.trim();
            }
            obaHierarchy = true;
            break;
          case 'sparePartProductHierarchy':
            if(valueKeys.length == 1){
              propname['hierarchy'] = valueKeys[0].code;
            }else{
              let code = '';
              valueKeys.forEach((objHi)=>{
                code = (code == '') ? objHi.code : code + '|' + objHi.code;
              });
              propname['hierarchy'] = code.trim();
            }
            sppHierarchy = true;
            break;
          case 'color':
              if(valueKeys != ''){
                propname['lotNumbers.'+keycat]= valueKeys;
              }else{
                propname[keycat]= valueKeys;
              }
              break;
          case 'cut':
              if(valueKeys != ''){
                propname['lotNumbers.'+keycat]= valueKeys;
              }else{
                propname[keycat]= valueKeys;
              }
              break;
          case 'clarity':
              if(valueKeys != ''){
                propname['lotNumbers.'+keycat]= valueKeys;
              }else{
                propname[keycat]= valueKeys;
              }
              break;
          case 'lotNumber':
              if(valueKeys != ''){
                propname['lotNumbers.'+keycat]= valueKeys;
              }else{
                propname[keycat]= valueKeys;
              }
              break;
          case 'lotQuantityFrom':
              if(valueKeys != ''){
                propname['lotNumbers.'+keycat]= valueKeys;
              }else{
                propname[keycat]= valueKeys;
              }
              break;
          case 'lotQuantityTo':
              if(valueKeys != ''){
                propname['lotNumbers.'+keycat]= valueKeys;
              }else{
                propname[keycat]= valueKeys;
              }
              break;
          case 'totalCaratWeightFrom':
              if(valueKeys != ''){
                propname['lotNumbers.'+keycat]= valueKeys;
              }else{
                propname[keycat]= valueKeys;
              }
              break;
          case 'totalCaratWeightTo':
              if(valueKeys != ''){
                propname['lotNumbers.'+keycat]= valueKeys;
              }else{
                propname[keycat]= valueKeys;
              }
              break;
          default:

            if(keycat.indexOf('gemstone_') != -1){
              propname['gemstones.'+keycat.replace('gemstone_', '')]= valueKeys;
            }else{
              propname[keycat]= valueKeys;
            }
            break;
        }
        filters.push(propname);
      }
    });
    if(isAdvance){
      switch(activeTabCategory){
        case 1:
          filters.push({'type':'JLY'});
          break;
        case 2:
          filters.push({'type':'WAT'});
          break;
        case 3:
          filters.push({'type':'STO'});
          break;
        case 4:
          filters.push({'type':'ACC'});
          break;
        case 5:
          filters.push({'type':'OBA'});
          break;
        case 6:
          filters.push({'type':'SPA'});
          break;
        default:
          break;
      }
    }else{
      let productArray = [];
      const productGroup = ProductGroup(userLogin);
      if(productGroup.productGroupJLY){
        productArray.push('JLY');
      }
      if(productGroup.productGroupWAT){
        productArray.push('WAT');
      }
      if(productGroup.productGroupSTO){
        productArray.push('STO');
      }
      if(productGroup.productGroupACC){
        productArray.push('ACC');
      }
      if(productGroup.productGroupOBA){
        productArray.push('OBA');
      }
      if(productGroup.productGroupSPA){
        productArray.push('SPA');
      }
      productArray.push('CER');
      // console.log('productGroup-->',productArray.join(' '));
      filters.push({'type':productArray.join(' ')});
    }

    filters.push({'userCurrency':userLogin.currency});
    // console.log(filters.find((item) => {return item.location != undefined}));
    const findLocation = filters.find((item) => {return item.location != undefined});
    const findWareHouse = filters.find((item) => {return item.warehouse != undefined});

    if (!findLocation) {
        if (userLogin.permission.onhandLocation.places.length != 0) {
            filters.push({'location':userLogin.permission.onhandLocation.places});
        }
    }

    if (!findWareHouse) {
        if (userLogin.permission.onhandWarehouse.places.length != 0) {
            filters.push({'warehouse':userLogin.permission.onhandWarehouse.places});
        }
    }
    // console.log('filters-->',filters);
    this.props.setCurrentPage(1);
    sessionStorage.setItem('filters', JSON.stringify(filters));
    switch (submitAction) {
        case 'save':
            if(jlyHierarchy){
                filters.push({'jewelryProductHierarchy':data.jewelryProductHierarchy})
            }
            if(watHierarchy){
                filters.push({'watchProductHierarchy':data.watchProductHierarchy})
            }
            if(stoHierarchy){
                filters.push({'stoneProductHierarchy':data.stoneProductHierarchy})
            }
            if(accHierarchy){
                filters.push({'accessoryProductHierarchy':data.accessoryProductHierarchy})
            }
            if(obaHierarchy){
                filters.push({'obaProductHierarchy':data.obaProductHierarchy})
            }
            if(sppHierarchy){
                filters.push({'sparePartProductHierarchy':data.sparePartProductHierarchy})
            }
            let paramsSaveSearch = {};
            if (IdEditSaveSearch != null) {
                if (isNotOwnerSharedSearch) {
                    paramsSaveSearch = {...paramsSaveSearch,
                        name:saveSearchName,
                        criteria:JSON.stringify(filters)};
                } else {
                    paramsSaveSearch = {...paramsSaveSearch,
                        id: IdEditSaveSearch,
                        name:saveSearchName,
                        criteria:JSON.stringify(filters)};
                }
            } else {
                paramsSaveSearch = {...paramsSaveSearch,
                    name:saveSearchName,
                    criteria:JSON.stringify(filters)};
            }
            // paramsSaveSearch = {...paramsSaveSearch, name:saveSearchName, criteria:JSON.stringify(filters)}
            // console.log('paramsSaveSearch-->',paramsSaveSearch);
            this.props.saveSearchCriteria(paramsSaveSearch);
            break;
        case 'search':
            this.context.router.push('/searchresult');
            break;
        default:
    }
  }

  handleClosemsgSaveSearch = _=> {
      this.props.setCloseAlertMsg(100);
  }

  renderAlertmsgSaveSearch = _=> {
      const { saveSearchStatus, saveSearchStatusCode, saveSearchMsgError} = this.props;

      const title = 'SAVE SEARCHES';
      let isOpen = saveSearchStatusCode >= 200 ? true : false;

      return(<Modalalertmsg isOpen={isOpen} isClose={this.handleClosemsgSaveSearch}
          props={this.props} message={saveSearchMsgError}  title={title}/>);
  }

  render(){
      return (
          <div>
            <InventoryFilter onSubmit={this.handleSubmit}/>
            {this.renderAlertmsgSaveSearch()}
          </div>
      );
  }
}
function mapStateToProps(state) {
  // console.log('InventorySearch state-->',state);
  return {
    searchResult:state.searchResult,
    activeTabCategory: state.searchResult.activeTabCategory,
    isAdvance: state.searchResult.IsAdvance,
    filters: state.searchResult.filters,
    paramsSearch: state.searchResult.paramsSearch,
    submitAction: state.searchResult.SubmitAction,
    saveSearchStatus: state.searchResult.saveSearchStatus,
    saveSearchMsgError: state.searchResult.msg,
    saveSearchStatusCode: state.searchResult.saveSearchStatusCode,
    IdEditSaveSearch: state.searchResult.idEditSaveSearch,
  };
}

module.exports = connect(mapStateToProps,itemactions)(InventorySearch);
