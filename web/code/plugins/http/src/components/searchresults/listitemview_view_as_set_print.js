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
         return (
             <tbody>
               <td rowSpan={row}><img src={item.imageThumbnail} width="60"/></td>
               <td rowSpan={row}>{item.reference}</td>
                {item.items.map((subitem) => {
                    return (
                        <tr>
                            <td>{subitem.reference}</td>
                            <td>{subitem.description}</td>
                            <td>{subitem.sku}</td>
                            <td>{subitem.hierarchy != undefined ? subitem.hierarchy.split('\\').slice(-1).pop():''}</td>
                            <td>{subitem.company}</td>
                            <td>{subitem.warehouse}</td>
                            <td>{numberFormat2digit(subitem.grossWeight)}</td>
                            <td>{numberFormat(subitem.actualCost['USD'])}</td>
                            <td>{numberFormat(subitem.updatedCost['USD'])}</td>
                            <td>{numberFormat(subitem.price['USD'])}</td>
                        </tr>
                    );
                })}
                <tr>
                    <td  colSpan="9" className="bd-lb-white"></td>
                    <td className="font-b fc-000 text-center bg-eb">Total</td>
                    <td className="font-b fc-000 bg-eb">{numberFormat(item.totalActualCost['USD'])}</td>
                    <td className="font-b fc-000 bg-eb">{numberFormat(item.totalUpdatedCost['USD'])}</td>
                    <td className="font-b fc-000 bg-eb">{numberFormat(item.totalPrice['USD'])}</td>
                </tr>
                <tr>
                  <td colSpan="13" height="40px" className="bd-tblr-white"></td>
                </tr>
             </tbody>
         );
     }
}

module.exports = ListItemsViewASSetPrint
