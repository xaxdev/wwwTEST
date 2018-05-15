import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import Select from 'react-select';
import InitModifyData from '../../utils/initModifyData';
import Tree from '../../utils/treeview/TreeArticle';
import TreeData from '../../utils/treeview/jewelry.json';
import ClearSalesHierarchy from './utils/clear_hierarchy';
import RemoveSalesHierarchy from './utils/remove_hierarchy';
import DeleteSalesHierarchy from './utils/delete_hierarchy_attr';
import SearchSalesHierarchy from './utils/search_hierarchy';
import * as xls from '../../utils/xlsSetReference';
import * as inventoryActions from '../../actions/inventoryactions';

let X = XLSX;
let hiTreeData = TreeData;

class SalesReportJewelry extends Component {
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
        this.handleArticleSelectedChanged = this.handleArticleSelectedChanged.bind(this);
        this.readFile = this.readFile.bind(this);

        this.state = {
            treeViewData:null
        };
    }

    componentDidMount = _ => {
        jQuery('#fileSetReference').hide();
        jQuery('#btn-browsefileSetReference').click(function(){
            jQuery('#fileSetReference').click();
        });
        jQuery('#fileSetReference').change(function() {
            let filename =jQuery('#fileSetReference')[0].files[0];
            jQuery('#fileNameSetReference').text(filename.name);
        });

        (async () => {
            const { props } = this.props;
            let { fields: { jewelryProductSalesHierarchy }, searchResult } = props;
            if(props.SaveSearchSalesHierarchy != null){
                await props.inventoryActions.setSalesHierarchy(props.SaveSearchSalesHierarchy);
                this.refs.treeview.handleChange(props.SaveSearchSalesHierarchy);
            }
        })()
    }

    componentWillReceiveProps(nextProps) {
        const { props } = this.props;
        if(nextProps.props.SearchAction != props.SearchAction){
            if(props.SalesHierarchyValue != null){
                if(nextProps.props.SearchAction == 'New'){
                    if(props.SalesHierarchyValue.length != 0){
                        props.SalesHierarchyValue[0].checked = false;
                        props.SalesHierarchyValue[0].key = props.SalesHierarchyValue[0].code;
                        this.refs.treeview.handleChange(props.SalesHierarchyValue[0]);
                    }
                    props.inventoryActions.setSalesHierarchy(null);
                }
            }
        }
    }

    treeOnUnClick(vals){
        if( this.state.treeViewData != null){
            this.state.treeViewData[0].checked = false;
            this.state.treeViewData[0].key = this.state.treeViewData[0].code;
            this.refs.treeview.handleChange(this.state.treeViewData[0]);
            this.props.props.inventoryActions.setSalesHierarchy(this.state.treeViewData)
        }else{
            if(this.props.props.SalesHierarchyValue != null){
              if(this.props.props.SearchAction == 'New'){
                  if(this.props.props.SalesHierarchyValue.length != 0){
                      this.props.props.SalesHierarchyValue[0].checked = false;
                      this.props.props.SalesHierarchyValue[0].key = this.props.props.SalesHierarchyValue[0].code;
                      this.refs.treeview.handleChange(this.props.props.SalesHierarchyValue[0]);
                  }
                  this.props.props.inventoryActions.setSalesHierarchy(null);
              }else{
              }
            }else{
            }
        }
    }

    treeOnClick(vals){
        this.setState({treeViewData:vals});
        this.props.props.inventoryActions.setSalesHierarchy(vals);
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
        const { props } = this.props;

        let { fields: { jewelryProductSalesHierarchy }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)
                            ? searchResult.paramsSearch
                            : null;

        if(paramsSearch != null)
            paramsSearch.jewelryProductSalesHierarchy = treeSelected;

        jewelryProductSalesHierarchy.onChange(treeSelected);
    }

    handleJewelryCategorySelectChange(JewelryCategorySelectValue){
        const { props } = this.props;
        let { fields: { jewelryCategory }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)
                                ? searchResult.paramsSearch
                                : null;
        if(paramsSearch != null)
            paramsSearch.jewelryCategory = JewelryCategorySelectValue;

        jewelryCategory.onChange(JewelryCategorySelectValue);
        props.inventoryActions.setDataJewelryCategory(JewelryCategorySelectValue);
    }

    handleCollectionSelectChange(CollectionSelectValue){
        const { props } = this.props;
        let { fields: { collection }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)
                                ? searchResult.paramsSearch
                                : null;
        if(paramsSearch != null)
            paramsSearch.collection = CollectionSelectValue;

        collection.onChange(CollectionSelectValue);
        props.inventoryActions.setDataCollection(CollectionSelectValue);
    }

    handleBrandSelectChange(BrandSelectValue){
        const { props } = this.props;
        let { fields: { brand }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)
                                ? searchResult.paramsSearch
                                : null;
        if(paramsSearch != null)
            paramsSearch.brand = BrandSelectValue;

        brand.onChange(BrandSelectValue);
        props.inventoryActions.setDataBrand(BrandSelectValue);
    }

    handleMustHaveSelectChange(MustHaveSelectValue){
        const { props } = this.props;
        let { fields: { mustHave }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)
                                ? searchResult.paramsSearch
                                : null;

        if(paramsSearch != null)
            paramsSearch.mustHave = MustHaveSelectValue;

        mustHave.onChange(MustHaveSelectValue);
        props.inventoryActions.setDataMusthave(MustHaveSelectValue);
    }

    handleRingSizeSelectChange(RingSizeSelectValue){
        const { props } = this.props;
        let { fields: { ringSize }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)
                                ? searchResult.paramsSearch
                                : null;

        if(paramsSearch != null)
            paramsSearch.ringSize = RingSizeSelectValue;

        ringSize.onChange(RingSizeSelectValue);
        props.inventoryActions.setDataRingSize(RingSizeSelectValue);
    }

    handleDominantStoneSelectChange(DominantStoneSelectValue){
        const { props } = this.props;
        let { fields: { dominantStone }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)
                                ? searchResult.paramsSearch
                                : null;

        if(paramsSearch != null)
            paramsSearch.dominantStone = DominantStoneSelectValue;

        dominantStone.onChange(DominantStoneSelectValue);
        props.inventoryActions.setDataDominantStone(DominantStoneSelectValue);
    }

    handleMetalTypeSelectChange(MetalTypeSelectValue){
        const { props } = this.props;
        let { fields: { metalType }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)
                                ? searchResult.paramsSearch
                                : null;

        if(paramsSearch != null)
            paramsSearch.metalType = MetalTypeSelectValue;

        metalType.onChange(MetalTypeSelectValue);
        props.inventoryActions.setDataMetalType(MetalTypeSelectValue);
    }

    handleMetalColourSelectChange(MetalColourSelectValue){
        const { props } = this.props;
        let { fields: { metalColour }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)
                                ? searchResult.paramsSearch
                                : null;

        if(paramsSearch != null)
            paramsSearch.metalColour = MetalColourSelectValue;

        metalColour.onChange(MetalColourSelectValue);
        props.inventoryActions.setDataMetalColour(MetalColourSelectValue);
    }

    handleArticleSelectedChanged = (ArticleSelectedValue) => {
        const { props } = this.props;
        const userLogin = JSON.parse(sessionStorage.logindata);
        const notUseSalesHierarchy = JSON.parse(userLogin.permission.notUseSalesHierarchy)
        let { fields: { article, jewelryCategory, collection, brand, ringSize, dominantStone, metalType, metalColour
        }, searchResult } = props;
        let findFieldName = [];

        let paramsSearch = (searchResult.paramsSearch != null)
                                ? searchResult.paramsSearch
                                : null;

        if(props.options != undefined){
            if (props.options.jewelryCategories) {
                findFieldName = []
                findFieldName = props.options.jewelryCategories.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.jewelryCategory = findFieldName;

                jewelryCategory.onChange(findFieldName);
                props.inventoryActions.setDataJewelryCategory(findFieldName);
            }
            if (props.options.collections) {
                findFieldName = []
                findFieldName = props.options.collections.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.collection = findFieldName;

                collection.onChange(findFieldName);
                props.inventoryActions.setDataCollection(findFieldName);
            }
            if (props.options.brands) {
                findFieldName = []
                findFieldName = props.options.brands.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.brand = findFieldName;

                brand.onChange(findFieldName);
                props.inventoryActions.setDataBrand(findFieldName);
            }
            if (props.options.ringSizes) {
                findFieldName = []
                findFieldName = props.options.ringSizes.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.ringSize = findFieldName;

                ringSize.onChange(findFieldName);
                props.inventoryActions.setDataRingSize(findFieldName);
            }
            if (props.options.dominantStones) {
                findFieldName = []
                findFieldName = props.options.dominantStones.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.dominantStone = findFieldName;

                dominantStone.onChange(findFieldName);
                props.inventoryActions.setDataDominantStone(findFieldName);
            }
            if (props.options.metalTypes) {
                findFieldName = []
                findFieldName = props.options.metalTypes.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.metalType = findFieldName;

                metalType.onChange(findFieldName);
                props.inventoryActions.setDataMetalType(findFieldName);
            }
            if (props.options.metalColours) {
                findFieldName = []
                findFieldName = props.options.metalColours.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.metalColour = findFieldName;

                metalColour.onChange(findFieldName);
                props.inventoryActions.setDataMetalColour(findFieldName);
            }
        }
        if (ArticleSelectedValue == '') {
            let salesHierarchyData = RemoveSalesHierarchy(notUseSalesHierarchy, hiTreeData, 'JLY');
            DeleteSalesHierarchy(salesHierarchyData)
        }else{
            let salesHierarchyData = RemoveSalesHierarchy(notUseSalesHierarchy, hiTreeData, 'JLY');
            ClearSalesHierarchy(salesHierarchyData);
        }
        article.onChange(ArticleSelectedValue);
        props.inventoryActions.setDataArticle(ArticleSelectedValue);
    }

    selectedViewAsSet = e => {
        const { props } = this.props;
        let { fields: { viewAsSet }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)
                                ? searchResult.paramsSearch
                                : null;

        if(paramsSearch != null)
            paramsSearch.viewAsSet = e.target.checked;

        viewAsSet.onChange(e.target.checked);
        props.inventoryActions.setViewAsSet(e.target.checked);
    }

    readFile(e){
        e.preventDefault();
        let { fields:{setReference }, inventoryActions} = this.props.props;
        let X = XLSX;
        let that = this;
        let rABS = false;
        let use_worker = false;
        let files = e.target.files;

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
      		}
            if(rABS) reader.readAsBinaryString(f);
            else reader.readAsArrayBuffer(f);
    	};
    }

    render() {
        const { props } = this.props;
        const musthaves = [{value: 1,label:'Yes'},{value: 0,label:'No'}];
        let {  fields: {
                    collection, totalCostFrom, totalCostTo, totalUpdatedCostFrom, totalUpdatedCostTo, publicPriceFrom,
                    publicPriceTo, markupFrom, markupTo, grossWeightFrom, grossWeightTo, setReference, brand, mustHave,
                    ringSize, dominantStone, metalType, metalColour, viewAsSet
                }
        } = props;

        let dataDropDowntJewelryCategory = [];
        let dataDropDowntCollection = [];
        let dataDropDowntBrand = [];
        let dataDropDowntRingSize = [];
        let dataDropDowntDominantStone = [];
        let dataDropDowntMetalType = [];
        let dataDropDowntMetalColour = [];
        let dataDropDowntArticle = [];

        const userLogin = JSON.parse(sessionStorage.logindata);

        const host = HOSTNAME || 'localhost';
        const ROOT_URL = (host != 'mol.mouawad.com')? `//${host}:3005`: `//${host}`;

        InitModifyData(props);

        if(props.options != undefined){
            if (props.options.jewelryCategories) {
                dataDropDowntJewelryCategory.push(props.options.jewelryCategories.map(jewelryCategory =>{
                    return ({value: jewelryCategory.code,label:jewelryCategory.name});
                }))
                dataDropDowntJewelryCategory = dataDropDowntJewelryCategory[0];
            }
            if (props.options.collections) {
                dataDropDowntCollection.push(props.options.collections.map(collection =>{
                    return ({value: collection.code,label:collection.name});
                }))
                dataDropDowntCollection = dataDropDowntCollection[0];
            }
            if (props.options.brands) {
                dataDropDowntBrand.push(props.options.brands.map(brand =>{
                    return ({value: brand.code,label:brand.name});
                }))
                dataDropDowntBrand = dataDropDowntBrand[0];
            }
            if (props.options.ringSizes) {
                dataDropDowntRingSize.push(props.options.ringSizes.map(ringSize =>{
                    return ({value: ringSize.code,label:ringSize.name});
                }))
                dataDropDowntRingSize = dataDropDowntRingSize[0];
            }
            if (props.options.dominantStones) {
                dataDropDowntDominantStone.push(props.options.dominantStones.map(dominantStone =>{
                    return ({value: dominantStone.code,label:dominantStone.name});
                }))
                dataDropDowntDominantStone = dataDropDowntDominantStone[0];
            }
            if (props.options.metalTypes) {
                dataDropDowntMetalType.push(props.options.metalTypes.map(metalType =>{
                    return ({value: metalType.code,label:metalType.name});
                }))
                dataDropDowntMetalType = dataDropDowntMetalType[0];
            }
            if (props.options.metalColours) {
                dataDropDowntMetalColour.push(props.options.metalColours.map(metalColour =>{
                    return ({value: metalColour.code,label:metalColour.name});
                }))
                dataDropDowntMetalColour = dataDropDowntMetalColour[0];
            }
            if (props.options.articles) {
                let articleFilter = props.options.articles.filter(article =>{
                    return article.catalog == 'JLY'
                });
                dataDropDowntArticle.push(articleFilter.map(article =>{
                    return ({value: article.name,label:article.name});
                }))
                dataDropDowntArticle = dataDropDowntArticle[0];
            }
        }

        const notUseSalesHierarchy = JSON.parse(userLogin.permission.notUseSalesHierarchy)
        // delete hierarchy
        let salesHierarchyData = RemoveSalesHierarchy(notUseSalesHierarchy, TreeData, 'JLY');
        if (props.ArticleValue.length != 0) {
            salesHierarchyData = SearchSalesHierarchy(salesHierarchyData, props.ArticleValue);
        }

        return(
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="row margin-ft">
                        <div className="col-lg-6 form-horizontal">
                            <div className="form-group">
                                <label className="col-sm-4 control-label tooltiop-span">Article Grouping
                                    <OverlayTrigger placement="top" overlay={tooltipArticle}>
                                        <img src="/images/alphanumeric.png" />
                                    </OverlayTrigger>
                                </label>
                                <div className="col-sm-7">
                                    <Select simpleValue value={props.ArticleValue}
                                        placeholder="Select your Article Grouping"
                                        options={dataDropDowntArticle}
                                        onChange={this.handleArticleSelectedChanged} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 form-horizontal">
                            <div className="form-group">
                                <label className="col-lg-2 col-md-4 col-sm-4 control-label tooltiop-span">Product Hierarchy
                                    <OverlayTrigger placement="top" overlay={tooltipHierarchy}>
                                        <img src="/images/alphanumeric.png" />
                                    </OverlayTrigger>
                                </label>
                                <div className="col-lg-9 col-md-7 col-sm-7 bd-box">
                                    <Tree data={salesHierarchyData} onClick={this.treeOnClick} onUnClick={this.treeOnUnClick} ref="treeview"/>
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
                                || userLogin.permission.price == 'Updated') ? ''
                                : 'hidden'}`}>
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
                                    <div className="font-nor control-label">
                                        The system able to import only excel file. Click here to download a format file
                                        <a href={ROOT_URL+'/upload_file/Mol_upload_setreference.xlsx'} > Mol upload setreferences.xlsx</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const tooltipArticle = (
    <Tooltip id="tooltip"><strong>Article Grouping</strong></Tooltip>
);
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
module.exports = SalesReportJewelry;
// module.exports = connect(null,inventoryActions)(SalesReportJewelry);
