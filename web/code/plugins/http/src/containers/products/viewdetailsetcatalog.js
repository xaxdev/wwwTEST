import React, { Component, PropTypes } from 'react';
import ReactImageFallback from 'react-image-fallback';
import numberFormat2digit from '../../utils/convertNumberformatwithcomma2digit';
import numberFormat from '../../utils/convertNumberformat';

class ViewDetailSetCatalog extends Component {
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
                    onChange={onCheckedOneItemMyCatalog} />
                <label className="checkbox1"></label>
            </div>
        );
    }
    render = _ => {
        const { items,setDetail } = this.props;
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
                                <td>{subitem.reference}</td>
                                <td>{subitem.warehouse}</td>
                                <td>{subitem.description}</td>
                                <td className="text-left">{subitem.stoneDetail == ''?'-':subitem.stoneDetail}</td>
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
                        <td colSpan="3" className="bd-lb-white"></td>
                        <td className="font-b fc-000 text-center bg-eb">Total</td>
                        <td className={`font-b fc-000 text-right bg-eb td-text
                            ${(userLogin.permission.price == 'All') ?
                            '' : ' hidden'}`}>{numberFormat(setDetail.totalActualCost['USD'])}</td>
                        <td className={`font-b fc-000 text-right bg-eb td-text
                            ${(userLogin.permission.price == 'Updated'
                            || userLogin.permission.price == 'All') ?
                            '' : ' hidden'}`}>{numberFormat(setDetail.totalUpdatedCost['USD'])}</td>
                        <td className={`font-b fc-000 text-right bg-eb td-text
                            ${(userLogin.permission.price == 'Public'
                            || userLogin.permission.price == 'Updated'
                            || userLogin.permission.price == 'All') ?
                            '' : ' hidden'}`}>{numberFormat(setDetail.totalPrice['USD'])}</td>
                    </tr>
                </tbody>
            );
        }else if(items != undefined && items.length != 1){
            return (
                <tbody key={setDetail.reference} id={setDetail.reference}>
                    {setDetail.items.map((subitem,index) => {
                        return (
                            <tr key={index} id={index}>
                                <td>{subitem.reference}</td>
                                <td>{subitem.warehouse}</td>
                                <td>{subitem.description}</td>
                                <td className="text-left">{subitem.stoneDetail == ''?'-':subitem.stoneDetail}</td>
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
                        <td colSpan="3" className="bd-lb-white"></td>
                        <td className="font-b fc-000 text-center bg-eb">Total</td>
                        <td className={`font-b fc-000 text-right bg-eb td-text
                            ${(userLogin.permission.price == 'All') ?
                            '' : ' hidden'}`}>{numberFormat(setDetail.totalActualCost['USD'])}</td>
                        <td className={`font-b fc-000 text-right bg-eb td-text
                            ${(userLogin.permission.price == 'Updated'
                            || userLogin.permission.price == 'All') ?
                            '' : ' hidden'}`}>{numberFormat(setDetail.totalUpdatedCost['USD'])}</td>
                        <td className={`font-b fc-000 text-right bg-eb td-text
                            ${(userLogin.permission.price == 'Public'
                            || userLogin.permission.price == 'Updated'
                            || userLogin.permission.price == 'All') ?
                            '' : ' hidden'}`}>{numberFormat(setDetail.totalPrice['USD'])}</td>
                    </tr>
                </tbody>
            );
        }else{
            return (
                <tbody key={setDetail.reference} id={setDetail.reference}>
                    <tr>
                        <td colSpan="3" className="bd-lb-white"></td>
                        <td className="font-b fc-000 text-center bg-eb">Total</td>
                        <td className={`font-b fc-000 text-right bg-eb td-text
                            ${(userLogin.permission.price == 'All') ?
                            '' : ' hidden'}`}>{numberFormat(!!setDetail.totalActualCost?setDetail.totalActualCost['USD']:0)}</td>
                        <td className={`font-b fc-000 text-right bg-eb td-text
                            ${(userLogin.permission.price == 'Updated'
                            || userLogin.permission.price == 'All') ?
                            '' : ' hidden'}`}>{numberFormat(!!setDetail.totalUpdatedCost?setDetail.totalUpdatedCost['USD']:0)}</td>
                        <td className={`font-b fc-000 text-right bg-eb td-text
                            ${(userLogin.permission.price == 'Public'
                            || userLogin.permission.price == 'Updated'
                            || userLogin.permission.price == 'All') ?
                            '' : ' hidden'}`}>{numberFormat(!!setDetail.totalPrice?setDetail.totalPrice['USD']:0)}</td>
                    </tr>
                </tbody>
            );
        }
    }
}

module.exports = ViewDetailSetCatalog
