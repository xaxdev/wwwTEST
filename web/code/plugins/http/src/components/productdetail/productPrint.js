import React,{ Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button,FormControl,Pagination } from 'react-bootstrap';
import jQuery from 'jquery';
import * as productdetailaction from '../../actions/productdetailaction';
import ProductDescriptionBlock from '../../components/productdetail/productDescription';
import ProductJewelryAttributes from '../../components/productdetail/productJewalryAttributes';
import ProductStoneAttributes from '../../components/productdetail/productStoneAttributes';
import ProductWatchAttributes from '../../components/productdetail/productWatchAttributes.js';
import ProductGemstoneAttributes from '../../components/productdetail/productGemstonesAttributesprint';
import ProductGemstonesReleteJewelry from '../../components/productdetail/productGemstonesReleteJewelry';
import ProductGallery from '../../components/productdetail/productGallery';
import ProductRelete from '../../components/productdetail/productReleted';

import '../../../public/css/productdetail.css';


class productprint extends Component {

  constructor(props) {
    super(props);

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

                           <ProductJewelryAttributes attr={Detail} />

                     </div>
                   );
           case 'STO':
                  Attrtitle='STONE ATTRIBUTES';
                  return(
                      <div>
                        <h2>{Attrtitle}</h2>

                            <ProductStoneAttributes attr={Detail} />

                      </div>
                    );
           case 'WAT':
                  Attrtitle='WATCH ATTRIBUTES';
                  return(
                      <div>
                        <h2>{Attrtitle}</h2>

                            <ProductWatchAttributes attr={Detail} />

                      </div>
                    );
           default:
                 Attrtitle='JEWELRY ATTRIBUTES';
                 return(
                     <div>
                       <h2>{Attrtitle}</h2>

                           <ProductJewelryAttributes attr={Detail} />

                     </div>
                   );
        }
    }

    renderFooterAttr(){

      const Detail  = this.props.productdetail;
      const gemstoneAttr = Detail.gemstones;
      if(!gemstoneAttr){
        return(
          <div>Loading...</div>
        );
      }
      if(Detail.type == 'STO'){
        return(
            <div>
              <h2>RELATED JEWELRY</h2>
              <ProductGemstonesReleteJewelry gemstoneAttrData={gemstoneAttr} />
            </div>
          );
      } else {
        return(
            <div>
              <h2>GEMSTONES ATTRIBUTES</h2>
              <ProductGemstoneAttributes gemstoneAttrData={gemstoneAttr} />
            </div>
          );
      }

     }

    renderImagegallery(){
      const { gallery } = this.props.productdetail;
      if(!gallery){
        return(
          <div><img src="/images/blank.gif" width="100%"/></div>
        );
      }
      return(
          <div>
            { gallery.map( (data,index)=>{
              return (
             <div key={`imgprint${index}`}><img width="400" height="400" src={data.thumbnail}/></div>
             );

            })}
          </div>
        );

     }

  render(){
    let monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const { type} = this.props.productdetail;
    let currentDate = new Date();
    let dd = currentDate.getDate();

    let yyyy = currentDate.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    currentDate = dd+' '+monthNames[currentDate.getMonth()]+' '+yyyy;
    return(
      <div>

        <div className="col-md-12">
          <div className="col-md-6">Mouawad online</div>
          <div className="col-md-6">Printed Date :  {currentDate}</div>
        </div>

        <div className="col-md-12">
          <div className="col-md-6">PRODUCT DETAIL</div>
        </div>

        <div className="col-md-12">
          <div className="col-md-6">{this.renderImagegallery()}</div>
          <div className="col-md-6">
            <div className="col-md-12">
              {this.renderDesc()}
            </div>
            <div className="col-md-12">
              {this.renderAttr()}
            </div>
          </div>
        </div>

        <div className="col-md-12">{this.renderFooterAttr()}</div>

      </div>
    );
  }
}


function mapStateToProps(state) {

  return {
    productdetail: state.productdetail.detail,
   }
}

module.exports = connect(mapStateToProps,null)(productprint)
