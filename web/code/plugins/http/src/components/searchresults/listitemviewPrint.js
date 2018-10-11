import React, { Component, PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import { responsive } from 'react-bootstrap';
import GetPriceWithCurrency from '../../utils/getPriceWithCurrency';
import { DataTable } from '../../utils/DataTabelSearch/index';
import ReactImageFallback from 'react-image-fallback';
import numberFormat2digit from '../../utils/convertNumberformatwithcomma2digit';
import numberFormat from '../../utils/convertNumberformat';
import ListItemsViewASSetPrint from './listitemview_view_as_set_print';
import compareBy from '../../utils/compare';

class ListItemsViewPrint extends Component {
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

    componentWillReceiveProps = (nextProps) => {
        this.setState({initialPageLength: this.props.pageSize});
    }

    renderAction = (val,row) => {
        const { ViewAsSet } = this.props;
        if (ViewAsSet) {
            return(
                <div className="searchresult-list-icon">
                    <div className="hidden">
                        <button type="button">
                            <img src="/images/icon-add.png" width="30"/>
                        </button>
                        <br/>
                    </div>
                    <button type="button" name={row.reference} id={row.reference} onClick={this.onClickGrid}>
                        <img src="/images/icon-search-30.png" width="30" />
                    </button>
                </div>
            );
        }else{
            return(
                <div className="searchresult-list-icon">
                    <div className="hidden">
                        <button type="button">
                            <img src="/images/icon-add.png" width="30"/>
                        </button>
                        <br/>
                    </div>
                    <button type="button" name={row.id} id={row.id} onClick={this.onClickGrid}>
                        <img src="/images/icon-search-30.png" width="30" />
                    </button>
                </div>
            );
        }
    }

    onClickGrid = (event) => {
        event.preventDefault();
        this.props.onClickGrid(event.currentTarget.id);
    }

    renderImage = (val,row) => {
        const isSpecialDisc = row.specialDiscount != undefined ? row.specialDiscount == 1?true:false : false;
        return (
            <div className="list-tagbar-special">
                <span className={`${(isSpecialDisc)?'tagbar-special':''}`}></span>
                <ReactImageFallback src={row.imageThumbnail} fallbackImage="/images/blank.gif" initialImage="/images/blank.gif" width="60" />
            </div>
        );
    }

    renderCheckItem = (val, row) => {
        return(
            <div>
                <input type="checkbox" />
            </div>
        );
    }

    render = _ => {
        let items = null;
        const { ViewAsSet } = this.props;
        const userLogin = JSON.parse(sessionStorage.logindata);
        const currency = userLogin.currency;

        if (this.props.items.length != 0){
            let isCompany = true;
            items = this.props.items.map(function (col, idx) {
                let imagesOriginal = '';
                let imagesThumbnail = '';
                let size = '';
                let jewelsWeight = 0;
                let itemName = '';
                isCompany = col.companyName != undefined ? true : false;
                if (ViewAsSet) {
                    let imagesGallery = [];
                    let imagesOrder = [];

                    if (col.image.length > 1) {
                        // First checked defaultImage = 1
                        imagesGallery = col.image.find((im) => {
                            return im.defaultSetImage == 1;
                        })
                        if (!!imagesGallery) {
                            // If has defaultImage = 1
                            imagesOriginal = (imagesGallery) != undefined
                                ? imagesGallery.original : '/images/blank.gif';
                            imagesThumbnail = (imagesGallery) != undefined
                                ? imagesGallery.thumbnail : '/images/blank.gif';
                        }else{
                            // checked lastModifiedDateImage by using lastModifiedDateImage
                            imagesOrder = col.image.sort(compareBy('lastModifiedDateSetImage','desc',null));
                            imagesOriginal = (imagesOrder.length) != 0 ? imagesOrder[0].original : '/images/blank.gif';
                            imagesThumbnail = (imagesOrder.length) != 0 ? imagesOrder[0].thumbnail : '/images/blank.gif';
                        }
                    }else{
                        imagesOriginal = (col.image) != undefined
                            ? (col.image.length) != 0 ? col.image[0].original : '/images/blank.gif'
                            : '/images/blank.gif';
                        imagesThumbnail = (col.image) != undefined
                            ? (col.image.length) != 0 ? col.image[0].thumbnail : '/images/blank.gif'
                            : '/images/blank.gif';
                    }

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
                    col.stoneDetail = (col.stoneDetail != ''? col.stoneDetail: '-');

                }else{
                    let imagesGallery = [];
                    let imagesOrder = [];

                    if (col.gallery.length > 1) {
                        // First checked defaultImage = 1
                        imagesGallery = col.gallery.find((gallery) => {
                            return gallery.defaultImage == 1;
                        })
                        if (!!imagesGallery) {
                            // If has defaultImage = 1
                            imagesOriginal = (imagesGallery) != undefined
                                ? imagesGallery.original : '/images/blank.gif';
                            imagesThumbnail = (imagesGallery) != undefined
                                ? imagesGallery.thumbnail : '/images/blank.gif';
                        }else{
                            // checked lastModifiedDateImage by using lastModifiedDateImage
                            imagesOrder = col.gallery.sort(compareBy('lastModifiedDateImage','desc',null));
                            imagesOriginal = (imagesOrder.length) != 0 ? imagesOrder[0].original : '/images/blank.gif';
                            imagesThumbnail = (imagesOrder.length) != 0 ? imagesOrder[0].thumbnail : '/images/blank.gif';
                        }
                    }else{
                        imagesOriginal = (col.gallery) != undefined
                            ? (col.gallery.length) != 0 ? col.gallery[0].original : '/images/blank.gif'
                            : '/images/blank.gif';
                        imagesThumbnail = (col.gallery) != undefined
                            ? (col.gallery.length) != 0 ? col.gallery[0].thumbnail : '/images/blank.gif'
                            : '/images/blank.gif';
                    }

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
                    col.stoneDetail = (col.stoneDetail != ''? col.stoneDetail: '-');

                    itemName = (col.type != 'CER')
                                      ?
                                      (col.description != undefined) ? col.description: '-' :
                                      col.name
                                      ;

                }
                return {...col,imageOriginal: imagesOriginal,imageThumbnail: imagesThumbnail,size: size,
                    itemName: itemName,grossWeight:numberFormat2digit(col.grossWeight)}
            });

            let tableColumns = [];
            if (isCompany) {
                tableColumns = [
                    { title: 'Images', render: this.renderImage },
                    { title: 'Item Reference', prop: 'reference' },
                    { title: 'Description', prop: 'itemName' },
                    { title: 'SKU', prop: 'sku' },
                    { title: 'Company', prop: 'companyName' },
                    { title: 'Location', prop: 'warehouseName' },
                    { title: 'Size', prop: 'size' },
                    { title: 'Jewelry Weight', prop: 'jewelsWeight' },
                    { title: 'Item Weight (Grams)', prop: 'grossWeight' },
                    { title: 'Stone Detail', prop: 'stoneDetail' },
                    { title: 'Price', prop: 'priceUSD' },
                ];
            }else{
                tableColumns = [
                    { title: 'Images', render: this.renderImage },
                    { title: 'Item Reference', prop: 'reference' },
                    { title: 'Description', prop: 'itemName' },
                    { title: 'SKU', prop: 'sku' },
                    { title: 'Company', prop: 'company' },
                    { title: 'Location', prop: 'warehouse' },
                    { title: 'Size', prop: 'size' },
                    { title: 'Jewelry Weight', prop: 'jewelsWeight' },
                    { title: 'Item Weight (Grams)', prop: 'grossWeight' },
                    { title: 'Stone Detail', prop: 'stoneDetail' },
                    { title: 'Price', prop: 'priceUSD' },
                ];
            }
            if (ViewAsSet) {
                return (
                    <div key={'listViewPrint'} id={'listViewPrint'}>
                        <table key={'listViewPrint'} id={'listViewPrint'} className="table table-bordered table-searchresult">
                            <thead key={'listViewPrint'} id={'listViewPrint'}>
                                <tr>
                                    <th><span>Images</span></th>
                                    <th><span>Set Product Number</span></th>
                                    <th><span>Item Reference</span></th>
                                    <th><span>Description</span></th>
                                    <th><span>SKU</span></th>
                                    <th><span>Category Name</span></th>
                                    <th><span>Company</span></th>
                                    <th><span>Location</span></th>
                                    <th><span>Item Weight (Grams)</span></th>
                                    <th><span>Stone Detail</span></th>
                                    <th className={`${(userLogin.permission.price == 'All') ?
                                        '' : 'hidden'}`}><span>Group Cost Price (USD)</span></th>
                                    <th className={`${(userLogin.permission.price == 'Updated'
                                        || userLogin.permission.price == 'All') ?
                                        '' : 'hidden'}`}><span>Updated Cost Price (USD)</span></th>
                                    <th className={`${(userLogin.permission.price == 'Public'
                                        || userLogin.permission.price == 'Updated'
                                        || userLogin.permission.price == 'All') ?
                                        '' : 'hidden'}`}><span>Selling Cost Price (USD)</span></th>
                                </tr>
                            </thead>
                            {items.map((item) => {
                                return(
                                    <ListItemsViewASSetPrint key={item.reference} id={item.reference} item={item} ViewAsSet={ViewAsSet}/>
                                );
                            })}
                        </table>
                    </div>
                );
            }else{
                return (
                    <div>
                        <DataTable className="col-sm-12"
                            keys={['image','reference', 'description', 'sku', 'companyName', 'warehouseName', 'size', '', 'grossWeight', 'stoneDetail','priceUSD' ]}
                            columns={tableColumns} initialData={items} initialPageLength={this.state.initialPageLength}
                            initialSortBy={{ prop: 'reference', order: 'ascending' }} pageLengthOptions={[ 5, 20, 50 ]} />
                    </div>
                );
            }
        }else{
            items = {...this.props.items};
            return (
                <div>
                    Loading...
                </div>
            );
        }
    }
}

module.exports = ListItemsViewPrint
