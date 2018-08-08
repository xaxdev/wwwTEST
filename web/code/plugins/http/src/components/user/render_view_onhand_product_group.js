import React, { Component, PropTypes } from 'react';

class RenderViewOnHandProductGroup extends Component {
    constructor(props) {
        super(props);

    }
    render(){
        const { props, state, onChangedSelectedProductGroup, onChangedHandleInputChange } = this.props;
        const { fields: {
            productGroup, productGroupJLY, productGroupWAT, productGroupSTO, productGroupACC, productGroupOBA, productGroupSPA
        }, userTypeValue } = props;
        return(
            <div className={`form-group ${userTypeValue != 'Sales' && userTypeValue != null ?'':'hidden'}`}>
                <label className="col-sm-2 control-label">View On Hand Product Group</label>
                <div className="col-sm-5">
                    <select className="form-control" {...productGroup}
                        value={state.value} onChange={onChangedSelectedProductGroup}>
                        <option key={0} value={0}>{'Please select Product Group'}</option>
                        <option key={1} value={1}>{'All Product Group'}</option>
                        <option key={2} value={2}>{'Some Product Group'}</option>
                    </select>
                    <div id="checkboxlistProduct" className={`${state.hideProductGroups ? 'hiddenViewProductGroup' : ''}` }>
                        <div>
                            <input type="checkbox"  value="JLY"
                                checked={productGroupJLY.value === 'JLY'}
                                {...productGroupJLY}
                                onChange={onChangedHandleInputChange}/>
                            <span>Jewelry</span>
                        </div>
                        <div>
                            <input type="checkbox"  value="WAT"
                                checked={productGroupWAT.value === 'WAT'}
                                {...productGroupWAT}
                                onChange={onChangedHandleInputChange}/>
                            <span>Watch</span>
                        </div>
                        <div>
                            <input type="checkbox" value="STO"
                                checked={productGroupSTO.value === 'STO'}
                                {...productGroupSTO}
                                onChange={onChangedHandleInputChange}/>
                            <span>Stone</span>
                        </div>
                        <div>
                            <input type="checkbox"  value="ACC"
                                checked={productGroupACC.value === 'ACC'}
                                {...productGroupACC}
                                onChange={onChangedHandleInputChange}/>
                            <span>Accessory</span>
                        </div>
                        <div>
                            <input type="checkbox"  value="OBA"
                                checked={productGroupOBA.value === 'OBA'}
                                {...productGroupOBA}
                                onChange={onChangedHandleInputChange}/>
                            <span>Object Of Art</span>
                        </div>
                        <div>
                            <input type="checkbox"  value="SPA"
                                checked={productGroupSPA.value === 'SPA'}
                                {...productGroupSPA}
                                onChange={onChangedHandleInputChange}/>
                            <span>Spare Parts</span>
                        </div>
                    </div>
                    {/*<div className="text-help">
                        { productGroupErr.touched ? productGroupErr.error : ''}
                    </div>*/}
                </div>
            </div>
        )
    }
}
module.exports = RenderViewOnHandProductGroup;
