import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import { reduxForm } from 'redux-form';
import jQuery from 'jquery';
import ProductGalleryImages from './productGalleryImages';
import ModalalertMsgObj from '../../utils/modalalertmsg';
import moment from 'moment-timezone';
let _ = require('lodash');

class ModalShowImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenDownloadCerMsg: false
        };
    }
    componentDidMount = _ => {
        let zoomimg = false;
        let count = 0;
        jQuery('#btnzoom').click(function(){
            count++;
            jQuery('.image-gallery-image img').css({'width': 'auto' ,'max-width':'700px'});
            if(zoomimg == false){
                if (count > 0) {
                    zoomimg = true;
                    jQuery('.image-gallery-image img').css({'width': jQuery('.image-gallery-image img').width() * 2 ,'max-width':'1200px'});
                }
            } else {
                zoomimg = false;
                jQuery('.image-gallery-image img').css({'width': 'auto' ,'max-width':'700px'});
            }
        });
    }

    downloadCertificateAll = _=>{

        const userLogin = JSON.parse(sessionStorage.logindata);
        const host = HOSTNAME || 'localhost';
        const ROOT_URL = (host != 'mol.mouawad.com')? `http://${host}:${(ENVIRONMENT!='staging')?3005:4005}`: `http://${host}`;
        const { images, company, productId, getCertificate } = this.props;

        let exportDate = moment().tz('Asia/Bangkok').format('YYYYMMDD_HHmmss');
        let allCer = [];
        if(images != undefined){
            images.map((img) => {
                if (!!img) {
                    allCer.push(img.original.replace('/images/products/original',''));
                }
            })
        }

        let params = {
            'allCer': allCer,
            'userName': `${userLogin.username}`,
            'fileName': `${userLogin.username}_${exportDate}`,
            'userEmail': userLogin.email,
            'ROOT_URL': ROOT_URL,
            'productId': productId,
            // 'company': company.toLowerCase()
            'company': 'MME' // mme only 08/01/2019
        }

        getCertificate(params)
        .then((value) => {
            if (value) {
                this.setState({isOpenDownloadCerMsg: true});
            }
            console.log(value);
        });
    }
    renderAlertmsgCer = _=> {
        const message = 'Please check your email for download certificate.';
        const title = 'DOWNLOAD CERTIFICATE';
        return(
            <ModalalertMsgObj isOpen={this.state.isOpenDownloadCerMsg} isClose={this.handleCloseDownloadCerMsg} props={this.props} message={message} title={title}/>
        );
    }

    handleCloseDownloadCerMsg = _=>{
        this.setState({isOpenDownloadCerMsg: false});
    }

    render() {
        const { props } = this.props;
        const { images, company, isOpen, isClose, handleSubmitCatalog, onSubmit } = this.props;
        let imgs = [];
        let imageCerDownload = '';
        let imageName = '';

        if (!!images) {
            images.map((img) => {
                const image = {
                    original: `${img.physicalFile}`,
                    thumbnail: `${img.thumbnail}`,
                    sizes: '700px'
                };

                imgs.push(image);
            });
            if(imgs.length>0){
                imageCerDownload = `${imgs[0].original}`;
                imageName = `${imgs[0].original.split('/').slice(-1).pop()}`;
            }
        }

        return(
            <div className="addMyCatalog">
                <div className="coapopupimg">
                    <Modal isOpen={isOpen} >
                        <div className="modal-body">
                            <ModalClose onClick={isClose}/>
                            <div>
                                <ProductGalleryImages imagesGallery={imgs}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button id="btnzoom" className="btn btn-primary btn-radius">zoom</button>
                            {imgs.length > 1
                                ?   <button type="button" className="btn btn-default btn-radius" onClick={ this.downloadCertificateAll }>
                                        Download
                                    </button>
                                :   <a href={imageCerDownload} download={imageName} className="btn btn-default btn-radius">Download</a>
                            }
                        </div>
                    </Modal>
                </div>
                {this.renderAlertmsgCer()}
            </div>
        );
    }
}
module.exports = ModalShowImages;
