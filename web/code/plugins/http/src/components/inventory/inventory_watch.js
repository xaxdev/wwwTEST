import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import Calendar from 'react-input-calendar';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import moment from 'moment';
import InitModifyData from '../../utils/initModifyData';
import Tree from '../../utils/treeview/Tree';
import TreeData from '../../utils/treeview/watch.json';

class InventoryWatch extends Component {
  constructor(props) {
    super(props);
    var dateToday = new Date();
    var fromdate = `${dateToday.getMonth()+1}-${dateToday.getDate()}-${dateToday.getFullYear()}`;

    this.treeOnClick = this.treeOnClick.bind(this);
    this.treeOnUnClick = this.treeOnUnClick.bind(this);
    this.handleWatchCategorySelectChange = this.handleWatchCategorySelectChange.bind(this);
    this.handleCollectionSelectChange = this.handleCollectionSelectChange.bind(this);
    this.handleBrandSelectChange = this.handleBrandSelectChange.bind(this);
    this.handleMustHaveSelectChange = this.handleMustHaveSelectChange.bind(this);
    this.handleMetalTypeSelectChange = this.handleMetalTypeSelectChange.bind(this);
    this.handleMetalColourSelectChange = this.handleMetalColourSelectChange.bind(this);
    this.handleDominantStoneSelectChange = this.handleDominantStoneSelectChange.bind(this);
    this.handleLimitedEditionSelectChange = this.handleLimitedEditionSelectChange.bind(this);
    this.handleMovementSelectChange = this.handleMovementSelectChange.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleDialIndexSelectChange = this.handleDialIndexSelectChange.bind(this);
    this.handleDialColorSelectChange = this.handleDialColorSelectChange.bind(this);
    this.handleDialMetalSelectChange = this.handleDialMetalSelectChange.bind(this);
    this.handleBuckleTypeSelectChange = this.handleBuckleTypeSelectChange.bind(this);
    this.handleStrapTypeSelectChange = this.handleStrapTypeSelectChange.bind(this);
    this.handleStrapColorSelectChange = this.handleStrapColorSelectChange.bind(this);
    this.handleComplicationSelectChange = this.handleComplicationSelectChange.bind(this);

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
    var { fields: { watchProductHierarchy }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.watchProductHierarchy = treeSelected;

    watchProductHierarchy.onChange(treeSelected);
  }
  handleWatchCategorySelectChange(watchCategorySelectValue){
    const { props } = this.props;
    var { fields: { watchCategory }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.watchCategory = watchCategorySelectValue;

    watchCategory.onChange(watchCategorySelectValue);
    props.inventoryActions.setDataWatchCategory(watchCategorySelectValue);
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
  handleLimitedEditionSelectChange(limitedEditionSelectValue){
    const { props } = this.props;
    var { fields: { limitedEdition }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.limitedEdition = limitedEditionSelectValue;

    limitedEdition.onChange(limitedEditionSelectValue);
    props.inventoryActions.setDataLimitedEdition(limitedEditionSelectValue);
  }
  handleMovementSelectChange(movementSelectValue){
    const { props } = this.props;
    var { fields: { movement }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.movement = movementSelectValue;

    movement.onChange(movementSelectValue);
    props.inventoryActions.setDataMovement(movementSelectValue);
  }
  handleChangeDate ({ startDate, endDate }) {
    var startDateM = (typeof startDate !== 'undefined')? moment(startDate,'MM-DD-YYYY') : moment(this.state.startDate,'MM-DD-YYYY');
    var endDateM = (typeof endDate !== 'undefined')? moment(endDate,'MM-DD-YYYY') : moment(this.state.endDate,'MM-DD-YYYY');

    if (startDateM.isAfter(endDateM)) {
      var temp = startDate || this.state.startDate;
      startDate = endDate|| this.state.endDate;
      endDate = temp
    }else{
      if(startDate == undefined){
        startDate = startDateM._i;
      }
      if(endDate == undefined){
        endDate = endDateM._i;
      }
    }

    this.setState({ startDate, endDate })
  }
  handleChangeStart(startDate){
    // console.log('handleChangeStart-->',startDate);
    const { props } = this.props;
    var { fields: { proDateFrom }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.proDateFrom = startDate;

    proDateFrom.onChange(startDate);
    this.setState({startDate});
    this.handleChangeDate({ startDate });
    // this.render();
  }
  handleChangeEnd(endDate){
    const { props } = this.props;
    var { fields: { proDateTo }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.proDateTo = endDate;

    proDateTo.onChange(endDate);
    this.setState({endDate});
    this.handleChangeDate({ endDate });
  }
  handleDialIndexSelectChange(dialIndexSelectValue){
    const { props } = this.props;
    var { fields: { dialIndex }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.dialIndex = dialIndexSelectValue;

    dialIndex.onChange(dialIndexSelectValue);
    props.inventoryActions.setDataDialIndex(dialIndexSelectValue);
  }
  handleDialColorSelectChange(dialColorSelectValue){
    const { props } = this.props;
    var { fields: { dialColor }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.dialColor = dialColorSelectValue;

    dialColor.onChange(dialColorSelectValue);
    props.inventoryActions.setDataDialColor(dialColorSelectValue);
  }
  handleDialMetalSelectChange(dialMetalSelectValue){
    const { props } = this.props;
    var { fields: { dialMetal }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.dialMetal = dialMetalSelectValue;

    dialMetal.onChange(dialMetalSelectValue);
    props.inventoryActions.setDataDialMetal(dialMetalSelectValue);
  }
  handleBuckleTypeSelectChange(buckleTypeSelectValue){
    const { props } = this.props;
    var { fields: { buckleType }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.buckleType = buckleTypeSelectValue;

    buckleType.onChange(buckleTypeSelectValue);
    props.inventoryActions.setDataBuckleType(buckleTypeSelectValue);
  }
  handleStrapTypeSelectChange(strapTypeSelectValue){
    const { props } = this.props;
    var { fields: { strapType }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.strapType = strapTypeSelectValue;

    strapType.onChange(strapTypeSelectValue);
    props.inventoryActions.setDataStrapType(strapTypeSelectValue);
  }
  handleStrapColorSelectChange(strapColorSelectValue){
    const { props } = this.props;
    var { fields: { strapColor }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.strapColor = strapColorSelectValue;

    strapColor.onChange(strapColorSelectValue);
    props.inventoryActions.setDataStrapColor(strapColorSelectValue);
  }
  handleComplicationSelectChange(complicationSelectValue){
    const { props } = this.props;
    var { fields: { complication }, searchResult } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.complication = complicationSelectValue;

    complication.onChange(complicationSelectValue);
    props.inventoryActions.setDataComplication(complicationSelectValue);
  }
  render() {
    const { props } = this.props;

    const yesNo = [{value: 1,label:'Yes'},{value: 0,label:'No'}];

    var { fields:
          {
            limitedEditionNumber, serialNumber, totalCostFrom, totalCostTo, totalUpdatedCostFrom, totalUpdatedCostTo,
            publicPriceFrom, publicPriceTo, markupFrom, markupTo, grossWeightFrom, grossWeightTo, caseDimensionFrom,
            caseDimensionTo, preciousMetalWeightFrom, preciousMetalWeightTo
          },
            searchResult
          } = props;

    var paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;

    var dataDropDowntWatchCategory = [];
    var dataDropDowntCollection = [];
    var dataDropDowntBrand = [];
    var dataDropDowntMetalType = [];
    var dataDropDowntMetalColour = [];
    var dataDropDowntDominantStone = [];
    var dataDropDowntMovement = [];
    var dataDropDowntDialIndex = [];
    var dataDropDowntDialColor = [];
    var dataDropDowntDialMetal = [];
    var dataDropDowntBuckleType = [];
    var dataDropDowntStrapType = [];
    var dataDropDowntStrapColor = [];
    var dataDropDowntComplication = [];

    const userLogin = JSON.parse(sessionStorage.logindata);

    InitModifyData(props);

    if(props.options != undefined){
      if (props.options.watchCategories) {
        dataDropDowntWatchCategory.push(props.options.watchCategories.map(watchCategory =>{
            return ({value: watchCategory.code,label:watchCategory.code + ' [' + watchCategory.name + ']'});
          })
        )
        dataDropDowntWatchCategory = dataDropDowntWatchCategory[0];
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
          if (dominantStone.name === 'ONY') {
            return ({value: dominantStone.code + 's',label:dominantStone.name});
          }else if(dominantStone.name === 'PER'){
            return ({value: dominantStone.code + 's',label:dominantStone.name});
          }else{
            return ({value: dominantStone.code,label:dominantStone.name});
          }
            // return ({value: dominantStone.code,label:dominantStone.name});
          })
        )
        dataDropDowntDominantStone = dataDropDowntDominantStone[0];
      }
      if (props.options.movements) {
        dataDropDowntMovement.push(props.options.movements.map(movement =>{
            return ({value: movement.code,label:movement.name});
          })
        )
        dataDropDowntMovement = dataDropDowntMovement[0];
      }
      if (props.options.dialIndexs) {
        dataDropDowntDialIndex.push(props.options.dialIndexs.map(dialIndex =>{
            return ({value: dialIndex.code,label:dialIndex.name});
          })
        )
        dataDropDowntDialIndex = dataDropDowntDialIndex[0];
      }
      if (props.options.dialColors) {
        dataDropDowntDialColor.push(props.options.dialColors.map(dialColor =>{
            return ({value: dialColor.code,label:dialColor.name});
          })
        )
        dataDropDowntDialColor = dataDropDowntDialColor[0];
      }
      if (props.options.dialMetals) {
        dataDropDowntDialMetal.push(props.options.dialMetals.map(dialMetal =>{
            return ({value: dialMetal.code,label:dialMetal.name});
          })
        )
        dataDropDowntDialMetal = dataDropDowntDialMetal[0];
      }
      if (props.options.buckleTypes) {
        dataDropDowntBuckleType.push(props.options.buckleTypes.map(buckleType =>{
            return ({value: buckleType.code,label:buckleType.name});
          })
        )
        dataDropDowntBuckleType = dataDropDowntBuckleType[0];
      }
      if (props.options.strapTypes) {
        dataDropDowntStrapType.push(props.options.strapTypes.map(strapType =>{
            return ({value: strapType.code,label:strapType.name});
          })
        )
        dataDropDowntStrapType = dataDropDowntStrapType[0];
      }
      if (props.options.strapColors) {
        dataDropDowntStrapColor.push(props.options.strapColors.map(strapColor =>{
            return ({value: strapColor.code,label:strapColor.name});
          })
        )
        dataDropDowntStrapColor = dataDropDowntStrapColor[0];
      }
      if (props.options.complications) {
        dataDropDowntComplication.push(props.options.complications.map(complication =>{
            return ({value: complication.code,label:complication.name});
          })
        )
        dataDropDowntComplication = dataDropDowntComplication[0];
      }
    }
    let hierarchyData = [];

    hierarchyData.push(TreeData);

    return(
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row margin-ft">
            <div className="col-lg-12 form-horizontal">
            <div className="form-group">
              <label className="col-lg-2 col-md-4 col-sm-4 control-label tooltiop-span">Product Hierarchy
                <OverlayTrigger placement="top" overlay={tooltipHierarchy}>
                  <img src="/images/alphanumeric.png" />
                </OverlayTrigger>
              </label>
              <div className="col-lg-9 col-md-7 col-sm-7 bd-box">
                <Tree data={hierarchyData} onClick={this.treeOnClick} onUnClick={this.treeOnUnClick} ref="treeview"/>
              </div>
            </div>
            </div>
            <div className="col-lg-6 form-horizontal">
              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Watch Category
                  <OverlayTrigger placement="top" overlay={tooltipWatchCategory}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.WatchCategoryValue}
                    placeholder="Select your Watch Category"
                    options={dataDropDowntWatchCategory}
                    onChange={this.handleWatchCategorySelectChange} />
                 </div>
              </div>
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
              {/*<div className="form-group">
                <label className="col-sm-4 control-label">Dominant Stone</label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.DominantStoneValue}
                    placeholder="Select your Dominant Stone"
                    options={dataDropDowntDominantStone}
                    onChange={this.handleDominantStoneSelectChange} />
                  </div>
              </div>*/}
              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Limited Edition
                  <OverlayTrigger placement="top" overlay={tooltipLimitedEdition}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.LimitedEditionValue}
                    placeholder="Select your Limited Edition"
                    options={yesNo}
                    onChange={this.handleLimitedEditionSelectChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Limited Edition Number</label>
                <div className="col-sm-7">
                  <input type="text" className="form-control" {...limitedEditionNumber}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Serial Number</label>
                <div className="col-sm-7">
                  <input type="text" className="form-control" {...serialNumber}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Movement
                  <OverlayTrigger placement="top" overlay={tooltipMovement}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.MovementValue}
                    placeholder="Select your Movement"
                    options={dataDropDowntMovement}
                    onChange={this.handleMovementSelectChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Complication
                  <OverlayTrigger placement="top" overlay={tooltipComplication}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.ComplicationValue}
                    placeholder="Select your Complication"
                    options={dataDropDowntComplication}
                    onChange={this.handleComplicationSelectChange} />
                </div>
              </div>

            </div>
            <div className="col-lg-6 form-horizontal">
              {/*<div className={`form-group ${(userLogin.permission.price == 'All') ?
                  '' : 'hidden'}`}>
                <label className="col-sm-4 control-label">Actual Cost ({userLogin.currency})
                </label>
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
              <div className={`form-group ${(userLogin.permission.price == 'Updated'
                                            || userLogin.permission.price == 'All') ?
                                            '' : 'hidden'}`}>
                <label className="col-sm-4 control-label">Updated Cost ({userLogin.currency})</label>
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
              <div className={`form-group ${(userLogin.permission.price == 'Public'
                                            || userLogin.permission.price == 'Updated'
                                            || userLogin.permission.price == 'All') ?
                                          '' : 'hidden'}`}>
                <label className="col-sm-4 control-label">Public Price ({userLogin.currency})</label>
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
              </div>*/}
              <div className={`form-group ${(userLogin.permission.price == 'All'
                  || userLogin.permission.price == 'Updated') ?
                  '' : 'hidden'}`}>
                <label className="col-sm-4 control-label">Markup (Times)</label>
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
                <label className="col-sm-4 control-label">Production Date</label>
                <div className="col-sm-7">
                  <label className="col-sm-2 padding-l font-nor margin-t7">From: </label>
                  <div className="col-sm-10 nopadding">
                    <Calendar
                      format="MM-DD-YYYY"
                      date={(paramsSearch != null)?paramsSearch.proDateFrom:this.state.startDate}
                      closeOnSelect = {true}
                      onChange={this.handleChangeStart}
                    />
                  </div>
                  <label className="col-sm-2 control-label padding-l font-nor m-margin-t10 m-nopadding">To: </label>
                  <div className="col-sm-10 nopadding">
                    <Calendar
                      format="MM-DD-YYYY"
                      date={(paramsSearch != null)?paramsSearch.proDateTo:this.state.endDate}
                      closeOnSelect = {true}
                      onChange={this.handleChangeEnd}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group hidden">
                <label className="col-sm-4 control-label">Case Dimension</label>
                <div className="col-sm-7">
                  <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...caseDimensionFrom}/>
                  </div>
                  <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...caseDimensionTo}/>
                  </div>
                </div>
              </div>
              <div className="form-group hidden">
                <label className="col-sm-4 control-label">Precious Metal Weight</label>
                <div className="col-sm-7">
                  <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...preciousMetalWeightFrom}/>
                  </div>
                  <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                  <div className="col-sm-4 nopadding">
                    <input type="text" className="form-control" {...preciousMetalWeightTo}/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Dial Index
                  <OverlayTrigger placement="top" overlay={tooltipDialIndex}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.DialIndexValue}
                    placeholder="Select your Dial Index"
                    options={dataDropDowntDialIndex}
                    onChange={this.handleDialIndexSelectChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Dial Color
                  <OverlayTrigger placement="top" overlay={tooltipDialColor}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.DialColorValue}
                    placeholder="Select your Dial Color"
                    options={dataDropDowntDialColor}
                    onChange={this.handleDialColorSelectChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Dial Metal
                  <OverlayTrigger placement="top" overlay={tooltipDialMetal}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.DialMetalValue}
                    placeholder="Select your Dial Metal"
                    options={dataDropDowntDialMetal}
                    onChange={this.handleDialMetalSelectChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Buckle Type
                  <OverlayTrigger placement="top" overlay={tooltipBuckleType}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.BuckleTypeValue}
                    placeholder="Select your Buckle Type"
                    options={dataDropDowntBuckleType}
                    onChange={this.handleBuckleTypeSelectChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Strap Type
                  <OverlayTrigger placement="top" overlay={tooltipStrapType}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.StrapTypeValue}
                    placeholder="Select your Strap Type"
                    options={dataDropDowntStrapType}
                    onChange={this.handleStrapTypeSelectChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Strap Color
                  <OverlayTrigger placement="top" overlay={tooltipStrapColor}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.StrapColorValue}
                    placeholder="Select your Strap Color"
                    options={dataDropDowntStrapColor}
                    onChange={this.handleStrapColorSelectChange} />
                </div>
              </div>
              {/*<div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Complication
                  <OverlayTrigger placement="top" overlay={tooltipComplication}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.ComplicationValue}
                    placeholder="Select your Complication"
                    options={dataDropDowntComplication}
                    onChange={this.handleComplicationSelectChange} />
                </div>
              </div>*/}

            </div>
          </div>
        </div>
      </div>
    );
  }
}

const tooltipHierarchy = (
  <Tooltip id="tooltip"><strong>Product Hierarchy!</strong></Tooltip>
);
const tooltipWatchCategory = (
  <Tooltip id="tooltip"><strong>Watch Category!</strong></Tooltip>
);
const tooltipCollection = (
  <Tooltip id="tooltip"><strong>Collection!</strong></Tooltip>
);
const tooltipBrand = (
  <Tooltip id="tooltip"><strong>Brand!</strong></Tooltip>
);
const tooltipMustHave = (
  <Tooltip id="tooltip"><strong>Must Have!</strong></Tooltip>
);
const tooltipMetalType = (
  <Tooltip id="tooltip"><strong>Metal Type!</strong></Tooltip>
);
const tooltipMetalColour = (
  <Tooltip id="tooltip"><strong>Metal Colour!</strong></Tooltip>
);
const tooltipLimitedEdition = (
  <Tooltip id="tooltip"><strong>Limited Edition!</strong></Tooltip>
);
const tooltipLimitedEditionNumber = (
  <Tooltip id="tooltip"><strong>Limited Edition Number!</strong></Tooltip>
);
const tooltipSerialNumber = (
  <Tooltip id="tooltip"><strong>Serial Number!</strong></Tooltip>
);
const tooltipMovement = (
  <Tooltip id="tooltip"><strong>Movement!</strong></Tooltip>
);
const tooltipTotalCost = (
  <Tooltip id="tooltip"><strong>Actual Cost (USD)!</strong></Tooltip>
);
const tooltipTotalUpdatedCost = (
  <Tooltip id="tooltip"><strong>Updated Cost (USD)!</strong></Tooltip>
);
const tooltipPublicPrice = (
  <Tooltip id="tooltip"><strong>Public Price (USD)!</strong></Tooltip>
);
const tooltipMarkup = (
  <Tooltip id="tooltip"><strong>Markup (Times)!</strong></Tooltip>
);
const tooltipGrossWeight = (
  <Tooltip id="tooltip"><strong>Gross Weight (Grams)!</strong></Tooltip>
);
const tooltipProductionDate = (
  <Tooltip id="tooltip"><strong>Production Date</strong></Tooltip>
);
const tooltipDialIndex = (
  <Tooltip id="tooltip"><strong>Dial Index</strong></Tooltip>
);
const tooltipDialColor = (
  <Tooltip id="tooltip"><strong>Dial Color</strong></Tooltip>
);
const tooltipDialMetal = (
  <Tooltip id="tooltip"><strong>Dial Metal</strong></Tooltip>
);
const tooltipBuckleType = (
  <Tooltip id="tooltip"><strong>Buckle Type</strong></Tooltip>
);
const tooltipStrapType = (
  <Tooltip id="tooltip"><strong>Strap Type</strong></Tooltip>
);
const tooltipStrapColor = (
  <Tooltip id="tooltip"><strong>Strap Color</strong></Tooltip>
);
const tooltipComplication = (
  <Tooltip id="tooltip"><strong>Complication</strong></Tooltip>
);

module.exports = InventoryWatch;
