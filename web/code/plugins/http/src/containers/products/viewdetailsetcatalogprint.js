import React, { Component, PropTypes } from 'react';
import ReactImageFallback from 'react-image-fallback';
import numberFormat2digit from '../../utils/convertNumberformatwithcomma2digit';
import numberFormat from '../../utils/convertNumberformat';

class ViewDetailSetCatalogPrint extends Component {
    constructor(props) {
        super(props);

    }
    render = _ => {
        const styles = {
            td:{
                'border': '1px solid #5c5954',
                'verticalAlign': 'middle',
                'padding': '5px'
            },
            tdLeft:{
                'border': '1px solid #5c5954',
                'verticalAlign': 'middle',
                'padding': '5px',
                'textAlign': 'left !important'
            },
            tdRight:{
                'border': '1px solid #5c5954',
                'verticalAlign': 'middle',
                'padding': '5px',
                'textAlign': 'right'
            },
            hidden:{
                'display': 'none !important',
                'visibility': 'hidden !important'
            },
            bdlbwhite:{
                'borderLeft': '1px solid #fff !important',
                'borderBottom': '1px solid #fff !important'
            },
            fontbfc000textcenter:{
                'border': '1px solid #5c5954',
                'fontWeight': 'bold',
                'fontFamily': 'open_sanssemibold',
                'color': '#000',
                'backgroundColor': '#ebd79a',
                'textAlign': 'center'
            },
            fontbfc000textrightbgebtdtext:{
                'border': '1px solid #5c5954',
                'fontWeight': 'bold',
                'fontFamily': 'open_sanssemibold',
                'color': '#000',
                'backgroundColor': '#ebd79a',
                'textAlign': 'right'
            }
        }
        const { items, setDetail } = this.props;
        const isItems = items != undefined
                            ? items.length > 0 ? true : false
                            : false;
        let row = items != undefined
                        ? items.length +1
                        : 0;
        const userLogin = JSON.parse(sessionStorage.logindata);

        if (items != undefined && items.length == 1) {
            return (
                <tbody key={setDetail.reference} id={setDetail.reference}>
                    {items.map((subitem) => {
                        return (
                            <tr key={subitem.reference} id={subitem.reference}>
                                <td style={styles.td}>{subitem.reference}</td>
                                <td style={styles.td}>{subitem.warehouse}</td>
                                <td style={styles.td}>{subitem.description}</td>
                                <td style={styles.tdLeft}>{subitem.stoneDetail == ''?'-':subitem.stoneDetail}</td>
                                <td style={(userLogin.permission.price == 'All')?styles.tdRight:styles.hidden}>
                                    {numberFormat(subitem.actualCost['USD'])}
                                </td>
                                <td style={(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All')?
                                    styles.tdRight:styles.hidden}>
                                    {numberFormat(subitem.updatedCost['USD'])}
                                </td>
                                <td style={(userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                                    || userLogin.permission.price == 'All')? styles.tdRight:styles.hidden}>
                                    {numberFormat(subitem.price['USD'])}
                                </td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td colSpan="3" style={styles.bdlbwhite}></td>
                        <td style={styles.fontbfc000textcenter}>Total</td>
                        <td style={(userLogin.permission.price == 'All')?styles.fontbfc000textrightbgebtdtext:styles.hidden}>
                            {numberFormat(setDetail.totalActualCost['USD'])}
                        </td>
                        <td style={(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All')?
                            styles.fontbfc000textrightbgebtdtext:styles.hidden}>
                            {numberFormat(setDetail.totalUpdatedCost['USD'])}
                        </td>
                        <td style={(userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                            || userLogin.permission.price == 'All')? styles.fontbfc000textrightbgebtdtext:styles.hidden}>
                            {numberFormat(setDetail.totalPrice['USD'])}
                        </td>
                    </tr>
                </tbody>
            );
        }else if(items != undefined && items.length != 1){
            return (
                <tbody key={setDetail.reference} id={setDetail.reference}>
                    {setDetail.items.map((subitem,index) => {
                        return (
                            <tr key={index} id={index}>
                                <td style={styles.td}>{subitem.reference}</td>
                                <td style={styles.td}>{subitem.warehouse}</td>
                                <td style={styles.td}>{subitem.description}</td>
                                <td style={styles.tdLeft}>{subitem.stoneDetail == ''?'-':subitem.stoneDetail}</td>
                                <td style={(userLogin.permission.price == 'All')?styles.tdRight:styles.hidden}>
                                    {numberFormat(subitem.actualCost['USD'])}
                                </td>
                                <td style={(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All')?
                                    styles.tdRight:styles.hidden}>
                                    {numberFormat(subitem.updatedCost['USD'])}
                                </td>
                                <td style={(userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                                    || userLogin.permission.price == 'All')? styles.tdRight:styles.hidden}>
                                    {numberFormat(subitem.price['USD'])}
                                </td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td colSpan="3" style={styles.bdlbwhite}></td>
                        <td style={styles.fontbfc000textcenter}>Total</td>
                        <td style={(userLogin.permission.price == 'All')?styles.fontbfc000textrightbgebtdtext:styles.hidden}>
                            {numberFormat(setDetail.totalActualCost['USD'])}
                        </td>
                        <td style={(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All')?
                            styles.fontbfc000textrightbgebtdtext:styles.hidden}>
                            {numberFormat(setDetail.totalUpdatedCost['USD'])}
                        </td>
                        <td style={(userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                            || userLogin.permission.price == 'All')? styles.fontbfc000textrightbgebtdtext:styles.hidden}>
                            {numberFormat(setDetail.totalPrice['USD'])}
                        </td>
                    </tr>
                </tbody>
            );
        }else{
            return (
                <tbody key={setDetail.reference} id={setDetail.reference}>
                    <tr>
                        <td colSpan="3" style={styles.bdlbwhite}></td>
                        <td style={styles.fontbfc000textcenter}>Total</td>
                        <td style={(userLogin.permission.price == 'All')?styles.fontbfc000textrightbgebtdtext:styles.hidden}>
                            {numberFormat(!!setDetail.totalActualCost?setDetail.totalActualCost['USD']:0)}
                        </td>
                        <td style={(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All')?
                            styles.fontbfc000textrightbgebtdtext:styles.hidden}>
                            {numberFormat(!!setDetail.totalUpdatedCost?setDetail.totalUpdatedCost['USD']:0)}
                        </td>
                        <td style={(userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                            || userLogin.permission.price == 'All')? styles.fontbfc000textrightbgebtdtext:styles.hidden}>
                            {numberFormat(!!setDetail.totalPrice?setDetail.totalPrice['USD']:0)}
                        </td>
                    </tr>
                </tbody>
            );
        }
    }
}

module.exports = ViewDetailSetCatalogPrint
