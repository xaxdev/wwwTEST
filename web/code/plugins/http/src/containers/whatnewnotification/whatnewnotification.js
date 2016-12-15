import React, { Component, PropTypes }from 'react';
import { reduxForm, reset } from 'redux-form';
import { Accordion, AccordionItem } from 'react-sanfona';

class WhatNewNotification extends Component {

    render() {
            const Title = 'What\'s news';
            const roundData = [1];
            const msgData = [
                                {
                                    'id': 1,
                                    'round': 'July 2016',
                                    'datas': [
                                            {
                                                'type':'new',
                                                'title': 'Add Accessory Catalog',
                                                'msg': `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> Vestibulum diam odio, eleifend a vehicula non, feugiat ac tellus.
                                                Pellentesque velit orci, hendrerit a risus non, elementum vehicula justo. Sed maximus arcu eu nisl pretium facilisis.
                                                <div><img src="/images/what-new.jpg" className="maring-t15" /></div>`,
                                                'img': '/images/what-new.jpg'
                                            },
                                            {
                                                'type': 'update',
                                                'title': 'Customize Notification',
                                                'msg': `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum diam odio, eleifend a vehicula non, feugiat ac tellus.
                                                Pellentesque velit orci, hendrerit a risus non, elementum vehicula justo. Sed maximus arcu eu nisl pretium facilisis.`,
                                                'img': ''
                                            },
                                            {
                                                'type':'bug',
                                                'title': 'Synchronizing Data with AX',
                                                'msg': `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum diam odio, eleifend a vehicula non, feugiat ac tellus.
                                                Pellentesque velit orci, hendrerit a risus non, elementum vehicula justo. Sed maximus arcu eu nisl pretium facilisis.`,
                                                'img': ''
                                            }
                                        ]
                                }

                            ];
            return(
                <div className="col-sm-12">
                    <div className="whatnew-bg">
                      {Title}
                    </div>
                    <div className="accordion">
                        <Accordion activeItems={roundData.length}>
                            {roundData.map((item, index) => {
                                console.log(item);
                                console.log(msgData);
                                let loop = item-1;
                                return (
                                    <AccordionItem title={msgData[loop].round} slug={item} key={index} className="accordion-title">
                                        <div className="whatnew-detail">
                                            {msgData[loop].datas.map((data) => {

                                                let typeNews = '';
                                                switch (data.type) {
                                                    case 'update':
                                                        typeNews = 'Update';
                                                        break;
                                                    case 'bug':
                                                        typeNews = 'Bug-Fix';
                                                        break;
                                                    default:
                                                        typeNews = 'New';
                                                        break;
                                                }
                                                console.log(data.msg);
                                                return (
                                                    <div className="accordion-detail">
                                                        <div className="accordion-detail-title">{data.title}</div>
                                                        <div className={`${data.type} float-r`}>{typeNews}</div>
                                                        <div dangerouslySetInnerHTML={{__html: data.msg}}></div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </AccordionItem>
                                );
                            })}
                        </Accordion>
                    </div>
                </div>
            );
    }
}
module.exports = reduxForm({
  form: 'WhatNewNotification',
  fields: [],
},null,null)(WhatNewNotification)
