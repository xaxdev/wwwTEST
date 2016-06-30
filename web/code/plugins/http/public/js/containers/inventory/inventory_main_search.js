import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InventoryMainFilter  from '../../components/inventory/inventory_main_filter';

class InventorySearch extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  }

  handleSubmit(data) {
    console.log('data-->',data);
  }

  render(){

      return (
        <div>
          <InventoryMainFilter onSubmit={this.handleSubmit}/>
        </div>
      );

  }
}


export default connect()(InventorySearch);
