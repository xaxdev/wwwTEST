import React,{ Component } from 'react';
import numberFormat from '../../utils/convertNumberformat';

class YingPrint extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        const { yingCatalogDetail, yingCatalogDetailStatus } = this.props;
        
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

            const styles = {
                ying_img_logo: { 
                    'height': '145',
                    'textAlign': 'center'
                },
                ying_img_set: {
                    'height': '534',
                    'textAlign': 'center'
                },
                ying_table_set_detail:{
                    'borderCollapse':'collapse',
                    'marginLeft':'6.42pt',
                    'margin': '10px auto'
                },
                ying_tr_height_22: { 
                    'height':'22pt'
                },
                ying_tr_height_23: { 
                    'height':'23pt'
                },
                ying_tr_height_17: { 
                    'height':'17pt'
                },
                ying_img_footer: {
                    'textIndent': '0pt',
                    'textAlign': 'left'
                },
                s2_1_ying_footer: { 
                    'color': 'black',
                    'fontFamily':'Times New Roman, serif',
                    'fontStyle': 'normal',
                    'fontWeight': 'normal', 
                    'textDecoration': 'none', 
                    'fontSize': '8pt',
                    'paddingLeft': '5pt',
                    'textIndent': '0pt',
                    'textAlign': 'center'
                },
                s2_2_ying_footer: { 
                    'color': 'black',
                    'fontFamily':'Times New Roman, serif',
                    'fontStyle': 'normal',
                    'fontWeight': 'normal', 
                    'textDecoration': 'none',
                    'fontSize': '8pt',
                    'paddingTop': '2pt',
                    'paddingLeft': '5pt',
                    'textIndent': '0pt',
                    'textAlign': 'center'
                },
                ying_td_center: {
                    'textAlign': 'center'
                },
                ying_td_width_27: {
                    'width':'27pt',
                    'borderTopStyle':'solid',
                    'borderTopWidth':'1pt',
                    'borderLeftStyle':'solid',
                    'borderLeftWidth':'1pt',
                    'borderBottomStyle':'solid',
                    'borderBottomWidth':'1pt',
                    'borderRightStyle':'solid',
                    'borderRightWidth':'1pt'
                },
                ying_td_width_116: {
                    'width':'116pt',
                    'borderTopStyle':'solid',
                    'borderTopWidth':'1pt',
                    'borderLeftStyle':'solid',
                    'borderLeftWidth':'1pt',
                    'borderBottomStyle':'solid',
                    'borderBottomWidth':'1pt',
                    'borderRightStyle':'solid',
                    'borderRightWidth':'1pt'
                },
                ying_td_width_240: { 
                    'width':'240pt',
                    'borderTopStyle':'solid',
                    'borderTopWidth':'1pt',
                    'borderLeftStyle':'solid',
                    'borderLeftWidth':'1pt',
                    'borderBottomStyle':'solid',
                    'borderBottomWidth':'1pt',
                    'borderRightStyle':'solid',
                    'borderRightWidth':'1pt'
                },
                ying_td_width_74: { 
                    'width':'74pt',
                    'borderTopStyle':'solid',
                    'borderTopWidth':'1pt',
                    'borderLeftStyle':'solid',
                    'borderLeftWidth':'1pt',
                    'borderBottomStyle':'solid',
                    'borderBottomWidth':'1pt',
                    'borderRightStyle':'solid',
                    'borderRightWidth':'1pt'
                },
                ying_td_width_383: { 
                    'width':'383pt',
                    'borderTopStyle':'solid',
                    'borderTopWidth':'1pt',
                    'borderLeftStyle':'solid',
                    'borderLeftWidth':'1pt',
                    'borderBottomStyle':'solid',
                    'borderBottomWidth':'1pt',
                    'borderRightStyle':'solid',
                    'borderRightWidth':'1pt'
                },
                s1_ying: {
                    'color': 'black',
                    'fontFamily':'Times New Roman, serif',
                    'fontStyle': 'normal', 
                    'fontWeight':'bold',
                    'textDecoration': 'none', 
                    'fontSize': '9pt'
                },
                ying_id: {
                    'paddingTop': '5pt',
                    'paddingLeft': '1pt',
                    'textIndent': '0pt',
                    'textAlign': 'center'
                },
                ying_reference: {
                    'paddingTop': '5pt',
                    'paddingLeft': '34pt',
                    'paddingRight': '33pt',
                    'textIndent': '0pt',
                    'textAlign': 'center'
                },
                ying_description: {
                    'paddingTop': '5pt',
                    'paddingLeft': '101pt',
                    'paddingRight': '99pt',
                    'textIndent': '0pt',
                    'textAlign': 'center'
                },
                ying_description_item: {
                    'paddingTop': '6pt',
                    'textIndent': '0pt',
                    'textAlign': 'right'
                },
                ying_description_item_left: {
                    'paddingTop': '6pt',
                    'textIndent': '0pt',
                    'textAlign': 'left'
                },
                ying_price: {
                    'paddingTop': '5pt',
                    'paddingLeft': '15pt',
                    'textIndent': '0pt',
                    'textAlign': 'left'
                },
                ying_total: {
                    'paddingTop': '2pt',
                    'paddingLeft': '163pt',
                    'paddingRight': '162pt',
                    'textIndent': '0pt',
                    'textAlign': 'center'
                },
                s2_ying: { 
                    'color': 'black',
                    'fontFamily':'Times New Roman, serif',
                    'fontStyle': 'normal',
                    'fontWeight': 'normal', 
                    'textDecoration': 'none', 
                    'fontSize': '8pt'
                },
                ying_item_price: {
                    'paddingTop': '6pt',
                    'paddingRight': '3pt',
                    'textIndent': '0pt',
                    'textAlign': 'right'
                },
                ying_footer_total: {
                    'paddingTop': '3pt',
                    'paddingRight': '3pt',
                    'textIndent': '0pt',
                    'textAlign': 'right'
                }
            }

            return(
                <table  width="100%" border="0">
                    <tbody>
                        <tr>
                            <td style={styles.ying_img_logo}><img width="564" height="85" alt="image" src="/images/Image_logo.jpg"/></td>
                        </tr>
                        <tr>
                            <td style={styles.ying_img_set}><img width="358" height="509" alt="image" src={imagesUrl}/></td>
                        </tr>
                        <tr style={styles.ying_td_center}>
                            <td style={styles.ying_td_center}>
                                <table style={styles.ying_table_set_detail} cellSpacing="0">
                                    <tbody>
                                        <tr style={styles.ying_tr_height_22}>
                                            <td style={styles.ying_td_width_27}><p style={styles.s1_ying} style={styles.ying_id}><strong><span style={styles.s1_ying}>لسلستلا</span></strong></p></td>
                                            <td style={styles.ying_td_width_116}><p style={styles.s1_ying} style={styles.ying_reference} ><strong><span style={styles.s1_ying}>ةعطقلا مقر</span></strong></p></td>
                                            <td style={styles.ying_td_width_240}><p style={styles.s1_ying} style={styles.ying_description}><strong><span style={styles.s1_ying}>تافصاوملا</span></strong></p></td>
                                            <td style={styles.ying_td_width_74}><p style={styles.s1_ying} style={styles.ying_price}><strong><span style={styles.s1_ying}>يلامجﻹا غلبملا</span></strong></p></td>
                                        </tr>
                                        {items.map((item,index)=>{
                                            if (item.itemDescriptionLanguage == 'arb') {
                                                return(
                                                    <tr style={styles.ying_tr_height_23}>
                                                        <td style={styles.ying_td_width_27}><p style={styles.s2_ying} style={styles.ying_id}><strong><span style={styles.s1_ying}>{index+1}</span></strong></p></td>
                                                        <td style={styles.ying_td_width_116}><p style={styles.s1_ying} style={styles.ying_reference} ><span style={styles.s1_ying}>{item.reference}</span></p></td>
                                                        <td style={styles.ying_td_width_240}><p style={styles.s1_ying} style={styles.ying_description_item} ><strong><span style={styles.s1_ying}>{item.description}</span></strong></p></td>
                                                        <td style={styles.ying_td_width_74}><p style={styles.s2_ying} style={styles.ying_item_price} ><strong><span style={styles.s1_ying}>{numberFormat(item.priceInHomeCurrency)}</span></strong></p></td>
                                                    </tr>
                                                )
                                            } else {
                                                return(
                                                    <tr style={styles.ying_tr_height_23}>
                                                        <td style={styles.ying_td_width_27}><p style={styles.s2_ying} style={styles.ying_id}><strong><span style={styles.s1_ying}>{index+1}</span></strong></p></td>
                                                        <td style={styles.ying_td_width_116}><p style={styles.s1_ying} style={styles.ying_reference} ><span style={styles.s1_ying}>{item.reference}</span></p></td>
                                                        <td style={styles.ying_td_width_240}><p style={styles.s1_ying} style={styles.ying_description_item_left} ><strong><span style={styles.s1_ying}>{item.description}</span></strong></p></td>
                                                        <td style={styles.ying_td_width_74}><p style={styles.s2_ying} style={styles.ying_item_price} ><strong><span style={styles.s1_ying}>{numberFormat(item.priceInHomeCurrency)}</span></strong></p></td>
                                                    </tr>
                                                )
                                            }
                                        })}
                                        <tr style={styles.ying_tr_height_17}>
                                            <td style={styles.ying_td_width_383} colSpan="3"><p style={styles.s1_ying} style={styles.ying_total}><strong><span style={styles.s1_ying}>Total / عومجملا</span></strong></p></td>
                                            <td style={styles.ying_td_width_74}><p style={styles.s2_ying} style={styles.ying_footer_total} ><strong><span style={styles.s1_ying}>{numberFormat(totalPrice)}</span></strong></p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td height="116" align="bottom">
                                <p style={styles.ying_img_footer}><br/></p>
                                <p style={styles.s2_1_ying_footer}>وعسلا ةيبرعلا ةكلمملا - 4030123957 :ت.س - (012) 610 6195 :سكاف ،(012) 610 6194 ،(012) 610 6193 ،(012) 610 6192 :فتاه 21441 ةدج 1526 .ب.ص ،ريوكس ليمج ىنبم ،ةيلحتلا عراش :يسيئرلا زك</p>
                                <p style={styles.s2_2_ying_footer}>(012) 283 3125 فتاه ،ريوكس ليمج ،ةدج - (011) 293 4555 فتاه ،رتنس زانكأ ،ضايرلا - (013) 894 5747 فتاه ،لوم دشارلا ،ربخلا</p>
                                <p style={styles.s2_2_ying_footer}>Head Office: Tahlia Street, Jameel Square Bldg., Tel: (012) 610 6192, (012) 610 6193, (012) 610 6194, Fax: (012) 6106195, P.O. Box: 1526 Jeddah 21441, Kingdom of Saudi Arabia</p>
                                <p style={styles.s2_2_ying_footer}>Al Rashed Mall, Khobar Tel: (013) 894 5747, Aknaz Center, Riyadh Tel: (011) 293 4555, Jameel Square, Jeddah Tel: (012) 283 3125</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )
        }else {
            return (
                <div></div>
            )   
        }
    }
}

module.exports = YingPrint