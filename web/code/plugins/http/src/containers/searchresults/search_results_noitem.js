import React, { Component, PropTypes } from 'react';
import { Button,FormControl,Pagination, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';
import { Modal, ModalClose } from 'react-modal-bootstrap';

class SearchResultOnItem extends Component {
    constructor(props) {
        super(props);

    }
    render(){
        const {
            props, state, onClickNewSearch, onClickModifySearch, onChangedSortingBy, onChangedSortingDirection, onClickGridViewResults, onClickListViewResults,
            hideModalNoResults, onClickHideModalNoResults
        } = this.props;
        return(
            <form role="form">
                {/* Header Search */}
                <div className="col-sm-12 bg-hearder bg-header-searchresult">
                    <div className="col-md-4 col-sm-12 ft-white m-nopadding">
                        <h1>SEARCH RESULTS</h1>
                    </div>
                    <div className="col-md-8 col-sm-12 nopadding">
                        <div className="m-width-100 text-right maring-t15 float-r ip-font ipp-margin m-pt">
                            <div className="col-sm-4 col-xs-12 nopadding">
                                <div className="col-sm-6 col-xs-6 ft-white nopad-ipl">
                                    <button className="btn btn-searchresult" disabled={submitting} onClick={onClickNewSearch}>New Search</button>
                                </div>
                                <div className="col-sm-6 col-xs-6 ft-white nopad-ipl">
                                    <button className="btn btn-searchresult" disabled={submitting} onClick={onClickModifySearch}>Modify Search</button>
                                </div>
                            </div>
                            <div className="col-sm-2 col-xs-12 ft-white margin-t5">
                                <ControlLabel> <span className="fc-ddbe6a m-none">|</span> Sort By: </ControlLabel>
                            </div>
                            <div className="col-sm-2 col-xs-12 nopadding">
                                <div className="styled-select">
                                    <select className="form-searchresult" onChange={onChangedSortingBy} ref="sortingBy" >
                                        <option key={'itemCreatedDate'} value={'itemCreatedDate'}>{'Updated Date'}</option>
                                        <option key={'price'} value={'price'}>{'Retail Price'}</option>
                                        <option key={'reference'} value={'reference'}>{'Item Reference'}</option>
                                        <option key={'description'} value={'description'}>{'Description'}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-2 col-xs-12 nopadding padding-l10 m-pt-select">
                                <div className="styled-select">
                                    <select className="form-searchresult" onChange={onChangedSortingDirection}
                                        ref="sortingDirection">
                                        <option key={'desc'} value={'desc'}>{'Descending'}</option>
                                        <option key={'asc'} value={'asc'}>{'Ascending'}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-2 ft-white nopadding pd-10">
                                <div disabled={submitting} onClick={ onClickGridViewResults }>
                                    <div className="bd-white m-pt-mgl"></div>
                                </div>
                                <div disabled={submitting} onClick={ onClickListViewResults } >
                                    <div className="bd-white m-pt-mgl"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div >
                    <Modal isOpen={state.isOpenNoResults} onRequestHide={hideModalNoResults}>
                        <div className="modal-header">
                            <ModalClose onClick={onClickHideModalNoResults}/>
                            <h1 className="modal-title">Message</h1>
                        </div>
                        <div className="modal-body">
                            <h3>No Results.</h3>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-default btn-radius btn-width" onClick={onClickHideModalNoResults}>
                              Ok
                            </button>
                        </div>
                    </Modal>
                </div>
            </form>
        )
    }
}
module.exports = SearchResultOnItem;
