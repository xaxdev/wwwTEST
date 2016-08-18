import React,{ Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button,FormControl,Pagination } from 'react-bootstrap';
import jQuery from 'jquery';
import { reduxForm,reset } from 'redux-form';
import * as gemstoneattrdetailaction from '../../actions/gemstoneattrdetailaction';
import ProductDescriptionBlock from '../../components/productdetail/productDescription';
import ProductJewelryAttributes from '../../components/productdetail/productJewalryAttributes';
import ProductStoneAttributes from '../../components/productdetail/productStoneAttributes';
import ProductWatchAttributes from '../../components/productdetail/productWatchAttributes.js';
import ProductGemstoneAttributes from '../../components/productdetail/productGemstonesAttributes';
//import ProductGemstonesReleteJewelry from '../../components/productdetail/productGemstonesReleteJewelry';
import ProductGallery from '../../components/productdetail/productGallery';
import ProductRelete from '../../components/productdetail/productReleted';
import ProductPrint from '../../components/productdetail/productPrint';
import ProductObaAttributes from '../../components/productdetail/productObaAttributes';
import ProductAccAttributes from '../../components/productdetail/productAccAttributes';
import ProductSppAttributes from '../../components/productdetail/productSppAttributes';
import Setreference from '../../components/productdetail/productset';
import numberFormat from '../../utils/convertNumberformatwithcomma';

import ProductDiamonsAttributes from  '../../components/productdetail/productDiamondsAttributes';
import ProductRawmatirialAttributes from  '../../components/productdetail/productRawmaterialAttributes';
import '../../../public/css/image-gallery.css';
import '../../../public/css/productdetail.css';
import '../../../public/css/magnific-popup.css';
import '../../utils/magnific-popup.js';


import checkInarrayObject from '../../utils/checkInarrayObject';
import checkInarrayObjectOther from '../../utils/checkInarrayObjectOther';

var Loading = require('react-loading');

class productreletedetail extends Component {

  constructor(props) {
    super(props);
    this.handleKeyPressNavigation = this.handleKeyPressNavigation.bind(this);
    this.handleGo = this.handleGo.bind(this);
    this.handleKeyChangeNavigation = this.handleKeyChangeNavigation.bind(this);
    this.state = {
      productdetailLoading: false
    };
  }

  componentDidMount() {

      const productId = this.props.params.id;
      const productlist = this.props.productlist;
      this.setState({
        productdetailLoading: true
      });
      this.props.getProductDetail(productId).then(()=>{
        this.setState({
          productdetailLoading: false
        });
        const  Detail  = this.props.productdetail;
        if(Detail.type != 'STO'){
        this.props.getProductRelete(Detail.subType,1,productId)
        }

        if(Detail.setReference){
          this.props.getSetreference(Detail.setReference,productId);
        }
      });


      jQuery('#zoomimg').magnificPopup({
        key: 'my-popup',
        items: {
          src: jQuery('<div class="white-popup m-pt"><div class="white-popup-left"><img id="galleryimg"/></div><div class="white-popup-right"><button id="btnup" class="btn btn-primary btn-radius">Up</button><button id="btndown" class="btn btn-primary btn-radius">Down</button><button id="btnzoom" class="btn btn-primary btn-radius" style="float:right">zoom</button></div></div>'),
          type: 'inline'
        },
        callbacks: {
          open: function() {
            let activegallery = jQuery('.active img').attr('src').replace("thumbnail", "original");
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
            var divContents = jQuery('#dvContainer').html();
            var printWindow = window.open('', '', 'height=400,width=800');
            printWindow.document.write('<html><head><title>Mouawad online</title>'+styleprint);
            printWindow.document.write('</head><body >');
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      const productId = nextProps.params.id;
      this.setState({
        productdetailLoading: true
      });
      const productlist = this.props.productlist;
      this.props.getProductDetail(productId).then(()=>{
        const  Detail  = this.props.productdetail;
        this.props.getProductRelete(Detail.subType,1,productId)

        if(Detail.setReference){
          this.props.getSetreference(Detail.setReference,productId);
        }

        this.setState({
          productdetailLoading: false
        });
      })
    }
  }


  renderDesc(){

    const  Detail  = this.props.productdetail;
    let  Detailtitle  = '';
    if(!Detail){
      return(
        <div><center><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><Loading type="spin" color="#202020" width="10%"/></center></div>
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
          case 'SPP':
              Detailtitle='SPARE PARTS DETAILS';
              return(
                  <div>
                    <h2>{Detailtitle}</h2>
                    <ProductDescriptionBlock {...Detail} />
                  </div>
                );
        }

    return(
        <div>

          <h2>{Detailtitle}</h2>
          <ProductDescriptionBlock Detail={Detail} />
        </div>
      );
   }

   renderAttr(){
     const  Detail  = this.props.productdetail;
     let  Attrtitle  = '';
     if(!Detail){
       return(
         <div><center><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><Loading type="spin" color="#202020" width="10%"/></center></div>
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
                  return(
                      <div>
                        <h2>{Attrtitle}</h2>
                            <ProductStoneAttributes {...Detail} />
                      </div>
                    );
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
         case 'SPP':
               Attrtitle='SPARE PARTS ART ATTRIBUTES';
               return(
                   <div>
                     <h2>{Attrtitle}</h2>
                         <ProductWatchAttributes {...Detail} />
                   </div>
                 );
        }
    }

    renderSetreference(){

      const setreference = this.props.setreference;
      // if(!setreference){
      //   return(
      //     <div><center><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><Loading type="spin" color="#202020" width="10%"/></center></div>
      //   );
      // }
      if(setreference.products.length > 0){
        return(
            <div>
              <h2>SET DETAILS</h2>
              <Setreference productset={setreference}/>
            </div>
          );
      } else {
        return(
            <div>

            </div>
          );
      }
    }

    renderFooterAttr(){

      const Detail  = this.props.productdetail;
      const gemstoneAttr = Detail.gemstones;
      const relatedJewelry = Detail.relatedJewelry;

      if(Detail.type == 'STO'){

      } else {
        if(!gemstoneAttr){
          return(
            <div><center><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><Loading type="spin" color="#202020" width="10%"/></center></div>
          );
        }
        if(gemstoneAttr.length > 0){
          if(checkInarrayObject("type","Stone",gemstoneAttr)){
        return(
            <div>
              <h2>GEMSTONES ATTRIBUTES</h2>
              <ProductGemstoneAttributes gemstoneAttrData={gemstoneAttr} />
            </div>
          );
        }
        }
      }

     }
     renderFooterDiamondsAttr(){

       const Detail  = this.props.productdetail;
       const gemstoneAttr = Detail.gemstones;
       const subType = Detail.subType;
       if(Detail.type == 'STO'){

       } else {
         if(!gemstoneAttr){
           return(
             <div><center><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><Loading type="spin" color="#202020" width="10%"/></center></div>
           );
         }
         if(gemstoneAttr.length > 0){
           if(checkInarrayObject("type","Loose Diamond",gemstoneAttr)){
           return(
               <div>
                 <h2>DIAMONDS ATTRIBUTES</h2>
                 <ProductDiamonsAttributes gemstoneAttrData={gemstoneAttr} />
               </div>
             );
           }
         } else {

         }
       }
     }

     renderFooterRawmatirialAttr(){

       const Detail  = this.props.productdetail;
       const gemstoneAttr = Detail.gemstones;
       const subType = Detail.subType;
       if(Detail.type == 'STO'){

       } else {
         if(!gemstoneAttr){
           return(
             <div><center><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><Loading type="spin" color="#202020" width="10%"/></center></div>
           );
         }
         if(gemstoneAttr.length > 0){
           if(checkInarrayObjectOther("type",gemstoneAttr)){
           return(
               <div>
                 <h2>RAWMATERIAL ATTRIBUTES</h2>
                 <ProductRawmatirialAttributes gemstoneAttrData={gemstoneAttr} />
               </div>
             );
           }
         } else {

         }
       }
     }
    renderImagegallery(){
        const { gallery } = this.props.productdetail;
        if(!gallery){
          return(
            <div><img src="/images/blank.gif" width="100%"/></div>
          );
        }

        if(gallery.length > 0 ) {
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
     renderReleteproduct(){

       const { totalpage,products,page } = this.props.productrelete;
       //const reletepage = this.props.productreletepage;
       const productId = this.props.params.id;
       const { type,collection,subType } = this.props.productdetail;
       const { fields: { reletepage },handleSubmit} = this.props;
       if(!products){
         return(
           <div><center><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><Loading type="spin" color="#202020" width="10%"/></center></div>
         );
       }

       if(type != 'STO' && products.length > 0){
       return(
           <div className="col-md-12 col-sm-12 nopadding">
              <h2>RELATED DETAILS</h2>
              <ProductRelete productrelte={products}/>
              <div className="searchresult-navi pagenavi relete col-md-12 col-sm-12 nopadding">
               <Pagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                items={totalpage}
                maxButtons={3}
                activePage={reletepage.defaultValue}
                onSelect={(eventKey) => { this.props.getProductRelete(subType,eventKey,productId); }} />
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

       }
    }

    handleGo(data){
      //e.preventDefault();
      const productId = this.props.params.id;
      const { totalpage} = this.props.productrelete;
      const getPage = parseInt(data.reletepage);
      const { collection } = this.props.productdetail;
      if((getPage <= totalpage) && (getPage != 0)){
      this.props.getProductRelete(collection,getPage,productId);
      }
    }

   handleKeyPressNavigation(event){
     if(event.key == 'Enter'){
       const productid = this.props.productlist[event.target.value-1].id;
       this.context.router.push(`/productdetail/${productid}`);
     }
   }
   handleKeyChangeNavigation(event){
     if(event.key == 'Enter'){
       const productid = this.props.productlist[event.target.value-1].id;
       this.context.router.push(`/productdetail/${productid}`);
     }
   }
   zoomicon() {
     const { gallery } = this.props.productdetail;
     var styles ={
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

   renderNavigation(){
     return(

        <div className="width-50 productreletedetail-width maring-t15">
                     <div className="col-md-12 col-sm-12 ft-white productdetail-search">
                       <Link to={'/searchresult'} className="btn btn-searchresult">Search Result</Link>
                     </div>
           </div>
         );
  }

  render(){
    const { totalpage,products,page } = this.props.productrelete;
    const reletepage = this.props.productreletepage;
    const productlist = this.props.productlist;
    const productId = this.props.params.id;
    const productIndex = this.props.productindex;
    const productindexplus = this.props.productindexplus;
    const { type} = this.props.productdetail;
    let pructdetailurl = '/productdetail/';

    return(
      <div id="page-wrapper">
        <div className="col-sm-12 bg-hearder bg-hearder-rel">
          <div className="col-md-5 col-sm-5 ft-white m-nopadding"><h1>PRODUCT DETAIL</h1></div>
          {this.renderNavigation()}
        </div>
        <div className={`${this.state.productdetailLoading == true ? '' : 'hidden'}` }>
          <center>
            <br/><br/><br/><br/><br/><br/>
              <Loading type="spin" color="#202020" width="10%"/>
          </center>
          <br/><br/><br/><br/><br/><br/>
        </div>
        <div className={`${this.state.productdetailLoading == true ? 'hidden' : 'row'}`}>

          <div className="col-sm-12">
              <div className="panel panel-default">
                  <div className="panel-body padding-ft0">
                        <div className="col-md-12 col-sm-12 icon-detail">
                          <a><div className="icon-add margin-l10"></div></a>
                          <a><div className="icon-print margin-l10" id="printproduct"></div></a>
                          {this.zoomicon()}
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
                           {this.renderReleteproduct()}
                          </div>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12 padding-lf30">
                          <div className="line-border"></div>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12 padding-lf30">{this.renderAttr()}</div>
                        <div className="col-md-12 col-sm-12 col-xs-12 padding-lf30 maring-t15">{this.renderFooterDiamondsAttr()}</div>
                        <div className="col-md-12 col-sm-12 col-xs-12 padding-lf30 maring-t15">{this.renderFooterAttr()}</div>
                        <div className="col-md-12 col-sm-12 col-xs-12 padding-lf30 maring-t15">{this.renderFooterRawmatirialAttr()}</div>
                          <div id="dvContainer" className="hidden">
                             <ProductPrint productdetail={this.props.productdetail}/>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>

    );
  }
}

function mapStateToProps(state) {

  return {
    initialValues: state.productdetail,
    productdetail: state.productdetail.detail,
    productrelete: state.productdetail.relete,
    setreference:state.productdetail.setreference
    //productreletepage: state.productdetail.reletepage
   }
}
module.exports = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'Pageform',
  fields: ['reletepage']
},mapStateToProps,gemstoneattrdetailaction)(productreletedetail)
