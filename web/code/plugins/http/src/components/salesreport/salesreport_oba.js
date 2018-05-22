import React, { Component, PropTypes } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import Select from 'react-select';
import Calendar from 'react-input-calendar';
import moment from 'moment';
import InitModifyData from '../../utils/initModifyData';
import Tree from '../../utils/treeview/TreeArticle';
import TreeData from '../../utils/treeview/salesoba.json';
import RemoveSalesHierarchy from './utils/remove_hierarchy';
import ClearSalesHierarchy from './utils/clear_hierarchy';
import SearchSalesHierarchy from './utils/search_hierarchy';
import DeleteSalesHierarchy from './utils/delete_hierarchy_attr';

let hiTreeData = TreeData;

class SalesReportOBA extends Component {
    constructor(props) {
        super(props);

        let dateToday = new Date();
        let fromdate = `${dateToday.getMonth()+1}-${dateToday.getDate()}-${dateToday.getFullYear()}`;

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

    componentDidMount = _ =>{
        (async () => {
            const { props } = this.props;
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
                }
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

        let { fields: { obaProductSalesHierarchy }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)?
                              searchResult.paramsSearch :
                              null;
        if(paramsSearch != null)
            paramsSearch.obaProductSalesHierarchy = treeSelected;

        obaProductSalesHierarchy.onChange(treeSelected);
    }

    handleCollectionSelectChange(collectionSelectValue){
        const { props } = this.props;
        let { fields: { collection }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)?
                              searchResult.paramsSearch :
                              null;
        if(paramsSearch != null)
            paramsSearch.collection = collectionSelectValue;

        collection.onChange(collectionSelectValue);
        props.inventoryActions.setDataCollection(collectionSelectValue);
    }

    handleBrandSelectChange(brandSelectValue){
        const { props } = this.props;
        let { fields: { brand }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)?
                              searchResult.paramsSearch :
                              null;
        if(paramsSearch != null)
            paramsSearch.brand = brandSelectValue;

        brand.onChange(brandSelectValue);
        props.inventoryActions.setDataBrand(brandSelectValue);
    }

    handleMustHaveSelectChange(mustHaveSelectValue){
        const { props } = this.props;
        let { fields: { mustHave }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)?
                              searchResult.paramsSearch :
                              null;
        if(paramsSearch != null)
            paramsSearch.mustHave = mustHaveSelectValue;

        mustHave.onChange(mustHaveSelectValue);
        props.inventoryActions.setDataMusthave(mustHaveSelectValue);
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

    handleArticleSelectedChanged = (ArticleSelectedValue) => {
        const { props } = this.props;
        const userLogin = JSON.parse(sessionStorage.logindata);
        const notUseSalesHierarchy = JSON.parse(userLogin.permission.notUseSalesHierarchy)
        let { fields: { article, collection, brand, metalType, metalColour, dominantStone
        }, searchResult } = props;
        let findFieldName = [];

        let paramsSearch = (searchResult.paramsSearch != null)
                                ? searchResult.paramsSearch
                                : null;

        if(props.options != undefined){
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
        }
        if (ArticleSelectedValue == '') {
            let salesHierarchyData = RemoveSalesHierarchy(notUseSalesHierarchy, hiTreeData, 'OBA');
            DeleteSalesHierarchy(salesHierarchyData)
        }else{
            let salesHierarchyData = RemoveSalesHierarchy(notUseSalesHierarchy, hiTreeData, 'OBA');
            ClearSalesHierarchy(salesHierarchyData);
        }
        article.onChange(ArticleSelectedValue);
        props.inventoryActions.setDataArticle(ArticleSelectedValue);
    }

    render() {
        const { props } = this.props;
        const yesNo = [{value: 1,label:'Yes'},{value: 0,label:'No'}];
        let { fields: {totalCostFrom, totalCostTo, totalUpdatedCostFrom, totalUpdatedCostTo,publicPriceFrom,
                  publicPriceTo, markupFrom, markupTo, grossWeightFrom, grossWeightTo, obaDimension
              },searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)?
                              searchResult.paramsSearch:
                              null;

        let dataDropDowntCollection = [];
        let dataDropDowntBrand = [];
        let dataDropDowntMetalType = [];
        let dataDropDowntMetalColour = [];
        let dataDropDowntDominantStone = [];
        let dataDropDowntArticle = [];

        const userLogin = JSON.parse(sessionStorage.logindata);

        InitModifyData(props);

        if(props.options != undefined){
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
            if (props.options.dominantStones) {
                dataDropDowntDominantStone.push(props.options.dominantStones.map(dominantStone =>{
                    return ({value: dominantStone.code,label:dominantStone.name});
                }))
                dataDropDowntDominantStone = dataDropDowntDominantStone[0];
            }
            if (props.options.articles) {
                let articleFilter = props.options.articles.filter(article =>{
                    return article.catalog == 'OBA'
                });
                dataDropDowntArticle.push(articleFilter.map(article =>{
                    return ({value: article.name,label:article.name});
                }))
                dataDropDowntArticle = dataDropDowntArticle[0];
            }
        }

        const notUseSalesHierarchy = JSON.parse(userLogin.permission.notUseSalesHierarchy)
        // delete hierarchy
        let salesHierarchyData = RemoveSalesHierarchy(notUseSalesHierarchy, TreeData, 'OBA');
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
                        <div className="col-lg-12  form-horizontal">
                            <div className="form-group">
                                <label className="col-lg-2 col-md-4 col-sm-4 control-label tooltiop-span">Product Hierarchy</label>
                                <div className="col-lg-9 col-md-7 col-sm-7 bd-box">
                                    <Tree data={salesHierarchyData} onClick={this.treeOnClick} onUnClick={this.treeOnUnClick} ref="treeview" />
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
                                <label className="col-sm-4 control-label">Item Weight (Grams)</label>
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

const tooltipArticle = (<Tooltip id="tooltip"><strong>Article Grouping</strong></Tooltip>);
const tooltipCollection = (<Tooltip id="tooltip"><strong>Search By Collection of the Product</strong></Tooltip>);
const tooltipBrand = (<Tooltip id="tooltip"><strong>Search By Brand (eg. Mouawad, Chopard, Cartier etc.)</strong></Tooltip>);
const tooltipMustHave = (<Tooltip id="tooltip"><strong>Search By Must Have (yes/no)</strong></Tooltip>);
const tooltipOBADimension = (<Tooltip id="tooltip"><strong>Search By Product Size</strong></Tooltip>);
const tooltipMetalType = (<Tooltip id="tooltip"><strong>Search By Metal Type of the Product</strong></Tooltip>);
const tooltipMetalColour = (<Tooltip id="tooltip"><strong>Search By Metal Color of the Product</strong></Tooltip>);

module.exports = SalesReportOBA;
