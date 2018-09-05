import React,{ Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, FormControl, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { reduxForm, reset } from 'redux-form';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import jQuery from 'jquery';
import moment from 'moment-timezone';
import * as productdetailaction from '../../actions/productdetailaction';
import ProductDescriptionBlock from '../../components/productdetail/productDescription';
import ProductDescriptionmovementBlock from '../../components/productdetail/productDescmovement'
import ProductDescriptioncerBlock from '../../components/productdetail/productDescriptioncer';
import ProductJewelryAttributes from '../../components/productdetail/productJewalryAttributes';
import ProductStoneAttributes from '../../components/productdetail/productStoneAttributes';
import ProductWatchAttributes from '../../components/productdetail/productWatchAttributes.js';
import ModalMyCatalog from '../../components/productdetail/modalMyCatalog';
import ModalShowImages from '../../components/productdetail/modalShowImages';
import ModalShowFilesPDF from '../../components/productdetail/modalShowFilesPDF';
import Modalalertmsg from '../../components/productdetail/modalalertmsg';
import ProductGallery from '../../components/productdetail/productGallery';
import ProductRelete from '../../components/productdetail/productReleted';
import ProductPrint from '../../components/productdetail/productPrint';
import ProductObaAttributes from '../../components/productdetail/productObaAttributes';
import ProductAccAttributes from '../../components/productdetail/productAccAttributes';
import ProductSpaAttributes from '../../components/productdetail/productSppAttributes';
import Setreference from '../../components/productdetail/productset';
import numberFormat from '../../utils/convertNumberformatwithcomma';
import checkInarrayObject from '../../utils/checkInarrayObject';
import checkInarrayObjectOther from '../../utils/checkInarrayObjectOther';
import ProductGemstoneAttributes from '../../components/productdetail/productGemstonesAttributes';
import ProductDiamonsAttributes from  '../../components/productdetail/productDiamondsAttributes';
import ProductRawmatirialAttributes from  '../../components/productdetail/productRawmaterialAttributes';
import ReactImageFallback from 'react-image-fallback';
import validateCatalog from '../../utils/validatecatalogproductdetail';
import ModalalertMsgObj from '../../utils/modalalertmsg';
import Movementlist from '../../components/productdetail/productmovement.js';
import Goclist from '../../components/productdetail/productgoc.js'
import '../../../public/css/image-gallery.css';
import '../../../public/css/productdetail.css';
import '../../../public/css/magnific-popup.css';
import '../../utils/magnific-popup.js';

const Loading = require('react-loading');

class productdetail extends Component {
    constructor(props) {
        super(props);

        this.handleKeyPressNavigation = this.handleKeyPressNavigation.bind(this);
        this.handleGo = this.handleGo.bind(this);
        this.handleClickPageination = this.handleClickPageination.bind(this);
        this.handleKeyPage = this.handleKeyPage.bind(this);

        this.state = {
            productdetailLoading: false,
            isOpenAddMyCatalog: false,
            isOpenAddMyCatalogmsg: false,
            isOpenDownloadCerMsg: false,
            showmovement: false,
            showCOA: false,
            showDBC: false,
            showMonograph: false
        };
    }

    componentWillMount = _ => {
        const productId = this.props.params.id;
        const { allItems } =  this.props;
        const productlist = allItems;
        this.setState({ productdetailLoading: true });

        this.props.getProductDetail(productId,productlist).then(()=>{
            const  Detail  = this.props.productdetail;
            const { lotNumbers } = this.props.productdetail;
            const { stonePageSize } = this.props;
            const params = { datas: lotNumbers, page: 1, size: !!stonePageSize ? stonePageSize : 20 };
            this.props.getLotNaumberPerPage(params);
            if(Detail.type != 'STO' || Detail.type != 'CER'){
                const logindata = sessionStorage.logindata ? JSON.parse(sessionStorage.logindata) : null;
                const currency = logindata.currency;
                if(Detail.dominant){
                    this.props.getProductRelete(Detail.subType,1,productId,Detail.dominant,currency,Detail.price[currency]);
                }
            }
            this.setState({ productdetailLoading: false });
        });
    }

    componentDidMount = _ => {
        jQuery('#zoomimg').magnificPopup({
            key: 'my-popup',
            items: {
                src: jQuery(
                    `<div class="white-popup m-pt">
                        <div class="white-popup-left">
                            <img id="galleryimg"/>
                        </div>
                        <div class="white-popup-right">
                            <button id="btnup" class="btn btn-primary btn-radius">Up</button>
                            <button id="btndown" class="btn btn-primary btn-radius">Down</button>
                            <button id="btnzoom" class="btn btn-primary btn-radius" style="float:right">zoom</button>
                        </div>
                    </div>`
                ),
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
                src: jQuery(
                    `<div class="white-popup m-pt">
                        <div class="white-popup-left">
                            <img id="galleryimgset"/>
                        </div>
                        <div class="white-popup-right">
                            <button id="btnupset" class="btn btn-primary btn-radius">Up</button>
                            <button id="btndownset" class="btn btn-primary btn-radius">Down</button>
                            <button id="btnzoomset" class="btn btn-primary btn-radius" style="float:right">zoom</button>
                        </div>
                    </div>`
                ),
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
            this.setState({ productdetailLoading: true });
            const productId = nextProps.params.id;
            const { allItems } =  this.props;
            const productlist = allItems;

            this.props.getProductDetail(productId,productlist).then(()=>{
                const  Detail  = this.props.productdetail;
                const { lotNumbers } = this.props.productdetail;
                const { stonePageSize } = this.props;
                const params = {
                    datas: lotNumbers, page: 1, size: !!stonePageSize ? stonePageSize : 20
                };
                this.props.getLotNaumberPerPage(params);
                const logindata = sessionStorage.logindata ? JSON.parse(sessionStorage.logindata) : null;
                const currency = logindata.currency;

                if(Detail.dominant){
                    this.props.getProductRelete(Detail.subType,1,productId,Detail.dominant,currency,Detail.price[currency]);
                }

                this.setState({ productdetailLoading: false });
            });
        }
    }

    renderDesc = _ => {
        const  Detail  = this.props.productdetail;
        let  Detailtitle  = '';
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
                Detailtitle='JEWELRY DETAILS';
                return(
                    <div>
                        <h2>{Detailtitle}</h2>
                        <ProductDescriptionBlock {...Detail} />
                    </div>
                );
            case 'STO':
                Detailtitle='STONE DETAILS';
                return(
                    <div>
                        <h2>{Detailtitle}</h2>
                        <ProductDescriptionBlock {...Detail} />
                    </div>
                );
            case 'WAT':
                Detailtitle='WATCH DETAILS';
                return(
                    <div>
                        <h2>{Detailtitle}</h2>
                        <ProductDescriptionBlock {...Detail} />
                    </div>
                );
            case 'OBA':
                Detailtitle='OBJECT OF ART DETAILS';
                return(
                    <div>
                        <h2>{Detailtitle}</h2>
                        <ProductDescriptionBlock {...Detail} />
                    </div>
                );
            case 'ACC':
                Detailtitle='ACCESSORY DETAILS';
                return(
                    <div>
                        <h2>{Detailtitle}</h2>
                        <ProductDescriptionBlock {...Detail} />
                    </div>
                );
            case 'SPA':
                Detailtitle='SPARE PARTS DETAILS';
                return(
                    <div>
                        <h2>{Detailtitle}</h2>
                        <ProductDescriptionBlock {...Detail} />
                    </div>
                );
            case 'CER':
                Detailtitle='CERTIFICATE DETAILS';
                return(
                    <div>
                        <h2>{Detailtitle}</h2>
                        <ProductDescriptioncerBlock {...Detail} />
                    </div>
                );
            }
    }

    renderDescmovement = _ => {
        const  Detail  = this.props.productdetail;
        let  Detailtitle  = '';
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
                Detailtitle='JEWELRY DETAILS';
                return(
                    <div>
                      <h2>{Detailtitle}</h2>
                      <ProductDescriptionmovementBlock {...Detail} />
                    </div>
                );
            case 'STO':
                Detailtitle='STONE DETAILS';
                return(
                    <div>
                        <h2>{Detailtitle}</h2>
                        <ProductDescriptionmovementBlock {...Detail} />
                    </div>
                );
            case 'WAT':
                Detailtitle='WATCH DETAILS';
                return(
                    <div>
                        <h2>{Detailtitle}</h2>
                        <ProductDescriptionmovementBlock {...Detail} />
                    </div>
                );
            case 'OBA':
                Detailtitle='OBJECT OF ART DETAILS';
                return(
                    <div>
                        <h2>{Detailtitle}</h2>
                        <ProductDescriptionmovementBlock {...Detail} />
                    </div>
                );
            case 'ACC':
                Detailtitle='ACCESSORY DETAILS';
                return(
                    <div>
                      <h2>{Detailtitle}</h2>
                      <ProductDescriptionmovementBlock {...Detail} />
                    </div>
                  );
            case 'SPA':
                Detailtitle='SPARE PARTS DETAILS';
                return(
                    <div>
                        <h2>{Detailtitle}</h2>
                        <ProductDescriptionmovementBlock {...Detail} />
                    </div>
                );
            case 'CER':
                Detailtitle='CERTIFICATE DETAILS';
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
                const params = { datas: lotNumbers, page: Number(stonepage.value), size: stonePageSize };
                this.props.getLotNaumberPerPage(params);
            }
        }
    }

    renderAttr = _ => {
        const { fields:{ stonepage }, lotNumbers, stonActivePage, submitting, totalpage, stonePageSize,filterSearch } = this.props;
        const  Detail  = this.props.productdetail;

        let  Attrtitle  = '';
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
                Attrtitle='JEWELRY ATTRIBUTES';
                return(
                    <div>
                        <h2>{Attrtitle}</h2>
                        <ProductJewelryAttributes {...Detail} />
                    </div>
                );
            case 'STO':
                Attrtitle='STONE ATTRIBUTES';
                if (lotNumbers.length > 0) {
                    return(
                        <div>
                            <h2>{Attrtitle}</h2>
                            <ProductStoneAttributes Detail={Detail} pageSize={stonePageSize} totalpage={totalpage} lotNumbers={lotNumbers}
                                onClickPage={this.handleClickPageination} activePage={stonActivePage} onKeyPage={this.handleKeyPage}
                                stonepage={stonepage}/>
                        </div>
                      );
                }else{
                    return(<div></div>);
                }
            case 'WAT':
                Attrtitle='WATCH ATTRIBUTES';
                return(
                    <div>
                        <h2>{Attrtitle}</h2>
                        <ProductWatchAttributes {...Detail} />
                    </div>
                );
            case 'OBA':
                Attrtitle='OBJECT OF ART ATTRIBUTES';
                return(
                    <div>
                        <h2>{Attrtitle}</h2>
                        <ProductObaAttributes {...Detail} />
                    </div>
                );
            case 'ACC':
                Attrtitle='ACCESSORY ATTRIBUTES';
                return(
                    <div>
                        <h2>{Attrtitle}</h2>
                        <ProductAccAttributes {...Detail} />
                    </div>
                );
            case 'SPA':
                Attrtitle='SPARE PARTS ATTRIBUTES';
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
                const isSpecialDisc = setReferenceData.specialDiscount != undefined ? setReferenceData.specialDiscount == 1?true:false : false;
                return(
                    <div>
                        <h2>SET DETAILS</h2>
                        <div className="tagbar-special-detail">
                            <span className={`${isSpecialDisc?'tagbar-special-detail-gallery special-detail-set':''}`}></span>
                            <div id="popupset" onClick={this.clickSet} className="col-md-3 col-sm-3 bd-img nopadding"  >
                                <input id="totalsetprice" type="hidden" value={setReferenceData.totalprice['USD'] ? parseInt(setReferenceData.totalprice['USD']) : '-'} />
                                <ReactImageFallback id="imgset" src={setReferenceData.setimage ? setReferenceData.setimage :'/images/blank.gif' }
                                    fallbackImage="/images/blank.gif" initialImage="/images/blank.gif" width={120} height={120} className="img-responsive" />
                            </div>
                        </div>
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
                src: jQuery(
                    `<div class="white-popup m-pt">
                        <div class="white-popup-left">
                            <img id="galleryimgset"/>
                            <div id="showtotal"></div>
                        </div>
                        <div class="white-popup-right">
                            <button id="btnupset" class="btn btn-primary btn-radius">Up</button>
                            <button id="btndownset" class="btn btn-primary btn-radius">Down</button>
                            <button id="btnzoomset" class="btn btn-primary btn-radius" style="float:right">zoom</button>
                        </div>
                    </div>`
                ),
                type: 'inline'
            },
            callbacks: {
                open: function() {
                    let activegallery = jQuery('#imgset').attr('src');
                    let totalprice = jQuery('#totalsetprice').val();

                    const logindata = sessionStorage.logindata ? JSON.parse(sessionStorage.logindata) : null;
                    const currency = logindata.currency;

                    jQuery('#galleryimgset').attr('src',activegallery);
                    jQuery('#showtotal').text('Total Price (Set): '+numberFormat(totalprice)+' '+'USD');
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
                            <ProductDiamonsAttributes gemstoneAttrData={gemstoneAttr} onClick={this.downloadCer} />
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

    renderImageGalleryCOA = _ =>{
        const { imagesCOA } = this.props.productdetail;

        return(
            <ModalShowImages images={imagesCOA} isOpen={this.state.showCOA} isClose={this.handleCloseShowCOA} productId={this.props.params.id}
                getCertificate={this.props.getCertificate}/>
        );

    }

    renderImageGalleryDBC = _ => {
        const { imagesDBC } = this.props.productdetail;

        return(
            <ModalShowImages images={imagesDBC} isOpen={this.state.showDBC} isClose={this.handleCloseShowDBC}
               productId={this.props.params.id} getCertificate={this.props.getCertificate}/>
        );
    }

    renderFilesMonograph = _ => {
        const { filesMonograph } = this.props.productdetail;

        return(
            <ModalShowFilesPDF files={filesMonograph} isOpen={this.state.showMonograph} isClose={this.handleCloseShowMonograph} />
        );
    }

    renderReleteproduct = _ => {
        const { totalpage,products,page } = this.props.productrelete;
        const productId = this.props.params.id;
        const { type,collection,subType,price,dominant } = this.props.productdetail;
        const { fields: { reletepage },handleSubmit} = this.props;

        const logindata = sessionStorage.logindata ? JSON.parse(sessionStorage.logindata) : null;
        const currency = logindata.currency;

        if(type != 'STO' && !products && type != 'CER'){
            return(<div></div>);
        }
        if(type != 'STO' && dominant && type != 'CER' && products.length >= 1){
            return(
                <div className="col-md-12 col-sm-12 nopadding">
                    <h2>RELATED DETAILS</h2>
                    <ProductRelete productrelte={products}/>
                    <div className="searchresult-navi pagenavi relete col-md-12 col-sm-12 nopadding">
                        <Pagination prev next first last ellipsis boundaryLinks items={totalpage} maxButtons={3} activePage={reletepage.defaultValue}
                            onSelect={(eventKey) => {
                                this.props.getProductRelete(subType,eventKey,productId,dominant,currency,price[currency]);
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
            return(<div></div>);
        }
    }

    renderNavigation = _ => {
        const productlist = this.props.productlist;
        const productId = this.props.params.id;
        const productIndex = this.props.productindex;
        const productindexplus = this.props.productindexplus;
        const { type} = this.props.productdetail;
        let pructdetailurl = '/productdetail/';
        const { fields: { pagego },handleSubmit} = this.props;

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
                        <Link to={'/searchresult'} className="btn btn-searchresult">Search Result</Link>
                    </div>
                    <div className={`margin-t5 text-center m-none display-right padding-lf15 ${productIndex == 0?'hidden':''}`}>
                        <span className="bar-line">|</span>
                    </div>
                    <div className="display-right">
                        <div className={`float-l bar-detail-pre ${productIndex == 0?'hidden':''}`}>
                            <Link className={productIndex == 0?'disabled-link':''} to={{pathname: productIndex != 0 ?`${pructdetailurl}${(productlist[productIndex-1].id != undefined)? productlist[productIndex-1].id:''}`:''}}><span className="icon-back"></span></Link>
                        </div>
                        <div className="float-l bar-detail-text">
                            <div className="float-l productdetailpage text-center nopadding">
                                <form onSubmit={handleSubmit(this.handleKeyPressNavigation)} >
                                    <input type="number" {...pagego} />
                                </form>
                            </div>
                            <div className="float-l fc-fff margin-t5 text-center nopadding">
                                of {numberFormat(productlist.length)} items
                            </div>
                        </div>
                        <div className={`float-l bar-detail-pre ${productIndex+1 >= productlist.length?'hidden':''}`}>
                            <Link className={productIndex+1 >= productlist.length?'disabled-link':''} to={{pathname: productIndex+1 < productlist.length ? `${pructdetailurl}${(productlist[productIndex+1].id != undefined)? productlist[productIndex+1].id:''}` : ''}}><span className="icon-next"></span></Link>
                        </div>
                    </div>
                </div>
            );
        }
    }

    addMyCatalog = _=> {
        this.props.getCatalogNameSetItem().then(() =>{
            const { fields: { oldCatalogName,newCatalogName,validateCatalogName } } = this.props;

            this.setState({isOpenAddMyCatalog: true});
            oldCatalogName.value = '';
            newCatalogName.value = '';
        });
    }

    showmovement = _ => {
        this.setState({ showmovement: true });
    }

    hidemovement = _ => {
        this.setState({ showmovement: false });
    }

    handleClose = _=> {
        this.setState({ isOpenAddMyCatalog: false });
    }

    handleSubmitCatalog = (e) => {
        e.preventDefault();
        this.setState({isOpenAddMyCatalog: false});
        const { fields: { oldCatalogName,newCatalogName,validateCatalogName } } = this.props;
        const  Detail  = this.props.productdetail;
        const  listCatalogName  = this.props.listCatalogName;
        let oldCatalogTitle = ''
        if (oldCatalogName.value) {
            oldCatalogTitle = listCatalogName.find(catalogname => catalogname._id === oldCatalogName.value)
        }

        const catalogdata = {
            id:!!oldCatalogName.value ? oldCatalogName.value:null,
            catalog: !!oldCatalogName.value ? oldCatalogTitle.catalog:newCatalogName.value,
            items:[
                {
                    id:Detail.id,
                    reference:Detail.reference,
                    description:Detail.description
                }
            ]
        }
        this.props.addCatalog(catalogdata).then( () =>{
            this.setState({isOpenAddMyCatalogmsg: true});
        })
    }

    handleClosemsg = _=> {
       this.setState({isOpenAddMyCatalogmsg: false});
    }

    renderAddMyCatalog = _ =>{
        const { listCatalogName, submitting } = this.props;

        return(
            <ModalMyCatalog onSubmit={this.handleSubmitCatalog} listCatalogName={listCatalogName}
                isOpen={this.state.isOpenAddMyCatalog} isClose={this.handleClose} props={this.props}/>
        );
    }

    renderAlertmsg = _ =>{
        const { message } = this.props;
        return(
            <Modalalertmsg isOpen={this.state.isOpenAddMyCatalogmsg} isClose={this.handleClosemsg}
                props={this.props} message={message}/>
        );
    }

    handleGo = (data) => {
        const productId = this.props.params.id;
        const { totalpage} = this.props.productrelete;
        const getPage = parseInt(data.reletepage);
        const { collection,subType,price,dominant } = this.props.productdetail;
        if((getPage <= totalpage) && (getPage != 0)){
            const logindata = sessionStorage.logindata ? JSON.parse(sessionStorage.logindata) : null;
            const currency = logindata.currency;
            this.props.getProductRelete(subType,getPage,productId,dominant,currency,price[currency]);
        }
    }

    handleKeyPressNavigation = (data) => {
        const { pagego} = data;
        const productid = this.props.productlist[parseInt(pagego)-1].id;
        this.context.router.push(`/productdetail/${productid}`);
    }

    zoomicon = _ => {
        const { gallery } = this.props.productdetail;
        const styles ={
            displaynone:{ display:'none' }
        };
        if(!!gallery && gallery.length > 0){
            return(
                <div>
                    <a>
                        <OverlayTrigger placement="bottom" overlay={tooltipZoom}>
                            <div className="icon-zoom margin-l10" id="zoomimg"></div>
                        </OverlayTrigger>
                    </a>
                </div>
            );
        } else {
            return(
                <div>
                    <a style={styles.displaynone}>
                        <OverlayTrigger placement="bottom" overlay={tooltipZoom}>
                            <div className="icon-zoom margin-l10" id="zoomimg"></div>
                        </OverlayTrigger>
                    </a>
                </div>
            );
        }
    }

    showImageGalleryCOA = _=> {
        this.setState({ showCOA:true })
    }

    handleCloseShowCOA = _=> {
        this.setState({ showCOA:false })
    }

    showImageGalleryDBC = _=> {
        this.setState({ showDBC:true })
    }

    handleCloseShowDBC = _=> {
        this.setState({ showDBC:false })
    }

    showFilesMonograph = _=> {
        this.setState({ showMonograph:true })
    }

    handleCloseShowMonograph = _=> {
        this.setState({ showMonograph:false })
    }

    imagesCOAIcon = _ => {
        const { imagesCOA } = this.props.productdetail;
        const styles ={
            displaynone:{ display:'none' }
        };
        if(!!imagesCOA && imagesCOA.length > 0){
            return(
                <div>
                    <a>
                        <OverlayTrigger placement="bottom" overlay={tooltipCOA}>
                            <div className="icon-coa margin-l10" id="imagesCOA" onClick={this.showImageGalleryCOA} >
                            </div>
                        </OverlayTrigger>
                    </a>
                </div>
            );
        } else {
            return(
                <div>
                    <a style={styles.displaynone}><div className="icon-coa margin-l10" id="imagesCOA"></div></a>
                </div>
            );
        }
    }

    imagesDBCIcon = _ => {
        const { imagesDBC } = this.props.productdetail;
        const styles ={
            displaynone:{ display:'none' }
        };
        if(!!imagesDBC && imagesDBC.length > 0){
            return(
                <div>
                    <a>
                        <OverlayTrigger placement="bottom" overlay={tooltipDBC}>
                            <div className="icon-dbc margin-l10" id="imagesDBC" onClick={this.showImageGalleryDBC} >
                            </div>
                        </OverlayTrigger>
                    </a>
                </div>
            );
        } else {
            return(
                <div>
                    <a style={styles.displaynone}><div className="icon-dbc margin-l10" id="imagesDBC"></div></a>
                </div>
            );
        }
    }

    filesMonographIcon = _ => {
        const { filesMonograph } = this.props.productdetail;
        const styles ={
            displaynone:{ display:'none' }
        };
        if(!!filesMonograph && filesMonograph.length > 0){
            return(
                <div>
                    <a>
                        <OverlayTrigger placement="bottom" overlay={tooltipMonograph}>
                            <div className="icon-filesMonograph margin-l10" id="filesMonograph" onClick={this.showFilesMonograph} >
                            </div>
                        </OverlayTrigger>
                    </a>
                </div>
            );
        } else {
            return(
                <div>
                    <a style={styles.displaynone}><div className="icon-filesMonograph margin-l10" id="filesMonograph"></div></a>
                </div>
            );
        }
    }

    downloadCertificateAll = _=> {
        const userLogin = JSON.parse(sessionStorage.logindata);
        const host = HOSTNAME || 'localhost';
        const ROOT_URL = (host != 'mol.mouawad.com')? `http://${host}:${(ENVIRONMENT!='staging')?3005:4005}`: `http://${host}`;
        const { gemstones } = this.props.productdetail;
        const productId = this.props.params.id;

        let exportDate = moment().tz('Asia/Bangkok').format('YYYYMMDD_HHmmss');
        let allCer = [];
        if(gemstones != undefined){
            gemstones.map((item) => {
                if (!!item.certificate) {
                    item.certificate.images.map((img) => {
                        allCer.push(img.original.replace('/images/products/original',''));
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
            'productId': productId
        }

        this.props.getCertificate(params).then((value) => {
            if (value) {
                this.setState({isOpenDownloadCerMsg: true});
            }
            console.log(value);
        });
    }

    renderAlertmsgCer = _ => {
        const message = 'Please check your email for download certificate.';
        const title = 'DOWNLOAD CERTIFICATE';
        return(
            <ModalalertMsgObj isOpen={this.state.isOpenDownloadCerMsg} isClose={this.handleCloseDownloadCerMsg}
                props={this.props} message={message}  title={title}/>
        );
    }

    handleCloseDownloadCerMsg = _=> {
        this.setState({ isOpenDownloadCerMsg: false });
    }

    downloadCer = (id, e) => {
        const userLogin = JSON.parse(sessionStorage.logindata);
        const host = HOSTNAME || 'localhost';
        const ROOT_URL = (host != 'mol.mouawad.com')? `http://${host}:${(ENVIRONMENT!='staging')?3005:4005}`: `http://${host}`;
        const { gemstones } = this.props.productdetail;
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
            'productId': productId
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
        const { type, setReference, gemstones,activities } = this.props.productdetail;
        let { gallery } = this.props.productdetail;
        const { lotNumbers, stonePageSize, stonActivePage } = this.props;
        let isCertificate = false;
        let countImages = 0;
        let imageCerDownload = '';
        let imageName = '';

        if (!gallery) {
            gallery = [];
        }

        if(gemstones != undefined){
            countImages = 0;
            gemstones.map((item) => {
                if (!!item.certificate) {
                    if (item.certificate.images != undefined) {
                        isCertificate = true;
                        countImages++;

                        if (countImages == 1) {
                            imageCerDownload = `/original/${item.certificate.images[0].original.split('/').slice(-1).pop()}`;
                            imageName = `${item.certificate.images[0].original.split('/').slice(-1).pop()}`;
                        }
                    }
                }
            });
        }
        let pructdetailurl = '/productdetail/';
        return(
            <div id="page-wrapper">
                <div className="col-sm-12 bg-hearder m-prodcutdetail">
                    <div className="col-md-5 col-md-4 col-sm-5 ft-white m-nopadding">
                        <h1>{`${ this.state.showmovement ? 'MOVEMENT ACTIVITY' : 'PRODUCT DETAIL'}`}</h1>
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
                    {this.renderAddMyCatalog()}
                    {this.renderAlertmsg()}
                    <div className="col-sm-12">
                        <div className="panel panel-default">
                            <div className="panel-body padding-ft0">
                                <div className="col-md-12 col-sm-12 icon-detail">
                                    <a>
                                        <OverlayTrigger placement="bottom" overlay={tooltipAddCatalog}>
                                            <div className="icon-add margin-l10" onClick={ this.addMyCatalog }></div>
                                        </OverlayTrigger>
                                    </a>
                                    <a>
                                        <OverlayTrigger placement="bottom" overlay={tooltipPrint}>
                                            <div className="icon-print margin-l10" id="printproduct"></div>
                                        </OverlayTrigger>
                                    </a>
                                    {this.zoomicon()}
                                    {isCertificate
                                        ? countImages != 1
                                            ?   <a>
                                                    <OverlayTrigger placement="bottom" overlay={tooltipCertificate}>
                                                        <div className="icon-certificate margin-l10" onClick={ this.downloadCertificateAll }></div>
                                                    </OverlayTrigger>
                                                </a>
                                            :   <a href={imageCerDownload} download={imageName} >
                                                    <OverlayTrigger placement="bottom" overlay={tooltipCertificate}>
                                                        <div className="icon-certificate margin-l10"/>
                                                    </OverlayTrigger>
                                                </a>
                                        :
                                        <a><div className=""></div></a>
                                    }
                                    {this.imagesCOAIcon()}
                                    {this.imagesDBCIcon()}
                                    {this.filesMonographIcon()}
                                    <a>
                                        <OverlayTrigger placement="bottom" overlay={tooltipMovement}>
                                            <div className={`${ userLogin.movement ? 'icon-movement margin-l10' : 'hidden'}`} onClick={ this.showmovement }></div>
                                        </OverlayTrigger>
                                    </a>
                                </div>
                                <div className="col-md-6 col-sm-12">{this.renderImagegallery()}</div>
                                <div className="col-md-6 col-sm-12">{this.renderImageGalleryCOA()}</div>
                                <div className="col-md-6 col-sm-12">{this.renderImageGalleryDBC()}</div>
                                <div className="col-md-6 col-sm-12">{this.renderFilesMonograph()}</div>
                                <div className="col-md-6 col-sm-12">
                                    <div className="col-md-12 col-sm-12"> {this.renderDesc()} </div>
                                    <div className={`${type != 'JLY' || !setReference ? 'hidden' : 'col-md-12 col-sm-12 top-line-detail'}`}>
                                        {this.renderSetreference()}
                                    </div>
                                    <div className="col-md-12 col-sm-12 top-line-detail"> {this.renderReleteproduct()} </div>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12 padding-lf30">
                                    <div className={`${type != 'CER' ? 'line-border' : ''}`}> </div>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12 padding-lf30">{this.renderAttr()}</div>
                                <div className="col-md-12 col-sm-12 col-xs-12 padding-lf30 maring-t15">{this.renderFooterDiamondsAttr()}</div>
                                <div className="col-md-12 col-sm-12 col-xs-12 padding-lf30 maring-t15">{this.renderFooterAttr()}</div>
                                <div className="col-md-12 col-sm-12 col-xs-12 padding-lf30 maring-t15">{this.renderFooterRawmatirialAttr()}</div>
                                <div id="dvContainer" className="hidden">
                                    <ProductPrint productdetail={this.props.productdetail}
                                        lotNumbers={lotNumbers} pageSize={stonePageSize} activePage={stonActivePage}/>
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
                                        <ReactImageFallback src={gallery.length !== 0 ? gallery[0].original :'/images/blank.gif' }
                                            fallbackImage="/images/blank.gif" initialImage="/images/blank.gif" width={200} height={200}
                                            className="img-responsive image-gallery-image" />
                                     </div>
                                </div>
                                <div className="col-md-8 col-sm-12"> {this.renderDescmovement()} </div>
                                <div className="col-md-12 col-sm-12 col-xs-12 padding-lf30 maring-t15">
                                    <h2>CUSTOMER VIEWINGS</h2>
                                    { !!activities && !!activities.goc &&
                                        <Goclist list={activities.goc}/>
                                    }
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12 padding-lf30 maring-t15">
                                    <h2>INTERCOMPANY TRANSFERS</h2>
                                    { !!activities && !!activities.movement &&
                                        <Movementlist list={activities.movement}/>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const tooltipAddCatalog = (<Tooltip id="tooltip"><strong>Add to Catalog</strong></Tooltip>);
const tooltipPrint = (<Tooltip id="tooltip"><strong>Preview & Print</strong></Tooltip>);
const tooltipZoom = (<Tooltip id="tooltip"><strong>Zoom</strong></Tooltip>);
const tooltipMovement = (<Tooltip id="tooltip"><strong>Movement & Activiy</strong></Tooltip>);
const tooltipCertificate = (<Tooltip id="tooltip"><strong>Download Certificate</strong></Tooltip>);
const tooltipCOA = (<Tooltip id="tooltip"><strong>Certificate of Authencity</strong></Tooltip>);
const tooltipDBC = (<Tooltip id="tooltip"><strong>Diamond Birth Certificate</strong></Tooltip>);
const tooltipMonograph = (<Tooltip id="tooltip"><strong>Monograph</strong></Tooltip>);

productdetail.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state) {
    return {
        initialValues: state.productdetail,
        productdetail: state.productdetail.detail,
        productindex: state.productdetail.index,
        productindexplus: state.productdetail.indexplus,
        productrelete: state.productdetail.relete,
        listCatalogName: state.productdetail.ListCatalogName,
        message: state.productdetail.message,
        productlist: state.productdetail.productlist,
        lotNumbers: state.productdetail.lotNumbers,
        stonActivePage: state.productdetail.stonActivePage,
        totalpage: state.productdetail.totalpage,
        stonePageSize: state.productdetail.stonePageSize,
        filterSearch: state.searchResult.paramsSearch,
        ItemsOrder: state.searchResult.itemsOrder,
        SetReferencdOrder: state.searchResult.setReferenceOrder,
        allItems: state.searchResult.allItems
    }
}

module.exports = reduxForm({
    form: 'Pageform',
    fields: ['pagego','reletepage','oldCatalogName','newCatalogName','validateCatalogName','stonepage'],
    validate:validateCatalog
},mapStateToProps,productdetailaction)(productdetail)
