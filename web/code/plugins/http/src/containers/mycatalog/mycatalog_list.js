import React, { Component, PropTypes }from 'react';
import { reduxForm, reset } from 'redux-form';
import { Button,FormControl,Pagination, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';

import * as itemactions from '../../actions/itemactions';
import numberFormat from '../../utils/convertNumberformat';
import GridItemsView from '../../components/mycatalog/griditemview';

const Loading = require('react-loading');

class MyCatalog extends Component {
    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
        this.handleGo = this.handleGo.bind(this);
        this.onClickGrid = this.onClickGrid.bind(this);

        this.state = {
          activePage: this.props.currentPage
        }

    }

    componentWillMount() {
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

    componentDidMount() {
        if(this.props.listCatalogName.length != 0){
            let parasm = {id: this.props.listCatalogName[0]._id, page:1, size:16};
            this.props.getCatalogItems(parasm);
        }
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
      // console.log('handleGo-->',this.refs.reletego.value);
      const getPage = parseInt((this.refs.reletego.value != ''?this.refs.reletego.value:this.state.activePage));

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

      this.setState({activePage: getPage});
      // console.log('getPage-->',getPage);
      let params = {
        'page' : getPage,
        'sortBy': sortingBy,
        'sortDirections': sortingDirection,
        'pageSize' : pageSize
      };


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

    renderPagination(){
      const { fields: { currPage },
              currentPage,
              handleSubmit,
              resetForm,
              submitting } = this.props;
      // console.log('totalPages-->',totalPages);
      // console.log('this.state.activePage-->',this.state.activePage);
      const page = this.state.activePage;
      const totalPages = this.props.listCatalogItems.total_items;
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

    renderTotals(){
      const { fields: { currPage },
              totalPages,
              currentPage,
              items,totalPublicPrice,totalUpdatedCost,listCatalogItems,maxPrice,minPrice,avrgPrice,
              handleSubmit,
              resetForm,
              submitting } = this.props;
        // let _totalUpdatedCost = new Intl.NumberFormat().format(totalUpdatedCost);
      let _totalUpdatedCost =  (totalUpdatedCost!=null) ? numberFormat(totalUpdatedCost) : 0;
      let _totalPublicPrice =  (totalPublicPrice!=null) ? numberFormat(totalPublicPrice) : 0;

      const userLogin = JSON.parse(sessionStorage.logindata);

      return(
        <div>
          <div id="dvTotalsub" className="bg-f7d886 text-center">
              <span><span className="font-b fc-000">Total Items :</span> <span className="font-w9">{ numberFormat(listCatalogItems.length) } Items </span><span className="padding-lf15">|</span></span>
              <span className={`${(userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                  || userLogin.permission.price == 'All') ?
                  '' : 'hidden'}`}>
                  <span className="font-b fc-000">Total Public Price :</span> <span className="font-w9">{ _totalPublicPrice } { userLogin.currency }</span><span className="padding-lf15">
                  |
                  </span>
              </span>
              <span className={`${(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ?
                  '' : 'hidden'}`}>
                  <span className="font-b fc-000">Total Updated Cost :</span> <span className="font-w9">{ _totalUpdatedCost } { userLogin.currency }
                  </span>
              </span>
          </div>
          <div id="dvTotalsub" className="bg-f7d886 text-center">
              <span><span className="font-b fc-000">Highest Price :</span> <span className="font-w9">{ numberFormat(maxPrice) } { userLogin.currency } </span><span className="padding-lf15">|</span></span>
              <span><span className="font-b fc-000">Lowest Price :</span> <span className="font-w9">{ numberFormat(minPrice) } { userLogin.currency } </span><span className="padding-lf15">|</span></span>
              <span><span className="font-b fc-000">Average Price :</span> <span className="font-w9">{ numberFormat(avrgPrice) } { userLogin.currency } </span></span>
          </div>
        </div>

      );
    }

    render() {
            console.log('listCatalogName-->',this.props.listCatalogName);
            console.log('listCatalogItems-->',this.props.listCatalogItems);

            let items = this.props.listCatalogItems.items != undefined ? this.props.listCatalogItems.items : [];
            if(items.length != 0){
                return(
                    <form role="form">
                      {/* Header Search */}
                      <div className="col-sm-12 bg-hearder bg-header-searchresult">
                        <div className="col-md-12 col-sm-12 ft-white m-nopadding">
                          <h1>MY CATALOG</h1>
                        </div>
                      </div>
                      <div className="col-sm-12 bg-hearder-mycatalog bg-header-searchresult">
                          <div className="col-md-8 col-sm-12 nopadding">
                              <div className="m-width-100 text-right maring-t15 float-r ip-font m-pt">
                                <div className="col-sm-4 col-xs-12 nopadding">
                                    <div className="col-sm-2 col-xs-12 ft-white nopad-ipl">
                                      Catalog Name
                                    </div>
                                    <div className="col-sm-2 col-xs-12 ft-white nopad-ipl">
                                        <div className="styled-select">
                                          <select className="form-searchresult">
                                            {
                                                this.props.listCatalogName.map((cat) => {
                                                    return (<option key={cat._id} value={cat._id}>{cat.catalog}</option>);
                                                })
                                            }
                                          </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-2 col-xs-12 ft-white nopad-ipl">
                                        <a><div className="icon-excel margin-l10" ></div></a>
                                    </div>
                                    <div className="col-sm-2 col-xs-12 ft-white nopad-ipl">
                                        <a><div className="icon-excel margin-l10" ></div></a>
                                    </div>
                                    <div className="col-sm-2 col-xs-12 ft-white nopad-ipl">
                                        <a><div className="icon-excel margin-l10" ></div></a>
                                    </div>
                                </div>
                                <div className="col-sm-4 col-xs-12 ft-white margin-t5">
                                  <ControlLabel> <span className="fc-ddbe6a m-none">|</span> Sort By: </ControlLabel>
                                </div>
                                <div className="col-sm-2 col-xs-12 nopadding">
                                  <div className="styled-select">
                                    <select className="form-searchresult" ref="sortingBy">
                                      <option key={'itemCreatedDate'} value={'itemCreatedDate'}>{'Updated Date'}</option>
                                      <option key={'price'} value={'price'}>{'Public Price'}</option>
                                      <option key={'reference'} value={'reference'}>{'Item Reference'}</option>
                                      <option key={'description'} value={'description'}>{'Description'}</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-sm-2 col-xs-12 nopadding padding-l10 m-pt-select">
                                  <div className="styled-select">
                                      <select className="form-searchresult"  ref="sortingDirection">
                                        <option key={'desc'} value={'desc'}>{'Descending'}</option>
                                        <option key={'asc'} value={'asc'}>{'Ascending'}</option>
                                      </select>
                                  </div>
                                </div>
                                <div className="col-sm-12 pagenavi maring-t20">
                                    <div className="searchresult-navi pull-right margin-r20">
                                        {this.renderPagination()}
                                    </div>
                                </div>
                              </div>
                          </div>
                      </div>
                      <div id="dvTotal">
                        {this.renderTotals()}
                      </div>
                      <div className="col-sm-2 pagenavi maring-t20">
                            <div className="searchresult-navi pull-right margin-r20">
                                <input type="checkbox" id="checkbox1" className="styled" type="checkbox" />
                                <label className="checkbox1">Select All</label>
                                <button type="submit" className="btn btn-primary btn-radius">Delete All</button>
                            </div>
                      </div>
                      {/* End Header Search */}
                      {/* Util&Pagination */}
                      <div className="row">
                        <div className="col-sm-12">
                            <div className="panel panel-default">
                                <div className="panel-body padding-ft0">
                                    <div className={'search-product' }>
                                          <GridItemsView  items={items} onClickGrid={this.onClickGrid}
                                          onCheckedOneItemMyCatalog={this.checkedOneItemMyCatalog}
                                          onAddedOneItemMyCatalog={this.addedOneItemMyCatalog} />
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
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
        listCatalogName: state.searchResult.ListCatalogName,
        listCatalogItems: state.myCatalog.listCatalogItems,
        currentPage: state.myCatalog.currentPage,
    }
}
module.exports = reduxForm({
  form: 'MyCatalog',
  fields: ['currPage'],
},mapStateToProps,itemactions)(MyCatalog)
