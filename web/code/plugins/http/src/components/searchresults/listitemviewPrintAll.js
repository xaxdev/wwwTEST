import React, { Component, PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import { responsive } from 'react-bootstrap';
import GetPriceWithCurrency from '../../utils/getPriceWithCurrency';
import { DataTable } from '../../utils/DataTabelSearch/index';
import ReactImageFallback from 'react-image-fallback';
import numberFormat2digit from '../../utils/convertNumberformatwithcomma2digit';
import numberFormat from '../../utils/convertNumberformat';

class ListItemsView extends Component {
  constructor(props) {
    super(props);

    this.renderImage = this.renderImage.bind(this);
    this.renderCheckItem = this.renderCheckItem.bind(this);
    this.renderAction = this.renderAction.bind(this);
    this.onClickGrid = this.onClickGrid.bind(this);

    this.state = {
      initialPageLength:16
    };

  }
  static propTypes = {
    onClickGrid: PropTypes.func.isRequired
  };
  componentWillReceiveProps(nextProps) {
    // console.log('list view pageSize componentWillReceiveProps-->',this.props.pageSize);
    this.setState({initialPageLength: this.props.pageSize});
  }
  renderAction(val,row){
      const { ViewAsSet } = this.props;
      if (ViewAsSet) {
          return(
            <div className="searchresult-list-icon">
            <div className="hidden">
              <button type="button"
                  onClick={
                    (eventKey) => {
                      // console.log('eventKey-->',item.id);
                    }
                  }
              > <img src="/images/icon-add.png" width="30"/></button>
              <br/>
            </div>
            <button type="button" name={row.reference} id={row.reference} onClick={this.onClickGrid}><img src="/images/icon-search-30.png" width="30" /></button>
            </div>
          );
      }else{
          return(
            <div className="searchresult-list-icon">
            <div className="hidden">
              <button type="button"
                  onClick={
                    (eventKey) => {
                      // console.log('eventKey-->',item.id);
                    }
                  }
              > <img src="/images/icon-add.png" width="30"/></button>
              <br/>
            </div>
            <button type="button" name={row.id} id={row.id} onClick={this.onClickGrid}><img src="/images/icon-search-30.png" width="30" /></button>
            </div>
          );
      }
  }
  onClickGrid(event) {
    // console.log('onClickGrid->',event.currentTarget.id);
    event.preventDefault();
    this.props.onClickGrid(event.currentTarget.id);
  }
  renderImage=
   (val,row) =>
   <ReactImageFallback
          src={row.imageThumbnail}
          fallbackImage="/images/blank.gif"
          initialImage="/images/blank.gif"
          width="60"
          />;

  renderCheckItem =
    (val, row) =>
      <div>
        <input type="checkbox" />
      </div>;

  render(){
    var items = null;
    const { ViewAsSet } = this.props;
    const userLogin = JSON.parse(sessionStorage.logindata);
    const currency = userLogin.currency;

    if (this.props.items.length != 0){
      items = this.props.items.map(function (col, idx) {
          let imagesOriginal = '';
          let imagesThumbnail = '';
          let size = '';
          let jewelsWeight = 0;
          let itemName = '';
          if (ViewAsSet) {
              imagesOriginal = (col.image) != undefined
                                ? col.image.length != 0
                                    ? col.image[0].original
                                    : '/images/blank.gif'
                                : '/images/blank.gif';
              imagesThumbnail = (col.image) != undefined
                                ?  col.image.length != 0
                                    ? col.image[0].thumbnail
                                    : '/images/blank.gif'
                                : '/images/blank.gif';

              if(col.totalPrice != undefined){
                  col.priceUSD = (col.totalPrice['USD'] != undefined)
                                ? numberFormat(col.totalPrice['USD'])
                                : '- ';
              }else{
                  col.priceUSD = '- ';
              }

              col.jewelsWeight = numberFormat2digit(jewelsWeight);

              itemName = (col.description != undefined) ? col.description: '-';
              col.grossWeight = 0;

          }else{
              // console.log('col-->',col);
              imagesOriginal = (col.gallery) != undefined
                                ? (col.gallery.length) != 0 ? col.gallery[0].original : '/images/blank.gif'
                                 : '/images/blank.gif';
              imagesThumbnail = (col.gallery) != undefined
                                ? (col.gallery.length) != 0 ? col.gallery[0].thumbnail : '/images/blank.gif'
                                : '/images/blank.gif';

              switch (col.type) {
                case 'JLY':
                  size = (col.size != undefined) ? col.size : '';
                  break;
                case 'WAT':
                  size = (col.caseDimension != undefined) ? col.caseDimension : '';
                  break;
                case 'OBA':
                  size = (col.dimension != undefined) ? col.dimension : '';
                  break;
                default:
                  break;
              }

              if(col.price != undefined){
                col.priceUSD = (col.price[currency] != undefined) ?
                       numberFormat(col.price[currency]) :
                       '- ';
              }else{
                col.priceUSD = '- ';
              }

              if (col.gemstones != undefined) {
                col.gemstones.forEach(function(gemstone) {
                  if(gemstone.carat != undefined){
                    jewelsWeight = jewelsWeight + gemstone.carat;
                  }
                });
              } else {
                jewelsWeight = '';
              }

              col.jewelsWeight = numberFormat2digit(jewelsWeight);
              // col.jewelsWeight = jewelsWeight;

              itemName = (col.type != 'CER')
                                ?
                                (col.description != undefined) ? col.description: '-' :
                                col.name
                                ;

          }
          return {...col,imageOriginal: imagesOriginal,imageThumbnail: imagesThumbnail,size: size,
              itemName: itemName,grossWeight:numberFormat2digit(col.grossWeight)}
      });

      const tableColumns = [
        { title: 'Images', render: this.renderImage },
        { title: 'Item Reference', prop: 'reference' },
        { title: 'Description', prop: 'itemName' },
        { title: 'SKU', prop: 'sku' },
        { title: 'Company', prop: 'companyName' },
        { title: 'Warehouse', prop: 'warehouseName' },
        { title: 'Size', prop: 'size' },
        { title: 'Jewelry Weight', prop: 'jewelsWeight' },
        { title: 'Gross Weight', prop: 'grossWeight' },
        { title: 'Public Price', prop: 'priceUSD' },
      ];

      return (
        <div>
          <DataTable
            className="col-sm-12"
            keys={['image','reference', 'description', 'sku', 'companyName', 'warehouseName', 'size', '', 'grossWeight','priceUSD' ]}
            columns={tableColumns}
            initialData={items}
            initialPageLength={this.state.initialPageLength}
            initialSortBy={{ prop: 'reference', order: 'ascending' }}
            pageLengthOptions={[ 5, 20, 50 ]}
          />
        </div>
      );

    }else{
      items = {...this.props.items};
      // console.log('items-->',items);

      return (
        <div>
          Loading...
        </div>
      );
    }
  }
}

module.exports = ListItemsView
