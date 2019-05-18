import React, { Component, PropTypes } from 'react'
import { Modal, ModalClose } from 'react-modal-bootstrap'
import DualListBox from 'react-dual-listbox';
import jQuery from 'jquery';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import * as xls from '../../utils/xls';
class RenderAddRelatedItem extends Component {
    constructor() {
        super();

        this.onChange = this.onChange.bind(this);
        this.keyItem = this.keyItem.bind(this);
        this.readFile = this.readFile.bind(this);

        this.state = {
            selected: [],
            maxColumn: false
        };

    }

    componentDidMount() {
        jQuery('#file').hide();
        jQuery('#btn-browsefile').click(function(){
            jQuery('#file').click();
        });
        jQuery('#file').change(function() {
            let filename =jQuery('#file')[0].files[0];
            //alert(filename.name);
            jQuery('#fileName').text(filename.name);
        });
    }

    readFile(e){
        e.preventDefault();
        const { that } = this.props;
        let { fields: { relatedItemInput }} = that.props;
        let X = XLSX;
        let rABS = false;
        let use_worker = false;

        let files = e.target.files;

        let f = files[0];
        {
      		let reader = new FileReader();
      		let name = f.name;
      		reader.onload = function(e) {
                let data = e.target.result;
                let arr = xls.fixdata(data);
                let wb = X.read(btoa(arr), {type: 'base64'});
                let items = xls.process_wb(wb);
                relatedItemInput.onChange(items.item);
                // that.props.setItemsOrder(items.AllData);
      		}
            if(rABS) reader.readAsBinaryString(f);
            else reader.readAsArrayBuffer(f);
    	};
    }

    onChange = (selected) => {
        const { that } = this.props;
        that.props.setRelatedItem(selected)
    }
    keyItem = (event) => {
        const { that } = this.props
        const { relatedItemSource } = that.props

        if (event.key === 'Enter') {
            const data = event.target.value
            const listData = data.split(',')
            const mapItem = item => {
                return { value: item, label: item }
            }
            let listItem = listData.map(mapItem)
            
            const concatAndDeDuplicateObjects = (p, ...arrs) => [ ...new Set( [].concat(...arrs).map(a => JSON.stringify(a)) ) ].map(a => JSON.parse(a))

            listItem = concatAndDeDuplicateObjects('value', listItem, relatedItemSource);

            that.props.setRelatedItemSource([...listItem])
        }
    }
    render(){
        const { that } = this.props;
        const { fields: { relatedListName, relatedItemInput }, relatedItem, relatedItemSource } = that.props
        const host = HOSTNAME || 'localhost';
        const ROOT_URL = (host != 'mol.mouawad.com')? `//${host}:${(ENVIRONMENT!='staging')?3005:4005}`: `//${host}`;

        return(
            <div className="popexport">
                <Modal isOpen={that.state.isOpenDialog} onRequestHide={that.hideAddRelatedItem}>
                    <div className="modal-header">
                        <ModalClose onClick={that.hideAddRelatedItem}/>
                        <h1 className="modal-title">Add Related Details</h1>
                    </div>
                    <div className="modal-body">
                        <div className="col-md-5 relete_item col-sm-6  m-nopadding">
                            <label><b>List Name</b></label>
                            <input type="text" className="form-control" {...relatedListName}/>
                        </div>
                        <div className="col-md-12 relete_item maring-t10 nopadding">
                            <div className="col-md-5 col-sm-6  m-nopadding">
                                <label><b>Please Enter Item Reference</b></label>
                                <input type="text" className="form-control" onKeyPress={this.keyItem} {...relatedItemInput}/>
                            </div>
                        </div>
                        <div className="col-md-12 maring-t10">
                            <DualListBox name="moons" canFilter options={relatedItemSource} onChange={this.onChange} selected={relatedItem}
                                preserveSelectOrder showOrderButtons />
                        </div>
                        <div className="col-xs-offset-3 col-sm-6">
                            <div className="text-center mg-tb">
                                <span className={`${this.state.maxColumn?'user-alert':'hidden'}`}>Cannot selected column more than 9 columns.</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-4 control-label">Attachment</label>
                        <div className="col-sm-6">
                            <input id="file" type="file" field={relatedItemInput} onChange={this.readFile}/>
                            <span id="fileName"></span>
                            <input type="button" id="btn-browsefile" value=" "/>
                            <div className="font-nor control-label">
                                The system able to import only excel file. Click here to download a format file
                                <a href={ROOT_URL+'/upload_file/Mol_upload_items.xlsx'} >Mol upload items.xlsx</a>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="col-sm-12">
                            <button id="export" className="btn btn-default btn-radius" onClick={that.addedRelatedItem}>
                                Save
                            </button>
                            <button className="btn btn-default btn-radius" onClick={that.hideAddRelatedItem}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

module.exports = RenderAddRelatedItem
