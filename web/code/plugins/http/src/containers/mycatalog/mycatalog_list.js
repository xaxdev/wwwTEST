import React, { Component, PropTypes }from 'react';
import { reduxForm, reset } from 'redux-form';
import { Button,FormControl,Pagination, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';
import ToolTip from 'react-portal-tooltip';
import shallowCompare from 'react-addons-shallow-compare';

import * as itemactions from '../../actions/itemactions';
import numberFormat from '../../utils/convertNumberformat';
import GridItemsView from '../../components/mycatalog/griditemview';
import GridItemsViewPrint from '../../components/mycatalog/griditemviewPrint';
import ModalConfirmDelete from '../../utils/modalConfirmDelete.js';
import Modalalertmsg from '../../utils/modalalertmsg';

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

        this.state = {
          activePage: this.props.currentPage,
          isOpenDeleteItem: false,
          isOpenAddMyCatalogmsg: false,
          isTooltipActive: false,
          isOpenDeleteCatalog: false,
          enabledMyCatalog: false,
          isOpenDeleteAllItem: false,
          isOpenZeroCatalog: true,
          isOpenPrintPdfmsg: false
        }

    }

    componentWillMount = _=>{
        // console.log('componentWillMount-->');
        // console.log('this.props.catalogId-->',this.props.catalogId);
        // console.log('this.props.catalogSortingBy-->',this.props.catalogSortingBy);
        // console.log('this.props.catalogSortDirection-->',this.props.catalogSortDirection);

        let catalogName = '';
        const { fields: { catalog } } = this.props;

        this.props.getCatalogName().then((value) => {
            if (value) {
                // console.log('componentWillMount-->',this.props.listCatalogName);
                let catalogId = '';
                if(this.props.listCatalogName != undefined){
                    if(this.props.catalogId != null){
                        catalogId = this.props.catalogId;
                    }else{
                        if(this.props.listCatalogName.length != 0){
                            catalogId = this.props.listCatalogName[0]._id;
                            catalogName = this.props.listCatalogName[0].catalog;
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
                        this.props.getCatalogItems(parasm);
                    }
                }
            }
        });
    }

    componentWillReceiveProps(nextProps) {
      // console.log('nextProps-->',nextProps);

    //   console.log('componentWillReceiveProps-->');
      let inputCatalogName = this.refs.catalogName;
      if (inputCatalogName != undefined) {
          if (this.props.catalogName != nextProps.catalogName) {
              inputCatalogName.value = nextProps.catalogName;
          }
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      // console.log('nextProps.currentPage-->',nextProps.currentPage);
    //   console.log('nextProps.catalogName-->',nextProps.fields.catalog.value);
      return shallowCompare(this, nextProps, nextState);
    }

    printResults(e){
      e.preventDefault();

      const { showGridView,showListView } = this.props;
      const userLogin = JSON.parse(sessionStorage.logindata);

      const host = HOSTNAME || 'localhost';
      const ROOT_URL = (host != 'http://mol.mouawad.com')? `http://${host}:3005`: `http://${host}`;
      let imagesReplace = ROOT_URL+'/images/';

      let dvTotal = jQuery('#dvTotalsub').html();
      let dvGridview = jQuery('#dvGridview').html();
    //   let dvListview = jQuery('#dvListview').html();

      let styleTotal =`background-color: #dddddd;float: left;width: 100%;padding: 10px 0px;text-align: center; font-family: '${'Open Sans'}', sans-serif; font-size:10px;`;
    //   let styleTotal2 =`background-color: #dddddd;float: left;width: 100%;padding: 10px 0px;text-align: center; font-family:'${'Open Sans'}', sans-serif; font-size:14px;`;
      let styleBodyWrapper ='margin: 0;padding: 0;';
      let styleContainerMarginb4 ='margin-bottom: 0%;padding-right: 15px;padding-left: 15px;margin-right: auto;margin-left: auto;';
      let styleColsm12 ='width: 100%;';
      let stylePanel ='border-radius: 0;margin-bottom: 0 !important;border: 0;box-shadow: none;';

      let stylePadding ='padding: 15px 0;';
      let styleSearchproduct  ='position: relative;';
      let styleSearchproductGride  ='text-align: center;font-size: 10px;position: relative;z-index: 2;padding: 15px 11px 0 11px;height: 400px;cursor: pointer;';
      let colmd3colsm3nopadding  = 'width: 25%;padding: 0;float: left;height: 400px;';
      let pullRight  = 'float: right!important;';
      let gridAdd  = 'float: left;margin-top: 0;z-index: 1;position: relative;cursor: pointer;';
      let iconAdd28  = `background: url(${ROOT_URL}/images/icon-add-28.png) no-repeat center;width: 28px;height: 28px;float: left;cursor: pointer;`;
      let checkbox  = 'padding-left: 10px;padding-right: 10px;margin-top: 2px;float: left;z-index: 1;position: relative;cursor: pointer;margin-bottom: 10px;';
      let checkbox1  = 'margin: 0 14px 0 10px;';
      let quickView  = 'margin-right: 0px;max-width: 23px;position: absolute;right: 0px;';
      let fontbfc000  = `font-family: '${'open_sanssemibold'}';color: #000;margin: 0 0 10px;`;
      let productdetailh = 'height: 85px;overflow: hidden;word-wrap: break-word;margin: 0 0 10px;';
      let stylePrice = 'color: #ae8f3b; font-weight: bold;';

      dvTotal = dvTotal.replace(/class="font-b fc-000"/g,'style="font-weight: bold; color: #000;"');
      dvTotal = dvTotal.replace(/class="padding-lf15"/g,'style="padding: 0 5px;"');

      dvGridview = dvGridview.replace(/class="searchresult-prodcut "/g,`style="${styleSearchproductGride}"`);
      dvGridview = dvGridview.replace(/\/images\//g,imagesReplace);
      dvGridview = dvGridview.replace(/class="col-md-3 col-sm-3 nopadding"/g,`style="${colmd3colsm3nopadding}"`);
      dvGridview = dvGridview.replace(/class="pull-right"/g,`style="${pullRight}"`);
      dvGridview = dvGridview.replace(/class="grid-add"/g,`style="${gridAdd}"`);
      dvGridview = dvGridview.replace(/class="icon-add-28"/g,`style="${iconAdd28}"`);
      dvGridview = dvGridview.replace(/class="checkbox checkbox-warning"/g,`style="${checkbox}"`);
      dvGridview = dvGridview.replace(/class="checkbox1"/g,`style="${checkbox1}"`);
      dvGridview = dvGridview.replace(/class="quick-view"/g,`style="${quickView}"`);
      dvGridview = dvGridview.replace(/class="font-b fc-000"/g,`style="${fontbfc000}"`);
      dvGridview = dvGridview.replace(/class="product-detail-h"/g,`style="${productdetailh}"`);
      dvGridview = dvGridview.replace(/class="fc-ae8f3b font-b price "/g,`style="${stylePrice}"`);
      dvGridview = dvGridview.replace(/<img/g,'<img width="140" ');

    //   dvListview = dvListview.replace(/\/images\//g,imagesReplace);
    //   dvListview = dvListview.replace(/class="table-responsive"/g,'');
    //   dvListview = dvListview.replace(/class="table table-bordered"/g,'border="1" style="font-size:14px; border: 1px solid #5c5954; border-spacing: 0;border-collapse: collapse; margin:0 auto;" width="90%"');
    //   dvListview = dvListview.replace(/class="sr-only"/g,'style="position: absolute;width: 1px;height: 1px;padding: 0;margin: -1px;overflow: hidden;clip: rect(0,0,0,0);border: 0;"');
    //   dvListview = dvListview.replace(/<thead/g,'<thead style="padding:10px 10px; text-align:center; color:#fff; background-color: #383735;  font-weight: normal; font-size: 10px;"');
    //   dvListview = dvListview.replace(/<th role="columnheader" scope="col"/g,'<th style="padding:10px 10px; text-align:center; color:#fff; background-color: #383735;  font-weight: normal; font-size: 10px;" role="columnheader" scope="col"');
    //   dvListview = dvListview.replace(/<td/g,'<td style="padding:5px 5px;" ');

    //   if (showGridView) {
          let options = 'toolbar=1,menubar=1,scrollbars=yes,scrolling=yes,resizable=yes,width=800,height=1200';
          // let printWindow = window.open('', '', options);
          let htmlTemplate = `<html>
                                  <head>
                                      <title>Mol online 2016</title>
                                      <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
                                  </head>
                                  <body style="margin:0;padding:0; font-family: 'Open Sans', sans-serif; font-size:10px;">
                                      <form>
                                          <div style="${styleBodyWrapper}">
                                              <div>
                                                  <div style="${styleTotal}">
                                                      ${dvTotal}
                                                  </div>
                                                  <div>
                                                    <div style="${styleColsm12}">
                                                        <div style="${stylePanel}">
                                                            <div>
                                                                <div style="${styleSearchproduct}">
                                                                    ${dvGridview}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </form>
                                  </body>
                              </html>`;
        //   console.log(htmlTemplate);
    //   }
          let params = {
                          'temp': htmlTemplate,
                          'userName': userLogin.username,
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
            items.push({id: item.id});
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
                this.props.getCatalogItems(params);

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
        let itemAdded = items.filter(oneItem => oneItem.id === e.target.value);
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
            this.props.getCatalogItems(parasm);
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
            this.props.getCatalogItems(parasm);
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
                    this.props.getCatalogName();
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
      if(token){
          this.context.router.push(`/productmycatalog/${pageNumber}`);
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
                this.props.getCatalogItems(parasm).then((value) => {
                    console.log(value);
                });
            }
        }
    }

    selectedCatalog = (e) =>{
        e.preventDefault();
        const { fields: { catalog } } = this.props;
        const catalogId = e.target.value;
        this.setState({activePage: 1});
        this.props.setCatalogCurrentPage(1);
        // console.log('catalogId-->',catalogId);
        let parasm = {
                    id: catalogId,
                    page: 1,
                    size: 16,
                    sort: (this.props.catalogSortingBy != null)? this.props.catalogSortingBy: 2,
                    order: (this.props.catalogSortDirection != null)? this.props.catalogSortDirection: -1
                };
        this.props.getCatalogItems(parasm);
    }

    deleteOneItemMyCatalog = (item) => {
        let fileName = jQuery('input[type="checkbox"]');
        fileName.removeAttr('checked');
        listMyCatalog  = [];
        this.setState({enabledMyCatalog: false});
        const { items } = this.props.listCatalogItems;
        const catalogId = this.props.listCatalogItems._id
        let itemAdded = items.filter(oneItem => oneItem.id === item.target.attributes[3].value);
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
            items.push({id: item.id});
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
                this.props.getCatalogItems(parasm);

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
                    this.props.getCatalogName().then((valueGetCatalog) => {
                        if (valueGetCatalog) {
                            // console.log('componentWillMount-->',this.props.listCatalogName);
                            if(this.props.listCatalogName.length != 0){
                                let parasm = {
                                    id: this.props.listCatalogName[0]._id,
                                    page: this.props.currentPage,
                                    size: 16,
                                    sort: (this.props.catalogSortingBy != null)? this.props.catalogSortingBy: 2,
                                    order: (this.props.catalogSortDirection != null)? this.props.catalogSortDirection: -1
                                };
                                this.props.getCatalogItems(parasm);
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

        // console.log('totalPublicPrice-->',totalPublicPrice);
        let _totalUpdatedCost =  (totalUpdatedCost!=null) ? numberFormat(totalUpdatedCost) : 0;
        let _totalPublicPrice =  (totalPrice!=null) ? numberFormat(totalPrice) : 0;

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
                    <span className="padding-lf15"> | </span>
                </span>
                <span className={`${(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ?
                    '' : 'hidden'}`}>
                    <span className="font-b fc-000">Total Updated Cost :</span>
                    <span className="font-w9">{ _totalUpdatedCost } { userLogin.currency }
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

    renderAlertmsgPdf = _=> {

      const message = 'Please checking your email for printing files.';
      const title = 'MY CATALOG';
      return(<Modalalertmsg isOpen={this.state.isOpenPrintPdfmsg} isClose={this.handleClosePdfmsg}
          props={this.props} message={message}  title={title}/>);
    }

    render() {
            const {  fields:{ catalog }, catalogId, catalogName } = this.props;
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
            // console.log('catalog-->',catalog.value);

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

                                    <a><div className="icon-edit" id="edit" onMouseEnter={this.showTooltip}
                                        onMouseLeave={this.hideTooltip}></div></a>
                                    <ToolTip active={this.state.isTooltipActive} position="bottom"
                                        arrow="center" parent="#edit" >
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
                                    <a><div className="icon-del" onClick={this.deleteCatalog}></div></a>
                                    <a><div className="icon-print" id="printproduct"
                                        onClick={ this.printResults }></div></a>
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
                      <div className="col-sm-12 col-xs-12 pagenavi maring-t20 cat-line">
                            <div className="checkbox checkbox-warning">
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
                                        onDeleteOneItemMyCatalog={this.deleteOneItemMyCatalog} />
                                </div>
                                <div id="dvGridview" className="search-product hidden">
                                  <GridItemsViewPrint  items={items} onClickGrid={this.onClickGrid}
                                    onCheckedOneItemMyCatalog={this.checkedOneItemMyCatalog}
                                    onDeleteOneItemMyCatalog={this.deleteOneItemMyCatalog}/>
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
        totalUpdatedCost: state.myCatalog.totalUpdatedCost
    }
}
MyCatalog.contextTypes = {
  router: PropTypes.object
};
module.exports = reduxForm({
  form: 'MyCatalog',
  fields: ['currPage', 'catalog'],
},mapStateToProps,itemactions)(MyCatalog)
