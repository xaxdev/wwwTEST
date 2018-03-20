import React, { Component, PropTypes }from 'react';
import { reduxForm, reset } from 'redux-form';
import { Button,FormControl,Pagination, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';
import ToolTip from 'react-portal-tooltip';
import shallowCompare from 'react-addons-shallow-compare';
import moment from 'moment-timezone';
import * as itemactions from '../../actions/itemactions';
import numberFormat from '../../utils/convertNumberformat';
import GridItemsView from '../../components/mycatalog/griditemview';
import GridItemsViewPrint from '../../components/mycatalog/griditemviewPrint';
import ModalConfirmDelete from '../../utils/modalConfirmDelete.js';
import Modalalertmsg from '../../utils/modalalertmsg';
import GenTemplateHtml from '../../utils/genTemplatePdfMyCatalog';
import ModalShareMyCatalog from '../../utils/modalShareMyCatalog';
import validateEmail from '../../utils/validateemail';
import RenderClassTotals from './utils/render_total';
import ModalPrintOptions from './utils/modalPrintOptions';
import ModalWordOptions from './utils/modalWordOptions';
import GenTemplateWordHtml from './utils/genTemplateWordSetCatalog';

import { LASTMODIFIED, REFERENCE, DESCRIPTION, DESCENDING, ASCENDING } from '../../constants/itemconstants';

const Loading = require('react-loading');

const checkFields = ['all','groupCost','updatedCost', 'sellingCost'];

const labels = {
    all: 'Select All', groupCost: 'Total Group Cost Price (USD)', updatedCost: 'Total Updated Cost Price (USD)',
    sellingCost: 'Total Selling Cost Price (USD)'
}

const chkAllItems = ['0','1','2','3', '4', '5','6','7','8','9', '10', '11', '12', '13', '14', '15', '16', '17',
      '18','19', '20', '21', '22', '23', '24','25','26','27', '28', '29', '30', '31','32','33','34','35',
      '36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55',
      '56','57','58','59','60'
    ];

let listMyCatalog = [];
let listDeleteMyCatalog = [];

class SetCatalog extends Component {
    constructor(props) {
        super(props);

        this.handleGo = this.handleGo.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.onClickGrid = this.onClickGrid.bind(this);
        this.selectedSetCatalog = this.selectedSetCatalog.bind(this);
        this.deleteOneItemMySetCatalog = this.deleteOneItemMySetCatalog.bind(this);
        this.handleSubmitDeleteItem = this.handleSubmitDeleteItem.bind(this);
        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
        this.changeSetCatalogName = this.changeSetCatalogName.bind(this);
        this.saveSetCatalogName = this.saveSetCatalogName.bind(this);
        this.deleteSetCatalog = this.deleteSetCatalog.bind(this);
        this.handleSubmitDeleteSetCatalog = this.handleSubmitDeleteSetCatalog.bind(this);
        this.changeSortingBy = this.changeSortingBy.bind(this);
        this.changeSortingDirection = this.changeSortingDirection.bind(this);
        this.checkedOneItemMySetCatalog = this.checkedOneItemMySetCatalog.bind(this);
        this.onCheckedAllItemMySetCatalog = this.onCheckedAllItemMySetCatalog.bind(this);
        this.deleteAllItems = this.deleteAllItems.bind(this);
        this.handleSubmitDeleteAllItem = this.handleSubmitDeleteAllItem.bind(this);
        this.printResults = this.printResults.bind(this);
        this.shareMySetCatalog = this.shareMySetCatalog.bind(this);
        this.selectedPageSize = this.selectedPageSize.bind(this);
        this.showDialogPrintOptions = this.showDialogPrintOptions.bind(this);
        this.confirmExport = this.confirmExport.bind(this);

        this.state = {
          activePage: !!this.props.currentPage?this.props.currentPage:1, isOpenDeleteItem: false, isOpenAddMyCatalogmsg: false,
          isTooltipActive: false, isOpenDeleteCatalog: false, enabledMyCatalog: false, isOpenDeleteAllItem: false,
          isOpenZeroCatalog: true, isOpenPrintPdfmsg: false, isOpenShareMyCatalog: false, checkAllItems: false,
          isOpenPrintOptions: false, isOpenWordOptions: false, allFields: false, groupCost: false, updatedCost: false,
          sellingCost: false
        }
    }

    componentWillMount = _=>{
        let setCatalogName = '';
        const { fields: { setCatalog } } = this.props;
        this.props.getSetCatalogName().then((value) => {
            if (value) {
                let setCatalogId = '';
                let isCatalogShared = false;
                if(this.props.listSetCatalogName != undefined){
                    if(this.props.setCatalogId != null){
                        setCatalogId = this.props.setCatalogId;
                        isCatalogShared = this.props.isCatalogShared;
                    }else{
                        if(this.props.listSetCatalogName.length != 0){
                            setCatalogId = this.props.listSetCatalogName[0]._id;
                            setCatalogName = this.props.listSetCatalogName[0].setCatalog;
                            isCatalogShared = this.props.listSetCatalogName[0].shared;
                        }else{
                            isCatalogShared = true;
                        }
                    }
                    let parasm = {
                            id: setCatalogId, page: !!this.props.currentPage?this.props.currentPage:1,
                            size: !!this.props.pageSize ? this.props.pageSize : 16,
                            sort: (this.props.catalogSortingBy != null)? this.props.catalogSortingBy: 1,
                            order: (this.props.catalogSortDirection != null)? this.props.catalogSortDirection: -1
                        };
                    if (setCatalogId != '') {
                        setCatalog.value = setCatalogName;
                        setCatalog.onChange(setCatalogName);
                        this.props.setRenameCatalog(setCatalogName);
                        this.props.getSetCatalogItemsWithSetItem(parasm);
                        this.props.setIsCatalogShare(isCatalogShared);
                    }else{
                        this.props.setIsCatalogShare(isCatalogShared);
                    }
                }
            }
        });
    }

    componentWillReceiveProps(nextProps) {
      let inputSetCatalogName = this.refs.setCatalogName;
      if (inputSetCatalogName != undefined) {
          if (this.props.setCatalogName != nextProps.setCatalogName) {
              inputSetCatalogName.value = nextProps.setCatalogName;
          }
      }
    }

    componentDidMount() {
        let that = this;
        if(this.refs.pageSize != undefined){
          let values = [].filter.call(this.refs.pageSize.options, function (o) {
                o.selected = false;
                if(o.value == that.props.pageSize){
                  o.selected = true
                }
                return o.selected;
              }).map(function (o) {
                return o.value;
              });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState);
    }

    printResults(e){
        const { fields: {printPage, printPrice} } = this.props;
        let items = this.props.listSetCatalogName != undefined ?
                        this.props.listSetCatalogName.length != 0 ?
                            this.props.listSetCatalogItems.allItems != undefined ? this.props.listSetCatalogItems.allItems : [] :
                        [] :
                    [];
        const userLogin = JSON.parse(sessionStorage.logindata);
        const host = HOSTNAME || 'localhost';
        const env_web = ENVIRONMENT !== 'production' ? 'development' : 'production';
        const ROOT_URL = (host != 'mol.mouawad.com')? `http://${host}:3005`: `http://${host}`;
        let imagesReplace = ROOT_URL+'/images/';
        let exportDate = moment().tz('Asia/Bangkok').format('YYYYMMDD_HHmmss');
        let dvTotalItems = jQuery('#dvTotalItems').html();
        let dvTotalSetItems = jQuery('#dvTotalSetItems').html();
        let dvGridview = jQuery('#dvGridview').html();
        let dv = {
                    'dvTotalItems': dvTotalItems, 'dvTotalSetItems': dvTotalSetItems, 'dvGridview': dvGridview,
                    'printPage':printPage, 'printPrice': printPrice, 'items': items, 'userLogin': userLogin,
                    'env': env_web
                };
        let htmlTemplate = '';
        htmlTemplate = GenTemplateHtml(ROOT_URL, imagesReplace, dv);

        let params = {'temp': htmlTemplate, 'userName': `${userLogin.username}_${exportDate}`,
                        'userEmail': userLogin.email, 'ROOT_URL': ROOT_URL, 'channel':'pdf'};
        this.props.writeHtml(params).then((value) => {
            if (value) {
                this.setState({isOpenPrintPdfmsg: true});
            }
        });

        this.setState({isOpenPrintOptions: false});
    }
    confirmExport = _ =>{
        const { items, allItems } = this.props.listSetCatalogItems;
        // console.log(this.props.listSetCatalogItems);
        const { setCatalogId,fields: {printPageWord}  } = this.props;
        const host = HOSTNAME || 'localhost';
        const dataSet = printPageWord == 'all' ? allItems : items;
        const userLogin = JSON.parse(sessionStorage.logindata);
        const exportDate = moment().tz('Asia/Bangkok').format('YYYYMMDD_HHmmss');
        const ROOT_URL = (host != 'mol.mouawad.com')? `http://${host}:3005`: `http://${host}`;

        let htmlTemplate = '';
        htmlTemplate = GenTemplateWordHtml(this, dataSet,ROOT_URL);
        let params = {'temp': htmlTemplate, 'userName': `${userLogin.username}_${exportDate}`,
                        'userEmail': userLogin.email, 'ROOT_URL': ROOT_URL, 'channel':'word'};
        this.props.writeHtml(params).then((value) => {
            if (value) {
                this.setState({isOpenPrintPdfmsg: true});
            }
        });
        this.setState({isOpenWordOptions: false});
    }
    showDialogPrintOptions = _ =>{
        this.setState({isOpenPrintOptions: true});
    }
    handleClosePrintOptions = _ =>{
        this.setState({isOpenPrintOptions: false});
    }
    renderDialogPrintOptions = _ =>{
        const { fields: {printPage, printPrice} } = this.props;
        if (printPage.value == undefined) {
            printPage.onChange('all');
        }
        if (printPrice.value == undefined) {
            printPrice.onChange('all');
        }
        return(<ModalPrintOptions onSubmit={this.printResults} isOpen={this.state.isOpenPrintOptions}
            isClose={this.handleClosePrintOptions} props={this.props} />);
    }
    showDialogWordOptions = _ =>{
        this.setState({isOpenWordOptions: true});
    }
    handleCloseWordOptions = _ =>{
        this.setState({isOpenWordOptions: false});
    }
    renderDialogWordOptions = _ =>{
        const { fields: {printPageWord} } = this.props;
        if (printPageWord.value == undefined) {
            printPageWord.onChange('all');
        }
        return(<ModalWordOptions that={this} onSubmit={this.confirmExport} isOpen={this.state.isOpenWordOptions}
            isClose={this.handleCloseWordOptions} props={this.props} checkFields={checkFields} labels={labels}/>);
    }

    handleSubmitDeleteAllItem = (e)=>{
        e.preventDefault();
        const { setCatalogId } = this.props;
        let catalog = this.refs.catalog;
        this.setState({isOpenDeleteAllItem: false});
        let items = [];
        listMyCatalog.map((item) => {
            let itemDelete = {};
            if (item.id != null) {
                itemDelete = {...itemDelete, id: item.id}
            } else {
                itemDelete = {...itemDelete, id: null, reference: item.reference}
            }
            items.push(itemDelete);
        })
        let paramsItem ={id: setCatalogId, items: items};
        if (setCatalogId != null) {
            this.props.deleteSetCatalogItems(paramsItem).then( () =>{
                let params = {
                                id: setCatalogId, page: !!this.props.currentPage?this.props.currentPage:1, size: 16,
                                sort: (this.props.catalogSortingBy != null)? this.props.catalogSortingBy: 1,
                                order: (this.props.catalogSortDirection != null)? this.props.catalogSortDirection: -1
                            };
                this.props.getSetCatalogItemsWithSetItem(params);
            });
        }
    }

    deleteAllItems = _=> {
        const { setCatalogId } = this.props;
        let catalog = this.refs.catalog;
        let items = [];
        listMyCatalog.map((item) => {
            items.push({id: item.id});
        })
        let params ={id: setCatalogId, items: items};
        this.setState({isOpenDeleteAllItem: true});
    }

    onCheckedAllItemMySetCatalog = (e)=> {
        const that = this;
        const { items, allItems } = this.props.listSetCatalogItems;
        const { setCatalogId } = this.props;
        const totalAllItems = allItems.length;
        if (setCatalogId != null) {
            if (e.target.checked) {
                this.setState({enabledMyCatalog: true});
                listMyCatalog = [];
                allItems.map((item) => {
                    let itemName = (item.type != 'CER')? item.description: item.name;
                    let objItem = {
                        id: item.id, reference: item.reference, description: itemName, setCatalogId: setCatalogId
                    };
                    listMyCatalog.push(objItem);
                });
                chkAllItems.map(function(field, index){
                    that.setState({[field]: true});
                });
                this.setState({checkAllItems: true});
            } else {
                listMyCatalog = [];
                chkAllItems.map(function(field, index){
                    that.setState({[field]: false});
                });
                this.setState({enabledMyCatalog: false});
                this.setState({checkAllItems: false});
            }
        }
    }

    checkedOneItemMySetCatalog = (e)=> {
        const { items,total_items,total_setitems } = this.props.listSetCatalogItems;
        const { setCatalogId } = this.props;
        const itemTargetId = e.target.value.split('=');
        const itemIndexId =  e.target.value.split('=')[1];
        const totalAllItems = total_items + total_setitems;
        let itemAdded = [];
        if (itemTargetId[0] == 'id') {
            itemAdded = items.filter(oneItem => oneItem.id === itemTargetId[1]);
        } else {
            itemAdded = items.filter(oneItem => oneItem.reference === itemTargetId[1]);
        }
        itemAdded = itemAdded[0];
        let itemName = (itemAdded.type != 'CER')? itemAdded.description: itemAdded.name;
        let objItem = {
            id: itemAdded.id, reference: itemAdded.reference, description: itemName, setCatalogId: setCatalogId
        };

        if(!this.state.enabledMyCatalog){
            listMyCatalog = [];
        }
        if (e.target.checked) {
            listMyCatalog.push(objItem);
            this.setState({[itemIndexId]: true});
            this.setState({checkAllItems: (totalAllItems == listMyCatalog.length) ? true : false});
        } else {
            if (itemTargetId[0] == 'id') {
                listMyCatalog = listMyCatalog.filter(inItem => inItem.id !== itemIndexId);
            }else{
                listMyCatalog = listMyCatalog.filter(inItem => inItem.reference !== itemIndexId);
            }
            this.setState({[itemIndexId]: false});
            this.setState({checkAllItems: false});
        }
        if (listMyCatalog.length != 0) {
          this.setState({enabledMyCatalog: true});
        } else {
          this.setState({enabledMyCatalog: false});
        }
    }

    changeSortingDirection = (e)=> {
        e.preventDefault();
        let sortingDirection = e.target.value;
        const pageSize = this.refs.pageSize.value;
        const { setCatalogId, listSetCatalogItems } = this.props;
        let parasm = {
                id: setCatalogId, page: !!this.props.currentPage?this.props.currentPage:1, size: pageSize, order: sortingDirection,
                sort: (this.props.catalogSortingBy != null)? this.props.catalogSortingBy: 1
            };
        this.props.setCatalogSortDirection(sortingDirection);
        if (setCatalogId != null) {
            this.props.getSetCatalogItemsWithSetItem(parasm);
        }
    }

    changeSortingBy = (e)=> {
        e.preventDefault();
        let sortingBy = e.target.value;
        const pageSize = this.refs.pageSize.value;
        const { setCatalogId, listSetCatalogItems } = this.props;
        let parasm = {
                id: setCatalogId, page: !!this.props.currentPage?this.props.currentPage:1, size: pageSize, sort: sortingBy,
                order: (this.props.catalogSortDirection != null)? this.props.catalogSortDirection: -1
            };
        this.props.setSetCatalogSortingBy(sortingBy);
        if (setCatalogId != null) {
            this.props.getSetCatalogItemsWithSetItem(parasm);
        }
    }

    saveSetCatalogName = (e)=> {
        e.preventDefault();
        const { fields: { setCatalog }, setCatalogId } = this.props;
        let params = {id: setCatalogId, setCatalog: setCatalog.value};
        this.setState({isTooltipActive: false});
        if (setCatalogId != null) {
            this.props.setNewSetCatalogName(params).then((value) => {
                if(value){
                    this.props.getSetCatalogName();
                }
            });
        }
    }

    changeSetCatalogName = (e)=> {
        const setCatalogName = e.target.value;
        const { fields: { setCatalog } } = this.props;
        setCatalog.value = setCatalogName;
        setCatalog.onChange(setCatalogName);
        this.props.setRenameSetCatalog(setCatalogName);
    }

    showTooltip = _=> {
        let setCatalogName = this.refs.setCatalogName;
        this.setState({isTooltipActive: true})
    }
    hideTooltip = _=>{
        this.setState({isTooltipActive: false});
    }

    onClickGrid(pageNumber){
      const token = sessionStorage.token;
      const getIdReference = pageNumber.split('=');
      if(token){
          if (getIdReference[0] == 'id') {
              this.context.router.push(`/productmycatalog/${getIdReference[1]}`);
          } else {
              this.context.router.push(`/setdetailsetcatalog/${getIdReference[1].replace('/','-')}`);
          }
      }
    }

    handleGo(e){
        e.preventDefault();
        const getPage = parseInt((this.refs.reletego.value != ''?this.refs.reletego.value:this.state.activePage));
        const userLogin = JSON.parse(sessionStorage.logindata);
        const { setCatalogId, listSetCatalogItems } = this.props;
        if (Number(this.refs.reletego.value) > listSetCatalogItems.total_pages || Number(this.refs.reletego.value) < 1) {
            this.setState({isOpenAddMyCatalogmsg: true});
        }else{
            const pageSize = this.refs.pageSize.value;
            this.setState({activePage: getPage});
            this.setState({showLoading: true});
            let parasm = {
                    id: setCatalogId, page: getPage, size: pageSize,
                    sort: (this.props.catalogSortingBy != null)? this.props.catalogSortingBy: 1,
                    order: (this.props.catalogSortDirection != null)? this.props.catalogSortDirection: -1
                };
            this.props.setCatalogCurrentPage(getPage);
            if (setCatalogId != null) {
                this.props.getSetCatalogItemsWithSetItem(parasm).then((value) => {
                });
            }
        }
    }

    selectedSetCatalog = (e) =>{
        e.preventDefault();
        const { fields: { catalog }, listSetCatalogName } = this.props;
        const setCatalogId = e.target.value;
        this.setState({activePage: 1});
        this.props.setCatalogCurrentPage(1);
        let [selectedSetCatalog] = listSetCatalogName.filter((catalog) => {return catalog._id == setCatalogId});
        let parasm = {
                    id: setCatalogId, page: 1, size: 16,
                    sort: (this.props.catalogSortingBy != null)? this.props.catalogSortingBy: 1,
                    order: (this.props.catalogSortDirection != null)? this.props.catalogSortDirection: -1
                };
        this.props.getSetCatalogItemsWithSetItem(parasm)
        this.props.setIsCatalogShare(selectedSetCatalog.shared);
    }

    deleteOneItemMySetCatalog = (item) => {
        listDeleteMyCatalog  = [];
        this.setState({enabledMyCatalog: false});
        const { items } = this.props.listSetCatalogItems;
        const setCatalogId = this.props.listSetCatalogItems._id
        const itemTargetId = item.target.attributes[3].value.split('=');
        let itemAdded = [];
        if (itemTargetId[0] == 'id') {
            itemAdded = items.filter(oneItem => oneItem.id === itemTargetId[1]);
        } else {
            itemAdded = items.filter(oneItem => oneItem.reference === itemTargetId[1]);
        }
        itemAdded = itemAdded[0];
        let itemName = (itemAdded.type != 'CER')? itemAdded.description: itemAdded.name;
        let objItem = {
                        id: itemAdded.id, reference: itemAdded.reference, description: itemName,
                        setCatalogId: setCatalogId
                    };

        listDeleteMyCatalog.push(objItem);
        this.setState({isOpenDeleteItem: true});
    }

    deleteSetCatalog = _=> {
        this.setState({isOpenDeleteCatalog: true});
    }

    handleSubmitDeleteItem = (e)=>{
        e.preventDefault();
        const { setCatalogId } = this.props;
        let catalog = this.refs.catalog;
        this.setState({isOpenDeleteItem: false});
        let items = [];
        listDeleteMyCatalog.map((item) => {
            let itemDelete = {};
            if (item.id != null) {
                itemDelete = {...itemDelete, id: item.id}
            } else {
                itemDelete = {...itemDelete, id: null, reference: item.reference}
            }
            items.push(itemDelete);
        })
        let params ={id: setCatalogId, items: items};
        if (setCatalogId != null) {
            this.props.deleteCatalogItems(params).then( () =>{
                let parasm = {
                    id: setCatalogId, page: !!this.props.currentPage?this.props.currentPage:1, size: 16,
                    sort: (this.props.catalogSortingBy != null)? this.props.catalogSortingBy: 1,
                    order: (this.props.catalogSortDirection != null)? this.props.catalogSortDirection: -1
                };
                this.props.getSetCatalogItemsWithSetItem(parasm)
            });
        }
    }

    handleSubmitDeleteSetCatalog = (e)=>{
        e.preventDefault();
        const { setCatalogId } = this.props;
        let params = {id: setCatalogId}
        this.setState({isOpenDeleteCatalog: false});
        if (setCatalogId != null) {
            this.props.deleteSetCatalog(params).then((valueDelete) => {
                if (valueDelete) {
                    this.props.getSetCatalogName().then((valueGetCatalog) => {
                        if (valueGetCatalog) {
                            let isCatalogShared = false;
                            if(this.props.listSetCatalogName.length != 0){
                                isCatalogShared = this.props.listSetCatalogName[0].shared;
                                let parasm = {
                                    id: this.props.listSetCatalogName[0]._id, page: !!this.props.currentPage?this.props.currentPage:1, size: 16,
                                    sort: (this.props.catalogSortingBy != null)? this.props.catalogSortingBy: 1,
                                    order: (this.props.catalogSortDirection != null)? this.props.catalogSortDirection: -1
                                };
                                this.props.getSetCatalogItemsWithSetItem(parasm)
                                this.props.setIsCatalogShare(isCatalogShared);
                            }else{
                                isCatalogShared = true;
                                this.props.setIsCatalogShare(isCatalogShared);
                            }
                        }
                    });
                }
            });
        }
    }

    handleCloseDeleteItem = _=>{
        this.setState({isOpenDeleteItem: false});
    }

    handleCloseDeleteAllItem = _=>{
        this.setState({isOpenDeleteAllItem: false});
    }

    handleClosemsg = _=>{
        this.setState({isOpenAddMyCatalogmsg: false});
    }

    handleClosePdfmsg = _=>{
        this.setState({isOpenPrintPdfmsg: false});
    }

    handleClosemsgZeroCatalog = _=>{
        this.setState({isOpenZeroCatalog: false});
    }

    handleCloseDeleteCatalog = _=>{
        this.setState({isOpenDeleteCatalog: false});
    }

    renderPagination(){
      const { fields: { currPage }, currentPage, handleSubmit, resetForm, submitting } = this.props;
      const page = this.state.activePage;
      const totalPages = this.props.listSetCatalogItems.total_pages;
      return(
          <div>
              <Pagination prev next first last ellipsis boundaryLinks items={totalPages} maxButtons={4}
               activePage={this.state.activePage}
               onSelect={this.handleSelect} />
              <div>
                <span>Page</span>
                  <input type="number" placeholder={page} ref="reletego" {...currPage}/>
                <span>of</span>
                <span>{numberFormat(totalPages)}</span>
                <button type="button" disabled={submitting} onClick={this.handleGo}>Go</button>
              </div>
          </div>
        );
    }

    renderModalConfirmDelete = _=> {
        const title = 'Delete Item';
        const msg = 'Are you sure you want to delete this item?';
        return(<ModalConfirmDelete onSubmit={this.handleSubmitDeleteItem} isOpen={this.state.isOpenDeleteItem}
            isClose={this.handleCloseDeleteItem} props={this.props} message={msg} title={title}/>);
    }

    renderModalConfirmDeleteAllItem = _=> {
        const title = 'Delete Item';
        const msg = 'Are you sure you want to delete items?';
        return(<ModalConfirmDelete onSubmit={this.handleSubmitDeleteAllItem}
            isOpen={this.state.isOpenDeleteAllItem} isClose={this.handleCloseDeleteAllItem}
            props={this.props} message={msg} title={title}/>);
    }

    renderModalConfirmDeleteCatalog = _=> {
        const title = 'Delete Catalog';
        const msg = 'Are you sure you want to delete this catalog?';
        return(<ModalConfirmDelete onSubmit={this.handleSubmitDeleteSetCatalog} isOpen={this.state.isOpenDeleteCatalog}
            isClose={this.handleCloseDeleteCatalog} props={this.props} message={msg} title={title}/>);
    }

    renderTotals(){
        const { fields: { currPage },totalPages,currentPage,items,listSetCatalogItems,totalPrice,totalUpdatedCost,
                handleSubmit,resetForm,submitting } = this.props;

        const { setItemPrice,setItemUpdatedCost } = listSetCatalogItems;
        let _totalUpdatedCost =  (totalUpdatedCost!=null) ? numberFormat(totalUpdatedCost) : 0;
        let _totalPublicPrice =  (totalPrice!=null) ? numberFormat(totalPrice) : 0;
        let _totalPublicPriceSet = (setItemPrice!=null) ? numberFormat(setItemPrice) : 0;
        let _totalUpdatedCostSet = (setItemUpdatedCost!=null) ? numberFormat(setItemUpdatedCost) : 0;
        const userLogin = JSON.parse(sessionStorage.logindata);

        return(<RenderClassTotals userLogin={userLogin} listSetCatalogItems = {listSetCatalogItems}
                _totalPublicPrice={_totalPublicPrice} _totalUpdatedCost = {_totalUpdatedCost}
                _totalPublicPriceSet = {_totalPublicPriceSet} _totalUpdatedCostSet = {_totalUpdatedCostSet}
                />);
    }

    renderAlertmsg = _=> {
      const message = 'Page is invalid.';
      const title = 'ADD TO CATALOG';

      return(<Modalalertmsg isOpen={this.state.isOpenAddMyCatalogmsg} isClose={this.handleClosemsg}
          props={this.props} message={message}  title={title}/>);
    }

    handleClosemsgShareSetCatalog = _=> {
        this.props.setCloseAlertMsgSet(100);
    }

    renderAlertmsgShareSetCatalog = _=> {
        const { shareSetCatalogStatus, shareSetCatalogStatusCode, shareSetCatalogmsgError} = this.props;
        const title = 'SHARE SET CATALOG';
        let isOpen = shareSetCatalogStatusCode >= 200 ? true : false;

        return(<Modalalertmsg isOpen={isOpen} isClose={this.handleClosemsgShareSetCatalog}
            props={this.props} message={shareSetCatalogmsgError}  title={title}/>);
    }

    renderAlertmsgPdf = _=> {
      const message = 'Please check your email for printing files.';
      const title = 'SET CATALOG';
      return(<Modalalertmsg isOpen={this.state.isOpenPrintPdfmsg} isClose={this.handleClosePdfmsg}
          props={this.props} message={message}  title={title}/>);
    }

    shareMySetCatalog = _=>{
        this.setState({isOpenShareMyCatalog: true});
    }

    handleSubmitShareSetCatalog = (e)=>{
        e.preventDefault();
        const { setCatalogId } = this.props;
        const { fields: {
                  shareTo
              } } = this.props;
        let emails = [];
        let paramEmails = [];
        let params = {};
        if (!!shareTo.value) {
            emails = shareTo.value.replace(/\s/g, '').split(/,|;/);
            paramEmails = emails.map((email) => {
                return {'email':email};
            });
        }
        params.id = setCatalogId;
        params.users = paramEmails;
        this.props.shareSetCatalog(params)
            .then((response)=>{
                this.setState({isOpenShareMyCatalog: false});
                this.props.setDataSendEmailTo('');
                shareTo.onChange('');
                shareTo.value = '';
            })
    }

    handleCloseShareMyCatalog = _=> {
        const { fields: { shareTo } } = this.props;
        this.props.setDataSendEmailTo('');
        shareTo.onChange('');
        shareTo.value = '';
        this.setState({isOpenShareMyCatalog: false});
    }

    renderShareMySetCatalog = _=> {
        const { submitting } = this.props;
        return(<ModalShareMyCatalog onSubmit={this.handleSubmitShareSetCatalog}
            isOpen={this.state.isOpenShareMyCatalog}
            isClose={this.handleCloseShareMyCatalog} props={this.props}/>);
    }

    selectedPageSize = e =>{
        e.preventDefault();
        const pageSize = e.target.value;
        const getPage = parseInt((this.refs.reletego.value != ''?this.refs.reletego.value:this.state.activePage));
        const userLogin = JSON.parse(sessionStorage.logindata);
        const { setCatalogId, listSetCatalogItems } = this.props;
        this.setState({activePage: 1});
        this.setState({showLoading: true});
        let parasm = {
            id: setCatalogId, page: 1, size: pageSize,
            sort: (this.props.catalogSortingBy != null)? this.props.catalogSortingBy: 1,
            order: (this.props.catalogSortDirection != null)? this.props.catalogSortDirection: -1
        };
        this.props.setCatalogCurrentPage(getPage);
        this.props.setPageSize(pageSize);
        if (setCatalogId != null) {
            this.props.getSetCatalogItemsWithSetItem(parasm).then((value) => {
            });
        }
    }

    handleSelect = eventKey => {
        const getPage = eventKey;
        const userLogin = JSON.parse(sessionStorage.logindata);
        const { setCatalogId, listSetCatalogItems } = this.props;
        const pageSize = this.refs.pageSize.value;
        this.setState({activePage: getPage});
        this.setState({showLoading: true});
        let parasm = {
                id: setCatalogId, page: getPage, size: pageSize,
                sort: (this.props.catalogSortingBy != null)? this.props.catalogSortingBy: 1,
                order: (this.props.catalogSortDirection != null)? this.props.catalogSortDirection: -1
            };
        this.props.setCatalogCurrentPage(getPage);
        if (setCatalogId != null) {
            this.props.getSetCatalogItemsWithSetItem(parasm).then((value) => {
            });
        }
    }

    render() {
            const {  fields:{ setCatalog }, setCatalogId, setCatalogName, isCatalogShared, ViewAsSet } = this.props;
            let catalogSortingBy = (this.props.catalogSortingBy != null)? this.props.catalogSortingBy: 1;
            let catalogSortDirection = (this.props.catalogSortDirection != null)? this.props.catalogSortDirection: -1;
            let style = {
                style: {
                    background: 'rgba(0,0,0,.8)',
                    padding: 20,
                    boxShadow: '5px 5px 3px rgba(0,0,0,.5)'
                },
                arrowStyle: {
                    color: 'rgba(0,0,0,.8)',
                    borderColor: false
                }
            }

            let items = this.props.listSetCatalogName != undefined ?
                            this.props.listSetCatalogName.length != 0 ?
                                this.props.listSetCatalogItems.items != undefined ? this.props.listSetCatalogItems.items : [] :
                            [] :
                        [];
            return(
                <form role="form">
                  {/* Header Search */}
                  <div className="col-sm-12 col-xs-12 padding-b10 bg-hearder-mycatalog">
                      <div className="cat-title"><h1 className="text-center">MY CATALOG</h1></div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="col-lg-7 col-md-6 col-sm-12 col-xs-12 nopadding">
                                <div className="col-lg-7 col-md-7 col-sm-6 col-xs-12 nopadding">
                                  <div className="col-lg-3 col-md-5 col-sm-4 col-xs-12 nopadding margin-t5">Catalog Name</div>
                                  <div className="col-lg-8 col-md-6 col-sm-7 col-xs-12 nopadding margin-l15">
                                      <div className="styled-select-black">
                                        <select onChange={this.selectedSetCatalog}  value={setCatalogId}
                                            ref="setCatalog">
                                          {
                                              this.props.listSetCatalogName.length != 0 ?
                                              this.props.listSetCatalogName.map((cat) => {
                                                  return (<option key={cat._id} value={cat._id}>{cat.setCatalog}</option>);
                                              }) : <option value="">Please select</option>
                                          }
                                        </select>
                                      </div>
                                  </div>
                                </div>
                                <div className="col-lg-5 col-md-5 col-sm-6 col-xs-12 nopadding"  >
                                    <a><div className={`${isCatalogShared ? 'disabled' : 'icon-edit'}`} id="edit" onMouseEnter={this.showTooltip}
                                        onMouseLeave={this.hideTooltip} ></div></a>
                                    <ToolTip active={this.state.isTooltipActive} position="bottom"
                                        arrow="center" parent="#edit">
                                        <div className="cat-tooltip form-inline">
                                          <p>Edit Set Catalog Name</p>
                                          <div className="form-group">
                                            <input type="text" className="form-control"
                                                onChange={this.changeSetCatalogName}  placeholder={setCatalogName}
                                                 ref="setCatalogName"/>
                                          </div>
                                            <button type="button" className="btn btn-default"
                                                onClick={this.saveSetCatalogName}>
                                                save
                                            </button>
                                        </div>
                                    </ToolTip>
                                    <a><div className={`${isCatalogShared ? 'hidden' : 'icon-del'}`} onClick={this.deleteSetCatalog}></div></a>
                                    <a><div className={`${items.length == 0 ? 'hidden' : 'icon-print'}`} id="printproduct"
                                        onClick={ this.showDialogPrintOptions }></div></a>
                                    <a><div className={`${isCatalogShared ? 'hidden' : 'icon-share'}`}
                                        onClick={ this.shareMySetCatalog }></div></a>
                                    <a><div className={`${items.length == 0 ? 'hidden' : 'icon-print'}`} id="wordexport"
                                        onClick={ this.showDialogWordOptions }></div></a>
                                </div>
                              </div>
                            <div className="col-lg-5 col-md-6 col-sm-12 col-xs-12 nopadding pull-right">
                              <div className="cat-sort col-xs-12 margin-t5">
                                <ControlLabel>Sort By : </ControlLabel>
                              </div>
                              <div className="col-md-5 col-sm-3 col-xs-12 nopadding m-bottom-5">
                                <div className="styled-select-black">
                                  <select onChange={this.changeSortingBy} value={catalogSortingBy}
                                    ref="sortingBy">
                                    <option key={1} value={1}>{'Updated Date'}</option>
                                    <option key={2} value={2}>{'Public Price'}</option>
                                    <option key={3} value={3}>{'Description'}</option>
                                    <option key={4} value={4}>{'Set Reference Number'}</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-5 col-sm-3 col-xs-12 nopadding margin-l10 m-margin-xs m-bottom-5">
                                <div className="styled-select-black">
                                    <select onChange={this.changeSortingDirection} value={catalogSortDirection}
                                        ref="sortingDirection">
                                      <option key={-1} value={-1}>{'Descending'}</option>
                                      <option key={1} value={1}>{'Ascending'}</option>
                                    </select>
                                </div>
                              </div>
                            </div>
                      </div>
                  </div>
                  <div id="dvTotal">
                    {this.renderTotals()}
                  </div>
                  {/* End Header Search */}
                  {/* Util&Pagination */}
                  <div className="row">
                    <div className="col-sm-12 col-xs-12">
                      <div className={`${items.length == 0  ? 'hidden' : 'col-sm-12 col-xs-12 pagenavi maring-t20 cat-line'}`} >
                            <div className={`${isCatalogShared ? 'hidden' : 'checkbox checkbox-warning '}`}>
                                <input type="checkbox" id="checkbox1"
                                    className="styled" ref="selectAllItems"
                                    checked={this.state.checkAllItems}
                                    onChange={this.onCheckedAllItemMySetCatalog}/>
                                <label className="checkbox1 select"></label>
                              <span className="margin-l10 text-vertical margin-t5">Select All</span>
                            </div>
                            <div className={`${isCatalogShared ? 'hidden' : ''}`}>
                                {this.state.enabledMyCatalog?
                                    <span className="icon-det-28" onClick={this.deleteAllItems}></span> :
                                    <span className="icon-det-28"></span>
                                }
                                <span className="margin-l5 text-del">Delete Items</span>
                            </div>
                            <div className="pull-right maring-b10">
                                  <div className="pull-left padding-r10 margin-t7">View</div>
                                  <div className="pull-left">
                                      <select className="form-control" onChange={ this.selectedPageSize } ref="pageSize">
                                        <option key="16" value="16">16</option>
                                        <option key="32" value="32">32</option>
                                        <option key="60" value="60">60</option>
                                      </select>
                                  </div>
                                  <div className="pull-left padding-l10 margin-t7 margin-r10">
                                    per page
                                  </div>
                                  <div className="searchresult-navi cat-go">
                                      {this.renderPagination()}
                                  </div>
                            </div>
                      </div>
                        <div className="panel panel-default">
                            <div className="panel-body padding-ft0">
                                <div className={'search-product' }>
                                    <GridItemsView  items={items} onClickGrid={this.onClickGrid}
                                        onCheckedOneItemMyCatalog={this.checkedOneItemMySetCatalog}
                                        onDeleteOneItemMyCatalog={this.deleteOneItemMySetCatalog}
                                        isCatalogShared={isCatalogShared} stateItem={this.state}
                                        ViewAsSet={ViewAsSet} listMyCatalog={listMyCatalog}/>
                                </div>
                                <div id="dvGridview" className="search-product hidden">
                                    <GridItemsViewPrint  items={items} onClickGrid={this.onClickGrid}
                                      onCheckedOneItemMyCatalog={this.checkedOneItemMySetCatalog}
                                      onDeleteOneItemMyCatalog={this.deleteOneItemMySetCatalog}
                                      isCatalogShared={isCatalogShared}
                                      ViewAsSet={ViewAsSet}/>
                                </div>
                                {/* Pagination */}
                                <div className="col-sm-12 pagenavi maring-t20">
                                  <div className="searchresult-navi cat-go">
                                    {this.renderPagination()}
                                  </div>
                                </div>
                                {/* End Pagination */}
                            </div>
                        </div>
                    </div>
                  </div>
                  {this.renderModalConfirmDelete()}
                  {this.renderModalConfirmDeleteCatalog()}
                  {this.renderModalConfirmDeleteAllItem()}
                  {this.renderAlertmsg()}
                  {this.renderAlertmsgPdf()}
                  {this.renderShareMySetCatalog()}
                  {this.renderAlertmsgShareSetCatalog()}
                  {this.renderDialogPrintOptions()}
                  {this.renderDialogWordOptions()}
                </form>
            );
    }
}
function mapStateToProps(state) {
    return {
        initialValues: state.myCatalog.listSetCatalogItems,
        listSetCatalogName: state.myCatalog.ListSetCatalogName,
        listSetCatalogItems: state.myCatalog.listSetCatalogItems,
        currentPage: state.myCatalog.setCurrentPage,
        setCatalogId: state.myCatalog.setCatalogId,
        setCatalogName: state.myCatalog.setCatalogName,
        catalogSortingBy: state.myCatalog.setCatalogSortingBy,
        catalogSortDirection: state.myCatalog.catalogSortDirection,
        totalPrice: state.myCatalog.setTotalPrice,
        totalUpdatedCost: state.myCatalog.setTotalUpdatedCost,
        shareSetCatalogStatus: state.myCatalog.shareSetCatalogStatus,
        shareSetCatalogmsgError: state.myCatalog.msgSet,
        shareSetCatalogStatusCode: state.myCatalog.shareSetCatalogStatusCode,
        isCatalogShared: state.myCatalog.isCatalogShared,
        ViewAsSet: state.searchResult.viewAsSet,
        pageSize: state.searchResult.PageSize
    }
}
SetCatalog.contextTypes = {
  router: PropTypes.object
};
module.exports = reduxForm({
  form: 'SetCatalog',
  fields: ['currPage', 'setCatalog', 'shareTo', 'validateEmailTo', 'printPage', 'printPrice', 'printPageWord'],
  validate: validateEmail
},mapStateToProps,itemactions)(SetCatalog)
