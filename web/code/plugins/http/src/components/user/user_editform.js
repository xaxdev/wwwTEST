import React,{ Component } from 'react';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import shallowCompare from 'react-addons-shallow-compare';
import * as masterDataActions from '../../actions/masterdataaction';
import * as usersActions from '../../actions/usersaction';
import validateUserEdit from '../../utils/validateuseredit.js';
import GenPassword from '../../utils/genPassword';
import MultipleCheckBoxs from '../../utils/multipleCheckBoxs';
import Tree from '../../utils/treeview/TreeLine';
import TreeDataJewelry from '../../utils/treeview/jewelry.json';
import TreeDataWatch from '../../utils/treeview/watch.json';
import TreeDataStone from '../../utils/treeview/stone.json';
import TreeDataAccessory from '../../utils/treeview/accessory.json';
import TreeDataOBA from '../../utils/treeview/oba.json';
import TreeDataSpare from '../../utils/treeview/spare.json';
import TreeDataSalesJewelry from '../../utils/treeview/salesjewelry.json';
import TreeDataSalesWatch from '../../utils/treeview/saleswatch.json';
import TreeDataSalesStone from '../../utils/treeview/salesstone.json';
import TreeDataSalesAccessory from '../../utils/treeview/salesaccessory.json';
import TreeDataSalesOBA from '../../utils/treeview/salesoba.json';
import TreeDataSalesSpare from '../../utils/treeview/salesspare.json';
import ClearHierarchy from './utils/clear_hierarchy';
import SelectedHierarchy from './utils/selected_hierarchy';
import FindLocationWareHouse from './utils/find_location_warehouse_edit';
import SetCategoryHierarchy from './utils/set_category_hierarchy_edit';
import SetSalesCategoryHierarchy from './utils/set_salescategory_hierarchy_edit';
import SetProductGroup from './utils/set_productgroup';
import SetProductGroupSales from './utils/set_productgroup_sales';
import SetProductGroupPriceSales from './utils/set_productgroup_pricesales';
import SelectedSalesHierarchy from './utils/selected_hierarchy_sales';
import InitWillReceiveProps from './utils/initwillreceiveprops';
import RenderHeaderUserEdit from './render_header_user_edit';
import RenderUserProfileEdit from './render_user_profile_edit';
import RenderTypeUser from './render_type_user';
import RenderViewOnHandProductGroup from './render_view_onhand_product_group';
import RenderViewSalesProductGroup from './render_view_sales_product_group';
import RenderViewPriceOnHand from './render_view_price_onhand';
import RenderViewPriceSales from  './render_view_price_sales';
import RenderViewOnHand  from  './render_view_onhand';
import RenderViewSales  from  './render_view_sales';
import RenderViewSalesChannel  from  './render_view_sales_channel';
import FindProductHierarchy from './utils/find_product_hierarchy';

let _ = require('lodash');
let hierarchyDataJewelry = [];
let hierarchyDataWatch = [];
let hierarchyDataStone = [];
let hierarchyDataAccessory = [];
let hierarchyDataOBA = [];
let hierarchyDataSpare = [];
let hierarchyDataJewelrySales = [];
let hierarchyDataWatchSales = [];
let hierarchyDataStoneSales = [];
let hierarchyDataAccessorySales = [];
let hierarchyDataOBASales = [];
let hierarchyDataSpareSales = [];

export const fields = [
    'id','firstName','lastName','username','email','password','role','currency','status','company','location','warehouse','productGroup','onhand','price',
    'productGroupSTO','productGroupJLY','productGroupWAT','productGroupACC','productGroupOBA','productGroupSPA','onhandLocationValue','webOnly','permissionId',
    'onhandLocation','onhandAll','onhandWarehouse','onhandWarehouseValue','productGroupErr','movement','categoryJLY','categoryWAT','categorySTO','categoryACC',
    'categoryOBA','categorySPP','notUseHierarchy', 'userType','productGroupSales','productGroupSalesSTO','productGroupSalesJLY','productGroupSalesWAT',
    'productGroupSalesACC','productGroupSalesOBA','productGroupSalesSPA','productGroupSalesErr','priceSalesRTP','priceSalesUCP','priceSalesCTP','priceSalesNSP',
    'priceSalesMGP','priceSalesDSP','salesLocation','salesLocationValue','salesWarehouse','salesWarehouseValue','salesAll','sales','categorySalesJLY',
    'categorySalesWAT','categorySalesSTO','categorySalesACC','categorySalesOBA','categorySalesSPP','notUseSalesHierarchy','salesChannel','salesChannelValue',
    'salesChannelType', 'bomOnhand', 'bomSales'
];

export let countFirst = 0;

class UserDetailsFrom extends Component {
    constructor(props) {
        super(props);

        this.generatePassword = this.generatePassword.bind(this);
        this.selectedCompany = this.selectedCompany.bind(this);
        this.selectedSite = this.selectedSite.bind(this);
        this.selectedProductGroup = this.selectedProductGroup.bind(this);
        this.selectedOnHandWarehouse = this.selectedOnHandWarehouse.bind(this);
        this.selectedOnHandLocation = this.selectedOnHandLocation.bind(this);
        this.selectedOnHandAll = this.selectedOnHandAll.bind(this);
        this.changedOnHandLocationChecked = this.changedOnHandLocationChecked.bind(this);
        this.changedOnHandWarehouseChecked = this.changedOnHandWarehouseChecked.bind(this);
        this.treeOnClickJLY = this.treeOnClickJLY.bind(this);
        this.treeOnClickWAT = this.treeOnClickWAT.bind(this);
        this.treeOnClickSTO = this.treeOnClickSTO.bind(this);
        this.treeOnClickACC = this.treeOnClickACC.bind(this);
        this.treeOnClickOBA = this.treeOnClickOBA.bind(this);
        this.treeOnClickSPP = this.treeOnClickSPP.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputCategoryChange = this.handleInputCategoryChange.bind(this);
        this.changedUserType = this.changedUserType.bind(this);
        this.selectedProductGroupSales = this.selectedProductGroupSales.bind(this);
        this.handleInputChangeSales = this.handleInputChangeSales.bind(this);
        this.handleInputChangePriceSales = this.handleInputChangePriceSales.bind(this);
        this.handleInputSalesCategoryChange = this.handleInputSalesCategoryChange.bind(this);

        this.selectedSalesLocation = this.selectedSalesLocation.bind(this);
        this.selectedSalesWarehouse = this.selectedSalesWarehouse.bind(this);
        this.selectedSalesChannel = this.selectedSalesChannel.bind(this);
        this.changedSalesLocationChecked = this.changedSalesLocationChecked.bind(this);
        this.changedSalesWarehouseChecked = this.changedSalesWarehouseChecked.bind(this);
        this.changedSalesChannelChecked = this.changedSalesChannelChecked.bind(this);
        this.treeOnClickSalesJLY = this.treeOnClickSalesJLY.bind(this);
        this.treeOnClickSalesWAT = this.treeOnClickSalesWAT.bind(this);
        this.treeOnClickSalesSTO = this.treeOnClickSalesSTO.bind(this);
        this.treeOnClickSalesACC = this.treeOnClickSalesACC.bind(this);
        this.treeOnClickSalesOBA = this.treeOnClickSalesOBA.bind(this);
        this.treeOnClickSalesSPP = this.treeOnClickSalesSPP.bind(this);
        // this.selectedSalesAll = this.selectedSalesAll.bind(this);

        hierarchyDataJewelry.push(TreeDataJewelry);
        hierarchyDataWatch.push(TreeDataWatch);
        hierarchyDataStone.push(TreeDataStone);
        hierarchyDataAccessory.push(TreeDataAccessory);
        hierarchyDataOBA.push(TreeDataOBA);
        hierarchyDataSpare.push(TreeDataSpare);

        hierarchyDataJewelrySales.push(TreeDataSalesJewelry);
        hierarchyDataWatchSales.push(TreeDataSalesWatch);
        hierarchyDataStoneSales.push(TreeDataSalesStone);
        hierarchyDataAccessorySales.push(TreeDataSalesAccessory);
        hierarchyDataOBASales.push(TreeDataSalesOBA);
        hierarchyDataSpareSales.push(TreeDataSalesSpare);

        ClearHierarchy(hierarchyDataJewelry);
        ClearHierarchy(hierarchyDataWatch);
        ClearHierarchy(hierarchyDataStone);
        ClearHierarchy(hierarchyDataAccessory);
        ClearHierarchy(hierarchyDataOBA);
        ClearHierarchy(hierarchyDataSpare);
        ClearHierarchy(hierarchyDataJewelrySales);
        ClearHierarchy(hierarchyDataWatchSales);
        ClearHierarchy(hierarchyDataStoneSales);
        ClearHierarchy(hierarchyDataAccessorySales);
        ClearHierarchy(hierarchyDataOBASales);
        ClearHierarchy(hierarchyDataSpareSales);

        this.state = {
            hideProductGroups: (this.props.user.productGroup == 2) ? false: true,
            hidecategory: (this.props.user.productGroup != 0) ? false: true,
            productGroupDatas:[],
            hideProductGroupsSales: (this.props.user.productGroupSales == 2) ? false: true,
            hideCategorySales: (this.props.user.productGroupSales != 0) ? false: true,
            productGroupDatasSales:[],
            selectedCompany: false,
            selectedSite: false,
            selectedOnHandWarehouse: (this.props.user.permission.onhandWarehouse != undefined)?(this.props.user.permission.onhandWarehouse.type.indexOf('All') == -1) ? false : true : false,
            selectedOnHandLocation: (this.props.user.permission.onhandLocation != undefined)?(this.props.user.permission.onhandLocation.type.indexOf('All') == -1) ? false : true : false,
            selectedOnHandAll: (!this.props.user.onhandLocation && !this.props.user.onhandWarehouse)? true: false,
            genPass:'',
            changedOnHandLocation: false,
            clickAllLocarion: (this.props.user.onhandLocationValue != null)?(this.props.user.onhandLocationValue.length != 0) ? false : true:false,
            clickAllWarehouse: (this.props.user.permission.onhandWarehouse != undefined)?(this.props.user.permission.onhandWarehouse.type.indexOf('All') == -1) ? false : true : false,
            firstloading: true,
            userNotUseHierarchy: JSON.parse(this.props.user.permission.notUseHierarchy),
            value: this.props.user.productGroup,
            valueSales: this.props.user.productGroupSales,
            selectedSalesWarehouse: (this.props.user.permission.salesWarehouse != undefined)?(this.props.user.permission.salesWarehouse.type.indexOf('All') == -1) ? false : true : false,
            selectedSalesLocation: (this.props.user.permission.salesLocation != undefined)?(this.props.user.permission.salesLocation.type.indexOf('All') == -1) ? false : true : false,
            selectedSalesAll: (!this.props.user.salesLocation && !this.props.user.salesWarehouse)? true: false,
            changedSalesLocation: false,
            clickAllSalesLocarion: (this.props.user.salesLocationValue != null)?(this.props.user.salesLocationValue.length != 0) ? false : true:false,
            clickAllSalesWarehouse: (this.props.user.permission.salesWarehouse != undefined)?(this.props.user.permission.salesWarehouse.type.indexOf('All') == -1) ? false : true : false,
            userNotUseSalesHierarchy: JSON.parse(this.props.user.permission.notUseSalesHierarchy),
            selectedSalesChannel: (this.props.user.permission.salesChannel != undefined)?(this.props.user.permission.salesChannel.type.indexOf('All') == -1) ? false : true : false,
            clickAllSalesChannel: (this.props.user.salesChannelValue != null)?(this.props.user.salesChannelValue.length != 0) ? false : true:false,
        };
    }

    componentWillMount(){
        this.props.optionsActions.get();

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

    componentDidMount(){
        this.setState({
            selectedOnHandWarehouse: (this.props.user.permission.onhandWarehouse != undefined)?(this.props.user.permission.onhandWarehouse.type.indexOf('All') == -1) ? false : true : false,
            selectedOnHandLocation: (this.props.user.permission.onhandLocation != undefined)?(this.props.user.permission.onhandLocation.type.indexOf('All') == -1) ? false : true : false,
            selectedSalesWarehouse: (this.props.user.permission.salesWarehouse != undefined)?(this.props.user.permission.salesWarehouse.type.indexOf('All') == -1) ? false : true : false,
            selectedSalesLocation: (this.props.user.permission.salesLocation != undefined)?(this.props.user.permission.salesLocation.type.indexOf('All') == -1) ? false : true : false,
            selectedSalesChannel: (this.props.user.permission.salesChannel != undefined)?(this.props.user.permission.salesChannel.type.indexOf('All') == -1) ? false : true : false,
        });
        this.props.optionsActions.setHierarchy(JSON.parse(this.props.user.permission.notUseHierarchy));
        this.props.optionsActions.setNotUseHierarchy(JSON.parse(this.props.user.permission.notUseHierarchy));
        this.props.optionsActions.setSalesHierarchy(JSON.parse(this.props.user.permission.notUseSalesHierarchy));
        this.props.optionsActions.setNotUseSalesHierarchy(JSON.parse(this.props.user.permission.notUseSalesHierarchy));
    }

    componentWillReceiveProps = (nextProps)=> {
        InitWillReceiveProps(this, nextProps)
    }

    changedOnHandWarehouseChecked = e => {
        let el = e.target;
        let name = 'chkWarehouse';
        let nameObj = el.name;
        let type = el.type;
        let stateChange = {};
        let { fields: { onhandLocationValue,onhandWarehouseValue,onhand,onhandAll,onhandLocation }} = this.props;
        let objType = Object.prototype.toString.call(el.form.elements[nameObj]);

        if (objType == '[object RadioNodeList]' || objType == '[object NodeList]' || objType == '[object HTMLCollection]') {
            let checkedBoxes = (Array.isArray(this.state[name]) ? this.state[name].slice() : []);
            if (el.checked) {
                checkedBoxes.push(el.value);
                let checkWarehouse = jQuery('input[name="checkbox-allWarehouse"]');
                let values = [].filter.call(checkWarehouse, function(o) {
                    return o.checked || !o.checked;
                }).map(function(o) {
                    return o.value;
                });
                if (checkedBoxes.length == values.length) {
                    this.setState({selectedOnHandWarehouse: true});
                    this.setState({clickAllWarehouse: true});
                    onhand.onChange('All');
                    onhandAll.onChange(true);
                }
            }else{
                if (this.state.clickAllWarehouse) {
                    let checkWarehouse = jQuery('input[name="checkbox-allWarehouse"]');
                    let values = [].filter.call(checkWarehouse, function(o) {
                        return o.checked || !o.checked;
                    }).map(function(o) {
                        return o.value;
                    });
                    checkedBoxes = values;
                    onhand.onChange('Warehouse');
                    onhandAll.onChange(false);
                }
                checkedBoxes.splice(checkedBoxes.indexOf(el.value), 1);
                this.setState({selectedOnHandWarehouse: false});
                this.setState({clickAllWarehouse: false});
                if (onhandLocation) {
                    let checkCompany = jQuery('input[name="checkbox-allCompany"]');
                    let values = [].filter.call(checkCompany, function(o) {
                        return o.checked;
                    }).map(function(o) {
                        return o.value;
                    });
                    onhandLocationValue.onChange(values)
                }
            }
            stateChange[name] = checkedBoxes;
        }else {
            stateChange[name] = el.checked;
        }
        this.setState(stateChange);

        onhandWarehouseValue.onChange(stateChange.chkWarehouse);
    }

    changedSalesWarehouseChecked = e => {
        let el = e.target;
        let name = 'chkSalesWarehouse';
        let nameObj = el.name;
        let type = el.type;
        let stateChange = {};
        let { fields: { salesLocationValue,salesWarehouseValue,sales,salesAll,salesLocation }} = this.props;
        let objType = Object.prototype.toString.call(el.form.elements[nameObj]);

        if (objType == '[object RadioNodeList]' || objType == '[object NodeList]' || objType == '[object HTMLCollection]') {
            let checkedBoxes = (Array.isArray(this.state[name]) ? this.state[name].slice() : []);
            if (el.checked) {
                checkedBoxes.push(el.value);
                let checkWarehouse = jQuery('input[name="checkbox-allSalesWarehouse"]');
                let values = [].filter.call(checkWarehouse, function(o) {
                    return o.checked || !o.checked;
                }).map(function(o) {
                    return o.value;
                });
                let valuesCheckedTrue = [].filter.call(checkWarehouse, function(o) {
                    return o.checked;
                }).map(function(o) {
                    return o.value;
                });
                if (checkedBoxes.length == values.length) {  // if amount of all warehouse equal amount selected
                    this.setState({selectedSalesWarehouse: true});
                    this.setState({clickAllWarehouse: true});
                    sales.onChange('All');
                    salesAll.onChange(true);
                }else{
                    this.setState({selectedSalesWarehouse: false});
                    this.setState({clickAllWarehouse: false});
                }
            }else{
                if (this.state.selectedSalesWarehouse) {
                    this.setState({selectedSalesWarehouse: false});
                    this.setState({clickAllSalesWarehouse: false});
                    sales.onChange('SalesWarehouse');
                    salesAll.onChange(false);
                }

                if (this.state.clickAllSalesWarehouse) {
                    let checkSalesWarehouse = jQuery('input[name="checkbox-allSalesWarehouse"]');
                    let values = [].filter.call(checkSalesWarehouse, function(o) {
                        return o.checked || !o.checked;
                    }).map(function(o) {
                        return o.value;
                    });
                    checkedBoxes = values;
                }else{
                    let checkSalesWarehouse = jQuery('input[name="checkbox-allSalesWarehouse"]');
                    let values = [].filter.call(checkSalesWarehouse, function(o) {
                        return o.checked;
                    }).map(function(o) {
                        return o.value;
                    });
                    checkedBoxes = values;
                    _.each(checkSalesWarehouse,function (o) {
                        values.map(function(warehouse) {
                            if (warehouse == o.value) {
                                o.checked = true;
                            }
                        });
                    });
                }
                if (checkedBoxes.indexOf(el.value) != -1) {
                    checkedBoxes.splice(checkedBoxes.indexOf(el.value), 1);
                }

                if (salesLocation) {
                    let checkSalesCompany = jQuery('input[name="checkbox-allSalesCompany"]');
                    let values = [].filter.call(checkSalesCompany, function(o) {
                        return o.checked;
                    }).map(function(o) {
                        return o.value;
                    });
                    salesLocationValue.onChange(values)
                }
            }
            stateChange[name] = checkedBoxes;
        }else {
            stateChange[name] = el.checked;
        }
        this.setState(stateChange);

        salesWarehouseValue.onChange(stateChange.chkSalesWarehouse);
    }

    changedOnHandLocationChecked  = e => {
        let el = e.target;
        let name = 'chkLocation';
        let nameObj = el.name;
        let type = el.type;
        let stateChange = {};
        let { fields: { onhandLocationValue,onhandWarehouseValue,onhand,onhandAll }} = this.props;
        let objType = Object.prototype.toString.call(el.form.elements[nameObj]);
        let checkCompany = jQuery('input[name="checkbox-allCompany"]');
        let valuesAllCompany = [].filter.call(checkCompany, function(o) {
            return o.checked || !o.checked;
        }).map(function(o) {
            return o.value;
        });

        if (objType == '[object RadioNodeList]' || objType == '[object NodeList]' || objType == '[object HTMLCollection]') {
            let checkedBoxes = (Array.isArray(this.state[name]) ? this.state[name].slice() : []);
            if (el.checked) {
                checkedBoxes.push(el.value);

                if (checkedBoxes.length == valuesAllCompany.length) {
                    this.setState({selectedOnHandLocation: true});
                    this.setState({clickAllLocarion: true});
                    onhand.onChange('All');
                    onhandAll.onChange(true);
                }
                this.setState({changedOnHandLocation: true});
            }else {
                if (this.state.clickAllLocarion) {
                    checkedBoxes = valuesAllCompany;
                    onhand.onChange('Location');
                    onhandAll.onChange(false);
                }
                checkedBoxes.splice(checkedBoxes.indexOf(el.value), 1);
                this.setState({selectedOnHandLocation: false});
                this.setState({clickAllLocarion: false});
                this.setState({changedOnHandLocation: false});
            }
            stateChange[name] = checkedBoxes;
        } else {
            stateChange[name] = el.checked;
        }
        this.setState(stateChange);

        onhandLocationValue.onChange(stateChange.chkLocation);

        this.props.optionsActions.getOnHandWarehouse(stateChange.chkLocation).then((value) => {
            let valuesCompany = [].filter.call(checkCompany, function(o) {
                return o.checked;
            }).map(function(o) {
                return o.value;
            });

            if (valuesAllCompany.length != valuesCompany.length) {
                let checkWarehouse = jQuery('input[name="checkbox-allWarehouse"]');
                let valuesAllWarehouse = [].filter.call(checkWarehouse, function(o) {
                    return o.checked;
                }).map(function(o) {
                    return o.value;
                });
                onhandWarehouseValue.onChange(valuesAllWarehouse);
            } else {
                onhandWarehouseValue.onChange([]);
            }
        });
    }

    changedSalesLocationChecked  = e => {
        let el = e.target;
        let name = 'chkSalesLocation';
        let nameObj = el.name;
        let type = el.type;
        let stateChange = {};
        let { fields: { salesLocationValue,salesWarehouseValue,sales,salesAll }} = this.props;
        let objType = Object.prototype.toString.call(el.form.elements[nameObj]);
        let checkSalesCompany = jQuery('input[name="checkbox-allSalesCompany"]');
        let valuesAllSalesCompany = [].filter.call(checkSalesCompany, function(o) {
            return o.checked || !o.checked;
        }).map(function(o) {
            return o.value;
        });

        if (objType == '[object RadioNodeList]' || objType == '[object NodeList]' || objType == '[object HTMLCollection]') {
            let checkedBoxes = (Array.isArray(this.state[name]) ? this.state[name].slice() : []);
            if (el.checked) {
                checkedBoxes.push(el.value);

                if (checkedBoxes.length == valuesAllSalesCompany.length) {
                    this.setState({selectedSalesLocation: true});
                    this.setState({clickAllSalesLocarion: true});
                    sales.onChange('All');
                    salesAll.onChange(true);
                }
                this.setState({changedSalesLocation: true});
            }else {
                if (this.state.clickAllSalesLocarion) {
                    checkedBoxes = valuesAllSalesCompany;
                    sales.onChange('SalesLocation');
                    salesAll.onChange(false);
                }
                checkedBoxes.splice(checkedBoxes.indexOf(el.value), 1);
                this.setState({selectedSalesLocation: false});
                this.setState({clickAllSalesLocarion: false});
                this.setState({changedSalesLocation: false});
            }
            stateChange[name] = checkedBoxes;
        } else {
            stateChange[name] = el.checked;
        }
        this.setState(stateChange);

        salesLocationValue.onChange(stateChange.chkSalesLocation);

        this.props.optionsActions.getSalesWarehouse(stateChange.chkSalesLocation).then((value) => {
            let valuesSalesCompany = [].filter.call(checkSalesCompany, function(o) {
                return o.checked;
            }).map(function(o) {
                return o.value;
            });

            if (valuesAllSalesCompany.length != valuesSalesCompany.length) {
                let checkSalesWarehouse = jQuery('input[name="checkbox-allSalesWarehouse"]');
                let valuesAllSalesWarehouse = [].filter.call(checkSalesWarehouse, function(o) {
                    return o.checked;
                }).map(function(o) {
                    return o.value;
                });
                salesWarehouseValue.onChange(valuesAllSalesWarehouse);
            } else {
                salesWarehouseValue.onChange([]);
            }
        });
    }

    changedSalesChannelChecked  = e => {
        let el = e.target;
        let name = 'chkSalesChannel';
        let nameObj = el.name;
        let type = el.type;
        let stateChange = {};
        let { fields: { salesChannelValue, salesChannel, salesChannelType }} = this.props;
        let objType = Object.prototype.toString.call(el.form.elements[nameObj]);
        let checkSalesChannel = jQuery('input[name="checkbox-allSalesChannel"]');
        let valuesAllSalesChannel = [].filter.call(checkSalesChannel, function(o) {
            return o.checked || !o.checked;
        }).map(function(o) {
            return o.value;
        });

        if (objType == '[object RadioNodeList]' || objType == '[object NodeList]' || objType == '[object HTMLCollection]') {
            let checkedBoxes = (Array.isArray(this.state[name]) ? this.state[name].slice() : []);
            if (el.checked) {
                checkedBoxes.push(el.value);

                if (checkedBoxes.length == valuesAllSalesChannel.length) {
                    this.setState({selectedSalesChannel: true});
                    this.setState({clickAllSalesChannel: true});
                    salesChannelType.onChange('All');
                    salesChannel.onChange(true);
                }else {
                    this.setState({selectedSalesChannel: false});
                    this.setState({clickAllSalesChannel: false});
                    salesChannelType.onChange('SalesChannel');
                    salesChannel.onChange(false);
                }
            }else {
                if (this.state.clickAllSalesChannel) {
                    checkedBoxes = valuesAllSalesChannel;
                    salesChannelType.onChange('SalesChannel');
                }
                checkedBoxes.splice(checkedBoxes.indexOf(el.value), 1);
                this.setState({selectedSalesChannel: false});
                this.setState({clickAllSalesChannel: false});
                salesChannel.onChange(false);
            }
            stateChange[name] = checkedBoxes;
        } else {
            stateChange[name] = el.checked;
        }
        this.setState(stateChange);

        salesChannelValue.onChange(stateChange.chkSalesChannel);
    }

    selectedCompany(e){
        if(e.target.value == ''){
            this.setState({ selectedCompany:false, selectedSite: false });
        }else{
            const { options } = this.props;
            const siteid = this.refs.site.value;
            const comid = e.target.value;
            const propsCom = { siteid, comid, options };
            let { fields: { warehouse }} = this.props;

            this.props.optionsActions.getSite(e.target.value).then((value) => {
                warehouse.onChange('');
                this.props.optionsActions.getWarehouse(propsCom);
                this.setState({ selectedCompany:true, selectedSite: false });
            });
        }
    }

    selectedSite(e){
        if(e.target.value != '') {
            const { options } = this.props;
            const siteid = e.target.value;
            const comid = this.refs.company.value;
            const propsCom = { siteid, comid, options };
            this.props.optionsActions.getWarehouse(propsCom);
            this.setState({ selectedSite:true });
        }else{
            this.setState({ selectedSite: false });
        }
    }

    selectedProductGroup = e => {
        if(e.target.value == 2) { //select some productGroups
            this.setState({
                hideProductGroups: false,
                productGroupDatas: this.props.options.productGroups,
                hidecategory: false,
                value: 2
            });
        } else if(e.target.value == 1) { //select All disbal all check box
            this.setState({
                hideProductGroups: true,
                productGroupDatas: this.props.options.productGroups,
                hidecategory: false,
                value: 1
            });
        } else {
            this.setState({
                hideProductGroups: true,
                productGroupDatas: [],
                hidecategory: true,
                value: 0
            });
        }
    }

    selectedProductGroupSales = e => {
        if(e.target.value == 2) { //select some productGroups
            this.setState({
                hideProductGroupsSales: false,
                productGroupDatasSales: this.props.options.productGroupsSales,
                hideCategorySales: false,
                valueSales: 2
            });
        } else if(e.target.value == 1) { //select All disbal all check box
            this.setState({
                hideProductGroupsSales: true,
                productGroupDatasSales: this.props.options.productGroupsSales,
                hideCategorySales: false,
                valueSales: 1
            });
        } else {
            this.setState({
                hideProductGroupsSales: true,
                productGroupDatasSales: [],
                hideCategorySales: true,
                valueSales: 0
            });
        }
    }

    selectedOnHandWarehouse(e){
        countFirst++;
        let { fields: { onhand, onhandAll, onhandWarehouseValue, onhandLocationValue }} = this.props;
        if (countFirst != 1) {
            this.setState({ firstloading: false });
        }
        if (e.target.checked) {
            this.setState({ selectedOnHandWarehouse: true, selectedOnHandAll: true, clickAllWarehouse: true });
            let checkCompany = jQuery('input[name="checkbox-allCompany"]');
            let values = [].filter.call(checkCompany, function(o) {
                return o.checked;
            }).map(function(o) {
                return o.value;
            });

            this.setState({chkLocation: values});

            if (values.length != 0) {
                let checkCompany = jQuery('input[name="checkbox-allCompany"]');

                let valuesAll = [].filter.call(checkCompany, function(o) {
                    return o.checked || !o.checked;
                }).map(function(o) {
                    return o.value;
                });

                if(values.length == valuesAll.length){
                    this.setState({ selectedOnHandLocation: true });
                    this.props.optionsActions.getOnHandWarehouse(valuesAll);
                }else{
                    this.setState({ selectedOnHandLocation: false });
                }

                let checkWarehouse= jQuery('input[name="checkbox-allWarehouse"]');
                let valuesWarehouse = [].filter.call(checkWarehouse, function(o) {
                    return !o.checked;
                }).map(function(o) {
                    return o.value;
                });

                if(valuesWarehouse.length == 0){
                    valuesWarehouse = [].filter.call(this.props.warehouseOnHand, function(o) { return o.code; });
                }
                onhandWarehouseValue.onChange(valuesWarehouse);
                onhand.onChange('AllWarehouse');
                onhandAll.onChange(false);
            }else{
                this.setState({ selectedOnHandLocation: true });
                onhand.onChange('All');
                onhandAll.onChange(true);
                let checkAllCompany = jQuery('input[name="checkbox-allCompany"]');
                let valuesAllCompany = [].filter.call(checkAllCompany, function(o) {
                    return o.checked || !o.checked;
                }).map(function(o) {
                    return o.value;
                });
                this.props.optionsActions.getOnHandWarehouse(valuesAllCompany);
            }
        } else {
            this.setState({
                selectedOnHandWarehouse: false,
                selectedOnHandLocation: false,
                selectedOnHandAll: false,
                clickAllWarehouse: false
            });

            let checkWarehouse= jQuery('input[name="checkbox-allWarehouse"]');
            _.each(checkWarehouse,function (o) {
                o.checked = false;
            });
            let checkAllCompany = jQuery('input[name="checkbox-allCompany"]');
            let valuesAllCompany = [].filter.call(checkAllCompany, function(o) {
                return o.checked || !o.checked;
            }).map(function(o) {
                return o.value;
            });

            let valuesCompany = [].filter.call(checkAllCompany, function(o) {
                return o.checked;
            }).map(function(o) {
                return o.value;
            });

            onhandLocationValue.onChange(valuesCompany);
            onhandWarehouseValue.onChange([]);
            onhandWarehouseValue.value = [];
            onhand.onChange('Warehouse');
            onhandAll.onChange(false);

            if (valuesCompany.length != 0) {
                this.props.optionsActions.getOnHandWarehouse(valuesCompany);
            }else{
                this.props.optionsActions.getOnHandWarehouse(valuesAllCompany);
            }
        }
    }

    selectedSalesWarehouse = e => {
        countFirst++;
        let { fields: { sales, salesAll, salesWarehouseValue, salesLocationValue }} = this.props;
        if (countFirst != 1) {
            this.setState({ firstloading: false });
        }
        if (e.target.checked) {
            this.setState({ selectedSalesWarehouse: true, selectedSalesAll: true, clickAllSalesWarehouse: true });
            let checkSalesCompany = jQuery('input[name="checkbox-allSalesCompany"]');
            let values = [].filter.call(checkSalesCompany, function(o) {
                return o.checked;
            }).map(function(o) {
                return o.value;
            });

            this.setState({chkSalesLocation: values});

            if (values.length != 0) {
                let checkSalesCompany = jQuery('input[name="checkbox-allSalesCompany"]');

                let valuesAll = [].filter.call(checkSalesCompany, function(o) {
                    return o.checked || !o.checked;
                }).map(function(o) {
                    return o.value;
                });

                if(values.length == valuesAll.length){
                    this.setState({ selectedSalesLocation: true });
                    this.props.optionsActions.getSalesWarehouse(valuesAll);
                }else{
                    this.setState({ selectedSalesLocation: false });
                }

                let checkSalesWarehouse= jQuery('input[name="checkbox-allSalesWarehouse"]');
                let valuesSalesWarehouse = [].filter.call(checkSalesWarehouse, function(o) {
                    return !o.checked;
                }).map(function(o) {
                    return o.value;
                });

                if(valuesSalesWarehouse.length == 0){
                    valuesSalesWarehouse = [].filter.call(this.props.warehouseSales, function(o) { return o.code; });
                }
                salesWarehouseValue.onChange(valuesSalesWarehouse);
                sales.onChange('AllSalesWarehouse');
                salesAll.onChange(false);
            }else{
                this.setState({ selectedSalesLocation: true });
                sales.onChange('All');
                salesAll.onChange(true);
                let checkAllSalesCompany = jQuery('input[name="checkbox-allSalesCompany"]');
                let valuesAllSalesCompany = [].filter.call(checkAllSalesCompany, function(o) {
                    return o.checked || !o.checked;
                }).map(function(o) {
                    return o.value;
                });
                this.props.optionsActions.getSalesWarehouse(valuesAllCompany);
            }
        } else {
            this.setState({
                selectedSalesWarehouse: false,
                selectedSalesLocation: false,
                selectedSalesAll: false,
                clickAllSalesWarehouse: false
            });

            let checkSalesWarehouse= jQuery('input[name="checkbox-allSalesWarehouse"]');
            _.each(checkSalesWarehouse,function (o) {
                o.checked = false;
            });
            let checkAllSalesCompany = jQuery('input[name="checkbox-allSalesCompany"]');
            let valuesAllSalesCompany = [].filter.call(checkAllSalesCompany, function(o) {
                return o.checked || !o.checked;
            }).map(function(o) {
                return o.value;
            });

            let valuesSalesCompany = [].filter.call(checkAllSalesCompany, function(o) {
                return o.checked;
            }).map(function(o) {
                return o.value;
            });

            salesLocationValue.onChange(valuesSalesCompany);
            salesWarehouseValue.onChange([]);
            salesWarehouseValue.value = [];
            sales.onChange('SalesWarehouse');
            salesAll.onChange(false);

            if (valuesSalesCompany.length != 0) {
                this.props.optionsActions.getSalesWarehouse(valuesSalesCompany);
            }else{
                this.props.optionsActions.getSalesWarehouse(valuesAllSalesCompany);
            }
        }
    }

    selectedOnHandLocation(e){
        let { fields: { onhand, onhandAll, onhandWarehouseValue, onhandLocationValue }} = this.props;
        if (e.target.checked) {
            this.setState({
                selectedOnHandWarehouse: true,
                selectedOnHandLocation: true,
                selectedOnHandAll: true,
                changedOnHandLocation: true,
                clickAllLocarion: true,
                firstloading: false
            });

            let checkCompany = jQuery('input[name="checkbox-allCompany"]');
            let values = [].filter.call(checkCompany, function(o) {
                return o.checked || !o.checked;
            }).map(function(o) {
                return o.value;
            });
            this.setState({chkLocation: values});

            _.each(checkCompany,function (o) {
                o.checked = false;
            });

            let checkWarehouse = jQuery('input[name="checkbox-allWarehouse"]');
            let valuesWarehouse = [].filter.call(checkWarehouse, function(o) {
                return o.checked || !o.checked;
            }).map(function(o) {
                return o.value;
            });

            _.each(checkWarehouse,function (o) {
                o.checked = true;
            });

            onhand.onChange('All');
            onhandAll.onChange(true);
            this.props.optionsActions.get();
        } else {
            this.setState({
                selectedOnHandWarehouse: false,
                selectedOnHandLocation: false,
                selectedOnHandAll: false,
                changedOnHandLocation: false,
                clickAllLocarion: false,
                firstloading: false,
                chkLocation: []
            });

            let checkCompany = jQuery('input[name="checkbox-allCompany"]');
            let values = [].filter.call(checkCompany, function(o) {
                return o.checked || !o.checked;
            }).map(function(o) {
                return o.value;
            });

            onhandLocationValue.onChange([]);
            onhandWarehouseValue.onChange([]);
            onhand.onChange('Location');
            onhandAll.onChange(false);
            this.props.optionsActions.getOnHandWarehouse(values);
        }
    }

    selectedSalesLocation = e =>{
        let { fields: { sales, salesAll, salesWarehouseValue, salesLocationValue }} = this.props;
        if (e.target.checked) {
            this.setState({
                selectedSalesWarehouse: true,
                selectedSalesLocation: true,
                selectedSalesAll: true,
                changedSalesLocation: true,
                clickAllSalesLocarion: true,
                firstloading: false
            });

            let checkSalesCompany = jQuery('input[name="checkbox-allSalesCompany"]');
            let values = [].filter.call(checkSalesCompany, function(o) {
                return o.checked || !o.checked;
            }).map(function(o) {
                return o.value;
            });
            this.setState({chkSalesLocation: values});

            _.each(checkSalesCompany,function (o) {
                o.checked = false;
            });

            let checkSalesWarehouse = jQuery('input[name="checkbox-allSalesWarehouse"]');
            let valuesSalesWarehouse = [].filter.call(checkSalesWarehouse, function(o) {
                return o.checked || !o.checked;
            }).map(function(o) {
                return o.value;
            });

            _.each(checkSalesWarehouse,function (o) {
                o.checked = true;
            });

            sales.onChange('All');
            salesAll.onChange(true);
            this.props.optionsActions.get();
        } else {
            this.setState({
                selectedSalesWarehouse: false,
                selectedSalesLocation: false,
                selectedSalesAll: false,
                changedSalesLocation: false,
                clickAllSalesLocarion: false,
                firstloading: false,
                chkSalesLocation: []
            });

            let checkSalesCompany = jQuery('input[name="checkbox-allSalesCompany"]');
            let values = [].filter.call(checkSalesCompany, function(o) {
                return o.checked || !o.checked;
            }).map(function(o) {
                return o.value;
            });

            salesLocationValue.onChange([]);
            salesWarehouseValue.onChange([]);
            sales.onChange('SalesLocation');
            salesAll.onChange(false);
            this.props.optionsActions.getSalesWarehouse(values);
        }
    }

    selectedSalesChannel = e =>{
        let { fields: { sales, salesChannel, salesChannelValue, salesChannelType }} = this.props;
        if (e.target.checked) {
            this.setState({
                selectedSalesChannel: true,
                clickAllSalesChannel: true,
                firstloading: false
            });

            let checkSalesChannel = jQuery('input[name="checkbox-allSalesChannel"]');
            let values = [].filter.call(checkSalesChannel, function(o) {
                return o.checked || !o.checked;
            }).map(function(o) {
                return o.value;
            });
            this.setState({chkSalesChannel: values});

            _.each(checkSalesChannel,function (o) {
                o.checked = false;
            });

            salesChannelType.onChange('All');
            this.props.optionsActions.get();
        } else {
            this.setState({
                selectedSalesChannel: false,
                clickAllSalesChannel: false,
                firstloading: false,
                chkSalesChannel: []
            });

            let checkSalesChannel = jQuery('input[name="checkbox-allSalesChannel"]');
            let values = [].filter.call(checkSalesChannel, function(o) {
                return o.checked || !o.checked;
            }).map(function(o) {
                return o.value;
            });

            salesChannelValue.onChange([]);
            salesChannelType.onChange('SalesChannel');
        }
    }

    selectedOnHandAll(e){
        let {fields: { onhand, onhandAll }} = this.props;
        if(e.target.checked){
            this.setState({
                selectedOnHandWarehouse: false, selectedOnHandLocation: false, selectedOnHandAll: true
            });
            onhand.onChange('All');
        }else{
            this.setState({
                selectedOnHandWarehouse: false, selectedOnHandLocation: false, selectedOnHandAll: false
            });
            onhand.onChange('notAll');
        }
    }

    generatePassword(){
        let pass = GenPassword();
        this.setState({genPass: pass});
        this.props.fields.password.onChange(pass);
    }

    renderOption(type){
        if (typeof (this.props.options) !== 'undefined') {
            if (this.props.options.length == 0) {
                switch(type){
                    case 'role':
                        return (<option value={''}>{'Please select role'}</option>);
                    case 'curr':
                        return (<option value={''}>{'Please select currency'}</option>);
                    case 'comp':
                        return (<option value={''}>{'Please select company'}</option>);
                    case 'site':
                        return (<option value={''}>{'Please select Site'}</option>);
                    case 'warehouse':
                        return (<option value={''}>{'Please select Location'}</option>);
                    default:
                        return false;
                }
            } else {
                switch(type){
                    case 'role':
                        if (this.props.options) {
                            return this.props.options.roles.map(role => {
                                return (<option key={role.id} value={role.name}>{role.name}</option>);
                            });
                        }
                    case 'curr':
                        if (this.props.options) {
                            return this.props.options.currencies.map(curr => {
                                return (<option key={curr.id} value={curr.name}>{curr.name}</option>);
                            });
                        }
                    case 'comp':
                        if (this.props.options) {
                            return this.props.options.companies.map(comp => {
                                return (<option key={comp.id}  value={comp.code}>{comp.name}</option>);
                            });
                        }
                    case 'site':
                        if (this.props.options) {
                            return this.props.options.locations.map(site => {
                                return (
                                    <option key={site.id}  value={site.code}>{site.code + ' [' + site.name + ']'}</option>
                                );
                            });
                        }
                    case 'warehouse':
                        if (this.props.options) {
                            return this.props.options.warehouses.map(warehouse => {
                                return (
                                    <option key={warehouse.id}  value={warehouse.code}>{warehouse.code + ' [' + warehouse.name + ']'}</option>
                                );
                            });
                        }
                    default:
                        return false;
                }
            }
        }
    }

    treeOnClickSPP(vals){
        let { fields: { notUseHierarchy } } = this.props;
        this.props.optionsActions.setHierarchy(vals);
        let objHeirarchy = SelectedHierarchy(this, vals, 'SPP');
        this.props.optionsActions.setNotUseHierarchy(objHeirarchy);
        notUseHierarchy.onChange(objHeirarchy);
    }

    treeOnClickOBA(vals){
        let { fields: { notUseHierarchy } } = this.props;
        this.props.optionsActions.setHierarchy(vals);
        let objHeirarchy = SelectedHierarchy(this, vals, 'OBA');
        this.props.optionsActions.setNotUseHierarchy(objHeirarchy);
        notUseHierarchy.onChange(objHeirarchy);
    }

    treeOnClickACC(vals){
        let { fields: { notUseHierarchy } } = this.props;
        this.props.optionsActions.setHierarchy(vals);
        let objHeirarchy = SelectedHierarchy(this, vals, 'ACC');
        this.props.optionsActions.setNotUseHierarchy(objHeirarchy);
        notUseHierarchy.onChange(objHeirarchy);
    }

    treeOnClickSTO(vals){
        let { fields: { notUseHierarchy } } = this.props;
        this.props.optionsActions.setHierarchy(vals);
        let objHeirarchy = SelectedHierarchy(this, vals, 'STO');
        this.props.optionsActions.setNotUseHierarchy(objHeirarchy);
        notUseHierarchy.onChange(objHeirarchy);
    }

    treeOnClickWAT(vals){
        let { fields: { notUseHierarchy } } = this.props;
        this.props.optionsActions.setHierarchy(vals);
        let objHeirarchy = SelectedHierarchy(this, vals, 'WAT');
        this.props.optionsActions.setNotUseHierarchy(objHeirarchy);
        notUseHierarchy.onChange(objHeirarchy);
    }

    treeOnClickJLY(vals){
        let { fields: { notUseHierarchy } } = this.props;
        this.props.optionsActions.setHierarchy(vals);
        let objHeirarchy = SelectedHierarchy(this, vals, 'JLY');
        this.props.optionsActions.setNotUseHierarchy(objHeirarchy);
        notUseHierarchy.onChange(objHeirarchy);
    }

    treeOnClickSalesSPP(vals){
        let { fields: { notUseSalesHierarchy } } = this.props;
        this.props.optionsActions.setSalesHierarchy(vals);
        let objSalesHeirarchy = SelectedSalesHierarchy(this, vals, 'SPP');
        this.props.optionsActions.setNotUseSalesHierarchy(objSalesHeirarchy);
        notUseSalesHierarchy.onChange(objSalesHeirarchy);
    }

    treeOnClickSalesOBA(vals){
        let { fields: { notUseSalesHierarchy } } = this.props;
        this.props.optionsActions.setSalesHierarchy(vals);
        let objSalesHeirarchy = SelectedSalesHierarchy(this, vals, 'OBA');
        this.props.optionsActions.setNotUseSalesHierarchy(objSalesHeirarchy);
        notUseSalesHierarchy.onChange(objSalesHeirarchy);
    }

    treeOnClickSalesACC(vals){
        let { fields: { notUseSalesHierarchy } } = this.props;
        this.props.optionsActions.setSalesHierarchy(vals);
        let objSalesHeirarchy = SelectedSalesHierarchy(this, vals, 'ACC');
        this.props.optionsActions.setNotUseSalesHierarchy(objSalesHeirarchy);
        notUseSalesHierarchy.onChange(objSalesHeirarchy);
    }

    treeOnClickSalesSTO(vals){
        let { fields: { notUseSalesHierarchy } } = this.props;
        this.props.optionsActions.setSalesHierarchy(vals);
        let objSalesHeirarchy = SelectedSalesHierarchy(this, vals, 'STO');
        this.props.optionsActions.setNotUseSalesHierarchy(objSalesHeirarchy);
        notUseSalesHierarchy.onChange(objSalesHeirarchy);
    }

    treeOnClickSalesWAT(vals){
        let { fields: { notUseSalesHierarchy } } = this.props;
        this.props.optionsActions.setSalesHierarchy(vals);
        let objSalesHeirarchy = SelectedSalesHierarchy(this, vals, 'WAT');
        this.props.optionsActions.setNotUseSalesHierarchy(objSalesHeirarchy);
        notUseSalesHierarchy.onChange(objSalesHeirarchy);
    }

    treeOnClickSalesJLY(vals){
        let { fields: { notUseSalesHierarchy } } = this.props;
        this.props.optionsActions.setSalesHierarchy(vals);
        let objSalesHeirarchy = SelectedSalesHierarchy(this, vals, 'JLY');
        this.props.optionsActions.setNotUseSalesHierarchy(objSalesHeirarchy);
        notUseSalesHierarchy.onChange(objSalesHeirarchy);
    }

    handleInputChange = e => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        SetProductGroup(this, value, name, ClearHierarchy, hierarchyDataJewelry, hierarchyDataWatch,
            hierarchyDataStone, hierarchyDataAccessory, hierarchyDataOBA, hierarchyDataSpare
        );
    }

    handleInputChangeSales = e => {
        const target = e.target;
        const valueSales = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        SetProductGroupSales(this, valueSales, name, ClearHierarchy, hierarchyDataJewelrySales, hierarchyDataWatchSales, hierarchyDataStoneSales,
            hierarchyDataAccessorySales, hierarchyDataOBASales, hierarchyDataSpareSales
        );
    }

    handleInputChangePriceSales = e => {
        const target = e.target;
        const valuePriceSales = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        SetProductGroupPriceSales(this, valuePriceSales, name, ClearHierarchy, hierarchyDataJewelrySales, hierarchyDataWatchSales, hierarchyDataStoneSales,
            hierarchyDataAccessorySales, hierarchyDataOBASales, hierarchyDataSpareSales
        );
    }

    handleInputCategoryChange = e => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        SetCategoryHierarchy(this, value, name, ClearHierarchy, hierarchyDataJewelry, hierarchyDataWatch, hierarchyDataStone, hierarchyDataAccessory,
            hierarchyDataOBA, hierarchyDataSpare
        );
    }

    handleInputSalesCategoryChange = e => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        SetSalesCategoryHierarchy(this, value, name, ClearHierarchy, hierarchyDataJewelrySales, hierarchyDataWatchSales, hierarchyDataStoneSales,
            hierarchyDataAccessorySales, hierarchyDataOBASales, hierarchyDataSpareSales
        );
    }

    changedUserType = e => {
        const target = e.target;
        const { fields: { userType } } = this.props;
        this.props.usersActions.setUserType(target.value);
        userType.onChange(target.value)
    }

    render() {
        const userLogin = JSON.parse(sessionStorage.logindata);
        const { fields: {
                  id,firstName,lastName,username,email,password,role,currency,status,company,location,warehouse,productGroup,onhand,price,productGroupSTO,
                  productGroupJLY,productGroupWAT,onhandLocation,onhandAll,productGroupACC,productGroupOBA,productGroupSPA,onhandLocationValue,webOnly,
                  permissionId,onhandWarehouse,onhandWarehouseValue,productGroupErr,movement,categoryJLY,categoryWAT,categorySTO,categoryACC,categoryOBA,
                  categorySPP,notUseHierarchy,userType,productGroupSales,productGroupSalesSTO,productGroupSalesJLY,productGroupSalesWAT,productGroupSalesACC,
                  productGroupSalesOBA,productGroupSalesSPA,productGroupSalesErr,priceSalesRTP,priceSalesUCP,priceSalesCTP,priceSalesNSP,priceSalesMGP,
                  priceSalesDSP,salesLocation,salesLocationValue,salesWarehouse,salesWarehouseValue,salesAll,categorySalesJLY,categorySalesWAT,
                  categorySalesSTO,categorySalesACC,categorySalesOBA,categorySalesSPP,notUseSalesHierarchy,bomOnhand,bomSales
              },handleSubmit,submitting, CanNotUseHierarchy, userTypeValue, CanNotUseSalesHierarchy, HierarchyValue, SalesHierarchyValue } = this.props;
        let dataDropDowntLocations = [];
        let dataDropDowntWareHouse = [];
        let objWareHouseLocation = {};

        let dataDropDowntSalesLocations = [];
        let dataDropDowntSalesWareHouse = [];
        let dataDropDowntSalesChannel = [];

        objWareHouseLocation = FindLocationWareHouse(this);
        dataDropDowntLocations = objWareHouseLocation.location;
        dataDropDowntWareHouse = objWareHouseLocation.warehouse;
        dataDropDowntSalesLocations = objWareHouseLocation.salesLocation;
        dataDropDowntSalesWareHouse = objWareHouseLocation.salesWarehouse;

        if (this.props.options != undefined){
            if (this.props.options.salesChannels) {
                dataDropDowntSalesChannel.push(this.props.options.salesChannels.map(salesChannel =>{
                    return ({value: salesChannel.code, name:salesChannel.name});
                }))
                dataDropDowntSalesChannel = dataDropDowntSalesChannel[0];
            }
        }

        return (
            <form onSubmit={handleSubmit}>
                <div id="page-wrapper">
                    <RenderHeaderUserEdit submitting={submitting}/>
                    <div className="col-sm-12 nopadding">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="row margin-ft">
                                    <RenderUserProfileEdit props={this.props} state={this.state} onClickSubmitGenPass={this.generatePassword}/>
                                    <div className="col-sm-6 form-horizontal">
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Status</label>
                                            <div className="col-sm-7">
                                                <input type="checkbox" defaultChecked={this.props.user.status?'checked':''} {...status} />
                                                <span>Active</span>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Currency</label>
                                            <div className="col-sm-7">
                                                <select className="form-control" {...currency}>
                                                    <option key={''} value={''}>{'Please select currency'}</option>
                                                    {this.renderOption('curr')}
                                                </select>
                                            </div>
                                        </div>
                                        <div className={`form-group ${company.touched && company.invalid ? 'has-danger' : ''}` }>
                                            <label className="col-sm-4 control-label">Company</label>
                                            <div className="col-sm-7">
                                                <select className="form-control" {...company} onClick={this.selectedCompany} ref="company">
                                                    <option key={''} value={''}>{'Please select company'}</option>
                                                    {this.renderOption('comp')}
                                                </select>
                                                <div className="text-help">
                                                    { company.touched ? company.error : ''}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`form-group ${location.touched && location.invalid ? 'has-danger' : ''}` }>
                                            <label className="col-sm-4 control-label">Site</label>
                                            <div className="col-sm-7">
                                                <select  disabled={`${this.state.selectedCompany ? '' : 'disabled'}`}  className="form-control" {...location} onClick={this.selectedSite} ref="site">
                                                    <option key={''} value={''}>{'Please select Site'}</option>
                                                    {this.renderOption('site')}
                                                </select>
                                                <div className="text-help">
                                                    { location.touched ? location.error : ''}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`form-group ${warehouse.touched && warehouse.invalid ? 'has-danger' : ''}` }>
                                            <label className="col-sm-4 control-label">Location</label>
                                            <div className="col-sm-7">
                                                <select  disabled={`${this.state.selectedSite ? '' : 'disabled'}`}   className="form-control" {...warehouse} >
                                                    <option key={''} value={''}>{'Please select Location'}</option>
                                                    {this.renderOption('warehouse')}
                                                </select>
                                                <div className="text-help">
                                                    { warehouse.touched ? warehouse.error : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="bd-color"></div>
                                    </div>
                                    <div className="form-horizontal">
                                        <div className="col-sm-12">
                                            <h2>User Permission</h2>
                                        </div>
                                        <div className="col-sm-12 form-horizontal">
                                            <div className="form-group">
                                                <label className="col-sm-2 control-label">Role</label>
                                                <div className="col-sm-5">
                                                    <select className="form-control" {...role}>
                                                        <option key={''} value={''}>{'Please select role'}</option>
                                                        {this.renderOption('role')}
                                                    </select>
                                                </div>
                                            </div>

                                            <RenderTypeUser props={this.props} onClickChangedUserType={this.changedUserType}/>

                                            <RenderViewOnHandProductGroup props={this.props} state={this.state}
                                                onChangedSelectedProductGroup={this.selectedProductGroup}
                                                onChangedHandleInputChange={this.handleInputChange}/>

                                            <RenderViewSalesProductGroup props={this.props} state={this.state}
                                                onChangedSelectedProductGroupSales={this.selectedProductGroupSales}
                                                onChangedHandleInputChangeSales={this.handleInputChangeSales}/>

                                            <RenderViewPriceOnHand props={this.props} state={this.state}/>

                                            <RenderViewPriceSales props={this.props} state={this.state}
                                                onChangedPriceSales={this.handleInputChangePriceSales}/>

                                            <RenderViewSalesChannel props={this.props} state={this.state}
                                                dataDropDowntSalesChannel={dataDropDowntSalesChannel}
                                                onChangedSalesChannel={this.selectedSalesChannel}
                                                onChangedSalesChannelChecked={this.changedSalesChannelChecked}/>

                                            <RenderViewOnHand props={this.props} state={this.state}
                                                onChangedOnHandLocation={this.selectedOnHandLocation}
                                                onChangedOnHandLocationChecked={this.changedOnHandLocationChecked}
                                                onChangedOnHandWarehouse={this.selectedOnHandWarehouse}
                                                onChangedOnHandWarehouseChecked={this.changedOnHandWarehouseChecked}
                                                onChangedOnHandAll={this.selectedOnHandAll}
                                                dataDropDowntLocations={dataDropDowntLocations}
                                                dataDropDowntWareHouse={dataDropDowntWareHouse}/>

                                            <RenderViewSales props={this.props} state={this.state}
                                                onChangedSalesLocation={this.selectedSalesLocation}
                                                onChangedSalesLocationChecked={this.changedSalesLocationChecked}
                                                onChangedSalesWarehouse={this.selectedSalesWarehouse}
                                                onChangedSalesWarehouseChecked={this.changedSalesWarehouseChecked}
                                                onChangedSalesAll={this.selectedSalesAll}
                                                dataDropDowntSalesLocations={dataDropDowntSalesLocations}
                                                dataDropDowntSalesWareHouse={dataDropDowntSalesWareHouse}/>


                                            <div className={`form-group maring-t30 ${userTypeValue != 'Sales'?'':'hidden'}`}>
                                                <label className="col-md-2 control-label">On Hand Product Hierarchy</label>
                                                <div className="col-md-8">
                                                    <div className="user-alert">Restricted Product Hierarchy (You can grant permission to view Product Hierarchy)</div>
                                                </div>
                                            </div>
                                            <div className={`form-group ${userTypeValue != 'Sales'?'':'hidden'}`}>
                                                <label className="col-sm-2 control-label"> </label>
                                                <div className={`col-sm-10 nopadding ${this.state.hidecategory ? 'hiddenViewProductGroup' : ''}`}>
                                                    <div>
                                                        <label className="col-sm-12 control-label">
                                                            <input type="checkbox" value="JLY"
                                                                checked={categoryJLY.value === 'JLY'}
                                                                {...categoryJLY}
                                                                disabled={this.state.hidecategory
                                                                    ?true
                                                                    :this.state.value == 1
                                                                        ?false
                                                                        :productGroupJLY.value != undefined && productGroupJLY.value
                                                                            ?false
                                                                            :true
                                                                }
                                                                onChange={this.handleInputCategoryChange} /> Jewelry
                                                        </label>
                                                        <div className={`col-md-12 control-label bd-box
                                                            ${(categoryJLY.value) ? '':'disabledTreeView'}
                                                            ${(this.state.hidecategory) ? 'hidden':''}`} >
                                                            <Tree data={hierarchyDataJewelry} onClick={this.treeOnClickJLY} ref="treeviewJLY"/>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="col-md-12 control-label">
                                                            <input type="checkbox" value="WAT"
                                                                checked={categoryWAT.value === 'WAT'}
                                                                {...categoryWAT}
                                                                disabled={this.state.hidecategory
                                                                    ?true
                                                                    :this.state.value == 1
                                                                        ?false
                                                                        :productGroupWAT.value != undefined && productGroupWAT.value
                                                                            ?false
                                                                            :true
                                                                }
                                                                onChange={this.handleInputCategoryChange} /> Watch
                                                        </label>
                                                        <div className={`col-md-12 control-label bd-box
                                                            ${(categoryWAT.value) ? '':'disabledTreeView'}
                                                            ${(this.state.hidecategory) ? 'hidden':''}`}>
                                                            <Tree data={hierarchyDataWatch} onClick={this.treeOnClickWAT} ref="treeviewWAT"/>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="col-md-12 control-label">
                                                            <input type="checkbox" value="STO"
                                                                checked={categorySTO.value === 'STO'}
                                                                {...categorySTO}
                                                                disabled={this.state.hidecategory
                                                                    ?true
                                                                    :this.state.value == 1
                                                                        ?false
                                                                        :productGroupSTO.value != undefined && productGroupSTO.value
                                                                            ?false
                                                                            :true
                                                                }
                                                                onChange={this.handleInputCategoryChange} /> Stone
                                                        </label>
                                                        <div className={`col-md-12 control-label bd-box
                                                            ${(categorySTO.value) ? '':'disabledTreeView'}
                                                            ${(this.state.hidecategory) ? 'hidden':''}`}>
                                                            <Tree data={hierarchyDataStone} onClick={this.treeOnClickSTO} ref="treeviewSTO"/>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="col-md-12 control-label">
                                                            <input type="checkbox" value="ACC"
                                                                checked={categoryACC.value === 'ACC'}
                                                                {...categoryACC}
                                                                disabled={this.state.hidecategory
                                                                    ?true
                                                                    :this.state.value == 1
                                                                        ?false
                                                                        :productGroupACC.value != undefined && productGroupACC.value
                                                                            ?false
                                                                            :true
                                                                }
                                                                onChange={this.handleInputCategoryChange} /> Accessory
                                                        </label>
                                                        <div className={`col-md-12 control-label bd-box
                                                            ${(categoryACC.value) ? '':'disabledTreeView'}
                                                            ${(this.state.hidecategory) ? 'hidden':''}`}>
                                                            <Tree data={hierarchyDataAccessory} onClick={this.treeOnClickACC} ref="treeviewACC"/>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label  className="col-md-12 control-label">
                                                            <input type="checkbox" value="OBA"
                                                                checked={categoryOBA.value === 'OBA'}
                                                                {...categoryOBA}
                                                                disabled={this.state.hidecategory
                                                                    ?true
                                                                    :this.state.value == 1
                                                                        ?false
                                                                        :productGroupOBA.value != undefined && productGroupOBA.value
                                                                            ?false
                                                                            :true
                                                                }
                                                                onChange={this.handleInputCategoryChange} /> Object of Art
                                                        </label>
                                                        <div className={`col-md-12 bd-box control-label
                                                            ${(categoryOBA.value) ? '':'disabledTreeView'}
                                                            ${(this.state.hidecategory) ? 'hidden':''}`}>
                                                            <Tree data={hierarchyDataOBA} onClick={this.treeOnClickOBA} ref="treeviewOBA"/>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="col-md-12 control-label">
                                                            <input type="checkbox" value="SPP"
                                                                checked={categorySPP.value === 'SPP'}
                                                                {...categorySPP}
                                                                disabled={this.state.hidecategory
                                                                    ?true
                                                                    :this.state.value == 1
                                                                        ?false
                                                                        :productGroupSPA.value != undefined && productGroupSPA.value
                                                                            ?false
                                                                            :true
                                                                }
                                                                onChange={this.handleInputCategoryChange} /> Spare Parts
                                                        </label>
                                                        <div className={`col-md-12 bd-box control-label
                                                            ${(categorySPP.value) ? '':'disabledTreeView'}
                                                            ${(this.state.hidecategory) ? 'hidden':''}`}>
                                                            <Tree data={hierarchyDataSpare} onClick={this.treeOnClickSPP} onUnClick={this.treeOnUnClick} ref="treeviewSPP"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`form-group maring-t30 ${userTypeValue != 'OnHand'?'':'hidden'}`}>
                                                <label className="col-md-2 control-label">Sales Product Hierarchy</label>
                                                <div className="col-md-8">
                                                    <div className="user-alert">Restricted Product Hierarchy (You can grant permission to view Product Hierarchy)</div>
                                                </div>
                                            </div>
                                            <div className={`form-group ${userTypeValue != 'OnHand'?'':'hidden'}`}>
                                                <label className="col-sm-2 control-label"> </label>
                                                <div className={`col-sm-10 nopadding ${this.state.hideCategorySales ? 'hiddenViewProductGroup' : ''}`}>
                                                    <div>
                                                        <label className="col-sm-12 control-label">
                                                            <input type="checkbox" value="JLY"
                                                                checked={categorySalesJLY.value === 'JLY'}
                                                                {...categorySalesJLY}
                                                                disabled={this.state.hideCategorySales
                                                                    ?true
                                                                    :this.state.valueSales == 1
                                                                        ?false
                                                                        :productGroupSalesJLY.value != undefined && productGroupSalesJLY.value
                                                                            ?false
                                                                            :true
                                                                }
                                                                onChange={this.handleInputSalesCategoryChange} /> Jewelry
                                                        </label>
                                                        <div className={`col-md-12 control-label bd-box
                                                            ${(categorySalesJLY.value) ? '':'disabledTreeView'}
                                                            ${(this.state.hideCategorySales) ? 'hidden':''}`} >
                                                            <Tree data={hierarchyDataJewelrySales} onClick={this.treeOnClickSalesJLY} ref="treeviewSalesJLY"/>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="col-md-12 control-label">
                                                            <input type="checkbox" value="WAT"
                                                                checked={categorySalesWAT.value === 'WAT'}
                                                                {...categorySalesWAT}
                                                                disabled={this.state.hideCategorySales
                                                                    ?true
                                                                    :this.state.valueSales == 1
                                                                        ?false
                                                                        :productGroupSalesWAT.value != undefined && productGroupSalesWAT.value
                                                                            ?false
                                                                            :true
                                                                }
                                                                onChange={this.handleInputSalesCategoryChange} /> Watch
                                                        </label>
                                                        <div className={`col-md-12 control-label bd-box
                                                            ${(categorySalesWAT.value) ? '':'disabledTreeView'}
                                                            ${(this.state.hideCategorySales) ? 'hidden':''}`}>
                                                            <Tree data={hierarchyDataWatchSales} onClick={this.treeOnClickSalesWAT} onUnClick={this.treeOnUnClickSales} ref="treeviewSalesWAT"/>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="col-md-12 control-label">
                                                            <input type="checkbox" value="STO"
                                                                checked={categorySalesSTO.value === 'STO'}
                                                                {...categorySalesSTO}
                                                                disabled={this.state.hideCategorySales
                                                                    ?true
                                                                    :this.state.valueSales == 1
                                                                        ?false
                                                                        :productGroupSalesSTO.value != undefined && productGroupSalesSTO.value
                                                                            ?false
                                                                            :true
                                                                }
                                                                onChange={this.handleInputSalesCategoryChange} /> Stone
                                                        </label>
                                                        <div className={`col-md-12 control-label bd-box
                                                            ${(categorySalesSTO.value) ? '':'disabledTreeView'}
                                                            ${(this.state.hideCategorySales) ? 'hidden':''}`}>
                                                            <Tree data={hierarchyDataStoneSales} onClick={this.treeOnClickSalesSTO} onUnClick={this.treeOnUnClickSales} ref="treeviewSalesSTO"/>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="col-md-12 control-label">
                                                            <input type="checkbox" value="ACC"
                                                                checked={categorySalesACC.value === 'ACC'}
                                                                {...categorySalesACC}
                                                                disabled={this.state.hideCategorySales
                                                                    ?true
                                                                    :this.state.valueSales == 1
                                                                        ?false
                                                                        :productGroupSalesACC.value != undefined && productGroupSalesACC.value
                                                                            ?false
                                                                            :true
                                                                }
                                                                onChange={this.handleInputSalesCategoryChange} /> Accessory
                                                        </label>
                                                        <div className={`col-md-12 control-label bd-box
                                                            ${(categorySalesACC.value) ? '':'disabledTreeView'}
                                                            ${(this.state.hideCategorySales) ? 'hidden':''}`}>
                                                            <Tree data={hierarchyDataAccessorySales} onClick={this.treeOnClickSalesACC} onUnClick={this.treeOnUnClickSales} ref="treeviewSalesACC"/>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label  className="col-md-12 control-label">
                                                            <input type="checkbox" value="OBA"
                                                                checked={categorySalesOBA.value === 'OBA'}
                                                                {...categorySalesOBA}
                                                                disabled={this.state.hideCategorySales
                                                                    ?true
                                                                    :this.state.valueSales == 1
                                                                        ?false
                                                                        :productGroupSalesOBA.value != undefined && productGroupSalesOBA.value
                                                                            ?false
                                                                            :true
                                                                }
                                                                onChange={this.handleInputSalesCategoryChange} /> Object of Art
                                                        </label>
                                                        <div className={`col-md-12 bd-box control-label
                                                            ${(categorySalesOBA.value) ? '':'disabledTreeView'}
                                                            ${(this.state.hideCategorySales) ? 'hidden':''}`}>
                                                            <Tree data={hierarchyDataOBASales} onClick={this.treeOnClickSalesOBA} onUnClick={this.treeOnUnClickSales} ref="treeviewSalesOBA"/>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="col-md-12 control-label">
                                                            <input type="checkbox" value="SPP"
                                                                checked={categorySalesSPP.value === 'SPP'}
                                                                {...categorySalesSPP}
                                                                disabled={this.state.hideCategorySales
                                                                    ?true
                                                                    :this.state.valueSales == 1
                                                                        ?false
                                                                        :productGroupSalesSPA.value != undefined && productGroupSalesSPA.value
                                                                            ?false
                                                                            :true
                                                                }
                                                                onChange={this.handleInputSalesCategoryChange} /> Spare Parts
                                                        </label>
                                                        <div className={`col-md-12 bd-box control-label
                                                            ${(categorySalesSPP.value) ? '':'disabledTreeView'}
                                                            ${(this.state.hideCategorySales) ? 'hidden':''}`}>
                                                            <Tree data={hierarchyDataSpareSales} onClick={this.treeOnClickSalesSPP} onUnClick={this.treeOnUnClickSales} ref="treeviewSalesSPP"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-xs-12 m-nopadding text-right">
                                        <Link to="/users" className="btn btn-primary btn-radius">Back to User List</Link>
                                        <button type="submit" className="btn btn-primary btn-radius" disabled={submitting}>Update User</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

function mapStateToProps(state){
    return {
        initialValues: state.users.user,
        options: state.users.options,
        locationOnHand: state.users.locationOnHand,
        warehouseOnHand: state.users.warehouseOnHand,
        selectedCompany:state.users.selectedCompany,
        selectedWarehouses:state.users.selectedWarehouses,
        HierarchyValue: state.searchResult.HierarchyValue,
        CanNotUseHierarchy: state.users.canNotUseHierarchy,
        userTypeValue: state.users.userTypeValue,
        locationSales: state.users.locationSales,
        warehouseSales: state.users.warehouseSales,
        CanNotUseSalesHierarchy: state.users.canNotUseSalesHierarchy,
        SalesHierarchyValue: state.searchResult.SalesHierarchyValue,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        optionsActions: bindActionCreators(Object.assign({}, masterDataActions), dispatch),
        usersActions: bindActionCreators(Object.assign({}, usersActions), dispatch)
    }
}

module.exports = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'UsersUpdateForm',
  fields: fields,
  // validate:validateUserEdit
},mapStateToProps,mapDispatchToProps)(UserDetailsFrom);
