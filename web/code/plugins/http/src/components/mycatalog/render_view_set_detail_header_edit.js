import React, { Component } from 'react';
import jQuery from 'jquery';
import shallowCompare from 'react-addons-shallow-compare';
import numberFormat from '../../utils/convertNumberformat';

class RenderViewSetDetailHeaderEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: ''
        };
    }

    componentWillMount = _=>{
        const { yingCatalogDetail } = this.props;
        if (!!yingCatalogDetail) {
            const { setReference, setDescription, suiteName, romanceNote } = yingCatalogDetail;
            initData(this.props.fields, setReference, setDescription, suiteName, romanceNote)   
        }
    }

    componentDidMount() {        
        jQuery('#fileEdit').hide();
        jQuery('#btnEdit-browsefile').click(function(){
            jQuery('#fileEdit').click();
        });
        jQuery('#fileEdit').change(function() {
            let filename = jQuery('#fileEdit')[0].files[0];
            //alert(filename.name);
            jQuery('#fileNameEdit').text(filename.name);
        });
        
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    readFile = (e)=>{
        e.preventDefault();
        let { fields:{ editSetImages }, props} = this.props;

        let reader = new FileReader();
        let file = e.target.files[0];
        editSetImages.onChange(file.name)

        reader.onloadend = async () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
            props.setYingSetImageBase64(reader.result)
        }
        reader.readAsDataURL(file)    
    }

    render = _ => {
        const { yingCatalogDetail, yingCatalogDetailStatus, 
            fields: { editSetReferenceNumber, editSetDescription, editSuiteName, editRomanceNote, editSetImages }
        } = this.props;
        const userLogin = JSON.parse(sessionStorage.logindata);
        const { currency } = userLogin
        
        const summary = {
            totalItem: 0,
            totalRetailPrice: 0,
            totalUpdatedCost: 0,
            highestRetailPrice: 0,
            lowestRetailPrice: 0,
            averageRetailPrice: 0
        }
        
        let $imagePreview = null;

        if (yingCatalogDetailStatus) {
            const { items, setImages } = yingCatalogDetail;
            const summaryItem = items.reduce(summaryListItem, summary);
            const {totalItem, totalRetailPrice, totalUpdatedCost, highestRetailPrice, lowestRetailPrice, averageRetailPrice} = summaryItem;  

            if (setImages != '') {
                const host = HOSTNAME || 'localhost';
                // const ROOT_URL = (host != 'mol.mouawad.com')? `//${host}:${(ENVIRONMENT!='staging')?3005:4005}`: `//${host}`;
                const ROOT_URL = 'mol.mouawad.com';
                const imagesUrl = `http://${ROOT_URL}/images/products/original/${setImages}`;
                let {imagePreviewUrl} = this.state;
                
                $imagePreview = imagePreviewUrl != '' ? (<img src={imagePreviewUrl} />) : (<img src={imagesUrl} />);
            } else {
                $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
            }

            return(
                <div className="row">
                    <div className="col-sm-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div>
                                    <div id="dvTotalsub1" className="bg-or text-center">
                                        <span>
                                            <span className="font-b fc-000">Total Items :</span>
                                            <span className="font-w9">{ numberFormat(totalItem) } {'Items'} </span>
                                            <span className="padding-lf15">|</span>
                                        </span>
                                        <span className={`${(userLogin.permission.price == 'Public'
                                            || userLogin.permission.price == 'Updated'
                                            || userLogin.permission.price == 'All') ?
                                            '' : 'hidden'}`}>
                                            <span className="font-b fc-000">Total Retail Price :</span>
                                            <span className="font-w9">{ numberFormat(totalRetailPrice) } { currency }</span>
                                        </span>
                                        <span className={`${(userLogin.permission.price == 'Updated'
                                            || userLogin.permission.price == 'All') ?
                                            '' : 'hidden'}`}>
                                            <span className="padding-lf15">|</span>
                                            <span className="font-b fc-000">Total Updated Cost :</span>
                                            <span className="font-w9">{ numberFormat(totalUpdatedCost) } { currency }</span>
                                        </span>
                                    </div>
                                    <div id="dvTotalsub2" className="bg-f7d886 text-center">
                                        <span>
                                            <span className="font-b fc-000">Highest Retail Price :</span>
                                            <span className="font-w9">{ numberFormat(highestRetailPrice) } { currency } </span>
                                            <span className="padding-lf15">|</span>
                                        </span>
                                        <span>
                                            <span className="font-b fc-000">Lowest Retail Price :</span>
                                            <span className="font-w9">{ numberFormat(lowestRetailPrice) } { currency } </span>
                                            <span className="padding-lf15">|</span>
                                        </span>
                                        <span>
                                            <span className="font-b fc-000">Average Retail Price :</span>
                                            <span className="font-w9">{ numberFormat(averageRetailPrice) } { currency } </span>
                                        </span>
                                    </div>
                                </div>
                                <div className="row margin-ft">
                                    <div className="col-md-6 col-sm-12 form-horizontal">
                                        <h2>ITEM DETAILS EDIT</h2>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Set Reference Number</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" placeholder="Enter Set Reference Number" {...editSetReferenceNumber}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Set Description</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" placeholder="Enter Set Description" {...editSetDescription}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Suite Name</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" placeholder="Enter Suite Name" {...editSuiteName}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Romance Note</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" placeholder="Enter Romance Note" {...editRomanceNote}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Attachment Image Set</label>
                                            <div className="col-sm-7">
                                                <input id="fileEdit" type="file" field={editSetImages} onChange={this.readFile}/>
                                                <span id="fileNameEdit"></span>
                                                <input type="button" id="btnEdit-browsefile" value=" "/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 form-horizontal">
                                        <div className="form-group"></div>
                                        <div className="form-group"></div>    
                                        <div className="form-group">
                                            <div className="imgPreview">
                                                {$imagePreview}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <div className="row">
                    <div className="col-sm-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div>
                                    <div id="dvTotalsub1" className="bg-or text-center">
                                        <span>
                                            <span className="font-b fc-000">Total Items :</span>
                                            <span className="font-w9">{ numberFormat(0) } {'Items'} </span>
                                            <span className="padding-lf15">|</span>
                                        </span>
                                        <span className={`${(userLogin.permission.price == 'Public'
                                            || userLogin.permission.price == 'Updated'
                                            || userLogin.permission.price == 'All') ?
                                            '' : 'hidden'}`}>
                                            <span className="font-b fc-000">Total Retail Price :</span>
                                            <span className="font-w9">{ numberFormat(0) } { currency }</span>
                                        </span>
                                        <span className={`${(userLogin.permission.price == 'Updated'
                                            || userLogin.permission.price == 'All') ?
                                            '' : 'hidden'}`}>
                                            <span className="padding-lf15">|</span>
                                            <span className="font-b fc-000">Total Updated Cost :</span>
                                            <span className="font-w9">{ numberFormat(0) } { currency }</span>
                                        </span>
                                    </div>
                                    <div id="dvTotalsub2" className="bg-f7d886 text-center">
                                        <span>
                                            <span className="font-b fc-000">Highest Retail Price :</span>
                                            <span className="font-w9">{ numberFormat(0) } { currency } </span>
                                            <span className="padding-lf15">|</span>
                                        </span>
                                        <span>
                                            <span className="font-b fc-000">Lowest Retail Price :</span>
                                            <span className="font-w9">{ numberFormat(0) } { currency } </span>
                                            <span className="padding-lf15">|</span>
                                        </span>
                                        <span>
                                            <span className="font-b fc-000">Average Retail Price :</span>
                                            <span className="font-w9">{ numberFormat(0) } { currency } </span>
                                        </span>
                                    </div>
                                </div>
                                <div className="row margin-ft">
                                    <div className="col-md-6 col-sm-12 form-horizontal">
                                        <h2>ITEM DETAILS</h2>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Set Reference Number</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" placeholder="Enter Set Reference Number" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Set Description</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" placeholder="Enter Set Description"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Suite Name</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" placeholder="Enter Suite Name" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Romance Note</label>
                                            <div className="col-sm-7">
                                                <input type="text" className="form-control" placeholder="Enter Romance Note"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-4 control-label">Attachment Image Set</label>
                                            <div className="col-sm-7">
                                                <input id="fileEdit" type="file" field={editSetImages} onChange={this.readFile}/>
                                                <span id="fileNameEdit"></span>
                                                <input type="button" id="btnEdit-browsefile" value=" "/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 form-horizontal">
                                        <div className="form-group"></div>
                                        <div className="form-group"></div>    
                                        <div className="form-group">
                                            <div className="imgPreview">
                                                {$imagePreview}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

module.exports = RenderViewSetDetailHeaderEdit

const summaryListItem = (summary, item) =>{
    const {totalItem, totalRetailPrice, totalUpdatedCost, highestRetailPrice, lowestRetailPrice} = summary;
    const newSummary = {
        ...summary, 
        totalItem: totalItem + 1,
        totalRetailPrice: totalRetailPrice + Number(item.priceInHomeCurrency),
        totalUpdatedCost: totalUpdatedCost + Number(item.updatedCostInHomeCurrency),
        highestRetailPrice: Math.max(highestRetailPrice, Number(item.priceInHomeCurrency)),
        lowestRetailPrice: totalItem == 0 ? Number(item.priceInHomeCurrency): Math.min(lowestRetailPrice, Number(item.priceInHomeCurrency)),
        averageRetailPrice: (totalRetailPrice + Number(item.priceInHomeCurrency))/(totalItem + 1)
    }
    return newSummary
}

const initData = (fields, _setReference, _setDescription, _suiteName, _romanceNote)=>{
    const { editSetReferenceNumber, editSetDescription, editSuiteName, editRomanceNote } = fields;
    editSetReferenceNumber.onChange(_setReference);
    editSetDescription.onChange(_setDescription);
    editSuiteName.onChange(_suiteName);
    editRomanceNote.onChange(_romanceNote);
}