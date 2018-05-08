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
import SalesJewelry from '../inventory/inventory_jewelry';
import SalesWatch from '../inventory/inventory_watch';
import SalesAcc from '../inventory/inventory_acc';
import SalesOBA from '../inventory/inventory_oba';
import SalesSparePart from '../inventory/inventory_sparepart';
import SalesStone from '../inventory/inventory_stone';
import ResetSalesCategory from '../../utils/resetSalesCategory';
import ResetFormSalesReport from '../../utils/resertFormSalesReport';
import '../../../public/css/react-multi-select.css';
import '../../../public/css/input-calendar.css';

let productGroupSTO=false;
let productGroupJLY=false;
let productGroupWAT=false;
let productGroupACC=false;
let productGroupOBA=false;
let productGroupSPA=false;

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
        this.props.masterDataActions.get().then( () => {
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
        if(activeKey != this.props.activeTabCategory){
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
        if (this.props.IsAdvance) { // Hide
            this.setState({ hideAdvanceSearch: false });
            this.props.inventoryActions.setAdvance(false);
        } else { // Show
            this.setState({ hideAdvanceSearch: true });
            this.props.inventoryActions.setAdvance(true);
        }
        const userLogin = JSON.parse(sessionStorage.logindata);
        let { activeTabCategory } = this.props;
        let permission = userLogin.permission;
        let bitwise = Number(permission.productGroup).toString(2);
        let checkbits = bitwise.split('')
        let numberDiit = checkbits.length;
        let setActiveTab = activeTabCategory;

        checkbits.map(function(value,key) {
            switch (numberDiit) {
                case 1:
                    productGroupJLY = (value == '1')?true:false;
                    break;
                case 2:
                    if(key == 0){
                        productGroupWAT = (value == '1')?true:false;
                    }else if (key == 1) {
                        productGroupJLY = (value == '1')?true:false;
                    }
                    break;
                case 3:
                    if(key == 0){
                        productGroupSTO = (value == '1')?true:false;
                    }else if (key == 1) {
                        productGroupWAT = (value == '1')?true:false;
                    }else if (key == 2) {
                        productGroupJLY = (value == '1')?true:false;
                    }
                    break;
                case 4:
                    if(key == 0){
                        productGroupACC = (value == '1')?true:false;
                    }else if (key == 1) {
                        productGroupSTO = (value == '1')?true:false;
                    }else if (key == 2) {
                        productGroupWAT = (value == '1')?true:false;
                    }else if (key == 3) {
                        productGroupJLY = (value == '1')?true:false;
                    }
                    break;
                case 5:
                    if(key == 0){
                        productGroupOBA = (value == '1')?true:false;
                    }else if (key == 1) {
                        productGroupACC = (value == '1')?true:false;
                    }else if (key == 2) {
                        productGroupSTO = (value == '1')?true:false;
                    }else if (key == 3) {
                        productGroupWAT = (value == '1')?true:false;
                    }else if (key == 4) {
                        productGroupJLY = (value == '1')?true:false;
                    }
                    break;
                case 6:
                    if(key == 0){
                        productGroupSPA = (value == '1')?true:false;
                    }else if (key == 1) {
                        productGroupOBA = (value == '1')?true:false;
                    }else if (key == 2) {
                        productGroupACC = (value == '1')?true:false;
                    }else if (key == 3) {
                        productGroupSTO = (value == '1')?true:false;
                    }else if (key == 4) {
                        productGroupWAT = (value == '1')?true:false;
                    }else if (key == 5) {
                        productGroupJLY = (value == '1')?true:false;
                    }
                    break;
                default:
                    break;
            }
        });

        if (productGroupJLY) {
            setActiveTab = setActiveTab;
            this.setState({ beforeActiveTab: setActiveTab });
            this.props.inventoryActions.selectedTabCategory(setActiveTab);
        }else{
            if(productGroupWAT){
                setActiveTab = 2;
            }else if (productGroupSTO) {
                setActiveTab = 3;
            }else if (productGroupACC) {
                setActiveTab = 4;
            }else if (productGroupOBA) {
                setActiveTab = 5;
            }else if (productGroupSPA) {
                setActiveTab = 6;
            }else{
                this.props.inventoryActions.setAdvance(false);
            }
            activeTabCategory = setActiveTab;
            this.setState({ beforeActiveTab: setActiveTab });
            this.props.inventoryActions.selectedTabCategory(setActiveTab);
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
        this.props.inventoryActions.selectedTabCategory(activeTab);
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
        this.props.inventoryActions.selectedTabCategory(beforeActiveTab);
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

        this.props.itemActions.newSearch();

        fileName.html('');
        fileNameSetReference.html('');
        let { fields:{reference, setReference }} = this.props;
        reference.value = '';
        reference.onChange('');

        setReference.value = '';
        setReference.onChange('');

        ResetFormSalesReport(this);
        this.props.resetForm();
        this.refs.jewelry.treeOnUnClick();
        this.refs.watch.treeOnUnClick();
        this.refs.stone.treeOnUnClick();
        this.refs.accessory.treeOnUnClick();
        this.refs.oba.treeOnUnClick();
        this.refs.sparepart.treeOnUnClick();
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
        const { handleSubmit } = this.props;
        const { alert } = this.state;

        let btnMenu = [];
        if (this.props.searchResult.idEditSaveSearch != null) {
            if (isNotOwnerSharedSearch) {
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
                    <div className={`row ${this.props.IsAdvance ? '' : 'hidden'}` }>
                        <div className="col-sm-12">
                            <div className="panel">
                                <div className="panel-body">
                                    <div className="row margin-t-17 ">
                                        <Tabs defaultActiveKey={this.props.activeTabCategory}
                                            animation={false} id="uncontrolled-tab-example"
                                            activeKey={this.props.activeTabCategory}
                                            onSelect={this.tabsSelected}>
                                            <Tab eventKey={1} title="Jewelry" disabled={!productGroupJLY}>
                                                <SalesJewelry props={this.props} ref="jewelry"/>
                                            </Tab>
                                            <Tab eventKey={2} title="Watch" disabled={!productGroupWAT}>
                                                <SalesWatch props={this.props} ref="watch"/>
                                            </Tab>
                                            <Tab eventKey={3} title="Stone" disabled={!productGroupSTO}>
                                                <SalesStone props={this.props} ref="stone"/>
                                            </Tab>
                                            <Tab eventKey={4} title="ACCESSORY" disabled={!productGroupACC}>
                                                <SalesAcc props={this.props} ref="accessory"/>
                                            </Tab>
                                            <Tab eventKey={5} title="OBJECT OF ART" disabled={!productGroupOBA}>
                                                <SalesOBA props={this.props}  ref="oba"/>
                                            </Tab>
                                            <Tab eventKey={6} title="SPARE PART" disabled={!productGroupSPA}>
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
        IsAdvance: state.searchResult.IsAdvance,
        ArticleValue: state.searchResult.ArticleValue,
        activeTabCategory: state.searchResult.activeTabCategory,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        masterDataActions: bindActionCreators(Object.assign({}, masterDataActions), dispatch),
        inventoryActions: bindActionCreators(Object.assign({}, inventoryActions), dispatch),
        salesActions: bindActionCreators(Object.assign({}, salesActions), dispatch),
        itemActions: bindActionCreators(Object.assign({}, itemactions), dispatch)
    }
}
module.exports = reduxForm({
    form: 'SalesReport',
    fields: ['reference', 'description', 'certificatedNumber', 'sku', 'location', 'warehouse', 'dominantStone', 'customer', 'salesPersonName'
            , 'salesChannel', 'invoiceNo', 'invoiceDateFrom', 'invoiceDateTo', 'totalCostFrom', 'totalCostTo', 'totalUpdatedCostFrom', 'totalUpdatedCostTo'
            , 'retailPriceFrom', 'retailPriceTo', 'netSalesFrom', 'netSalesTo', 'marginFrom', 'marginTo', 'discountFrom', 'discountTo','stoneType','cut'
            , 'stoneProductHierarchy','lotNumber','cutGrade','color', 'colorGrade','clarity','lotQuantityFrom','lotQuantityTo','certificateAgency','polish'
            , 'symmetry','treatment','fluorescence','origin','jewelryCategory','brand','mustHave','ringSize','metalType','metalColour','collection'
            , 'watchCategory','limitedEdition','movement', 'dialIndex','dialColor','dialMetal','buckleType','strapType', 'strapColor','complication'
            , 'accessoryProductHierarchy','accessoryType', 'obaProductHierarchy','obaDimension', 'sparePartProductHierarchy','sparePartType','attachment'
            , 'setReference', 'searchName', 'jewelryProductHierarchy', 'markupFrom', 'markupTo','grossWeightFrom','grossWeightTo','watchProductHierarchy'
            , 'limitedEditionNumber','serialNumber','proDateFrom','proDateTo','caseDimensionFrom','caseDimensionTo','preciousMetalWeightFrom','preciousMetalWeightTo'
            ]

},mapStateToProps,mapDispatchToProps)(SalesReportMain);

// Pre-load the initially hidden SVGs
fancyStuff.forEach(t => {
    const x = new Image();
    x.src = `images/${t}.svg`;
});
