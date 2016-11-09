import React, { Component, PropTypes }from 'react';
import { reduxForm, reset } from 'redux-form';
import { Button,FormControl,Pagination, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';
import ToolTip from 'react-portal-tooltip';
import shallowCompare from 'react-addons-shallow-compare';

import * as itemactions from '../../actions/itemactions';
import numberFormat from '../../utils/convertNumberformat';
import GridItemsView from '../../components/mycatalog/griditemview';
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

        this.state = {
          activePage: this.props.currentPage,
          isOpenDeleteItem: false,
          isOpenAddMyCatalogmsg: false,
          isTooltipActive: false,
          isOpenDeleteCatalog: false,
          enabledMyCatalog: false,
          isOpenDeleteAllItem: false
        }

    }

    componentWillMount = _=>{
        this.props.getCatalogName().then((value) => {
            if (value) {
                // console.log('componentWillMount-->',this.props.listCatalogName);
                if(this.props.listCatalogName != undefined){
                    if(this.props.listCatalogName.length != 0){

                        let parasm = {
                                id: this.props.listCatalogName[0]._id,
                                page: this.props.currentPage,
                                size: 16,
                                sort: this.props.catalogSortingBy,
                                order: this.props.catalogSortDirection
                            };
                        this.props.getCatalogItems(parasm);
                    }
                }
            }
        });
    }

    componentDidMount = _=>{
        // console.log('componentDidMount-->');
        if(this.props.listCatalogName != undefined){
            if(this.props.listCatalogName.length != 0){
                let parasm = {
                        id: this.props.listCatalogName[0]._id,
                        page: this.props.currentPage,
                        size: 16,
                        sort: this.props.catalogSortingBy,
                        order: this.props.catalogSortDirection
                    };
                this.props.getCatalogItems(parasm);
            }
        }
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

    handleSubmitDeleteAllItem = (e)=>{
        e.preventDefault();
        console.log('handleSubmitDeleteAllItem');
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
        this.props.deleteCatalogItems(paramsItem).then( () =>{
            // console.log('Deleted!');
            let params = {
                            id: catalogId,
                            page: this.props.currentPage,
                            size: 16,
                            sort: this.props.catalogSortingBy,
                            order: this.props.catalogSortDirection
                        };
            this.props.getCatalogItems(params);

        });
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
        console.log('params-->',params);
        this.setState({isOpenDeleteAllItem: true});

    }

    onCheckedAllItemMyCatalog = (e)=> {
        let fileName = jQuery('input[type="checkbox"]');
        const { items } = this.props.listCatalogItems;
        const { catalogId } = this.props;

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
        console.log(listMyCatalog);
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
        console.log('item -->',e.target.checked);
        console.log('item -->',e.target.value);
        console.log('listMyCatalog -->',listMyCatalog);
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
                sort: this.props.catalogSortingBy,
                order: sortingDirection
            };
        this.props.setCatalogSortDirection(sortingDirection);
        this.props.getCatalogItems(parasm);
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
                order: this.props.catalogSortDirection
            };
        this.props.setCatalogSortingBy(sortingBy);
        this.props.getCatalogItems(parasm);
    }

    saveCatalogName = (e)=> {
        e.preventDefault();
        const { fields: { catalog }, catalogId } = this.props;
        let params = {id: catalogId, catalog: catalog.value};
        // console.log(params);
        this.setState({isTooltipActive: false});
        this.props.setNewCatalogName(params).then((value) => {
            if(value){
                this.props.getCatalogName();
            }
        });
    }

    changeCatalogName = (e)=> {
        e.preventDefault();
        const catalogName = e.target.value;
        const { fields: { catalog } } = this.props;
        // console.log('catalogName-->',catalogName);
        catalog.onChange(catalogName);
    }

    showTooltip = _=> {
        // console.log('showTooltip');
        this.setState({isTooltipActive: true})
    }
    hideTooltip = _=>{
        // console.log('hideTooltip');
        this.setState({isTooltipActive: false});
    }

    onClickGrid(pageNumber) {
      // console.log('onClickGrid==>',pageNumber);
      const token = sessionStorage.token;
      if(token){
          this.context.router.push(`/productreletedetail/${pageNumber}`);
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
                    sort: this.props.catalogSortingBy,
                    order: this.props.catalogSortDirection
                };
            this.props.setCatalogCurrentPage(getPage);

            this.props.getCatalogItems(parasm).then((value) => {
                console.log(value);
            });
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
                    sort: this.props.catalogSortingBy,
                    order: this.props.catalogSortDirection
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
        this.props.deleteCatalogItems(params).then( () =>{
            // console.log('Deleted!');
            let parasm = {
                            id: catalogId,
                            page: this.props.currentPage,
                            size: 16,
                            sort: this.props.catalogSortingBy,
                            order: this.props.catalogSortDirection
                        };
            this.props.getCatalogItems(parasm);

        });
        // console.log('catalog-->',catalog);

    }

    handleSubmitDeleteCatalog = (e)=>{
        e.preventDefault();
        const { catalogId } = this.props;
        // console.log('Deleted!-->',catalogId);
        let params = {id: catalogId}
        this.setState({isOpenDeleteCatalog: false});
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
                                            sort: this.props.catalogSortingBy,
                                            order: this.props.catalogSortDirection
                                        };
                            this.props.getCatalogItems(parasm);
                        }
                    }
                });
            }
        });
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
      return(<Modalalertmsg isOpen={this.state.isOpenAddMyCatalogmsg} isClose={this.handleClosemsg}
          props={this.props} message={message}/>);
    }

    render() {
            const {  fields:{ catalog }, catalogId, catalogName } = this.props;
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
            // console.log('catalogName-->',catalogName);
            // console.log('listCatalogName-->',this.props.listCatalogName);

            let items = this.props.listCatalogItems.items != undefined ? this.props.listCatalogItems.items : [];
            if(items.length != 0){
                return(
                    <form role="form">
                      {/* Header Search */}
                      <div className="col-sm-12 col-xs-12 bg-hearder-mycatalog">
                          <div className="cat-title"><h1 className="text-center">MY CATALOG</h1></div>
                          <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="col-lg-6 col-md-5 col-sm-12 col-xs-12 nopadding">
                                    <div className="col-lg-6 col-md-7 col-sm-6 col-xs-12 nopadding">
                                      <div className="col-lg-4 col-md-5 col-sm-4 col-xs-12 nopadding margin-t5">Catalog Name</div>
                                      <div className="col-lg-8 col-md-7 col-sm-8 col-xs-12 m-nopadding">
                                          <div className="styled-select-black">
                                            <select onChange={this.selectedCatalog}  ref="catalog">
                                              {
                                                  this.props.listCatalogName.map((cat) => {
                                                      return (<option key={cat._id} value={cat._id}>{cat.catalog}</option>);
                                                  })
                                              }
                                            </select>
                                          </div>
                                      </div>
                                    </div>

                                    <div className="col-lg-6 col-md-5 col-sm-6 col-xs-12 nopadding"  >

                                        <a><div className="icon-edit" id="edit" onMouseEnter={this.showTooltip}
                                            onMouseLeave={this.hideTooltip}></div></a>
                                        <ToolTip active={this.state.isTooltipActive} position="bottom"
                                            arrow="center" parent="#edit" >
                                            <div className="cat-tooltip form-inline">
                                              <p>Edit Catalog Name</p>
                                              <div className="form-group">
                                                <input type="text" className="form-control" placeholder={catalogName}
                                                onChange={this.changeCatalogName} ref="catalogName"/>
                                              </div>
                                                <button type="button" className="btn btn-default"
                                                    onClick={this.saveCatalogName}>
                                                    save
                                                </button>
                                            </div>
                                        </ToolTip>
                                        <a><div className="icon-del" onClick={this.deleteCatalog}></div></a>
                                        <a><div className="icon-print" ></div></a>
                                    </div>
                                  </div>
                                <div className="col-lg-6 col-md-7 col-sm-12 col-xs-12 nopadding">
                                  <div className="cat-sort col-xs-12 margin-t5">
                                    <ControlLabel>Sort By : </ControlLabel>
                                  </div>
                                  <div className="col-md-3 col-sm-3 col-xs-12 nopadding m-bottom-5">
                                    <div className="styled-select-black">
                                      <select onChange={this.changeSortingBy} ref="sortingBy">
                                        <option key={'reference'} value={2}>{'Item Reference'}</option>
                                        <option key={'description'} value={3}>{'Description'}</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-md-2 col-sm-3 col-xs-12 nopadding margin-l10 m-margin-xs m-bottom-5">
                                    <div className="styled-select-black">
                                        <select onChange={this.changeSortingDirection} ref="sortingDirection">
                                          <option key={'desc'} value={-1}>{'Descending'}</option>
                                          <option key={'asc'} value={1}>{'Ascending'}</option>
                                        </select>
                                    </div>
                                  </div>
                                  <div className="col-md-5 col-sm-4 pagenavi nopadding pull-right">
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
                                    <span className="margin-l5 text-del">Delete All</span>
                                </div>
                          </div>
                            <div className="panel panel-default">
                                <div className="panel-body padding-ft0">
                                    <div className={'search-product' }>
                                          <GridItemsView  items={items} onClickGrid={this.onClickGrid}
                                          onCheckedOneItemMyCatalog={this.checkedOneItemMyCatalog}
                                          onDeleteOneItemMyCatalog={this.deleteOneItemMyCatalog} />
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                      {this.renderModalConfirmDelete()}
                      {this.renderModalConfirmDeleteCatalog()}
                      {this.renderModalConfirmDeleteAllItem()}
                      {this.renderAlertmsg()}
                    </form>
                );
            }else{
                return(
                    <div>
                      <center>
                        <br/><br/><br/><br/><br/><br/>
                          <Loading type="spin" color="#202020" width="10%"/>
                      </center>
                      <br/><br/><br/><br/><br/><br/>
                    </div>
                );
            }

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
