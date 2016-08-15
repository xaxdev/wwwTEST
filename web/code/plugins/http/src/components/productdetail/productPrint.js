import React,{ Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button,FormControl,Pagination } from 'react-bootstrap';
import * as productdetailaction from '../../actions/productdetailaction';
import ProductDescriptionBlock from '../../components/productdetail/productDescriptionprint';
import ProductJewelryAttributes from '../../components/productdetail/productJewalryAttributesprint';
import ProductStoneAttributes from '../../components/productdetail/productStoneAttributesprint';
import ProductWatchAttributes from '../../components/productdetail/productWatchAttributesprint';
import ProductGemstoneAttributes from '../../components/productdetail/productGemstonesAttributesprint';
import ProductGemstonesReleteJewelry from '../../components/productdetail/productGemstonesReleteJewelryprint';

import '../../../public/css/productdetail.css';

let styles ={
  imgwidth:{
    width: '100%',
    marginRight: '20px',
    maxWidth: '350px'
  }
  };
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
      const subType = Detail.subType;
      if(!gemstoneAttr){
        return(
          <div>Loading...</div>
        );
      }
      if(Detail.type == 'STO'){

      } else {
        if(gemstoneAttr.length > 0){
        return(
            <div>
              <h2>GEMSTONES ATTRIBUTES</h2>
              <ProductGemstoneAttributes gemstoneAttrData={gemstoneAttr} subType={subType}/>
            </div>
          );
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
      return(
          <div>
            { gallery.map( (data,index)=>{
              return (
             <div key={`imgprint${index}`}><img style={styles.imgwidth} src={data.original}/></div>
             );

            })}
          </div>
        );

     }

  render(){
    var styles ={
      colmd12:{
        width:'100%',
        float:'left'
      },
      colmd5:{
        width: '50%',
        float:'left'
      },
      colmd2:{
        width: '20%',
        float:'left'
      },
      tableresponsive:{
        width:'100%'
      },
      table:{
          width: '100%'
      },
      th:{
        background: '#eee'
      },
      mgbt:{
        width:'100%',
        float:'left',
        marginBottom:'20px'
      }
    };
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
        <div style={styles.colmd12}>
          <div style={styles.colmd12}>Mouawad online</div>
        </div>
        <div style={styles.colmd12}>
          <div style={styles.colmd2}>Printed Date :  </div>
          <div style={styles.colmd5}>{currentDate}</div>
        </div>

        <div style={styles.mgbt}>
          <div style={styles.colmd5}>PRODUCT DETAIL</div>
        </div>

        <div style={styles.colmd12}>
          <div style={styles.colmd5}>{this.renderImagegallery()}</div>
          <div style={styles.colmd5}>
            <div style={styles.colmd12}>
              {this.renderDesc()}
            </div>
            <div style={styles.colmd12}>
                {this.renderAttr()}
            </div>
          </div>
        </div>

        <div style={styles.colmd12}>{this.renderFooterAttr()}</div>

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