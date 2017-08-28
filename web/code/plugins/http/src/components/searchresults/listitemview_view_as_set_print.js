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
         let row = item.items.length +1;
         const userLogin = JSON.parse(sessionStorage.logindata);
         
         if (item.items.length == 1) {
             return (
                 <tbody>
                     {item.items.map((subitem) => {
                         return (
                             <tr>
                                <td className="tdd"><img src={item.imageThumbnail} width="60"/></td>
                                <td className="tdd">{item.reference}</td>
                                 <td className="tdd">{subitem.reference}</td>
                                 <td className="tdd">{subitem.description}</td>
                                 <td className="tdd">{subitem.sku}</td>
                                 <td className="tdd">{subitem.hierarchy != undefined ? subitem.hierarchy.split('\\').slice(-1).pop():''}</td>
                                 <td className="tdd">{subitem.company}</td>
                                 <td className="tdd">{subitem.warehouse}</td>
                                 <td className="tdd">{numberFormat2digit(subitem.grossWeight)}</td>
                                 <td className={`tdd${(userLogin.permission.price == 'All') ?
                                    '' : ' hidden'}`}>{numberFormat(subitem.actualCost['USD'])}</td>
                                 <td className={`tdd${(userLogin.permission.price == 'Updated'
                                     || userLogin.permission.price == 'All') ?
                                     '' : ' hidden'}`}>{numberFormat(subitem.updatedCost['USD'])}</td>
                                 <td className={`tdd${(userLogin.permission.price == 'Public'
                                     || userLogin.permission.price == 'Updated'
                                     || userLogin.permission.price == 'All') ?
                                     '' : ' hidden'}`}>{numberFormat(subitem.price['USD'])}</td>
                             </tr>
                         );
                     })}
                     <tr>
                         <td colSpan="8" className="bd-lb-white"></td>
                         <td className="font-b fc-000 text-center bg-eb">Total</td>
                         <td className={`font-b fc-000 text-right bg-eb${(userLogin.permission.price == 'All') ?
                            '' : ' hidden'}`}>{numberFormat(item.totalActualCost['USD'])}</td>
                         <td className={`font-b fc-000 text-right bg-eb${(userLogin.permission.price == 'Updated'
                             || userLogin.permission.price == 'All') ?
                             '' : ' hidden'}`}>{numberFormat(item.totalUpdatedCost['USD'])}</td>
                         <td className={`font-b fc-000 text-right bg-eb${(userLogin.permission.price == 'Public'
                             || userLogin.permission.price == 'Updated'
                             || userLogin.permission.price == 'All') ?
                             '' : ' hidden'}`}>{numberFormat(item.totalPrice['USD'])}</td>
                     </tr>
                     <tr>
                        <td className="bd-tblr-white" colSpan="12" height="40px" ></td>
                     </tr>
                 </tbody>
             );
         }else{
             return (
                 <tbody>
                     <td className="tdd" rowSpan={row}><img src={item.imageThumbnail} width="60"/></td>
                     <td className="tdd" rowSpan={row}>{item.reference}</td>
                     {item.items.map((subitem) => {
                         return (
                             <tr>
                                 <td className="tdd">{subitem.reference}</td>
                                 <td className="tdd">{subitem.description}</td>
                                 <td className="tdd">{subitem.sku}</td>
                                 <td className="tdd">{subitem.hierarchy != undefined ? subitem.hierarchy.split('\\').slice(-1).pop():''}</td>
                                 <td className="tdd">{subitem.company}</td>
                                 <td className="tdd">{subitem.warehouse}</td>
                                 <td className="tdd">{numberFormat2digit(subitem.grossWeight)}</td>
                                 <td className={`tdd${(userLogin.permission.price == 'All') ?
                                    '' : ' hidden'}`}>{numberFormat(subitem.actualCost['USD'])}</td>
                                 <td className={`tdd${(userLogin.permission.price == 'Updated'
                                     || userLogin.permission.price == 'All') ?
                                     '' : ' hidden'}`}>{numberFormat(subitem.updatedCost['USD'])}</td>
                                 <td className={`tdd${(userLogin.permission.price == 'Public'
                                     || userLogin.permission.price == 'Updated'
                                     || userLogin.permission.price == 'All') ?
                                     '' : ' hidden'}`}>{numberFormat(subitem.price['USD'])}</td>
                             </tr>
                         );
                     })}
                     <tr>
                         <td  colSpan="8" className="bd-lb-white"></td>
                         <td className="font-b fc-000 text-center bg-eb">Total</td>
                         <td className={`font-b fc-000 text-right bg-eb${(userLogin.permission.price == 'All') ?
                            '' : ' hidden'}`}>{numberFormat(item.totalActualCost['USD'])}</td>
                         <td className={`font-b fc-000 text-right bg-eb${(userLogin.permission.price == 'Updated'
                             || userLogin.permission.price == 'All') ?
                             '' : ' hidden'}`}>{numberFormat(item.totalUpdatedCost['USD'])}</td>
                         <td className={`font-b fc-000 text-right bg-eb${(userLogin.permission.price == 'Public'
                             || userLogin.permission.price == 'Updated'
                             || userLogin.permission.price == 'All') ?
                             '' : ' hidden'}`}>{numberFormat(item.totalPrice['USD'])}</td>
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
