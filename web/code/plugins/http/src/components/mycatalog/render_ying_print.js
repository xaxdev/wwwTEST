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
            const totalNetVatPrice = items.reduce((prev, curr) => prev + (Number(curr.netVatPrice) || 0), 0);

            const styles = {
                ying_img_logo_40: { 
                    'height': '145',
                    'textAlign': 'center',
                    'width': '40%' 
                },
                ying_img_logo_20: { 
                    'height': '145',
                    'textAlign': 'center',
                    'width': '20%' 
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
                    'textAlign': 'center'
                },
                s2_1_ying_footer: { 
                    'color': 'black',
                    'fontFamily':'open_sanslight',
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
                    'fontFamily':'open_sanslight',
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
                ying_td_center_colSpan: {
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
                    'fontFamily':'open_sanslight',
                    'fontStyle': 'normal',
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
                    'fontFamily':'open_sanslight',
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
                <table  width="100%">
                    <tbody>
                        <tr>
                            <td style={styles.ying_img_logo_40}><img height="85" alt="image" src="/images/Image_address_header_eng.jpg"/></td>
                            <td style={styles.ying_img_logo_20}><img height="85" alt="image" src="/images/mouawad-crest.png"/></td>
                            <td style={styles.ying_img_logo_40}><img height="85" alt="image" src="/images/Image_address_header_arabic.jpg"/></td>
                        </tr>
                        <tr>
                            <td style={styles.ying_img_set} colSpan="3"><img width="358" height="509" alt="image" src={imagesUrl}/></td>
                        </tr>
                        <tr style={styles.ying_td_center}>
                            <td style={styles.ying_td_center_colSpan} colSpan="3">
                                <table style={styles.ying_table_set_detail} cellSpacing="0">
                                    <tbody>
                                        <tr style={styles.ying_tr_height_22}>
                                            <td style={styles.ying_td_width_27}><img width="40" height="25" alt="image" src="/images/order.png"/></td>
                                            <td style={styles.ying_td_width_116}><img width="150" height="35" alt="image" src="/images/skunumber.png"/></td>
                                            <td style={styles.ying_td_width_240}><img width="240" height="35" alt="image" src="/images/description.png"/></td>
                                            <td style={styles.ying_td_width_74}><img width="95" height="30" alt="image" src="/images/pp.png"/></td>
                                            <td style={styles.ying_td_width_74}><img width="100" height="30" alt="image" src="/images/net.png"/></td>
                                        </tr>
                                        {items.map((item,index)=>{
                                            if (item.itemDescriptionLanguage == 'arb') {
                                                return(
                                                    <tr style={styles.ying_tr_height_23}>
                                                        <td style={styles.ying_td_width_27}><p style={styles.s2_ying} style={styles.ying_id}><span style={styles.s1_ying}>{index+1}</span></p></td>
                                                        <td style={styles.ying_td_width_116}><p style={styles.s1_ying} style={styles.ying_reference} ><span style={styles.s1_ying}>{item.reference}</span></p></td>
                                                        <td style={styles.ying_td_width_240}><p style={styles.s1_ying} style={styles.ying_description_item} ><span style={styles.s1_ying}>{item.description}</span></p></td>
                                                        <td style={styles.ying_td_width_74}><p style={styles.s2_ying} style={styles.ying_item_price} ><span style={styles.s1_ying}>{numberFormat(item.priceInHomeCurrency)}</span></p></td>
                                                        <td style={styles.ying_td_width_74}><p style={styles.s2_ying} style={styles.ying_item_price} ><span style={styles.s1_ying}>{numberFormat(item.netVatPrice)}</span></p></td>
                                                    </tr>
                                                )
                                            } else {
                                                return(
                                                    <tr style={styles.ying_tr_height_23}>
                                                        <td style={styles.ying_td_width_27}><p style={styles.s2_ying} style={styles.ying_id}><span style={styles.s1_ying}>{index+1}</span></p></td>
                                                        <td style={styles.ying_td_width_116}><p style={styles.s1_ying} style={styles.ying_reference} ><span style={styles.s1_ying}>{item.reference}</span></p></td>
                                                        <td style={styles.ying_td_width_240}><p style={styles.s1_ying} style={styles.ying_description_item_left} ><span style={styles.s1_ying}>{item.description}</span></p></td>
                                                        <td style={styles.ying_td_width_74}><p style={styles.s2_ying} style={styles.ying_item_price} ><span style={styles.s1_ying}>{numberFormat(item.priceInHomeCurrency)}</span></p></td>
                                                        <td style={styles.ying_td_width_74}><p style={styles.s2_ying} style={styles.ying_item_price} ><span style={styles.s1_ying}>{numberFormat(item.netVatPrice)}</span></p></td>
                                                    </tr>
                                                )
                                            }
                                        })}
                                        <tr style={styles.ying_tr_height_17}>
                                            <td style={styles.ying_td_width_383} colSpan="3"><p style={styles.s1_ying} style={styles.ying_total}><span style={styles.s1_ying}>Total / المجموع</span></p></td>
                                            <td style={styles.ying_td_width_74}><p style={styles.s2_ying} style={styles.ying_footer_total} ><span style={styles.s1_ying}>{numberFormat(totalPrice)}</span></p></td>
                                            <td style={styles.ying_td_width_74}><p style={styles.s2_ying} style={styles.ying_footer_total} ><span style={styles.s1_ying}>{numberFormat(totalNetVatPrice)}</span></p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td height="116" colSpan="3" style={styles.ying_img_footer}>
                                <p><br/></p>
                                <img height="95" alt="image" src="/images/images_footer.png"/>
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