import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import Calendar from 'react-input-calendar';
import moment from 'moment';
import InitModifyData from '../../utils/initModifyData';
import Tree from '../../utils/treeview/Tree';
import TreeData from '../../utils/treeview/TreeDataAcc';

class InventoryAccessory extends Component {
  constructor(props) {
    super(props);
    var dateToday = new Date();
    var fromdate = `${dateToday.getMonth()+1}-${dateToday.getDate()}-${dateToday.getFullYear()}`;

    this.treeOnClick = this.treeOnClick.bind(this);
    this.treeOnUnClick = this.treeOnUnClick.bind(this);
    this.handleAccessoryTypeSelectChange = this.handleAccessoryTypeSelectChange.bind(this);
    this.handleCollectionSelectChange = this.handleCollectionSelectChange.bind(this);
    this.handleBrandSelectChange = this.handleBrandSelectChange.bind(this);
    this.handleMustHaveSelectChange = this.handleMustHaveSelectChange.bind(this);
    this.handleMetalTypeSelectChange = this.handleMetalTypeSelectChange.bind(this);
    this.handleMetalColourSelectChange = this.handleMetalColourSelectChange.bind(this);
    this.handleDominantStoneSelectChange = this.handleDominantStoneSelectChange.bind(this);

    this.state = {
      startDate: null,
      endDate: null,
      treeViewData:null
    }
  }
  treeOnUnClick(vals){
    // console.log('unclick vals-->',this.state.treeViewData);
    if( this.state.treeViewData != null){
      this.state.treeViewData[0].checked = false;
      this.state.treeViewData[0].key = this.state.treeViewData[0].code;
      this.refs.treeview.handleChange(this.state.treeViewData[0]);
    }
  }
  treeOnClick(vals){
    // console.log('vals-->',vals);
    this.setState({treeViewData:vals});
    var treeSelected = [];
    var selectedData = vals.filter(val => {
      var checkAllNodes = function(node){
        if (node.children) {
          if(node.checked === true){treeSelected.push(node);}
          node.children.forEach(checkAllNodes);
        }else{
          if(node.checked === true){treeSelected.push(node);}
        }
      }
      if(val.checked === true){treeSelected.push(val);}

      if(val.children){
        val.children.forEach(checkAllNodes);
      }
      return treeSelected;
    });
    // console.log('treeSelected-->',treeSelected);
    const { props } = this.props;
    var { fields: { accessoryProductHierarchy }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.accessoryProductHierarchy = treeSelected;

    accessoryProductHierarchy.onChange(treeSelected);
  }
  handleAccessoryTypeSelectChange(accessoryTypeSelectValue){
    const { props } = this.props;
    var { fields: { accessoryType }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.accessoryType = accessoryTypeSelectValue;

    accessoryType.onChange(accessoryTypeSelectValue);
    props.inventoryActions.setDataAccessoryType(accessoryTypeSelectValue);
  }
  handleCollectionSelectChange(collectionSelectValue){
    const { props } = this.props;
    var { fields: { collection }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.collection = collectionSelectValue;

    collection.onChange(collectionSelectValue);
    props.inventoryActions.setDataCollection(collectionSelectValue);
  }
  handleBrandSelectChange(brandSelectValue){
    const { props } = this.props;
    var { fields: { brand }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.brand = brandSelectValue;

    brand.onChange(brandSelectValue);
    props.inventoryActions.setDataBrand(brandSelectValue);
  }
  handleMustHaveSelectChange(mustHaveSelectValue){
    const { props } = this.props;
    var { fields: { mustHave }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.mustHave = mustHaveSelectValue;

    mustHave.onChange(mustHaveSelectValue);
    props.inventoryActions.setDataMusthave(mustHaveSelectValue);
  }
  handleMetalTypeSelectChange(metalTypeSelectValue){
    const { props } = this.props;
    var { fields: { metalType }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.metalType = metalTypeSelectValue;

    metalType.onChange(metalTypeSelectValue);
    props.inventoryActions.setDataMetalType(metalTypeSelectValue);
  }
  handleMetalColourSelectChange(metalColourSelectValue){
    const { props } = this.props;
    var { fields: { metalColour }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.metalColour = metalColourSelectValue;

    metalColour.onChange(metalColourSelectValue);
    props.inventoryActions.setDataMetalColour(metalColourSelectValue);
  }
  handleDominantStoneSelectChange(dominantStoneSelectValue){
    const { props } = this.props;
    var { fields: { dominantStone }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.dominantStone = dominantStoneSelectValue;

    dominantStone.onChange(dominantStoneSelectValue);
    props.inventoryActions.setDataDominantStone(dominantStoneSelectValue);
  }
  render() {
    const { props } = this.props;

    const yesNo = [{value: 'Yes',label:'Yes'},{value: 'No',label:'No'}];

    var { fields:
          {
            totalCostFrom, totalCostTo, totalUpdatedCostFrom, totalUpdatedCostTo,publicPriceFrom, publicPriceTo,
            markupFrom, markupTo, grossWeightFrom, grossWeightTo
          },
            searchResult
          } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;

    var dataDropDowntAccessoryType = [];
    var dataDropDowntCollection = [];
    var dataDropDowntBrand = [];
    var dataDropDowntMetalType = [];
    var dataDropDowntMetalColour = [];
    var dataDropDowntDominantStone = [];

    InitModifyData(props);

    if (props.options.watchCategories) {
      dataDropDowntAccessoryType.push(props.options.watchCategories.map(watchCategory =>{
          return ({value: watchCategory.code,label:watchCategory.name});
        })
      )
      dataDropDowntAccessoryType = dataDropDowntAccessoryType[0];
    }
    if (props.options.collections) {
      dataDropDowntCollection.push(props.options.collections.map(collection =>{
          return ({value: collection.code,label:collection.name});
        })
      )
      dataDropDowntCollection = dataDropDowntCollection[0];
    }
    if (props.options.brands) {
      dataDropDowntBrand.push(props.options.brands.map(brand =>{
          return ({value: brand.code,label:brand.name});
        })
      )
      dataDropDowntBrand = dataDropDowntBrand[0];
    }
    if (props.options.metalTypes) {
      dataDropDowntMetalType.push(props.options.metalTypes.map(metalType =>{
          return ({value: metalType.code,label:metalType.name});
        })
      )
      dataDropDowntMetalType = dataDropDowntMetalType[0];
    }
    if (props.options.metalColours) {
      dataDropDowntMetalColour.push(props.options.metalColours.map(metalColour =>{
          return ({value: metalColour.code,label:metalColour.name});
        })
      )
      dataDropDowntMetalColour = dataDropDowntMetalColour[0];
    }
    if (props.options.dominantStones) {
      dataDropDowntDominantStone.push(props.options.dominantStones.map(dominantStone =>{
          return ({value: dominantStone.code,label:dominantStone.name});
        })
      )
      dataDropDowntDominantStone = dataDropDowntDominantStone[0];
    }

    return(
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row margin-ft">
            <div className="col-lg-6 form-horizontal">
              <div className="form-group">
                <label className="col-sm-4 control-label">Product Hierarchy</label>
                <div className="col-sm-7 bd-box">
                  <Tree data={TreeData} onClick={this.treeOnClick} onUnClick={this.treeOnUnClick} ref="treeview" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Accessory Type</label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.AccessoryTypeValue}
                    placeholder="Select your Watch Category"
                    options={dataDropDowntAccessoryType}
                    onChange={this.handleAccessoryTypeSelectChange} />
                 </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Collection</label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.CollectionValue}
                    placeholder="Select your Collection"
                    options={dataDropDowntCollection}
                    onChange={this.handleCollectionSelectChange} />
                  </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Brand</label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.BrandValue}
                    placeholder="Select your Brand"
                    options={dataDropDowntBrand}
                    onChange={this.handleBrandSelectChange} />
                  </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Must Have</label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.MustHaveValue}
                    placeholder="Select your MustHave"
                    options={yesNo}
                    onChange={this.handleMustHaveSelectChange} />
                  </div>
              </div>
            </div>
            <div className="col-lg-6 form-horizontal">
              <div className="form-group">
                <label className="col-sm-4 control-label">Total Cost (USD)</label>
                <div className="col-sm-7">
                  <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...totalCostFrom}/>
                  </div>
                  <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...totalCostTo}/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Total Updated Cost (USD)</label>
                <div className="col-sm-7">
                  <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...totalUpdatedCostFrom}/>
                  </div>
                  <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...totalUpdatedCostTo}/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Public Price (USD)</label>
                <div className="col-sm-7">
                  <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...publicPriceFrom}/>
                  </div>
                  <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...publicPriceTo}/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Markup %</label>
                <div className="col-sm-7">
                  <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...markupFrom}/>
                  </div>
                  <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...markupTo}/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Gross Weight (Grams)</label>
                <div className="col-sm-7">
                  <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...grossWeightFrom}/>
                  </div>
                  <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...grossWeightTo}/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Dominant Stone</label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.DominantStoneValue}
                    placeholder="Select your Dominant Stone"
                    options={dataDropDowntDominantStone}
                    onChange={this.handleDominantStoneSelectChange} />
                  </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Metal Type</label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.MetalTypeValue}
                    placeholder="Select your Metal Type"
                    options={dataDropDowntMetalType}
                    onChange={this.handleMetalTypeSelectChange} />
                  </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Metal Colour</label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.MetalColourValue}
                    placeholder="Select your Metal Colour"
                    options={dataDropDowntMetalColour}
                    onChange={this.handleMetalColourSelectChange} />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = InventoryAccessory;
