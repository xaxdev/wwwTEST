import React, { Component, PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import { Modal, ModalClose } from 'react-modal-bootstrap';

class RenderExportExcelDialog extends Component {
    render(){
        const { that, userLogin, checkFields, labels, selectedAllFields, selectedNoAllFields } = this.props;
        let checkAll = true;
        return(
            <div className="popexport">
                <Modal isOpen={that.state.isOpen} onRequestHide={that.hideModal}>
                    <div className="modal-header">
                        <ModalClose onClick={that.hideModal}/>
                        <h1 className="modal-title">Export</h1>
                    </div>
                    <div className="modal-body">
                        <h3>Please choose additional fields for export.</h3>
                        <h5>(Normal export field Item Reference, Item Description, SKU, Item Vendor Reference,
                            {`${(userLogin.permission.price == 'All') ? 'Initial Cost, ':''}`}
                            {`${(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ? 'Updated Price, ':''}`}
                            {`${(userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ? 'Retail Price, ':''}`}
                            {`${(userLogin.permission.price == 'All') ? 'Initial Cost (USD), ':''}`}
                            {`${(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ? 'Updated Price (USD), ':''}`}
                            {`${(userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ? 'Retail Price (USD), ':''}`}
                            Special Discount, Item Weight (Grams), Ring Size, Jewels Weight (text), Site, Company, Location)
                        </h5>
                        <br/>
                        <div className="col-sm-12">
                            <div className="col-sm-3 checkbox checkbox-warning popexport">
                                <input type="checkbox" checked={that.state.allFields}
                                    onChange={event => {
                                        that.setState({ allFields: event.target.checked });
                                        if (event.target.checked) {
                                            checkFields.map(function(field, index){
                                                that.setState({ [field]: true });
                                            });
                                        } else {
                                            checkFields.map(function(field, index){
                                                that.setState({ [field]: false });
                                            });
                                        }
                                    }}/>
                                <label className="control-label checkbox1">Select All</label>
                            </div>
                            <div className="col-sm-3 checkbox checkbox-warning popexport">
                                <input type="checkbox" checked={that.state.showImages} onChange={event => that.setState({ showImages: event.target.checked })}/>
                                <label className="control-label checkbox1">Show Images</label>
                            </div>
                            <div className="col-sm-3"> </div>
                            <div className="col-sm-3"> </div>
                        </div>
                        <div className="col-md-12">
                            {
                                checkFields.map(function(field, index){
                                    checkAll = checkAll && that.state[field];
                                    if (checkAll) {
                                        selectedAllFields
                                    }else{
                                        selectedNoAllFields
                                    }
                                    {
                                        if (field == 'markup') {
                                            return(
                                                <div className={`col-md-3 checkbox checkbox-warning check-detail ${(userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All') ? '':'hidden'}`} key={index}>
                                                    <label key={index}>
                                                        <input id={index} type="checkbox" checked={that.state[field]}
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
                                                        <input id={index} type="checkbox" checked={that.state[field]}
                                                            onChange={event => {
                                                                that.setState({ [field]: event.target.checked });
                                                                that.setState({ allFields:false });
                                                            }} />
                                                        {labels[ field ]}
                                                    </label>
                                                </div>
                                            );
                                        }
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button id="export" className="btn btn-default btn-radius" onClick={that.confirmExport}>
                            Export
                        </button>
                        <button className="btn btn-default btn-radius" onClick={that.hideModal}>
                            Cancel
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }
}

module.exports = RenderExportExcelDialog
