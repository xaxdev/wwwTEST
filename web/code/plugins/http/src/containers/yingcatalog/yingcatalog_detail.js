import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import jQuery from 'jquery';
import * as yingsetaction from '../../actions/yingsetaction'
import RenderViewYingCatalogDetail from '../../components/mycatalog/render_view_ying_catalog_detail'
import RenderViewYingDetailHeader from '../../components/mycatalog/render_view_ying_detail_header'
import RenderViewItemDetail from '../../components/mycatalog/render_view_item_detail'
import RenderViewItemDetailEdit from '../../components/mycatalog/render_view_item_detail_edit'
import YingPrint from '../../components/mycatalog/render_ying_print'
import ModalAlertMsg from '../../utils/modalalertmsg';
import ModalConfirmDelete from '../../utils/modalConfirmDelete';
import RenderReOrderSet from './render_re_order_set'

const Pagination = require('./Pagination');
const Loading = require('react-loading');

class YingCatalogDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageLength: 1,
            currentPage: 0,
            addItemDetail: false,
            editItemDetail: false,
            openDialogAlertMsg: false,
            openDialogAlertMsgEdit: false,
            isLoading: true,
            openReOrderSet: false,
            isShared: false,
            openDialogDeleteSetCatalog: false,
            isOpenPrintPdf: false,
            isOpenExportExcel: false
        }
    }

    componentWillMount = _=>{
        let { id, isShared } = this.props.params;
        
        const params = {
            id,
            page: this.state.currentPage + 1,
            pageSize: this.state.pageLength
        }
        this.props.getYingDetail(params)
        .then(()=>{
            this.setState({ isLoading: false });
        })
        this.props.getYingSetReference(params)
    }

    componentDidMount = _ => {
        jQuery('#printproduct').click( function(){
            let styleprint = '<style type="text/css" media="print">';
            styleprint +='.landScape';
            styleprint +='{ ';
            styleprint +='width: 100%;';
            styleprint +='height: 100%;';
            styleprint +='margin: 0% 0% 0% 0%;';
            styleprint +='filter: progid:DXImageTransform.Microsoft.BasicImage(Rotation=3);';
            styleprint +='}';
            styleprint +='</style>';

            const divContents = jQuery('#dvContainer').html();
            let printWindow = window.open('', '', 'height=800,width=800');
            printWindow.document.write('<html><head><title>Mouawad online</title>'+styleprint);
            printWindow.document.write('</head><body class="landScape">');
            printWindow.document.write(divContents);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();
            setTimeout( function(){
                printWindow.document.close();
                printWindow.print();
            },500);

            return true;
            
        });
    }

    clickAddNewSet = _=>{
        const { 
            fields: { setReferenceNumber, setDescription, suiteName, romanceNote, setImages }
        } = this.props;
        setReferenceNumber.value = ''
        setDescription.value = ''
        suiteName.value = ''
        romanceNote.value = ''
        setImages.value = ''
        this.props.setYingSetDetailAddress(null)
        this.props.setYingSetDetailRemark(null)
        this.props.setItemList([])
        this.setState({ addItemDetail: true, editItemDetail: false })
    }

    onClickSaveSet = _=> {
        const yingCatalogId = this.props.params.id;
        
        const { 
            setDetailAddress, setDetailRemark, listItem, setImageBase64,
            fields: { setReferenceNumber, setDescription, suiteName, romanceNote, setImages }
        } = this.props;
        const params = {
            setReference: (!setReferenceNumber.value)? '': setReferenceNumber.value,
            setDescription: (!setDescription.value)? '': setDescription.value,
            suiteName: (!suiteName.value)? '': suiteName.value,
            romanceNote: (!romanceNote.value)? '': romanceNote.value,
            setImages: (!setImages.value)? '': setImages.value,
            address: setDetailAddress,
            remark: setDetailRemark,
            items: listItem,
            id: yingCatalogId
        }
        this.props.addYingDetail(params)
        .then((value) => {
            if (!!setImageBase64) {
                const params = {
                    images: setImageBase64,
                    fileName: (!setImages.value)? '': setImages.value
                }
                this.props.uploadSetImage(params)   
            }
            this.setState({openDialogAlertMsg: true})
        })
    }
    onClickUpdateSet = () =>{
        const yingCatalogId = this.props.params.id;
        const { 
            setDetailAddress, setDetailRemark, listItem, setImageBase64,
            fields: { editSetReferenceNumber, editSetDescription, editSuiteName, editRomanceNote, editSetImages }
        } = this.props;
        const params = {
            setReference: (!editSetReferenceNumber.value)? '': editSetReferenceNumber.value,
            setDescription: (!editSetDescription.value)? '': editSetDescription.value,
            suiteName: (!editSuiteName.value)? '': editSuiteName.value,
            romanceNote: (!editRomanceNote.value)? '': editRomanceNote.value,
            setImages: (!editSetImages.value)? '': editSetImages.value,
            address: setDetailAddress,
            remark: setDetailRemark,
            items: listItem,
            id: yingCatalogId
        }
        this.props.updateYingDetail(params)
        .then((value) => {
            if (!!setImageBase64) {
                const params = {
                    images: setImageBase64,
                    fileName: (!editSetImages.value)? '': editSetImages.value
                }
                this.props.uploadSetImage(params)   
            }
            this.setState({openDialogAlertMsgEdit: true})
        })
    }

    closeDialogAlertMsg = _=>{
        this.setState({openDialogAlertMsg: false})
    }

    closeDialogAlertMsgEdit = _=>{
        this.setState({openDialogAlertMsgEdit: false})
    }

    onChangePage = (pageNumber, event)=> {
        const { id, isShared } = this.props.params;
        
        const params = {
            id,
            page: pageNumber + 1,
            pageSize: this.state.pageLength
        }
        this.props.getYingDetail(params)
        .then(()=>{
            this.setState({ isLoading: false });
        })   
        
        this.setState({currentPage: pageNumber, isLoading: true});   // Set pagination, Init pagination = 0
    }

    clickEditCatalog = () =>{
        this.setState({ editItemDetail: true, addItemDetail: false })
    }

    reOrderSet = () =>{
        this.setState({ openReOrderSet: true })
    }

    closeOpenReOrderSet = () =>{
        this.setState({ openReOrderSet: false })
    }

    onSaveReOrderSet = async () =>{
        const { id } = this.props.params;
        const { changedOrder } = this.props; 
        const params = {
            id,
            page: this.state.currentPage + 1,
            pageSize: this.state.pageLength,
            setReferenceList: changedOrder
        }
        this.setState({ isLoading: true });
        await this.props.updateOrderSetReference(params);
        await this.props.getYingDetail(params)
        await this.props.getYingSetReference(params)
        .then(()=>{
            this.setState({ isLoading: false });
        })
        this.props.changedOrderSetReference([])
          
        
        this.setState({ openReOrderSet: false })
    }

    clickDeleteCatalog = () => {
        this.setState({ openDialogDeleteSetCatalog: true })
    }

    closeDialogDeleteSetCatalog = () =>{
        this.setState({ openDialogDeleteSetCatalog: false })
    }

    confirmDeleteSetCatalog = async () =>{
        const { id } = this.props.params;
        const { yingCatalogDetail } = this.props;
        const { _id } = yingCatalogDetail
        const params = {
            id: _id
        }
        const paramsLoad = {
            id,
            page: 1,
            pageSize: this.state.pageLength
        }
        this.setState({ isLoading: true });
        this.props.deleteYingSet(params)
        .then(async ()=>{
            await this.props.getYingDetail(paramsLoad)
            await this.props.getYingSetReference(paramsLoad)
            .then(()=>{
                this.setState({ isLoading: false });
            })
        })

        this.setState({ openDialogDeleteSetCatalog: false, currentPage: 0 })
    }

    onClickBack = () =>{
        this.setState({ addItemDetail: false, editItemDetail: false })
    }

    onClickPrintPdf = () => {
        this.setState({isOpenPrintPdf: true});
    }

    renderAlertMsgPdf = _=> {
        const message = 'Please check your email for printing files.';
        const title = 'Ying Catalog';
        return(
            <ModalAlertMsg isOpen={this.state.isOpenPrintPdf} isClose={this.handlePrintPdf} props={this.props} message={message}  title={title}/>
        );
    }

    handlePrintPdf = () => {
        let { id } = this.props.params;
        
        this.props.getAllPDF(id)
        this.setState({isOpenPrintPdf: false});
    }

    onClickExportExcel = () => {
        this.setState({isOpenExportExcel: true});
    }

    renderExportExcelDialog(){
        const message = 'Please check your email for export excel files.';
        const title = 'Ying Catalog';
        return(
            <ModalAlertMsg isOpen={this.state.isOpenExportExcel} isClose={this.handleCloseExportExcel} props={this.props} message={message}  title={title}/>
        );
    }

    handleCloseExportExcel = () => {
        let { id } = this.props.params;
        
        this.props.getExcel(id)
        this.setState({isOpenExportExcel: false});
    }

    render = _=>{
        const { yingCatalogDetail, yingCatalogDetailStatus, totalPages, fields, yingSetReference, changedOrder } = this.props;   
        const { isShared } = this.props.params;
        
        if (this.state.isLoading) {
            return(
                <div>
                    <div className="col-sm-12 bg-hearder bg-header-inventories">
                        <div className="col-sm-6 m-width-60 ft-white m-nopadding">
                            <h1>Ying Catalog Detail</h1>
                        </div>
                    </div>
                    <div className="col-sm-12 panel panel-default">
                        <RenderViewYingDetailHeader yingCatalogDetailStatus={yingCatalogDetailStatus} totalPages={totalPages} currentPage={this.state.currentPage}
                            Pagination={Pagination} onClickAddNewSet={this.clickAddNewSet} isAddItemDetail={this.state.addItemDetail} 
                            onClickSaveSet={this.onClickSaveSet} onChangePage={this.onChangePage} clickEditCatalog={this.clickEditCatalog}
                            isEditItemDetail={this.state.editItemDetail} onClickUpdateSet={this.onClickUpdateSet} onClickPrintPdf={this.onClickPrintPdf}/>
                        <center>
                            <br/><br/><br/><br/><br/><br/>
                            <Loading type="spin" color="#202020" width="10%"/>
                        </center>
                        <br/><br/><br/><br/><br/><br/>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="col-sm-12 bg-hearder bg-header-inventories">
                        <div className="col-sm-6 m-width-60 ft-white m-nopadding">
                            <h1>Ying Catalog Detail</h1>
                        </div>
                    </div>
                    <div className="col-sm-12 panel panel-default">
                        <RenderViewYingDetailHeader yingCatalogDetailStatus={yingCatalogDetailStatus} totalPages={totalPages} currentPage={this.state.currentPage}
                            Pagination={Pagination} onClickAddNewSet={this.clickAddNewSet} isAddItemDetail={this.state.addItemDetail} 
                            onClickSaveSet={this.onClickSaveSet} onChangePage={this.onChangePage} clickEditCatalog={this.clickEditCatalog}
                            isEditItemDetail={this.state.editItemDetail} onClickUpdateSet={this.onClickUpdateSet} reOrderSet={this.reOrderSet} 
                            isShared={isShared} clickDeleteCatalog={this.clickDeleteCatalog} onClickBack={this.onClickBack} onClickPrintPdf={this.onClickPrintPdf} 
                            onClickExportExcel={this.onClickExportExcel} />
                        <RenderViewYingCatalogDetail yingCatalogDetail={yingCatalogDetail} yingCatalogDetailStatus={yingCatalogDetailStatus} 
                            addItemDetail={this.state.addItemDetail} editItemDetail={this.state.editItemDetail}/>
                        <RenderViewItemDetail addItemDetail={this.state.addItemDetail} fields={fields}/>
                        <RenderViewItemDetailEdit editItemDetail={this.state.editItemDetail} fields={fields} yingCatalogDetail={yingCatalogDetail}
                            yingCatalogDetailStatus={yingCatalogDetailStatus}/>
                    </div>
                    <ModalAlertMsg isOpen={this.state.openDialogAlertMsg} isClose={this.closeDialogAlertMsg} message={'Added set detail complete!'} 
                        title={'ADD SET DETAIL'} />
                    <ModalAlertMsg isOpen={this.state.openDialogAlertMsgEdit} isClose={this.closeDialogAlertMsgEdit} message={'Edited set detail complete!'} 
                        title={'EDIT SET DETAIL'} />
                    <ModalConfirmDelete isOpen={this.state.openDialogDeleteSetCatalog} isClose={this.closeDialogDeleteSetCatalog} 
                        message={'Are you sure you want delete this catalog?'}  title={'DELETE SET DETAIL'} onSubmit={this.confirmDeleteSetCatalog} />
                    <RenderReOrderSet openReOrderSet={this.state.openReOrderSet} closeOpenReOrderSet={this.closeOpenReOrderSet} 
                        yingSetReference={yingSetReference} onSaveReOrderSet={this.onSaveReOrderSet} changedOrder={changedOrder} props={this.props}/>
                    <div id="dvContainer" className="hidden">
                        <YingPrint yingCatalogDetail={yingCatalogDetail} yingCatalogDetailStatus={yingCatalogDetailStatus}/>
                    </div>
                    {this.renderAlertMsgPdf()}
                    {this.renderExportExcelDialog()}
                </div>
            ) 
        }
    }
}

function mapStateToProps(state) {
    return {
        yingCatalogDetail: state.myCatalog.yingCatalogDetail,
        yingCatalogDetailStatus: state.myCatalog.yingCatalogDetailStatus,
        yingCatalogDetailStatusCode: state.myCatalog.yingCatalogDetailStatusCode,
        totalPages: state.myCatalog.yingCatalogTotalPages,
        setDetailAddress: state.myCatalog.setDetailAddress,
        setDetailRemark: state.myCatalog.setDetailRemark,
        listItem: state.myCatalog.listItem,
        setImageBase64: state.myCatalog.setImageBase64,
        yingSetReference: state.myCatalog.yingSetReference,
        changedOrder: state.myCatalog.changedOrder,
    };
}

module.exports = reduxForm(
    {
        form: 'YingCatalogDetail',
        fields: [
            'setReferenceNumber', 'setDescription', 'suiteName', 'romanceNote', 'setImages', 'reference', 'description', 'price', 
            'editSetReferenceNumber', 'editSetDescription', 'editSuiteName', 'editRomanceNote', 'editSetImages'
        ]
    }, mapStateToProps, yingsetaction
)(YingCatalogDetail);