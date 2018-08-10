import React, { Component, PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import GetSalesPricePermission from '../../../utils/getSalesPricePermission';

class RenderSalesExportExcelDialog extends Component {
    render(){

        const { that, state, userLogin, checkFields, labels, onClickHideModal, onClickConfirmExport, onChangedSelectedAllFieldsExportExcel,
                onChangedShowImages, selectedAllFields, selectedNoAllFields } = this.props;
        let checkAll = true;
        const priceSalesRTP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesRTP;
        const priceSalesUCP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesUCP;
        const priceSalesCTP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesCTP;
        const priceSalesNSP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesNSP;
        const priceSalesMGP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesMGP;
        const priceSalesDSP = GetSalesPricePermission(userLogin.permission.priceSales).priceSalesDSP;
        return(
            <div  className="popexport">
                <Modal isOpen={state.isOpen} onRequestHide={onClickHideModal}>
                    <div className="modal-header">
                        <ModalClose onClick={onClickHideModal}/>
                        <h1 className="modal-title">Export</h1>
                    </div>
                    <div className="modal-body">
                        <h3>Please choose additional fields for export.</h3>
                        <h5>(Normal export field Item Reference, Description, SKU,
                              {`${(priceSalesCTP) ? 'Cost Price (USD), ':''}`}
                              {`${(priceSalesUCP) ? 'Updated Price (USD), ':''}`}
                              {`${(priceSalesRTP) ? 'Price (USD), ':''}`}
                              {`${(priceSalesNSP) ? 'Net Sales (USD), ':''}`}
                              {`${(priceSalesMGP) ? 'Margin %, ':''}`}
                              {`${(priceSalesMGP) ? 'Margin Amount (USD), ':''}`}
                              {`${(priceSalesDSP) ? 'Discount %, ':''}`}
                              {`${(priceSalesDSP) ? 'Discount Amount (USD), ':''}`}
                              Item Weight (Grams), Ring Size, Jewels Weight (text), Site, Company, Location)</h5>
                        <br/>
                        <div className="col-sm-12">
                            <div className="col-sm-3 checkbox checkbox-warning popexport">
                                <input type="checkbox" checked={state.allFields} onChange={onChangedSelectedAllFieldsExportExcel}/>
                                <label className="control-label checkbox1">Select All</label>
                            </div>
                            <div className="col-sm-3 checkbox checkbox-warning popexport">
                                <input type="checkbox" checked={state.showImages} onChange={onChangedShowImages}/>
                                <label className="control-label checkbox1">Show Images</label>
                            </div>
                            <div className="col-sm-3"> </div>
                            <div className="col-sm-3"> </div>
                        </div>
                        <div className="col-md-12">
                            {
                                checkFields.map(function(field, index){
                                    checkAll = checkAll && state[field];
                                    if (checkAll) {
                                        selectedAllFields
                                    }else{
                                        selectedNoAllFields
                                    }
                                    if (field == 'markup') {
                                        return(
                                            <div className={`col-md-3 checkbox checkbox-warning check-detail ${(priceSalesUCP) ? '':'hidden'}`} key={index}>
                                                <label key={index}>
                                                    <input id={index} type="checkbox" checked={state[field]}
                                                        onChange={event => {
                                                            that.setState({ [field]: event.target.checked });
                                                            that.setState({ allFields:false });
                                                        }} />
                                                    {labels[ field ]}
                                                </label>
                                            </div>
                                        );
                                    }else{
                                        return(
                                            <div className="col-md-3 checkbox checkbox-warning check-detail" key={index}>
                                                <label key={index}>
                                                    <input id={index} type="checkbox" checked={state[field]}
                                                        onChange={event => {
                                                            that.setState({ [field]: event.target.checked });
                                                            that.setState({ allFields:false });
                                                        }} />
                                                    {labels[ field ]}
                                                </label>
                                            </div>
                                        );
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button id="export" className="btn btn-default btn-radius" onClick={onClickConfirmExport}>
                            Export
                        </button>
                        <button className="btn btn-default btn-radius" onClick={onClickHideModal}>
                            Cancel
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }
}

module.exports = RenderSalesExportExcelDialog
