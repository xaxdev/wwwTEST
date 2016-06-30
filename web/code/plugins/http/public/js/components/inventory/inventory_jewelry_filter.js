import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import PureInput from '../../utils/PureInput';

class InventoryJewelryFilter extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps) {
    return this.props.jewelrycategory !== nextProps.jewelrycategory||
      this.props.collection !== nextProps.collection

  }
  render() {
    const { jewelrycategory, collection } = this.props
    return(
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group">
                <label>Jewelry Category</label>
                <PureInput type="text" className="form-control" field={jewelrycategory} />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label>Collection</label>
                <PureInput type="text" className="form-control" field={collection} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
InventoryJewelryFilter.propTypes = {
  jewelrycategory: PropTypes.object.isRequired,
  collection: PropTypes.object.isRequired
}
export default InventoryJewelryFilter;
