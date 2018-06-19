import React,{ Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { reduxForm, reset } from 'redux-form';
import { Button,FormControl,Pagination } from 'react-bootstrap';
import * as productdetailaction from '../../actions/productdetailaction';
import ProductDescriptionBlock from '../../components/salesproductdetail/productDescriptionprint';
import ProductDescriptioncerBlock from '../../components/salesproductdetail/productDescriptionprintcer';
import ProductJewelryAttributes from '../../components/salesproductdetail/productJewalryAttributesprint';
import ProductStoneAttributes from '../../components/salesproductdetail/productStoneAttributesprint';
import ProductWatchAttributes from '../../components/salesproductdetail/productWatchAttributesprint';
import ProductObaAttributes from '../../components/salesproductdetail/productObaAttributesprint';
import ProductAccAttributes from '../../components/salesproductdetail/productAccAttributesprint';
import ProductSpaAttributes from '../../components/salesproductdetail/productSppAttributesprint';
import ProductGemstoneAttributes from '../../components/salesproductdetail/productGemstonesAttributesprint';
import ProductGemstonesReleteJewelry from '../../components/salesproductdetail/productGemstonesReleteJewelryprint';
import ProductDiamonsAttributes from  '../../components/salesproductdetail/productDiamondsAttributesprint';
import ProductRawmatirialAttributes from  '../../components/salesproductdetail/productRawmaterialAttributesprint';
import '../../../public/css/productdetail.css';

import checkInarrayObject from '../../utils/checkInarrayObject';
import checkInarrayObjectOther from '../../utils/checkInarrayObjectOther';
const styles ={
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
            return(<div>Loading...</div>);
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

    renderAttr(){
        const  Detail  = this.props.productdetail;
        const { lotNumbers, pageSize, activePage } = this.props;
        let  Attrtitle  = '';
        if(!Detail){
            return(<div>Loading...</div>);
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
                            <ProductStoneAttributes Detail={Detail} pageSize={pageSize} lotNumbers={lotNumbers} activePage={activePage}/>
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

    renderFooterAttr(){
        const Detail  = this.props.productdetail;
        const gemstoneAttr = Detail.gemstones;
        const subType = Detail.subType;

        if(Detail.type == 'CER'){
            return(<div></div>);
        }
        if(!gemstoneAttr){
            return(<div>Loading...</div>);
        }
        if(Detail.type == 'STO' || Detail.type == 'CER'){
        } else {
            if(gemstoneAttr.length > 0){
                if(checkInarrayObject('type','Stone',gemstoneAttr)){
                    return(
                        <div>
                            <h2>GEMSTONES ATTRIBUTES</h2>
                            <ProductGemstoneAttributes gemstoneAttrData={gemstoneAttr} subType={subType}/>
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
        if(Detail.type == 'STO' || Detail.type == 'CER'){
        } else {
            if(!gemstoneAttr){
                return(<div>Loading...</div>);
            }
            if(gemstoneAttr.length > 0){
                if(checkInarrayObject('type','Loose Diamond',gemstoneAttr)){
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
        if(Detail.type == 'STO' || Detail.type == 'CER'){
        } else {
            if(!gemstoneAttr){
                return(<div>Loading...</div>);
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

    renderImagegallery(){
        const { gallery } = this.props.productdetail;
        if(!gallery){
            return(<div><img src="/images/blank.gif" width="100%"/></div>);
        }
        return(
            <div>
                {
                    gallery.map( (data,index)=>{
                        return (<div key={`imgprint${index}`}><img style={styles.imgwidth} src={data.original}/></div>);
                    })
                }
            </div>
        );
    }

    render(){
        const styles ={
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

        let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
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
                        <div style={styles.colmd12}>{this.renderDesc()}</div>
                        <div style={styles.colmd12}>{this.renderAttr()}</div>
                    </div>
                </div>
                <div style={styles.colmd12}>{this.renderFooterDiamondsAttr()}</div>
                <div style={styles.colmd12}>{this.renderFooterAttr()}</div>
                <div style={styles.colmd12}>{this.renderFooterRawmatirialAttr()}</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        productdetail: state.productdetail.detail
    }
}

// module.exports = connect(mapStateToProps,null)(productprint)
module.exports = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'Printform',
    fields: ['pagego','reletepage','oldCatalogName','newCatalogName','validateCatalogName','stonepage'],
},mapStateToProps,null)(productprint)
