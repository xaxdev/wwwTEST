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

import { LASTMODIFIED, REFERENCE, DESCRIPTION, DESCENDING, ASCENDING } from '../../constants/itemconstants';

const Loading = require('react-loading');

let listMyCatalog = []

class MyCatalog extends Component {
    constructor(props) {
        super(props);

        this.handleGo = this.handleGo.bind(this);
        this.onClickGrid = this.onClickGrid.bind(this);
        this.selectedCatalog = this.selectedCatalog.bind(this);
        this.deleteOneItemMyCatalog = this.deleteOneItemMyCatalog.bind(this);
        this.handleSubmitDeleteItem = this.handleSubmitDeleteItem.bind(this);
        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
        this.changeCatalogName = this.changeCatalogName.bind(this);
        this.saveCatalogName = this.saveCatalogName.bind(this);
        this.deleteCatalog = this.deleteCatalog.bind(this);
        this.handleSubmitDeleteCatalog = this.handleSubmitDeleteCatalog.bind(this);
        this.changeSortingBy = this.changeSortingBy.bind(this);
        this.changeSortingDirection = this.changeSortingDirection.bind(this);
        this.checkedOneItemMyCatalog = this.checkedOneItemMyCatalog.bind(this);
        this.onCheckedAllItemMyCatalog = this.onCheckedAllItemMyCatalog.bind(this);
        this.deleteAllItems = this.deleteAllItems.bind(this);
        this.handleSubmitDeleteAllItem = this.handleSubmitDeleteAllItem.bind(this);
        this.printResults = this.printResults.bind(this);
        this.shareMyCatalog = this.shareMyCatalog.bind(this);

        this.state = {
          activePage: this.props.currentPage,
          isOpenDeleteItem: false,
          isOpenAddMyCatalogmsg: false,
          isTooltipActive: false,
          isOpenDeleteCatalog: false,
          enabledMyCatalog: false,
          isOpenDeleteAllItem: false,
          isOpenZeroCatalog: true,
          isOpenPrintPdfmsg: false,
          isOpenShareMyCatalog: false
        }

    }

    componentWillMount = _=>{

        let catalogName = '';
        const { fields: { catalog } } = this.props;
        this.props.getCatalogNameSetItem().then((value) => {
        // this.props.getCatalogName().then((value) => {
            if (value) {
                // console.log('componentWillMount this.props-->',this.props.catalogId);
                let catalogId = '';
                let isCatalogShared = false;
                if(this.props.listCatalogName != undefined){
                    if(this.props.catalogId != null){
                        catalogId = this.props.catalogId;
                        isCatalogShared = this.props.isCatalogShared;
                    }else{
                        if(this.props.listCatalogName.length != 0){
                            // console.log('componentWillMount this.props.listCatalogName[0].shared-->',this.props.listCatalogName[0].shared);
                            catalogId = this.props.listCatalogName[0]._id;
                            catalogName = this.props.listCatalogName[0].catalog;
                            isCatalogShared = this.props.listCatalogName[0].shared;
                        }else{
                            isCatalogShared = true;
                        }
                    }

                    let parasm = {
                            id: catalogId,
                            page: this.props.currentPage,
                            size: 16,
                            sort: (this.props.catalogSortingBy != null)? this.props.catalogSortingBy: 2,
                            order: (this.props.catalogSortDirection != null)? this.props.catalogSortDirection: -1
                        };
                    if (catalogId != '') {
                        catalog.value = catalogName;
                        catalog.onChange(catalogName);
                        this.props.setRenameCatalog(catalogName);
                        // this.props.getCatalogItems(parasm);
                        this.props.getCatalogItemsWithSetItem(parasm);
                        this.props.setIsCatalogShare(isCatalogShared);
                    }else{
                        this.props.setIsCatalogShare(isCatalogShared);
                    }
                }
            }
        });
    }

    componentWillReceiveProps(nextProps) {
      let inputCatalogName = this.refs.catalogName;
      if (inputCatalogName != undefined) {
          if (this.props.catalogName != nextProps.catalogName) {
              inputCatalogName.value = nextProps.catalogName;
          }
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState);
    }

    printResults(e){
      e.preventDefault();

    //   const { showGridView,showListView } = this.props;
      const userLogin = JSON.parse(sessionStorage.logindata);

      const host = HOSTNAME || 'localhost';
      const ROOT_URL = (host != 'mol.mouawad.com')? `http://${host}:3005`: `http://${host}`;
      let imagesReplace = ROOT_URL+'/images/';

      let exportDate = moment().tz('Asia/Bangkok').format('YYYYMMDD_HHmmss');

      let dvTotal = jQuery('#dvTotalsub').html();
      let dvGridview = jQuery('#dvGridview').html();

      let dv = {
                  'dvTotal': dvTotal,
                  'dvGridview': dvGridview
              };

      let htmlTemplate = '';

      htmlTemplate = GenTemplateHtml(ROOT_URL, imagesReplace, dv);

      console.log(htmlTemplate);

      let params = {
                      'temp': htmlTemplate,
                      'userName': `${userLogin.username}_${exportDate}`,
                      'userEmail': userLogin.email,
                      'ROOT_URL': ROOT_URL
                  }

      this.props.writeHtml(params)
          .then((value) => {
              if (value) {
                  this.setState({isOpenPrintPdfmsg: true});
              }
              console.log(value);
          });

    }

    handleSubmitDeleteAllItem = (e)=>{
        e.preventDefault();
        // console.log('handleSubmitDeleteAllItem');
        const { catalogId } = this.props;
        let catalog = this.refs.catalog;

        this.setState({isOpenDeleteAllItem: false});
        // console.log('listMyCatalog-->',listMyCatalog);
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
        let paramsItem ={id: catalogId, items: items};
        // console.log('params-->',params);
        if (catalogId != null) {
            this.props.deleteCatalogItems(paramsItem).then( () =>{
                // console.log('Deleted!');
                let params = {
                                id: catalogId,
                                page: this.props.currentPage,
                                size: 16,
                                sort: (this.props.catalogSortingBy != null)? this.props.catalogSortingBy: 2,
                                order: (this.props.catalogSortDirection != null)? this.props.catalogSortDirection: -1
                            };
                // this.props.getCatalogItems(params);
                this.props.getCatalogItemsWithSetItem(params);

            });
        }
        // console.log('catalog-->',catalog);
    }

    deleteAllItems = _=> {
        const { catalogId } = this.props;
        let catalog = this.refs.catalog;

        // console.log('listMyCatalog-->',listMyCatalog);
        let items = [];

        listMyCatalog.map((item) => {
            items.push({id: item.id});
        })
        let params ={id: catalogId, items: items};
        // console.log('params-->',params);
        this.setState({isOpenDeleteAllItem: true});

    }

    onCheckedAllItemMyCatalog = (e)=> {
        let fileName = jQuery('input[type="checkbox"]');
        const { items } = this.props.listCatalogItems;
        const { catalogId } = this.props;

        if (catalogId != null) {
            if (e.target.checked) {
                fileName.attr('checked','checked');
                this.setState({enabledMyCatalog: true});
                for(let i=0, n=fileName.length;i<n;i++) {
                    fileName[i].checked = true;
                }
                listMyCatalog = [];
                items.map((item) => {
                    let itemName = (item.type != 'CER')? item.description: item.name;
                    let objItem = {
                        id: item.id,
                        reference: item.reference,
                        description: itemName,
                        catalogId: catalogId
                    };
                    listMyCatalog.push(objItem);
                });

            } else {
                fileName.removeAttr('checked');
                listMyCatalog = [];
                this.setState({enabledMyCatalog: false});
            }
        }
        // console.log(listMyCatalog);
    }

    checkedOneItemMyCatalog = (e)=> {
        // console.log(e.target.value);
        let fileName = jQuery('input[type="checkbox"]');
        const { items } = this.props.listCatalogItems;
        const { catalogId } = this.props;
        const itemTargetId = e.target.value.split('=');
        let itemAdded = [];
        if (itemTargetId[0] == 'id') {
            itemAdded = items.filter(oneItem => oneItem.id === itemTargetId[1]);
        } else {
            itemAdded = items.filter(oneItem => oneItem.reference === itemTargetId[1]);
        }
        itemAdded = itemAdded[0];
        let itemName = (itemAdded.type != 'CER')? itemAdded.description: itemAdded.name;
        let objItem = {
                        id: itemAdded.id,
                        reference: itemAdded.reference,
                        description: itemName,
                        catalogId: catalogId
                    };

        if(!this.state.enabledMyCatalog){
            listMyCatalog = [];
        }

        if (e.target.checked) {
            listMyCatalog.push(objItem);
            if (listMyCatalog.length == (fileName.length-1)) {
                this.refs.selectAllItems.checked = true;
            }
        } else {
            this.refs.selectAllItems.checked = false;
            listMyCatalog = listMyCatalog.filter(inItem => inItem.id !== e.target.value);
        }

        if (listMyCatalog.length != 0) {
          this.setState({enabledMyCatalog: true});
        } else {
          this.setState({enabledMyCatalog: false});
        }
        // console.log('item -->',e.target.checked);
        // console.log('item -->',e.target.value);
        // console.log('listMyCatalog -->',listMyCatalog);
    }

    changeSortingDirection = (e)=> {
        e.preventDefault();

        let sortingDirection = e.target.value;
        const pageSize = 16;
        const { catalogId, listCatalogItems } = this.props;

        let parasm = {
                id: catalogId,
                page: this.props.currentPage,
                size: pageSize,
                sort: (this.props.catalogSortingBy != null)? this.props.catalogSortingBy: 2,
                order: sortingDirection
            };
        this.props.setCatalogSortDirection(sortingDirection);
        if (catalogId != null) {
            // this.props.getCatalogItems(parasm);
            this.props.getCatalogItemsWithSetItem(parasm);
        }
    }

    changeSortingBy = (e)=> {
        e.preventDefault();

        let sortingBy = e.target.value;
        const pageSize = 16;
        const { catalogId, listCatalogItems } = this.props;

        let parasm = {
                id: catalogId,
                page: this.props.currentPage,
                size: pageSize,
                sort: sortingBy,
                order: (this.props.catalogSortDirection != null)? this.props.catalogSortDirection: -1
            };
        this.props.setCatalogSortingBy(sortingBy);
        if (catalogId != null) {
            // this.props.getCatalogItems(parasm);
            this.props.getCatalogItemsWithSetItem(parasm);
        }
    }

    saveCatalogName = (e)=> {
        e.preventDefault();
        const { fields: { catalog }, catalogId } = this.props;
        let params = {id: catalogId, catalog: catalog.value};
        // console.log(params);
        this.setState({isTooltipActive: false});
        if (catalogId != null) {
            this.props.setNewCatalogName(params).then((value) => {
                if(value){
                    // this.props.getCatalogName();
                    this.props.getCatalogNameSetItem();
                }
            });
        }
    }

    changeCatalogName = (e)=> {
        // e.preventDefault();
        const catalogName = e.target.value;
        const { fields: { catalog } } = this.props;
        // console.log('catalogName-->',catalogName);
        catalog.value = catalogName;
        catalog.onChange(catalogName);
        this.props.setRenameCatalog(catalogName);
    }

    showTooltip = _=> {
        // console.log('showTooltip');
        let catalogName = this.refs.catalogName;
        this.setState({isTooltipActive: true})
    }
    hideTooltip = _=>{
        // console.log('hideTooltip');
        this.setState({isTooltipActive: false});
    }

    onClickGrid(pageNumber){
      // console.log('onClickGrid==>',pageNumber);
      const token = sessionStorage.token;
      const getIdReference = pageNumber.split('=');
    //   console.log('getIdReference-->',getIdReference);
      if(token){
          if (getIdReference[0] == 'id') {
              this.context.router.push(`/productmycatalog/${getIdReference[1]}`);
          } else {
              this.context.router.push(`/setdetailmycatalog/${getIdReference[1]}`);
          }
      }
    }

    handleGo(e){
        e.preventDefault();
        // console.log('handleGo-->',this.refs.reletego.value);

        const getPage = parseInt((this.refs.reletego.value != ''?this.refs.reletego.value:this.state.activePage));

        const userLogin = JSON.parse(sessionStorage.logindata);
        const { catalogId, listCatalogItems } = this.props;

        if (Number(this.refs.reletego.value) > listCatalogItems.total_pages || Number(this.refs.reletego.value) < 1) {
            this.setState({isOpenAddMyCatalogmsg: true});
        //   this.renderAlertmsg('Page is invalid.');
        }else{
            const pageSize = 16;

            this.setState({activePage: getPage});

            this.setState({
              showLoading: true
            });

            let parasm = {
                    id: catalogId,
                    page: getPage,
                    size: pageSize,
                    sort: (this.props.catalogSortingBy != null)? this.props.catalogSortingBy: 2,
                    order: (this.props.catalogSortDirection != null)? this.props.catalogSortDirection: -1
                };
            this.props.setCatalogCurrentPage(getPage);
            if (catalogId != null) {
                // this.props.getCatalogItems(parasm).then((value) => {
                this.props.getCatalogItemsWithSetItem(parasm).then((value) => {
                    console.log(value);
                });
            }
        }
    }

    selectedCatalog = (e) =>{
        e.preventDefault();
        const { fields: { catalog }, listCatalogName } = this.props;
        const catalogId = e.target.value;
        this.setState({activePage: 1});
        this.props.setCatalogCurrentPage(1);
        // console.log('listCatalogName-->',listCatalogName);
        let [selectedCatalog] = listCatalogName.filter((catalog) => {return catalog._id == catalogId});
        // console.log('selectedCatalog-->',selectedCatalog.shared);
        let parasm = {
                    id: catalogId,
                    page: 1,
                    size: 16,
                    sort: (this.props.catalogSortingBy != null)? this.props.catalogSortingBy: 2,
                    order: (this.props.catalogSortDirection != null)? this.props.catalogSortDirection: -1
                };
        // this.props.getCatalogItems(parasm);
        this.props.getCatalogItemsWithSetItem(parasm)
        this.props.setIsCatalogShare(selectedCatalog.shared);
    }

    deleteOneItemMyCatalog = (item) => {
        let fileName = jQuery('input[type="checkbox"]');
        fileName.removeAttr('checked');
        listMyCatalog  = [];
        this.setState({enabledMyCatalog: false});
        const { items } = this.props.listCatalogItems;
        const catalogId = this.props.listCatalogItems._id
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
                        id: itemAdded.id,
                        reference: itemAdded.reference,
                        description: itemName,
                        catalogId: catalogId
                    };

        listMyCatalog.push(objItem);

        this.refs.selectAllItems.checked = false;

        this.setState({isOpenDeleteItem: true});
    }

    deleteCatalog = _=> {
        this.setState({isOpenDeleteCatalog: true});
    }

    handleSubmitDeleteItem = (e)=>{
        e.preventDefault();
        const { catalogId } = this.props;
        let catalog = this.refs.catalog;

        this.setState({isOpenDeleteItem: false});
        // console.log('listMyCatalog-->',listMyCatalog);
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
        let params ={id: catalogId, items: items};
        // console.log('params-->',params);
        if (catalogId != null) {
            this.props.deleteCatalogItems(params).then( () =>{
                // console.log('Deleted!');
                let parasm = {
                    id: catalogId,
                    page: this.props.currentPage,
                    size: 16,
                    sort: (this.props.catalogSortingBy != null)? this.props.catalogSortingBy: 2,
                    order: (this.props.catalogSortDirection != null)? this.props.catalogSortDirection: -1
                };
                // this.props.getCatalogItems(parasm);
                this.props.getCatalogItemsWithSetItem(parasm)

            });
        }
        // console.log('catalog-->',catalog);
    }

    handleSubmitDeleteCatalog = (e)=>{
        e.preventDefault();
        const { catalogId } = this.props;
        // console.log('Deleted!-->',catalogId);
        let params = {id: catalogId}
        this.setState({isOpenDeleteCatalog: false});
        if (catalogId != null) {
            this.props.deleteCatalog(params).then((valueDelete) => {
                if (valueDelete) {
                    this.props.getCatalogNameSetItem().then((valueGetCatalog) => {
                    // this.props.getCatalogName().then((valueGetCatalog) => {
                        if (valueGetCatalog) {
                            // console.log('componentWillMount-->',this.props.listCatalogName);
                            let isCatalogShared = false;
                            if(this.props.listCatalogName.length != 0){
                                isCatalogShared = this.props.listCatalogName[0].shared;
                                let parasm = {
                                    id: this.props.listCatalogName[0]._id,
                                    page: this.props.currentPage,
                                    size: 16,
                                    sort: (this.props.catalogSortingBy != null)? this.props.catalogSortingBy: 2,
                                    order: (this.props.catalogSortDirection != null)? this.props.catalogSortDirection: -1
                                };
                                // this.props.getCatalogItems(parasm);
                                this.props.getCatalogItemsWithSetItem(parasm)
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
        // const token = sessionStorage.token;
        // if(token){
        //     this.context.router.push('/inventories');
        // }
    }

    handleCloseDeleteCatalog = _=>{
        this.setState({isOpenDeleteCatalog: false});
    }

    renderPagination(){
      const { fields: { currPage },
              currentPage,
              handleSubmit,
              resetForm,
              submitting } = this.props;
      // console.log('totalPages-->',totalPages);
      // console.log('this.state.activePage-->',this.state.activePage);
      const page = this.state.activePage;
      const totalPages = this.props.listCatalogItems.total_pages;
      // currPage.value = this.state.activePage;
      // console.log('renderPagination-->',this.state.activePage);

      return(
          <div>
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
        return(<ModalConfirmDelete onSubmit={this.handleSubmitDeleteCatalog} isOpen={this.state.isOpenDeleteCatalog}
            isClose={this.handleCloseDeleteCatalog} props={this.props} message={msg} title={title}/>);
    }

    renderTotals(){
      const { fields: { currPage },
              totalPages,
              currentPage,
              items,listCatalogItems,totalPrice,totalUpdatedCost,
              handleSubmit,
              resetForm,
              submitting } = this.props;

        // console.log('listCatalogItems-->',listCatalogItems);
        const { setItemPrice,setItemUpdatedCost } = listCatalogItems;
        let _totalUpdatedCost =  (totalUpdatedCost!=null) ? numberFormat(totalUpdatedCost) : 0;
        let _totalPublicPrice =  (totalPrice!=null) ? numberFormat(totalPrice) : 0;
        let _totalPublicPriceSet = (setItemPrice!=null) ? numberFormat(setItemPrice) : 0;
        let _totalUpdatedCostSet = (setItemUpdatedCost!=null) ? numberFormat(setItemUpdatedCost) : 0;

        const userLogin = JSON.parse(sessionStorage.logindata);

      return(
        <div>
          <div id="dvTotalsub" className="bg-f7d886 text-center">
                <span><span className="font-b fc-000">All Pages :</span> <span className="font-w9">{ numberFormat(listCatalogItems.total_pages) } Pages </span><span className="padding-lf15">|</span></span>
                <span><span className="font-b fc-000">Total Items :</span> <span className="font-w9">{ numberFormat(listCatalogItems.total_items) } Items </span><span className="padding-lf15">|</span></span>
                <span className={`${(userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                        || userLogin.permission.price == 'All') ?
                        '' : 'hidden'}`}>
                    <span className="font-b fc-000">Total Public Price :</span>
                    <span className="font-w9">{ _totalPublicPrice } { userLogin.currency }</span>
                </span>
                <span className={`${(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ?
                    '' : 'hidden'}`}>
                    <span className="padding-lf15"> | </span>
                    <span className="font-b fc-000">Total Updated Cost :</span>
                    <span className="font-w9">{ _totalUpdatedCost } { userLogin.currency }
                    </span>
                </span>
          </div>
          <div id="dvTotalsub" className="bg-f7d886 text-center">
                <span><span className="font-b fc-000">All Pages :</span> <span className="font-w9">{ numberFormat(listCatalogItems.total_pages) } Pages </span><span className="padding-lf15">|</span></span>
                <span><span className="font-b fc-000">Total SetItems :</span> <span className="font-w9">{ numberFormat(listCatalogItems.total_items) } Items </span><span className="padding-lf15">|</span></span>
                <span className={`${(userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                        || userLogin.permission.price == 'All') ?
                        '' : 'hidden'}`}>
                    <span className="font-b fc-000">Total Public Price(Set) :</span>
                    <span className="font-w9">{ _totalPublicPriceSet } { userLogin.currency }</span>
                </span>
                <span className={`${(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ?
                    '' : 'hidden'}`}>
                    <span className="padding-lf15"> | </span>
                    <span className="font-b fc-000">Total Updated Cost(Set) :</span>
                    <span className="font-w9">{ _totalUpdatedCostSet } { userLogin.currency }
                    </span>
                </span>
          </div>
        </div>
      );
    }

    renderAlertmsg = _=> {
      const message = 'Page is invalid.';
      const title = 'ADD TO CATALOG';

      return(<Modalalertmsg isOpen={this.state.isOpenAddMyCatalogmsg} isClose={this.handleClosemsg}
          props={this.props} message={message}  title={title}/>);
    }

    handleClosemsgShareCatalog = _=> {
        this.props.setCloseAlertMsg(100);
    }

    renderAlertmsgShareCatalog = _=> {
        const { shareCatalogStatus, shareCatalogStatusCode, shareCatalogmsgError} = this.props;

        const title = 'SHARE CATALOG';
        let isOpen = shareCatalogStatusCode >= 200 ? true : false;

        return(<Modalalertmsg isOpen={isOpen} isClose={this.handleClosemsgShareCatalog}
            props={this.props} message={shareCatalogmsgError}  title={title}/>);
    }

    renderAlertmsgPdf = _=> {

      const message = 'Please check your email for printing files.';
      const title = 'MY CATALOG';
      return(<Modalalertmsg isOpen={this.state.isOpenPrintPdfmsg} isClose={this.handleClosePdfmsg}
          props={this.props} message={message}  title={title}/>);
    }

    shareMyCatalog = _=>{
        this.setState({isOpenShareMyCatalog: true});
    }

    handleSubmitShareCatalog = (e)=>{
        e.preventDefault();
        const { catalogId } = this.props;
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
        params.id = catalogId;
        params.users = paramEmails;
        // console.log('params-->',params);
        this.props.shareCatalog(params)
            .then((response)=>{
                this.setState({isOpenShareMyCatalog: false});
                this.props.setDataSendEmailTo('');
                shareTo.onChange('');
                shareTo.value = '';
            })
    }

    handleCloseShareMyCatalog = _=> {
        const { fields: {
                  shareTo
              } } = this.props;
        this.props.setDataSendEmailTo('');
        shareTo.onChange('');
        shareTo.value = '';
        this.setState({isOpenShareMyCatalog: false});
    }

    renderShareMyCatalog = _=> {
        const { submitting } = this.props;
        return(<ModalShareMyCatalog onSubmit={this.handleSubmitShareCatalog}
            isOpen={this.state.isOpenShareMyCatalog}
            isClose={this.handleCloseShareMyCatalog} props={this.props}/>);
    }

    render() {
            const {  fields:{ catalog }, catalogId, catalogName, isCatalogShared, ViewAsSet } = this.props;
            let catalogSortingBy = (this.props.catalogSortingBy != null)? this.props.catalogSortingBy: 2;
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
            // let isOpenMsg =  this.state.isOpenAddMyCatalogmsg;
            // console.log('this.props.-->',this.props.listCatalogName);
            // console.log('catalogName-->',catalogName);
            // console.log('isCatalogShared-->',isCatalogShared);

            let items = this.props.listCatalogName != undefined ?
                            this.props.listCatalogName.length != 0 ?
                                this.props.listCatalogItems.items != undefined ? this.props.listCatalogItems.items : [] :
                            [] :
                        [];
            return(
                <form role="form">
                  {/* Header Search */}

                  <div className="col-sm-12 col-xs-12 bg-hearder-mycatalog">
                      <div className="cat-title"><h1 className="text-center">MY CATALOG</h1></div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 nopadding">
                                <div className="col-lg-7 col-md-7 col-sm-6 col-xs-12 nopadding">
                                  <div className="col-lg-5 col-md-5 col-sm-4 col-xs-12 nopadding margin-t5">Catalog Name</div>
                                  <div className="col-lg-7 col-md-7 col-sm-8 col-xs-12 nopadding">
                                      <div className="styled-select-black">
                                        <select onChange={this.selectedCatalog}  value={catalogId}
                                            ref="catalog">
                                          {
                                              this.props.listCatalogName.length != 0 ?
                                              this.props.listCatalogName.map((cat) => {
                                                  return (<option key={cat._id} value={cat._id}>{cat.catalog}</option>);
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
                                          <p>Edit Catalog Name</p>
                                          <div className="form-group">
                                            <input type="text" className="form-control"
                                                onChange={this.changeCatalogName}  placeholder={catalogName}
                                                 ref="catalogName"/>
                                          </div>
                                            <button type="button" className="btn btn-default"
                                                onClick={this.saveCatalogName}>
                                                save
                                            </button>
                                        </div>
                                    </ToolTip>
                                    <a><div className={`${isCatalogShared ? 'hidden' : 'icon-del'}`} onClick={this.deleteCatalog}></div></a>
                                    <a><div className={`${items.length == 0 ? 'hidden' : 'icon-print'}`} id="printproduct"
                                        onClick={ this.printResults }></div></a>
                                      <a><div className={`${isCatalogShared ? 'hidden' : 'icon-share'}`}
                                        onClick={ this.shareMyCatalog }></div></a>
                                </div>
                              </div>
                            <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 nopadding">
                              <div className="cat-sort col-xs-12 margin-t5">
                                <ControlLabel>Sort By : </ControlLabel>
                              </div>
                              <div className="col-md-3 col-sm-3 col-xs-12 nopadding m-bottom-5">
                                <div className="styled-select-black">
                                  <select onChange={this.changeSortingBy} value={catalogSortingBy}
                                    ref="sortingBy">
                                    <option key={2} value={2}>{'Item Reference'}</option>
                                    <option key={3} value={3}>{'Description'}</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3 col-sm-3 col-xs-12 nopadding margin-l10 m-margin-xs m-bottom-5">
                                <div className="styled-select-black">
                                    <select onChange={this.changeSortingDirection} value={catalogSortDirection}
                                        ref="sortingDirection">
                                      <option key={-1} value={-1}>{'Descending'}</option>
                                      <option key={1} value={1}>{'Ascending'}</option>
                                    </select>
                                </div>
                              </div>
                              <div className="col-md-4 col-sm-4 pagenavi nopadding pull-right">
                                  <div className="searchresult-navi cat-go">
                                      {this.renderPagination()}
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
                      <div className={`${isCatalogShared || items.length == 0  ? 'hidden' : 'col-sm-12 col-xs-12 pagenavi maring-t20 cat-line'}`} >
                            <div className="checkbox checkbox-warning ">
                                <input type="checkbox" id="checkbox1" className="styled" type="checkbox"
                                    onChange={this.onCheckedAllItemMyCatalog} ref="selectAllItems"/>
                                <label className="checkbox1 select"></label>
                                <span className="margin-l10 text-vertical">Select All</span>
                            </div>
                            <div>
                                {this.state.enabledMyCatalog?
                                    <span className="icon-det-28" onClick={this.deleteAllItems}></span> :
                                    <span className="icon-det-28"></span>
                                }
                                <span className="margin-l5 text-del">Delete Items</span>
                            </div>
                      </div>
                        <div className="panel panel-default">
                            <div className="panel-body padding-ft0">
                                <div className={'search-product' }>
                                    <GridItemsView  items={items} onClickGrid={this.onClickGrid}
                                        onCheckedOneItemMyCatalog={this.checkedOneItemMyCatalog}
                                        onDeleteOneItemMyCatalog={this.deleteOneItemMyCatalog}
                                        isCatalogShared={isCatalogShared}
                                        ViewAsSet={ViewAsSet}/>
                                </div>
                                <div id="dvGridview" className="search-product hidden">
                                  <GridItemsViewPrint  items={items} onClickGrid={this.onClickGrid}
                                    onCheckedOneItemMyCatalog={this.checkedOneItemMyCatalog}
                                    onDeleteOneItemMyCatalog={this.deleteOneItemMyCatalog}
                                    isCatalogShared={isCatalogShared}
                                    ViewAsSet={ViewAsSet}/>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                  {this.renderModalConfirmDelete()}
                  {this.renderModalConfirmDeleteCatalog()}
                  {this.renderModalConfirmDeleteAllItem()}
                  {this.renderAlertmsg()}
                  {this.renderAlertmsgPdf()}
                  {this.renderShareMyCatalog()}
                  {this.renderAlertmsgShareCatalog()}
                </form>
            );
    }
}
function mapStateToProps(state) {
    return {
        initialValues: state.myCatalog.listCatalogItems,
        listCatalogName: state.myCatalog.ListCatalogName,
        listCatalogItems: state.myCatalog.listCatalogItems,
        currentPage: state.myCatalog.currentPage,
        catalogId: state.myCatalog.catalogId,
        catalogName: state.myCatalog.catalogName,
        catalogSortingBy: state.myCatalog.catalogSortingBy,
        catalogSortDirection: state.myCatalog.catalogSortDirection,
        totalPrice: state.myCatalog.totalPrice,
        totalUpdatedCost: state.myCatalog.totalUpdatedCost,
        shareCatalogStatus: state.myCatalog.shareCatalogStatus,
        shareCatalogmsgError: state.myCatalog.msg,
        shareCatalogStatusCode: state.myCatalog.shareCatalogStatusCode,
        isCatalogShared: state.myCatalog.isCatalogShared,
        ViewAsSet: state.searchResult.viewAsSet
    }
}
MyCatalog.contextTypes = {
  router: PropTypes.object
};
module.exports = reduxForm({
  form: 'MyCatalog',
  fields: ['currPage', 'catalog', 'shareTo', 'validateEmailTo'],
  validate: validateEmail
},mapStateToProps,itemactions)(MyCatalog)
