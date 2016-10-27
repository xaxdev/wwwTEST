import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import { reduxForm } from 'redux-form';
import shallowCompare from 'react-addons-shallow-compare';
// import validateCatalog from './validatecatalog';
let _ = require('lodash');

class ModalMyCatalog extends Component {

    constructor(props) {
        super(props);

        this.catalogSelected = this.catalogSelected.bind(this);

        this.state = {
            txtNewCatalog: false

        }

  }
  componentDidMount= _=> {
      const { props } = this.props;
      const { fields: {
                oldCatalogName,newCatalogName,validateCatalogName
            } } = props;
            console.log('oldCatalogName-->',oldCatalogName.value);
            console.log('newCatalogName-->',newCatalogName.value);

      if (oldCatalogName.value != undefined) {
          if (oldCatalogName.value != '') {
              this.setState({txtNewCatalog: true});
          }
      }else{
          this.setState({txtNewCatalog: false});
      }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  catalogSelected= (e) => {
      e.preventDefault();

      let { fields:{newCatalogName }} = this.props.props;
      console.log('selected',e.target.value);
      if (e.target.value != '') {
          this.setState({txtNewCatalog: true});
          newCatalogName.value = '';
        //   newCatalogName.onChange('');
      }else{
          this.setState({txtNewCatalog: false});
      }

  }

  hideModalAddMyCatalog = (e) => {
    e.preventDefault();
    // console.log('hi');
    // this.setState({isOpenAddMyCatalog: false});
    let { isOpen } = this.props;

    isOpen = false;

  }

  render() {
    const { props } = this.props;
    // let txtNewCatalog = this.refs.newCatalogName;
    console.log('this.state.txtNewCatalog-->',this.state.txtNewCatalog);
    const { fields: {
              oldCatalogName,newCatalogName,validateCatalogName
          } } = props;
    const { listCatalogName,isOpen, isClose, handleSubmitCatalog, onSubmit } = this.props;

    return(
          <div  className="addMyCatalog">
            <Modal isOpen={isOpen} >
              <div className="modal-header">
                <ModalClose onClick={isClose}/>
                <h1 className="modal-title">ADD TO CATALOG</h1>
              </div>
              <div className="modal-body">
                Add this item to:
                <br/>
                <div className="col-sm-12">
                  <div className="col-sm-6">
                      <label className="col-sm-6 control-label">Catalog exits</label>
                  </div>
                  <div className="col-sm-6">
                      <select className="form-control" {...oldCatalogName} onChange={this.catalogSelected} ref="oldCatalogName">
                        <option key={''} value={''}>{'Please selected'}</option>
                          {listCatalogName.map(catName =>
                              {
                                  return(<option key={catName._id} value={catName._id}>{catName.catalog}</option>);
                              })
                          }
                      </select>
                  </div>
                </div>
                <div className="col-md-12">
                    <div className="col-sm-6">
                        <label className="col-sm-6 control-label">Or New Catalog</label>
                    </div>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" {...newCatalogName} ref="newCatalogName" disabled={this.state.txtNewCatalog}/>
                    </div>
                </div>
              </div>
              <div className="modal-footer">
                  <button type="button" className="btn btn-default btn-radius" disabled={!validateCatalogName.error} onClick={onSubmit}>
                      Submit
                  </button>
                  <button type="button" className="btn btn-default btn-radius" onClick={isClose}>
                      Close
                  </button>
              </div>
            </Modal>
          </div>
    );
  }
}
module.exports = ModalMyCatalog;
