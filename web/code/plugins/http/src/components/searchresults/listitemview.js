import React, { Component, PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import { responsive } from 'react-bootstrap';
import GetPriceWithCurrency from '../../utils/getPriceWithCurrency';
import { DataTable } from '../../utils/DataTabelSearch/index';

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
  renderAction(val,row){
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
  onClickGrid(event) {
    // console.log('onClickGrid->',event.currentTarget.id);
    event.preventDefault();
    this.props.onClickGrid(event.currentTarget.id);
  }
  renderImage=
   (val,row) =>
    <img src={row.imageThumbnail} width="60"></img>;

  renderCheckItem =
    (val, row) =>
      <div>
        <input type="checkbox" />
      </div>;

  render(){
    var items = null;
    if (this.props.items.length != 0){
      items = this.props.items.map(function (col, idx) {
        // console.log('col-->',col);
        let imagesOriginal = (col.gallery.length) != 0 ? col.gallery[0].original : '/images/blank.gif';
        let imagesThumbnail = (col.gallery.length) != 0 ? col.gallery[0].thumbnail : '/images/blank.gif';
        let size = '';

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
        return {...col,imageOriginal: imagesOriginal,imageThumbnail: imagesThumbnail,size: size}
      });

      items = items.map(function (col, idx) {
        // col.priceUSD = col.priceUSD.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        col.priceUSD = GetPriceWithCurrency(col,'price');
        return {...col}
      });

      const tableColumns = [
        // { title: '', render: this.renderCheckItem },
        { title: 'Images', render: this.renderImage },
        { title: 'Item Reference', prop: 'reference' },
        { title: 'Description', prop: 'description' },
        { title: 'SKU', prop: 'sku' },
        { title: 'Location', prop: 'siteName' },
        { title: 'Warehouse', prop: 'warehouseName' },
        { title: 'Size', prop: 'size' },
        { title: 'Jewelry Weight', prop: '' },
        { title: 'Gross Weight', prop: 'grossWeight' },
        { title: 'Public Price', prop: 'priceUSD' },
        { title: '', render: this.renderAction, className: 'text-center' },
      ];

      return (
        <div>
          <DataTable
            className="col-sm-12"
            // keys={['', 'image','reference', 'description', 'sku', 'siteName', 'warehouseName', 'size', '', 'grossWeight','priceUSD','' ]}
            keys={['image','reference', 'description', 'sku', 'siteName', 'warehouseName', 'size', '', 'grossWeight','priceUSD','' ]}
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
