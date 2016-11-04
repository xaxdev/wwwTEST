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

const Loading = require('react-loading');

let listMyCatalog = []

class MyCatalog extends Component {
    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
        this.handleGo = this.handleGo.bind(this);
        this.onClickGrid = this.onClickGrid.bind(this);
        this.selectedCatalog = this.selectedCatalog.bind(this);
        this.deleteOneItemMyCatalog = this.deleteOneItemMyCatalog.bind(this);
        this.handleSubmitDeleteItem = this.handleSubmitDeleteItem.bind(this);
        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);

        this.state = {
          activePage: this.props.currentPage,
          isOpenDeleteItem: false,
          isOpenAddMyCatalogmsg: false,
          isTooltipActive: false
        }

    }

    componentWillMount = _=>{
        this.props.getCatalogName().then((value) => {
            if (value) {
                // console.log('componentWillMount-->',this.props.listCatalogName);
                if(this.props.listCatalogName.length != 0){
                    let parasm = {id: this.props.listCatalogName[0]._id, page:1, size:16};
                    this.props.getCatalogItems(parasm);
                }
            }
        });
    }

    componentDidMount = _=>{
        if(this.props.listCatalogName.length != 0){
            let parasm = {id: this.props.listCatalogName[0]._id, page:1, size:16};
            this.props.getCatalogItems(parasm);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
      // console.log('nextProps.currentPage-->',nextProps.currentPage);
      // console.log('nextState-->',nextState);
      return shallowCompare(this, nextProps, nextState);
    }

    showTooltip = _=> {
        console.log('showTooltip');
        this.setState({isTooltipActive: true})
    }
    hideTooltip = _=>{
        console.log('hideTooltip');
        this.setState({isTooltipActive: false})
    }

    onClickGrid(pageNumber) {
      // console.log('onClickGrid==>',pageNumber);
      const token = sessionStorage.token;
      if(token){
          this.context.router.push(`/productdetail/${pageNumber}`);
      }
    }

    handleGo(e){
        e.preventDefault();
        console.log('handleGo-->',this.refs.reletego.value);

        const getPage = parseInt((this.refs.reletego.value != ''?this.refs.reletego.value:this.state.activePage));

        const userLogin = JSON.parse(sessionStorage.logindata);
        const { catalogId, listCatalogItems } = this.props;

        if (Number(this.refs.reletego.value) > listCatalogItems.total_pages || Number(this.refs.reletego.value) < 1) {
            this.setState({isOpenAddMyCatalogmsg: true});
        //   this.renderAlertmsg('Page is invalid.');
        }else{
            let sortingBy = '';

            switch (this.refs.sortingBy.value) {
              case 'price':
                sortingBy = 'price.' + userLogin.currency;
                break;
              default:
                sortingBy = this.refs.sortingBy.value;
                break;
            }

            const sortingDirection = this.refs.sortingDirection.value;
            const pageSize = 16;

            this.setState({activePage: getPage});
            // console.log('getPage-->',getPage);
          //   let params = {
          //     'page' : getPage,
          //     'sortBy': sortingBy,
          //     'sortDirections': sortingDirection,
          //     'pageSize' : pageSize
          //   };


            this.setState({
              showLoading: true
            });

            let parasm = {id: catalogId, page: getPage, size: pageSize};
            this.props.getCatalogItems(parasm).then((value) => {
                console.log(value);
            });
        }
    }

    selectedCatalog = (e) =>{
        e.preventDefault();

        const catalogId = e.target.value;
        console.log('catalogId-->',catalogId);
        let parasm = {id: catalogId, page:1, size:16};
        this.props.getCatalogItems(parasm);
    }

    handleSelect(eventKey) {
        this.setState({activePage: eventKey});

        const userLogin = JSON.parse(sessionStorage.logindata);
        const { showGridView,showListView } = this.props;

        let sortingBy = '';

        switch (this.refs.sortingBy.value) {
          case 'price':
            sortingBy = 'price.' + userLogin.currency;
            break;
          default:
            sortingBy = this.refs.sortingBy.value;
            break;
        }

        const sortingDirection = this.refs.sortingDirection.value;
        const pageSize = 16;

        let params = {
          'page' : eventKey,
          'sortBy': sortingBy,
          'sortDirections': sortingDirection,
          'pageSize' : pageSize
        };
        const { filters } =  this.props;

        let gemstoneFilter = {};
        // console.log('filters-->',filters);
        filters.forEach(function(filter){
          let keys = Object.keys(filter);
          keys.forEach((key) => {
            const value = filter[key];
            const gemstoneFields = keys[0].split('.');
            if(gemstoneFields[0] == 'gemstones'){
              gemstoneFilter[gemstoneFields[1]] = value;
            }else if(gemstoneFields[0] == 'certificatedNumber'){
              gemstoneFilter[gemstoneFields[0]] = value;
            }else if(gemstoneFields[0] == 'certificateAgency'){
              gemstoneFilter[gemstoneFields[0]] = value;
            }else if(gemstoneFields[0] == 'cerDateFrom'){
              gemstoneFilter[gemstoneFields[0]] = value;
            }
            else{
              params[key] = value;
            }
          });
        });

        if(Object.keys(gemstoneFilter).length != 0){
          params['gemstones'] = gemstoneFilter;
        }

        let girdView = showGridView;
        let listView = showListView;

        this.props.setShowGridView(false);
        this.props.setShowListView(false);

        this.setState({
          showLoading: true
        });

        this.props.getItems(params)
        .then((value) => {
          this.setState({showLoading: false});
          if(girdView){
            // this.setState({showGridView: true});
            this.props.setShowGridView(true);
          }else if (listView) {
            // this.setState({showListView: true});
            this.props.setShowListView(true);
          }
        });

        let { currPage } = this.props.fields;
        currPage.onChange(eventKey);
    }

    deleteOneItemMyCatalog = (item) => {
        let fileName = jQuery('input[type="checkbox"]');
        fileName.removeAttr('checked');
        listMyCatalog  = [];

        const { items } = this.props.listCatalogItems;
        const catalogId = this.props.listCatalogItems._id
        let itemAdded = items.filter(oneItem => oneItem.id === item.target.attributes[3].value);
        itemAdded = itemAdded[0];
        let itemName = (itemAdded.type != 'CER')? itemAdded.description: itemAdded.name;
        let objItem = {id: itemAdded.id, reference: itemAdded.reference, description: itemName, catalogId: catalogId}

        listMyCatalog.push(objItem);

        this.setState({isOpenDeleteItem: true});
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
            console.log('Deleted!');
            let parasm = {id: catalogId, page:1, size:16};
            this.props.getCatalogItems(parasm);

        });
        // console.log('catalog-->',catalog);

    }

    handleCloseDeleteItem = _=>{
        this.setState({isOpenDeleteItem: false});
    }

    handleClosemsg = _=>{
        this.setState({isOpenAddMyCatalogmsg: false});
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
        return(<ModalConfirmDelete onSubmit={this.handleSubmitDeleteItem} isOpen={this.state.isOpenDeleteItem}
            isClose={this.handleCloseDeleteItem} props={this.props}/>);
    }

    renderTotals(){
      const { fields: { currPage },
              totalPages,
              currentPage,
              items,listCatalogItems,
              handleSubmit,
              resetForm,
              submitting } = this.props;

        let totalPublicPrice = 0;
        let totalUpdatedCost = 0;
        listCatalogItems.items.map((item) => {
            totalPublicPrice = totalPublicPrice + item.price;
            totalUpdatedCost = totalUpdatedCost + item.updatedCost;
        })
        // console.log('totalPublicPrice-->',totalPublicPrice);
        let _totalUpdatedCost =  (totalUpdatedCost!=null) ? numberFormat(totalUpdatedCost) : 0;
        let _totalPublicPrice =  (totalPublicPrice!=null) ? numberFormat(totalPublicPrice) : 0;

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
            const { fields:{ catalog }, catalogId } = this.props;
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
            console.log('listCatalogName-->',this.props.listCatalogName);
            console.log('listCatalogItems-->',this.props.listCatalogItems);

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
                                            <div>
                                                <p>Edit Catalog Name</p>
                                                <input type="text" className="form-control" {...catalog} />
                                                <img src="/images/blank.gif"/>
                                            </div>
                                        </ToolTip>
                                        <a><div className="icon-del" ></div></a>
                                        <a><div className="icon-print" ></div></a>
                                    </div>
                                  </div>
                                <div className="col-lg-6 col-md-7 col-sm-12 col-xs-12 nopadding">
                                  <div className="cat-sort col-xs-12 margin-t5">
                                    <ControlLabel>Sort By : </ControlLabel>
                                  </div>
                                  <div className="col-md-3 col-sm-3 col-xs-12 nopadding m-bottom-5">
                                    <div className="styled-select-black">
                                      <select ref="sortingBy">
                                        <option key={'itemCreatedDate'} value={'itemCreatedDate'}>{'Updated Date'}</option>
                                        <option key={'price'} value={'price'}>{'Public Price'}</option>
                                        <option key={'reference'} value={'reference'}>{'Item Reference'}</option>
                                        <option key={'description'} value={'description'}>{'Description'}</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-md-2 col-sm-3 col-xs-12 nopadding margin-l10 m-margin-xs m-bottom-5">
                                    <div className="styled-select-black">
                                        <select ref="sortingDirection">
                                          <option key={'desc'} value={'desc'}>{'Descending'}</option>
                                          <option key={'asc'} value={'asc'}>{'Ascending'}</option>
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
                                    <input type="checkbox" id="checkbox1" className="styled" type="checkbox" />
                                    <label className="checkbox1 select"></label>
                                    <span className="margin-l10 text-vertical">Select All</span>
                                </div>
                                <div>
                                  <span className="icon-det-28"></span><span className="margin-l5 text-del">Delete All</span>
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
        listCatalogName: state.searchResult.ListCatalogName,
        listCatalogItems: state.myCatalog.listCatalogItems,
        currentPage: state.myCatalog.currentPage,
        catalogId: state.myCatalog.catalogId
    }
}
MyCatalog.contextTypes = {
  router: PropTypes.object
};
module.exports = reduxForm({
  form: 'MyCatalog',
  fields: ['currPage','catalog'],
},mapStateToProps,itemactions)(MyCatalog)
