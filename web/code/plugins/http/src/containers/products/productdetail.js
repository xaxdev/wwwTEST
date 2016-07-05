import React,{ Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button,FormControl,Pagination } from 'react-bootstrap';
import jQuery from 'jquery';
import { reduxForm,reset } from 'redux-form';
import * as productdetailaction from '../../actions/productdetailaction';
import ProductDescriptionBlock from '../../components/productdetail/productDescription';
import ProductJewelryAttributes from '../../components/productdetail/productJewalryAttributes';
import ProductStoneAttributes from '../../components/productdetail/productStoneAttributes';
import ProductWatchAttributes from '../../components/productdetail/productWatchAttributes.js';
import ProductGemstoneAttributes from '../../components/productdetail/productGemstonesAttributes';
import ProductGemstonesReleteJewelry from '../../components/productdetail/productGemstonesReleteJewelry';
import ProductGallery from '../../components/productdetail/productGallery';
import ProductRelete from '../../components/productdetail/productReleted';
import ProductPrint from '../../components/productdetail/productPrint';
import ProductObaAttributes from '../../components/productdetail/productObaAttributes';
import ProductAccAttributes from '../../components/productdetail/productAccAttributes';
import ProductSppAttributes from '../../components/productdetail/productSppAttributes';

import '../../../public/css/image-gallery.css';
import '../../../public/css/productdetail.css';
import '../../../public/css/magnific-popup.css';
import '../../utils/magnific-popup.js';


class productdetail extends Component {

  constructor(props) {
    super(props);
    this.handleKeyPressNavigation = this.handleKeyPressNavigation.bind(this);
    this.handleGo = this.handleGo.bind(this);
  }

  componentDidMount() {

      const productId = this.props.params.id;
      const productlist = JSON.parse(sessionStorage.navigation);
      this.props.getProductDetail(productId,productlist).then(()=>{
        const  Detail  = this.props.productdetail;
        this.props.getProductRelete(Detail.collection,1)
      });


      jQuery('#zoomimg').magnificPopup({
        key: 'my-popup',
        items: {
          src: jQuery('<div class="white-popup m-pt"><img width="600px" id="galleryimg"/><button id="btnup" class="btn btn-primary btn-radius">Up</button><button id="btndown" class="btn btn-primary btn-radius">Down</button></div>'),
          type: 'inline'
        },
        callbacks: {
          open: function() {
            jQuery('#galleryimg').attr('src',jQuery('.active img').attr('src'));
            let rotatecount = 0;
            jQuery('#btnup').click(function(){
              jQuery('#galleryimg').css({'-webkit-transform': 'rotate('+(rotatecount+=90)+'deg)'});
            });
            jQuery('#btndown').click(function(){

              jQuery('#galleryimg').css({'-webkit-transform': 'rotate('+(rotatecount-=90)+'deg)'});
            });
          }
        }
      });

      jQuery('#printproduct').click( function(){

            var divContents = jQuery('#dvContainer').html();
            var printWindow = window.open('', '', 'height=800,width=800');
            printWindow.document.write('<html><head><title>Mol online 2016</title>');
            printWindow.document.write('</head><body >');
            printWindow.document.write(divContents);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
      });



  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      const productId = nextProps.params.id;
      const productlist = this.props.productlist;
      this.props.getProductDetail(productId,productlist).then(()=>{
        const  Detail  = this.props.productdetail;
        this.props.getProductRelete(Detail.collection,1)
      })
    }
  }
  renderDesc(){

    const  Detail  = this.props.productdetail;
    let  Detailtitle  = '';
    if(!Detail){
      return(
        <div>Loading...</div>
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
   }
   renderAttr(){
     const  Detail  = this.props.productdetail;
     let  Attrtitle  = '';
     if(!Detail){
       return(
         <div>Loading...</div>
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
                         <ProductSppAttributes {...Detail} />
                   </div>
                 );
        }
    }

    renderFooterAttr(){

      const Detail  = this.props.productdetail;
      const gemstoneAttr = Detail.gemstones;
      const relatedJewelry = Detail.relatedJewelry;

      if(Detail.type == 'STO'){
        // if(!relatedJewelry){
        //   return(
        //     <div>Loading...</div>
        //   );
        // }
        // return(
        //     <div>
        //       <h2>RELATED JEWELRY</h2>
        //       <ProductGemstonesReleteJewelry gemstoneAttrData={relatedJewelry} />
        //     </div>
        //   );
      } else {
        if(!gemstoneAttr){
          return(
            <div>Loading...</div>
          );
        }
        if(gemstoneAttr.length > 0){
        return(
            <div>
              <h2>GEMSTONES ATTRIBUTES</h2>
              <ProductGemstoneAttributes gemstoneAttrData={gemstoneAttr} />
            </div>
          );
        }
      }

     }

    renderImagegallery(){
      const { gallery } = this.props.productdetail;
      if(!gallery){
        return(
          <div><img src="http://mol.mouawad.com/resources/images/blank.gif" width="100%"/></div>
        );
      }
      return(
          <div>
            <ProductGallery imagegallery={gallery}/>
          </div>
        );
     }
     renderReleteproduct(){
       const { totalpage,products,page } = this.props.productrelete;
       //const reletepage = this.props.productreletepage;
       const productId = this.props.params.id;
       const { type,collection } = this.props.productdetail;
       const { fields: { reletepage },handleSubmit} = this.props;
       if(!products){
         return(
           <div>Loading...</div>
         );
       }
       if(type != 'STO' && products.length > 0){
       return(
           <div className="col-md-12 col-sm-12 nopadding">
              <h2>RELATED ITEMS</h2>
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
                onSelect={(eventKey) => { this.props.getProductRelete(collection,eventKey); }} />
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 nopadding">
                  <span>Page</span>
                  <form onSubmit={handleSubmit(this.handleGo)} >
                   <input type="number" {...reletepage} />
                   <span>of</span>
                  <span>{totalpage}</span>
                   <button>Go</button>
                  </form>


                </div>
                </div>
           </div>
         );
       } else {

       }
    }

    renderNavigation(){

      const productlist = this.props.productlist;
      const productId = this.props.params.id;
      const productIndex = this.props.productindex;
      const productindexplus = this.props.productindexplus;
      const { type} = this.props.productdetail;
      let pructdetailurl = '/productdetail/';
      const { fields: { pagego },handleSubmit} = this.props;
      if(!productlist){
        return(
          <div>Loading...</div>
        );
      }
      if(productlist.length != 0){
      return(

            <div className="col-md-7 col-sm-7 col-xs-12 ip-nopadding maring-t15 ip-padding-l">
                      <div className="col-md-3 col-sm-1 "></div>
                      <div className="col-md-3 col-sm-3 ft-white productdetail-search">
                        <Link to={'/inventories'} className="btn btn-searchresult">New Search</Link>
                      </div>
                      <div className="col-md-1 col-sm-1 margin-t5 text-center m-none">
                        <span className="bar-line">|</span>
                      </div>
                      <div className="col-md-5 col-sm-7 nopadding m-prodcutdetail-item">
                        <div className="float-l bar-detail-pre">
                               <Link className={productIndex == 0?'disabled-link':''} to={{pathname: productIndex != 0 ?`${pructdetailurl}${productlist[productIndex-1].id}`:''}}><span className="btn btn-primary btn-radius"><span className="glyphicon glyphicon-menu-left"></span></span></Link>
                        </div>
                        <div className="float-l bar-detail-text">
                            <div className="float-l productdetailpage text-center nopadding">
                                     <form onSubmit={handleSubmit(this.handleKeyPressNavigation)} >
                                      <input type="number" {...pagego} />
                                     </form>
                            </div>
                            <div className="float-l fc-fff margin-t5 text-center nopadding">
                                  of {productlist.length} item
                            </div>
                        </div>
                        <div className="float-l bar-detail-pre">
                              <Link className={productIndex+1 >= productlist.length?'disabled-link':''} to={{pathname: productIndex+1 < productlist.length ? `${pructdetailurl}${productlist[productIndex+1].id}` : ''}}><span className="btn btn-primary btn-radius"><span className="glyphicon glyphicon-menu-right"></span></span></Link>
                        </div>
                      </div>

            </div>
          );
        }
   }

    handleGo(data){
      //e.preventDefault();
      const productId = this.props.params.id;
      const { totalpage} = this.props.productrelete;
      const getPage = parseInt(data.reletepage);
      const { collection } = this.props.productdetail;
      if((getPage <= totalpage) && (getPage != 0)){
      this.props.getProductRelete(collection,getPage);
      }
    }

   handleKeyPressNavigation(data){
     const { pagego} = data;
     const productid = this.props.productlist[parseInt(pagego)-1].id;
       this.context.router.push(`/productdetail/${productid}`);
    //  if(event.key == 'Enter'){
    //    const productid = this.props.productlist[event.target.value-1].id;
    //    this.context.router.push(`/productdetail/${productid}`);
    //  }
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
        <div className="col-sm-12 bg-hearder m-prodcutdetail">
          <div className="col-md-5 col-sm-5 ft-white m-nopadding"><h1>PRODUCT DETAIL</h1></div>
          {this.renderNavigation()}
        </div>
        <div className="row">
          <div className="col-sm-12">
              <div className="panel panel-default">
                  <div className="panel-body padding-ft0">

                <div className="col-md-12 col-sm-12 icon-detail">
                  <a><div className="icon-add margin-l10"></div></a>
                  <a><div className="icon-print margin-l10" id="printproduct"></div></a>
                  <a><div className="icon-zoom margin-l10" id="zoomimg"></div></a>
                </div>
                <div className="col-md-6 col-sm-12">{this.renderImagegallery()}</div>

                <div className="col-md-6 col-sm-12">
                  <div className="col-md-12 col-sm-12">
                    {this.renderDesc()}
                 </div>
                 <div className="col-md-12 col-sm-12">
                   {this.renderReleteproduct()}
                  </div>
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12 padding-lf30">
                  <div className="line-border"></div>
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12 padding-lf30">{this.renderAttr()}</div>
                <div className="col-md-12 col-sm-12 col-xs-12 padding-lf30 maring-t15">{this.renderFooterAttr()}</div>
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
    //productreletepage: state.productdetail.reletepage,
    productlist:state.productdetail.productlist
   }
}

module.exports = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'Pageform',
  fields: ['pagego','reletepage']
},mapStateToProps,productdetailaction)(productdetail)

//export default connect(mapStateToProps,productdetailaction)(productdetail);
