import React, { Component, PropTypes }from 'react';
import { reduxForm, reset } from 'redux-form';

class WhatNewNotification extends Component {

    render() {

            return(
                <div className="col-sm-12">
                    <div className="whatnew-bg">
                      what s news
                    </div>
                    <div className="accordion">
                        <div className="accordion-item">
                          <div className="accordion-title">
                            suptember 2016
                            <div className="accordion-open"></div>
                          </div>
                          <div className="whatnew-detail">
                              <div className="accordion-detail">
                                 <div className="accordion-detail-title">Add Accessory Catalog</div>
                                 <div className="new float-r">New</div>
                                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum diam odio, eleifend a vehicula non, feugiat ac tellus.
                                 Pellentesque velit orci, hendrerit a risus non, elementum vehicula justo. Sed maximus arcu eu nisl pretium facilisis.</p>
                                 <img src="/images/what-new.jpg" className="maring-t15" />
                              </div>
                              <div className="accordion-detail">
                                 <div className="accordion-detail-title">Customize Notification</div>
                                 <div className="update float-r">Update</div>
                                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum diam odio, eleifend a vehicula non, feugiat ac tellus.
                                 Pellentesque velit orci, hendrerit a risus non, elementum vehicula justo. Sed maximus arcu eu nisl pretium facilisis.</p>
                              </div>
                              <div className="accordion-detail">
                                 <div className="accordion-detail-title">Synchronizing Data with AX</div>
                                 <div className="bug float-r">Bug-Fix</div>
                                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum diam odio, eleifend a vehicula non, feugiat ac tellus.
                                 Pellentesque velit orci, hendrerit a risus non, elementum vehicula justo. Sed maximus arcu eu nisl pretium facilisis.</p>
                              </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                          <div className="accordion-title">
                            August 2016
                            <div className="accordion-close"></div>
                          </div>
                        </div>

                        <div className="accordion-item">
                          <div className="accordion-title">
                            July 2016
                            <div className="accordion-close"></div>
                          </div>
                        </div>

                    </div>
                </div>
            );
    }
}
module.exports = reduxForm({
  form: 'WhatNewNotification',
  fields: [],
},null,null)(WhatNewNotification)
