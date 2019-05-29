import React, { Component } from 'react';
import numberFormat2digit from '../../utils/convertNumberformatwithcomma2digit';
import numberFormat from '../../utils/convertNumberformat';

class ListItemsViewASSet extends Component {
    constructor(props) {
        super(props);

        this.renderCheckItem = this.renderCheckItem.bind(this);
        this.onClickGrid = this.onClickGrid.bind(this);

    }

    onClickGrid = (event) => {
        event.preventDefault();
        this.props.onClickList(event.currentTarget.id);
    }

    renderCheckItem = (val, row) => {
        const { onCheckedOneItemMyCatalog, ViewAsSet, listMyCatalog, items } = this.props;
        let checkItem = false;
        if (!!listMyCatalog) {
            checkItem = listMyCatalog.find((myItem) => {
                return myItem.reference == val;
            });
        }
        checkItem = !checkItem ? false : true;  //if undefined checked false else true
        return(
            <div className="checkbox checkbox-warning">
                <input type="checkbox" className="styled" type="checkbox" name={val} checked={checkItem} id={val} value={val}
                    onChange={onCheckedOneItemMyCatalog}
                />
                <label className="checkbox1"></label>
            </div>
        );
    }

    render = _ => {
        const { item, tableColumns } = this.props;
        const isItems = item.items != undefined ? item.items.length > 0 ? true : false : false;
        let row = item.items != undefined ? item.items.length + 1 : 0;
        const userLogin = JSON.parse(sessionStorage.logindata);
        let colSpan = tableColumns.length == 1 ? 4 : (4 + tableColumns.length) - 1

        if (item.items != undefined && item.items.length == 1) {
            return (
                <tbody key={item.reference} id={item.reference}>
                    {item.items.map((subitem) => {
                        const isSpecialDisc = subitem.specialDiscount != undefined ? subitem.specialDiscount == 1?true:false : false;
                        return (
                            <tr key={subitem.reference} id={subitem.reference}>
                                <td>{this.renderCheckItem(item.reference)}</td>
                                <td>
                                    <div className="list-tagbar-special">
                                        <span className={`${(isSpecialDisc)?'tagbar-special':''}`}></span>
                                        <img id={item.reference} src={item.imageThumbnail} width="60" onClick={this.onClickGrid}/>
                                    </div>
                                </td>
                                <td><span id={item.reference} onClick={this.onClickGrid}>{item.reference}</span></td>
                                <td>{subitem.reference}</td>
                                {tableColumns.map((title)=>{
                                    switch (title) {
                                        case 'stoneDetail':
                                            return(<td className="text-left">{subitem[title] == ''?'-':subitem[title]}</td>)
                                            break;
                                        case 'grossWeight':
                                            return(<td className="text-right">{numberFormat2digit(subitem[title])}</td>)
                                            break;
                                        case 'hierarchy':
                                            return(<td>{subitem[title] != undefined ? subitem[title].split('\\').slice(-1).pop():''}</td>)
                                            break;
                                        default:
                                            return(<td>{subitem[title]}</td>)
                                            break;
                                    }
                                })}
                                <td className={`text-right${(userLogin.permission.price == 'All') ?
                                    '' : ' hidden'}`}>{numberFormat(subitem.actualCost['USD'])}</td>
                                <td className={`text-right${(userLogin.permission.price == 'Updated'
                                    || userLogin.permission.price == 'All') ?
                                    '' : ' hidden'}`}>{numberFormat(subitem.updatedCost['USD'])}</td>
                                <td className={`text-right${(userLogin.permission.price == 'Public'
                                    || userLogin.permission.price == 'Updated'
                                    || userLogin.permission.price == 'All') ?
                                    '' : ' hidden'}`}>{numberFormat(subitem.price['USD'])}</td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td colSpan={colSpan} className="bd-lb-white"></td>
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
        }else if(item.items != undefined && item.items.length != 1){
            const isSpecialDisc = item.specialDiscount != undefined ? item.specialDiscount == 1?true:false : false;
            return (
                <tbody key={item.reference} id={item.reference}>
                    <tr>
                        <td rowSpan={row}>{this.renderCheckItem(item.reference)}</td>
                        <td rowSpan={row}>
                            <div className="list-tagbar-special">
                                <span className={`${(isSpecialDisc)?'tagbar-special':''}`}></span>
                                <img id={item.reference} src={item.imageThumbnail} width="60" onClick={this.onClickGrid}/>
                            </div>
                        </td>
                        <td rowSpan={row}><span id={item.reference} onClick={this.onClickGrid}>{item.reference}</span></td>
                    </tr>
                    {item.items.map((subitem,index) => {
                        return (
                            <tr key={index} id={index}>
                                <td>{subitem.reference}</td>
                                {tableColumns.map((title)=>{
                                    switch (title) {
                                        case 'stoneDetail':
                                            return(<td className="text-left">{subitem[title] == ''?'-':subitem[title]}</td>)
                                            break;
                                        case 'grossWeight':
                                            return(<td className="text-right">{numberFormat2digit(subitem[title])}</td>)
                                            break;
                                        case 'hierarchy':
                                            return(<td>{subitem[title] != undefined ? subitem[title].split('\\').slice(-1).pop():''}</td>)
                                            break;
                                        default:
                                            return(<td>{subitem[title]}</td>)
                                            break;
                                    }
                                })}
                                <td className={`text-right ${(userLogin.permission.price == 'All') ?
                                    '' : ' hidden'}`}>{numberFormat(subitem.actualCost['USD'])}</td>
                                <td className={`text-right ${(userLogin.permission.price == 'Updated'
                                    || userLogin.permission.price == 'All') ?
                                    '' : ' hidden'}`}>{numberFormat(subitem.updatedCost['USD'])}</td>
                                <td className={`text-right ${(userLogin.permission.price == 'Public'
                                    || userLogin.permission.price == 'Updated'
                                    || userLogin.permission.price == 'All') ?
                                    '' : ' hidden'}`}>{numberFormat(subitem.price['USD'])}</td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td colSpan={colSpan} className="bd-lb-white"></td>
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
        }else{
            const isSpecialDisc = item.specialDiscount != undefined ? item.specialDiscount == 1?true:false : false;
            return (
                <tbody key={item.reference} id={item.reference}>
                    <tr>
                        <td rowSpan={row}>{this.renderCheckItem(item.reference)}</td>
                        <td rowSpan={row}>
                            <div className="list-tagbar-special">
                                <span className={`${(isSpecialDisc)?'tagbar-special':''}`}></span>
                                <img id={item.reference} src={item.imageThumbnail} width="60" onClick={this.onClickGrid}/>
                            </div>
                        </td>
                        <td rowSpan={row}><span id={item.reference} onClick={this.onClickGrid}>{item.reference}</span></td>
                    </tr>
                    <tr>
                        <td colSpan={colSpan} className="bd-lb-white"></td>
                        <td className="font-b fc-000 text-center bg-eb">Total</td>
                        <td className={`font-b fc-000 text-right bg-eb td-text
                            ${(userLogin.permission.price == 'All') ?
                            '' : ' hidden'}`}>{numberFormat(!!item.totalActualCost?item.totalActualCost['USD']:0)}</td>
                        <td className={`font-b fc-000 text-right bg-eb td-text
                            ${(userLogin.permission.price == 'Updated'
                            || userLogin.permission.price == 'All') ?
                            '' : ' hidden'}`}>{numberFormat(!!item.totalUpdatedCost?item.totalUpdatedCost['USD']:0)}</td>
                        <td className={`font-b fc-000 text-right bg-eb td-text
                            ${(userLogin.permission.price == 'Public'
                            || userLogin.permission.price == 'Updated'
                            || userLogin.permission.price == 'All') ?
                            '' : ' hidden'}`}>{numberFormat(!!item.totalPrice?item.totalPrice['USD']:0)}</td>
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
