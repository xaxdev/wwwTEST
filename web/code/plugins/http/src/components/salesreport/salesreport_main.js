import React, { Component, PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import { bindActionCreators } from 'redux';
import { Tabs, Tab } from 'react-bootstrap';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import { Wrapper,Button,Menu,MenuItem,openMenu,closeMenu } from 'react-aria-menubutton';
import shallowCompare from 'react-addons-shallow-compare';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import SalesReportHeader from './salesreport_header';
import * as masterDataActions from '../../actions/masterdataaction';
import * as inventoryActions from '../../actions/inventoryactions';
import * as salesActions from '../../actions/salesaction';
import * as itemactions from '../../actions/itemactions';
import * as saveSearchAction from '../../actions/savesearchaction';
import SalesJewelry from './salesreport_jewelry';
import SalesWatch from './salesreport_watch';
import SalesAcc from './salesreport_acc';
import SalesOBA from './salesreport_oba';
import SalesSparePart from './salesreport_sparepart';
import SalesStone from './salesreport_stone';
import ResetSalesCategory from '../../utils/resetSalesCategory';
import ResetFormSalesReport from '../../utils/resertFormSalesReport';
import ModalSaveSearch from './modalSaveSearch';
import ValidateSaveSearch from './validatesavesearch';
import DeleteSalesHierarchy from './utils/delete_hierarchy_attr';
import '../../../public/css/react-multi-select.css';
import '../../../public/css/input-calendar.css';

let productGroupSalesSTO=false;
let productGroupSalesJLY=false;
let productGroupSalesWAT=false;
let productGroupSalesACC=false;
let productGroupSalesOBA=false;
let productGroupSalesSPA=false;

const fancyStuff = ['Save', 'Save As', 'Reset'];

class SalesReportMain extends Component {
    constructor(props) {
        super(props);

        this.advanceSearchClick = this.advanceSearchClick.bind(this);
        this.tabsSelected = this.tabsSelected.bind(this);
        this.renderAlertMessage = this.renderAlertMessage.bind(this);
        this.openModal = this.openModal.bind(this);
        this.confirmModal = this.confirmModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.resetCategory = this.resetCategory.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.resetFormSalesReport = this.resetFormSalesReport.bind(this);
        this.renderDialogSaveSearch = this.renderDialogSaveSearch.bind(this);
        this.renderSaveSearch = this.renderSaveSearch.bind(this);
        this.handleSaveSearch = this.handleSaveSearch.bind(this);

        this.state = {
            hideAdvanceSearch: true,
            data: 'test',
            alert: false,
            isOpen: true,
            activeTab: 1,
            beforeActiveTab: 1,
            showLoading: true,
            showDialogSaveSearch: false,
            selected: ''
        };
    }

    componentWillMount() {
        this.props.masterDataActions.getSold().then( () => {
            setTimeout(()=> {
                this.setState({ showLoading: false });
            },500)
        });
    }

    componentDidMount() {
        this.setState({ showLoading: true });
        this.refs.jewelry.treeOnUnClick();
        this.refs.watch.treeOnUnClick();
        this.refs.stone.treeOnUnClick();
        this.refs.accessory.treeOnUnClick();
        this.refs.oba.treeOnUnClick();
        this.refs.sparepart.treeOnUnClick();

        let numbers = document.querySelectorAll('input[type="number"]');

        for (let i in numbers) {
            if (numbers.hasOwnProperty(i)) {
                numbers[i].onkeydown = function(e) {
                    if(!((e.keyCode > 95 && e.keyCode < 106)
                      || (e.keyCode > 47 && e.keyCode < 58)
                      || e.keyCode == 8
                      || e.keyCode == 37
                      || e.keyCode == 39
                      || e.keyCode == 46
                      || e.keyCode == 110
                      || e.keyCode == 190
                      )) {
                          return false;
                      }
                }
            }
        }

        $(window).scroll(function() {
            let w = $('#page-wrapper').width();
            if ($(window).scrollTop() > 100) {
                $('#scroller').addClass('stuck');
            } else {
                $('#scroller').removeClass('stuck').css({'width':w});
            }
        });
        $( window ).resize(function() {
            let w = $('#page-wrapper').width();
            $('#scroller').removeClass('stuck').css({'width':w});
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    renderAlertMessage(){
        return(
            <div key={this.props.statusCode}>
                <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
                    <div className="modal-header">
                        <ModalClose onClick={this.hideModal}/>
                        <h1 className="modal-title">Message</h1>
                    </div>
                    <div className="modal-body">
                        <h3>Category have been changed</h3>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-default btn-radius btn-width" onClick={this.confirmModal}>
                            Ok
                        </button>
                        <button className="btn btn-default btn-radius btn-width" onClick={this.hideModal}>
                            Cancel
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }

    tabsSelected(activeKey) {
        if(activeKey != this.props.activeTabSalesCategory){
            this.setState({
                alert:true,
                isOpen: true,
                activeTab:activeKey
            });
        }
    }

    advanceSearchClick = e => {
        e.preventDefault();
        let btnadvance = document.querySelector('.btn-advance') // Using a class instead, see note below.
        btnadvance.classList.toggle('btn-activebtn');
        if (this.props.SalesIsAdvance) { // Hide
            this.setState({ hideAdvanceSearch: false });
            this.props.inventoryActions.setSalesAdvance(false);
        } else { // Show
            this.setState({ hideAdvanceSearch: true });
            this.props.inventoryActions.setSalesAdvance(true);
        }
        const userLogin = JSON.parse(sessionStorage.logindata);
        let { activeTabSalesCategory } = this.props;
        let permission = userLogin.permission;
        let bitwise = Number(permission.productGroupSales).toString(2);
        let checkbits = bitwise.split('')
        let numberDiit = checkbits.length;
        let setActiveTab = activeTabSalesCategory;

        checkbits.map(function(value,key) {
            switch (numberDiit) {
                case 1:
                    productGroupSalesJLY = (value == '1')?true:false;
                    break;
                case 2:
                    if(key == 0){
                        productGroupWAT = (value == '1')?true:false;
                    }else if (key == 1) {
                        productGroupSalesJLY = (value == '1')?true:false;
                    }
                    break;
                case 3:
                    if(key == 0){
                        productGroupSalesSTO = (value == '1')?true:false;
                    }else if (key == 1) {
                        productGroupSalesWAT = (value == '1')?true:false;
                    }else if (key == 2) {
                        productGroupSalesJLY = (value == '1')?true:false;
                    }
                    break;
                case 4:
                    if(key == 0){
                        productGroupSalesACC = (value == '1')?true:false;
                    }else if (key == 1) {
                        productGroupSalesSTO = (value == '1')?true:false;
                    }else if (key == 2) {
                        productGroupSalesWAT = (value == '1')?true:false;
                    }else if (key == 3) {
                        productGroupSalesJLY = (value == '1')?true:false;
                    }
                    break;
                case 5:
                    if(key == 0){
                        productGroupSalesOBA = (value == '1')?true:false;
                    }else if (key == 1) {
                        productGroupSalesACC = (value == '1')?true:false;
                    }else if (key == 2) {
                        productGroupSalesSTO = (value == '1')?true:false;
                    }else if (key == 3) {
                        productGroupSalesWAT = (value == '1')?true:false;
                    }else if (key == 4) {
                        productGroupSalesJLY = (value == '1')?true:false;
                    }
                    break;
                case 6:
                    if(key == 0){
                        productGroupSalesSPA = (value == '1')?true:false;
                    }else if (key == 1) {
                        productGroupSalesOBA = (value == '1')?true:false;
                    }else if (key == 2) {
                        productGroupSalesACC = (value == '1')?true:false;
                    }else if (key == 3) {
                        productGroupSalesSTO = (value == '1')?true:false;
                    }else if (key == 4) {
                        productGroupSalesWAT = (value == '1')?true:false;
                    }else if (key == 5) {
                        productGroupSalesJLY = (value == '1')?true:false;
                    }
                    break;
                default:
                    break;
            }
        });

        if (productGroupSalesJLY) {
            setActiveTab = setActiveTab;
            this.setState({ beforeActiveTab: setActiveTab });
            this.props.inventoryActions.selectedTabSalesCategory(setActiveTab);
        }else{
            if(productGroupSalesWAT){
                setActiveTab = 2;
            }else if (productGroupSalesSTO) {
                setActiveTab = 3;
            }else if (productGroupSalesACC) {
                setActiveTab = 4;
            }else if (productGroupSalesOBA) {
                setActiveTab = 5;
            }else if (productGroupSalesSPA) {
                setActiveTab = 6;
            }else{
                this.props.inventoryActions.setSalesAdvance(false);
            }
            activeTabSalesCategory = setActiveTab;
            this.setState({ beforeActiveTab: setActiveTab });
            this.props.inventoryActions.selectedTabSalesCategory(setActiveTab);
        }
    }

    openModal() {
        this.setState({ isOpen: true });
    }

    confirmModal(e){
        e.preventDefault();
        let { activeTab } = this.state;
        this.setState({
            isOpen: false,
            beforeActiveTab: activeTab
        });
        this.resetCategory();
        this.props.inventoryActions.selectedTabSalesCategory(activeTab);
        this.refs.jewelry.treeOnUnClick();
        this.refs.watch.treeOnUnClick();
        this.refs.stone.treeOnUnClick();
        this.refs.accessory.treeOnUnClick();
        this.refs.oba.treeOnUnClick();
        this.refs.sparepart.treeOnUnClick();
    }

    hideModal = (e) => {
        e.preventDefault();
        let { beforeActiveTab } = this.state;
        this.setState({
            isOpen: false,
            activeTab: beforeActiveTab
        });
        this.props.inventoryActions.selectedTabSalesCategory(beforeActiveTab);
    }

    resetCategory(){
        ResetSalesCategory(this);
        this.refs.jewelry.treeOnUnClick();
        this.refs.watch.treeOnUnClick();
        this.refs.stone.treeOnUnClick();
        this.refs.accessory.treeOnUnClick();
        this.refs.oba.treeOnUnClick();
        this.refs.sparepart.treeOnUnClick();
    }

    resetFormSalesReport() {
        let fileName = jQuery('#fileName');
        let fileNameSetReference = jQuery('#fileNameSetReference');

        this.props.itemActions.newSalesSearch();

        fileName.html('');
        fileNameSetReference.html('');
        let { fields:{reference, setReference }} = this.props;
        reference.value = '';
        reference.onChange('');

        setReference.value = '';
        setReference.onChange('');

        ResetFormSalesReport(this);
        this.props.resetForm();
        DeleteSalesHierarchy(this.refs.jewelry.refs.treeview.props.data)
        this.refs.jewelry.treeOnUnClick();
        this.refs.watch.treeOnUnClick();
        this.refs.stone.treeOnUnClick();
        this.refs.accessory.treeOnUnClick();
        this.refs.oba.treeOnUnClick();
        this.refs.sparepart.treeOnUnClick();
    }

    handleSaveSearch = _=> {
        const { fields: { searchName } } = this.props;
        (async _ => {
            await this.props.salesActions.setSubmitAction('save');
            this.setState({showDialogSaveSearch: false});
            this.props.handleSubmit();
        })()
    }

    handleSearch = _=> {
        const { fields: { searchName } } = this.props;
        searchName.onChange('search');
        searchName.value = 'search';
        (async _ => {
            await this.props.salesActions.setSubmitAction('search');
            this.props.handleSubmit();
        })()
    }

    renderSaveSearch = _=> {
        const { submitting } = this.props;
        return(<ModalSaveSearch onSubmit={this.handleSaveSearch}
            isOpen={this.state.showDialogSaveSearch}
            isClose={this.handleCloseDialogSaveSearch} props={this.props}/>);
    }

    renderDialogSaveSearch = _=> {
        this.setState({showDialogSaveSearch: true});
    }

    handleCloseDialogSaveSearch = _=> {
        this.setState({showDialogSaveSearch: false});
    }

    handleSelection = (data) =>{
        switch (data.activity.toLowerCase()) {
            case 'reset':
                this.resetFormSalesReport();
                break;
            default:
                this.renderDialogSaveSearch();
                break;
        }
    }

    render() {
        const { handleSubmit, activeTabSalesCategory } = this.props;
        const { alert } = this.state;
        const userLogin = JSON.parse(sessionStorage.logindata);
        const isNotOwnerSharedSalesSearch = this.props.searchResult.criteriaSalesSaveSearch != null ? this.props.searchResult.criteriaSalesSaveSearch.shared : false ;

        let permission = userLogin.permission;
        let bitwise = Number(permission.productGroupSales).toString(2);
        let checkbits = bitwise.split('')
        let numberDiit = checkbits.length;
        let setActiveTab = activeTabSalesCategory;

        checkbits.map(function(value,key){
            switch (numberDiit) {
                case 1:
                    productGroupSalesJLY = (value == '1')?true:false;
                    break;
                case 2:
                    if(key == 0){
                        productGroupSalesWAT = (value == '1')?true:false;
                    }else if (key == 1) {
                        productGroupSalesJLY = (value == '1')?true:false;
                    }
                    break;
                case 3:
                    if(key == 0){
                        productGroupSalesSTO = (value == '1')?true:false;
                    }else if (key == 1) {
                        productGroupSalesWAT = (value == '1')?true:false;
                    }else if (key == 2) {
                        productGroupSalesJLY = (value == '1')?true:false;
                    }
                    break;
                case 4:
                    if(key == 0){
                        productGroupSalesACC = (value == '1')?true:false;
                    }else if (key == 1) {
                        productGroupSalesSTO = (value == '1')?true:false;
                    }else if (key == 2) {
                        productGroupSalesWAT = (value == '1')?true:false;
                    }else if (key == 3) {
                        productGroupSalesJLY = (value == '1')?true:false;
                    }
                    break;
                case 5:
                    if(key == 0){
                        productGroupSalesOBA = (value == '1')?true:false;
                    }else if (key == 1) {
                        productGroupSalesACC = (value == '1')?true:false;
                    }else if (key == 2) {
                        productGroupSalesSTO = (value == '1')?true:false;
                    }else if (key == 3) {
                        productGroupSalesWAT = (value == '1')?true:false;
                    }else if (key == 4) {
                        productGroupSalesJLY = (value == '1')?true:false;
                    }
                    break;
                case 6:
                    if(key == 0){
                        productGroupSalesSPA = (value == '1')?true:false;
                    }else if (key == 1) {
                        productGroupSalesOBA = (value == '1')?true:false;
                    }else if (key == 2) {
                        productGroupSalesACC = (value == '1')?true:false;
                    }else if (key == 3) {
                        productGroupSalesSTO = (value == '1')?true:false;
                    }else if (key == 4) {
                        productGroupSalesWAT = (value == '1')?true:false;
                    }else if (key == 5) {
                        productGroupSalesJLY = (value == '1')?true:false;
                    }
                    break;
                default:
                    break;
            }
        });

        let btnMenu = [];

        if (this.props.searchResult.idEditSalesSaveSearch != null) {
            if (isNotOwnerSharedSalesSearch) {
                btnMenu = fancyStuff.filter(function(elem){
                    return elem != 'Save';
                });
            } else {
                btnMenu = fancyStuff.filter(function(elem){
                    return elem != 'Save As';
                });
            }
        }else{
            btnMenu = fancyStuff.filter(function(elem){
                return elem != 'Save';
            });
        }

        const fancyMenuItems = btnMenu.map((activity, i) => (
            <MenuItem
                value={{
                  activity,
                  somethingArbitrary: 'arbitrary',
                }}
                text={activity}
                key={i}
                className="FancyMB-menuItem" >
                <span className="FancyMB-keyword">
                    {activity}
                </span>
            </MenuItem>
        ));

        const menuInnards = menuState => {
            const menu = (!menuState.isOpen) ? false : (
                <div className="FancyMB-menu" key="menu">
                    {fancyMenuItems}
                </div>
            );
            return (
                <CSSTransitionGroup
                    transitionName="is"
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200} >
                    {menu}
                </CSSTransitionGroup>
            );
        };

        return (
            <form role="form">
                <div id="page-wrapper">
                    <div id="scroller" className="col-sm-12 bg-hearder bg-header-inventories">
                        <div className="col-sm-6 m-width-60 ft-white m-nopadding">
                            <h1>Sales Report</h1>
                        </div>
                        <div className="col-sm-6 m-width-40 m-nopadding">
                            <div className="text-right maring-t15">
                                <button type="button" className="btn btn-primary btn-radius" onClick={this.handleSearch} >Search</button>
                                <Wrapper onSelection={this.handleSelection.bind(this)}
                                    className="FancyMB" id="foo" >
                                    <Button className="FancyMB-trigger btn-radius">
                                        <span className="FancyMB-triggerInnards">
                                            <span className="FancyMB-triggerText">
                                                ...
                                            </span>
                                        </span>
                                    </Button>
                                    <Menu>
                                        {menuInnards}
                                    </Menu>
                                </Wrapper>
                            </div>
                        </div>
                    </div>
                    {/*Header search*/}
                    <SalesReportHeader props={this.props}/>
                    {/*Advance search*/}
                    <div className="row">
                        <div className="bg-while">
                            <button onClick={this.advanceSearchClick}
                                className="btn btn-primary btn-advance">
                                Advance Search
                            </button>
                        </div>
                    </div>
                    <div className={`row ${this.props.SalesIsAdvance ? '' : 'hidden'}` }>
                        <div className="col-sm-12">
                            <div className="panel">
                                <div className="panel-body">
                                    <div className="row margin-t-17 ">
                                        <Tabs defaultActiveKey={this.props.activeTabSalesCategory}
                                            animation={false} id="uncontrolled-tab-example"
                                            activeKey={this.props.activeTabSalesCategory}
                                            onSelect={this.tabsSelected}>
                                            <Tab eventKey={1} title="Jewelry" disabled={!productGroupSalesJLY}>
                                                <SalesJewelry props={this.props} ref="jewelry"/>
                                            </Tab>
                                            <Tab eventKey={2} title="Watch" disabled={!productGroupSalesWAT}>
                                                <SalesWatch props={this.props} ref="watch"/>
                                            </Tab>
                                            <Tab eventKey={3} title="Stone" disabled={!productGroupSalesSTO}>
                                                <SalesStone props={this.props} ref="stone"/>
                                            </Tab>
                                            <Tab eventKey={4} title="ACCESSORY" disabled={!productGroupSalesACC}>
                                                <SalesAcc props={this.props} ref="accessory"/>
                                            </Tab>
                                            <Tab eventKey={5} title="OBJECT OF ART" disabled={!productGroupSalesOBA}>
                                                <SalesOBA props={this.props}  ref="oba"/>
                                            </Tab>
                                            <Tab eventKey={6} title="SPARE PART" disabled={!productGroupSalesSPA}>
                                                <SalesSparePart props={this.props}  ref="sparepart"/>
                                            </Tab>
                                        </Tabs>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Advance search*/}
                </div>
                {alert?this.renderAlertMessage():''}
                {this.renderSaveSearch()}
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        options: state.users.options,
        searchResult:state.searchResult,
        WarehouseValue: state.searchResult.WarehouseValue,
        LocationValue: state.searchResult.LocationValue,
        DominantStoneValue: state.searchResult.DominantStoneValue,
        SalesChannelValue: state.searchResult.SalesChannelValue,
        SalesIsAdvance: state.searchResult.SalesIsAdvance,
        ArticleValue: state.searchResult.ArticleValue,
        activeTabSalesCategory: state.searchResult.activeTabSalesCategory,
        JewelryCategoryValue: state.searchResult.JewelryCategoryValue,
        CollectionValue: state.searchResult.CollectionValue,
        BrandValue: state.searchResult.BrandValue,
        MustHaveValue: state.searchResult.MustHaveValue,
        RingSizeValue: state.searchResult.RingSizeValue,
        MetalTypeValue: state.searchResult.MetalTypeValue,
        MetalColourValue: state.searchResult.MetalColourValue,
        ViewAsSet: state.searchResult.viewAsSet,
        WatchCategoryValue: state.searchResult.WatchCategoryValue,
        LimitedEditionValue: state.searchResult.LimitedEditionValue,
        MovementValue: state.searchResult.MovementValue,
        ComplicationValue: state.searchResult.ComplicationValue,
        DialMetalValue: state.searchResult.DialMetalValue,
        DialColorValue: state.searchResult.DialColorValue,
        DialIndexValue: state.searchResult.DialIndexValue,
        StrapColorValue: state.searchResult.StrapColorValue,
        StrapTypeValue: state.searchResult.StrapTypeValue,
        BuckleTypeValue: state.searchResult.BuckleTypeValue,
        ProductionDateFrom: state.searchResult.ProductionDateFrom,
        ProductionDateTo: state.searchResult.ProductionDateTo,
        StoneTypeValue: state.searchResult.StoneTypeValue,
        CutValue: state.searchResult.CutValue,
        CutGradeValue: state.searchResult.CutGradeValue,
        ColorValue: state.searchResult.ColorValue,
        ColorGradeValue: state.searchResult.ColorGradeValue,
        ClarityValue: state.searchResult.ClarityValue,
        CertificateAgencyValue: state.searchResult.CertificateAgencyValue,
        StoneCertificateDateFrom: state.searchResult.StoneCertificateDateFrom,
        StoneCertificateDateTo: state.searchResult.StoneCertificateDateTo,
        AccessoryTypeValue: state.searchResult.AccessoryTypeValue,
        SparePartTypeValue: state.searchResult.SparePartTypeValue,
        locationSales: state.users.locationSales,
        warehouseSales: state.users.warehouseSales,
        SaveSearchSalesHierarchy: state.searchResult.saveSearchSalesHierarchy,
        SearchAction: state.searchResult.SearchAction,
        InvoiceDateFrom: state.searchResult.InvoiceDateFrom,
        InvoiceDateTo: state.searchResult.InvoiceDateTo,
        SalesHierarchyValue: state.searchResult.SalesHierarchyValue,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        masterDataActions: bindActionCreators(Object.assign({}, masterDataActions), dispatch),
        inventoryActions: bindActionCreators(Object.assign({}, inventoryActions), dispatch),
        salesActions: bindActionCreators(Object.assign({}, salesActions), dispatch),
        itemActions: bindActionCreators(Object.assign({}, itemactions), dispatch),
        saveSearchAction: bindActionCreators(Object.assign({}, saveSearchAction), dispatch)
    }
}
module.exports = reduxForm({
    form: 'SalesReport',
    fields: ['reference', 'description', 'certificatedNumber', 'sku', 'location', 'warehouse', 'dominantStone', 'customer', 'salesPersonName'
            , 'salesChannel', 'invoiceNo', 'invoiceDateFrom', 'invoiceDateTo', 'totalCostFrom', 'totalCostTo', 'totalUpdatedCostFrom', 'totalUpdatedCostTo'
            , 'retailPriceFrom', 'retailPriceTo', 'netSalesFrom', 'netSalesTo', 'marginFrom', 'marginTo', 'discountFrom', 'discountTo', 'stoneType', 'cut'
            , 'stoneProductSalesHierarchy', 'lotNumber', 'cutGrade', 'color', 'colorGrade', 'clarity', 'lotQuantityFrom', 'lotQuantityTo', 'certificateAgency', 'polish'
            , 'symmetry', 'treatment', 'fluorescence', 'origin', 'jewelryCategory', 'brand', 'mustHave', 'ringSize', 'metalType', 'metalColour', 'collection'
            , 'watchCategory', 'limitedEdition', 'movement', 'dialIndex', 'dialColor', 'dialMetal', 'buckleType', 'strapType', 'strapColor', 'complication'
            , 'accessoryProductSalesHierarchy', 'accessoryType', 'obaProductSalesHierarchy', 'obaDimension', 'sparePartProductSalesHierarchy', 'sparePartType', 'attachment'
            , 'setReference', 'searchName', 'jewelryProductSalesHierarchy', 'markupFrom', 'markupTo', 'grossWeightFrom', 'grossWeightTo', 'watchProductSalesHierarchy'
            , 'limitedEditionNumber', 'serialNumber', 'proDateFrom', 'proDateTo', 'caseDimensionFrom', 'caseDimensionTo', 'preciousMetalWeightFrom'
            , 'preciousMetalWeightTo', 'article', 'viewAsSet', 'cerDateFrom', 'cerDateTo', 'totalCaratWeightFrom', 'totalCaratWeightTo', 'validateSearchName'
            ],
            validate: ValidateSaveSearch
},mapStateToProps,mapDispatchToProps)(SalesReportMain);

// Pre-load the initially hidden SVGs
fancyStuff.forEach(t => {
    const x = new Image();
    x.src = `images/${t}.svg`;
});
