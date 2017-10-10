import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import { reduxForm } from 'redux-form';
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

  downloadCertificateAll = _=>{

      const userLogin = JSON.parse(sessionStorage.logindata);
      const host = HOSTNAME || 'localhost';
      const ROOT_URL = (host != 'mol.mouawad.com')? `http://${host}:3005`: `http://${host}`;
      const { images, productId, getCertificate } = this.props;

      let exportDate = moment().tz('Asia/Bangkok').format('YYYYMMDD_HHmmss');
      let allCer = [];
      if(images != undefined){
          images.map((img) => {
              if (!!img) {
                  allCer.push(img.original.replace('/images/products/original',''));
              }
          })
      }
    //   console.log(allCer);
      let params = {
                      'allCer': allCer,
                      'userName': `${userLogin.username}`,
                      'fileName': `${userLogin.username}_${exportDate}`,
                      'userEmail': userLogin.email,
                      'ROOT_URL': ROOT_URL,
                      'productId': productId
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
    return(<ModalalertMsgObj isOpen={this.state.isOpenDownloadCerMsg}
                isClose={this.handleCloseDownloadCerMsg} props={this.props}
                message={message}  title={title}/>);
  }

  handleCloseDownloadCerMsg = _=>{
      this.setState({isOpenDownloadCerMsg: false});
  }

  render() {
      const { props } = this.props;
      const { images, isOpen, isClose, handleSubmitCatalog, onSubmit } = this.props;
      let img = [];
      let imageCerDownload = '';
      let imageName = '';

      if (!!images) {
          img = images;
          if(img.length>0){
              imageCerDownload = `/original/${img[0].original.split('/').slice(-1).pop()}`;
              imageName = `${img[0].original.split('/').slice(-1).pop()}`;
          }
      }

      return(
            <div className="addMyCatalog">
              <div className="coapopup">
                <Modal isOpen={isOpen} >
                  <div className="modal-body">
                      <ModalClose onClick={isClose}/>
                      <div>
                        <ProductGalleryImages imagesGallery={img}/>
                      </div>
                  </div>
                  <div className="modal-footer">
                      {img.length > 1
                          ? <button type="button"
                                  className="btn btn-default btn-radius"
                                  onClick={ this.downloadCertificateAll }>
                                  Download
                              </button>
                          : <a href={imageCerDownload} download={imageName} className="btn btn-default btn-radius"><div className="icon-certificate"/></a>
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
