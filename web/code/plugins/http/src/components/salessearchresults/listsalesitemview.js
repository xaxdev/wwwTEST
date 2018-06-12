import React, { Component, PropTypes } from 'react';
import { DataTable } from '../../utils/DataTabelSearch/index';
import ReactImageFallback from 'react-image-fallback';
import numberFormat2digit from '../../utils/convertNumberformatwithcomma2digit';
import numberFormat from '../../utils/convertNumberformat';
import convertDate from '../../utils/convertDate';
import ListSalesItemsViewASSet from './listsalesitemview_view_as_set';
import GetSalesPricePermission from '../../utils/getSalesPricePermission';

class ListSalesItemsView extends Component {
    constructor(props) {
        super(props);

        this.renderImage = this.renderImage.bind(this);
        this.renderAction = this.renderAction.bind(this);
        this.onClickGrid = this.onClickGrid.bind(this);
        this.onClickListSet = this.onClickListSet.bind(this);

        this.state = {
            initialPageLength:16
        };
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ initialPageLength: this.props.salesPageSize });
    }

    renderAction = (val,row) => {
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

    onClickGrid = (event) => {
        event.preventDefault();
        this.props.onClickGrid(event.currentTarget.id);
    }

    onClickListSet = (id) => {
        this.props.onClickGrid(id);
    }

    renderImage = (val,row) => {
        return (
        <div className="list-tagbar-soldout">
            <span className="tagbar-soldout"></span>
            <ReactImageFallback
                src={row.imageThumbnail}
                fallbackImage="/images/blank.gif"
                initialImage="/images/blank.gif"
                width="60"/>
        </div>
        );
    }

    render = _ => {
        let items = null;
        const { onCheckedOneItemMyCatalog, ViewAsSet, listMyCatalog } = this.props;
        const userLogin = JSON.parse(sessionStorage.logindata);
        const currency = userLogin.currency;
        const priceSalesRTP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesRTP;
        const priceSalesUCP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesUCP;
        const priceSalesCTP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesCTP;
        const priceSalesNSP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesNSP;
        const priceSalesMGP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesMGP;
        const priceSalesDSP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesDSP;
        
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
                    imagesOriginal = (col.image) != undefined ? col.image.length != 0 ? col.image[0].original : '/images/blank.gif' : '/images/blank.gif';
                    imagesThumbnail = (col.image) != undefined ?  col.image.length != 0 ? col.image[0].thumbnail : '/images/blank.gif' : '/images/blank.gif';

                    if(col.totalPrice != undefined){
                        col.priceUSD = (col.totalPrice['USD'] != undefined) ? numberFormat(col.totalPrice['USD']) : '- ';
                    }else{
                        col.priceUSD = '- ';
                    }

                    col.jewelsWeight = numberFormat2digit(jewelsWeight);

                    itemName = (col.description != undefined) ? col.description: '-';
                    col.grossWeight = 0;
                    col.stoneDetail = (col.stoneDetail != ''? col.stoneDetail: '-');

                }else{
                    imagesOriginal = (col.gallery) != undefined? (col.gallery.length) != 0? col.gallery[0].original: '/images/blank.gif' : '/images/blank.gif';
                    imagesThumbnail = (col.gallery) != undefined? (col.gallery.length) != 0? col.gallery[0].thumbnail: '/images/blank.gif' : '/images/blank.gif';

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

                    if (priceSalesRTP) {
                        if(col.price != undefined){
                            col.priceUSD = (col.price[currency] != undefined) ? numberFormat(col.price[currency]) : '- ';
                        }else{
                            col.priceUSD = '- ';
                        }    
                    }

                    if (priceSalesNSP) {
                        if(col.netAmount != undefined){
                            col.netAmountUSD = (col.netAmount[currency] != undefined) ? numberFormat(col.netAmount[currency]) : '- ';
                        }else{
                            col.netAmountUSD = '- ';
                        }
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

                    itemName = (col.type != 'CER') ? (col.description != undefined) ? col.description: '-' : col.name ;
                }
                
                return {...col,imageOriginal: imagesOriginal,imageThumbnail: imagesThumbnail,size: size, itemName: itemName,
                    grossWeight:numberFormat2digit(col.grossWeight),invoiceDate: convertDate(col.invoiceDate)}
                
            });

            let tableColumns = [];
            let fieldKeys = [];
            if (isCompany) {
                if (!priceSalesNSP) {
                    tableColumns = [
                        { title: 'Images', render: this.renderImage },
                        { title: 'Item Reference', prop: 'reference' },
                        { title: 'Description', prop: 'itemName' },
                        { title: 'SKU', prop: 'sku' },
                        { title: 'Location', prop: 'warehouseName' },
                        { title: 'Customer Name', prop: 'customerName' },
                        { title: 'Invoice Date', prop: 'invoiceDate' },
                        { title: 'Item Weight (Grams)', prop: 'grossWeight' },
                        { title: 'Stone Detail', prop: 'stoneDetail' },
                        { title: 'Retail Price', prop: 'priceUSD' },
                        { title: '', render: this.renderAction, className: 'text-center' },
                    ]; 
                    fieldKeys = ['image','reference', 'itemName', 'sku', 'warehouseName', 'customerName', 'invoiceDate', 'grossWeight', 'stoneDetail',
                    'priceUSD','' ]   
                }else if (!priceSalesRTP) {
                    tableColumns = [
                        { title: 'Images', render: this.renderImage },
                        { title: 'Item Reference', prop: 'reference' },
                        { title: 'Description', prop: 'itemName' },
                        { title: 'SKU', prop: 'sku' },
                        { title: 'Location', prop: 'warehouseName' },
                        { title: 'Customer Name', prop: 'customerName' },
                        { title: 'Invoice Date', prop: 'invoiceDate' },
                        { title: 'Net Amount', prop: 'netAmountUSD' },
                        { title: 'Item Weight (Grams)', prop: 'grossWeight' },
                        { title: 'Stone Detail', prop: 'stoneDetail' },
                        { title: '', render: this.renderAction, className: 'text-center' },
                    ];
                    fieldKeys = ['image','reference', 'itemName', 'sku', 'warehouseName', 'customerName', 'invoiceDate','netAmountUSD', 'grossWeight',
                    'stoneDetail','' ]
                } else {
                    tableColumns = [
                        { title: 'Images', render: this.renderImage },
                        { title: 'Item Reference', prop: 'reference' },
                        { title: 'Description', prop: 'itemName' },
                        { title: 'SKU', prop: 'sku' },
                        { title: 'Location', prop: 'warehouseName' },
                        { title: 'Customer Name', prop: 'customerName' },
                        { title: 'Invoice Date', prop: 'invoiceDate' },
                        { title: 'Net Amount', prop: 'netAmountUSD' },
                        { title: 'Item Weight (Grams)', prop: 'grossWeight' },
                        { title: 'Stone Detail', prop: 'stoneDetail' },
                        { title: 'Retail Price', prop: 'priceUSD' },
                        { title: '', render: this.renderAction, className: 'text-center' },
                    ]; 
                    fieldKeys = ['image','reference', 'itemName', 'sku', 'warehouseName', 'customerName', 'invoiceDate','netAmountUSD', 'grossWeight',
                    'stoneDetail','priceUSD','' ]
                }
                
            }else{
                if (!priceSalesNSP) {
                    tableColumns = [
                        { title: 'Images', render: this.renderImage },
                        { title: 'Item Reference', prop: 'reference' },
                        { title: 'Description', prop: 'itemName' },
                        { title: 'SKU', prop: 'sku' },
                        { title: 'Location', prop: 'warehouseName' },
                        { title: 'Customer Name', prop: 'customerName' },
                        { title: 'Invoice Date', prop: 'invoiceDate' },
                        { title: 'Item Weight (Grams)', prop: 'grossWeight' },
                        { title: 'Stone Detail', prop: 'stoneDetail' },
                        { title: 'Retail Price', prop: 'priceUSD' },
                        { title: '', render: this.renderAction, className: 'text-center' },
                    ];
                    fieldKeys = ['image','reference', 'itemName', 'sku', 'warehouseName', 'customerName', 'invoiceDate', 'grossWeight', 'stoneDetail',
                    'priceUSD','' ]
                }else if (!priceSalesRTP) {
                    tableColumns = [
                        { title: 'Images', render: this.renderImage },
                        { title: 'Item Reference', prop: 'reference' },
                        { title: 'Description', prop: 'itemName' },
                        { title: 'SKU', prop: 'sku' },
                        { title: 'Location', prop: 'warehouseName' },
                        { title: 'Customer Name', prop: 'customerName' },
                        { title: 'Invoice Date', prop: 'invoiceDate' },
                        { title: 'Net Amount', prop: 'netAmountUSD' },
                        { title: 'Item Weight (Grams)', prop: 'grossWeight' },
                        { title: 'Stone Detail', prop: 'stoneDetail' },
                        { title: '', render: this.renderAction, className: 'text-center' },
                    ];
                    fieldKeys = ['image','reference', 'itemName', 'sku', 'warehouseName', 'customerName', 'invoiceDate','netAmountUSD', 'grossWeight',
                    'stoneDetail','' ]
                } else {
                    tableColumns = [
                        { title: 'Images', render: this.renderImage },
                        { title: 'Item Reference', prop: 'reference' },
                        { title: 'Description', prop: 'itemName' },
                        { title: 'SKU', prop: 'sku' },
                        { title: 'Location', prop: 'warehouseName' },
                        { title: 'Customer Name', prop: 'customerName' },
                        { title: 'Invoice Date', prop: 'invoiceDate' },
                        { title: 'Net Amount', prop: 'netAmountUSD' },
                        { title: 'Item Weight (Grams)', prop: 'grossWeight' },
                        { title: 'Stone Detail', prop: 'stoneDetail' },
                        { title: 'Retail Price', prop: 'priceUSD' },
                        { title: '', render: this.renderAction, className: 'text-center' },
                    ];

                    fieldKeys = ['image','reference', 'itemName', 'sku', 'warehouseName', 'customerName', 'invoiceDate','netAmountUSD', 'grossWeight',
                    'stoneDetail','priceUSD','' ]
                }
            }
            if (ViewAsSet) {
                return (
                    <div key={'listView'} id={'listView'}>
                        <table key={'listView'} id={'listView'} className="table table-bordered table-searchresult table-searchset">
                            <thead key={'listView'} id={'listView'}>
                                <tr>
                                    <th><span></span></th>
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
                                    <th className={`${(priceSalesCTP) ? '' : 'hidden'}`}><span>Group Cost Price (USD)</span></th>
                                    <th className={`${(priceSalesUCP) ? '' : 'hidden'}`}><span>Updated Cost Price (USD)</span></th>
                                    <th className={`${(priceSalesRTP) ? '' : 'hidden'}`}><span>Selling Cost Price (USD)</span></th>
                                </tr>
                            </thead>
                            {items.map((item) => {
                                return(
                                    <ListSalesItemsViewASSet key={item.reference} id={item.reference} item={item} ViewAsSet={ViewAsSet}
                                        onCheckedOneItemMyCatalog={onCheckedOneItemMyCatalog} listMyCatalog={listMyCatalog} onClickList={this.onClickListSet}/>
                                );
                            })}
                        </table>
                    </div>

                );
            }else{
                return (
                    <div>
                        <DataTable className="col-sm-12" keys={fieldKeys} columns={tableColumns} initialData={items} initialPageLength={this.state.initialPageLength}
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

module.exports = ListSalesItemsView
