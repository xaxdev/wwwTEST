import React, { Component } from 'react';
import numberFormat from '../../utils/convertNumberformat';

class RenderViewYingCatalogDetail extends Component {
    constructor(props) {
        super(props);

    }

    render = _ => {
        const { yingCatalogDetail, yingCatalogDetailStatus, addItemDetail, editItemDetail } = this.props;
        if (yingCatalogDetailStatus) {
            const { setImages, items } = yingCatalogDetail;
            let imagesUrl = '';
            if (setImages != '') {
                const host = HOSTNAME || 'localhost';
                // const ROOT_URL = (host != 'mol.mouawad.com')? `//${host}:${(ENVIRONMENT!='staging')?3005:4005}`: `//${host}`;
                const ROOT_URL = 'mol.mouawad.com';
                imagesUrl = `http://${ROOT_URL}/images/products/original/${setImages}`;   
            }
            
            const totalPrice = items.reduce((prev, curr) => prev + (Number(curr.priceInHomeCurrency) || 0), 0);
            const totalNetVatPrice = items.reduce((prev, curr) => prev + (Number(curr.netVatPrice) || 0), 0);

            return (
                <div className={`${(addItemDetail || editItemDetail) ? 'hidden' : ''}` }>
                    <table  width="100%" border="0">
                        <tbody>
                            <tr>
                                <td className="ying_img_logo" width="40%" ><img height="85" alt="image" src="/images/Image_address_header_eng.jpg"/></td>
                                <td className="ying_img_logo" width="20%" ><img height="85" alt="image" src="/images/mouawad-crest.png"/></td>
                                <td className="ying_img_logo" width="40%" ><img height="85" alt="image" src="/images/Image_address_header_arabic.jpg"/></td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="ying_img_set"><br/><br/><img height="509" alt="image" src={imagesUrl}/><br/><br/></td>
                            </tr>
                            <tr className="ying_td_center">
                                <td colSpan="3" className="ying_td_center">
                                    <table className="ying_table_set_detail" cellspacing="0">
                                        <tr className="ying_tr_height_22">
                                            <td className="ying_td_width_27"><img width="564" height="20" alt="image" src="/images/order.png"/></td>
                                            <td className="ying_td_width_116"><img width="564" height="30" alt="image" src="/images/skunumber.png"/></td>
                                            <td className="ying_td_width_240"><img width="564" height="30" alt="image" src="/images/description.png"/></td>
                                            <td className="ying_td_width_74"><img width="564" height="25" alt="image" src="/images/pp.png"/></td>
                                            <td className="ying_td_width_74"><img width="564" height="25" alt="image" src="/images/net.png"/></td>
                                        </tr>
                                        {items.map((item,index)=>{
                                            if (item.itemDescriptionLanguage == 'arb') {
                                                return (
                                                    <tr className="ying_tr_height_23">
                                                        <td className="ying_td_width_27"><p className="s2_ying ying_id"><span className="s1_ying">{index+1}</span></p></td>
                                                        <td className="ying_td_width_116"><p className="s1_ying ying_reference"><span className="s1_ying">{item.reference}</span></p></td>
                                                        <td className="ying_td_width_240"><p className="s1_ying ying_description_item"><span className="s1_ying">{item.description}</span></p></td>
                                                        <td className="ying_td_width_74"><p className="s2_ying ying_item_price"><span className="s1_ying">{numberFormat(item.priceInHomeCurrency)}</span></p></td>
                                                        <td className="ying_td_width_74"><p className="s2_ying ying_item_price"><span className="s1_ying">{numberFormat(item.netVatPrice)}</span></p></td>
                                                    </tr>
                                                )    
                                            } else {
                                                return (
                                                    <tr className="ying_tr_height_23">
                                                        <td className="ying_td_width_27"><p className="s2_ying ying_id"><span className="s1_ying">{index+1}</span></p></td>
                                                        <td className="ying_td_width_116"><p className="s1_ying ying_reference"><span className="s1_ying">{item.reference}</span></p></td>
                                                        <td className="ying_td_width_240"><p className="s1_ying ying_description_item_left"><span className="s1_ying">{item.description}</span></p></td>
                                                        <td className="ying_td_width_74"><p className="s2_ying ying_item_price"><span className="s1_ying">{numberFormat(item.priceInHomeCurrency)}</span></p></td>
                                                        <td className="ying_td_width_74"><p className="s2_ying ying_item_price"><span className="s1_ying">{numberFormat(item.netVatPrice)}</span></p></td>
                                                    </tr>
                                                )
                                            }
                                        })}
                                        
                                        <tr className="ying_tr_height_17">
                                            <td className="ying_td_width_383" colSpan="3"><p className="s1_ying ying_total" ><span className="s1_ying">Total / المجموع</span></p></td>
                                            <td className="ying_td_width_74"><p className="s2_ying ying_footer_total" ><span className="s1">{numberFormat(totalPrice)}</span></p></td>
                                            <td className="ying_td_width_74"><p className="s2_ying ying_footer_total" ><span className="s1">{numberFormat(totalNetVatPrice)}</span></p></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="ying_img_logo" align="bottom">
                                    <p className="ying_img_footer"><br/></p>
                                    <img height="95" alt="image" src="/images/images_footer.png"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (
                <div></div>
            )   
        }
    }
}

module.exports = RenderViewYingCatalogDetail