import React, { Component } from 'react';

class RenderViewSetDetailItem extends Component {
    constructor(props) {
        super(props);
    }

    render = _ => {
        const { stateAddress, stateRemark, addressOnChanged, remarkOnChanged } = this.props;
        return(
            <div className="row">
                <div className="col-sm-12">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <div className="row margin-ft">
                                <div className="col-md-6 form-horizontal">
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <div>
                                                <label className="col-sm-12 control-label">Address</label>
                                                <textarea className="col-sm-12 control-label"  rows={5}
                                                    value={stateAddress != null? stateAddress: 'Enter Address'} 
                                                    onChange={addressOnChanged}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 form-horizontal">
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <div>
                                                <label className="col-sm-12 control-label">Remark</label>
                                                <textarea className="col-sm-12 control-label" rows={5} 
                                                    value={stateRemark != null? stateRemark: 'Enter remark'}
                                                    onChange={remarkOnChanged}/>
                                            </div>
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

module.exports = RenderViewSetDetailItem