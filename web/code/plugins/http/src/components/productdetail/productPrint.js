import React,{ Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { reduxForm, reset } from 'redux-form';
import { Button,FormControl,Pagination } from 'react-bootstrap';
import * as productdetailaction from '../../actions/productdetailaction';
import ProductDescriptionBlock from '../../components/productdetail/productDescriptionprint';
import ProductDescriptioncerBlock from '../../components/productdetail/productDescriptionprintcer';
import ProductJewelryAttributes from '../../components/productdetail/productJewalryAttributesprint';
import ProductStoneAttributes from '../../components/productdetail/productStoneAttributesprint';
import ProductWatchAttributes from '../../components/productdetail/productWatchAttributesprint';
import ProductObaAttributes from '../../components/productdetail/productObaAttributesprint';
import ProductAccAttributes from '../../components/productdetail/productAccAttributesprint';
import ProductSpaAttributes from '../../components/productdetail/productSppAttributesprint';
import ProductGemstoneAttributes from '../../components/productdetail/productGemstonesAttributesprint';
import ProductGemstonesReleteJewelry from '../../components/productdetail/productGemstonesReleteJewelryprint';
import ProductDiamonsAttributes from  '../../components/productdetail/productDiamondsAttributesprint';
import ProductRawmatirialAttributes from  '../../components/productdetail/productRawmaterialAttributesprint';
import '../../../public/css/productdetail.css';

import checkInarrayObject from '../../utils/checkInarrayObject';
import checkInarrayObjectOther from '../../utils/checkInarrayObjectOther';
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
        let  Detailtitle  = 'ITEM DETAILS';
        if(!Detail){
            return(<div>Loading...</div>);
        }
        switch (Detail.type) {
            case 'JLY':
                return(
                    <div>
                        <h2>{Detailtitle}</h2>
                        <ProductDescriptionBlock {...Detail} />
                    </div>
                );
            case 'STO':
                return(
                    <div>
                        <h2>{Detailtitle}</h2>
                        <ProductDescriptionBlock {...Detail} />
                    </div>
                );
            case 'WAT':
                return(
                    <div>
                        <h2>{Detailtitle}</h2>
                        <ProductDescriptionBlock {...Detail} />
                    </div>
                );
            case 'OBA':
                return(
                    <div>
                        <h2>{Detailtitle}</h2>
                        <ProductDescriptionBlock {...Detail} />
                    </div>
                );
            case 'ACC':
                return(
                    <div>
                        <h2>{Detailtitle}</h2>
                        <ProductDescriptionBlock {...Detail} />
                    </div>
                );
            case 'SPA':
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
        if (Detail.type == 'STO' || Detail.type == 'CER'){

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
        const { company } = Detail

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
                            <ProductDiamonsAttributes gemstoneAttrData={gemstoneAttr} company={company.toLowerCase()} />
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
        const { gallery, specialDiscount } = this.props.productdetail;
        let imgPathPublic = ENVIRONMENT == 'production'
                                ? 'file:///home/mol/www/projects/mol/web/code/plugins/http/public'
                                : ENVIRONMENT == 'staging'
                                    ?'file:///home/mol/www/projects/staging/mol/web/code/plugins/http/public'
                                    :'file:///home/dev/www/mol/web/code/plugins/http/public';

        let isSpecialDisc = specialDiscount != undefined ? specialDiscount == 1?true:false : false;
        let tagbarspecial = {};
        if(!gallery){
            return(<div><img src="/images/blank.gif" width="100%"/></div>);
        }
        if (isSpecialDisc) {
            tagbarspecial = {
                'position': 'absolute',
                'top': '82px',
                'left': '8px',
                'width': '90px',
                'height': '93px',
                'z-index': '9'
            }
            return(
                <div>
                    {
                        gallery.map( (data,index)=>{
                            return (
                                <div key={`imgprint${index}`}>
                                    <span style={tagbarspecial}><img src="/images/img_special_discount_grid.png"/></span>
                                    <img style={styles.imgwidth} src={data.original}/>
                                </div>
                            );
                        })
                    }
                </div>
            );
        }else{
            return(
                <div>
                    {
                        gallery.map( (data,index)=>{
                            return (
                                <div key={`imgprint${index}`}>
                                    <img style={styles.imgwidth} src={data.original}/>
                                </div>
                            );
                        })
                    }
                </div>
            );
        }


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
                    <div style={styles.colmd5}>
                        {this.renderImagegallery()}
                    </div>
                    <div style={styles.colmd5}>
                        <div style={styles.colmd12}>
                            {this.renderDesc()}
                        </div>
                        <div style={styles.colmd12}>
                            {this.renderAttr()}
                        </div>
                    </div>
                </div>
                <div style={styles.colmd12}>
                    {this.renderFooterDiamondsAttr()}
                </div>
                <div style={styles.colmd12}>
                    {this.renderFooterAttr()}
                </div>
                <div style={styles.colmd12}>
                    {this.renderFooterRawmatirialAttr()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        productdetail: state.productdetail.detail
    }
}

module.exports = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'Printform',
    fields: ['pagego','reletepage','oldCatalogName','newCatalogName','validateCatalogName','stonepage'],
},mapStateToProps,null)(productprint)
