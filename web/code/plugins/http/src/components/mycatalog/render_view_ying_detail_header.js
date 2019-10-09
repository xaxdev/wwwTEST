import React, { Component, PropTypes } from 'react';
import jQuery from 'jquery';

class RenderViewYingDetailHeader extends Component {
    constructor(props) {
        super(props);

    }

    static contextTypes = {
        router: PropTypes.object
    }
    
    backToListCatalog = _=>{
        this.context.router.push('/yingcatalog');
    }

    render = _ => {
        const {
            yingCatalogDetailStatus, totalPages, currentPage, Pagination, onClickAddNewSet, isAddItemDetail, onClickSaveSet, onChangePage, clickEditCatalog,
            isEditItemDetail, onClickUpdateSet, reOrderSet, isShared, clickDeleteCatalog, onClickBack, onClickPrintPdf, onClickExportExcel
        } = this.props;

        const checkIsShared = !isShared? true: JSON.parse(isShared)
        
        return(
            <div className="col-sm-12">
                <div className="col-sm-2">
                    <a>
                        <div className="icon-excel" onClick={ onClickExportExcel }></div>
                    </a>
                    <a>
                        <div className="icon-print margin-l10" id="printproduct" 
                            onClick={ this.showDialogPrintOptions }> </div>
                    </a>
                    <a>
                        <div className="icon-pdf margin-l10" id="printpdf" 
                            onClick={ onClickPrintPdf }> </div>
                    </a>
                </div>
                <div className="col-sm-10 m-width-40 m-nopadding text-right maring-t15">
                    {
                        React.createElement(
                            'div',
                            { className: 'col-sm-4 col-xs-12 m-nopadding maring-b10' },
                            React.createElement(Pagination, {
                                className: 'pagination pull-right',
                                currentPage: currentPage,
                                totalPages: totalPages,
                                onChangePage: onChangePage
                            })
                        )
                    }
                    <div className="col-sm-8 col-xs-12 nopadding">
                        {isAddItemDetail || isEditItemDetail 
                            ?   isAddItemDetail
                                ?<div className="col-sm-10">
                                    <div className="ft-white nopad-ipl">
                                        <button className="btn btn-primary btn-radius ying" type="button" onClick={onClickSaveSet}>Save Set</button>
                                    </div>
                                </div>
                                :<div className="col-sm-10">
                                    <div className="ft-white nopad-ipl">
                                        <button className="btn btn-primary btn-radius ying" type="button" onClick={onClickUpdateSet}>Update Set</button>
                                    </div>
                                </div>
                            :<div className={`col-sm-10 btn-container ${checkIsShared ? 'hidden' : ''}` }>
                                <div className="ft-white nopad-ipl">
                                    <button className="btn btn-primary btn-radius ying" type="button" onClick={onClickAddNewSet}>New Set</button>
                                </div>
                                <div className="ft-white nopad-ipl">
                                    <button className="btn btn-primary btn-radius ying" type="button" disabled={!yingCatalogDetailStatus} onClick={clickEditCatalog}>Edit Set</button>
                                </div>
                                <div className="ft-white nopad-ipl">
                                    <button className="btn btn-primary btn-radius ying" type="button" disabled={!yingCatalogDetailStatus} onClick={clickDeleteCatalog}>Delete Set</button>
                                </div>
                                <div className="ft-white nopad-ipl">
                                    <button className="btn btn-primary btn-radius ying" type="button" onClick={reOrderSet}>Re-Order</button>
                                </div>
                            </div>
                        }
                        <div className="col-sm-2 col-xs-2 ft-white nopad-ipl">
                            <button className="btn btn-primary btn-radius ying" type="button" onClick={this.backToListCatalog}>Back to List</button>
                        </div>
                    </div>                        
                </div>
            </div>
        )
    }
}

RenderViewYingDetailHeader.propTypes = {

    totalPages: PropTypes.isRequired
    //posts: PropTypes.posts
}

module.exports = RenderViewYingDetailHeader