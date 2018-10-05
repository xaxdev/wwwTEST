import React, { Component, PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import { responsive } from 'react-bootstrap';
import shallowCompare from 'react-addons-shallow-compare';
import numberFormat from '../../utils/convertNumberformat';
import convertDate from '../../utils/convertDate';
import ReactImageFallback from 'react-image-fallback';
import {ReactPageClick} from 'react-page-click';
import compareBy from '../../utils/compare';

function showDiv() {
    document.getElementById('searchresult-border').style.display = 'block';
}
// Used to cancel events.
let preventDefault = e => e.preventDefault();
let oldView = 0;

class GridItemsViewPrint extends Component {
    constructor(props) {
        super(props);

        this.renderShowDetails = this.renderShowDetails.bind(this);
        this.onClickGrid = this.onClickGrid.bind(this);

        this.state = {
            isOpen0: false, isOpen1: false, isOpen2: false, isOpen3: false, isOpen4: false, isOpen5: false
            , isOpen6: false, isOpen7: false, isOpen8: false, isOpen9: false, isOpen10: false, isOpen11: false
            , isOpen12: false, isOpen13: false, isOpen14: false, isOpen15: false, isOpen16: false, isOpen17: false
            , isOpen18: false, isOpen19: false, isOpen20: false, isOpen21: false, isOpen22: false, isOpen23: false
            , isOpen24: false, isOpen25: false, isOpen26: false, isOpen27: false, isOpen28: false, isOpen29: false
            , isOpen30: false, isOpen31: false, isOpen32: false, isOpen33: false, isOpen34: false, isOpen35: false
            , isOpen36: false, isOpen37: false, isOpen38: false, isOpen39: false, isOpen40: false, isOpen41: false
            , isOpen42: false, isOpen43: false, isOpen44: false, isOpen45: false, isOpen46: false, isOpen47: false
            , isOpen48: false, isOpen49: false, isOpen50: false, isOpen51: false, isOpen52: false, isOpen53: false
            , isOpen54: false, isOpen55: false, isOpen56: false, isOpen57: false, isOpen58: false, isOpen59: false
            , isOpen60: false, isOpenPop: false, toggleQuickView: false
        };
    }
    static propTypes = {
        onClickGrid: PropTypes.func.isRequired
    };
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
    onClickGrid(event) {
        event.preventDefault();
        this.props.onClickGrid(event.currentTarget.id);
    }

    renderShowDetails(){
        return(
            <div style={{margin: '0 auto', textAlign: 'center'}} ><h1> pop up header </h1> <p> pop up content </p></div>
        );
    }

    render(){
        const { submitting, onCheckedOneItemMyCatalog, onDeleteOneItemMyCatalog } = this.props;
        let btnEvent = this.onClickGrid;
        let that = this;
        const userLogin = JSON.parse(sessionStorage.logindata);
        return (
            <div>
                {
                    this.props.items.map(function(item, index){
                        let imagesProduct = '';
                        let itemDate = '';
                        let lblDate = '';
                        let price = '';
                        let actualCost = '';
                        let updatedCost = '';
                        let itemName = '';
                        let itemNameCat = '';
                        let lblActualCost = '';
                        let lblPrice = '';
                        let lblUpdatedCost = '';
                        let isSpecialDisc = false;
                        if (item.id != null) {
                            lblActualCost = `Cost Price (USD)`;
                            lblPrice = `Price (USD)`;
                            lblUpdatedCost = `Update Cost (USD)`;

                            let imagesGallery = [];
                            let imagesOrder = [];

                            if (item.authorization) {
                                if (item.gallery.length > 1) {
                                    // First checked defaultImage = 1
                                    imagesGallery = item.gallery.find((gallery) => {
                                        return gallery.defaultImage == 1;
                                    })
                                    if (!!imagesGallery) {
                                        // If has defaultImage = 1
                                        imagesProduct = (imagesGallery) != undefined
                                            ? imagesGallery.original : '/images/blank.gif';
                                        imagesProduct = (item.authorization)
                                            ? (item.gallery.length) != 0 ? imagesGallery.original : '/images/blank.gif'
                                            :'/images/login-logo@2x.png';
                                    }else{
                                        // checked lastModifiedDateImage by using lastModifiedDateImage
                                        imagesOrder = item.gallery.sort(compareBy('lastModifiedDateImage','desc',null));
                                        imagesProduct = (item.authorization)
                                            ? (imagesOrder.length) != 0 ? imagesOrder[0].original : '/images/blank.gif'
                                            :'/images/login-logo@2x.png';
                                    }
                                }else{
                                    imagesProduct = (item.authorization)
                                        ? (item.gallery.length) != 0 ? item.gallery[0].original : '/images/blank.gif'
                                        :'/images/login-logo@2x.png';
                                }
                            }else{
                                imagesProduct = (item.authorization)
                                    ? (item.gallery.length) != 0 ? item.gallery[0].original : '/images/blank.gif'
                                    :'/images/login-logo@2x.png';
                            }

                            imagesProduct = (item.availability) ? imagesProduct : '/images/imagesoldout@2x.png';

                            itemDate = (item.authorization)
                              ? (item.type != 'CER') ? convertDate(item.itemCreatedDate) : convertDate(item.itemCreatedDate)
                              : '';
                            lblDate = (item.authorization)
                              ? (item.type != 'CER') ? 'Created Date:' : 'Certificate Date:'
                              : '';
                            price = (item.authorization)
                              ? (item.priceInUSD != -1)
                                  ? numberFormat(item.priceInUSD) + ' ' + 'USD'
                                  : '- ' + 'USD'
                              : '- ' + 'USD';
                            actualCost = (item.authorization)
                              ? (item.actualCostInUSD != -1)
                                  ? numberFormat(item.actualCostInUSD) + ' ' + 'USD'
                                  : '- ' + 'USD'
                              : '- ' + 'USD';
                            updatedCost = (item.authorization)
                              ? (item.updatedCostInUSD != -1)
                                  ? numberFormat(item.updatedCostInUSD) + ' ' + 'USD'
                                  : '- ' + 'USD'
                              : '- ' + 'USD';
                            itemName = (item.authorization)
                              ? (item.type != 'CER')?
                                  (item.description != undefined) ?
                                  (item.description.length <= 80) ? item.description : item.description.substring(0, 80) + '...'
                                  : '-' :
                                  item.name
                              : '';
                            itemNameCat = (item.authorization)
                              ? (item.type != 'CER')? item.description: item.name
                              : '';
                            isSpecialDisc = item.specialDiscount != undefined ? item.specialDiscount == 1?true:false : false;
                        }else{
                            lblActualCost = 'Total Cost Price (USD)';
                            lblPrice = 'Total Price (USD)';
                            lblUpdatedCost = 'Total Update Cost (USD)';

                            let imagesGallery = [];
                            let imagesOrder = [];

                            if (item.authorization) {
                                if (item.image.length > 1) {
                                    // First checked defaultImage = 1
                                    imagesGallery = item.image.find((im) => {
                                        return im.defaultSetImage == 1;
                                    })
                                    if (!!imagesGallery) {
                                        // If has defaultImage = 1
                                        imagesProduct = (imagesGallery) != undefined
                                            ? imagesGallery.original : '/images/blank.gif';
                                        imagesProduct = (item.authorization)
                                            ? (item.image.length) != 0 ? imagesGallery.original : '/images/blank.gif'
                                            :'/images/login-logo@2x.png';
                                    }else{
                                        // checked lastModifiedDateImage by using lastModifiedDateImage
                                        imagesOrder = item.image.sort(compareBy('lastModifiedDateSetImage','desc',null));
                                        imagesProduct = (item.authorization)
                                            ? (imagesOrder.length) != 0 ? imagesOrder[0].original : '/images/blank.gif'
                                            :'/images/login-logo@2x.png';
                                    }
                                }else{
                                    imagesProduct = (item.authorization)
                                        ? (item.image.length) != 0 ? item.image[0].original : '/images/blank.gif'
                                        :'/images/login-logo@2x.png';
                                }
                            }else{
                                imagesProduct = (item.authorization)
                                    ? (item.image.length) != 0 ? item.image[0].original : '/images/blank.gif'
                                    :'/images/login-logo@2x.png';
                            }
                            
                            imagesProduct = (item.availability) ? imagesProduct : '/images/imagesoldout@2x.png';

                            itemDate = (item.authorization)
                                ? (item.type != 'CER') ? convertDate(item.createdDate) : convertDate(item.createdDate)
                                : '';
                            lblDate = (item.authorization) ? (item.type != 'CER') ? 'Created Date:' : 'Certificate Date:' : '';
                            price = (item.authorization)
                                ? (item.totalPrice['USD'] != -1)
                                    ? numberFormat(item.totalPrice['USD']) + ' ' + 'USD'
                                    : '- ' + 'USD'
                                : '- ' + 'USD';
                            actualCost = (item.authorization)
                                ? (item.totalActualCost['USD'] != -1)
                                    ? numberFormat(item.totalActualCost['USD']) + ' ' + 'USD'
                                    : '- ' + 'USD'
                                : '- ' + 'USD';
                            updatedCost = (item.authorization)
                                ? (item.totalUpdatedCost['USD'] != -1)
                                    ? numberFormat(item.totalUpdatedCost['USD']) + ' ' + 'USD'
                                    : '- ' + 'USD'
                                : '- ' + 'USD';
                            itemName = (item.authorization)
                              ? (item.type != 'CER')?
                                  (item.description != undefined) ?
                                  (item.description.length <= 80) ? item.description : item.description.substring(0, 80) + '...'
                                  : '-' :
                                  item.name
                              : '';
                            itemNameCat = (item.authorization)
                              ? (item.type != 'CER')? item.description: item.name
                              : '';
                            isSpecialDisc = item.specialDiscount != undefined ? item.specialDiscount == 1?true:false : false;
                        }
                        return (
                            <div key={item.id != null ? `id=${item.id}` : `reference=${item.reference}`}
                                name={item.id != null ? `id=${item.id}` : `reference=${item.reference}`} className="col-md-3 col-sm-3 nopadding">
                                <div className={(index==0)? `searchresult-prodcut ${that.state.isOpen0? 'searchresult-border': ''}`:
                                                (index==1)? `searchresult-prodcut ${that.state.isOpen1? 'searchresult-border': ''}`:
                                                (index==2)? `searchresult-prodcut ${that.state.isOpen2? 'searchresult-border': ''}`:
                                                (index==3)? `searchresult-prodcut ${that.state.isOpen3? 'searchresult-border': ''}`:
                                                (index==4)? `searchresult-prodcut ${that.state.isOpen4? 'searchresult-border': ''}`:
                                                (index==5)? `searchresult-prodcut ${that.state.isOpen5? 'searchresult-border': ''}`:
                                                (index==6)? `searchresult-prodcut ${that.state.isOpen6? 'searchresult-border': ''}`:
                                                (index==7)? `searchresult-prodcut ${that.state.isOpen7? 'searchresult-border': ''}`:
                                                (index==8)? `searchresult-prodcut ${that.state.isOpen8? 'searchresult-border': ''}`:
                                                (index==9)? `searchresult-prodcut ${that.state.isOpen9? 'searchresult-border': ''}`:
                                                (index==10)? `searchresult-prodcut ${that.state.isOpen10? 'searchresult-border': ''}`:
                                                (index==11)? `searchresult-prodcut ${that.state.isOpen11? 'searchresult-border': ''}`:
                                                (index==12)? `searchresult-prodcut ${that.state.isOpen12? 'searchresult-border': ''}`:
                                                (index==13)? `searchresult-prodcut ${that.state.isOpen13? 'searchresult-border': ''}`:
                                                (index==14)? `searchresult-prodcut ${that.state.isOpen14? 'searchresult-border': ''}`:
                                                (index==15)? `searchresult-prodcut ${that.state.isOpen15? 'searchresult-border': ''}`:
                                                (index==16)? `searchresult-prodcut ${that.state.isOpen16? 'searchresult-border': ''}`:
                                                (index==17)? `searchresult-prodcut ${that.state.isOpen17? 'searchresult-border': ''}`:
                                                (index==18)? `searchresult-prodcut ${that.state.isOpen18? 'searchresult-border': ''}`:
                                                (index==19)? `searchresult-prodcut ${that.state.isOpen19? 'searchresult-border': ''}`:
                                                (index==20)? `searchresult-prodcut ${that.state.isOpen20? 'searchresult-border': ''}`:
                                                (index==21)? `searchresult-prodcut ${that.state.isOpen21? 'searchresult-border': ''}`:
                                                (index==22)? `searchresult-prodcut ${that.state.isOpen22? 'searchresult-border': ''}`:
                                                (index==23)? `searchresult-prodcut ${that.state.isOpen23? 'searchresult-border': ''}`:
                                                (index==24)? `searchresult-prodcut ${that.state.isOpen24? 'searchresult-border': ''}`:
                                                (index==25)? `searchresult-prodcut ${that.state.isOpen25? 'searchresult-border': ''}`:
                                                (index==26)? `searchresult-prodcut ${that.state.isOpen26? 'searchresult-border': ''}`:
                                                (index==27)? `searchresult-prodcut ${that.state.isOpen27? 'searchresult-border': ''}`:
                                                (index==28)? `searchresult-prodcut ${that.state.isOpen28? 'searchresult-border': ''}`:
                                                (index==29)? `searchresult-prodcut ${that.state.isOpen29? 'searchresult-border': ''}`:
                                                (index==30)? `searchresult-prodcut ${that.state.isOpen30? 'searchresult-border': ''}`:
                                                (index==31)? `searchresult-prodcut ${that.state.isOpen31? 'searchresult-border': ''}`:
                                                (index==32)? `searchresult-prodcut ${that.state.isOpen32? 'searchresult-border': ''}`:
                                                (index==33)? `searchresult-prodcut ${that.state.isOpen33? 'searchresult-border': ''}`:
                                                (index==34)? `searchresult-prodcut ${that.state.isOpen34? 'searchresult-border': ''}`:
                                                (index==35)? `searchresult-prodcut ${that.state.isOpen35? 'searchresult-border': ''}`:
                                                (index==36)? `searchresult-prodcut ${that.state.isOpen36? 'searchresult-border': ''}`:
                                                (index==37)? `searchresult-prodcut ${that.state.isOpen37? 'searchresult-border': ''}`:
                                                (index==38)? `searchresult-prodcut ${that.state.isOpen38? 'searchresult-border': ''}`:
                                                (index==39)? `searchresult-prodcut ${that.state.isOpen39? 'searchresult-border': ''}`:
                                                (index==40)? `searchresult-prodcut ${that.state.isOpen40? 'searchresult-border': ''}`:
                                                (index==41)? `searchresult-prodcut ${that.state.isOpen41? 'searchresult-border': ''}`:
                                                (index==42)? `searchresult-prodcut ${that.state.isOpen42? 'searchresult-border': ''}`:
                                                (index==43)? `searchresult-prodcut ${that.state.isOpen43? 'searchresult-border': ''}`:
                                                (index==44)? `searchresult-prodcut ${that.state.isOpen44? 'searchresult-border': ''}`:
                                                (index==45)? `searchresult-prodcut ${that.state.isOpen45? 'searchresult-border': ''}`:
                                                (index==46)? `searchresult-prodcut ${that.state.isOpen46? 'searchresult-border': ''}`:
                                                (index==47)? `searchresult-prodcut ${that.state.isOpen47? 'searchresult-border': ''}`:
                                                (index==48)? `searchresult-prodcut ${that.state.isOpen48? 'searchresult-border': ''}`:
                                                (index==49)? `searchresult-prodcut ${that.state.isOpen49? 'searchresult-border': ''}`:
                                                (index==50)? `searchresult-prodcut ${that.state.isOpen50? 'searchresult-border': ''}`:
                                                (index==51)? `searchresult-prodcut ${that.state.isOpen51? 'searchresult-border': ''}`:
                                                (index==52)? `searchresult-prodcut ${that.state.isOpen52? 'searchresult-border': ''}`:
                                                (index==53)? `searchresult-prodcut ${that.state.isOpen53? 'searchresult-border': ''}`:
                                                (index==54)? `searchresult-prodcut ${that.state.isOpen54? 'searchresult-border': ''}`:
                                                (index==55)? `searchresult-prodcut ${that.state.isOpen55? 'searchresult-border': ''}`:
                                                (index==56)? `searchresult-prodcut ${that.state.isOpen56? 'searchresult-border': ''}`:
                                                (index==57)? `searchresult-prodcut ${that.state.isOpen57? 'searchresult-border': ''}`:
                                                (index==58)? `searchresult-prodcut ${that.state.isOpen58? 'searchresult-border': ''}`:
                                                (index==59)? `searchresult-prodcut ${that.state.isOpen59? 'searchresult-border': ''}`:
                                                (index==60)? `searchresult-prodcut ${that.state.isOpen60? 'searchresult-border': ''}`:
                                                ''}>
                                    <span className={`${(isSpecialDisc)?'tagbar-special':''}`}></span>
                                    <div className="thumbnaillgrid">
                                        <img  src={imagesProduct} />
                                    </div>
                                    <p className="font-b fc-000">
                                        <span name={item.id != null ? `id=${item.id}` : `reference=${item.reference}`}
                                            id={item.id != null ? `id=${item.id}` : `reference=${item.reference}`}
                                            onClick={item.authorization ? btnEvent: ''}>{item.reference}</span><br/>
                                        <span name={item.id != null ? `id=${item.id}` : `reference=${item.reference}`}
                                            id={item.id != null ? `id=${item.id}` : `reference=${item.reference}`}
                                            onClick={item.authorization ? btnEvent: ''}>{(item.authorization)?item.sku:''}</span>
                                    </p>
                                    <p className="product-detail-h"
                                        name={item.id != null ? `id=${item.id}` : `reference=${item.reference}`}
                                        id={item.id != null ? `id=${item.id}` : `reference=${item.reference}`}
                                        onClick={item.authorization ? btnEvent: ''}>{itemName}</p>
                                    <span className={`fc-ae8f3b font-b price ${(item.authorization) ?(item.type != 'CER') ? '' : 'hidden' :''}`}>
                                        {price}
                                    </span>
                                    <span className="line"></span>
                                </div>
                                <div>
                                    <div key={item.id != null ? `id=${item.id}` : `reference=${item.reference}`}  id={index} ref={'div'+index} style={{
                                        display:(index==0)?`${that.state.isOpen0 ? '' : 'none'}`:
                                                (index==1)?`${that.state.isOpen1 ? '' : 'none'}`:
                                                (index==2)?`${that.state.isOpen2 ? '' : 'none'}`:
                                                (index==3)?`${that.state.isOpen3 ? '' : 'none'}`:
                                                (index==4)?`${that.state.isOpen4 ? '' : 'none'}`:
                                                (index==5)?`${that.state.isOpen5 ? '' : 'none'}`:
                                                (index==6)?`${that.state.isOpen6 ? '' : 'none'}`:
                                                (index==7)?`${that.state.isOpen7 ? '' : 'none'}`:
                                                (index==8)?`${that.state.isOpen8 ? '' : 'none'}`:
                                                (index==9)?`${that.state.isOpen9 ? '' : 'none'}`:
                                                (index==10)?`${that.state.isOpen10 ? '' : 'none'}`:
                                                (index==11)?`${that.state.isOpen11 ? '' : 'none'}`:
                                                (index==12)?`${that.state.isOpen12 ? '' : 'none'}`:
                                                (index==13)?`${that.state.isOpen13 ? '' : 'none'}`:
                                                (index==14)?`${that.state.isOpen14 ? '' : 'none'}`:
                                                (index==15)?`${that.state.isOpen15 ? '' : 'none'}`:
                                                (index==16)?`${that.state.isOpen16 ? '' : 'none'}`:
                                                (index==17)?`${that.state.isOpen17 ? '' : 'none'}`:
                                                (index==18)?`${that.state.isOpen18 ? '' : 'none'}`:
                                                (index==19)?`${that.state.isOpen19 ? '' : 'none'}`:
                                                (index==20)?`${that.state.isOpen20 ? '' : 'none'}`:
                                                (index==21)?`${that.state.isOpen21 ? '' : 'none'}`:
                                                (index==22)?`${that.state.isOpen22 ? '' : 'none'}`:
                                                (index==23)?`${that.state.isOpen23 ? '' : 'none'}`:
                                                (index==24)?`${that.state.isOpen24 ? '' : 'none'}`:
                                                (index==25)?`${that.state.isOpen25 ? '' : 'none'}`:
                                                (index==26)? `${that.state.isOpen26? '' : 'none'}`:
                                                (index==27)? `${that.state.isOpen27? '' : 'none'}`:
                                                (index==28)? `${that.state.isOpen28? '' : 'none'}`:
                                                (index==29)? `${that.state.isOpen29? '' : 'none'}`:
                                                (index==30)? `${that.state.isOpen30? '' : 'none'}`:
                                                (index==31)? `${that.state.isOpen31? '' : 'none'}`:
                                                (index==32)? `${that.state.isOpen32? '' : 'none'}`:
                                                (index==33)? `${that.state.isOpen33? '' : 'none'}`:
                                                (index==34)? `${that.state.isOpen34? '' : 'none'}`:
                                                (index==35)? `${that.state.isOpen35? '' : 'none'}`:
                                                (index==36)? `${that.state.isOpen36? '' : 'none'}`:
                                                (index==37)? `${that.state.isOpen37? '' : 'none'}`:
                                                (index==38)? `${that.state.isOpen38? '' : 'none'}`:
                                                (index==39)? `${that.state.isOpen39? '' : 'none'}`:
                                                (index==40)? `${that.state.isOpen40? '' : 'none'}`:
                                                (index==41)? `${that.state.isOpen41? '' : 'none'}`:
                                                (index==42)? `${that.state.isOpen42? '' : 'none'}`:
                                                (index==43)? `${that.state.isOpen43? '' : 'none'}`:
                                                (index==44)? `${that.state.isOpen44? '' : 'none'}`:
                                                (index==45)? `${that.state.isOpen45? '' : 'none'}`:
                                                (index==46)? `${that.state.isOpen46? '' : 'none'}`:
                                                (index==47)? `${that.state.isOpen47? '' : 'none'}`:
                                                (index==48)? `${that.state.isOpen48? '' : 'none'}`:
                                                (index==49)? `${that.state.isOpen49? '' : 'none'}`:
                                                (index==50)? `${that.state.isOpen50? '' : 'none'}`:
                                                (index==51)? `${that.state.isOpen51? '' : 'none'}`:
                                                (index==52)? `${that.state.isOpen52? '' : 'none'}`:
                                                (index==53)? `${that.state.isOpen53? '' : 'none'}`:
                                                (index==54)? `${that.state.isOpen54? '' : 'none'}`:
                                                (index==55)? `${that.state.isOpen55? '' : 'none'}`:
                                                (index==56)? `${that.state.isOpen56? '' : 'none'}`:
                                                (index==57)? `${that.state.isOpen57? '' : 'none'}`:
                                                (index==58)? `${that.state.isOpen58? '' : 'none'}`:
                                                (index==59)? `${that.state.isOpen59? '' : 'none'}`:
                                                (index==60)? `${that.state.isOpen60? '' : 'none'}`:
                                                '',
                                    }} className={(index==3||index==7 || index==11||index==15||index==19||index==23||index==27||index==31 ||index==35||index==39
                                        ||index==43||index==47||index==51||index==55||index==59)?'over-searchresult-left':'over-searchresult' }>
                                        <img className="searchresult-close"  src="/images/icon-close.png" responsive
                                            name={item.id != null ? `id=${item.id}` : `reference=${item.reference}`} id={index}/>
                                        <span className="fc-ddbe6a width-f100 font-b">Item Reference: </span>
                                        <span className="width-f100">{item.reference}</span>
                                        <span className="fc-ddbe6a width-f100 font-b">Item Name: </span>
                                        <span className="width-f100 text-wrap text-overflowhidden">{itemName}</span>
                                        {
                                            (item.authorization) ?
                                            <div>
                                                <span className={`width-f100 fc-ddbe6a font-b ${(userLogin.permission.price == 'All') && (item.type != 'CER') ?
                                                    '' : 'hidden'}`}>{lblActualCost}: </span>
                                                <span className={`width-f100 ${(userLogin.permission.price == 'All') && (item.type != 'CER')  ?
                                                    '' : 'hidden'}`}>{actualCost}</span>
                                                <span className={`width-f100 fc-ddbe6a font-b ${((userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All'))  && (item.type != 'CER') ?
                                                    '' : 'hidden'}`}>{lblUpdatedCost}: </span>
                                                <span className={`width-f100 ${((userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All')) && (item.type != 'CER') ?
                                                    '' : 'hidden'}`}>{updatedCost}</span>
                                                <span className={`width-f100 fc-ddbe6a font-b ${((userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                                                    || userLogin.permission.price == 'All')) && (item.type != 'CER') ?
                                                    '' : 'hidden'}`}>{lblPrice}: </span>
                                                <span className={`width-f100 ${((userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                                                    || userLogin.permission.price == 'All')) && (item.type != 'CER') ?
                                                    '' : 'hidden'}`}>{price}</span>
                                            </div>
                                                : ''
                                        }
                                        <span className="width-f100 fc-ddbe6a font-b">Company : </span>
                                        <span className="width-f100">{(item.authorization) ?item.companyName:''}</span>
                                        <span className="fc-ddbe6a width-f100 font-b">Location: </span>
                                        <span className="width-f100">{(item.authorization) ?item.warehouseName:''}</span>
                                        <span className="fc-ddbe6a width-f100 font-b">{lblDate}</span>
                                        <span className="width-f100">{itemDate}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

module.exports = GridItemsViewPrint
