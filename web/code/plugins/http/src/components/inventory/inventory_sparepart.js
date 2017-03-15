import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import Calendar from 'react-input-calendar';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import moment from 'moment';
import InitModifyData from '../../utils/initModifyData';
import Tree from '../../utils/treeview/Tree';
import TreeData from '../../utils/treeview/spare.json';

class InventorySparePart extends Component {
  constructor(props) {
    super(props);
    let dateToday = new Date();
    let fromdate = `${dateToday.getMonth()+1}-${dateToday.getDate()}-${dateToday.getFullYear()}`;

    this.treeOnClick = this.treeOnClick.bind(this);
    this.treeOnUnClick = this.treeOnUnClick.bind(this);
    this.handleSparePartTypeSelectChange = this.handleSparePartTypeSelectChange.bind(this);
    this.handleBuckleTypeSelectChange = this.handleBuckleTypeSelectChange.bind(this);
    this.handleDominantStoneSelectChange = this.handleDominantStoneSelectChange.bind(this);
    this.handleMetalTypeSelectChange = this.handleMetalTypeSelectChange.bind(this);
    this.handleMetalColourSelectChange = this.handleMetalColourSelectChange.bind(this);

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
    let treeSelected = [];
    let selectedData = vals.filter(val => {
      let checkAllNodes = function(node){
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
    let { fields: { sparePartProductHierarchy }, searchResult } = props;

    let paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.sparePartProductHierarchy = treeSelected;

    sparePartProductHierarchy.onChange(treeSelected);
  }
  handleSparePartTypeSelectChange(sparePartTypeSelectValue){
    const { props } = this.props;
    let { fields: { sparePartType }, searchResult } = props;

    let paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.sparePartType = sparePartTypeSelectValue;

    sparePartType.onChange(sparePartTypeSelectValue);
    props.inventoryActions.setDataSparePartType(sparePartTypeSelectValue);
  }
  handleBuckleTypeSelectChange(buckleTypeSelectValue){
    const { props } = this.props;
    let { fields: { buckleType }, searchResult } = props;

    let paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.buckleType = buckleTypeSelectValue;

    buckleType.onChange(buckleTypeSelectValue);
    props.inventoryActions.setDataBuckleType(buckleTypeSelectValue);
  }
  handleMetalTypeSelectChange(metalTypeSelectValue){
    const { props } = this.props;
    let { fields: { metalType }, searchResult } = props;

    let paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.metalType = metalTypeSelectValue;

    metalType.onChange(metalTypeSelectValue);
    props.inventoryActions.setDataMetalType(metalTypeSelectValue);
  }
  handleMetalColourSelectChange(metalColourSelectValue){
    const { props } = this.props;
    let { fields: { metalColour }, searchResult } = props;

    let paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch :
                          null;
    if(paramsSearch != null)
        paramsSearch.metalColour = metalColourSelectValue;

    metalColour.onChange(metalColourSelectValue);
    props.inventoryActions.setDataMetalColour(metalColourSelectValue);
  }
  handleDominantStoneSelectChange(dominantStoneSelectValue){
    const { props } = this.props;
    let { fields: { dominantStone }, searchResult } = props;

    let paramsSearch = (searchResult.paramsSearch != null)?
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

    let { fields:
          {
            totalCostFrom, totalCostTo, totalUpdatedCostFrom, totalUpdatedCostTo,publicPriceFrom, publicPriceTo,
            markupFrom, markupTo, grossWeightFrom, grossWeightTo
          },
            searchResult
          } = props;

    let paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;

    let dataDropDownSparePartType = [];
    let dataDropDowntBuckleType = [];
    let dataDropDowntDominantStone = [];
    let dataDropDowntMetalType = [];
    let dataDropDowntMetalColour = [];

    const userLogin = JSON.parse(sessionStorage.logindata);

    InitModifyData(props);

    if(props.options != undefined){
      if (props.options.sparePartType) {
        dataDropDownSparePartType.push(props.options.sparePartType.map(sparePartType =>{
            return ({value: sparePartType.code,label:sparePartType.code + ' [' + sparePartType.name + ']'});
          })
        )
        dataDropDownSparePartType = dataDropDownSparePartType[0];
      }
      if (props.options.buckleTypes) {
        dataDropDowntBuckleType.push(props.options.buckleTypes.map(buckleType =>{
            return ({value: buckleType.code,label:buckleType.code + ' [' + buckleType.name + ']'});
          })
        )
        dataDropDowntBuckleType = dataDropDowntBuckleType[0];
      }
      if (props.options.dominantStones) {
        dataDropDowntDominantStone.push(props.options.dominantStones.map(dominantStone =>{
            return ({value: dominantStone.code,label:dominantStone.code + ' [' + dominantStone.name + ']'});
          })
        )
        dataDropDowntDominantStone = dataDropDowntDominantStone[0];
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
    }

    let hierarchyData = [];

    hierarchyData.push(TreeData);

    return(
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row margin-ft">
            <div className="col-lg-12 form-horizontal">
              <div className="form-group">
                <label className="col-lg-2 col-md-4 col-sm-4 control-label tooltiop-span">Product Hierarchy</label>
                <div className="col-lg-9 col-md-7 col-sm-7 bd-box">
                  <Tree data={hierarchyData} onClick={this.treeOnClick} onUnClick={this.treeOnUnClick} ref="treeview" />
                </div>
              </div>
            </div>
            <div className="col-lg-6  form-horizontal">
              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Spare Part Type
                  <OverlayTrigger placement="top" overlay={tooltipSparePartType}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.SparePartTypeValue}
                    placeholder="Select your Spare Part Type"
                    options={dataDropDownSparePartType}
                    onChange={this.handleSparePartTypeSelectChange} />
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

const tooltipSparePartType = (
  <Tooltip id="tooltip"><strong>Search By Type of Spare Part (eg. Sparepart, Strap etc.)</strong></Tooltip>
);
const tooltipBuckleType = (
  <Tooltip id="tooltip"><strong>Search By Type of Buckle</strong></Tooltip>
);
const tooltipMetalType = (
  <Tooltip id="tooltip"><strong>Search By Metal Type of the Product</strong></Tooltip>
);
const tooltipMetalColour = (
  <Tooltip id="tooltip"><strong>Search By Metal Color of the Product</strong></Tooltip>
);

module.exports = InventorySparePart;
