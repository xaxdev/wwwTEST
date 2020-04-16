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
                                <td className="ying_img_logo" ><img width="564" height="85" alt="image" src="/images/Image_logo.jpg"/></td>
                            </tr>
                            <tr>
                                <td className="ying_img_set"><img width="358" height="509" alt="image" src={imagesUrl}/></td>
                            </tr>
                            <tr className="ying_td_center">
                                <td className="ying_td_center">
                                    <table className="ying_table_set_detail" cellspacing="0">
                                        <tr className="ying_tr_height_22">
                                            <td className="ying_td_width_27"><img width="564" height="25" alt="image" src="/images/order.png"/></td>
                                            <td className="ying_td_width_116"><img width="564" height="35" alt="image" src="/images/skunumber.png"/></td>
                                            <td className="ying_td_width_240"><img width="564" height="35" alt="image" src="/images/description.png"/></td>
                                            <td className="ying_td_width_74"><img width="564" height="30" alt="image" src="/images/pp.png"/></td>
                                            <td className="ying_td_width_74"><img width="564" height="30" alt="image" src="/images/net.png"/></td>
                                        </tr>
                                        {items.map((item,index)=>{
                                            if (item.itemDescriptionLanguage == 'arb') {
                                                return (
                                                    <tr className="ying_tr_height_23">
                                                        <td className="ying_td_width_27"><p className="s2_ying ying_id"><strong><span className="s1_ying">{index+1}</span></strong></p></td>
                                                        <td className="ying_td_width_116"><p className="s1_ying ying_reference"><span className="s1_ying">{item.reference}</span></p></td>
                                                        <td className="ying_td_width_240"><p className="s1_ying ying_description_item"><strong><span className="s1_ying">{item.description}</span></strong></p></td>
                                                        <td className="ying_td_width_74"><p className="s2_ying ying_item_price"><strong><span className="s1_ying">{numberFormat(item.priceInHomeCurrency)}</span></strong></p></td>
                                                        <td className="ying_td_width_74"><p className="s2_ying ying_item_price"><strong><span className="s1_ying">{numberFormat(item.netVatPrice)}</span></strong></p></td>
                                                    </tr>
                                                )    
                                            } else {
                                                return (
                                                    <tr className="ying_tr_height_23">
                                                        <td className="ying_td_width_27"><p className="s2_ying ying_id"><strong><span className="s1_ying">{index+1}</span></strong></p></td>
                                                        <td className="ying_td_width_116"><p className="s1_ying ying_reference"><span className="s1_ying">{item.reference}</span></p></td>
                                                        <td className="ying_td_width_240"><p className="s1_ying ying_description_item_left"><strong><span className="s1_ying">{item.description}</span></strong></p></td>
                                                        <td className="ying_td_width_74"><p className="s2_ying ying_item_price"><strong><span className="s1_ying">{numberFormat(item.priceInHomeCurrency)}</span></strong></p></td>
                                                        <td className="ying_td_width_74"><p className="s2_ying ying_item_price"><strong><span className="s1_ying">{numberFormat(item.netVatPrice)}</span></strong></p></td>
                                                    </tr>
                                                )
                                            }
                                        })}
                                        
                                        <tr className="ying_tr_height_17">
                                            <td className="ying_td_width_383" colSpan="3"><p className="s1_ying ying_total" ><strong><span className="s1_ying">Total / المجموع</span></strong></p></td>
                                            <td className="ying_td_width_74"><p className="s2_ying ying_footer_total" ><strong><span className="s1">{numberFormat(totalPrice)}</span></strong></p></td>
                                            <td className="ying_td_width_74"><p className="s2_ying ying_footer_total" ><strong><span className="s1">{numberFormat(totalNetVatPrice)}</span></strong></p></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td height="116" align="bottom">
                                    <p className="ying_img_footer"><br/></p>
                                    <p className="s2_1_ying_footer">وعسلا ةيبرعلا ةكلمملا - 4030123957 :ت.س - (012) 610 6195 :سكاف ،(012) 610 6194 ،(012) 610 6193 ،(012) 610 6192 :فتاه 21441 ةدج 1526 .ب.ص ،ريوكس ليمج ىنبم ،ةيلحتلا عراش :يسيئرلا زك</p>
                                    <p className="s2_2_ying_footer">(012) 283 3125 فتاه ،ريوكس ليمج ،ةدج - (011) 293 4555 فتاه ،رتنس زانكأ ،ضايرلا - (013) 894 5747 فتاه ،لوم دشارلا ،ربخلا</p>
                                    <p className="s2_2_ying_footer">Head Office: Tahlia Street, Jameel Square Bldg., Tel: (012) 610 6192, (012) 610 6193, (012) 610 6194, Fax: (012) 6106195, P.O. Box: 1526 Jeddah 21441, Kingdom of Saudi Arabia</p>
                                    <p className="s2_2_ying_footer">Al Rashed Mall, Khobar Tel: (013) 894 5747, Aknaz Center, Riyadh Tel: (011) 293 4555, Jameel Square, Jeddah Tel: (012) 283 3125</p>
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