import React, { Component, PropTypes } from 'react';
import { DataTable } from '../../utils/DataTabelSearch/index';
import ReactImageFallback from 'react-image-fallback';
import numberFormat2digit from '../../utils/convertNumberformatwithcomma2digit';
import numberFormat from '../../utils/convertNumberformat';
import ListItemsViewASSet from './listitemview_view_as_set';
import compareBy from '../../utils/compare';
import { ColumnsNomal, ColumnsViewAsSet } from '../../containers/searchresults/utils/columns'
import filterArray from '../../utils/filterArray'
import convertDate from '../../utils/convertDate'

class ListItemsView extends Component {
    constructor(props) {
        super(props);

        this.renderImage = this.renderImage.bind(this);
        this.renderCheckItem = this.renderCheckItem.bind(this);
        this.renderAction = this.renderAction.bind(this);
        this.onClickGrid = this.onClickGrid.bind(this);
        this.onClickListSet = this.onClickListSet.bind(this);

        this.state = {
            initialPageLength:16
        };
    }

    static propTypes = {
        onClickGrid: PropTypes.func.isRequired
    };

    componentWillReceiveProps = (nextProps) => {
        this.setState({ initialPageLength: this.props.pageSize });
    }

    renderAction = (val,row) => {
        const { ViewAsSet } = this.props;
        if (ViewAsSet) {
            return(
                <div className="searchresult-list-icon">
                    <div className="hidden">
                        <button type="button"> <img src="/images/icon-add.png" width="30"/></button>
                        <br/>
                    </div>
                    <button type="button" name={row.reference} id={row.reference} onClick={this.onClickGrid}><img src="/images/icon-search-30.png" width="30" /></button>
                </div>
            );
        }else{
            return(
                <div className="searchresult-list-icon">
                    <div className="hidden">
                        <button type="button"> <img src="/images/icon-add.png" width="30"/></button>
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
        const isSpecialDisc = row.specialDiscount != undefined ? row.specialDiscount == 1?true:false : false;
        return (
            <div className="list-tagbar-special">
                <span className={`${(isSpecialDisc)?'tagbar-special':''}`}></span>
                <ReactImageFallback src={row.imageThumbnail} fallbackImage="/images/blank.gif" initialImage="/images/blank.gif" width="60" />
            </div>
        );
    }

    renderCheckItem = (val, row) => {
        const { onCheckedOneItemMyCatalog, ViewAsSet, listMyCatalog, items } = this.props;
        let checkItem = false;
        if (!!listMyCatalog) {
            checkItem = listMyCatalog.find((myItem) => {
                if (ViewAsSet) {
                    return myItem.reference == row.reference
                }else{
                    return myItem.id == row.id
                }
            });
        }
        checkItem = !checkItem ? false : true;  //if undefined checked false else true
        return(
            <div className="checkbox checkbox-warning">
                <input type="checkbox" className="styled" type="checkbox"
                    name={ViewAsSet ? row.reference : row.id} checked={checkItem}
                    id={ViewAsSet ? row.reference : row.id}
                    value={ViewAsSet ? row.reference : row.id}
                    onChange={onCheckedOneItemMyCatalog}
                />
                <label className="checkbox1"></label>
            </div>
        );
    }

    render = _ => {
        let items = null;
        const { onCheckedOneItemMyCatalog, ViewAsSet, listMyCatalog, titleColumn } = this.props;
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
                let itemCreatedDate = ''
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
                    col.categoryName = col.hierarchy != undefined ? col.hierarchy.split('\\').slice(-1).pop():''

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

                    if(col.actualCost != undefined){
                        col.actualCostUSD = (col.actualCost[currency] != undefined) ?
                            numberFormat(col.actualCost[currency]) :
                            '- ';
                    }else{
                        col.actualCostUSD = '- ';
                    }

                    if(col.updatedCost != undefined){
                        col.updatedCostUSD = (col.updatedCost[currency] != undefined) ?
                            numberFormat(col.updatedCost[currency]) :
                            '- ';
                    }else{
                        col.updatedCostUSD = '- ';
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
                    col.stoneDetail = (col.stoneDetail != ''? col.stoneDetail: '-')
                    col.categoryName = (col.hierarchy != undefined) ? col.hierarchy.split('\\').pop() : ''
                    col.category = (col.type == 'ACC' || col.type == 'OBA' || col.type == 'SPP') ? col.subTypeName : ''
                    col.article = (col.type == 'JLY' || col.type == 'WAT' || col.type == 'STO') ? col.subTypeName : ''
                    let stoneQty = 0;
                    if(col.gemstones != undefined){
                        col.gemstones.forEach(function(gemstone) {
                            if(gemstone.quantity != undefined){
                                stoneQty = stoneQty + gemstone.quantity;
                            }
                        });
                    }
                    col.stoneQty = (stoneQty != 0) ? stoneQty : 0
                    col.limitedEdition = (col.limitedEdition != undefined) ? (col.limitedEdition) ? 'Yes' : 'No' : 'No'
                    col.limitedEditionNumber = (col.limitedEditionNumber != undefined) ? col.limitedEditionNumber : ''
                    itemCreatedDate = (col.itemCreatedDate != undefined) ? convertDate(col.itemCreatedDate) : ''
                    itemName = (col.type != 'CER')
                    ? (col.description != undefined) ? col.description: '-'
                    : col.name;
                }
                return {...col,imageOriginal: imagesOriginal,imageThumbnail: imagesThumbnail,size: size,
                    itemName: itemName, grossWeight:numberFormat2digit(col.grossWeight), itemCreatedDate}
            });

            let tableColumns = [];
            let titleValue = [];

            if (ViewAsSet) {
                if (titleColumn.length != 0) {
                    const getTitle = filterArray(ColumnsViewAsSet,titleColumn,'value')
                    getTitle.map((title) => {
                        tableColumns = [...tableColumns, title.label]
                        titleValue = [...titleValue, title.value]
                    })
                }else{
                    ColumnsViewAsSet.map((title) => {
                        tableColumns = [...tableColumns, title.label]
                        titleValue = [...titleValue, title.value]
                    })
                }

            }else{
                if (titleColumn.length != 0) {
                    (async _ =>{
                        tableColumns = [
                            { title: '', render: this.renderCheckItem, className: 'text-center' },
                            { title: 'Images', render: this.renderImage },
                            { title: 'Item Reference', prop: 'reference' }
                        ];
                        const getTitle = filterArray(ColumnsNomal,titleColumn,'value')
                        await getTitle.map((title) => {
                            tableColumns = [...tableColumns, { title: title.label, prop: title.value }]
                        });
                    })()
                    tableColumns = [...tableColumns, { title: '', render: this.renderAction, className: 'text-center' }]
                }else{
                    if (isCompany) {
                        tableColumns = [
                            { title: '', render: this.renderCheckItem, className: 'text-center' },
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
                            { title: '', render: this.renderAction, className: 'text-center' },
                        ];
                    }else{
                        tableColumns = [
                            { title: '', render: this.renderCheckItem, className: 'text-center' },
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
                            { title: '', render: this.renderAction, className: 'text-center' },
                        ];
                    }
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
                                    {tableColumns.map((title)=>{
                                        return(
                                            <th><span>{title}</span></th>
                                        )
                                    })}
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
                                    <ListItemsViewASSet key={item.reference} id={item.reference} item={item} ViewAsSet={ViewAsSet}
                                        onCheckedOneItemMyCatalog={onCheckedOneItemMyCatalog} tableColumns={titleValue}
                                        listMyCatalog={listMyCatalog} onClickList={this.onClickListSet}/>
                                );
                            })}
                        </table>
                    </div>
                );
            }else{
                const keys = ['', 'image','reference',...titleColumn]
                return (
                    <div>
                        <DataTable className="col-sm-12" keys={[...keys ]} columns={tableColumns} initialData={items}
                            initialPageLength={this.state.initialPageLength} initialSortBy={{ prop: 'reference', order: 'ascending' }}
                            pageLengthOptions={[ 5, 20, 50 ]}
                        />
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

module.exports = ListItemsView
