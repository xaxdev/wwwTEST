import React, { Component, PropTypes }from 'react';
import { reduxForm, reset } from 'redux-form';
import { Accordion, AccordionItem } from 'react-sanfona';

class WhatNewNotification extends Component {

    render() {
            const host = HOSTNAME || 'localhost';
            const ROOT_URL = (host != 'mol.mouawad.com')? `http://${host}:3005`: `http://${host}`;
            const Title = 'What\'s news';
            const roundData = [2,1];
            const msgData = [
                                {
                                    'id': 1,
                                    'round': 'December 2016',
                                    'datas': [
                                                {
                                                    'type':'new',
                                                    'title': 'User manual of MOL',
                                                    'msg': `<p>User manual of MOL Version 1 is at <a style="color:#383735; text-decoration: underline;" href="${ROOT_URL}/download_files/User_Manual_Mouwad_Website_(User).pdf" target="_blank">User Manual Mouawad Website (User)</a></p>`
                                                },
                                                {
                                                    'type': 'new',
                                                    'title': 'Inventory Report',
                                                    'msg': `<p>Under the header search, all the filters applied to all product categories</p>
                                                    <img src="/images/mol-1.jpg"/>
                                                    <p style="padding:20px 0 0 0;">You can also filter the criteria under each category by using the Advanced Search option.</p>
                                                    <img src="/images/mol-1-1.jpg" />`
                                                },
                                                {
                                                    'type':'new',
                                                    'title': '6 Product Categories',
                                                    'msg': `<p>There are 6 product categories: Jewelry, Watches, Stones, Accessories, Objects of Art, and Spare Parts.  You can use filters in each category by selecting the category and filling the criteria.</p>
                                                    <img src="/images/mol-2.jpg" />`
                                                },
                                                {
                                                    'type':'new',
                                                    'title': 'Search any items from Excel file',
                                                    'msg': `<p>The simple steps to search any items from your Excel file:
                                                    <div style="padding:0px 20px 10px 20px;">
                                                       <div>1.	Download Excel template</div>
                                                       <div>2.	Fill the item reference in the Excel file</div>
                                                       <div>3.	Upload the file in MOL by clicking “Browse” button and select the file</div>
                                                     </div>
                                                     </p>
                                                     <img src="/images/mol-3.jpg"/>`
                                                },
                                                {
                                                    'type':'new',
                                                    'title': 'Search Results',
                                                    'msg': `<p>There are the friendly functions under the Search Results page:</p>
                                                    <div style="padding:0px 20px 10px 20px;">
                                                       <p>•	List and Grid style </p>
                                                       <p>•	Quick View and Product detail</p>
                                                       <p>•	Number of items in a page</p>
                                                       <p>•	My catalog</p>
                                                       <p>•	Sorting and Export the data</p>
                                                     </div>
                                                     <img src="/images/mol-4.jpg"/>`
                                                },
                                                {
                                                    'type':'new',
                                                    'title': 'Export data to Excel file, and send to your e-mail',
                                                    'msg': `<p style="padding:0px 0px 15px 0px;">Click at “Excel” icon  <img src="/images/mol-5-1.jpg"/> to export data to Excel file, that the system will send the download link to your e-mail. </p>
                                                     <img src="/images/mol-5.jpg"/>`
                                                },
                                                {
                                                    'type':'new',
                                                    'title': 'Export data to PDF file',
                                                    'msg': `<p style="padding:0px 0px 15px 0px;">Click at “Print” icon  <img src="/images/mol-6-1.jpg" />  to print to PDF file, that the system will send the download link to your e-mail.</p>
                                                     <img src="/images/mol-6.jpg" />`
                                                },
                                                {
                                                    'type':'new',
                                                    'title': 'Change Password',
                                                    'msg': `<p>Changing your password, by clicking at your username and click Change Password menu.</p>
                                                     <div style="margin-top:15px; text-align:center;"><img src="/images/mol-7.jpg" /></div>
                                                     <div style="margin-top:15px; text-align:center;"><img src="/images/mol-7-1.jpg" /></div>`
                                                },
                                                {
                                                    'type':'new',
                                                    'title': 'My catalog',
                                                    'msg': `<p>Manage and view your catalog My Catalog menu.</p>
                                                     <div style="margin-top:15px; text-align:center;"><img src="/images/mol-8.jpg"/></div>
                                                    <div style="padding-top: 25px; text-decoration: underline;">Management tools</div>
                                                     <div style="margin-top:15px; text-align:center;"><img src="/images/mol-8-1.jpg"/></div>
                                                    <div style="padding:15px 0; text-decoration: underline;">How to add items to catalog</div>
                                                    <div styl="padding:15px 20px 0 20px;">
                                                      <div>1.	User adds item to My Catalog at Search Results page and Product Detail page</div>
                                                      <div>2.	Add an item to catalog: click “Catalog” icon <img src="/images/mol-8-2.jpg" /> at the selected items, and go to step 4</div>
                                                      <div>3.	Add multiple items to catalog: click “Square” icon <img src="/images/mol-8-3.jpg" />   at the selected items, and click “Catalog” icon on bar <img src="/images/mol-8-4.jpg" />  , and go to step 4</div>
                                                      <div style="padding-top:15px;"><img src="/images/mol-8-6.jpg"/></div>
                                                      <div style="margin-top:15px;">4.	Select the catalog exists or create the new catalog</div>
                                                      <div style="margin-top:15px; text-align:center;"><img src="/images/mol-8-7.jpg" /></div>
                                                    </div>`
                                                }
                                            ]
                                },
                                {
                                    'id': 2,
                                    'round': 'January 2017',
                                    'datas': [
                                                {
                                                    'type':'new',
                                                    'title': 'Change search logic on Item Description field',
                                                    'msg': `<p style="margin:-20px 0 20px 0;font-size:12px;">January 25, 2017</p>
                                                    <p>Quickly search and easy to get result by key some text of keywords.</p>`
                                                },
                                                {
                                                    'type':'new',
                                                    'title': 'Gemstone Search Section',
                                                    'msg': `<p style="margin:-20px 0 20px 0;font-size:12px;">January 25, 2017</p>
                                                    <p>Stone Type Dropdown can allow multiple search condition.</p>`
                                                },
                                                {
                                                    'type':'new',
                                                    'title': 'Add "Set Reference Number" at Product Detail Page',
                                                    'msg': `<p style="margin:-20px 0 20px 0;font-size:12px;">January 25, 2017</p>
                                                            <p>Displays the number of Set Reference at Product Detail page.</p>
                                                            <div styl="padding:15px 20px 0 20px;">
                                                              <div style="margin:15px 0px; text-align:center;"><img src="/images/set-ref-no.jpg"/></div>
                                                            </div>`
                                                },
                                                {
                                                    'type':'new',
                                                    'title': 'Download Original Certificates',
                                                    'msg': `<p>User can download original certificates image from Product Detail page</p>
                                                              <div styl="padding:15px 20px 0 20px;">
                                                                <div style="margin-top:15px">1.	Click here <img src="/images/mol-certificates-1.jpg" /> for download all files at upper image of item</div>
                                                                <div style="margin:15px 0px; text-align:center;"><img src="/images/img-certificates-01.jpg"/></div>
                                                                <div style="margin-top:15px">2.	Or click here <img src="/images/mol-certificates-2.jpg" /> for download per file from Diamonds Attributes</div>
                                                                <div style="margin:15px 0px; text-align:center;"><img src="/images/img-certificates-02.jpg" /></div>
                                                              </div>`
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
                     <div className="accordion-item">
                        <Accordion activeItems={roundData.length}>
                            {roundData.map((item, index) => {
                                // console.log(item);
                                // console.log(msgData);
                                let loop = item-1;
                                return (
                                    <AccordionItem title={msgData[loop].round} slug={item} key={index}
                                        className="accordion-title">
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
                                                // console.log(data.msg);
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
                </div>
            );
    }
}
module.exports = reduxForm({
  form: 'WhatNewNotification',
  fields: [],
},null,null)(WhatNewNotification)
