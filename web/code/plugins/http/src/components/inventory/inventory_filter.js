import React, { Component, PropTypes }from 'react';
import { reduxForm, reset } from 'redux-form';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import * as inventoryActions from '../../actions/inventoryactions';
import * as itemactions from '../../actions/itemactions';
import * as masterDataActions from '../../actions/masterdataaction';
import { Tabs, Tab } from 'react-bootstrap';
import shallowCompare from 'react-addons-shallow-compare';
import UserModal from '../user/user_modal';
import AlertMessage from '../../utils/alertMessage';
import {Modal, ModalClose, Button} from 'react-modal-bootstrap';
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
import jQuery from 'jquery';
let Loading = require('react-loading');

import '../../../public/css/react-multi-select.css';
import '../../../public/css/input-calendar.css';

var productGroupSTO=false;
var productGroupJLY=false;
var productGroupWAT=false;
var productGroupACC=false;
var productGroupOBA=false;
var productGroupSPP=false;

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

    this.state = {
      hideAdvanceSearch: true,
      hideStoneSearch: false,
      hideJewelrySearch: true,
      hideWatchSearch: true,
      hideGemStoneSearch: true,
      data: 'test',
      alert:false,
      isOpen: true,
      activeTab:1,
      beforeActiveTab:1,
      showLoading: true
    };
  }
  static contextTypes = {

    router: PropTypes.object
  };

  componentWillMount(){
    // console.log('componentWillMount-->');
    // this.props.resetFilter();
    let that = this;
    // console.log('componentWillMount');
    this.props.masterDataActions.get()
    .then( () => {

      setTimeout( ()=> {
        this.setState({
          showLoading: false
        });
      },500)

    });
  }
  componentDidMount(){
    // console.log('componentDidMount-->');
    // console.log('componentDidMount-->',this.refs.jewelry);
    this.refs.jewelry.treeOnUnClick();
    this.refs.watch.treeOnUnClick();
    this.refs.stone.treeOnUnClick();
    this.refs.accessory.treeOnUnClick();
    this.refs.oba.treeOnUnClick();
    this.refs.sparepart.treeOnUnClick();

    var numbers = document.querySelectorAll('input[type="number"]');

    for (var i in numbers) {
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

    // numbers.forEach(function(number){
    //   number.onkeydown = function(e) {
    //       if(!((e.keyCode > 95 && e.keyCode < 106)
    //         || (e.keyCode > 47 && e.keyCode < 58)
    //         || e.keyCode == 8
    //         || e.keyCode == 37
    //         || e.keyCode == 39
    //         || e.keyCode == 46
    //         || e.keyCode == 110
    //         || e.keyCode == 190
    //         )) {
    //           return false;
    //       }
    //   }
    // });

    $(window).scroll(function() {
        var w = $('#page-wrapper').width();
				if ($(window).scrollTop() > 100) {
					$('#scroller').addClass('stuck');
				} else {
					$('#scroller').removeClass('stuck').css({'width':w});
				}

			});
    // $( window ).resize(function() {
    //     var w = $('#page-wrapper').width();
    //   $('#scroller').removeClass('stuck').css({'width':w});
    // });

    var oldWidth = $('#page-wrapper').width();
       function elmResized() {
           var width = $('#page-wrapper').width();
           if (oldWidth != width) {
               $('#page-wrapper').trigger('stuck', [width, oldWidth]);
               oldWidth = width;
           }
       }


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
  tabsSelected(activeKey){
    // console.log('activeKey-->',activeKey);
    // console.log('this.props.activeTabCategory-->',this.props.activeTabCategory);
    if(activeKey != this.props.activeTabCategory){
      this.setState({
        alert:true,
        isOpen: true,
        activeTab:activeKey
      });
    }
  }
  advanceSearchClick(e){
    e.preventDefault();

    var btnadvance = document.querySelector('.btn-advance') // Using a class instead, see note below.
    btnadvance.classList.toggle('btn-activebtn');
    // console.log('btnadvance --->',btnadvance);
    // console.log('click Advance');
    if (this.props.IsAdvance) { // Hide
      this.setState({ hideAdvanceSearch: false });
      this.props.inventoryActions.setAdvance(false);
    } else { // Show
      this.setState({ hideAdvanceSearch: true });
      this.props.inventoryActions.setAdvance(true);
    }
    var { activeTabCategory } = this.props;
    const userLogin = JSON.parse(sessionStorage.logindata);
    // console.log('userLogin-->',userLogin);

    var permission = userLogin.permission;
    var bitwise = Number(permission.productGroup).toString(2);
    var checkbits = bitwise.split('')
    var numberDiit = checkbits.length;
    var setActiveTab = activeTabCategory;

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
            productGroupSPP = (value == '1')?true:false;
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
      }else if (productGroupSPP) {
        setActiveTab = 6;
      }

      activeTabCategory = setActiveTab;
      this.props.inventoryActions.selectedTabCategory(setActiveTab);
    }
  }
  openModal(){
    this.setState({ isOpen: true });
  }
  confirmModal(e){
    e.preventDefault();
    var { activeTab } = this.state;
    // console.log('activeTab-->',activeTab);
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
    var { beforeActiveTab } = this.state;
    // console.log('beforeActiveTab-->',beforeActiveTab);
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
    // console.log('ResetFormMain-->');

    let fileName = jQuery('#fileName');

    fileName.html('');
    var { fields:{reference }} = this.props;
    reference.value = '';
    reference.onChange('');

    ResetFormMain(this);
    // console.log('this.props.SearchAction-->',this.props.SearchAction);
    this.props.resetForm();
    // console.log('reset form')
    // console.log('this.props.SearchAction-->',this.props.SearchAction);
    this.refs.jewelry.treeOnUnClick();
    // console.log('reset hierarchy')
    this.refs.watch.treeOnUnClick();
    this.refs.stone.treeOnUnClick();
    this.refs.accessory.treeOnUnClick();
    this.refs.oba.treeOnUnClick();
    this.refs.sparepart.treeOnUnClick();
    this.refs.gemstone.resetDate();
  }

  render() {
    var { handleSubmit, resetForm, submitting, reset, activeTabCategory } = this.props;

    const { alert } = this.state;

    const userLogin = JSON.parse(sessionStorage.logindata);
    // console.log('this.props-->',this.props);

    var permission = userLogin.permission;
    var bitwise = Number(permission.productGroup).toString(2);
    var checkbits = bitwise.split('')
    var numberDiit = checkbits.length;
    var setActiveTab = activeTabCategory;

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
            productGroupSPP = (value == '1')?true:false;
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
    // console.log('this.state.showLoading-->',this.state.showLoading);
      return (

        <form role="form" onSubmit={handleSubmit}>
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
            <div className="col-sm-6 m-width-60 ft-white m-nopadding"><h1>Inventory Report</h1></div>
            <div className="col-sm-6 m-width-40 m-nopadding">
            <div className="text-right maring-t15">
              <button type="submit" className="btn btn-primary btn-radius">Search</button>
              <button type="button" className="btn btn-primary btn-radius"
                disabled={submitting} onClick={this.resetFormInventory}>
                <i/> Reset
              </button>
            </div>
            </div>
            </div>
            <InventoryHeader props={this.props}/>
            {/*Advance search*/}
            <div className="row">
              <div className="bg-while">
                <button disabled={submitting}  onClick={this.advanceSearchClick} className="btn btn-primary btn-advance">
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
                          <InventoryJewelry props={this.props} ref="jewelry"/>
                          <div className="panel-body">
                            <div className="row gemstone-bar">
                              <h2
                                disabled={submitting}
                                onClick={this.gemStoneSearchClick}>
                                Gemstone Search
                              </h2>
                            </div>
                            <div>
                              <InventoryGemStone props={this.props}/>
                            </div>
                          </div>
                          {/*<div className="col-sm-12 text-center">
                            <button type="submit" className="btn btn-primary btn-radius btn-inventories">Search</button>
                            <button type="button" className="btn btn-primary btn-radius btn-inventories"
                              disabled={submitting} onClick={this.resetFormInventory}>
                              <i/> Reset
                            </button>
                          </div>*/}
                        </Tab>
                        <Tab eventKey={2} title="Watch" disabled={!productGroupWAT}>
                          <InventoryWatch props={this.props} ref="watch"/>
                          <div className="panel-body">
                            <div className="row gemstone-bar">
                              <h2
                                disabled={submitting}
                                onClick={this.gemStoneSearchClick}>
                                Gemstone Search
                              </h2>
                            </div>
                            <div>
                              <InventoryGemStone props={this.props}/>
                            </div>
                          </div>
                          {/*<div className="col-sm-12 text-center">
                            <button type="submit" className="btn btn-primary btn-radius btn-inventories">Search</button>
                            <button type="button" className="btn btn-primary btn-radius btn-inventories"
                              disabled={submitting} onClick={this.resetFormInventory}>
                              <i/> Reset
                            </button>
                          </div>*/}
                        </Tab>
                        <Tab eventKey={3} title="Stone" disabled={!productGroupSTO}>
                          <InventoryStone props={this.props} ref="stone"/>
                          {/*<div className="col-sm-12 text-center">
                            <button type="submit" className="btn btn-primary btn-radius btn-inventories">Search</button>
                            <button type="button" className="btn btn-primary btn-radius btn-inventories"
                              disabled={submitting} onClick={this.resetFormInventory}>
                              <i/> Reset
                            </button>
                          </div>*/}
                        </Tab>
                        <Tab eventKey={4} title="ACCESSORY" disabled={!productGroupACC} className="hidden">
                          <InventoryAcc props={this.props} ref="accessory"/>
                          <div className="panel-body">
                            <div className="row gemstone-bar">
                              <h2
                                disabled={submitting}
                                onClick={this.gemStoneSearchClick}>
                                Gemstone Search
                              </h2>
                            </div>
                            <div>
                              <InventoryGemStone props={this.props}/>
                            </div>
                          </div>
                          {/*<div className="col-sm-12 text-center">
                            <button type="submit" className="btn btn-primary btn-radius btn-inventories">Search</button>
                            <button type="button" className="btn btn-primary btn-radius btn-inventories"
                              disabled={submitting} onClick={this.resetFormInventory}>
                              <i/> Reset
                            </button>
                          </div>*/}
                        </Tab>
                        <Tab eventKey={5} title="OBJECT OF ART" disabled={!productGroupOBA}>
                          <InventoryOBA props={this.props}  ref="oba"/>
                          <div className="panel-body">
                            <div className="row gemstone-bar">
                              <h2
                                disabled={submitting}
                                onClick={this.gemStoneSearchClick}>
                                Gemstone Search
                              </h2>
                            </div>
                            <div>
                              <InventoryGemStone props={this.props}/>
                            </div>
                          </div>
                          {/*<div className="col-sm-12 text-center">
                            <button type="submit" className="btn btn-primary btn-radius btn-inventories">Search</button>
                            <button type="button" className="btn btn-primary btn-radius btn-inventories"
                              disabled={submitting} onClick={this.resetFormInventory}>
                              <i/> Reset
                            </button>
                          </div>*/}
                        </Tab>
                        <Tab eventKey={6} title="SPARE PART" disabled={!productGroupSPP}>
                          <InventorySparePart props={this.props}  ref="sparepart"/>
                          <div className="panel-body">
                            <div className="row gemstone-bar">
                              <h2
                                disabled={submitting}
                                onClick={this.gemStoneSearchClick}>
                                Gemstone Search
                              </h2>
                            </div>
                            <div>
                              <InventoryGemStone props={this.props} ref="gemstone"/>
                            </div>
                          </div>
                          {/*<div className="col-sm-12 text-center">
                            <button type="submit" className="btn btn-primary btn-radius btn-inventories">Search</button>
                            <button type="button" className="btn btn-primary btn-radius btn-inventories"
                              disabled={submitting} onClick={this.resetFormInventory}>
                              <i/> Reset
                            </button>
                          </div>*/}
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
  // console.log('InventoryMainFilter state.searchResult.LocationValue-->',state.searchResult.LocationValue);
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
    // CertificateLabValue: state.searchResult.CertificateLabValue,
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
    ProductionDateTo: state.searchResult.ProductionDateTo
  };
}
function mapDispatchToProps(dispatch) {
  return {
    inventoryActions: bindActionCreators(Object.assign({}, inventoryActions), dispatch),
    itemActions: bindActionCreators(Object.assign({}, itemactions), dispatch),
    masterDataActions: bindActionCreators(Object.assign({}, masterDataActions), dispatch)
  }
}
module.exports = reduxForm({
  form: 'Inventory',
  fields: ['reference','description','venderReference','vendorName',
            'certificatedNumber','sku','location','warehouse','attachment',
            'stoneType','cut','stoneProductHierarchy','lotNumber',
            'cutGrade','color','colorGrade','clarity','lotQuantityFrom','lotQuantityTo',
            'totalCaratWeightFrom','totalCaratWeightTo','totalCostFrom','totalCostTo',
            'totalUpdatedCostFrom','totalUpdatedCostTo','publicPriceFrom','publicPriceTo',
            'markupFrom','markupTo', 'certificatedNumber','certificateAgency','cerDateFrom',
            'cerDateTo','polish','symmetry','treatment','fluorescence','origin',
            'jewelryProductHierarchy','collection','totalCostFrom','totalCostTo',
            'totalUpdatedCostFrom','totalUpdatedCostTo','publicPriceFrom','publicPriceTo',
            'markupFrom','markupTo','grossWeightFrom','grossWeightTo','setReference',
            'jewelryCategory','brand','mustHave','ringSize','dominantStone',
            'metalType','metalColour',
            'gemstone_stoneType','gemstone_cut','gemstone_cutGrade','gemstone_color','gemstone_clarity','gemstone_stoneCostFrom',
            'gemstone_stoneCostTo','gemstone_totalCaratWeightFrom','gemstone_totalCaratWeightTo','gemstone_quantityFrom',
            'gemstone_quantityTo','gemstone_certificatedNumber','gemstone_cerDateFrom','gemstone_cerDateTo','gemstone_polish',
            'gemstone_symmetry','gemstone_treatment','gemstone_fluorescence','gemstone_origin','gemstone_certificateAgency',
            'watchProductHierarchy','watchCategory','collection','brand','mustHave','metalType',
            'metalColour','dominantStone','limitedEdition','limitedEditionNumber','serialNumber',
            'movement','totalCostFrom','totalCostTo','totalUpdatedCostFrom','totalUpdatedCostTo',
            'publicPriceFrom','publicPriceTo','markupFrom','markupFrom','markupTo','grossWeightFrom',
            'grossWeightTo','proDateFrom','proDateTo','caseDimensionFrom','caseDimensionTo',
            'preciousMetalWeightFrom','preciousMetalWeightTo','dialIndex','dialColor','dialMetal',
            'buckleType','strapType','strapColor','complication',
            'accessoryProductHierarchy','accessoryType',
            'obaProductHierarchy','obaDimension',
            'sparePartProductHierarchy','sparePartType'
          ],
},mapStateToProps,mapDispatchToProps)(InventoryFilter);
