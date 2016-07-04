import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import InitModifyData from '../../utils/initModifyData';
import Tree from '../../utils/treeview/Tree';
import TreeData from '../../utils/treeview/TreeDataJewelry.js';

class InventoryJewelry extends Component {
  constructor(props) {
    super(props);

    this.treeOnClick = this.treeOnClick.bind(this);
    this.treeOnUnClick = this.treeOnUnClick.bind(this);
    this.handleJewelryCategorySelectChange = this.handleJewelryCategorySelectChange.bind(this);
    this.handleCollectionSelectChange = this.handleCollectionSelectChange.bind(this);
    this.handleBrandSelectChange = this.handleBrandSelectChange.bind(this);
    this.handleMustHaveSelectChange = this.handleMustHaveSelectChange.bind(this);
    this.handleRingSizeSelectChange = this.handleRingSizeSelectChange.bind(this);
    this.handleDominantStoneSelectChange = this.handleDominantStoneSelectChange.bind(this);
    this.handleMetalTypeSelectChange = this.handleMetalTypeSelectChange.bind(this);
    this.handleMetalColourSelectChange = this.handleMetalColourSelectChange.bind(this);

    this.state = {
      treeViewData:null
    };

  }
  treeOnUnClick(vals){
    // console.log('unclick vals-->',this.state.treeViewData);

    if( this.state.treeViewData != null){
      this.state.treeViewData[0].checked = false;
      this.state.treeViewData[0].key = this.state.treeViewData[0].code;
      this.refs.treeview.handleChange(this.state.treeViewData[0]);
      this.props.props.inventoryActions.setHierarchy(this.state.treeViewData)
    }else{
      // console.log('HierarchyValue vals-->',this.props.props.HierarchyValue);
      if(this.props.props.HierarchyValue != null){
        if(this.props.props.SearchAction == 'New'){
          if(this.props.props.HierarchyValue.length != 0){
            this.props.props.HierarchyValue[0].checked = false;
            this.props.props.HierarchyValue[0].key = this.props.props.HierarchyValue[0].code;
            this.refs.treeview.handleChange(this.props.props.HierarchyValue[0]);
          }
          this.props.props.inventoryActions.setHierarchy(null);
        }
      }
    }
  }
  treeOnClick(vals){
    this.setState({treeViewData:vals});
    this.props.props.inventoryActions.setHierarchy(vals);
    // console.log('vals-->',vals);
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

    var { fields: { jewelryProductHierarchy }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.jewelryProductHierarchy = treeSelected;

    jewelryProductHierarchy.onChange(treeSelected);
  }
  handleJewelryCategorySelectChange(JewelryCategorySelectValue){
    const { props } = this.props;
    var { fields: { jewelryCategory }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.jewelryCategory = JewelryCategorySelectValue;

    jewelryCategory.onChange(JewelryCategorySelectValue);
    props.inventoryActions.setDataJewelryCategory(JewelryCategorySelectValue);
  }
  handleCollectionSelectChange(CollectionSelectValue){
    const { props } = this.props;
    var { fields: { collection }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.collection = CollectionSelectValue;

    collection.onChange(CollectionSelectValue);
    props.inventoryActions.setDataCollection(CollectionSelectValue);
  }
  handleBrandSelectChange(BrandSelectValue){
    const { props } = this.props;
    var { fields: { brand }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.brand = BrandSelectValue;

    brand.onChange(BrandSelectValue);
    props.inventoryActions.setDataBrand(BrandSelectValue);
  }
  handleMustHaveSelectChange(MustHaveSelectValue){
    const { props } = this.props;
    var { fields: { mustHave }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.mustHave = MustHaveSelectValue;

    mustHave.onChange(MustHaveSelectValue);
    props.inventoryActions.setDataMusthave(MustHaveSelectValue);
  }
  handleRingSizeSelectChange(RingSizeSelectValue){
    const { props } = this.props;
    var { fields: { ringSize }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.ringSize = RingSizeSelectValue;

    ringSize.onChange(RingSizeSelectValue);
    props.inventoryActions.setDataRingSize(RingSizeSelectValue);
  }
  handleDominantStoneSelectChange(DominantStoneSelectValue){
    const { props } = this.props;
    var { fields: { dominantStone }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.dominantStone = DominantStoneSelectValue;

    dominantStone.onChange(DominantStoneSelectValue);
    props.inventoryActions.setDataDominantStone(DominantStoneSelectValue);
  }
  handleMetalTypeSelectChange(MetalTypeSelectValue){
    const { props } = this.props;
    var { fields: { metalType }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.metalType = MetalTypeSelectValue;

    metalType.onChange(MetalTypeSelectValue);
    props.inventoryActions.setDataMetalType(MetalTypeSelectValue);
  }
  handleMetalColourSelectChange(MetalColourSelectValue){
    const { props } = this.props;
    var { fields: { metalColour }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.metalColour = MetalColourSelectValue;

    metalColour.onChange(MetalColourSelectValue);
    props.inventoryActions.setDataMetalColour(MetalColourSelectValue);
  }
  render() {
    const { props } = this.props;

    const musthaves = [{value: 'Yes',label:'Yes'},{value: 'No',label:'No'}];
    var {  fields:
          {
            collection, totalCostFrom, totalCostTo,totalUpdatedCostFrom, totalUpdatedCostTo, publicPriceFrom,publicPriceTo,
            markupFrom, markupTo, grossWeightFrom, grossWeightTo, setReference, brand, mustHave, ringSize, dominantStone,
            metalType, metalColour
          }
        } = props;

    var dataDropDowntJewelryCategory = [];
    var dataDropDowntCollection = [];
    var dataDropDowntBrand = [];
    var dataDropDowntRingSize = [];
    var dataDropDowntDominantStone = [];
    var dataDropDowntMetalType = [];
    var dataDropDowntMetalColour = [];

    InitModifyData(props);

    if (props.options.jewelryCategories) {
      dataDropDowntJewelryCategory.push(props.options.jewelryCategories.map(jewelryCategory =>{
          return ({value: jewelryCategory.code,label:jewelryCategory.code + ' [' + jewelryCategory.name + ']'});
        })
      )
      dataDropDowntJewelryCategory = dataDropDowntJewelryCategory[0];
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
    if (props.options.ringSizes) {
      dataDropDowntRingSize.push(props.options.ringSizes.map(ringSize =>{
          return ({value: ringSize.code,label:ringSize.name});
        })
      )
      dataDropDowntRingSize = dataDropDowntRingSize[0];
    }
    if (props.options.dominantStones) {
      dataDropDowntDominantStone.push(props.options.dominantStones.map(dominantStone =>{
          return ({value: dominantStone.code,label:dominantStone.name});
        })
      )
      dataDropDowntDominantStone = dataDropDowntDominantStone[0];
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

    // console.log('musthaves-->',musthaves);

    return(
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row margin-ft">
            <div className="col-lg-6 form-horizontal">
              <div className="form-group">
                <label className="col-sm-4 control-label">Product Hierarchy</label>
                <div className="col-sm-7 bd-box">
                  <Tree data={TreeData} onClick={this.treeOnClick} onUnClick={this.treeOnUnClick} ref="treeview"/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Jewelry Category</label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.JewelryCategoryValue}
                    placeholder="Select your Jewelry Category"
                    options={dataDropDowntJewelryCategory}
                    onChange={this.handleJewelryCategorySelectChange} />
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
                    options={musthaves}
                    onChange={this.handleMustHaveSelectChange} />
                </div>
              </div>
              {/*<div className="form-group">
                <label className="col-sm-4 control-label">Ring Size</label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.RingSizeValue}
                    placeholder="Select your Ring Size"
                    options={dataDropDowntRingSize}
                    onChange={this.handleRingSizeSelectChange} />
                </div>
              </div>*/}
              <div className="form-group">
                <label className="col-sm-4 control-label">Ring Size</label>
                <div className="col-sm-7">
                  <input type="text" className="form-control" {...ringSize}/>
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
                <label className="col-sm-4 control-label">Set Reference Number</label>
                <div className="col-sm-7">
                  <input type="text" className="form-control" {...setReference}/>
                </div>
              </div>
              <div className="form-group hidden">
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

module.exports = InventoryJewelry;
