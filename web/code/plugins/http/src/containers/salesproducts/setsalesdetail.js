import React,{ Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Pagination } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import jQuery from 'jquery';
import moment from 'moment-timezone';
import ReactImageFallback from 'react-image-fallback';
import * as productdetailaction from '../../actions/productdetailaction';
import ProductDescriptionBlock from '../../components/salesproductdetail/setDescription';
import ProductDescriptionmovementBlock from '../../components/salesproductdetail/productDescmovement'
import ProductJewelryAttributes from '../../components/salesproductdetail/productJewalryAttributes';
import ProductStoneAttributes from '../../components/salesproductdetail/productStoneAttributes';
import ProductWatchAttributes from '../../components/salesproductdetail/productWatchAttributes.js';
import ProductGallery from '../../components/salesproductdetail/productGallery';
import ProductRelete from '../../components/salesproductdetail/productReleted';
import SetPrint from '../../components/salesproductdetail/setPrint';
import ProductObaAttributes from '../../components/salesproductdetail/productObaAttributes';
import ProductAccAttributes from '../../components/salesproductdetail/productAccAttributes';
import ProductSpaAttributes from '../../components/salesproductdetail/productSppAttributes';
import Setreference from '../../components/salesproductdetail/productset';
import numberFormat from '../../utils/convertNumberformatwithcomma';
import checkInarrayObject from '../../utils/checkInarrayObject';
import checkInarrayObjectOther from '../../utils/checkInarrayObjectOther';
import ProductGemstoneAttributes from '../../components/salesproductdetail/productGemstonesAttributes';
import ProductDiamonsAttributes from  '../../components/salesproductdetail/productDiamondsAttributes';
import ProductRawmatirialAttributes from  '../../components/salesproductdetail/productRawmaterialAttributes';
import validateCatalog from '../../utils/validatecatalogproductdetail';
import ModalalertMsgObj from '../../utils/modalalertmsg';
import compareBy from '../../utils/compare';
import '../../../public/css/image-gallery.css';
import '../../../public/css/productdetail.css';
import '../../../public/css/magnific-popup.css';
import '../../utils/magnific-popup.js';

const Loading = require('react-loading');

class SetSalesDetail extends Component {
    constructor(props) {
        super(props);
        this.handleKeyPressNavigation = this.handleKeyPressNavigation.bind(this);
        this.handleGo = this.handleGo.bind(this);
        this.handleClickPageination = this.handleClickPageination.bind(this);
        this.handleKeyPage = this.handleKeyPage.bind(this);

        this.state = {
            productdetailLoading: false,
            isOpenDownloadCerMsg: false,
            showmovement: false
        };
    }

    componentWillMount = _ => {
        let setReferenceId = this.props.params.id;
        const { allItems } =  this.props;
        const setReferencelist= allItems;

        this.setState({ productdetailLoading: true });

        if (this.props.viewAsSet) {
            this.props.getSalesViewAsSetDetails(setReferenceId,setReferencelist).then(()=>{
                this.setState({ productdetailLoading: false });
            });
        }else{
            this.props.getSalesSetDetails(setReferenceId,setReferencelist).then(()=>{
                this.setState({ productdetailLoading: false });
            });
        }


    }

    componentDidMount = _ => {
        jQuery('#zoomimg').magnificPopup({
            key: 'my-popup',
            items: {
                src: jQuery('<div class="white-popup m-pt"><div class="white-popup-left"><img id="galleryimg"/></div><div class="white-popup-right"><button id="btnup" class="btn btn-primary btn-radius">Up</button><button id="btndown" class="btn btn-primary btn-radius">Down</button><button id="btnzoom" class="btn btn-primary btn-radius" >zoom</button></div></div>'),
                type: 'inline'
            },
            callbacks: {
                open: function() {
                    let activegallery = jQuery('.active img').attr('src').replace('thumbnail', 'original');
                    jQuery('#galleryimg').attr('src',activegallery);
                    let rotatecount = 0;
                    jQuery('#btnup').click(function(){
                        jQuery('#galleryimg').css({'-webkit-transform': 'rotate('+(rotatecount+=90)+'deg)'});
                    });
                    jQuery('#btndown').click(function(){
                        jQuery('#galleryimg').css({'-webkit-transform': 'rotate('+(rotatecount-=90)+'deg)'});
                    });
                    let zoomimg = false;
                    jQuery('#btnzoom').click(function(){
                        if(zoomimg == false){
                            zoomimg = true;
                            jQuery('#galleryimg').css({'width': jQuery('#galleryimg').width() * 2 ,'max-width':'700px'});
                        } else {
                            zoomimg = false;
                            jQuery('#galleryimg').css({'width': 'auto' ,'max-width':'500px'});
                        }
                    });
                }
            }
        });

        jQuery('#popupset').magnificPopup({
            key: 'my-popup',
            items: {
                src: jQuery('<div class="white-popup m-pt"><div class="white-popup-left"><img id="galleryimgset"/></div><div class="white-popup-right"><button id="btnupset" class="btn btn-primary btn-radius">Up</button><button id="btndownset" class="btn btn-primary btn-radius">Down</button><button id="btnzoomset" class="btn btn-primary btn-radius" >zoom</button></div></div>'),
                type: 'inline'
            },
            callbacks: {
                open: function() {
                    let activegallery = jQuery('#popupset img').attr('src');

                    jQuery('#galleryimg').attr('src',activegallery);
                    let rotatecount = 0;
                    jQuery('#btnupset').click(function(){
                        jQuery('#galleryimgset').css({'-webkit-transform': 'rotate('+(rotatecount+=90)+'deg)'});
                    });
                    jQuery('#btndownset').click(function(){
                        jQuery('#galleryimgset').css({'-webkit-transform': 'rotate('+(rotatecount-=90)+'deg)'});
                    });
                    let zoomimg = false;
                    jQuery('#btnzoomset').click(function(){
                        if(zoomimg == false){
                            zoomimg = true;
                            jQuery('#galleryimgset').css({'width': jQuery('#galleryimgset').width() * 2 ,'max-width':'700px'});
                        } else {
                            zoomimg = false;
                            jQuery('#galleryimgset').css({'width': 'auto' ,'max-width':'500px'});
                        }
                    });
                }
            }
        });

        jQuery('#printproduct').click( function(){
            let styleprint = '<style type="text/css" media="print">';
            styleprint +='.landScape';
            styleprint +='{ ';
            styleprint +='width: 100%;';
            styleprint +='height: 100%;';
            styleprint +='margin: 0% 0% 0% 0%;';
            styleprint +='filter: progid:DXImageTransform.Microsoft.BasicImage(Rotation=3);';
            styleprint +='}';
            styleprint +='</style>';
            const divContents = jQuery('#dvContainer').html();
            let printWindow = window.open('', '', 'height=800,width=800');
            printWindow.document.write('<html><head><title>Mouawad online</title>'+styleprint);
            printWindow.document.write('</head><body class="landScape">');
            printWindow.document.write(divContents);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();
            setTimeout( function(){
                printWindow.document.close();
                printWindow.print();
            },500);
            return true;
        });
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.params.id !== this.props.params.id) {
            const setReferenceId = nextProps.params.id;
            const { allItems } =  this.props;
            const setReferencelist= allItems;

            this.setState({ productdetailLoading: true });

            if (this.props.viewAsSet) {
                this.props.getSalesViewAsSetDetails(setReferenceId,setReferencelist).then(()=>{
                    this.setState({ productdetailLoading: false });
                });
            }else{
                this.props.getSalesSetDetails(setReferenceId,setReferencelist).then(()=>{
                    this.setState({ productdetailLoading: false });
                });
            }
        }
    }

    renderDesc = _ => {
        const  Detail  = this.props.productdetail;
        let  Detailtitle  = 'ITEM DETAILS';
        if(!Detail){
            return(
                <div>
                    <center>
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        <Loading type="spin" color="#202020" width="10%"/>
                    </center>
                </div>
            );
        }
        return(
            <div>
                <h2>{Detailtitle}</h2>
                <ProductDescriptionBlock {...Detail} />
            </div>
        );
    }

    renderDescmovement = _ => {
        const  Detail  = this.props.productdetail;
        let  Detailtitle  = 'ITEM DETAILS';
        if(!Detail){
            return(
                <div>
                    <center>
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        <Loading type="spin" color="#202020" width="10%"/>
                    </center>
                </div>
            );
        }
        switch (Detail.type) {
            case 'JLY':
                return(
                    <div>
                        <h2>{Detailtitle}</h2>
                        <ProductDescriptionmovementBlock {...Detail} />
                    </div>
                );
            case 'STO':
                return(
                    <div>
                        <h2>{Detailtitle}</h2>
                        <ProductDescriptionmovementBlock {...Detail} />
                    </div>
                );
            case 'WAT':
                return(
                    <div>
                        <h2>{Detailtitle}</h2>
                        <ProductDescriptionmovementBlock {...Detail} />
                    </div>
                );
            case 'OBA':
                return(
                    <div>
                        <h2>{Detailtitle}</h2>
                        <ProductDescriptionmovementBlock {...Detail} />
                    </div>
                );
            case 'ACC':
                return(
                    <div>
                        <h2>{Detailtitle}</h2>
                        <ProductDescriptionmovementBlock {...Detail} />
                    </div>
                );
            case 'SPA':
                return(
                    <div>
                        <h2>{Detailtitle}</h2>
                        <ProductDescriptionmovementBlock {...Detail} />
                    </div>
                );
            case 'CER':
                return(
                    <div>
                        <h2>{Detailtitle}</h2>
                        <ProductDescriptionmovementBlock {...Detail} />
                    </div>
                );
        }
    }

    handleClickPageination = (page) => {
        const { lotNumbers } = this.props.productdetail;
        const { stonePageSize } = this.props;
        const params = {
            datas: lotNumbers,
            page: page,
            size: stonePageSize
        };
        this.props.getLotNaumberPerPage(params);
    }

    handleKeyPage = (page) => {
        const { fields: { stonepage },stonePageSize,totalpage } = this.props;

        if (!!stonepage.value) {
            if (Number(stonepage.value) <= totalpage && Number(stonepage.value) > 0) {
                const { lotNumbers } = this.props.productdetail;
                const params = {
                    datas: lotNumbers,
                    page: Number(stonepage.value),
                    size: stonePageSize
                };
                this.props.getLotNaumberPerPage(params);
            }
        }
    }

    renderAttr = _ => {
        const  Detail  = this.props.productdetail;
        const { fields:{ stonepage }, lotNumbers, stonActivePage, submitting, totalpage, stonePageSize,filterSearch } = this.props;
        let  Attrtitle  = 'ITEM ATTRIBUTES';

        if(!Detail){
            return(
                <div>
                    <center>
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        <Loading type="spin" color="#202020" width="10%"/>
                    </center>
                </div>
            );
        }
        switch (Detail.type) {
            case 'JLY':
                return(
                    <div>
                        <h2>{Attrtitle}</h2>
                        <ProductJewelryAttributes {...Detail} />
                    </div>
                );
            case 'STO':
                if (lotNumbers.length > 0) {
                    return(
                        <div>
                            <h2>{Attrtitle}</h2>
                            <ProductStoneAttributes Detail={Detail} pageSize={stonePageSize} totalpage={totalpage} lotNumbers={lotNumbers}
                                onClickPage={this.handleClickPageination} activePage={stonActivePage} onKeyPage={this.handleKeyPage} stonepage={stonepage}/>
                        </div>
                    );
                }else{
                    return(<div></div>);
                }
            case 'WAT':
                return(
                    <div>
                        <h2>{Attrtitle}</h2>
                        <ProductWatchAttributes {...Detail} />
                    </div>
                );
            case 'OBA':
                return(
                    <div>
                        <h2>{Attrtitle}</h2>
                        <ProductObaAttributes {...Detail} />
                    </div>
                );
            case 'ACC':
                return(
                    <div>
                       <h2>{Attrtitle}</h2>
                       <ProductAccAttributes {...Detail} />
                    </div>
                );
            case 'SPA':
                return(
                    <div>
                        <h2>{Attrtitle}</h2>
                        <ProductSpaAttributes {...Detail} />
                    </div>
                );
        }
     }

    renderSetreference = _ => {
        const { setReferenceData } = this.props.productdetail;

        if(!!!setReferenceData){
            return(
                <div>
                    <center>
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        <Loading type="spin" color="#202020" width="10%"/>
                    </center>
                </div>
            );
        }

        if (!!setReferenceData.products) {
            if(setReferenceData.products.length > 0){
                const logindata = sessionStorage.logindata ? JSON.parse(sessionStorage.logindata) : null;
                const currency = logindata.currency;
                return(
                    <div>
                        <h2>RELATED DETAILS</h2>
                        <Setreference productset={setReferenceData}/>
                    </div>
                );
            } else {
                return(<div></div>);
            }
        }else{
            return(<div></div>);
        }
    }

    clickSet = _ => {
        jQuery('#popupset').click();
        jQuery('#popupset').magnificPopup({
            key: 'my-popup2',
            items: {
                src: jQuery('<div class="white-popup m-pt"><div class="white-popup-left"><img id="galleryimgset"/><div id="showtotal"></div></div><div class="white-popup-right"><button id="btnupset" class="btn btn-primary btn-radius">Up</button><button id="btndownset" class="btn btn-primary btn-radius">Down</button><button id="btnzoomset" class="btn btn-primary btn-radius" >zoom</button></div></div>'),
                type: 'inline'
            },
            callbacks: {
                open: function() {
                    let activegallery = jQuery('#imgset').attr('src');
                    let totalprice = jQuery('#totalsetprice').val();

                    const logindata = sessionStorage.logindata ? JSON.parse(sessionStorage.logindata) : null;
                    const currency = logindata.currency;

                    jQuery('#galleryimgset').attr('src',activegallery);
                    jQuery('#showtotal').text('Total Retail Price (Set): '+numberFormat(totalprice)+' '+'USD');
                    let rotatecount = 0;
                    jQuery('#btnupset').click(function(){
                        jQuery('#galleryimgset').css({'-webkit-transform': 'rotate('+(rotatecount+=90)+'deg)'});
                    });
                    jQuery('#btndownset').click(function(){
                        jQuery('#galleryimgset').css({'-webkit-transform': 'rotate('+(rotatecount-=90)+'deg)'});
                    });
                    let zoomimg = false;
                    jQuery('#btnzoomset').click(function(){
                        if(zoomimg == false){
                            zoomimg = true;
                            jQuery('#galleryimgset').css({'width': jQuery('#galleryimgset').width() * 2 ,'max-width':'700px'});
                        } else {
                            zoomimg = false;
                            jQuery('#galleryimgset').css({'width': 'auto' ,'max-width':'500px'});
                        }
                    });
                }
            }
        });
    }

    renderFooterAttr = _ => {
        const Detail  = this.props.productdetail;
        const gemstoneAttr = Detail.gemstones;
        const subType = Detail.subType;

        if(Detail.type == 'STO' || Detail.type == 'CER'){

        } else {
            if(!gemstoneAttr){
                return(
                    <div>
                        <center>
                            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                            <Loading type="spin" color="#202020" width="10%"/>
                        </center>
                    </div>
                );
            }
            if(gemstoneAttr.length > 0){
                if(checkInarrayObject('type','Stone',gemstoneAttr)){
                    return(
                        <div>
                            <h2>GEMSTONES ATTRIBUTES</h2>
                            <ProductGemstoneAttributes gemstoneAttrData={gemstoneAttr}  onClick={this.downloadCer} />
                        </div>
                    );
                }
            } else {

            }
        }
    }

    renderFooterDiamondsAttr = _ => {
        const Detail  = this.props.productdetail;
        const gemstoneAttr = Detail.gemstones;
        const subType = Detail.subType;
        const { company } = Detail

        if(Detail.type == 'STO' || Detail.type == 'CER'){
        } else {
            if(!gemstoneAttr){
                return(
                    <div>
                        <center>
                            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                            <Loading type="spin" color="#202020" width="10%"/>
                        </center>
                    </div>
                );
            }
            if(gemstoneAttr.length > 0){
                if(checkInarrayObject('type','Loose Diamond',gemstoneAttr)){
                    return(
                        <div>
                            <h2>DIAMONDS ATTRIBUTES</h2>
                            <ProductDiamonsAttributes gemstoneAttrData={gemstoneAttr} company={company.toLowerCase()} onClick={this.downloadCer} />
                        </div>
                    );
                }
            } else {
            }
        }
    }

    renderFooterRawmatirialAttr = _ => {
        const Detail  = this.props.productdetail;
        const gemstoneAttr = Detail.gemstones;
        const subType = Detail.subType;
        if(Detail.type == 'STO' || Detail.type == 'CER'){

        } else {
            if(!gemstoneAttr){
                return(
                    <div>
                        <center>
                            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                            <Loading type="spin" color="#202020" width="10%"/>
                        </center>
                    </div>
                );
            }
            if(gemstoneAttr.length > 0){
                if(checkInarrayObjectOther('type',gemstoneAttr)){
                    return(
                        <div>
                            <h2>RAW MATERIAL ATTRIBUTES</h2>
                            <ProductRawmatirialAttributes gemstoneAttrData={gemstoneAttr} />
                        </div>
                    );
                }
            } else {

            }
        }
    }

    renderImagegallery = _ => {
        const { gallery } = this.props.productdetail;

        if(gallery !== undefined){
            if(gallery.length > 0) {
                let imagesGallery = []
                let galleryOrder = []
                if (gallery.length > 1) {
                    // First checked defaultImage = 1
                    imagesGallery = gallery.find((gallery) => {
                        return gallery.defaultSetImage == 1;
                    })
                    if (!!imagesGallery) {
                        // If has defaultImage = 1
                        galleryOrder = gallery.sort(compareBy('defaultSetImage','desc',null));
                    }else{
                        // checked lastModifiedDateImage by using lastModifiedDateImage
                        galleryOrder = gallery.sort(compareBy('lastModifiedDateSetImage','desc',null));
                    }
                }
                return(
                    <div>
                        <ProductGallery imagegallery={gallery}/>
                    </div>
                );
            } else {
                return(
                    <div><img src="/images/blank.gif" width="100%"/></div>
                );
            }
        }
    }

    renderReleteproduct = _ => {
        const { totalpage,products,page } = this.props.productrelete;
        const productId = this.props.params.id;
        const { type,collection,subType,price,dominant } = this.props.productdetail;
        const { fields: { reletepage },handleSubmit} = this.props;

        const logindata = sessionStorage.logindata ? JSON.parse(sessionStorage.logindata) : null;
        const currency = logindata.currency;

        if(type != 'STO' && !products && type != 'CER'){
            return(
                <div></div>
            );
        }
        if(type != 'STO' && dominant && type != 'CER' && products.length >= 1){
            return(
                <div className="col-md-12 col-sm-12 nopadding">
                    <h2>RELATED DETAILS</h2>
                    <ProductRelete productrelte={products}/>
                    <div className="searchresult-navi pagenavi relete col-md-12 col-sm-12 nopadding">
                        <Pagination prev next first last ellipsis boundaryLinks items={totalpage} maxButtons={3}
                              activePage={reletepage.defaultValue} onSelect={(eventKey) => {
                                  this.props.getSalesProductRelete(subType,eventKey,productId,dominant,currency,price[currency]);
                              }} />
                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 nopadding">
                            <span>Page</span>
                            <form onSubmit={handleSubmit(this.handleGo)} >
                                 <input type="number" {...reletepage} />
                                 <span>of</span>
                                 <span>{numberFormat(totalpage)}</span>
                                 <button>Go</button>
                            </form>
                        </div>
                    </div>
                </div>
              );
        } else {
            return(
                <div></div>
            );
        }
    }

    renderNavigation = _ => {
        const productlist = this.props.productlist;
        const productId = this.props.params.id;
        const productIndex = this.props.productindex;
        const productindexplus = this.props.productindexplus;
        let pructdetailurl = '/setsalesdetail/';
        const { fields: { salessetpagego },handleSubmit} = this.props;

        if(!productlist){
            return(
                <div>
                    <center>
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        <Loading type="spin" color="#202020" width="10%"/>
                    </center>
                </div>
            );
        }
        if(productlist.length != 0){
            return(
                <div className="bar-title-detail maring-t15">
                    <div className="ft-white productdetail-search display-right">
                        <Link to={'/salessearchresult'} className="btn bg_sale_search">Search Result</Link>
                    </div>
                    <div className={`margin-t5 text-center m-none display-right padding-lf15 ${productIndex == 0?'hidden':''}`}>
                        <span className="bar-line">|</span>
                    </div>
                    <div className="display-right">
                        <div className={`float-l bar-detail-pre ${productIndex == 0?'hidden':''}`}>
                               <Link className={productIndex == 0?'disabled-link':''} to={{pathname: productIndex != 0 ?`${pructdetailurl}${(productlist[productIndex-1].reference != undefined)? productlist[productIndex-1].reference.replace('/','-'):''}`:''}}><span className="icon-sale-back"></span></Link>
                        </div>
                        <div className="float-l bar-detail-text">
                            <div className="float-l saleproductdetailpage text-center nopadding">
                                <form onSubmit={handleSubmit(this.handleKeyPressNavigation)} >
                                    <input type="number" {...salessetpagego} />
                                </form>
                            </div>
                            <div className="float-l  margin-t5 text-center nopadding">
                                of {numberFormat(productlist.length)} items
                            </div>
                        </div>
                        <div className={`float-l bar-detail-pre ${productIndex+1 >= productlist.length?'hidden':''}`}>
                            <Link className={productIndex+1 >= productlist.length?'disabled-link':''} to={{pathname: productIndex+1 < productlist.length ? `${pructdetailurl}${(productlist[productIndex+1].reference != undefined)? productlist[productIndex+1].reference.replace('/','-'):''}` : ''}}><span className="icon-sale-next"></span></Link>
                        </div>
                    </div>
                </div>
            );
        }
    }

    showmovement = _ => {
        this.setState({ showmovement: true });
    }

    hidemovement = _ => {
        this.setState({ showmovement: false });
    }

    handleGo = (data) => {
        const productId = this.props.params.id;
        const { totalpage} = this.props.productrelete;
        const getPage = parseInt(data.reletepage);
        const { collection,subType,price,dominant } = this.props.productdetail;
        if((getPage <= totalpage) && (getPage != 0)){
            const logindata = sessionStorage.logindata ? JSON.parse(sessionStorage.logindata) : null;
            const currency = logindata.currency;
            this.props.getSalesProductRelete(subType,getPage,productId,dominant,currency,price[currency]);
        }
    }

    handleKeyPressNavigation = (data) => {
        const { salessetpagego} = data;
        const productid = this.props.productlist[parseInt(salessetpagego)-1].reference;
        this.context.router.push(`/setsalesdetail/${productid}`);
    }

    zoomicon = _ => {
        const { gallery } = this.props.productdetail;
        const styles ={
            displaynone:{
                display:'none'
            }
        };
        if(!!gallery && gallery.length > 0){
            return(
                <div>
                    <a><div className="icon-zoom margin-l10" id="zoomimg"></div></a>
                </div>
            );
        } else {
            return(
                <div>
                    <a style={styles.displaynone}><div className="icon-zoom margin-l10" id="zoomimg"></div></a>
                </div>
            );
        }
    }

    downloadCertificateAll = _=> {
        const userLogin = JSON.parse(sessionStorage.logindata);
        const host = HOSTNAME || 'localhost';
        const ROOT_URL = (host != 'mol.mouawad.com')? `http://${host}:${(ENVIRONMENT!='staging')?3005:4005}`: `http://${host}`;
        const { gemstones, company } = this.props.productdetail;
        const productId = this.props.params.id;

        let exportDate = moment().tz('Asia/Bangkok').format('YYYYMMDD_HHmmss');
        let allCer = [];
        if(gemstones != undefined){
            gemstones.map((item) => {
                if (!!item.certificate) {
                    item.certificate.images.map((img) => {
                        allCer.push(img.originalFileName)
                    })
                }
            })
        }
        let params = {
            'allCer': allCer,
            'userName': `${userLogin.username}`,
            'fileName': `${userLogin.username}_${exportDate}`,
            'userEmail': userLogin.email,
            'ROOT_URL': ROOT_URL,
            'productId': productId,
            // 'company': company.toLowerCase()
            'company': 'mme' // mme only 08/01/2019
        }

        this.props.getCertificate(params).then((value) => {
            if (value) {
                this.setState({isOpenDownloadCerMsg: true});
            }
            console.log(value);
        });
    }

    renderAlertmsgCer = _=> {
        const message = 'Please check your email for download certificate.';
        const title = 'DOWNLOAD CERTIFICATE';
        return(
            <ModalalertMsgObj isOpen={this.state.isOpenDownloadCerMsg} isClose={this.handleCloseDownloadCerMsg} props={this.props} message={message}  title={title}/>
        );
    }

    handleCloseDownloadCerMsg = _=> {
        this.setState({ isOpenDownloadCerMsg: false });
    }

    downloadCer = (id,e) => {
        const userLogin = JSON.parse(sessionStorage.logindata);
        const host = HOSTNAME || 'localhost';
        const ROOT_URL = (host != 'mol.mouawad.com')? `http://${host}:${(ENVIRONMENT!='staging')?3005:4005}`: `http://${host}`;
        const { gemstones, company } = this.props.productdetail;
        const productId = this.props.params.id;

        let exportDate = moment().tz('Asia/Bangkok').format('YYYYMMDD_HHmmss');
        let allCer = [];
        if(gemstones != undefined){
            gemstones.map((item) => {
                if (!!item.certificate) {
                    if (item.certificate.number == id) {
                        item.certificate.images.map((img) => {
                            allCer.push(img.original.replace('/images/products/original',''));
                        });
                    }
                }
            });
        }

        let params = {
            'allCer': allCer,
            'userName': `${userLogin.username}`,
            'fileName': `${userLogin.username}_${exportDate}`,
            'userEmail': userLogin.email,
            'ROOT_URL': ROOT_URL,
            'productId': productId,
            'company': company.toLowerCase()
        }

        this.props.getCertificate(params).then((value) => {
            if (value) {
                this.setState({isOpenDownloadCerMsg: true});
            }
        });
    }

    render = _ => {
        const userLogin = JSON.parse(sessionStorage.logindata);
        const { totalpage,products,page } = this.props.productrelete;
        const reletepage = this.props.productreletepage;
        const productlist = this.props.productlist;
        const productId = this.props.params.id;
        const productIndex = this.props.productindex;
        const productindexplus = this.props.productindexplus;
        let type = 'JLY';
        let { gallery, setReference } = this.props.productdetail;
        const { lotNumbers, stonePageSize, stonActivePage,viewAsSet } = this.props;
        let isCertificate = false;
        let countImages = 0;
        let imageCerDownload = '';
        let imageName = '';

        if (!gallery) {
            gallery = [];
        }

        return(
            <div id="page-wrapper">
                <div className="col-sm-12 bg_title_sale m-prodcutdetail">
                    <div className="col-md-5 col-md-4 col-sm-5 ft-white m-nopadding">
                        <h1>{`${ this.state.showmovement ? 'MOVEMENT ACTIVITY' : 'TRANSACTION DETAILS'}`}</h1>
                    </div>
                    {this.renderNavigation()}
                </div>
                <div className="bg-back-movement">
                    <a className={`margin-l20 ${!this.state.showmovement ? 'hide' : ''}`}
                        onClick={this.hidemovement}><img src="/images/icon-back-movement.jpg" /></a>
                </div>
                <div className={`${this.state.productdetailLoading == true ? 'centerloading' : 'hidden'}` }>
                    <center>
                        <br/><br/><br/><br/><br/><br/>
                        <Loading type="spin" color="#202020" width="10%"/>
                    </center>
                    <br/><br/><br/><br/><br/><br/>
                </div>
                <div className={`row ${this.state.showmovement ? 'hide' : ''}`}>
                    <div className="col-sm-12">
                        <div className="panel panel-default">
                            <div className="panel-body padding-ft0">
                                <div className="col-md-12 col-sm-12 icon-detail">
                                    <a><div className="icon-print margin-l10" id="printproduct"></div></a>
                                    {this.zoomicon()}
                                    {isCertificate
                                      ? countImages != 1
                                        ? <a><div className="icon-certificate margin-l10" onClick={ this.downloadCertificateAll }></div></a>
                                        : <a href={imageCerDownload} download={imageName} ><div className="icon-certificate margin-l10"/></a>
                                      :
                                      <a><div className=""></div></a>
                                    }
                                </div>
                                <div className="col-md-6 col-sm-12">{this.renderImagegallery()}</div>
                                <div className="col-md-6 col-sm-12">
                                    <div className="col-md-12 col-sm-12">
                                        {this.renderDesc()}
                                    </div>
                                <div className="col-md-12 col-sm-12 top-line-detail">
                                    {this.renderSetreference()}
                                </div>
                                <div className="col-md-12 col-sm-12 top-line-detail">
                                    {/*this.renderReleteproduct()*/}
                                </div>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12 padding-lf30">
                                    <div className={`${type != 'CER' ? 'line-border' : ''}`}></div>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12 padding-lf30">{/*this.renderAttr()*/}</div>
                                <div className="col-md-12 col-sm-12 col-xs-12 padding-lf30 maring-t15">{/*this.renderFooterDiamondsAttr()*/}</div>
                                <div className="col-md-12 col-sm-12 col-xs-12 padding-lf30 maring-t15">{/*this.renderFooterAttr()*/}</div>
                                <div className="col-md-12 col-sm-12 col-xs-12 padding-lf30 maring-t15">{/*this.renderFooterRawmatirialAttr()*/}</div>
                                <div id="dvContainer" className="hidden">
                                    <SetPrint productdetail={this.props.productdetail} lotNumbers={lotNumbers}
                                        pageSize={stonePageSize} activePage={stonActivePage}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.renderAlertmsgCer()}
                </div>
                <div className={`row ${!this.state.showmovement ? 'hide' : ''}`}>
                    <div className="col-sm-12">
                        <div className="panel panel-default">
                            <div className="panel-body padding-ft0">
                                <div className="col-md-4 col-sm-12">
                                    <div className="mg-tb thumbnaillgrid">
                                        <ReactImageFallback
                                           src={gallery.length !== 0 ? gallery[0].original :'/images/blank.gif' }
                                             fallbackImage="/images/blank.gif"
                                             initialImage="/images/blank.gif"
                                             width={200}
                                             height={200}
                                             className="img-responsive image-gallery-image" />
                                     </div>
                                </div>
                                <div className="col-md-8 col-sm-12">
                                    {/*this.renderDescmovement()*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SetSalesDetail.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state) {
    return {
        initialValues: state.productdetail,
        productdetail: state.productdetail.detail,
        productindex: state.productdetail.salessetindex,
        productindexplus: state.productdetail.salessetindexplus,
        productrelete: state.productdetail.relete,
        listCatalogName: state.productdetail.ListCatalogName,
        message: state.productdetail.message,
        //setreference:state.productdetail.setreference,
        //productreletepage: state.productdetail.reletepage,
        productlist: state.productdetail.salessetproductlist,
        lotNumbers: state.productdetail.lotNumbers,
        stonActivePage: state.productdetail.stonActivePage,
        totalpage: state.productdetail.salessettotalpage,
        stonePageSize: state.productdetail.stonePageSize,
        filterSearch: state.searchResult.paramsSearch,
        viewAsSet: state.searchResult.viewAsSet,
        allItems: state.searchResult.allItems
    }
}

module.exports = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'Pageform',
    fields: ['salessetpagego','reletepage','oldCatalogName','newCatalogName','validateCatalogName','stonepage'],
    validate:validateCatalog
},mapStateToProps,productdetailaction)(SetSalesDetail)
