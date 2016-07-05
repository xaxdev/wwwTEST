import React, { Component, PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import { responsive } from 'react-bootstrap';

import { DataTable } from '../../utils/DataTabelSearch/index';

class ListItemsView extends Component {
  constructor(props) {
    super(props);

    this.renderImage = this.renderImage.bind(this);
    this.renderCheckItem = this.renderCheckItem.bind(this);
    this.renderAction = this.renderAction.bind(this);
    this.onClickGrid = this.onClickGrid.bind(this);

    this.state = {
      initialPageLength:8
    };

  }
  static propTypes = {
    onClickGrid: PropTypes.func.isRequired
  };
  renderAction(val,row){
    return(
      <div className="searchresult-list-icon">
      <button type="button"
          onClick={
            (eventKey) => {
              // console.log('eventKey-->',item.id);
            }
          }
      ><img src="/images/icon-add.png" width="30" /></button>
      <br/>
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
        let imagesOriginal = (col.gallery.length) != 0 ? col.gallery[0].original : '/images/blank.gif';
        let imagesThumbnail = (col.gallery.length) != 0 ? col.gallery[0].thumbnail : '/images/blank.gif';
        return {...col,imageOriginal: imagesOriginal,imageThumbnail: imagesThumbnail}
      });

      items = items.map(function (col, idx) {
        col.priceUSD = col.priceUSD.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        return {...col}
      });

      const tableColumns = [
        { title: '', render: this.renderCheckItem },
        { title: 'Images', render: this.renderImage },
        { title: 'Item Reference', prop: 'reference' },
        { title: 'Description', prop: 'description' },
        { title: 'SKU', prop: 'sku' },
        { title: 'Location', prop: 'location' },
        { title: 'Warehouse', prop: 'site' },
        { title: 'Size', prop: 'size' },
        { title: 'Case Dimension', prop: '' },
        { title: 'OBA Dimension', prop: '' },
        { title: 'Jewelry Weight', prop: '' },
        { title: 'Gross Weight', prop: 'grossWeight' },
        { title: 'Public Price', prop: 'priceUSD' },
        { title: '', render: this.renderAction, className: 'text-center' },
      ];

      return (
        <div>
          <DataTable
            className="col-sm-12"
            keys={['', 'image','reference', 'description', 'sku', 'location', 'site', 'size', '', '', '', 'grossWeight','priceUSD','' ]}
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
