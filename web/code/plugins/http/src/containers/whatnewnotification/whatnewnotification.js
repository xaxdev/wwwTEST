import React, { Component, PropTypes }from 'react';
import { reduxForm, reset } from 'redux-form';

class WhatNewNotification extends Component {

    render() {
        let msg = 'Hello this is What\'s new page.';
            return(
                <div>
                    <span>{msg}</span>
                </div>
            );
    }
}
module.exports = reduxForm({
  form: 'WhatNewNotification',
  fields: [],
},null,null)(WhatNewNotification)
