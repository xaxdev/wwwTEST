import React, { Component, PropTypes } from 'react';

class RenderViewSalesProductGroup extends Component {
    constructor(props) {
        super(props);

    }
    render(){
        const { props, state, onChangedSelectedProductGroupSales, onChangedHandleInputChangeSales } = this.props;
        const { fields: {
            productGroupSales, productGroupSalesJLY, productGroupSalesWAT, productGroupSalesSTO, productGroupSalesACC, productGroupSalesOBA,
            productGroupSalesSPA, productGroupSalesErr
        }, userTypeValue } = props;
        return(
            <div className={`form-group ${userTypeValue != 'OnHand'?'':'hidden'}`}>
                <label className="col-sm-2 control-label">View Sales Product Group</label>
                <div className="col-sm-5">
                    <select className="form-control" {...productGroupSales}
                        value={state.valueSales} onChange={onChangedSelectedProductGroupSales}>
                        <option key={0} value={0}>{'Please select Sales Product Group'}</option>
                        <option key={1} value={1}>{'All Product Group'}</option>
                        <option key={2} value={2}>{'Some Product Group'}</option>
                    </select>
                    <div id="checkboxlistProduct" className={`${state.hideProductGroupsSales ? 'hiddenViewProductGroup' : ''}` }>
                        <div>
                            <input type="checkbox"  value="JLY"
                                checked={productGroupSalesJLY.value === 'JLY'}
                                {...productGroupSalesJLY}
                                onChange={onChangedHandleInputChangeSales}/>
                            <span>Jewelry</span>
                        </div>
                        <div>
                            <input type="checkbox"  value="WAT"
                                checked={productGroupSalesWAT.value === 'WAT'}
                                {...productGroupSalesWAT}
                                onChange={onChangedHandleInputChangeSales}/>
                            <span>Watch</span>
                        </div>
                        <div>
                            <input type="checkbox" value="STO"
                                checked={productGroupSalesSTO.value === 'STO'}
                                {...productGroupSalesSTO}
                                onChange={onChangedHandleInputChangeSales}/>
                            <span>Stone</span>
                        </div>
                        <div>
                            <input type="checkbox"  value="ACC"
                                checked={productGroupSalesACC.value === 'ACC'}
                                {...productGroupSalesACC}
                                onChange={onChangedHandleInputChangeSales}/>
                            <span>Accessory</span>
                        </div>
                        <div>
                            <input type="checkbox"  value="OBA"
                                checked={productGroupSalesOBA.value === 'OBA'}
                                {...productGroupSalesOBA}
                                onChange={onChangedHandleInputChangeSales}/>
                            <span>Object Of Art</span>
                        </div>
                        <div>
                            <input type="checkbox"  value="SPA"
                                checked={productGroupSalesSPA.value === 'SPA'}
                                {...productGroupSalesSPA}
                                onChange={onChangedHandleInputChangeSales}/>
                            <span>Spare Parts</span>
                        </div>
                    </div>
                    <div className="text-help">
                        { productGroupSalesErr.touched ? productGroupSalesErr.error : ''}
                    </div>
                </div>
            </div>
        )
    }
}
module.exports = RenderViewSalesProductGroup;
