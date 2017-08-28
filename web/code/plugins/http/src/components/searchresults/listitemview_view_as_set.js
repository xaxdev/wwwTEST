import React, { Component, PropTypes } from 'react';
import ReactImageFallback from 'react-image-fallback';
import numberFormat2digit from '../../utils/convertNumberformatwithcomma2digit';
import numberFormat from '../../utils/convertNumberformat';

class ListItemsViewASSet extends Component {
     constructor(props) {
         super(props);

         this.renderCheckItem = this.renderCheckItem.bind(this);
         this.onClickGrid = this.onClickGrid.bind(this);

     }
     static propTypes = {
       onClickGrid: PropTypes.func.isRequired
     };
     onClickGrid(event) {
       // console.log('onClickGrid->',event.currentTarget.id);
       event.preventDefault();
       this.props.onClickList(event.currentTarget.id);
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
          let row = item.items.length +1;
          const userLogin = JSON.parse(sessionStorage.logindata);
           
          if (item.items.length == 1) {
              return (
                  <tbody>
                      {item.items.map((subitem) => {
                          return (
                              <tr>
                                  <td>{this.renderCheckItem(item.reference)}</td>
                                  <td><img id={item.reference} src={item.imageThumbnail} width="60"
                                        onClick={this.onClickGrid}/></td>
                                  <td><span id={item.reference} onClick={this.onClickGrid}>{item.reference}</span></td>
                                  <td>{subitem.reference}</td>
                                  <td>{subitem.description}</td>
                                  <td>{subitem.sku}</td>
                                  <td className="text-right">{subitem.hierarchy != undefined ? subitem.hierarchy.split('\\').slice(-1).pop():''}</td>
                                  <td className="text-right">{subitem.company}</td>
                                  <td className="text-right">{subitem.warehouse}</td>
                                  <td className="text-right">{numberFormat2digit(subitem.grossWeight)}</td>
                                  <td className={`${(userLogin.permission.price == 'All') ?
                                      '' : ' hidden'}`}>{numberFormat(subitem.actualCost['USD'])}</td>
                                  <td className={`${(userLogin.permission.price == 'Updated'
                                      || userLogin.permission.price == 'All') ?
                                      '' : ' hidden'}`}>{numberFormat(subitem.updatedCost['USD'])}</td>
                                  <td className={`${(userLogin.permission.price == 'Public'
                                      || userLogin.permission.price == 'Updated'
                                      || userLogin.permission.price == 'All') ?
                                      '' : ' hidden'}`}>{numberFormat(subitem.price['USD'])}</td>
                              </tr>
                          );
                      })}
                      <tr>
                          <td  colSpan="9" className="bd-lb-white"></td>
                          <td className="font-b fc-000 text-center bg-eb">Total</td>
                          <td className={`font-b fc-000 bg-eb td-text
                              ${(userLogin.permission.price == 'All') ?
                              '' : ' hidden'}`}>{numberFormat(item.totalActualCost['USD'])}</td>
                          <td className={`font-b fc-000 bg-eb td-text
                              ${(userLogin.permission.price == 'Updated'
                              || userLogin.permission.price == 'All') ?
                              '' : ' hidden'}`}>{numberFormat(item.totalUpdatedCost['USD'])}</td>
                          <td className={`font-b fc-000 bg-eb td-text
                              ${(userLogin.permission.price == 'Public'
                              || userLogin.permission.price == 'Updated'
                              || userLogin.permission.price == 'All') ?
                              '' : ' hidden'}`}>{numberFormat(item.totalPrice['USD'])}</td>
                      </tr>
                      <tr>
                        <td colSpan="13" height="40px" className="bd-tblr-white"></td>
                      </tr>
                  </tbody>
              );
          }else{
              return (
                  <tbody>
                      <tr>
                          <td rowSpan={row}>{this.renderCheckItem(item.reference)}</td>
                          <td rowSpan={row}><img id={item.reference} src={item.imageThumbnail} width="60"
                                                onClick={this.onClickGrid}/></td>
                          <td rowSpan={row}><span id={item.reference} onClick={this.onClickGrid}>{item.reference}</span></td>
                      </tr>
                      {item.items.map((subitem) => {
                          return (
                              <tr>
                                  <td>{subitem.reference}</td>
                                  <td>{subitem.description}</td>
                                  <td>{subitem.sku}</td>
                                  <td className="text-right">{subitem.hierarchy != undefined ? subitem.hierarchy.split('\\').slice(-1).pop():''}</td>
                                  <td className="text-right">{subitem.company}</td>
                                  <td className="text-right">{subitem.warehouse}</td>
                                  <td className="text-right">{numberFormat2digit(subitem.grossWeight)}</td>
                                  <td className={`${(userLogin.permission.price == 'All') ?
                                      '' : ' hidden'}`}>{numberFormat(subitem.actualCost['USD'])}</td>
                                  <td className={`${(userLogin.permission.price == 'Updated'
                                      || userLogin.permission.price == 'All') ?
                                      '' : ' hidden'}`}>{numberFormat(subitem.updatedCost['USD'])}</td>
                                  <td className={`${(userLogin.permission.price == 'Public'
                                      || userLogin.permission.price == 'Updated'
                                      || userLogin.permission.price == 'All') ?
                                      '' : ' hidden'}`}>{numberFormat(subitem.price['USD'])}</td>
                              </tr>
                          );
                      })}
                  <tr>
                      <td  colSpan="9" className="bd-lb-white"></td>
                      <td className="font-b fc-000 text-center bg-eb">Total</td>
                      <td className={`font-b fc-000 text-right bg-eb td-text
                          ${(userLogin.permission.price == 'All') ?
                          '' : ' hidden'}`}>{numberFormat(item.totalActualCost['USD'])}</td>
                      <td className={`font-b fc-000 text-right bg-eb td-text
                          ${(userLogin.permission.price == 'Updated'
                          || userLogin.permission.price == 'All') ?
                          '' : ' hidden'}`}>{numberFormat(item.totalUpdatedCost['USD'])}</td>
                      <td className={`font-b fc-000 text-right bg-eb td-text
                          ${(userLogin.permission.price == 'Public'
                          || userLogin.permission.price == 'Updated'
                          || userLogin.permission.price == 'All') ?
                          '' : ' hidden'}`}>{numberFormat(item.totalPrice['USD'])}</td>
                  </tr>
                  <tr>
                        <td colSpan="13" height="40px" className="bd-tblr-white"></td>
                  </tr>
                  </tbody>
              );
          }
     }
}

module.exports = ListItemsViewASSet
