import React, { Component, PropTypes } from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import Select from 'react-select';
import Calendar from 'react-input-calendar';
import moment from 'moment';
import InitModifyData from '../../utils/initModifyData';
import Tree from '../../utils/treeview/TreeArticle';
import TreeData from '../../utils/treeview/stone.json';
import RemoveHierarchy from './utils/remove_hierarchy';
import ClearHierarchy from './utils/clear_hierarchy';
import SearchHierarchy from './utils/search_hierarchy';
import DeleteHierarchy from './utils/delete_hierarchy_attr';

let hiTreeData = TreeData;

class InventoryStone extends Component {
    constructor(props) {
        super(props);

        let dateToday = new Date();
        let fromdate = `${dateToday.getMonth()+1}-${dateToday.getDate()}-${dateToday.getFullYear()}`;

        this.treeOnClick = this.treeOnClick.bind(this);
        this.treeOnUnClick = this.treeOnUnClick.bind(this);
        this.handlestoneTypeSelectChange = this.handlestoneTypeSelectChange.bind(this);
        this.handleCutSelectChange = this.handleCutSelectChange.bind(this);
        this.handleCutGradeSelectChange = this.handleCutGradeSelectChange.bind(this);
        this.handleColorSelectChange = this.handleColorSelectChange.bind(this);
        this.handleColorGradeSelectChange = this.handleColorGradeSelectChange.bind(this);
        this.handleClaritiesSelectChange = this.handleClaritiesSelectChange.bind(this);
        this.handleCertificateLabsSelectChange = this.handleCertificateLabsSelectChange.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handlePolishSelectChange = this.handlePolishSelectChange.bind(this);
        this.handleSymmetrySelectChange = this.handleSymmetrySelectChange.bind(this);
        this.handleTreatmentSelectChange = this.handleTreatmentSelectChange.bind(this);
        this.handleFluorescenceSelectChange = this.handleFluorescenceSelectChange.bind(this);
        this.handleOriginSelectChange = this.handleOriginSelectChange.bind(this);

        this.state = {
            data: TreeData,
            startDate: null,
            endDate: null,
            treeViewData:null
        };
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

        let { fields: { stoneProductHierarchy }, searchResult} = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch: null;
        if(paramsSearch != null)
            paramsSearch.stoneProductHierarchy = treeSelected;

        stoneProductHierarchy.onChange(treeSelected);
    }

    handlestoneTypeSelectChange(stoneTypeSelectValue){
        const { props } = this.props;
        let { fields: { stoneType }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch: null;
        if(paramsSearch != null)
            paramsSearch.stoneType = stoneTypeSelectValue;

        stoneType.onChange(stoneTypeSelectValue);
        props.inventoryActions.setDatastoneType(stoneTypeSelectValue);
    }

    handleCutSelectChange(CutSelectValue){
        const { props } = this.props;
        let { fields: { cut, CutValue }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch: null;
        if(paramsSearch != null)
            paramsSearch.cut = CutSelectValue;

        cut.onChange(CutSelectValue);
        props.inventoryActions.setDataCut(CutSelectValue);
    }

    handleCutGradeSelectChange(CutGradeSelectValue){
        const { props } = this.props;
        let { fields: { cutGrade, CutGradeValue }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch: null;
        if(paramsSearch != null)
            paramsSearch.cutGrade = CutGradeSelectValue;

        cutGrade.onChange(CutGradeSelectValue);
        props.inventoryActions.setDataCutGrade(CutGradeSelectValue);
    }

    handleColorSelectChange(ColorSelectValue){
        const { props } = this.props;
        let { fields: { color, ColorValue }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch: null;
        if(paramsSearch != null)
            paramsSearch.color = ColorSelectValue;

        color.onChange(ColorSelectValue);
        props.inventoryActions.setDataColor(ColorSelectValue);
    }

    handleColorGradeSelectChange(ColorGradeSelectValue){
        const { props } = this.props;
        let { fields: { colorGrade, ColorGradeValue }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch: null;
        if(paramsSearch != null)
            paramsSearch.colorGrade = ColorGradeSelectValue;

        colorGrade.onChange(ColorGradeSelectValue);
        props.inventoryActions.setDataColorGrade(ColorGradeSelectValue);
    }

    handleClaritiesSelectChange(ClaritySelectValue){
        const { props } = this.props;
        let { fields: { clarity, ClarityValue }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch: null;
        if(paramsSearch != null)
            paramsSearch.clarity = ClaritySelectValue;

        clarity.onChange(ClaritySelectValue);
        props.inventoryActions.setDataClarity(ClaritySelectValue);
    }

    handleCertificateLabsSelectChange(CertificateLabSelectValue){
        const { props } = this.props;
        let { fields: { certificateAgency, CertificateAgencyValue }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch: null;
        if(paramsSearch != null)
            paramsSearch.certificateAgency = CertificateLabSelectValue;

        certificateAgency.onChange(CertificateLabSelectValue);
        props.inventoryActions.setDataCertificateAgency(CertificateLabSelectValue);
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
        props.inventoryActions.setStoneCertificateDateFrom(startDate);
        props.inventoryActions.setStoneCertificateDateTo(endDate);
    }

    handleChangeStart(startDate){
        const { props } = this.props;
        let { fields: { cerDateFrom }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch: null;
        if(paramsSearch != null)
            paramsSearch.cerDateFrom = startDate;

        cerDateFrom.onChange(startDate);
        this.setState({startDate});
        this.handleChangeDate({ startDate });
    }

    handleChangeEnd(endDate){
        const { props } = this.props;
        let { fields: { cerDateTo }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch: null;
        if(paramsSearch != null)
            paramsSearch.cerDateTo = endDate;

        cerDateTo.onChange(endDate);
        this.setState({endDate});
        this.handleChangeDate({ endDate });
    }

    handlePolishSelectChange(PolishSelectValue){
        const { props } = this.props;
        let { fields: { polish }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch: null;
        if(paramsSearch != null)
            paramsSearch.polish = PolishSelectValue;

        polish.onChange(PolishSelectValue);
        props.inventoryActions.setDataPolish(PolishSelectValue);
    }

    handleSymmetrySelectChange(SymmetrySelectValue){
        const { props } = this.props;
        let { fields: { symmetry }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch: null;
        if(paramsSearch != null)
            paramsSearch.symmetry = SymmetrySelectValue;

        symmetry.onChange(SymmetrySelectValue);
        props.inventoryActions.setDataSymmetry(SymmetrySelectValue);
    }

    handleTreatmentSelectChange(TreatmentSelectValue){
        const { props } = this.props;
        let { fields: { treatment }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch: null;
        if(paramsSearch != null)
            paramsSearch.treatment = TreatmentSelectValue;

        treatment.onChange(TreatmentSelectValue);
        props.inventoryActions.setDataTreatment(TreatmentSelectValue);
    }

    handleFluorescenceSelectChange(FluorescenceSelectValue){
        const { props } = this.props;
        let { fields: { fluorescence }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch: null;
        if(paramsSearch != null)
            paramsSearch.fluorescence = FluorescenceSelectValue;

        fluorescence.onChange(FluorescenceSelectValue);
        props.inventoryActions.setDataFluorescence(FluorescenceSelectValue);
    }

    handleOriginSelectChange(OriginSelectValue){
        const { props } = this.props;
        let { fields: { origin }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch: null;
        if(paramsSearch != null)
            paramsSearch.origin = OriginSelectValue;

        origin.onChange(OriginSelectValue);
        props.inventoryActions.setDataOrigin(OriginSelectValue);
    }

    handleArticleSelectedChanged = (ArticleSelectedValue) => {
        const { props } = this.props;
        const userLogin = JSON.parse(sessionStorage.logindata);
        const notUseHierarchy = JSON.parse(userLogin.permission.notUseHierarchy)
        let { fields: { article, stoneType, cut, cutGrade, color, colorGrade, clarity, certificateAgency, polish, symmetry, treatment, fluorescence,
            origin
        }, searchResult } = props;
        let findFieldName = [];

        let paramsSearch = (searchResult.paramsSearch != null) ? searchResult.paramsSearch : null;

        if(props.options != undefined){
            if (props.options.stoneType) {
                findFieldName = []
                findFieldName = props.options.stoneType.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.stoneType = findFieldName;

                stoneType.onChange(findFieldName);
                props.inventoryActions.setDatastoneType(findFieldName);
            }
            if (props.options.cut) {
                findFieldName = []
                findFieldName = props.options.cut.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.cut = findFieldName;

                cut.onChange(findFieldName);
                props.inventoryActions.setDataCut(findFieldName);
            }
            if (props.options.cutGrades) {
                findFieldName = []
                findFieldName = props.options.cutGrades.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.cutGrade = findFieldName;

                cutGrade.onChange(findFieldName);
                props.inventoryActions.setDataCutGrade(findFieldName);
            }
            if (props.options.colors) {
                findFieldName = []
                findFieldName = props.options.colors.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.color = findFieldName;

                color.onChange(findFieldName);
                props.inventoryActions.setDataColor(findFieldName);
            }
            if (props.options.colorGrades) {
                findFieldName = []
                findFieldName = props.options.colorGrades.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.colorGrade = findFieldName;

                colorGrade.onChange(findFieldName);
                props.inventoryActions.setDataColorGrade(findFieldName);
            }
            if (props.options.clarities) {
                findFieldName = []
                findFieldName = props.options.clarities.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.clarity = findFieldName;

                clarity.onChange(findFieldName);
                props.inventoryActions.setDataClarity(findFieldName);
            }
            if (props.options.certificateAgencys) {
                findFieldName = []
                findFieldName = props.options.certificateAgencys.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.certificateAgency = findFieldName;

                certificateAgency.onChange(findFieldName);
                props.inventoryActions.setDataCertificateAgency(findFieldName);
            }
            if (props.options.polishs) {
                findFieldName = []
                findFieldName = props.options.polishs.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.polish = findFieldName;

                polish.onChange(findFieldName);
                props.inventoryActions.setDataPolish(findFieldName);
            }
            if (props.options.symmetries) {
                findFieldName = []
                findFieldName = props.options.symmetries.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.symmetry = findFieldName;

                symmetry.onChange(findFieldName);
                props.inventoryActions.setDataSymmetry(findFieldName);
            }
            if (props.options.treatments) {
                findFieldName = []
                findFieldName = props.options.treatments.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.treatment = findFieldName;

                treatment.onChange(findFieldName);
                props.inventoryActions.setDataTreatment(findFieldName);
            }
            if (props.options.fluorescences) {
                findFieldName = []
                findFieldName = props.options.fluorescences.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.fluorescence = findFieldName;

                fluorescence.onChange(findFieldName);
                props.inventoryActions.setDataFluorescence(findFieldName);
            }
            if (props.options.origins) {
                findFieldName = []
                findFieldName = props.options.origins.filter((item) => {
                    if (item.name == ArticleSelectedValue) {
                        return item.name
                    }
                }).map((item) => { return item.code });

                if(paramsSearch != null)
                    paramsSearch.origin = findFieldName;

                origin.onChange(findFieldName);
                props.inventoryActions.setDataOrigin(findFieldName);
            }
        }
        if (ArticleSelectedValue == '') {
            let hierarchyData = RemoveHierarchy(notUseHierarchy, hiTreeData, 'STO');
            DeleteHierarchy(hierarchyData)
        }else{
            let hierarchyData = RemoveHierarchy(notUseHierarchy, hiTreeData, 'STO');
            ClearHierarchy(hierarchyData);
        }
        article.onChange(ArticleSelectedValue);
        props.inventoryActions.setDataArticle(ArticleSelectedValue);
    }

    render() {
        const { props } = this.props;
        let { fields: { lotNumber, lotQuantityFrom, lotQuantityTo, totalCaratWeightFrom, totalCaratWeightTo,
            totalCostFrom, totalCostTo, totalUpdatedCostFrom, totalUpdatedCostTo, publicPriceFrom,publicPriceTo,
            markupFrom, markupTo, certificatedNumber, cerDateFrom, cerDateTo, polish, symmetry, treatment,
            fluorescence, origin
        }, searchResult } = props;

        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch: null;

        let dataDropDowntstoneType = [];
        let dataDropDowntCut = [];
        let dataDropDowntCutGrade = [];
        let dataDropDowntColor = [];
        let dataDropDowntColorGrade = [];
        let dataDropDowntClarity = [];
        let dataDropDowntCertificateLab = [];
        let dataDropDowntPolish = [];
        let dataDropDowntSymmetry = [];
        let dataDropDowntTreatment = [];
        let dataDropDowntFluorescence = [];
        let dataDropDowntOrigin = [];
        let dataDropDowntArticle = [];

        const userLogin = JSON.parse(sessionStorage.logindata);

        InitModifyData(props);

        if(props.options != undefined){
            if (props.options.stoneType) {
                dataDropDowntstoneType.push(props.options.stoneType.map(stoneType =>{
                    return ({value: stoneType.code,label:stoneType.name});
                }))
                dataDropDowntstoneType = dataDropDowntstoneType[0];
            }
            if (props.options.cut) {
                dataDropDowntCut.push(props.options.cut.map(cut =>{
                    return ({value: cut.code,label:cut.code + ' [' + cut.name + ']'});
                }))
                dataDropDowntCut = dataDropDowntCut[0];
            }
            if (props.options.cutGrades) {
                dataDropDowntCutGrade.push(props.options.cutGrades.map(cutGrade =>{
                    return ({value: cutGrade.code,label:cutGrade.name});
                }))
                dataDropDowntCutGrade = dataDropDowntCutGrade[0];
            }
            if (props.options.colors) {
                dataDropDowntColor.push(props.options.colors.map(color =>{
                    return ({value: color.code,label:color.code + ' [' + color.name + ']'});
                }))
                dataDropDowntColor = dataDropDowntColor[0];
            }
            if (props.options.colorGrades) {
                dataDropDowntColorGrade.push(props.options.colorGrades.map(colorGrade =>{
                    if (colorGrade.disabled){
                        return {value: colorGrade.code,label:colorGrade.name,disabled: true};
                    }else{
                        return {value: colorGrade.code,label:colorGrade.name};
                    }
                }))
                dataDropDowntColorGrade = dataDropDowntColorGrade[0];
            }
            if (props.options.clarities) {
                dataDropDowntClarity.push(props.options.clarities.map(clarity =>{
                    return ({value: clarity.code,label:clarity.name});
                }))
                dataDropDowntClarity = dataDropDowntClarity[0];
            }
            if (props.options.certificateAgencys) {
                dataDropDowntCertificateLab.push(props.options.certificateAgencys.map(certificateAgency =>{
                    return ({value: certificateAgency.code,label:certificateAgency.code + ' [' + certificateAgency.name + ']'});
                }))
                dataDropDowntCertificateLab = dataDropDowntCertificateLab[0];
            }
            if (props.options.polishs) {
                dataDropDowntPolish.push(props.options.polishs.map(polish =>{
                    return ({value: polish.code,label:polish.name});
                }))
                dataDropDowntPolish = dataDropDowntPolish[0];
            }
            if (props.options.symmetries) {
                dataDropDowntSymmetry.push(props.options.symmetries.map(symmetry =>{
                    return ({value: symmetry.code,label:symmetry.name});
                }))
                dataDropDowntSymmetry = dataDropDowntSymmetry[0];
            }
            if (props.options.treatments) {
                dataDropDowntTreatment.push(props.options.treatments.map(treatment =>{
                    return ({value: treatment.code,label:treatment.name});
                }))
                dataDropDowntTreatment = dataDropDowntTreatment[0];
            }
            if (props.options.fluorescences) {
                dataDropDowntFluorescence.push(props.options.fluorescences.map(fluorescence =>{
                    return ({value: fluorescence.code,label:fluorescence.name});
                }))
                dataDropDowntFluorescence = dataDropDowntFluorescence[0];
            }
            if (props.options.origins) {
                dataDropDowntOrigin.push(props.options.origins.map(origin =>{
                    return ({value: origin.code,label:origin.code + ' [' + origin.name + ']'});
                }))
                dataDropDowntOrigin = dataDropDowntOrigin[0];
            }
            if (props.options.articles) {
                let articleFilter = props.options.articles.filter(article =>{
                    return article.catalog == 'STO'
                });
                dataDropDowntArticle.push(articleFilter.map(article =>{
                    return ({value: article.name,label:article.name});
                }))
                dataDropDowntArticle = dataDropDowntArticle[0];
            }
        }

        const notUseHierarchy = JSON.parse(userLogin.permission.notUseHierarchy)
        // delete hierarchy
        let hierarchyData = RemoveHierarchy(notUseHierarchy, TreeData, 'STO');
        if (props.ArticleValue.length != 0) {
            hierarchyData = SearchHierarchy(hierarchyData, props.ArticleValue);
        }

        return (
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
                                    <Select simpleValue value={props.ArticleValue} placeholder="Select your Article Grouping"
                                        options={dataDropDowntArticle} onChange={this.handleArticleSelectedChanged} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12  form-horizontal">
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
                        <div className="col-lg-6  form-horizontal">
                            <div className="form-group">
                                <label className="col-sm-4 control-label tooltiop-span">Stone Type
                                    <OverlayTrigger placement="top" overlay={tooltipStoneType}>
                                        <img src="/images/alphanumeric.png" />
                                    </OverlayTrigger>
                                </label>
                                <div className="col-sm-7">
                                    <Select multi simpleValue value={props.StoneTypeValue} placeholder="Select your Stone Type"
                                        options={dataDropDowntstoneType} onChange={this.handlestoneTypeSelectChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-4 control-label tooltiop-span">Cut (Shape)
                                    <OverlayTrigger placement="top" overlay={tooltipCut}>
                                        <img src="/images/alphanumeric.png" />
                                    </OverlayTrigger>
                                </label>
                                <div className="col-sm-7">
                                    <Select multi simpleValue value={props.CutValue} placeholder="Select your Cut (Shape)"
                                        options={dataDropDowntCut} onChange={this.handleCutSelectChange} />
                                </div>
                            </div>
                            <div className="form-group hidden" >
                                <label className="col-sm-4 control-label tooltiop-span">Cut Grade
                                    <OverlayTrigger placement="top" overlay={tooltipCutGrade}>
                                        <img src="/images/alphanumeric.png" />
                                    </OverlayTrigger>
                                </label>
                                <div className="col-sm-7">
                                    <Select multi simpleValue value={props.CutGradeValue} placeholder="Select your Cut Grade"
                                        options={dataDropDowntCutGrade} onChange={this.handleCutGradeSelectChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-4 control-label tooltiop-span">Color
                                    <OverlayTrigger placement="top" overlay={tooltipColor}>
                                        <img src="/images/alphanumeric.png" />
                                    </OverlayTrigger>
                                </label>
                                <div className="col-sm-7">
                                    <Select multi simpleValue value={props.ColorValue} placeholder="Select your Color"
                                        options={dataDropDowntColor} onChange={this.handleColorSelectChange} />
                                </div>
                            </div>
                            <div className="form-group hidden">
                                <label className="col-sm-4 control-label tooltiop-span">Color Grade
                                    <OverlayTrigger placement="top" overlay={tooltipColorGrade}>
                                        <img src="/images/alphanumeric.png" />
                                    </OverlayTrigger>
                                </label>
                                <div className="col-sm-7">
                                    <Select multi simpleValue value={props.ColorGradeValue} placeholder="Select your Color Grade"
                                        options={dataDropDowntColorGrade} onChange={this.handleColorGradeSelectChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-4 control-label tooltiop-span">Clarity
                                    <OverlayTrigger placement="top" overlay={tooltipClarity}>
                                        <img src="/images/alphanumeric.png" />
                                    </OverlayTrigger>
                                </label>
                                <div className="col-sm-7">
                                    <Select multi simpleValue value={props.ClarityValue} placeholder="Select your Clarity"
                                        options={dataDropDowntClarity} onChange={this.handleClaritiesSelectChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-4 control-label">Lot Number</label>
                                <div className="col-sm-7">
                                    <input type="text" className="form-control" {...lotNumber}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-4 control-label">Lot Quantity</label>
                                <div className="col-sm-7">
                                    <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                                    <div className="col-sm-4 nopadding">
                                        <input type="number" className="form-control" {...lotQuantityFrom}/>
                                    </div>
                                    <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                                    <div className="col-sm-4 nopadding">
                                        <input type="number" className="form-control" {...lotQuantityTo}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 form-horizontal">
                            <div className="form-group">
                                <label className="col-sm-4 control-label">Total Carat Weight</label>
                                <div className="col-sm-7">
                                    <label className="col-sm-2 control-label padding-l font-nor">From: </label>
                                    <div className="col-sm-4 nopadding">
                                        <input type="number" className="form-control" {...totalCaratWeightFrom}/>
                                    </div>
                                    <label className="col-sm-2 control-label font-nor m-margin-t10 m-nopadding">To: </label>
                                    <div className="col-sm-4 nopadding">
                                        <input type="number" className="form-control" {...totalCaratWeightTo}/>
                                    </div>
                                </div>
                            </div>
                            <div className={`form-group ${(userLogin.permission.price == 'All' || userLogin.permission.price == 'Updated') ?
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
                                <label className="col-sm-4 control-label">Certificate Number</label>
                                <div className="col-sm-7">
                                    <input type="text" className="form-control" {...certificatedNumber}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-4 control-label tooltiop-span">Laboratory
                                </label>
                                <div className="col-sm-7">
                                    <Select multi simpleValue value={props.CertificateAgencyValue} placeholder="Select your Laboratory"
                                        options={dataDropDowntCertificateLab} onChange={this.handleCertificateLabsSelectChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-4 control-label">Certificate Date</label>
                                <div className="col-sm-7">
                                    <label className="col-sm-2 padding-l font-nor margin-t7">From: </label>
                                    <div className="col-sm-10 nopadding">
                                        <Calendar format="MM-DD-YYYY" closeOnSelect = {true} onChange={this.handleChangeStart}
                                            date={(paramsSearch != null)?paramsSearch.cerDateFrom:props.StoneCertificateDateFrom} />
                                    </div>
                                    <label className="col-sm-2 control-label padding-l font-nor m-margin-t10 m-nopadding">To: </label>
                                    <div className="col-sm-10 nopadding">
                                        <Calendar format="MM-DD-YYYY" closeOnSelect = {true} onChange={this.handleChangeEnd}
                                            date={(paramsSearch != null)?paramsSearch.cerDateTo:props.StoneCertificateDateTo} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group hidden">
                                <label className="col-sm-4 control-label">Polish</label>
                                <div className="col-sm-7">
                                    <Select multi simpleValue value={props.PolishValue} placeholder="Select your Polish"
                                        options={dataDropDowntPolish} onChange={this.handlePolishSelectChange}/>
                                </div>
                            </div>
                            <div className="form-group hidden">
                                <label className="col-sm-4 control-label">Symmetry</label>
                                <div className="col-sm-7">
                                    <Select multi simpleValue value={props.SymmetryValue} placeholder="Select your Symmetry"
                                        options={dataDropDowntSymmetry} onChange={this.handleSymmetrySelectChange}/>
                                </div>
                            </div>
                            <div className="form-group hidden">
                                <label className="col-sm-4 control-label">Treatment</label>
                                <div className="col-sm-7">
                                    <Select multi simpleValue value={props.TreatmentValue} placeholder="Select your Treatment"
                                        options={dataDropDowntTreatment} onChange={this.handleTreatmentSelectChange}/>
                                </div>
                            </div>
                            <div className="form-group hidden">
                                <label className="col-sm-4 control-label">Fluorescence</label>
                                <div className="col-sm-7">
                                    <Select multi simpleValue value={props.FluorescenceValue} placeholder="Select your Fluorescence"
                                        options={dataDropDowntFluorescence} onChange={this.handleFluorescenceSelectChange}/>
                                </div>
                            </div>
                            <div className="form-group hidden">
                                <label className="col-sm-4 control-label">Origin</label>
                                <div className="col-sm-7">
                                    <Select multi simpleValue value={props.OriginValue} placeholder="Select your Origin"
                                        options={dataDropDowntOrigin} onChange={this.handleOriginSelectChange}/>
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
const tooltipStoneType = (<Tooltip id="tooltip"><strong>Stone Type!</strong></Tooltip>);
const tooltipCut = (<Tooltip id="tooltip"><strong>Cut (Shape)!</strong></Tooltip>);
const tooltipCutGrade = (<Tooltip id="tooltip"><strong>Cut Grade!</strong></Tooltip>);
const tooltipColor = (<Tooltip id="tooltip"><strong>Color!</strong></Tooltip>);
const tooltipColorGrade = (<Tooltip id="tooltip"><strong>Color Grade!</strong></Tooltip>);
const tooltipClarity = (<Tooltip id="tooltip"><strong>Clarity!</strong></Tooltip>);
const tooltipLotNumber = (<Tooltip id="tooltip"><strong>Lot Number!</strong></Tooltip>);
const tooltipLotQuantity = (<Tooltip id="tooltip"><strong>Lot Quantity!</strong></Tooltip>);
const tooltipTotalCaratWeight = (<Tooltip id="tooltip"><strong>Total Carat Weight!</strong></Tooltip>);
const tooltipCertificateNumber = (<Tooltip id="tooltip"><strong>Certificate Number!</strong></Tooltip>);
const tooltipCertificateAgency = (<Tooltip id="tooltip"><strong>Certificate Agency!</strong></Tooltip>);
const tooltipCertificateDate = (<Tooltip id="tooltip"><strong>Certificate Date!</strong></Tooltip>);
const tooltipTotalCost = (<Tooltip id="tooltip"><strong>Cost Price (USD)!</strong></Tooltip>);
const tooltipTotalUpdatedCost = (<Tooltip id="tooltip"><strong>Updated Cost (USD)!</strong></Tooltip>);
const tooltipPublicPrice = (<Tooltip id="tooltip"><strong>Price (USD)!</strong></Tooltip>);
const tooltipMarkup = (<Tooltip id="tooltip"><strong>Markup (Times)!</strong></Tooltip>);

module.exports = InventoryStone;
