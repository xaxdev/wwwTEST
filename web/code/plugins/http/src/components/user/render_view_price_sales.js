import React, { Component, PropTypes } from 'react';

class RenderViewPriceSales extends Component {
    constructor(props) {
        super(props);

    }
    render(){
        const { props, state, onChangedPriceSales } = this.props;
        const { fields: { priceSalesRTP, priceSalesUCP, priceSalesCTP, priceSalesNSP, priceSalesMGP, priceSalesDSP }, userTypeValue } = props;
        return(
            <div className={`form-group ${userTypeValue != 'OnHand' && userTypeValue != null ?'':'hidden'}`}>
                <label className="col-sm-2 control-label">View Price Sales</label>
                <div>
                    <div className="col-sm-4">
                        <input type="checkbox"  value="RTP"
                            checked={priceSalesRTP.value === 'RTP'}
                            {...priceSalesRTP}
                            onChange={onChangedPriceSales}/>
                        <span>Price</span>
                    </div>
                    <div className="col-sm-4">
                        <input type="checkbox"  value="UCP"
                            checked={priceSalesUCP.value === 'UCP'}
                            {...priceSalesUCP}
                            onChange={onChangedPriceSales}/>
                        <span>Updated Cost</span>
                    </div>
                    <div className="col-sm-2">
                        <input type="checkbox" value="CTP"
                            checked={priceSalesCTP.value === 'CTP'}
                            {...priceSalesCTP}
                            onChange={onChangedPriceSales}/>
                        <span>Cost Price</span>
                    </div>
                </div>
                <label className="col-sm-2 control-label"> </label>
                <div>
                    <div className="col-sm-4">
                        <input type="checkbox"  value="NSP"
                            checked={priceSalesNSP.value === 'NSP'}
                            {...priceSalesNSP}
                            onChange={onChangedPriceSales}/>
                        <span>Net Sales</span>
                    </div>
                    <div className="col-sm-4">
                        <input type="checkbox"  value="MGP"
                            checked={priceSalesMGP.value === 'MGP'}
                            {...priceSalesMGP}
                            onChange={onChangedPriceSales}/>
                        <span>Margin % and Amount</span>
                    </div>
                    <div className="col-sm-2">
                        <input type="checkbox"  value="DSP"
                            checked={priceSalesDSP.value === 'DSP'}
                            {...priceSalesDSP}
                            onChange={onChangedPriceSales}/>
                        <span>Discount % and Amount</span>
                    </div>
                </div>
            </div>
        )
    }
}
module.exports = RenderViewPriceSales;
