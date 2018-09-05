import React, { Component, PropTypes }from 'react';
import { reduxForm, reset } from 'redux-form';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Tabs, Tab } from 'react-bootstrap';
import { Wrapper,Button,Menu,MenuItem,openMenu,closeMenu } from 'react-aria-menubutton';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import * as inventoryActions from '../../actions/inventoryactions';
import * as itemactions from '../../actions/itemactions';
import * as masterDataActions from '../../actions/masterdataaction';
import * as saveSearchAction from '../../actions/savesearchaction';
import shallowCompare from 'react-addons-shallow-compare';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import UserModal from '../user/user_modal';
import AlertMessage from '../../utils/alertMessage';
import ResetFormMain from '../../utils/resertFormMain';
import ResetCategory from '../../utils/resetCategory';
import InventoryHeader from './inventory_header';
import InventoryStone from './inventory_stone';
import InventoryJewelry from './inventory_jewelry';
import InventoryGemStone from './inventory_gemstone';
import InventoryWatch from './inventory_watch';
import InventoryAcc from './inventory_acc';
import InventoryOBA from './inventory_oba';
import InventorySparePart from './inventory_sparepart';
import ModalSaveSearch from './modalSaveSearch';
import ValidateSaveSearch from './validatesavesearch';
import jQuery from 'jquery';
import '../../../public/css/react-multi-select.css';
import '../../../public/css/input-calendar.css';

let Loading = require('react-loading');
let productGroupSTO=false;
let productGroupJLY=false;
let productGroupWAT=false;
let productGroupACC=false;
let productGroupOBA=false;
let productGroupSPA=false;

const fancyStuff = ['Save', 'Save As', 'Reset'];

class InventoryFilter extends Component {
    constructor(props) {
        super(props);

        this.advanceSearchClick = this.advanceSearchClick.bind(this);
        this.tabsSelected = this.tabsSelected.bind(this);
        this.renderAlertMessage = this.renderAlertMessage.bind(this);

        this.openModal = this.openModal.bind(this);
        this.confirmModal = this.confirmModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.resetCategory = this.resetCategory.bind(this);
        this.resetFormInventory = this.resetFormInventory.bind(this);
        this.handleSaveSearch = this.handleSaveSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.renderDialogSaveSearch = this.renderDialogSaveSearch.bind(this);
        this.renderSaveSearch = this.renderSaveSearch.bind(this);

        this.state = {
            hideAdvanceSearch: true,
            hideStoneSearch: false,
            hideJewelrySearch: true,
            hideWatchSearch: true,
            hideGemStoneSearch: true,
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
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        let that = this;
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

    advanceSearchClick(e) {
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
        ResetCategory(this);
        this.refs.jewelry.treeOnUnClick();
        this.refs.watch.treeOnUnClick();
        this.refs.stone.treeOnUnClick();
        this.refs.accessory.treeOnUnClick();
        this.refs.oba.treeOnUnClick();
        this.refs.sparepart.treeOnUnClick();
    }

    resetFormInventory() {
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

        ResetFormMain(this);
        this.props.resetForm();
        this.props.inventoryActions.setSpecialDiscount(0);
        if(this.props.HierarchyValue != null){
            if(this.props.SearchAction == 'New'){
                if(this.props.HierarchyValue.length != 0){
                    delete this.props.HierarchyValue[0].checked;
                }
                this.props.inventoryActions.setHierarchy(this.props.HierarchyValue);
            }else{
            }
        }else{
        }
        this.refs.jewelry.treeOnUnClick();
        this.refs.watch.treeOnUnClick();
        this.refs.stone.treeOnUnClick();
        this.refs.accessory.treeOnUnClick();
        this.refs.oba.treeOnUnClick();
        this.refs.sparepart.treeOnUnClick();
        this.refs.gemstone.resetDate();
    }

    handleSaveSearch = _=> {
        const { fields: { searchName } } = this.props;
        (async _ => {
            await this.props.inventoryActions.setSubmitAction('save');
            this.setState({showDialogSaveSearch: false});
            this.props.handleSubmit();
        })()
    }

    handleSearch = _=> {
        const { fields: { searchName } } = this.props;
        searchName.onChange('search');
        searchName.value = 'search';
        (async _ => {
            await this.props.inventoryActions.setSubmitAction('search');
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
                this.resetFormInventory();
                break;
            default:
                this.renderDialogSaveSearch();
                break;
        }
    }

    handleArticleSelected = (data) =>{
        const { fields: { gemstone_stoneType,gemstone_cut,gemstone_color,gemstone_clarity,gemstone_symmetry,gemstone_origin,gemstone_certificateAgency }, searchResult } = this.props;
        let findFieldName = [];
        const expr = data.toLowerCase();
        let paramsSearch = (searchResult.paramsSearch != null)? searchResult.paramsSearch : null;

        if(this.props.options != undefined){
            if (this.props.options.gemstoneStoneType) {
                findFieldName = []
                findFieldName = this.props.options.gemstoneStoneType.filter((item) => {
                    if (item.name.toLowerCase().indexOf(expr) != -1) {
                        return item.name
                    }
                }).map((item) => { return item.code });
                if (findFieldName.length != 0) {
                    if(paramsSearch != null)
                        paramsSearch.gemstone_stoneType = data;

                    gemstone_stoneType.onChange(data);
                    this.props.inventoryActions.setDatastoneType(data);
                }
            }
            if (this.props.options.cut) {
                findFieldName = []
                findFieldName = this.props.options.cut.filter((item) => {
                    if (item.name.toLowerCase().indexOf(expr) != -1) {
                        return item.name
                    }
                }).map((item) => { return item.code });
                if (findFieldName.length != 0) {
                    if(paramsSearch != null)
                        paramsSearch.gemstone_cut = data;

                    gemstone_cut.onChange(data);
                    this.props.inventoryActions.setDataCut(data);
                }
            }
            if (this.props.options.colors) {
                findFieldName = []
                findFieldName = this.props.options.colors.filter((item) => {
                    if (item.name.toLowerCase().indexOf(expr) != -1) {
                        return item.name
                    }
                }).map((item) => { return item.code });
                if (findFieldName.length != 0) {
                    if(paramsSearch != null)
                        paramsSearch.gemstone_color = data;

                    gemstone_color.onChange(data);
                    this.props.inventoryActions.setDataColor(data);
                }
            }
            if (this.props.options.clarities) {
                findFieldName = []
                findFieldName = this.props.options.clarities.filter((item) => {
                    if (item.name.toLowerCase().indexOf(expr) != -1) {
                        return item.name
                    }
                }).map((item) => { return item.code });
                if (findFieldName.length != 0) {
                    if(paramsSearch != null)
                        paramsSearch.gemstone_clarity = data;

                    gemstone_clarity.onChange(data);
                    this.props.inventoryActions.setDataClarity(data);
                }
            }
            if (this.props.options.symmetries) {
                findFieldName = []
                findFieldName = this.props.options.symmetries.filter((item) => {
                    if (item.name.toLowerCase().indexOf(expr) != -1) {
                        return item.name
                    }
                }).map((item) => { return item.code });
                if (findFieldName.length != 0) {
                    if(paramsSearch != null)
                        paramsSearch.gemstone_symmetry = data;

                    gemstone_symmetry.onChange(data);
                    this.props.inventoryActions.setDataSymmetry(data);
                }
            }
            if (this.props.options.origins) {
                findFieldName = []
                findFieldName = this.props.options.origins.filter((item) => {
                    if (item.name.toLowerCase().indexOf(expr) != -1) {
                        return item.name
                    }
                }).map((item) => { return item.code });
                if (findFieldName.length != 0) {
                    if(paramsSearch != null)
                        paramsSearch.gemstone_origin = data;

                    gemstone_origin.onChange(data);
                    this.props.inventoryActions.setDataOrigin(data);
                }
            }
            if (this.props.options.certificateAgencys) {
                findFieldName = []
                findFieldName = this.props.options.certificateAgencys.filter((item) => {
                    if (item.name.toLowerCase().indexOf(expr) != -1) {
                        return item.name
                    }
                }).map((item) => { return item.code });
                if (findFieldName.length != 0) {
                    if(paramsSearch != null)
                        paramsSearch.gemstone_certificateAgency = data;

                    gemstone_certificateAgency.onChange(data);
                    this.props.inventoryActions.setDataCertificateAgency(data);
                }
            }
        }
    }

    render() {
        let { handleSubmit, resetForm, submitting, reset, activeTabCategory } = this.props;

        const { alert } = this.state;

        const userLogin = JSON.parse(sessionStorage.logindata);
        const isNotOwnerSharedSearch = this.props.searchResult.criteriaSaveSearch != null
                                        ? this.props.searchResult.criteriaSaveSearch.shared
                                        : false ;

        let permission = userLogin.permission;
        let bitwise = Number(permission.productGroup).toString(2);
        let checkbits = bitwise.split('')
        let numberDiit = checkbits.length;
        let setActiveTab = activeTabCategory;

        checkbits.map(function(value,key){
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
                <div className="alert"></div>
                <div className={`${this.state.showLoading ? '' : 'hidden'}` }>
                    <center>
                        <br/><br/><br/><br/><br/><br/>
                        <Loading type="spin" color="#202020" width="10%"/>
                    </center>
                    <br/><br/><br/><br/><br/><br/>
                </div>
                <div id="page-wrapper" className={`${this.state.showLoading ? 'hidden' : ''}` }>
                    <div id="scroller" className="col-sm-12 bg-hearder bg-header-inventories">
                        <div className="col-sm-6 m-width-60 ft-white m-nopadding">
                            <h1>Inventory Report</h1>
                        </div>
                        <div className="col-sm-6 m-width-40 m-nopadding">
                            <div className="text-right maring-t15">
                                <button type="button" className="btn btn-primary btn-radius"
                                    disabled={submitting} onClick={this.handleSearch}>Search</button>
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
                    <InventoryHeader props={this.props}/>
                    {/*Advance search*/}
                    <div className="row">
                        <div className="bg-while">
                            <button disabled={submitting}  onClick={this.advanceSearchClick}
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
                                                <InventoryJewelry props={this.props} ref="jewelry" handleArticleSelected={this.handleArticleSelected}/>
                                                    <div className="panel-body">
                                                    <div className="row gemstone-bar">
                                                        <h2 disabled={submitting} onClick={this.gemStoneSearchClick}>
                                                            Gemstone Search
                                                        </h2>
                                                    </div>
                                                    <div>
                                                        <InventoryGemStone props={this.props}/>
                                                    </div>
                                                </div>
                                            </Tab>
                                            <Tab eventKey={2} title="Watch" disabled={!productGroupWAT}>
                                                <InventoryWatch props={this.props} ref="watch" handleArticleSelected={this.handleArticleSelected}/>
                                                <div className="panel-body">
                                                    <div className="row gemstone-bar">
                                                        <h2 disabled={submitting} onClick={this.gemStoneSearchClick}>
                                                            Gemstone Search
                                                        </h2>
                                                    </div>
                                                    <div>
                                                        <InventoryGemStone props={this.props}/>
                                                    </div>
                                                </div>
                                            </Tab>
                                            <Tab eventKey={3} title="Stone" disabled={!productGroupSTO}>
                                                <InventoryStone props={this.props} ref="stone" handleArticleSelected={this.handleArticleSelected}/>
                                            </Tab>
                                            <Tab eventKey={4} title="ACCESSORY" disabled={!productGroupACC}>
                                                <InventoryAcc props={this.props} ref="accessory" handleArticleSelected={this.handleArticleSelected}/>
                                                <div className="panel-body">
                                                    <div className="row gemstone-bar">
                                                        <h2 disabled={submitting} onClick={this.gemStoneSearchClick}>
                                                            Gemstone Search
                                                        </h2>
                                                    </div>
                                                    <div>
                                                        <InventoryGemStone props={this.props}/>
                                                    </div>
                                                </div>
                                            </Tab>
                                            <Tab eventKey={5} title="OBJECT OF ART" disabled={!productGroupOBA}>
                                                <InventoryOBA props={this.props}  ref="oba" handleArticleSelected={this.handleArticleSelected}/>
                                                <div className="panel-body">
                                                    <div className="row gemstone-bar">
                                                        <h2 disabled={submitting} onClick={this.gemStoneSearchClick}>
                                                            Gemstone Search
                                                        </h2>
                                                    </div>
                                                    <div>
                                                        <InventoryGemStone props={this.props}/>
                                                    </div>
                                                </div>
                                            </Tab>
                                            <Tab eventKey={6} title="SPARE PART" disabled={!productGroupSPA}>
                                                <InventorySparePart props={this.props}  ref="sparepart" handleArticleSelected={this.handleArticleSelected}/>
                                                <div className="panel-body">
                                                    <div className="row gemstone-bar">
                                                        <h2 disabled={submitting} onClick={this.gemStoneSearchClick}>
                                                            Gemstone Search
                                                        </h2>
                                                    </div>
                                                    <div>
                                                        <InventoryGemStone props={this.props} ref="gemstone"/>
                                                    </div>
                                                </div>
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
        );
    }
}
InventoryFilter.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
}
function mapStateToProps(state) {
    return {
        searchResult:state.searchResult,
        options: state.users.options,
        HierarchyValue: state.searchResult.HierarchyValue,
        WarehouseValue: state.searchResult.WarehouseValue,
        LocationValue: state.searchResult.LocationValue,
        StoneTypeValue: state.searchResult.StoneTypeValue,
        CutValue: state.searchResult.CutValue,
        CutGradeValue: state.searchResult.CutGradeValue,
        ColorValue: state.searchResult.ColorValue,
        ColorGradeValue: state.searchResult.ColorGradeValue,
        ClarityValue: state.searchResult.ClarityValue,
        GemStoneTypeValue: state.searchResult.GemStoneTypeValue,
        PolishValue: state.searchResult.PolishValue,
        SymmetryValue: state.searchResult.SymmetryValue,
        TreatmentValue: state.searchResult.TreatmentValue,
        FluorescenceValue: state.searchResult.FluorescenceValue,
        OriginValue: state.searchResult.OriginValue,
        JewelryCategoryValue: state.searchResult.JewelryCategoryValue,
        CollectionValue: state.searchResult.CollectionValue,
        BrandValue: state.searchResult.BrandValue,
        MustHaveValue: state.searchResult.MustHaveValue,
        RingSizeValue: state.searchResult.RingSizeValue,
        DominantStoneValue: state.searchResult.DominantStoneValue,
        MetalTypeValue: state.searchResult.MetalTypeValue,
        MetalColourValue: state.searchResult.MetalColourValue,
        CutValue: state.searchResult.CutValue,
        CertificateAgencyValue: state.searchResult.CertificateAgencyValue,
        ComplicationValue: state.searchResult.ComplicationValue,
        StrapColorValue: state.searchResult.StrapColorValue,
        StrapTypeValue: state.searchResult.StrapTypeValue,
        BuckleTypeValue: state.searchResult.BuckleTypeValue,
        DialMetalValue: state.searchResult.DialMetalValue,
        DialColorValue: state.searchResult.DialColorValue,
        DialIndexValue: state.searchResult.DialIndexValue,
        MovementValue: state.searchResult.MovementValue,
        LimitedEditionValue: state.searchResult.LimitedEditionValue,
        WatchCategoryValue: state.searchResult.WatchCategoryValue,
        activeTabCategory: state.searchResult.activeTabCategory,
        IsAdvance: state.searchResult.IsAdvance,
        AccessoryTypeValue: state.searchResult.AccessoryTypeValue,
        SparePartTypeValue: state.searchResult.SparePartTypeValue,
        SearchAction: state.searchResult.SearchAction,
        GemCertificateDateFrom: state.searchResult.GemCertificateDateFrom,
        GemCertificateDateTo: state.searchResult.GemCertificateDateTo,
        StoneCertificateDateFrom: state.searchResult.StoneCertificateDateFrom,
        StoneCertificateDateTo: state.searchResult.StoneCertificateDateTo,
        ProductionDateFrom: state.searchResult.ProductionDateFrom,
        ProductionDateTo: state.searchResult.ProductionDateTo,
        SaveSearchHierarchy: state.searchResult.saveSearchHierarchy,
        ViewAsSet: state.searchResult.viewAsSet,
        ArticleValue: state.searchResult.ArticleValue,
        SpecialDiscount: state.searchResult.specialDiscount,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        inventoryActions: bindActionCreators(Object.assign({}, inventoryActions), dispatch),
        itemActions: bindActionCreators(Object.assign({}, itemactions), dispatch),
        masterDataActions: bindActionCreators(Object.assign({}, masterDataActions), dispatch),
        saveSearchAction: bindActionCreators(Object.assign({}, saveSearchAction), dispatch)
    }
}
module.exports = reduxForm(
    {
        form: 'Inventory',
        fields: ['reference','description','venderReference','vendorName','certificatedNumber','sku','location',
        'warehouse','attachment','stoneType','cut','stoneProductHierarchy','lotNumber','cutGrade','color',
        'colorGrade','clarity','lotQuantityFrom','lotQuantityTo','totalCaratWeightFrom','totalCaratWeightTo',
        'totalCostFrom','totalCostTo','totalUpdatedCostFrom','totalUpdatedCostTo','publicPriceFrom','publicPriceTo',
        'markupFrom','markupTo', 'certificatedNumber','certificateAgency','cerDateFrom','cerDateTo','polish',
        'symmetry','treatment','fluorescence','origin','jewelryProductHierarchy','collection','totalCostFrom',
        'totalCostTo','totalUpdatedCostFrom','totalUpdatedCostTo','publicPriceFrom','publicPriceTo','markupFrom',
        'markupTo','grossWeightFrom','grossWeightTo','setReference','jewelryCategory','brand','mustHave','ringSize',
        'dominantStone','metalType','metalColour','gemstone_stoneType','gemstone_cut','gemstone_cutGrade',
        'gemstone_color','gemstone_clarity','gemstone_stoneCostFrom','gemstone_stoneCostTo','gemstone_totalCaratWeightFrom',
        'gemstone_totalCaratWeightTo','gemstone_quantityFrom','gemstone_quantityTo','gemstone_certificatedNumber',
        'gemstone_cerDateFrom','gemstone_cerDateTo','gemstone_polish','gemstone_symmetry','gemstone_treatment',
        'gemstone_fluorescence','gemstone_origin','gemstone_certificateAgency','watchProductHierarchy','watchCategory',
        'collection','brand','mustHave','metalType','dialColor','metalColour','dominantStone','limitedEdition',
        'limitedEditionNumber','serialNumber','dialIndex','movement','totalCostFrom','totalCostTo',
        'totalUpdatedCostFrom','totalUpdatedCostTo','complication','publicPriceFrom','publicPriceTo','markupFrom',
        'markupFrom','markupTo','grossWeightFrom','grossWeightTo','proDateFrom','proDateTo','caseDimensionFrom',
        'caseDimensionTo','dialMetal','preciousMetalWeightFrom','preciousMetalWeightTo','buckleType','strapType',
        'strapColor','accessoryProductHierarchy','accessoryType','obaProductHierarchy','obaDimension','searchName',
        'sparePartProductHierarchy','sparePartType','validateSearchName','viewAsSet','article','specialDiscount'
        ],
        validate: ValidateSaveSearch
    },mapStateToProps,mapDispatchToProps
)(InventoryFilter);

// Pre-load the initially hidden SVGs
fancyStuff.forEach(t => {
    const x = new Image();
    x.src = `images/${t}.svg`;
});
