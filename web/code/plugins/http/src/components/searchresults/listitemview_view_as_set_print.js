import React, { Component, PropTypes } from 'react';
import ReactImageFallback from 'react-image-fallback';
import numberFormat2digit from '../../utils/convertNumberformatwithcomma2digit';
import numberFormat from '../../utils/convertNumberformat';

class ListItemsViewASSetPrint extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        const { item } = this.props;
        const isItems = item.items != undefined
                            ? item.items.length > 0 ? true : false
                            : false;
        let row = item.items != undefined
                       ? item.items.length +1
                       : 0;
        const userLogin = JSON.parse(sessionStorage.logindata);

        if (item.items != undefined && item.items.length == 1) {
            return (
                <tbody key={item.reference} id={item.reference}>
                    {item.items.map((subitem) => {
                        const isSpecialDisc = subitem.specialDiscount != undefined ? subitem.specialDiscount == 1?true:false : false;
                        return (
                            <tr key={subitem.reference} id={subitem.reference}>
                                <td className="tdd">
                                    <div className="list-tagbar-special">
                                        <span className={`${(isSpecialDisc)?'tagbar-special':''}`}></span>
                                        <img src={item.imageThumbnail} width="60"/>
                                    </div>
                                </td>
                                <td className="tdd">{item.reference}</td>
                                <td className="tdd">{subitem.reference}</td>
                                <td className="tdd">{subitem.description}</td>
                                <td className="tdd">{subitem.sku}</td>
                                <td className="tdd">{subitem.hierarchy != undefined ? subitem.hierarchy.split('\\').slice(-1).pop():''}</td>
                                <td className="tdd">{subitem.company}</td>
                                <td className="tdd">{subitem.warehouse}</td>
                                <td className="tdd">{numberFormat2digit(subitem.grossWeight)}</td>
                                <td className="tdd">{subitem.stoneDetail == ''?'-':subitem.stoneDetail}</td>
                                <td className={`tdd${(userLogin.permission.price == 'All') ? '' : ' hidden'}`}>
                                    {numberFormat(subitem.actualCost['USD'])}
                                </td>
                                <td className={`tdd${(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ?
                                    '' : ' hidden'}`}>
                                    {numberFormat(subitem.updatedCost['USD'])}
                                </td>
                                <td className={`tdd${(userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                                    || userLogin.permission.price == 'All') ? '' : ' hidden'}`}>
                                    {numberFormat(subitem.price['USD'])}
                                </td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td colSpan="9" className="bd-lb-white"></td>
                        <td className="font-b fc-000 text-center bg-eb">Total</td>
                        <td className={`font-b fc-000 text-right bg-eb${(userLogin.permission.price == 'All') ? '' : ' hidden'}`}>
                            {numberFormat(item.totalActualCost['USD'])}
                        </td>
                        <td className={`font-b fc-000 text-right bg-eb${(userLogin.permission.price == 'Updated'
                            || userLogin.permission.price == 'All') ? '' : ' hidden'}`}>
                            {numberFormat(item.totalUpdatedCost['USD'])}
                        </td>
                        <td className={`font-b fc-000 text-right bg-eb${(userLogin.permission.price == 'Public'
                            || userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ? '' : ' hidden'}`}>
                            {numberFormat(item.totalPrice['USD'])}
                        </td>
                    </tr>
                    <tr>
                        <td className="bd-tblr-white" colSpan="12" height="40px" ></td>
                    </tr>
                </tbody>
            );
        }else if(item.items != undefined && item.items.length != 1){
            const isSpecialDisc = item.specialDiscount != undefined ? item.specialDiscount == 1?true:false : false;
            return (
                <tbody key={item.reference} id={item.reference}>
                    <tr>
                        <td className="tdd" rowSpan={row}>
                            <div className="list-tagbar-special">
                                <span className={`${(isSpecialDisc)?'tagbar-special':''}`}></span>
                                <img src={item.imageThumbnail} width="60"/>
                            </div>
                        </td>
                        <td className="tdd" rowSpan={row}>{item.reference}</td>
                    </tr>
                    {item.items.map((subitem,index) => {
                        return (
                            <tr key={index} id={index}>
                                <td className="tdd">{subitem.reference}</td>
                                <td className="tdd">{subitem.description}</td>
                                <td className="tdd">{subitem.sku}</td>
                                <td className="tdd">{subitem.hierarchy != undefined ? subitem.hierarchy.split('\\').slice(-1).pop():''}</td>
                                <td className="tdd">{subitem.company}</td>
                                <td className="tdd">{subitem.warehouse}</td>
                                <td className="tdd">{numberFormat2digit(subitem.grossWeight)}</td>
                                <td className="tdd">{subitem.stoneDetail == ''?'-':subitem.stoneDetail}</td>
                                <td className={`tdd${(userLogin.permission.price == 'All') ? '' : ' hidden'}`}>
                                    {numberFormat(subitem.actualCost['USD'])}
                                </td>
                                <td className={`tdd${(userLogin.permission.price == 'Updated'
                                    || userLogin.permission.price == 'All') ? '' : ' hidden'}`}>
                                    {numberFormat(subitem.updatedCost['USD'])}
                                </td>
                                <td className={`tdd${(userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated'
                                    || userLogin.permission.price == 'All') ? '' : ' hidden'}`}>
                                    {numberFormat(subitem.price['USD'])}
                                </td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td  colSpan="9" className="bd-lb-white"></td>
                        <td className="font-b fc-000 text-center bg-eb">Total</td>
                        <td className={`font-b fc-000 text-right bg-eb${(userLogin.permission.price == 'All') ? '' : ' hidden'}`}>
                            {numberFormat(item.totalActualCost['USD'])}
                        </td>
                        <td className={`font-b fc-000 text-right bg-eb${(userLogin.permission.price == 'Updated'
                            || userLogin.permission.price == 'All') ? '' : ' hidden'}`}>
                            {numberFormat(item.totalUpdatedCost['USD'])}
                        </td>
                        <td className={`font-b fc-000 text-right bg-eb${(userLogin.permission.price == 'Public'
                            || userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ? '' : ' hidden'}`}>
                            {numberFormat(item.totalPrice['USD'])}
                        </td>
                    </tr>
                    <tr>
                        <td className="bd-tblr-white" colSpan="12" height="40px" ></td>
                    </tr>
                </tbody>
            );
        }else{
            const isSpecialDisc = item.specialDiscount != undefined ? item.specialDiscount == 1?true:false : false;
            return (
                <tbody>
                    <tr>
                        <td className="tdd" rowSpan={row}>
                            <div className="list-tagbar-special">
                                <span className={`${(isSpecialDisc)?'tagbar-special':''}`}></span>
                                <img src={item.imageThumbnail} width="60"/>
                            </div>
                        </td>
                        <td className="tdd" rowSpan={row}>{item.reference}</td>
                    </tr>
                    <tr>
                        <td  colSpan="9" className="bd-lb-white"></td>
                        <td className="font-b fc-000 text-center bg-eb">Total</td>
                        <td className={`font-b fc-000 text-right bg-eb${(userLogin.permission.price == 'All') ? '' : ' hidden'}`}>
                            {numberFormat(!!item.totalActualCost?item.totalActualCost['USD']:0)}
                        </td>
                        <td className={`font-b fc-000 text-right bg-eb${(userLogin.permission.price == 'Updated'
                            || userLogin.permission.price == 'All') ? '' : ' hidden'}`}>
                            {numberFormat(!!item.totalUpdatedCost?item.totalUpdatedCost['USD']:0)}
                        </td>
                        <td className={`font-b fc-000 text-right bg-eb${(userLogin.permission.price == 'Public'
                            || userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ? '' : ' hidden'}`}>
                            {numberFormat(!!item.totalPrice?item.totalPrice['USD']:0)}
                        </td>
                    </tr>
                    <tr>
                        <td className="bd-tblr-white" colSpan="12" height="40px" ></td>
                    </tr>
                </tbody>
            );
        }
    }
}

module.exports = ListItemsViewASSetPrint
