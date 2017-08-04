import React, { Component, PropTypes } from 'react';
import ReactImageFallback from 'react-image-fallback';
import numberFormat2digit from '../../utils/convertNumberformatwithcomma2digit';
import numberFormat from '../../utils/convertNumberformat';

class ListItemsViewASSet extends Component {
     constructor(props) {
         super(props);

         this.renderCheckItem = this.renderCheckItem.bind(this);

     }
     renderCheckItem = (val, row) =>{
           const { onCheckedOneItemMyCatalog, ViewAsSet, listMyCatalog, items } = this.props;
           let checkItem = false;
           if (!!listMyCatalog) {
               checkItem = listMyCatalog.find((myItem) => {
                   return myItem.reference == val;
               });
           }
           checkItem = !checkItem ? false : true;  //if undefined checked false else true
           return(<div className="checkbox checkbox-warning">
                   <input type="checkbox" className="styled" type="checkbox"
                       name={val} checked={checkItem}
                       id={val}
                       value={val}
                       onChange={onCheckedOneItemMyCatalog}
                   />
                   <label className="checkbox1"></label>
               </div>);
     }

     render(){
         const { item } = this.props;
         const isItems = item.items != undefined
                             ? item.items.length > 0 ? true : false
                             : false;
         return (
             <tbody>
                {item.items.map((subitem) => {
                    return (
                        <tr>
                            <td>{this.renderCheckItem(item.reference)}</td>
                            <td><img src={item.imageThumbnail} width="60"/></td>
                            <td>{item.reference}</td>
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
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="font-b fc-000">Total</td>
                    <td className="font-b fc-000">{numberFormat(item.totalActualCost['USD'])}</td>
                    <td className="font-b fc-000">{numberFormat(item.totalUpdatedCost['USD'])}</td>
                    <td className="font-b fc-000">{numberFormat(item.totalPrice['USD'])}</td>
                </tr>
             </tbody>
         );
     }
}

module.exports = ListItemsViewASSet
