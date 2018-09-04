import React, { Component, PropTypes } from 'react';
import MyCatalogPrintAll from './myCatalogPrintAll';
import { FULLPATH_LOCALFILE } from '../constants/productdetailconstants';

export default function GenTemplateHtml(ROOT_URL, imagesReplace, dv){
    const items = dv.items;
    const userLogin = dv.userLogin;
    const printPage = dv.printPage.value;
    const printPrice = dv.printPrice.value;
    const env = dv.env;
    let dvTotalItems = dv.dvTotalItems;
    let dvTotalSetItems = dv.dvTotalSetItems;
    let dvGridview = dv.dvGridview;
    let dvGridviewAll = MyCatalogPrintAll(items, userLogin);
    let styleTotal =`background-color: #dddddd;float: left;width: 100%;padding: 10px 0px;text-align: center; font-family: '${'Open Sans'}', sans-serif; font-size:10px;border-bottom: 1px solid #fff;`;
    let styleBodyWrapper ='margin: 0;padding: 0;';
    let styleContainerMarginb4 ='margin-bottom: 0%;padding-right: 15px;padding-left: 15px;margin-right: auto;margin-left: auto;';
    let styleColsm12 ='width: 100%;';
    let stylePanel ='border-radius: 0;margin-bottom: 0 !important;border: 0;box-shadow: none;';

    let stylePadding ='padding: 15px 0;';
    let styleSearchproduct  ='position: relative;';
    let styleSearchproductGride  ='margin: 0 auto; text-align: center;font-size: 10px;position: relative;z-index: 2;padding: 15px 11px 0 11px;height: 380px;cursor: pointer;';
    let colmd3colsm3nopadding  = 'width: 145px; padding: 0;float: left;height: 380px; margin: 0 auto;';
    let pullRight  = 'float: right!important;';
    let gridAdd  = 'float: left;margin-top: 0;z-index: 1;position: relative;cursor: pointer;';
    let iconAdd28  = `background: url(${ROOT_URL}/images/icon-add-28.png) no-repeat center;width: 28px;height: 28px;float: left;cursor: pointer;`;
    let checkbox  = 'padding-left: 10px;padding-right: 10px;margin-top: 2px;float: left;z-index: 1;position: relative;cursor: pointer;margin-bottom: 10px;';
    let checkbox1  = 'margin: 0 14px 0 10px;';
    let quickView  = 'margin-right: 0px;max-width: 23px;position: absolute;right: 0px;';
    let fontbfc000  = `font-family: '${'open_sanssemibold'}';color: #000;margin: 0 0 10px;`;
    let productdetailh = 'height: 85px;overflow: hidden;word-wrap: break-word;margin: 0 0 10px;';
    let stylePrice = 'color: #ae8f3b; font-weight: bold;';
    let thumbnaillgrid = 'margin: 0 auto; height: 200px; overflow: hidden; position: relative; width:123px;';
    let thumbnaillgridimg = 'width:120px;margin: 0 auto;';
    // let imgPath = 'file:///home/mol/www/projects/mol/web/code/plugins/http/public/images/';
    let imgPath = env == 'production'
                            ? 'file:///home/mol/www/projects/mol/web/code/plugins/http/public/images/'
                            : env == 'staging'
                                ?'file:///home/mol/www/projects/staging_mol/web/code/plugins/http/public/images/'
                                :`file:///${FULLPATH_LOCALFILE}web/code/plugins/http/public/images/`;
    let imgPathPublic = env == 'production'
                            ? 'file:///home/mol/www/projects/mol/web/code/plugins/http/public'
                            : env == 'staging'
                                ?'file:///home/mol/www/projects/staging_mol/web/code/plugins/http/public'
                                :`file:///${FULLPATH_LOCALFILE}web/code/plugins/http/public`;

    let tagbarspecialgrid = `position: absolute;top: 0px;left: 0px;z-index: 999;width: 50px;height: 53px;background: url(${imgPathPublic}/js/plugins/http/public/images/img_special_discount_pdf.png)right top no-repeat;`

    dvTotalItems = !!dvTotalItems?dvTotalItems.replace(/class="font-b fc-000"/g,'style="font-weight: bold; color: #000;"'):'';
    dvTotalItems = !!dvTotalItems?dvTotalItems.replace(/class="padding-lf15"/g,'style="padding: 0 5px;"'):'';
    switch (printPrice) {
        case 'public':
            dvTotalItems = !!dvTotalItems?dvTotalItems.replace(/class="spItemsUpdated "/g,'style="display: none !important;visibility: hidden !important;"'):'';
            dvTotalSetItems = dvTotalSetItems.replace(/class="spSetItemsUpdated "/g,'style="display: none !important;visibility: hidden !important;"');
            if (userLogin.permission.price.toLowerCase() == 'public') {
                dvTotalItems = !!dvTotalItems?dvTotalItems.replace(/class="spItemsUpdated hidden"/g,'style="display: none !important;visibility: hidden !important;"'):'';
                dvTotalSetItems = dvTotalSetItems.replace(/class="spSetItemsUpdated hidden"/g,'style="display: none !important;visibility: hidden !important;"');
            }else if (userLogin.permission.price.toLowerCase() == 'updated') {
                dvTotalItems = !!dvTotalItems?dvTotalItems.replace(/class="spItemsPublicPrice hidden"/g,'style="display: none !important;visibility: hidden !important;"'):'';
                dvTotalSetItems = dvTotalSetItems.replace(/class="spSetItemsPublicPrice hidden"/g,'style="display: none !important;visibility: hidden !important;"');
            }
            break;
        case 'updated':
            dvTotalItems = !!dvTotalItems?dvTotalItems.replace(/class="spItemsPublicPrice "/g,'style="display: none !important;visibility: hidden !important;"'):'';
            dvTotalSetItems = dvTotalSetItems.replace(/class="spSetItemsPublicPrice "/g,'style="display: none !important;visibility: hidden !important;"');
            if (userLogin.permission.price.toLowerCase() == 'public') {
                dvTotalItems = !!dvTotalItems?dvTotalItems.replace(/class="spItemsUpdated hidden"/g,'style="display: none !important;visibility: hidden !important;"'):'';
                dvTotalSetItems = dvTotalSetItems.replace(/class="spSetItemsUpdated hidden"/g,'style="display: none !important;visibility: hidden !important;"');
            }else if (userLogin.permission.price.toLowerCase() == 'updated') {
                dvTotalItems = !!dvTotalItems?dvTotalItems.replace(/class="spItemsPublicPrice hidden"/g,'style="display: none !important;visibility: hidden !important;"'):'';
                dvTotalSetItems = dvTotalSetItems.replace(/class="spSetItemsPublicPrice hidden"/g,'style="display: none !important;visibility: hidden !important;"');
            }
            break;
        default:
            if (userLogin.permission.price.toLowerCase() == 'public') {
                dvTotalItems = !!dvTotalItems?dvTotalItems.replace(/class="spItemsUpdated hidden"/g,'style="display: none !important;visibility: hidden !important;"'):'';
                dvTotalSetItems = dvTotalSetItems.replace(/class="spSetItemsUpdated hidden"/g,'style="display: none !important;visibility: hidden !important;"');
            }else if (userLogin.permission.price.toLowerCase() == 'updated') {
                dvTotalItems = !!dvTotalItems?dvTotalItems.replace(/class="spItemsPublicPrice hidden"/g,'style="display: none !important;visibility: hidden !important;"'):'';
                dvTotalSetItems = dvTotalSetItems.replace(/class="spSetItemsPublicPrice hidden"/g,'style="display: none !important;visibility: hidden !important;"');
            }
    }
    dvTotalSetItems = dvTotalSetItems.replace(/class="font-b fc-000"/g,'style="font-weight: bold; color: #000;"');
    dvTotalSetItems = dvTotalSetItems.replace(/class="padding-lf15"/g,'style="padding: 0 5px;"');

    dvGridview = dvGridview.replace(/class="searchresult-prodcut "/g,`style="${styleSearchproductGride}"`);
    // dvGridview = dvGridview.replace(/\/images\//g,imagesReplace);
    dvGridview = dvGridview.replace(/\/images\//g,imgPath);
    // dvGridview = dvGridview.replace(/\/images\/products\/original\//g,'file:///media/mol/MME/');
    dvGridview = dvGridview.replace(/class="col-md-3 col-sm-3 nopadding"/g,`style="${colmd3colsm3nopadding}"`);
    dvGridview = dvGridview.replace(/class="pull-right"/g,`style="${pullRight}"`);
    dvGridview = dvGridview.replace(/class="grid-add"/g,`style="${gridAdd}"`);
    dvGridview = dvGridview.replace(/class="icon-add-28"/g,`style="${iconAdd28}"`);
    dvGridview = dvGridview.replace(/class="checkbox checkbox-warning"/g,`style="${checkbox}"`);
    dvGridview = dvGridview.replace(/class="checkbox1"/g,`style="${checkbox1}"`);
    dvGridview = dvGridview.replace(/class="quick-view"/g,`style="${quickView}"`);
    dvGridview = dvGridview.replace(/class="font-b fc-000"/g,`style="${fontbfc000}"`);
    dvGridview = dvGridview.replace(/class="product-detail-h"/g,`style="${productdetailh}"`);
    dvGridview = dvGridview.replace(/class="fc-ae8f3b font-b price "/g,`style="${stylePrice}"`);
    dvGridview = dvGridview.replace(/class="thumbnaillgrid"/g,`style="${thumbnaillgrid}"`);
    dvGridview = dvGridview.replace(/<img/g,`<img style="${thumbnaillgridimg}" `);
    dvGridview = dvGridview.replace(/class="tagbar-special"/g,`style="${tagbarspecialgrid}"`);

    dvGridviewAll = dvGridviewAll.replace(/class="searchresult-prodcut "/g,`style="${styleSearchproductGride}"`);
    // dvGridview = dvGridview.replace(/\/images\//g,imagesReplace);
    dvGridviewAll = dvGridviewAll.replace(/\/images\//g,imgPath);
    // dvGridview = dvGridview.replace(/\/images\/products\/original\//g,'file:///media/mol/MME/');
    dvGridviewAll = dvGridviewAll.replace(/class="col-md-3 col-sm-3 nopadding"/g,`style="${colmd3colsm3nopadding}"`);
    dvGridviewAll = dvGridviewAll.replace(/class="pull-right"/g,`style="${pullRight}"`);
    dvGridviewAll = dvGridviewAll.replace(/class="grid-add"/g,`style="${gridAdd}"`);
    dvGridviewAll = dvGridviewAll.replace(/class="icon-add-28"/g,`style="${iconAdd28}"`);
    dvGridviewAll = dvGridviewAll.replace(/class="checkbox checkbox-warning"/g,`style="${checkbox}"`);
    dvGridviewAll = dvGridviewAll.replace(/class="checkbox1"/g,`style="${checkbox1}"`);
    dvGridviewAll = dvGridviewAll.replace(/class="quick-view"/g,`style="${quickView}"`);
    dvGridviewAll = dvGridviewAll.replace(/class="font-b fc-000"/g,`style="${fontbfc000}"`);
    dvGridviewAll = dvGridviewAll.replace(/class="product-detail-h"/g,`style="${productdetailh}"`);
    dvGridviewAll = dvGridviewAll.replace(/class="fc-ae8f3b font-b price "/g,`style="${stylePrice}"`);
    dvGridviewAll = dvGridviewAll.replace(/class="thumbnaillgrid"/g,`style="${thumbnaillgrid}"`);
    dvGridviewAll = dvGridviewAll.replace(/<img/g,`<img style="${thumbnaillgridimg}" `);
    dvGridviewAll = dvGridviewAll.replace(/class="tagbar-special"/g,`style="${tagbarspecialgrid}"`);

    let htmlTemplate = '';

    htmlTemplate = `<html>
                        <head>
                            <title>Mol online 2016</title>
                            <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
                        </head>
                        <body style="margin:0;padding:0; font-family: 'Open Sans', sans-serif; font-size:10px;">
                            <form>
                                <div style="${styleBodyWrapper}">
                                    <div>
                                        <div style="${styleTotal}">
                                            ${dvTotalItems}
                                        </div>
                                        <div style="${styleTotal}">
                                            ${dvTotalSetItems}
                                        </div>
                                        <div>
                                            <div style="${styleColsm12}">
                                                <div style="${stylePanel}">
                                                    <div>
                                                        <div style="${styleSearchproduct}">
                                                            ${printPage == 'all'? dvGridviewAll: dvGridview}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </body>
                    </html>`;
    return htmlTemplate;
}
