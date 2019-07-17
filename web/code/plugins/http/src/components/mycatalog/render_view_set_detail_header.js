import React, { Component } from 'react';
import jQuery from 'jquery';
import numberFormat from '../../utils/convertNumberformat';

class RenderViewSetDetailHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: ''
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

    readFile = (e)=>{
        e.preventDefault();
        let { fields:{ setImages }, props} = this.props;

        let reader = new FileReader();
        let file = e.target.files[0];
        setImages.onChange(file.name)

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
        const { listItem, fields: { setReferenceNumber, setDescription, suiteName, romanceNote, setImages } } = this.props;
        const userLogin = JSON.parse(sessionStorage.logindata);
        const summary = {
            totalItem: 0,
            totalRetailPrice: 0,
            totalUpdatedCost: 0,
            highestRetailPrice: 0,
            lowestRetailPrice: 0,
            averageRetailPrice: 0
        }
        const summaryItem = listItem.reduce(summaryListItem, summary);
        const {totalItem, totalRetailPrice, totalUpdatedCost, highestRetailPrice, lowestRetailPrice, averageRetailPrice} = summaryItem;     
        
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
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
                                    <span className="font-w9">{ numberFormat(totalRetailPrice) } { 'USD' }</span>
                                </span>
                                <span className={`${(userLogin.permission.price == 'Updated'
                                    || userLogin.permission.price == 'All') ?
                                    '' : 'hidden'}`}>
                                    <span className="padding-lf15">|</span>
                                    <span className="font-b fc-000">Total Updated Cost :</span>
                                    <span className="font-w9">{ numberFormat(totalUpdatedCost) } { 'USD' }</span>
                                </span>
                            </div>
                            <div id="dvTotalsub2" className="bg-f7d886 text-center">
                                <span>
                                    <span className="font-b fc-000">Highest Retail Price :</span>
                                    <span className="font-w9">{ numberFormat(highestRetailPrice) } { 'USD' } </span>
                                    <span className="padding-lf15">|</span>
                                </span>
                                <span>
                                    <span className="font-b fc-000">Lowest Retail Price :</span>
                                    <span className="font-w9">{ numberFormat(lowestRetailPrice) } { 'USD' } </span>
                                    <span className="padding-lf15">|</span>
                                </span>
                                <span>
                                    <span className="font-b fc-000">Average Retail Price :</span>
                                    <span className="font-w9">{ numberFormat(averageRetailPrice) } { 'USD' } </span>
                                </span>
                            </div>
                        </div>
                            <div className="row margin-ft">
                                <div className="col-md-6 col-sm-12 form-horizontal">
                                    <h2>ITEM DETAILS</h2>
                                    <div className="form-group">
                                        <label className="col-sm-4 control-label">Set Reference Number</label>
                                        <div className="col-sm-7">
                                            <input type="text" className="form-control" placeholder="Enter Set Reference Number" {...setReferenceNumber}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-4 control-label">Set Description</label>
                                        <div className="col-sm-7">
                                            <input type="text" className="form-control" placeholder="Enter Set Description" {...setDescription}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-4 control-label">Suite Name</label>
                                        <div className="col-sm-7">
                                            <input type="text" className="form-control" placeholder="Enter Suite Name" {...suiteName}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-4 control-label">Romance Note</label>
                                        <div className="col-sm-7">
                                            <input type="text" className="form-control" placeholder="Enter Romance Note" {...romanceNote}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-4 control-label">Attachment Image Set</label>
                                        <div className="col-sm-7">
                                            <input id="file" type="file" field={setImages} onChange={this.readFile}/>
                                            <span id="fileName"></span>
                                            <input type="button" id="btn-browsefile" value=" "/>
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

module.exports = RenderViewSetDetailHeader

const summaryListItem = (summary, item) =>{
    const {totalItem, totalRetailPrice, totalUpdatedCost, highestRetailPrice, lowestRetailPrice} = summary;
    const newSummary = {
        ...summary, 
        totalItem: totalItem + 1,
        totalRetailPrice: totalRetailPrice + item.priceInUSD,
        totalUpdatedCost: totalUpdatedCost + item.updatedCostInUSD,
        highestRetailPrice: Math.max(highestRetailPrice, item.priceInUSD),
        lowestRetailPrice: totalItem == 0 ? item.priceInUSD: Math.min(lowestRetailPrice, item.priceInUSD),
        averageRetailPrice: (totalRetailPrice + item.priceInUSD)/(totalItem + 1)
    }
    return newSummary
}