import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InventoryFilter  from '../../components/inventory/inventory_filter';
import * as itemactions from '../../actions/itemactions';
import ProductGroup from '../../utils/userproductgroup';

class InventorySearch extends Component {
  constructor(props) {

    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static contextTypes = {

    router: PropTypes.object
  }
  handleSubmit(data) {

    var { filters, paramsSearch, activeTabCategory, isAdvance } = this.props;
    var that = this;
    const userLogin = JSON.parse(sessionStorage.logindata);
    // check modify search or new search
    // if have filters is mean modify search

    // set default location & warehouse
    var keyscat = Object.keys(data);
    var i=0;
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

    if(filters.length != 0){
      this.props.setParams(paramsSearch)
      filters.splice(0, filters.length);
    }else{
      // if not have filters is mean new search
      // set params by new criterias
      this.props.setParams(data);
    }

    var keyscat = Object.keys(data);

    keyscat.forEach((keycat) => {

      const valueKeys = (paramsSearch != null) ? paramsSearch[keycat] : data[keycat];

      if(valueKeys != '' && valueKeys != undefined){
        var propname = {};
        switch(keycat){
          case 'stoneProductHierarchy':
            if(valueKeys.length == 1){
              propname['hierarchy'] = valueKeys[0].code;
            }else{
              var code = '';
              valueKeys.forEach((objHi)=>{
                code = (code == '') ? objHi.code : code + ',' + objHi.code;
              });
              propname['hierarchy'] = code.trim();
            }
            break;
          case 'jewelryProductHierarchy':
            if(valueKeys.length == 1){
              propname['hierarchy'] = valueKeys[0].code;
            }else{
              var code = '';
              valueKeys.forEach((objHi)=>{
                code = (code == '') ? objHi.code : code + ',' + objHi.code;
              });
              propname['hierarchy'] = code.trim();
            }
            break;
          case 'watchProductHierarchy':
            if(valueKeys.length == 1){
              propname['hierarchy'] = valueKeys[0].code;
            }else{
              var code = '';
              valueKeys.forEach((objHi)=>{
                code = (code == '') ? objHi.code : code + ',' + objHi.code;
              });
              propname['hierarchy'] = code.trim();
            }
            break;
          case 'accessoryProductHierarchy':
            if(valueKeys.length == 1){
              propname['hierarchy'] = valueKeys[0].code;
            }else{
              var code = '';
              valueKeys.forEach((objHi)=>{
                code = (code == '') ? objHi.code : code + ',' + objHi.code;
              });
              propname['hierarchy'] = code.trim();
            }
            break;
          case 'obaProductHierarchy':
            if(valueKeys.length == 1){
              propname['hierarchy'] = valueKeys[0].code;
            }else{
              var code = '';
              valueKeys.forEach((objHi)=>{
                code = (code == '') ? objHi.code : code + ',' + objHi.code;
              });
              propname['hierarchy'] = code.trim();
            }
            break;
          case 'sparePartProductHierarchy':
            if(valueKeys.length == 1){
              propname['hierarchy'] = valueKeys[0].code;
            }else{
              var code = '';
              valueKeys.forEach((objHi)=>{
                code = (code == '') ? objHi.code : code + ',' + objHi.code;
              });
              propname['hierarchy'] = code.trim();
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
          filters.push({'type':'SPP'});
          break;
        default:
          break;
      }
    }else{
      var productArray = [];
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
      if(productGroup.productGroupSPP){
        productArray.push('SPP');
      }
      productArray.push('CER');
      // console.log('productGroup-->',productArray.join(' '));
      filters.push({'type':productArray.join(' ')});
    }

    filters.push({'userCurrency':userLogin.currency});
    console.log('filters-->',filters);
    this.props.setCurrentPage(1);
    this.context.router.push('/searchresult');
  }

  render(){
      return (
          <InventoryFilter onSubmit={this.handleSubmit}/>
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
    paramsSearch: state.searchResult.paramsSearch
  };
}

module.exports = connect(mapStateToProps,itemactions)(InventorySearch);
