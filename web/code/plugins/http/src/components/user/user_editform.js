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
import ClearHierarchy from './utils/clear_hierarchy';
import SelectedHierarchy from './utils/selected_hierarchy';
import FindLocationWareHouse from './utils/find_location_warehouse_edit';
import SetCategoryHierarchy from './utils/set_category_hierarchy_edit';
import SetProductGroup from './utils/set_productgroup';
import SetProductGroupSales from './utils/set_productgroup_sales';
import SetProductGroupPriceSales from './utils/set_productgroup_pricesales';

let _ = require('lodash');
let hierarchyDataJewelry = [];
let hierarchyDataWatch = [];
let hierarchyDataStone = [];
let hierarchyDataAccessory = [];
let hierarchyDataOBA = [];
let hierarchyDataSpare = [];

export const fields = [
    'id','firstName','lastName','username','email','password','role','currency','status','company','location','warehouse','productGroup','onhand','price',
    'productGroupSTO','productGroupJLY','productGroupWAT','productGroupACC','productGroupOBA','productGroupSPA','onhandLocationValue','webOnly','permissionId',
    'onhandLocation','onhandAll','onhandWarehouse','onhandWarehouseValue','productGroupErr','movement','categoryJLY','categoryWAT','categorySTO','categoryACC',
    'categoryOBA','categorySPP','notUseHierarchy', 'userType','productGroupSales','productGroupSalesSTO','productGroupSalesJLY','productGroupSalesWAT',
    'productGroupSalesACC','productGroupSalesOBA','productGroupSalesSPA','productGroupSalesErr','priceSalesRTP','priceSalesUCP','priceSalesCTP','priceSalesNSP',
    'priceSalesMGP','priceSalesDSP','salesLocation','salesLocationValue','salesWarehouse','salesWarehouseValue','salesAll','sales'
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

        this.selectedSalesLocation = this.selectedSalesLocation.bind(this);
        this.selectedSalesWarehouse = this.selectedSalesWarehouse.bind(this);
        this.changedSalesLocationChecked = this.changedSalesLocationChecked.bind(this);
        this.changedSalesWarehouseChecked = this.changedSalesWarehouseChecked.bind(this);
        // this.selectedSalesAll = this.selectedSalesAll.bind(this);

        hierarchyDataJewelry.push(TreeDataJewelry);
        hierarchyDataWatch.push(TreeDataWatch);
        hierarchyDataStone.push(TreeDataStone);
        hierarchyDataAccessory.push(TreeDataAccessory);
        hierarchyDataOBA.push(TreeDataOBA);
        hierarchyDataSpare.push(TreeDataSpare);
        ClearHierarchy(hierarchyDataJewelry);
        ClearHierarchy(hierarchyDataWatch);
        ClearHierarchy(hierarchyDataStone);
        ClearHierarchy(hierarchyDataAccessory);
        ClearHierarchy(hierarchyDataOBA);
        ClearHierarchy(hierarchyDataSpare);

        this.state = {
            hideProductGroups: (this.props.user.productGroup == 2) ? false: true,
            hidecategory: (this.props.user.productGroup != 0) ? false: true,
            productGroupDatas:[],
            hideProductGroupsSales: (this.props.user.productGroupSales == 2) ? false: true,
            hidecategorySales: (this.props.user.productGroupSales != 0) ? false: true,
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
            clickAllSalesWarehouse: (this.props.user.permission.salesWarehouse != undefined)?(this.props.user.permission.salesWarehouse.type.indexOf('All') == -1) ? false : true : false
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
        });
        this.props.optionsActions.setHierarchy(JSON.parse(this.props.user.permission.notUseHierarchy));
        this.props.optionsActions.setNotUseHierarchy(JSON.parse(this.props.user.permission.notUseHierarchy));
    }

    componentWillReceiveProps = (nextProps)=> {
        const { props } = this;
        const { fields: { onhandLocationValue, onhandWarehouseValue, salesLocationValue, salesWarehouseValue } } = nextProps;

        if(this.props.user.permission.onhandLocation != undefined){
            if (this.state.selectedOnHandLocation) {

            }else{
                this.setState({chkLocation: onhandLocationValue.value});
            }
        }

        if(this.props.user.permission.onhandWarehouse != undefined){
            if (this.state.selectedOnHandWarehouse) {

            }else{
                this.setState({chkWarehouse: onhandWarehouseValue.value});
            }
        }

        if(this.props.user.permission.salesLocation != undefined){
            if (this.state.selectedSalesLocation) {

            }else{
                this.setState({chkSalesLocation: salesLocationValue.value});
            }
        }

        if(this.props.user.permission.salesWarehouse != undefined){
            if (this.state.selectedSalesWarehouse) {

            }else{
                this.setState({chkSalesWarehouse: salesWarehouseValue.value});
            }
        }

        if(props.HierarchyValue != null){
            if(props.HierarchyValue.length != 0){
                if(props.HierarchyValue.JLY != undefined){
                    this.refs.treeviewJLY.handleChange(props.HierarchyValue.JLY);
                }
                if(props.HierarchyValue.WAT != undefined){
                    this.refs.treeviewWAT.handleChange(props.HierarchyValue.WAT);
                }
                if(props.HierarchyValue.STO != undefined){
                    this.refs.treeviewSTO.handleChange(props.HierarchyValue.STO);
                }
                if(props.HierarchyValue.ACC != undefined){
                    this.refs.treeviewACC.handleChange(props.HierarchyValue.ACC);
                }
                if(props.HierarchyValue.OBA != undefined){
                    this.refs.treeviewOBA.handleChange(props.HierarchyValue.OBA);
                }
                if(props.HierarchyValue.SPP != undefined){
                    this.refs.treeviewSPP.handleChange(props.HierarchyValue.SPP);
                }
            }
        }else{
            this.refs.treeviewJLY.handleChange([]);
            this.refs.treeviewWAT.handleChange([]);
            this.refs.treeviewSTO.handleChange([]);
            this.refs.treeviewACC.handleChange([]);
            this.refs.treeviewOBA.handleChange([]);
            this.refs.treeviewSPP.handleChange([]);
        }
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
                let checkWarehouse = jQuery('input[name="checkbox-allWarehouse"]');
                let values = [].filter.call(checkWarehouse, function(o) {
                    return o.checked || !o.checked;
                }).map(function(o) {
                    return o.value;
                });
                if (checkedBoxes.length == values.length) {
                    this.setState({selectedSalesWarehouse: true});
                    this.setState({clickAllWarehouse: true});
                    sales.onChange('All');
                    salesAll.onChange(true);
                }
            }else{
                if (this.state.clickAllSalesWarehouse) {
                    let checkSalesWarehouse = jQuery('input[name="checkbox-allSalesWarehouse"]');
                    let values = [].filter.call(checkSalesWarehouse, function(o) {
                        return o.checked || !o.checked;
                    }).map(function(o) {
                        return o.value;
                    });
                    checkedBoxes = values;
                    sales.onChange('SalesWarehouse');
                    salesAll.onChange(false);
                }
                checkedBoxes.splice(checkedBoxes.indexOf(el.value), 1);
                this.setState({selectedSalesWarehouse: false});
                this.setState({clickAllSalesWarehouse: false});
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
            }else {
                if (this.state.clickAllLocarion) {
                    checkedBoxes = valuesAllCompany;
                    onhand.onChange('Location');
                    onhandAll.onChange(false);
                }
                checkedBoxes.splice(checkedBoxes.indexOf(el.value), 1);
                this.setState({selectedOnHandLocation: false});
                this.setState({clickAllLocarion: false});
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
                    this.setState({clickAllLocarion: true});
                    sales.onChange('All');
                    salesAll.onChange(true);
                }
            }else {
                if (this.state.clickAllSalesLocarion) {
                    checkedBoxes = valuesAllSalesCompany;
                    sales.onChange('SalesLocation');
                    salesAll.onChange(false);
                }
                checkedBoxes.splice(checkedBoxes.indexOf(el.value), 1);
                this.setState({selectedSalesLocation: false});
                this.setState({clickAllSalesLocarion: false});
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
                hidecategorySales: false,
                valueSales: 2
            });
        } else if(e.target.value == 1) { //select All disbal all check box
            this.setState({
                hideProductGroupsSales: true,
                productGroupDatasSales: this.props.options.productGroupsSales,
                hidecategorySales: false,
                valueSales: 1
            });
        } else {
            this.setState({
                hideProductGroupsSales: true,
                productGroupDatasSales: [],
                hidecategorySales: true,
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
                changedOnHandLocation: true,
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
        ReactDOM.findDOMNode(this.refs.password).focus();
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

        SetProductGroupSales(this, valueSales, name, ClearHierarchy, hierarchyDataJewelry, hierarchyDataWatch,
            hierarchyDataStone, hierarchyDataAccessory, hierarchyDataOBA, hierarchyDataSpare
        );
    }

    handleInputChangePriceSales = e => {
        const target = e.target;
        const valuePriceSales = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        SetProductGroupPriceSales(this, valuePriceSales, name, ClearHierarchy, hierarchyDataJewelry, hierarchyDataWatch,
            hierarchyDataStone, hierarchyDataAccessory, hierarchyDataOBA, hierarchyDataSpare
        );
    }

    handleInputCategoryChange = e => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        SetCategoryHierarchy(this, value, name, ClearHierarchy, hierarchyDataJewelry, hierarchyDataWatch,
            hierarchyDataStone, hierarchyDataAccessory, hierarchyDataOBA, hierarchyDataSpare
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
                  priceSalesDSP,salesLocation,salesLocationValue,salesWarehouse,salesWarehouseValue,salesAll
              },handleSubmit,submitting, CanNotUseHierarchy,userTypeValue } = this.props;
        let dataDropDowntLocations = [];
        let dataDropDowntWareHouse = [];
        let objWareHouseLocation = {};

        let dataDropDowntSalesLocations = [];
        let dataDropDowntSalesWareHouse = [];

        objWareHouseLocation = FindLocationWareHouse(this);
        dataDropDowntLocations = objWareHouseLocation.location;
        dataDropDowntWareHouse = objWareHouseLocation.warehouse;
        dataDropDowntSalesLocations = objWareHouseLocation.salesLocation;
        dataDropDowntSalesWareHouse = objWareHouseLocation.salesWarehouse;
        console.log('dataDropDowntWareHouse-->',dataDropDowntWareHouse.length);
        console.log('dataDropDowntSalesWareHouse-->',dataDropDowntSalesWareHouse.length);

        return (
            <form onSubmit={handleSubmit}>
                <div id="page-wrapper">
                    <div id="scroller" className="col-sm-12 bg-hearder bg-header-inventories">
                        <div className="col-xs-6 m-width-60 ft-white m-nopadding">
                            <h1>User Details</h1>
                        </div>
                        <div className="col-sm-6 m-width-40 m-nopadding text-right maring-t15">
                            <Link to="/users" className="btn btn-primary btn-radius">Back to User List</Link>
                            <button type="submit" className="btn btn-primary btn-radius" disabled={submitting}>Update User</button>
                        </div>
                    </div>
                    <div className="col-sm-12 nopadding">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="row margin-ft">
                                    <div className="col-sm-12">
                                        <h2>User Profile</h2>
                                    </div>
                                    <div className="form-group hidden" >
                                        <label>Id</label>
                                        <input type="text" className="form-control" {...id}/>
                                    </div>
                                    <div className="col-sm-6 form-horizontal">
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">First Name</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" {...firstName} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Last Name</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" {...lastName} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Email</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" {...email} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">User Name</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" {...username} disabled="disabled"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Password</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" value={this.state.genPass} ref="password" {...password}/>
                                                <div className="gen-passord">
                                                    <input type="button" className="btn btn-primary pull-xs-right btn-radius" value="Generate" onClick={this.generatePassword}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                            <div className="form-group">
                                                <label className="col-sm-2 control-label">Type</label>
                                                <div className="col-sm-4">
                                                    <label>
                                                        <input type="radio" {...userType} value="OnHand"
                                                            checked={userType.value === 'OnHand'} onClick={this.changedUserType}/> On Hand Module
                                                    </label>
                                                </div>
                                                <div className="col-sm-4">
                                                    <label>
                                                        <input type="radio" {...userType} value="Sales"
                                                            checked={userType.value === 'Sales'} onClick={this.changedUserType}/> Sales Module
                                                    </label>
                                                </div>
                                                <div className="col-sm-2">
                                                    <label>
                                                        <input type="radio" {...userType} value="All"
                                                            checked={userType.value === 'All'} onClick={this.changedUserType}/> Both Module
                                                    </label>
                                                </div>
                                            </div>
                                            <div className={`form-group ${userTypeValue != 'Sales'?'':'hidden'}`}>
                                                <label className="col-sm-2 control-label">View On Hand Product Group</label>
                                                <div className="col-sm-5">
                                                    <select className="form-control" {...productGroup}
                                                        value={this.state.value} onChange={this.selectedProductGroup}>
                                                        <option key={0} value={0}>{'Please select Product Group'}</option>
                                                        <option key={1} value={1}>{'All Product Group'}</option>
                                                        <option key={2} value={2}>{'Some Product Group'}</option>
                                                    </select>
                                                    <div id="checkboxlistProduct" className={`${this.state.hideProductGroups ? 'hiddenViewProductGroup' : ''}` }>
                                                        <div>
                                                            <input type="checkbox"  value="JLY"
                                                                checked={productGroupJLY.value === 'JLY'}
                                                                {...productGroupJLY}
                                                                onChange={this.handleInputChange}/>
                                                            <span>Jewelry</span>
                                                        </div>
                                                        <div>
                                                            <input type="checkbox"  value="WAT"
                                                                checked={productGroupWAT.value === 'WAT'}
                                                                {...productGroupWAT}
                                                                onChange={this.handleInputChange}/>
                                                            <span>Watch</span>
                                                        </div>
                                                        <div>
                                                            <input type="checkbox" value="STO"
                                                                checked={productGroupSTO.value === 'STO'}
                                                                {...productGroupSTO}
                                                                onChange={this.handleInputChange}/>
                                                            <span>Stone</span>
                                                        </div>
                                                        <div>
                                                            <input type="checkbox"  value="ACC"
                                                                checked={productGroupACC.value === 'ACC'}
                                                                {...productGroupACC}
                                                                onChange={this.handleInputChange}/>
                                                            <span>Accessory</span>
                                                        </div>
                                                        <div>
                                                            <input type="checkbox"  value="OBA"
                                                                checked={productGroupOBA.value === 'OBA'}
                                                                {...productGroupOBA}
                                                                onChange={this.handleInputChange}/>
                                                            <span>Object Of Art</span>
                                                        </div>
                                                        <div>
                                                            <input type="checkbox"  value="SPA"
                                                                checked={productGroupSPA.value === 'SPA'}
                                                                {...productGroupSPA}
                                                                onChange={this.handleInputChange}/>
                                                            <span>Spare Parts</span>
                                                        </div>
                                                    </div>
                                                    {/*<div className="text-help">
                                                        { productGroupErr.touched ? productGroupErr.error : ''}
                                                    </div>*/}
                                                </div>
                                            </div>
                                            <div className={`form-group ${userTypeValue != 'OnHand'?'':'hidden'}`}>
                                                <label className="col-sm-2 control-label">View Sales Product Group</label>
                                                <div className="col-sm-5">
                                                    <select className="form-control" {...productGroupSales}
                                                        value={this.state.valueSales} onChange={this.selectedProductGroupSales}>
                                                        <option key={0} value={0}>{'Please select Product Group'}</option>
                                                        <option key={1} value={1}>{'All Product Group'}</option>
                                                        <option key={2} value={2}>{'Some Product Group'}</option>
                                                    </select>
                                                    <div id="checkboxlistProduct" className={`${this.state.hideProductGroupsSales ? 'hiddenViewProductGroup' : ''}` }>
                                                        <div>
                                                            <input type="checkbox"  value="JLY"
                                                                checked={productGroupSalesJLY.value === 'JLY'}
                                                                {...productGroupSalesJLY}
                                                                onChange={this.handleInputChangeSales}/>
                                                            <span>Jewelry</span>
                                                        </div>
                                                        <div>
                                                            <input type="checkbox"  value="WAT"
                                                                checked={productGroupSalesWAT.value === 'WAT'}
                                                                {...productGroupSalesWAT}
                                                                onChange={this.handleInputChangeSales}/>
                                                            <span>Watch</span>
                                                        </div>
                                                        <div>
                                                            <input type="checkbox" value="STO"
                                                                checked={productGroupSalesSTO.value === 'STO'}
                                                                {...productGroupSalesSTO}
                                                                onChange={this.handleInputChangeSales}/>
                                                            <span>Stone</span>
                                                        </div>
                                                        <div>
                                                            <input type="checkbox"  value="ACC"
                                                                checked={productGroupSalesACC.value === 'ACC'}
                                                                {...productGroupSalesACC}
                                                                onChange={this.handleInputChangeSales}/>
                                                            <span>Accessory</span>
                                                        </div>
                                                        <div>
                                                            <input type="checkbox"  value="OBA"
                                                                checked={productGroupSalesOBA.value === 'OBA'}
                                                                {...productGroupSalesOBA}
                                                                onChange={this.handleInputChangeSales}/>
                                                            <span>Object Of Art</span>
                                                        </div>
                                                        <div>
                                                            <input type="checkbox"  value="SPA"
                                                                checked={productGroupSalesSPA.value === 'SPA'}
                                                                {...productGroupSalesSPA}
                                                                onChange={this.handleInputChangeSales}/>
                                                            <span>Spare Parts</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-help">
                                                        { productGroupSalesErr.touched ? productGroupSalesErr.error : ''}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`form-group ${userTypeValue != 'Sales'?'':'hidden'}`}>
                                                <label className="col-sm-2 control-label">View Price On Hand</label>
                                                <div className="col-sm-4">
                                                    <label>
                                                        <input type="radio" {...price} value="Public"
                                                            checked={price.value === 'Public'} /> Only Price
                                                    </label>
                                                </div>
                                                <div className="col-sm-4">
                                                    <label>
                                                        <input type="radio" {...price} value="Updated"
                                                            checked={price.value === 'Updated'} /> View Updated Cost and Price
                                                    </label>
                                                </div>
                                                <div className="col-sm-2">
                                                    <label>
                                                        <input type="radio" {...price} value="All"
                                                            checked={price.value === 'All'} /> View All Price
                                                    </label>
                                                </div>
                                            </div>
                                            <div className={`form-group ${userTypeValue != 'OnHand'?'':'hidden'}`}>
                                                <label className="col-sm-2 control-label">View Price Sales</label>
                                                <div>
                                                    <div className="col-sm-4">
                                                        <input type="checkbox"  value="RTP"
                                                            checked={priceSalesRTP.value === 'RTP'}
                                                            {...priceSalesRTP}
                                                            onChange={this.handleInputChangePriceSales}/>
                                                        <span>Retail Price</span>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <input type="checkbox"  value="UCP"
                                                            checked={priceSalesUCP.value === 'UCP'}
                                                            {...priceSalesUCP}
                                                            onChange={this.handleInputChangePriceSales}/>
                                                        <span>Updated Cost</span>
                                                    </div>
                                                    <div className="col-sm-2">
                                                        <input type="checkbox" value="CTP"
                                                            checked={priceSalesCTP.value === 'CTP'}
                                                            {...priceSalesCTP}
                                                            onChange={this.handleInputChangePriceSales}/>
                                                        <span>Cost Price</span>
                                                    </div>
                                                </div>
                                                <label className="col-sm-2 control-label"> </label>
                                                <div>
                                                    <div className="col-sm-4">
                                                        <input type="checkbox"  value="NSP"
                                                            checked={priceSalesNSP.value === 'NSP'}
                                                            {...priceSalesNSP}
                                                            onChange={this.handleInputChangePriceSales}/>
                                                        <span>Net Sales</span>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <input type="checkbox"  value="MGP"
                                                            checked={priceSalesMGP.value === 'MGP'}
                                                            {...priceSalesMGP}
                                                            onChange={this.handleInputChangePriceSales}/>
                                                        <span>Margin % and Amount</span>
                                                    </div>
                                                    <div className="col-sm-2">
                                                        <input type="checkbox"  value="DSP"
                                                            checked={priceSalesDSP.value === 'DSP'}
                                                            {...priceSalesDSP}
                                                            onChange={this.handleInputChangePriceSales}/>
                                                        <span>Discount % and Amount</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-sm-2 control-label">Web Only</label>
                                                <div className="col-sm-7">
                                                    <input type="checkbox" {...webOnly}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-sm-2 control-label">Movement Activity</label>
                                                <div className="col-sm-7">
                                                    <input type="checkbox" {...movement}/>
                                                </div>
                                            </div>
                                            <div className={`form-group ${userTypeValue != 'Sales'?'':'hidden'}`}>
                                                <label className="col-md-2 col-sm-2 control-label">View On-hand</label>
                                                <div className="col-md-4 col-sm-12 col-xs-12">
                                                    <div className="col-sm-12 col-xs-12 nopadding">
                                                        <input type="checkbox" value="Location" {...onhandLocation}
                                                            checked={this.state.selectedOnHandLocation}
                                                            onChange={this.selectedOnHandLocation}
                                                            ref="location" /> All Company
                                                    </div>
                                                    <div className="user-edit user-per-height">
                                                        <MultipleCheckBoxs datas={dataDropDowntLocations} name={'checkbox-allCompany'}
                                                            checkedAll={this.state.selectedOnHandLocation}
                                                            chekedValue={this.state.chkLocation}
                                                            onChange={this.changedOnHandLocationChecked}
                                                            onhandLocationValue={onhandLocationValue.value}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-12 col-xs-12">
                                                    <div className="col-sm-12 col-xs-12 nopadding">
                                                        <input type="checkbox" value="Warehouse" {...onhandWarehouse}
                                                            checked={this.state.selectedOnHandWarehouse}
                                                            onChange={this.selectedOnHandWarehouse}
                                                            ref="warehouse" /> All Warehouse
                                                    </div>
                                                    <div className="user-edit user-per-height">
                                                        <MultipleCheckBoxs datas={dataDropDowntWareHouse} name={'checkbox-allWarehouse'}
                                                          checkedAll={this.state.selectedOnHandWarehouse}
                                                          chekedValue={this.state.chkWarehouse}
                                                          onChange={this.changedOnHandWarehouseChecked}
                                                          onhandWarehouseValue={onhandWarehouseValue.value}/>
                                                    </div>
                                                </div>
                                                <div className="col-sm-2 hidden">
                                                    <label>
                                                        <input type="checkbox" value="All" {...onhandAll}
                                                            checked={this.state.selectedOnHandAll}
                                                            onChange={this.selectedOnHandAll}
                                                            ref="allLocation" /> All Locations
                                                    </label>
                                                </div>
                                            </div>
                                            <div className={`form-group ${userTypeValue != 'OnHand'?'':'hidden'}`}>
                                                <label className="col-md-2 col-sm-2 control-label">View Sales</label>
                                                <div className="col-md-4 col-sm-12 col-xs-12">
                                                    <div className="col-sm-12 col-xs-12 nopadding">
                                                        <input type="checkbox" value="Location" {...salesLocation}
                                                            checked={this.state.selectedSalesLocation}
                                                            onChange={this.selectedSalesLocation}
                                                            ref="location" /> All Company
                                                    </div>
                                                    <div className="user-edit user-per-height">
                                                        <MultipleCheckBoxs datas={dataDropDowntSalesLocations} name={'checkbox-allSalesCompany'}
                                                            checkedAll={this.state.selectedSalesLocation}
                                                            chekedValue={this.state.chkSalesLocation}
                                                            onChange={this.changedSalesLocationChecked}
                                                            salesLocationValue={salesLocationValue.value}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-12 col-xs-12">
                                                    <div className="col-sm-12 col-xs-12 nopadding">
                                                        <input type="checkbox" value="Warehouse" {...salesWarehouse}
                                                            checked={this.state.selectedSalesWarehouse}
                                                            onChange={this.selectedSalesWarehouse}
                                                            ref="warehouse" /> All Warehouse
                                                    </div>
                                                    <div className="user-edit user-per-height">
                                                        <MultipleCheckBoxs datas={dataDropDowntSalesWareHouse} name={'checkbox-allSalesWarehouse'}
                                                          checkedAll={this.state.selectedSalesWarehouse}
                                                          chekedValue={this.state.chkSalesWarehouse}
                                                          onChange={this.changedSalesWarehouseChecked}
                                                          salesWarehouseValue={salesWarehouseValue.value}/>
                                                    </div>
                                                </div>
                                                <div className="col-sm-2 hidden">
                                                    <label>
                                                        <input type="checkbox" value="All" {...salesAll}
                                                            checked={this.state.selectedSalesAll}
                                                            onChange={this.selectedSalesAll}
                                                            ref="allSalesLocation" /> All Locations
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="form-group maring-t30">
                                                <label className="col-md-2 control-label">Product Hierarchy</label>
                                                <div className="col-md-8">
                                                    <div className="user-alert">Restricted Product Hierarchy (You can grant permission to view Product Hierarchy)</div>
                                                </div>
                                            </div>
                                            <div className="form-group">
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
                                                            <Tree data={hierarchyDataJewelry} onClick={this.treeOnClickJLY} onUnClick={this.treeOnUnClick} ref="treeviewJLY"/>
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
                                                            <Tree data={hierarchyDataWatch} onClick={this.treeOnClickWAT} onUnClick={this.treeOnUnClick} ref="treeviewWAT"/>
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
                                                            <Tree data={hierarchyDataStone} onClick={this.treeOnClickSTO} onUnClick={this.treeOnUnClick} ref="treeviewSTO"/>
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
                                                            <Tree data={hierarchyDataAccessory} onClick={this.treeOnClickACC} onUnClick={this.treeOnUnClick} ref="treeviewACC"/>
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
                                                            <Tree data={hierarchyDataOBA} onClick={this.treeOnClickOBA} onUnClick={this.treeOnUnClick} ref="treeviewOBA"/>
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
