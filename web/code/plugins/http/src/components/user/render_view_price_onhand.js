import React, { Component, PropTypes } from 'react';

class RenderViewPriceOnHand extends Component {
    constructor(props) {
        super(props);

    }
    render(){
        const { props, state } = this.props;
        const { fields: { price }, userTypeValue } = props;
        return(
            <div className={`form-group ${userTypeValue != 'Sales' && userTypeValue != null ?'':'hidden'}`}>
                <label className="col-sm-2 control-label">View Price On Hand</label>
                <div className="col-sm-4">
                    <label>
                        <input type="radio" {...price} value="Public"
                            checked={price.value === 'Public'} /> Only Price
                    </label>
                </div>
                <div className="col-sm-4">
                    <label>
                        <input type="radio" {...price} value="Updated"
                            checked={price.value === 'Updated'} /> View Updated Cost and Price
                    </label>
                </div>
                <div className="col-sm-2">
                    <label>
                        <input type="radio" {...price} value="All"
                            checked={price.value === 'All'} /> View All Price
                    </label>
                </div>
            </div>
        )
    }
}
module.exports = RenderViewPriceOnHand;
