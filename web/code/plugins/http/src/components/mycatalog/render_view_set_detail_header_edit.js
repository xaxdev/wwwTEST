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
            const { setReference, setDescription, suiteName, romanceNote, setCurrency } = yingCatalogDetail;
            initData(this.props.fields, setReference, setDescription, suiteName, romanceNote, setCurrency)   
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

    changedSetCurrency = (e) =>{
        const {  fields: { setCurrency }, props } = this.props;
        setCurrency.onChange(e.target.value)
        props.changedSetCurrency(e.target.value);
    }

    render = _ => {
        const { yingCatalogDetail, yingCatalogDetailStatus, displayCurrency, 
            fields: { editSetReferenceNumber, editSetDescription, editSuiteName, editRomanceNote, editSetImages, setCurrency }
        } = this.props;
        const userLogin = JSON.parse(sessionStorage.logindata);
        const { currency } = userLogin
        
        let summary = {
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
            const displaySetCurrency = displayCurrency == '' 
            ? (yingCatalogDetail.setCurrency == '' || yingCatalogDetail.setCurrency == undefined) ? currency: yingCatalogDetail.setCurrency
            : displayCurrency
            summary = {...summary, 'currency':displaySetCurrency}
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
                                            <span className="font-w9">{ numberFormat(totalRetailPrice) } { displaySetCurrency }</span>
                                        </span>
                                        <span className={`${(userLogin.permission.price == 'Updated'
                                            || userLogin.permission.price == 'All') ?
                                            '' : 'hidden'}`}>
                                            <span className="padding-lf15">|</span>
                                            <span className="font-b fc-000">Total Updated Cost :</span>
                                            <span className="font-w9">{ numberFormat(totalUpdatedCost) } { displaySetCurrency }</span>
                                        </span>
                                    </div>
                                    <div id="dvTotalsub2" className="bg-f7d886 text-center">
                                        <span>
                                            <span className="font-b fc-000">Highest Retail Price :</span>
                                            <span className="font-w9">{ numberFormat(highestRetailPrice) } { displaySetCurrency } </span>
                                            <span className="padding-lf15">|</span>
                                        </span>
                                        <span>
                                            <span className="font-b fc-000">Lowest Retail Price :</span>
                                            <span className="font-w9">{ numberFormat(lowestRetailPrice) } { displaySetCurrency } </span>
                                            <span className="padding-lf15">|</span>
                                        </span>
                                        <span>
                                            <span className="font-b fc-000">Average Retail Price :</span>
                                            <span className="font-w9">{ numberFormat(averageRetailPrice) } { displaySetCurrency } </span>
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
                                            <label className="col-sm-4 control-label">Currency</label>
                                            <div className="col-sm-7">
                                                <select className="form-control " {...setCurrency} onChange={this.changedSetCurrency}>
                                                    <option key={''} value={''}>{'Please select currency'}</option>
                                                    <option key="AED" value="AED">AED</option>
                                                    <option key="JOD" value="JOD">JOD</option>
                                                    <option key="LBP" value="LBP">LBP</option>
                                                    <option key="OMR" value="OMR">OMR</option>
                                                    <option key="SAR" value="SAR">SAR</option>
                                                    <option key="USD" value="USD">USD</option>
                                                </select>
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
            const displaySetCurrency = displayCurrency == ''? currency: displayCurrency
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
                                            <span className="font-w9">{ numberFormat(0) } { displaySetCurrency }</span>
                                        </span>
                                        <span className={`${(userLogin.permission.price == 'Updated'
                                            || userLogin.permission.price == 'All') ?
                                            '' : 'hidden'}`}>
                                            <span className="padding-lf15">|</span>
                                            <span className="font-b fc-000">Total Updated Cost :</span>
                                            <span className="font-w9">{ numberFormat(0) } { displaySetCurrency }</span>
                                        </span>
                                    </div>
                                    <div id="dvTotalsub2" className="bg-f7d886 text-center">
                                        <span>
                                            <span className="font-b fc-000">Highest Retail Price :</span>
                                            <span className="font-w9">{ numberFormat(0) } { displaySetCurrency } </span>
                                            <span className="padding-lf15">|</span>
                                        </span>
                                        <span>
                                            <span className="font-b fc-000">Lowest Retail Price :</span>
                                            <span className="font-w9">{ numberFormat(0) } { displaySetCurrency } </span>
                                            <span className="padding-lf15">|</span>
                                        </span>
                                        <span>
                                            <span className="font-b fc-000">Average Retail Price :</span>
                                            <span className="font-w9">{ numberFormat(0) } { displaySetCurrency } </span>
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
                                            <label className="col-sm-4 control-label">Currency</label>
                                            <div className="col-sm-7">
                                                <select className="form-control ">
                                                    <option key={''} value={''}>{'Please select currency'}</option>
                                                    <option key="AED" value="AED">AED</option>
                                                    <option key="JOD" value="JOD">JOD</option>
                                                    <option key="LBP" value="LBP">LBP</option>
                                                    <option key="OMR" value="OMR">OMR</option>
                                                    <option key="SAR" value="SAR">SAR</option>
                                                    <option key="USD" value="USD">USD</option>
                                                </select>
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
    const {totalItem, totalRetailPrice, totalUpdatedCost, highestRetailPrice, lowestRetailPrice, currency} = summary;
    const newSummary = {
        ...summary, 
        totalItem: totalItem + 1,
        totalRetailPrice: totalRetailPrice + Number(item.priceInCurrency[currency]),
        totalUpdatedCost: totalUpdatedCost + Number(item.updatedCostInCurrency[currency]),
        highestRetailPrice: Math.max(highestRetailPrice, Number(item.priceInCurrency[currency])),
        lowestRetailPrice: totalItem == 0 ? Number(item.priceInCurrency[currency]): Math.min(lowestRetailPrice, Number(item.priceInCurrency[currency])),
        averageRetailPrice: (totalRetailPrice + Number(item.priceInCurrency[currency]))/(totalItem + 1)
    }
    return newSummary
}

const initData = (fields, _setReference, _setDescription, _suiteName, _romanceNote, _setCurrency)=>{
    const { editSetReferenceNumber, editSetDescription, editSuiteName, editRomanceNote, setCurrency } = fields;
    editSetReferenceNumber.onChange(_setReference);
    editSetDescription.onChange(_setDescription);
    editSuiteName.onChange(_suiteName);
    editRomanceNote.onChange(_romanceNote);
    setCurrency.onChange(_setCurrency);
}