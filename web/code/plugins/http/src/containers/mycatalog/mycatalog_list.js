import React, { Component, PropTypes }from 'react';
import { reduxForm, reset } from 'redux-form';

import * as itemactions from '../../actions/itemactions';

class MyCatalog extends Component {
    constructor(props) {
      super(props);

    }

    componentWillMount() {
        this.props.getCatalogName();
    }

    render() {
            return(
                <div>MyCatalog</div>
            );
    }
}
module.exports = reduxForm({
  form: 'MyCatalog',
  fields: [],
},null,itemactions)(MyCatalog)
