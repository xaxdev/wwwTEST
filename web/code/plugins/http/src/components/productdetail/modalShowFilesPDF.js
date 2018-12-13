import React, { Component, PropTypes } from 'react';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import { reduxForm } from 'redux-form';
import { Document, Page } from 'react-pdf/build/entry.webpack';
import ModalalertMsgObj from '../../utils/modalalertmsg';
import moment from 'moment-timezone';
let _ = require('lodash');

class ModalShowFilesPDF extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpenDownloadCerMsg: false,
            numPages: null,
            pageNumber: 1,
        };
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages, pageNumber: null });
    }

    render() {
        const { props } = this.props;
        const { files, company, isOpen, isClose, onSubmit } = this.props;
        const { pageNumber, numPages } = this.state;
        let file = [];
        let fileCerDownload = '';
        let fileName = '';

        if (!!files) {
            file = files;
            if(file.length>0){
                if(ENVIRONMENT == 'development'){
                    fileCerDownload = `/images/products/original/${file[0].original.split('/').slice(-1).pop()}`;
                }else if (ENVIRONMENT == 'test') {
                    fileCerDownload = `/images/products/original/${file[0].original.split('/').slice(-1).pop()}`;
                }else if (ENVIRONMENT == 'staging') {
                    fileCerDownload = `/original/${company.toLowerCase()}/${file[0].original.split('/').slice(-1).pop()}`;
                }else if (ENVIRONMENT == 'production') {
                    fileCerDownload = `/original/${company.toLowerCase()}/${file[0].original.split('/').slice(-1).pop()}`;
                }
                fileName = `${file[0].original.split('/').slice(-1).pop()}`;
            }
        }

        return(
            <div className="addMyCatalog">
                <div className="coapopup">
                    <Modal isOpen={isOpen} >
                        <div className="modal-headerPDF">
                            <ModalClose onClick={isClose}/>
                        </div>
                        <div className="modal-body">
                            <Document file={fileCerDownload} onLoadSuccess={this.onDocumentLoadSuccess}>
                                {
                                    Array.from(
                                        new Array(numPages),
                                        (el, index) => (
                                            <Page key={`page_${index + 1}`} pageNumber={index + 1}
                                                onRenderSuccess={this.onPageRenderSuccess}
                                                width={Math.min(600, document.body.clientWidth - 52)}
                                            />
                                        ),
                                    )
                                }
                            </Document>
                            <p>Page {pageNumber} of {numPages}</p>
                        </div>
                        <div className="modal-footer">
                            {file.length > 1
                                ? <button type="button"
                                        className="btn btn-default btn-radius"
                                        onClick={ this.downloadCertificateAll }>
                                        Download
                                    </button>
                                : <a href={fileCerDownload} download={fileName} className="btn btn-default btn-radius">Download</a>
                            }
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}
module.exports = ModalShowFilesPDF;
