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
      const subType = Detail.subType;
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
              <ProductGemstoneAttributes gemstoneAttrData={gemstoneAttr} subType={subType}/>
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
             <div key={`imgprint${index}`}><img width="400" src={data.thumbnail}/></div>
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

        <div style={styles.colmd12}>
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
