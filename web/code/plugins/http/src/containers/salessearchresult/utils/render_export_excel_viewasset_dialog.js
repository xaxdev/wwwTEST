import React, { Component, PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import { Modal, ModalClose } from 'react-modal-bootstrap';

class RenderExportExcelViewAsSetDialog extends Component {
    render(){
        const { that, userLogin, checkFieldsViewAsSet , labelsViewAsSet } = this.props;
        let checkAll = true;
        return(
            <div  className="popexport viewset">
              <Modal isOpen={that.state.isOpenViewAsSet} onRequestHide={that.hideModalViewAsSet}>
                <div className="modal-header">
                  <ModalClose onClick={that.hideModalViewAsSet}/>
                  <h1 className="modal-title">Export View As Set</h1>
                </div>
                <div className="modal-body">
                  <h3>Please choose additional fields for export.1</h3>
                  <h5 className="text-center">(Normal export field Item Reference, Description)</h5>
                  <br/>
                  <div className="col-sm-12 inline">
                    <div className="col-sm-4 checkbox checkbox-warning popexport">
                      <div className="col-md-12 col-xs-12 checkbox checkbox-warning">
                        <input type="checkbox" checked={that.state.allFieldsViewAsSet}
                            onChange={event => {
                                    that.setState({ allFieldsViewAsSet: event.target.checked });
                                    if (event.target.checked) {
                                        checkFieldsViewAsSet.map(function(field, index){
                                            that.setState({ [field]: true });
                                        });
                                    } else {
                                        checkFieldsViewAsSet.map(function(field, index){
                                            that.setState({ [field]: false });
                                        });
                                    }
                                }
                            }/>
                        <label className="control-label checkbox1">Select All</label>
                      </div>
                      <div className="col-md-12 col-xs-12 checkbox checkbox-warning">
                        <input type="checkbox"
                          checked={that.state.showImagesViewAsSet}
                          onChange={event => that.setState({ showImagesViewAsSet: event.target.checked })}/>
                        <label className="control-label checkbox1">Show Images</label>
                      </div>
                    </div>

                  <div className="col-sm-8 maring-b10">
                    {checkFieldsViewAsSet.map(function(field, index){
                        let showField = false;
                        switch (field) {
                            case 'totalPrice':
                                checkAll = checkAll && that.state[field];
                                showField = (userLogin.permission.price == 'Public') ||
                                            (userLogin.permission.price == 'Updated') ||
                                            (userLogin.permission.price == 'All')
                                            ? true: false;
                                break;
                            case 'totalUpdatedCost':
                                checkAll = checkAll && that.state[field];
                                showField = (userLogin.permission.price == 'Updated') ||
                                            (userLogin.permission.price == 'All')
                                            ? true: false;
                                break;
                            case 'totalActualCost':
                                checkAll = checkAll && that.state[field];
                                showField = (userLogin.permission.price == 'All') ? true: false;
                                break;
                            default:
                                checkAll = checkAll && that.state[field];
                                showField = true;
                                break;
                        }
                        if (checkAll) {
                            that.setState({ allFieldsViewAsSet:true });
                        }else{
                            that.setState({ allFieldsViewAsSet:false });
                        }
                        if (showField) {
                            return(
                                  <div className="col-md-6 col-sm-6 col-xs-12 checkbox checkbox-warning check-detail" key={index}>
                                    <label key={index}>
                                      <input id={index} type="checkbox" checked={that.state[field]}
                                        onChange={event => {
                                            that.setState({ [field]: event.target.checked });
                                          }
                                        }
                                        />
                                      {labelsViewAsSet[ field ]}
                                    </label>
                                  </div>
                            );
                        } else {
                            return('');
                        }
                      }
                    )}
                  </div>
                </div>
                </div>
                <div className="modal-footer">
                  <button id="export" className="btn btn-default btn-radius" onClick={that.confirmExportViewAsSet}>
                    Export
                  </button>
                  <button className="btn btn-default btn-radius" onClick={that.hideModalViewAsSet}>
                    Cancel
                  </button>
                </div>
              </Modal>
            </div>
        );
    }
}

module.exports = RenderExportExcelViewAsSetDialog
