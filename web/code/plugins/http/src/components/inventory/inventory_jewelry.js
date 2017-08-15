import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import InitModifyData from '../../utils/initModifyData';
import Tree from '../../utils/treeview/Tree';
import TreeData from '../../utils/treeview/jewelry.json';
import * as xls from '../../utils/xlsSetReference';
import RemoveHierarchy from './utils/remove_hierarchy';
import * as inventoryActions from '../../actions/inventoryactions';

let X = XLSX;

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
    this.readFile = this.readFile.bind(this);

    this.state = {
      treeViewData:null
    };

  }
  componentDidMount = _ =>{
      jQuery('#fileSetReference').hide();
      jQuery('#btn-browsefileSetReference').click(function(){
          jQuery('#fileSetReference').click();
            });
      jQuery('#fileSetReference').change(function() {

          let filename =jQuery('#fileSetReference')[0].files[0];
          //alert(filename.name);
          jQuery('#fileNameSetReference').text(filename.name);
      });

      (async () => {
        //   console.log('componentDidMount');
          const { props } = this.props;
          let { fields: { jewelryProductHierarchy }, searchResult } = props;
        //   console.log('searchResult-->',props.SaveSearchHierarchy);
          if(props.SaveSearchHierarchy != null){
                await props.inventoryActions.setHierarchy(props.SaveSearchHierarchy);
                this.refs.treeview.handleChange(props.SaveSearchHierarchy);
          }
      })()
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this.props;
    // console.log('nextProps-->',nextProps.props.SearchAction);
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
        }else{
          // if(this.props.props.HierarchyValue.length != 0){
          //   this.props.props.HierarchyValue[0].checked = false;
          //   this.props.props.HierarchyValue[0].key = this.props.props.HierarchyValue[0].code;
          //   this.refs.treeview.handleChange(this.props.props.HierarchyValue[0]);
          // }
          // this.props.props.inventoryActions.setHierarchy(null);
        }
      }else{
        // console.log('reset hierarchy');
      }
    }
  }
  treeOnClick(vals){
    this.setState({treeViewData:vals});
    this.props.props.inventoryActions.setHierarchy(vals);
    // console.log('vals-->',vals);
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

    let { fields: { jewelryProductHierarchy }, searchResult } = props;

    let paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.jewelryProductHierarchy = treeSelected;

    jewelryProductHierarchy.onChange(treeSelected);
  }
  handleJewelryCategorySelectChange(JewelryCategorySelectValue){
    const { props } = this.props;
    let { fields: { jewelryCategory }, searchResult } = props;

    let paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.jewelryCategory = JewelryCategorySelectValue;

    jewelryCategory.onChange(JewelryCategorySelectValue);
    props.inventoryActions.setDataJewelryCategory(JewelryCategorySelectValue);
  }
  handleCollectionSelectChange(CollectionSelectValue){
    const { props } = this.props;
    let { fields: { collection }, searchResult } = props;

    let paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.collection = CollectionSelectValue;

    collection.onChange(CollectionSelectValue);
    props.inventoryActions.setDataCollection(CollectionSelectValue);
  }
  handleBrandSelectChange(BrandSelectValue){
    const { props } = this.props;
    let { fields: { brand }, searchResult } = props;

    let paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.brand = BrandSelectValue;

    brand.onChange(BrandSelectValue);
    props.inventoryActions.setDataBrand(BrandSelectValue);
  }
  handleMustHaveSelectChange(MustHaveSelectValue){
    const { props } = this.props;
    let { fields: { mustHave }, searchResult } = props;

    let paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.mustHave = MustHaveSelectValue;

    mustHave.onChange(MustHaveSelectValue);
    props.inventoryActions.setDataMusthave(MustHaveSelectValue);
  }
  handleRingSizeSelectChange(RingSizeSelectValue){
    const { props } = this.props;
    let { fields: { ringSize }, searchResult } = props;

    let paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.ringSize = RingSizeSelectValue;

    ringSize.onChange(RingSizeSelectValue);
    props.inventoryActions.setDataRingSize(RingSizeSelectValue);
  }
  handleDominantStoneSelectChange(DominantStoneSelectValue){
    const { props } = this.props;
    let { fields: { dominantStone }, searchResult } = props;

    let paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.dominantStone = DominantStoneSelectValue;

    dominantStone.onChange(DominantStoneSelectValue);
    props.inventoryActions.setDataDominantStone(DominantStoneSelectValue);
  }
  handleMetalTypeSelectChange(MetalTypeSelectValue){
    const { props } = this.props;
    let { fields: { metalType }, searchResult } = props;

    let paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.metalType = MetalTypeSelectValue;

    metalType.onChange(MetalTypeSelectValue);
    props.inventoryActions.setDataMetalType(MetalTypeSelectValue);
  }
  handleMetalColourSelectChange(MetalColourSelectValue){
    const { props } = this.props;
    let { fields: { metalColour }, searchResult } = props;

    let paramsSearch = (searchResult.paramsSearch != null)?
                          searchResult.paramsSearch:
                          null;
    if(paramsSearch != null)
      paramsSearch.metalColour = MetalColourSelectValue;

    metalColour.onChange(MetalColourSelectValue);
    props.inventoryActions.setDataMetalColour(MetalColourSelectValue);
  }
  selectedViewAsSet = e =>{
      const { props } = this.props;
      let { fields: { viewAsSet }, searchResult } = props;

      let paramsSearch = (searchResult.paramsSearch != null)?
                            searchResult.paramsSearch:
                            null;
      if(paramsSearch != null)
        paramsSearch.viewAsSet = e.target.checked;

      viewAsSet.onChange(e.target.checked);
      props.inventoryActions.setViewAsSet(e.target.checked);
    //   console.log(e.target.checked);
  }
  readFile(e){
      e.preventDefault();
      let { fields:{setReference }, inventoryActions} = this.props.props;
      let X = XLSX;

      let that = this;
      let rABS = false;
      let use_worker = false;

      let files = e.target.files;
      // console.log('files-->',files);

      let f = files[0];
      {
    		let reader = new FileReader();
    		let name = f.name;
    		reader.onload = function(e) {
                let data = e.target.result;
                let arr = xls.fixdata(data);
                let wb = X.read(btoa(arr), {type: 'base64'});
                let items = xls.process_wb(wb);
                setReference.onChange(items.set);
                inventoryActions.setSetReferenceOrder(items.AllData);
                // console.log(JSON.stringify(items, 2, 2));
    		}
          if(rABS) reader.readAsBinaryString(f);
          else reader.readAsArrayBuffer(f);
  	};
  }
  render() {
    const { props } = this.props;

    const musthaves = [{value: 1,label:'Yes'},{value: 0,label:'No'}];
    let {  fields:
          {
            collection, totalCostFrom, totalCostTo,totalUpdatedCostFrom, totalUpdatedCostTo, publicPriceFrom,publicPriceTo,
            markupFrom, markupTo, grossWeightFrom, grossWeightTo, setReference, brand, mustHave, ringSize, dominantStone,
            metalType, metalColour,viewAsSet
          }
        } = props;

    let dataDropDowntJewelryCategory = [];
    let dataDropDowntCollection = [];
    let dataDropDowntBrand = [];
    let dataDropDowntRingSize = [];
    let dataDropDowntDominantStone = [];
    let dataDropDowntMetalType = [];
    let dataDropDowntMetalColour = [];

    const userLogin = JSON.parse(sessionStorage.logindata);

    const host = HOSTNAME || 'localhost';
    const ROOT_URL = (host != 'mol.mouawad.com')? `//${host}:3005`: `//${host}`;

    InitModifyData(props);

    if(props.options != undefined){
      if (props.options.jewelryCategories) {
        dataDropDowntJewelryCategory.push(props.options.jewelryCategories.map(jewelryCategory =>{
            return ({value: jewelryCategory.code,label:jewelryCategory.code + ' [' + jewelryCategory.name + ']'});
          })
        )
        dataDropDowntJewelryCategory = dataDropDowntJewelryCategory[0];
      }
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
      if (props.options.ringSizes) {
        dataDropDowntRingSize.push(props.options.ringSizes.map(ringSize =>{
            return ({value: ringSize.code,label:ringSize.name});
          })
        )
        dataDropDowntRingSize = dataDropDowntRingSize[0];
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

    const notUseHierarchy = JSON.parse(userLogin.permission.notUseHierarchy)
    // delete hierarchy
    const hierarchyData = RemoveHierarchy(notUseHierarchy, TreeData, 'JLY');

    // console.log('ViewAsSet-->',props.ViewAsSet);
    // console.log('hierarchyData-->',mapObj);

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
                    <div className="col-sm-7">
                        <input type="checkbox" value="ViewAsSet" {...viewAsSet}
                            checked={props.ViewAsSet}
                            onChange={this.selectedViewAsSet} />
                            <span className="control-label text-vertical-top">View as Set</span>
                    </div>
                  </div>
                </div>
            </div>
            <div className="col-lg-6 form-horizontal">

              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Jewelry Category
                  <OverlayTrigger placement="top" overlay={tooltipJewelryCategory}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <Select multi simpleValue value={props.JewelryCategoryValue}
                    placeholder="Select your Jewelry Category"
                    options={dataDropDowntJewelryCategory}
                    onChange={this.handleJewelryCategorySelectChange} />
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
                    options={musthaves}
                    onChange={this.handleMustHaveSelectChange} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label tooltiop-span">Ring Size
                  <OverlayTrigger placement="top" overlay={tooltipRingSize}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <input type="text" className="form-control" {...ringSize}/>
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
                <label className="col-sm-4 control-label">Gross Weight (Grams)
                  <OverlayTrigger placement="top" overlay={tooltipGrossWeight}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
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
              <div className="form-group">
                <label className="col-sm-4 control-label">Set Reference Number
                  <OverlayTrigger placement="top" overlay={tooltipSetReferenceNumber}>
                    <img src="/images/alphanumeric.png" />
                  </OverlayTrigger>
                </label>
                <div className="col-sm-7">
                  <input type="text" className="form-control"
                    placeholder="Enter Multiple Set Ref separated with comma" {...setReference}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Attachment</label>
                <div className="col-sm-7">

                  <input id="fileSetReference" type="file" field={setReference} onChange={this.readFile}/>
                  <span id="fileNameSetReference"></span>
                  <input type="button" id="btn-browsefileSetReference" value=" "/>
                  <div className="font-nor control-label">The system able to import only excel file. Click here to download a format file <a href={ROOT_URL+'/upload_file/Mol_upload_setreference.xlsx'} >Mol upload setreferences.xlsx</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const tooltipHierarchy = (
  <Tooltip id="tooltip"><strong>Product Hierarchy</strong></Tooltip>
);
const tooltipJewelryCategory = (
  <Tooltip id="tooltip"><strong>Search By Type of the Product (eg. Ring, Pendent, Necklace etc.)</strong></Tooltip>
);
const tooltipCollection = (
  <Tooltip id="tooltip"><strong>Search By Collection (eg. Masterpiece, High Jewelry, Diamond Classics etc.) of the Product</strong></Tooltip>
);
const tooltipBrand = (
  <Tooltip id="tooltip"><strong>Seacrh By Brand (eg. Mouawad, Chopard, Cartier etc.) of the Product</strong></Tooltip>
);
const tooltipMustHave = (
  <Tooltip id="tooltip"><strong>Search By Must Have (yes/no)</strong></Tooltip>
);
const tooltipRingSize = (
  <Tooltip id="tooltip"><strong>Search Product by Ring Size</strong></Tooltip>
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
  <Tooltip id="tooltip"><strong>Search By Total Weight of the Product</strong></Tooltip>
);
const tooltipSetReferenceNumber = (
  <Tooltip id="tooltip"><strong>Search Sets By Set Reference Number</strong></Tooltip>
);
const tooltipMetalType = (
  <Tooltip id="tooltip"><strong>Search By Metal Type of the Product</strong></Tooltip>
);
const tooltipMetalColour = (
  <Tooltip id="tooltip"><strong>Search By Metal Color of the Product</strong></Tooltip>
);
module.exports = InventoryJewelry;
// module.exports = connect(null,inventoryActions)(InventoryJewelry);
