import React, { Component, PropTypes } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import Select from 'react-select';
import Calendar from 'react-input-calendar';
import moment from 'moment';
import InitModifyData from '../../utils/initModifyData';
import Tree from '../../utils/treeview/TreeArticle';
import TreeData from '../../utils/treeview/watch.json';
import ClearHierarchy from './utils/clear_hierarchy';
import RemoveHierarchy from './utils/remove_hierarchy';
import SearchHierarchy from './utils/search_hierarchy';
import DeleteHierarchy from './utils/delete_hierarchy_attr';

let hiTreeData = TreeData;

class InventoryWatch extends Component {
    constructor(props) {
        super(props);
        let dateToday = new Date();
        let fromdate = `${dateToday.getMonth()+1}-${dateToday.getDate()}-${dateToday.getFullYear()}`;

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
        this.handleArticleSelectedChanged = this.handleArticleSelectedChanged.bind(this);

        this.state = {
            startDate: null,
            endDate: null,
            treeViewData:null
        }
    }

    componentDidMount = _ =>{
        (async () => {
            const { props } = this.props;
            let { fields: { jewelryProductHierarchy }, searchResult } = props;
            if(props.SaveSearchHierarchy != null){
                  await props.inventoryActions.setHierarchy(props.SaveSearchHierarchy);
                  this.refs.treeview.handleChange(props.SaveSearchHierarchy);
            }
        })()
    }

    componentWillReceiveProps(nextProps) {
        const { props } = this.props;
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
        if( this.state.treeViewData != null){
            this.state.treeViewData[0].checked = false;
            this.state.treeViewData[0].key = this.state.treeViewData[0].code;
            this.refs.treeview.handleChange(this.state.treeViewData[0]);
            this.props.props.inventoryActions.setHierarchy(this.state.treeViewData)
        }else{
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
        let { fields: { watchProductHierarchy }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)?
                              searchResult.paramsSearch :
                              null;
        if(paramsSearch != null)
            paramsSearch.watchProductHierarchy = treeSelected;

        watchProductHierarchy.onChange(treeSelected);
    }

    handleWatchCategorySelectChange(watchCategorySelectValue){
        const { props } = this.props;
        let { fields: { watchCategory }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)?
                              searchResult.paramsSearch :
                              null;
        if(paramsSearch != null)
            paramsSearch.watchCategory = watchCategorySelectValue;

        watchCategory.onChange(watchCategorySelectValue);
        props.inventoryActions.setDataWatchCategory(watchCategorySelectValue);
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

    handleLimitedEditionSelectChange(limitedEditionSelectValue){
        const { props } = this.props;
        let { fields: { limitedEdition }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)?
                              searchResult.paramsSearch :
                              null;
        if(paramsSearch != null)
            paramsSearch.limitedEdition = limitedEditionSelectValue;

        limitedEdition.onChange(limitedEditionSelectValue);
        props.inventoryActions.setDataLimitedEdition(limitedEditionSelectValue);
    }

    handleMovementSelectChange(movementSelectValue){
        const { props } = this.props;
        let { fields: { movement }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)?
                              searchResult.paramsSearch :
                              null;
        if(paramsSearch != null)
            paramsSearch.movement = movementSelectValue;

        movement.onChange(movementSelectValue);
        props.inventoryActions.setDataMovement(movementSelectValue);
    }

    handleChangeDate ({ startDate, endDate }) {
        const { props } = this.props;
        let startDateM = (typeof startDate !== 'undefined')? moment(startDate,'MM-DD-YYYY') : moment(this.state.startDate,'MM-DD-YYYY');
        let endDateM = (typeof endDate !== 'undefined')? moment(endDate,'MM-DD-YYYY') : moment(this.state.endDate,'MM-DD-YYYY');

        if (startDateM.isAfter(endDateM)) {
            let temp = startDate || this.state.startDate;
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
        props.inventoryActions.setProductionDateFrom(startDate);
        props.inventoryActions.setProductionDateTo(endDate);
    }

    handleChangeStart(startDate){
        const { props } = this.props;
        let { fields: { proDateFrom }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)?
                              searchResult.paramsSearch :
                              null;
        if(paramsSearch != null)
            paramsSearch.proDateFrom = startDate;

        proDateFrom.onChange(startDate);
        this.setState({startDate});
        this.handleChangeDate({ startDate });
    }

    handleChangeEnd(endDate){
        const { props } = this.props;
        let { fields: { proDateTo }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)?
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
        let { fields: { dialIndex }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)?
                              searchResult.paramsSearch :
                              null;
        if(paramsSearch != null)
            paramsSearch.dialIndex = dialIndexSelectValue;

        dialIndex.onChange(dialIndexSelectValue);
        props.inventoryActions.setDataDialIndex(dialIndexSelectValue);
    }

    handleDialColorSelectChange(dialColorSelectValue){
        const { props } = this.props;
        let { fields: { dialColor }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)?
                              searchResult.paramsSearch :
                              null;
        if(paramsSearch != null)
            paramsSearch.dialColor = dialColorSelectValue;

        dialColor.onChange(dialColorSelectValue);
        props.inventoryActions.setDataDialColor(dialColorSelectValue);
    }

    handleDialMetalSelectChange(dialMetalSelectValue){
        const { props } = this.props;
        let { fields: { dialMetal }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)?
                              searchResult.paramsSearch :
                              null;
        if(paramsSearch != null)
            paramsSearch.dialMetal = dialMetalSelectValue;

        dialMetal.onChange(dialMetalSelectValue);
        props.inventoryActions.setDataDialMetal(dialMetalSelectValue);
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

    handleStrapTypeSelectChange(strapTypeSelectValue){
        const { props } = this.props;
        let { fields: { strapType }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)?
                              searchResult.paramsSearch :
                              null;
        if(paramsSearch != null)
            paramsSearch.strapType = strapTypeSelectValue;

        strapType.onChange(strapTypeSelectValue);
        props.inventoryActions.setDataStrapType(strapTypeSelectValue);
    }

    handleStrapColorSelectChange(strapColorSelectValue){
        const { props } = this.props;
        let { fields: { strapColor }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)?
                              searchResult.paramsSearch :
                              null;
        if(paramsSearch != null)
            paramsSearch.strapColor = strapColorSelectValue;

        strapColor.onChange(strapColorSelectValue);
        props.inventoryActions.setDataStrapColor(strapColorSelectValue);
    }

    handleComplicationSelectChange(complicationSelectValue){
        const { props } = this.props;
        let { fields: { complication }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)?
                              searchResult.paramsSearch :
                              null;
        if(paramsSearch != null)
            paramsSearch.complication = complicationSelectValue;

        complication.onChange(complicationSelectValue);
        props.inventoryActions.setDataComplication(complicationSelectValue);
    }

    handleArticleSelectedChanged = (ArticleSelectedValue) => {
        const { props } = this.props;
        const userLogin = JSON.parse(sessionStorage.logindata);
        const notUseHierarchy = JSON.parse(userLogin.permission.notUseHierarchy)
        let { fields: { article, watchCategory, collection, brand, metalType, metalColour, dominantStone,
            limitedEdition, movement, dialIndex, dialColor, dialMetal, buckleType, strapType, strapColor,
            complication }, searchResult } = props;
        let findFieldName = [];

        let paramsSearch = (searchResult.paramsSearch != null)
                                ? searchResult.paramsSearch
                                : null;

        if(props.options != undefined){
            if (props.options.watchCategories) {
                findFieldName = []
                findFieldName = props.options.watchCategories.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.watchCategory = findFieldName;

                watchCategory.onChange(findFieldName);
                props.inventoryActions.setDataWatchCategory(findFieldName);
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
            if (props.options.movements) {
                findFieldName = []
                findFieldName = props.options.movements.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.movement = findFieldName;

                movement.onChange(findFieldName);
                props.inventoryActions.setDataMovement(findFieldName);
            }
            if (props.options.dialIndexs) {
                findFieldName = []
                findFieldName = props.options.dialIndexs.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.dialIndex = findFieldName;

                dialIndex.onChange(findFieldName);
                props.inventoryActions.setDataDialIndex(findFieldName);
            }
            if (props.options.dialColors) {
                findFieldName = []
                findFieldName = props.options.dialColors.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.dialColor = findFieldName;

                dialColor.onChange(findFieldName);
                props.inventoryActions.setDataDialColor(findFieldName);
            }
            if (props.options.dialMetals) {
                findFieldName = []
                findFieldName = props.options.dialMetals.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.dialMetal = findFieldName;

                dialMetal.onChange(findFieldName);
                props.inventoryActions.setDataDialMetal(findFieldName);
            }
            if (props.options.buckleTypes) {
                findFieldName = []
                findFieldName = props.options.buckleTypes.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.buckleType = findFieldName;

                buckleType.onChange(findFieldName);
                props.inventoryActions.setDataBuckleType(findFieldName);
            }
            if (props.options.strapTypes) {
                findFieldName = []
                findFieldName = props.options.strapTypes.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.strapType = findFieldName;

                strapType.onChange(findFieldName);
                props.inventoryActions.setDataStrapType(findFieldName);
            }
            if (props.options.strapColors) {
                findFieldName = []
                findFieldName = props.options.strapColors.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.strapColor = findFieldName;

                strapColor.onChange(findFieldName);
                props.inventoryActions.setDataStrapColor(findFieldName);
            }
            if (props.options.complications) {
                findFieldName = []
                findFieldName = props.options.complications.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.complication = findFieldName;

                complication.onChange(findFieldName);
                props.inventoryActions.setDataComplication(findFieldName);
            }
        }
        if (ArticleSelectedValue == '') {
            let hierarchyData = RemoveHierarchy(notUseHierarchy, hiTreeData, 'WAT');
            DeleteHierarchy(hierarchyData)
        }else{
            let hierarchyData = RemoveHierarchy(notUseHierarchy, hiTreeData, 'WAT');
            ClearHierarchy(hierarchyData);
        }
        article.onChange(ArticleSelectedValue);
        props.inventoryActions.setDataArticle(ArticleSelectedValue);
    }

    render() {
        const { props } = this.props;
        const yesNo = [{value: 1,label:'Yes'},{value: 0,label:'No'}];
        let { fields: {limitedEditionNumber, serialNumber, totalCostFrom, totalCostTo, totalUpdatedCostFrom,
              totalUpdatedCostTo, publicPriceFrom, publicPriceTo, markupFrom, markupTo, grossWeightFrom,
              grossWeightTo, caseDimensionFrom, caseDimensionTo, preciousMetalWeightFrom, preciousMetalWeightTo
        }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)?
                              searchResult.paramsSearch:
                              null;

        let dataDropDowntWatchCategory = [];
        let dataDropDowntCollection = [];
        let dataDropDowntBrand = [];
        let dataDropDowntMetalType = [];
        let dataDropDowntMetalColour = [];
        let dataDropDowntDominantStone = [];
        let dataDropDowntMovement = [];
        let dataDropDowntDialIndex = [];
        let dataDropDowntDialColor = [];
        let dataDropDowntDialMetal = [];
        let dataDropDowntBuckleType = [];
        let dataDropDowntStrapType = [];
        let dataDropDowntStrapColor = [];
        let dataDropDowntComplication = [];
        let dataDropDowntArticle = [];

        const userLogin = JSON.parse(sessionStorage.logindata);

        InitModifyData(props);

        if(props.options != undefined){
            if (props.options.watchCategories) {
                dataDropDowntWatchCategory.push(props.options.watchCategories.map(watchCategory =>{
                    return ({value: watchCategory.code,label:watchCategory.name});
                }))
                dataDropDowntWatchCategory = dataDropDowntWatchCategory[0];
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
            if (props.options.movements) {
                dataDropDowntMovement.push(props.options.movements.map(movement =>{
                    return ({value: movement.code,label:movement.name});
                }))
                dataDropDowntMovement = dataDropDowntMovement[0];
            }
            if (props.options.dialIndexs) {
                dataDropDowntDialIndex.push(props.options.dialIndexs.map(dialIndex =>{
                    return ({value: dialIndex.code,label:dialIndex.code + ' [' + dialIndex.name + ']'});
                }))
                dataDropDowntDialIndex = dataDropDowntDialIndex[0];
            }
            if (props.options.dialColors) {
                dataDropDowntDialColor.push(props.options.dialColors.map(dialColor =>{
                    return ({value: dialColor.code,label:dialColor.code + ' [' + dialColor.name + ']'});
                }))
                dataDropDowntDialColor = dataDropDowntDialColor[0];
            }
            if (props.options.dialMetals) {
                dataDropDowntDialMetal.push(props.options.dialMetals.map(dialMetal =>{
                    return ({value: dialMetal.code,label:dialMetal.code + ' [' + dialMetal.name + ']'});
                }))
                dataDropDowntDialMetal = dataDropDowntDialMetal[0];
            }
            if (props.options.buckleTypes) {
                dataDropDowntBuckleType.push(props.options.buckleTypes.map(buckleType =>{
                    return ({value: buckleType.code,label:buckleType.code + ' [' + buckleType.name + ']'});
                }))
                dataDropDowntBuckleType = dataDropDowntBuckleType[0];
            }
            if (props.options.strapTypes) {
                dataDropDowntStrapType.push(props.options.strapTypes.map(strapType =>{
                    return ({value: strapType.code,label:strapType.code + ' [' + strapType.name + ']'});
                }))
                dataDropDowntStrapType = dataDropDowntStrapType[0];
            }
            if (props.options.strapColors) {
                dataDropDowntStrapColor.push(props.options.strapColors.map(strapColor =>{
                    return ({value: strapColor.code,label:strapColor.code + ' [' + strapColor.name + ']'});
                }))
                dataDropDowntStrapColor = dataDropDowntStrapColor[0];
            }
            if (props.options.complications) {
                dataDropDowntComplication.push(props.options.complications.map(complication =>{
                    return ({value: complication.code,label:complication.name});
                }))
                dataDropDowntComplication = dataDropDowntComplication[0];
            }
            if (props.options.articles) {
                let articleFilter = props.options.articles.filter(article =>{
                    return article.catalog == 'WAT'
                });
                dataDropDowntArticle.push(articleFilter.map(article =>{
                    return ({value: article.name,label:article.name});
                }))
                dataDropDowntArticle = dataDropDowntArticle[0];
            }
        }

        const notUseHierarchy = JSON.parse(userLogin.permission.notUseHierarchy)
        // delete hierarchy
        let hierarchyData = RemoveHierarchy(notUseHierarchy, TreeData, 'WAT');
        if (props.ArticleValue.length != 0) {
            hierarchyData = SearchHierarchy(hierarchyData, props.ArticleValue);
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
                                <label className="col-sm-4 control-label">Production Date</label>
                                <div className="col-sm-7">
                                    <label className="col-sm-2 padding-l font-nor margin-t7">From: </label>
                                    <div className="col-sm-10 nopadding">
                                        <Calendar
                                            format="MM-DD-YYYY"
                                            date={(paramsSearch != null)?paramsSearch.proDateFrom:props.ProductionDateFrom}
                                            closeOnSelect = {true}
                                            onChange={this.handleChangeStart} />
                                    </div>
                                    <label className="col-sm-2 control-label padding-l font-nor m-margin-t10 m-nopadding">To: </label>
                                    <div className="col-sm-10 nopadding">
                                        <Calendar
                                            format="MM-DD-YYYY"
                                            date={(paramsSearch != null)?paramsSearch.proDateTo:props.ProductionDateTo}
                                            closeOnSelect = {true}
                                            onChange={this.handleChangeEnd} />
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const tooltipArticle = (<Tooltip id="tooltip"><strong>Article Grouping</strong></Tooltip>);
const tooltipHierarchy = (<Tooltip id="tooltip"><strong>Product Hierarchy!</strong></Tooltip>);
const tooltipWatchCategory = (<Tooltip id="tooltip"><strong>Search By Type of the Watch (eg. Ladies Watch, Gents Watch etc.)</strong></Tooltip>);
const tooltipCollection = (<Tooltip id="tooltip"><strong>Search By Collection (eg. Grand Ellipse Royale, Grand Ellipse Reveil, Grand Ellipse Lady etc.) of the Watch</strong></Tooltip>);
const tooltipBrand = (<Tooltip id="tooltip"><strong>Seacrh By Brand (eg. Mouawad, Chopard, Cartier etc.) </strong></Tooltip>);
const tooltipMustHave = (<Tooltip id="tooltip"><strong>Search By Must Have (yes/no)</strong></Tooltip>);
const tooltipMetalType = (<Tooltip id="tooltip"><strong>Search By Metal Type of the Watch</strong></Tooltip>);
const tooltipMetalColour = (<Tooltip id="tooltip"><strong>Search By Metal Color of the Watch</strong></Tooltip>);
const tooltipLimitedEdition = (<Tooltip id="tooltip"><strong>Search Limited Edition Watches</strong></Tooltip>);
const tooltipLimitedEditionNumber = (<Tooltip id="tooltip"><strong>Limited Edition Number!</strong></Tooltip>);
const tooltipSerialNumber = (<Tooltip id="tooltip"><strong>Serial Number!</strong></Tooltip>);
const tooltipMovement = (<Tooltip id="tooltip"><strong>Search By Movement of the Watch (eg. Quartz, Automatic, Manual etc.) </strong></Tooltip>);
const tooltipTotalCost = (<Tooltip id="tooltip"><strong>Actual Cost (USD)!</strong></Tooltip>);
const tooltipTotalUpdatedCost = (<Tooltip id="tooltip"><strong>Updated Cost (USD)!</strong></Tooltip>);
const tooltipPublicPrice = (<Tooltip id="tooltip"><strong>Public Price (USD)!</strong></Tooltip>);
const tooltipMarkup = (<Tooltip id="tooltip"><strong>Markup (Times)!</strong></Tooltip>);
const tooltipGrossWeight = (<Tooltip id="tooltip"><strong>Gross Weight (Grams)!</strong></Tooltip>);
const tooltipProductionDate = (<Tooltip id="tooltip"><strong>Production Date</strong></Tooltip>);
const tooltipDialIndex = (<Tooltip id="tooltip"><strong>Search By Dial Index of the Watch (eg. Diamond on Index, Ruby on Index etc.)</strong></Tooltip>);
const tooltipDialColor = (<Tooltip id="tooltip"><strong>Search By Dial Color of the Watch (eg. Black, Blue, Brown etc.)</strong></Tooltip>);
const tooltipDialMetal = (<Tooltip id="tooltip"><strong>Search By Dial Metal of the Watch (eg. Gold, Rose Gold, Steel etc.)</strong></Tooltip>);
const tooltipBuckleType = (<Tooltip id="tooltip"><strong>Search By Buckle Type of the Watch</strong></Tooltip>);
const tooltipStrapType = (<Tooltip id="tooltip"><strong>Search By Strap Type of the Watch (Steel, Leather, Rubber etc.)</strong></Tooltip>);
const tooltipStrapColor = (<Tooltip id="tooltip"><strong>Search By Strap Color of the Watch (eg. Blue, Black, Brown etc.)</strong></Tooltip>);
const tooltipComplication = (<Tooltip id="tooltip"><strong>Search By Complication of the Watch</strong></Tooltip>);

module.exports = InventoryWatch;
