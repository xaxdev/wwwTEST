import React, { Component, PropTypes } from 'react'
import { Modal, ModalClose } from 'react-modal-bootstrap'
import DualListBox from 'react-dual-listbox';

import 'react-dual-listbox/lib/react-dual-listbox.css';

class RenderReOrderSet extends Component {
    constructor() {
        super()
    }

    onChange = (selected) => {
        const { props } = this.props
        props.changedOrderSetReference(selected)
    }

    render(){
        const { openReOrderSet, closeOpenReOrderSet, yingSetReference, onSaveReOrderSet, changedOrder } = this.props;
        let yingSetReferenceSource = [];
        
        if (!!yingSetReference) {
            yingSetReferenceSource = yingSetReference.map((item)=>{return {'value':item.setReference, 'label':item.setReference}})    
        }
        
        return(
            <div className="">
                <Modal isOpen={openReOrderSet} onRequestHide={closeOpenReOrderSet}>
                    <div className="modal-header">
                        <ModalClose onClick={closeOpenReOrderSet}/>
                        <h1 className="modal-title">Re-Order Set</h1>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-12 maring-t10">
                                <DualListBox name="moons" options={yingSetReferenceSource} onChange={this.onChange} selected={changedOrder}
                                    preserveSelectOrder showOrderButtons />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="text-center maring-t20 font-b">
                            <button id="export" className="btn btn-default btn-radius" onClick={onSaveReOrderSet} >
                                Save
                            </button>
                            <button className="btn btn-default btn-radius" onClick={closeOpenReOrderSet}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

module.exports = RenderReOrderSet