import React, { Component, PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import { Modal, ModalClose } from 'react-modal-bootstrap';
import { ColumnsNomal, ColumnsViewAsSet } from './columns'

import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';

class RenderChangeTitleListBox extends Component {
    constructor() {
        super();

        this.onChange = this.onChange.bind(this);

        this.state = {
            selected: [],
            maxColumn: false
        };

    }
    onChange = (selected) => {
        const { that } = this.props;
        console.log(selected);
        if (selected.length < 10) {
            that.props.setTitleColumnTable(selected)
            this.setState({ selected, maxColumn: false });
        }else {
            this.setState({maxColumn: true});
        }
    }
    render(){
        const { that, userLogin, checkFields, labels, selectedAllFields, selectedNoAllFields, ViewAsSet } = this.props;
        const { TitleColumn } = that.props
        // console.log({TitleColumn});
        const { selected } = this.state;
        let checkAll = true;

        return(
            <div className="popexport">
                <Modal isOpen={that.state.isOpenChangeTitle} onRequestHide={that.hideChangeTitle}>
                    <div className="modal-header">
                        <ModalClose onClick={that.hideChangeTitle}/>
                        <h1 className="modal-title">Changed Title</h1>
                    </div>
                    <div className="modal-body">
                        <h3>Please select field for title.</h3>
                        <h5>(Normal column Images, Item Reference, Item Description, SKU, Company, Location, Size, Jewels Weight, Item Weight (Grams), Stone Detail, Price)</h5>
                        <br/>
                        <DualListBox canFilter options={ViewAsSet? ColumnsViewAsSet: ColumnsNomal}
                            selected={TitleColumn} onChange={this.onChange} preserveSelectOrder />
                    </div>
                    <h5 className={`${this.state.maxColumn?'user-alert':'hidden'}`}>Cannot selected column more than 9 columns.</h5>
                    <div className="modal-footer">
                        <button id="export" className="btn btn-default btn-radius" onClick={that.changeTitleColumn}>
                            Changed
                        </button>
                        <button className="btn btn-default btn-radius" onClick={that.hideChangeTitle}>
                            Cancel
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }
}

module.exports = RenderChangeTitleListBox
