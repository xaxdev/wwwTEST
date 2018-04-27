import React, { Component, PropTypes }from 'react';
import { reduxForm, reset } from 'redux-form';
import { Accordion, AccordionItem } from 'react-sanfona';

class WhatNewNotification extends Component {

    render() {
            const host = HOSTNAME || 'localhost';
            const ROOT_URL = (host != 'mol.mouawad.com')? `http://${host}:3005`: `http://${host}`;
            const Title = 'What\'s news';
            const roundData = [8,7,6,5,4,3,2,1];
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
                                                    <div style="padding:15px 20px 0 20px;">
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
                                                    'title': 'Sort By Set Reference Number',
                                                    'msg': `<p style="margin:-20px 0 20px 0;font-size:12px;">January 30, 2017</p>
                                                    <p>Search Result will be sorting by Set Reference Number. You can continue viewing the same items of set.</p>
                                                      <div style="padding:15px 20px 0 20px;">
                                                        <div style="margin:15px 0px; text-align:center;"><img src="/images/img-sort-by.jpg"/></div>
                                                      </div>`
                                                },
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
                                                            <div style="padding:15px 20px 0 20px;">
                                                              <div style="margin:15px 0px; text-align:center;"><img src="/images/set-ref-no.jpg"/></div>
                                                            </div>`
                                                },
                                                {
                                                    'type':'new',
                                                    'title': 'Download Original Certificates',
                                                    'msg': `<p>User can download original certificates image from Product Detail page</p>
                                                              <div style="padding:15px 20px 0 20px;">
                                                                <div style="margin-top:15px">1.	Click here <img src="/images/mol-certificates-1.jpg" /> for download all files at upper image of item</div>
                                                                <div style="margin:15px 0px; text-align:center;"><img src="/images/img-certificates-01.jpg"/></div>
                                                                <div style="margin-top:15px">2.	Or click here <img src="/images/mol-certificates-2.jpg" /> for download per file from Diamonds Attributes</div>
                                                                <div style="margin:15px 0px; text-align:center;"><img src="/images/img-certificates-02.jpg" /></div>
                                                              </div>`
                                                }
                                            ]
                                },
                                {
                                    'id': 3,
                                    'round': 'March 2017',
                                    'datas': [
                                              {
                                                  'type':'new',
                                                  'title': 'Improvement Download Certificate file directly via browser',
                                                  'msg': `<p style="margin:-20px 0 20px 0;font-size:12px;">March 31, 2017</p>
                                                  <p>At Stone Attributes section, user can download certificate file directly via browser</p>`
                                              },
                                              {
                                                  'type':'new',
                                                  'title': 'Improvement Save Search button',
                                                  'msg': `<p style="margin:-20px 0 20px 0;font-size:12px;">March 31, 2017</p>
                                                  <p>Move “Reset” button and “Save As” button to under “...” button</p>
                                                  <div style="padding:15px 20px 0 20px;">
                                                      <div style="margin:15px 0px; text-align:center;"><img src="/images/mol_save_search.gif"/></div>
                                                  </div>
                                                  <div style="padding:15px 20px 0 20px;">
                                                      <div style="margin:15px 0px; text-align:center;"><img src="/images/mol_search_icon.gif"/></div>
                                                  </div>`
                                              },
                                              {
                                                  'type':'new',
                                                  'title': 'Save Share Search',
                                                  'msg': `<p style="margin:-20px 0 20px 0;font-size:12px;">March 27, 2017</p>
                                                  <p>User can save condition of search and share to another MOL account.</p>
                                                  <h3 style="padding:17px 0px 0px 0px">How to save condition of search</h3>
                                                  <div style="margin-left: 20px;">
                                                      <p>1.	At Inventory Report enter or select search condition</p>
                                                      <p>2.	Click “Save As" button.</p>
                                                      <p>3.	At the Save Search screen. Enter search name.</p>
                                                      <p>4.	Click at "Save Searches" menu to view list of saved search.</p>
                                                  </div>
                                                  <div style="padding:15px 20px 0 20px;">
                                                      <div style="margin:15px 0px; text-align:center;"><img src="/images/mol_save_search2.gif"/></div>
                                                  </div>
                                                  <h3 style="padding:17px 0px 0px 0px">How to share saved search</h3>
                                                  <div style="margin-left: 20px;">
                                                      <p>1.	Go to  "Save Searches" page.</p>
                                                      <p>2.	Click <img src="/images/icon-savesearch-01.png"/> “Share” icon*</p>
                                                      <p>3.	At the Share Search screen. Enter individual or multiple user MOL account to share.</p>
                                                      <p>4.	Click “Share” button to share saved search.</p>
                                                  </div>
                                                  <div style="color:red">*Only owner can share “saved search”</div>
                                                  <div style="padding:15px 20px 0 20px;">
                                                      <div style="margin:15px 0px; text-align:center;"><img src="/images/mol_share_search.gif"/></div>
                                                  </div>
                                                  <h3 style="padding:17px 0px 0px 0px">Other Action</h3>
                                                  <div style="margin-left: 20px;">
                                                      <p>1.	Click at <img src="/images/icon-savesearch-02.png"/> “Edit” icon to edit condition of search and click “Save” button to update*</p>
                                                      <p>2.	Click at <img src="/images/icon-savesearch-03.png"/> “Delete” icon to delete saved searches*</p>
                                                      <p>3.	Click at <img src="/images/icon-savesearch-01.png"/> “Search” icon to view search result. And then user can modify search</p>
                                                      <p style="margin-left:20px;">a.	For owner actor, after modifying search user can click “Save” for update.</p>
                                                      <p style="margin-left:20px;">b.	For Shared actor, after modifying search user can click “Save As” for new save condition of search.</p>
                                                  </div>
                                                  <div style="color:red">*Only owner saved search can edit and delete “saved search”</div>
                                                  <div style="padding:15px 20px 0 20px;">
                                                      <div style="margin:15px 0px; text-align:center;"><img src="/images/mol_search_icon2.gif"/></div>
                                                  </div>`
                                              },
                                                {
                                                    'type':'new',
                                                    'title': 'Share Catalog',
                                                    'msg': `<p style="margin:-20px 0 20px 0;font-size:12px;">March 10, 2017</p>
                                                    <p>User to be able to share to another users in MOL by email. The recipient can view shared catalog as name format is Share: XXXXXXX (Ex. Share: Masterpiece)</p>
                                                    <h3 style="padding:17px 0px 0px 0px">How to share catalog</h3>
                                                    <div style="margin-left: 20px;">
                                                        <p>1. 	Go to My Catalog page</p>
                                                        <p>2.	Select the Catalog drop-down menu</p>
                                                        <p>3.	Click <img style="width:20px;height:20px" src="/images/icon-next-watchnew.jpg"/>  “share” icon</p>
                                                        <p>4.	Enter MOL account email to share by individual user or multiple user. <br><span style="margin-left:18px"> Format : recipient1, recipient2 (a@ito.com, b@ito.com, c@mouawad.com)</span></p>
                                                        <p>5.	Click “submit” button to share catalog</p>
                                                    </div>
                                                    <div style="padding:15px 20px 0 20px;">
                                                        <div style="margin:15px 0px; text-align:center;"><img src="/images/My-catalog.gif"/></div>
                                                    </div>`
                                                },
                                                {
                                                    'type':'new',
                                                    'title': 'Movement Activity',
                                                    'msg': `<p style="margin:-20px 0 20px 0;font-size:12px;">March 3, 2017</p>
                                                    <p>It presented the inventory movement history of both Sales Consignment and Intercompany/Warehouse Transfer</p>
                                                    <div style="margin-left: 20px;">
                                                    <p>• Customer Viewings displays the product sold to the external customers</p>
                                                    <p>• Intercompany Transfer displays the all records of intercompany & warehouse in each product</p>
                                                    <p><span style="color:red;">*</span> We, IT team, will grant the right to some users who will be able to view the Movement Activity</p>
                                                    </div>
                                                    <h3 style="padding:17px 0px 0px 0px">How to use Movement Activity</h3>
                                                    <div style="margin-left: 20px;">
                                                    <p>1.	Search any items as required.</p>
                                                    <p>2.	Click the item at Search Results page and go to Product Detail page.</p>
                                                    <p>3.	Click at <img src="/images/icon-movement-watch.jpg"/>  Movement Activity icon to see Movement Activity page.</p>
                                                    <p>4.	Click at <img src="/images/icon-back-watchnew.jpg"/>  Back icon to see Product Detail page.</p>
                                                    </div>
                                                    <div style="padding:15px 20px 0 20px;">
                                                        <div style="margin:15px 0px; text-align:center;"><img src="/images/mol-product-detail.gif"/></div>
                                                    </div>`
                                                }
                                            ]
                                },
                                {
                                    'id': 4,
                                    'round': 'June 2017',
                                    'datas': [
                                              {
                                                  'type':'new',
                                                  'title': 'Export excel file for Set (View as Set search)',
                                                  'msg': `<p style="margin:-20px 0 20px 0;font-size:12px;">June 30, 2017</p>
                                                  <p>After user search by condition ‘View as Set” check box and can export excel file at the Search Result page via excel <img src="/images/icon-excel.png"/> icon.</p>
                                                  <div style="padding:15px 20px 0 20px;">
                                                      <div style="margin:15px 0px; text-align:center;"><img src="/images/mol_export_excel_view_as_set.gif"/></div>
                                                  </div>`
                                              },
                                              {
                                                  'type':'new',
                                                  'title': 'Select all items and add to My Catalog ',
                                                  'msg': `<p style="margin:-20px 0 20px 0;font-size:12px;">June 30, 2017</p>
                                                  <p>User can select all items at the ‘Search Result’ page and add these items to My Catalog. </p>

                                                  <h3 style="padding:17px 0px 0px 0px">How to use this function:</h3>
                                                  <div style="margin-left: 20px;">
                                                  <p>1.	At Search Result page, click ‘Select All’ <img src="/images/icon-selectall.jpg"/>  check box. The system will select all items ready to add to My Catalog.</p>
                                                  <p>2.	Can un-select some items (if need)</p>
                                                  <p>3.	Can un-select all items (if need)</p>
                                                  <p>4.	Click ‘Add to Catalog’ <img src="/images/icon-favi.jpg"/> icon to select catalog or create new catalog.</p>
                                                  <p>5.	Click 'Submit' button to confirm add item(s) to catalog.</p>
                                                  </div>
                                                  <div style="padding:15px 20px 0 20px;">
                                                    <div style="margin:15px 0px; text-align:center;"><img src="/images/mol_select_all_add_to_catalog.gif"/></div>
                                                  </div>`
                                              }
                                            ]
                                },
                                {
                                    'id': 5,
                                    'round': 'October 2017',
                                    'datas': [
                                              {
                                                  'type':'new',
                                                  'title': 'Select sort by at My Catalog page ',
                                                  'msg': `<p style="margin:-20px 0 20px 0;font-size:12px;">October 10, 2017</p>
                                                  <p>User can select sort by to sort the item at 'My Catalog' page.<p>
                                                  <h3 style="padding:17px 0px 0px 0px">How to use this function:</h3>
                                                  <div style="padding:15px 20px 0 20px;">
                                                  <p>1. At My Catalog page, click 'Updated Date' to select sort by.</p>
                                                  <p>2. The items will show result follow user select sorting.</p>
                                                      <div style="margin:15px 0px; text-align:center;"><img src="/images/my-sort-catalog.gif"/></div>
                                                  </div>`
                                              }
                                            ]
                                },
                                {
                                    'id': 6,
                                    'round': 'November 2017',
                                    'datas': [
                                              {
                                                  'type':'new',
                                                  'title': 'COA/DBC/Monograph',
                                                  'msg': `<p style="margin:-20px 0 20px 0;font-size:12px;">November 27, 2017</p>
                                                  <h3 style="padding:17px 0px 0px 0px">Click icons at Product Detail page for download COA/DBC/Monograph files.</h3>
                                                  <div style="padding:15px 20px 0 20px;">
                                                  <p>1. When users click icon the system will auto download, if it is 1 image or PDF file.</p>
                                                  <p>2. When users click icon the system will send the download link to your e-mail.</p>
                                                  <div style="margin:15px 0px; text-align:center;"><img src="/images/COA1.gif"/></div>
                                                  <div style="margin:15px 0px; text-align:center;"><img src="/images/DBC1.gif"/></div>
                                                  <div style="margin:15px 0px; text-align:center;"><img src="/images/M1.gif"/></div>

                                                  </div>`
                                              },
                                              {
                                                  'type':'new',
                                                  'title': 'Set items display order',
                                                  'msg': `<p style="margin:-20px 0 20px 0;font-size:12px;">November 27, 2017</p>
                                                  <div style="padding:15px 20px 0 20px;">
                                                  <p>1. User search by condition 'Set Reference Number</p>
                                                  <p>2. At Search Result page,user can select sort by 'Set Item Reference' to get the result as Necklace, Bracelet, Earring and Ring.</p>
                                                      <div style="margin:15px 0px; text-align:center;"><img src="/images/set-item.gif"/></div>
                                                  </div>`
                                              }
                                            ]
                                },
                                {
                                    'id': 7,
                                    'round': 'March 2018',
                                    'datas': [
                                              {
                                                  'type':'new',
                                                  'title': 'To Remove Code in Search Criteria and Show only Description',
                                                  'msg': `<p style="margin:-20px 0 20px 0;font-size:12px;">March 28, 2018</p>
                                                  <p style="padding:17px 0px 0px 0px">Show only 'Description' when user click at (Dominant Stone, Jewelry Category, Watch Category, Accessory Type, Spare Part Type, Collection, Brand, Metal Type, Stone Type) fields.</p>
                                                  <div style="padding:15px 20px 0 20px;">
                                                  <div style="margin:15px 0px; text-align:center;"><img src="/images/to-remove-code.gif"/></div>
                                                  </div>`
                                              }
                                            ]
                                },
                                {
                                    'id': 8,
                                    'round': 'April 2018',
                                    'datas': [
                                              {
                                                  'type':'new',
                                                  'title': 'Article Grouping',
                                                  'msg': `<p style="margin:-20px 0 20px 0;font-size:12px;">April 26, 2018</p>
                                                  <p style="padding:17px 0px 0px 0px">When user select anything in ‘Article Grouping’ field the hierarchy and other fields in advance search should show only related values</p>
                                                  <div style="padding:15px 20px 0 20px;">
                                                  <div style="margin:15px 0px; text-align:center;"><img src="/images/Article-Grouping.gif"/></div>
                                                  </div>`
                                              },
                                              {
                                                  'type':'new',
                                                  'title': 'Option to View Total Stone & Diamond Weight in Item search detailed page',
                                                  'msg': `<p style="margin:-20px 0 20px 0;font-size:12px;">April 26, 2018</p>
                                                  <p style="padding:17px 0px 0px 0px">Show total of stone and diamond when user click to see the product detail</p>
                                                  <div style="padding:15px 20px 0 20px;">
                                                  <div style="margin:15px 0px; text-align:center;"><img src="/images/Option-to-View.gif"/></div>
                                                  </div>`
                                              },
                                              {
                                                  'type':'new',
                                                  'title': 'Set Catalog',
                                                  'msg': `<p style="margin:-20px 0 20px 0;font-size:12px;">April 26, 2018</p>
                                                  <p>- User search from view as set</p>
                                                  <p>- At search results page when user click icon add to catalog</p>
                                                  <p>- Get optional to create set catalog</p>
                                                  <p>- At set catalog page should have all functions like my catalog.</p>
                                                  <p>- Display of set item at set catalog will be grid view same as my catalog</p>
                                                  <p>- When user click on set item, it will display like your format at 'Set Detail' page.</p>
                                                  <p>- User can click next and back to see other set items at this page.</p>
                                                  <p>- This format will show at Set Detail page only.</p>
                                                  <div style="padding:15px 20px 0 20px;">
                                                  <div style="margin:15px 0px; text-align:center;"><img src="/images/Set-Catalog.gif"/></div>
                                                  </div>`
                                              },
                                              {
                                                  'type':'new',
                                                  'title': 'To Export Set Catalog to Word File',
                                                  'msg': `<p style="margin:-20px 0 20px 0;font-size:12px;">April 26, 2018</p>
                                                  <p>- When click word icon, it will show popup to make user can select price (price depend on user access right).</p>
                                                  <p>- User can select full or current page to export set item.</p>
                                                  <div style="padding:15px 20px 0 20px;">
                                                  <div style="margin:15px 0px; text-align:center;"><img src="/images/to-export-set-catalog.gif"/></div>
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
