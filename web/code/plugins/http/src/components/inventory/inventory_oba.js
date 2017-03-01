import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import Calendar from 'react-input-calendar';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import moment from 'moment';
import InitModifyData from '../../utils/initModifyData';
import Tree from '../../utils/treeview/Tree';
import TreeData from '../../utils/treeview/oba.json';

class InventoryOBA extends Component {
  constructor(props) {
    super(props);
    var dateToday = new Date();
    var fromdate = `${dateToday.getMonth()+1}-${dateToday.getDate()}-${dateToday.getFullYear()}`;

    this.treeOnClick = this.treeOnClick.bind(this);
    this.treeOnUnClick = this.treeOnUnClick.bind(this);
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
  componentWillReceiveProps(nextProps) {
    const { props } = this.props;
    // console.log('nextProps-->',nextProps.props.SearchAction);
    // console.log('props.SearchAction-->',props.SearchAction);
    if(nextProps.props.SearchAction != props.SearchAction){
      if(props.HierarchyValue != null){
        if(nextProps.props.SearchAction == 'New'){
          if(props.HierarchyValue.length != 0){
            props.HierarchyValue[0].checked = false;
            props.HierarchyValue[0].key = props.HierarchyValue[0].code;
            this.refs.treeview.handleChange(props.HierarchyValue[0]);
          }
          props.inventoryActions.setHierarchy(null);
        }
      }
    }
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
    // console.log('vals-->',vals);
    this.setState({treeViewData:vals});
    this.props.props.inventoryActions.setHierarchy(vals);
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

    var { fields: { obaProductHierarchy }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.obaProductHierarchy = treeSelected;

    obaProductHierarchy.onChange(treeSelected);
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

    const yesNo = [{value: 1,label:'Yes'},{value: 0,label:'No'}];

    var { fields:
          {
            totalCostFrom, totalCostTo, totalUpdatedCostFrom, totalUpdatedCostTo,publicPriceFrom, publicPriceTo,
            markupFrom, markupTo, grossWeightFrom, grossWeightTo, obaDimension
          },
            searchResult
          } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;

    var dataDropDowntCollection = [];
    var dataDropDowntBrand = [];
    var dataDropDowntMetalType = [];
    var dataDropDowntMetalColour = [];
    var dataDropDowntDominantStone = [];

    const userLogin = JSON.parse(sessionStorage.logindata);

    InitModifyData(props);

    if(props.options != undefined){
      if (props.options.collections) {
        dataDropDowntCollection.push(props.options.collections.map(collection =>{
            return ({value: collection.code,label:collection.code + ' [' + collection.name + ']'});
          })
        )
        dataDropDowntCollection = dataDropDowntCollection[0];
      }
      if (props.options.brands) {
        dataDropDowntBrand.push(props.options.brands.map(brand =>{
            return ({value: brand.code,label:brand.code + ' [' + brand.name + ']'});
          })
        )
        dataDropDowntBrand = dataDropDowntBrand[0];
      }
      if (props.options.metalTypes) {
        dataDropDowntMetalType.push(props.options.metalTypes.map(metalType =>{
            return ({value: metalType.code,label:metalType.code + ' [' + metalType.name + ']'});
          })
        )
        dataDropDowntMetalType = dataDropDowntMetalType[0];
      }
      if (props.options.metalColours) {
        dataDropDowntMetalColour.push(props.options.metalColours.map(metalColour =>{
            return ({value: metalColour.code,label:metalColour.code + ' [' + metalColour.name + ']'});
          })
        )
        dataDropDowntMetalColour = dataDropDowntMetalColour[0];
      }
      if (props.options.dominantStones) {
        dataDropDowntDominantStone.push(props.options.dominantStones.map(dominantStone =>{
            return ({value: dominantStone.code,label:dominantStone.code + ' [' + dominantStone.name + ']'});
          })
        )
        dataDropDowntDominantStone = dataDropDowntDominantStone[0];
      }
    }

    let hierarchyData = [];

    hierarchyData.push(TreeData);

    return(
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row margin-ft">
            <div className="col-lg-12  form-horizontal">
              <div className="form-group">
                <label className="col-lg-2 col-md-4 col-sm-4 control-label tooltiop-span">Product Hierarchy</label>
                <div className="col-lg-9 col-md-7 col-sm-7 bd-box">
                  <Tree data={hierarchyData} onClick={this.treeOnClick} onUnClick={this.treeOnUnClick} ref="treeview" />
                </div>
              </div>
            </div>
            <div className="col-lg-6  form-horizontal">
              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Collection
                  <OverlayTrigger placement="top" overlay={tooltipCollection}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.CollectionValue}
                    placeholder="Select your Collection"
                    options={dataDropDowntCollection}
                    onChange={this.handleCollectionSelectChange} />
                  </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Brand
                  <OverlayTrigger placement="top" overlay={tooltipBrand}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.BrandValue}
                    placeholder="Select your Brand"
                    options={dataDropDowntBrand}
                    onChange={this.handleBrandSelectChange} />
                  </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Must Have
                  <OverlayTrigger placement="top" overlay={tooltipMustHave}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.MustHaveValue}
                    placeholder="Select your MustHave"
                    options={yesNo}
                    onChange={this.handleMustHaveSelectChange} />
                  </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">OBA Dimension
                  <OverlayTrigger placement="top" overlay={tooltipOBADimension}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <input type="text" className="form-control" {...obaDimension}/>
                </div>
              </div>
            </div>
            <div className="col-lg-6 form-horizontal">
              <div className={`form-group ${(userLogin.permission.price == 'All'
                  || userLogin.permission.price == 'Updated') ?
                  '' : 'hidden'}`}>
                <label className="col-sm-4 control-label">Markup (Times)</label>
                <div className="col-sm-7">
                  <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="number" className="form-control" {...markupFrom}/>
                  </div>
                  <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="number" className="form-control" {...markupTo}/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Gross Weight (Grams)</label>
                <div className="col-sm-7">
                  <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="number" className="form-control" {...grossWeightFrom}/>
                  </div>
                  <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="number" className="form-control" {...grossWeightTo}/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Metal Type
                  <OverlayTrigger placement="top" overlay={tooltipMetalType}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.MetalTypeValue}
                    placeholder="Select your Metal Type"
                    options={dataDropDowntMetalType}
                    onChange={this.handleMetalTypeSelectChange} />
                  </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Metal Colour
                  <OverlayTrigger placement="top" overlay={tooltipMetalColour}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
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

const tooltipCollection = (
  <Tooltip id="tooltip"><strong>Search By Collection of the Product</strong></Tooltip>
);
const tooltipBrand = (
  <Tooltip id="tooltip"><strong>Search By Brand (eg. Mouawad, Chopard, Cartier etc.)</strong></Tooltip>
);
const tooltipMustHave = (
  <Tooltip id="tooltip"><strong>Search By Must Have (yes/no)</strong></Tooltip>
);
const tooltipOBADimension = (
  <Tooltip id="tooltip"><strong>Search By Product Size</strong></Tooltip>
);
const tooltipMetalType = (
  <Tooltip id="tooltip"><strong>Search By Metal Type of the Product</strong></Tooltip>
);
const tooltipMetalColour = (
  <Tooltip id="tooltip"><strong>Search By Metal Color of the Product</strong></Tooltip>
);

module.exports = InventoryOBA;
