import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import PureInput from '../../utils/PureInput';

class InventoryWatchFilter extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps) {
    return this.props.watchcategory !== nextProps.watchcategory||
      this.props.collection !== nextProps.collection

  }
  render() {
    const { watchcategory, collection } = this.props
    return(
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group">
                <label>Watch Category</label>
                <PureInput type="text" className="form-control" field={watchcategory} />
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
InventoryWatchFilter.propTypes = {
  watchcategory: PropTypes.object.isRequired,
  collection: PropTypes.object.isRequired
}
export default InventoryWatchFilter;
