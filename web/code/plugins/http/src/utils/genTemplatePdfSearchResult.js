import React, { Component, PropTypes } from 'react';
import SearchResultGridViewPrintAll from './searchResultGridViewPrintAll';

export default function GenTemplateHtml(showGridView, showListView, ROOT_URL, imagesReplace, dv){
    const items = dv.items;
    const userLogin = dv.userLogin;
    const printPage = dv.printPage.value;
    const ViewAsSet = dv.ViewAsSet;
    const env = dv.env;
    let dvTotal1 = dv.dvTotal1;
    let dvTotal2 = dv.dvTotal2;
    let dvGridview = dv.dvGridview;
    let dvGridviewAll = SearchResultGridViewPrintAll(items, userLogin, ViewAsSet);
    let dvListview = dv.dvListview;
    let dvListviewAll = dv.dvListviewAll;

    let styleTotal1 =`background-color: #debe6b;float: left;width: 100%;padding: 15px 0;margin: 0px 0 1px 0;text-align: center; font-family: '${'Open Sans'}', sans-serif; font-size: 10px;`;
    let styleTotal2 =`background-color: #dddddd;float: left;width: 100%;padding: 10px 0px;text-align: center; font-family:'${'Open Sans'}', sans-serif; font-size: 10px;`;
    let styleBodyWrapper ='margin: 0;padding: 0;';
    let styleColsm12 ='width: 100%;';
    let stylePanel ='border-radius: 0;margin-bottom: 0 !important;border: 0;box-shadow: none;';
    let stylePadding ='padding: 15px 0;';
    let styleSearchproduct  ='position: relative;';
    let styleSearchproductGride  ='margin: 0 auto; text-align: center;font-size: 10px;position: relative;z-index: 2;padding: 15px 11px 0 11px;height: 380px;cursor: pointer;';
    let colmd3colsm3nopadding  = 'width: 135px; padding: 0;float: left;height: 380px; margin: 0 auto;';
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
    // let imgPath = 'file:///var/www/mol/web/code/plugins/http/public/images/';
    let imgPath = env == 'production'
                            ? 'file:///var/www/mol/web/code/plugins/http/public/images/'
                            : 'file:///home/dev/www/mol/web/code/plugins/http/public/images/';

    dvTotal1 = dvTotal1.replace(/class="font-b fc-000"/g,'style="font-weight: bold; color: #000;"');
    dvTotal1 = dvTotal1.replace(/class="padding-lf15"/g,'style="padding: 0 15px;"');

    dvTotal2 = dvTotal2.replace(/class="font-b fc-000"/g,'style="font-weight: bold; color: #000;"');
    dvTotal2 = dvTotal2.replace(/class="padding-lf15"/g,'style="padding: 0 15px;"');

    dvGridview = dvGridview.replace(/class="searchresult-prodcut "/g,`style="${styleSearchproductGride}"`);
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
    // dvGridview = dvGridview.replace(/\/original\//g,'/thumbnail/');

    dvGridviewAll = dvGridviewAll.replace(/class="searchresult-prodcut "/g,`style="${styleSearchproductGride}"`);
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
    // dvGridview = dvGridview.replace(/\/original\//g,'/thumbnail/');

    dvListview = dvListview.replace(/\/images\//g,imgPath);
    // dvListview = dvListview.replace(/\/images\/products\/original\//g,'file:///media/mol/MME/');
    dvListview = dvListview.replace(/class="table-responsive"/g,'');
    dvListview = dvListview.replace(/class="table table-bordered table-searchresult"/g,'style="font-size: 8px; border-spacing: 0;margin:0 auto;" width="100%"');
    dvListview = dvListview.replace(/class="sr-only"/g,'style="position: absolute;width: 1px;height: 1px;padding: 0;margin: -1px;overflow: hidden;clip: rect(0,0,0,0);border: 0;"');
    dvListview = dvListview.replace(/<thead/g,'<thead style="padding:10px 10px; text-align:center; color:#fff; background-color: #383735;  font-weight: normal; font-size: 8px;"');
    dvListview = dvListview.replace(/<th role="columnheader" scope="col"/g,'<th style="padding:10px 10px; text-align:center; color:#fff; background-color: #383735;  font-weight: normal; font-size: 8px; border: 1px solid #5c5954;" role="columnheader" scope="col"');
    // dvListview = dvListview.replace(/<td/g,'<td style="padding:5px 5px;word-break: normal;font-size: 8px; border: 1px solid #5c5954;" ');
    dvListview = dvListview.replace(/<th/g,'<td style="border:1px solid #5c5954;padding:5px 5px;word-break: normal;font-size: 8px; border: 1px solid #5c5954;" ');
    dvListview = dvListview.replace(/class="tdd"/g,'style="padding:5px 5px;word-break: normal;font-size: 8px; border: 1px solid #5c5954;"');
    dvListview = dvListview.replace(/class="bd-lb-white"/g,'style="border-left: 1px solid #fff;border-bottom: 1px solid #fff;padding:5px 5px;word-break: normal;font-size: 8px;"');
    dvListview = dvListview.replace(/class="font-b fc-000 text-center bg-eb"/g,`style="font-weight: bold; font-family:'${'open_sanssemibold'}';color:#000;text-align: center;background-color: #ebd79a;padding:5px 5px;word-break: normal;font-size: 8px; border: 1px solid #5c5954;border-right: transparent; border-bottom: 1px solid #5c5954;"`);
    dvListview = dvListview.replace(/class="font-b fc-000 bg-eb"/g,`style="font-weight: bold; font-family:'${'open_sanssemibold'}';color:#000;background-color: #ebd79a;padding:5px 5px;word-break: normal;font-size: 8px;border: 1px solid #5c5954; border-right: transparent; border-bottom: 1px solid #5c5954;"`);
    dvListview = dvListview.replace(/class="bd-tblr-white"/g,'style="border-left: 1px solid #fff;border-right: 1px solid #fff;border-bottom: transparent;"');

    // dvListview = dvListview.replace(/\/original\//g,'/thumbnail/');

    dvListviewAll = dvListviewAll.replace(/\/images\//g,imgPath);
    // dvListview = dvListview.replace(/\/images\/products\/original\//g,'file:///media/mol/MME/');
    dvListviewAll = dvListviewAll.replace(/class="table-responsive"/g,'');
    dvListviewAll = dvListviewAll.replace(/class="table table-bordered table-searchresult"/g,'style="font-size: 8px; border-spacing: 0; margin:0 auto;" width="100%"');
    dvListviewAll = dvListviewAll.replace(/class="sr-only"/g,'style="position: absolute;width: 1px;height: 1px;padding: 0;margin: -1px;overflow: hidden;clip: rect(0,0,0,0);border: 0;"');
    dvListviewAll = dvListviewAll.replace(/<thead/g,'<thead style="padding:10px 10px; text-align:center; color:#fff; background-color: #383735;  font-weight: normal; font-size: 8px;"');
    dvListviewAll = dvListviewAll.replace(/<th role="columnheader" scope="col"/g,'<th style="border: 1px solid #5c5954; padding:10px 10px; text-align:center; color:#fff; background-color: #383735;  font-weight: normal; font-size: 8px; border: 1px solid #5c5954;" role="columnheader" scope="col"');
    // dvListviewAll = dvListviewAll.replace(/<td/g,'<td style="padding:5px 5px;word-break: normal;font-size: 8px; border: 1px solid #5c5954;" ');
    dvListviewAll = dvListviewAll.replace(/<th/g,'<td style="border:1px solid #5c5954;padding:5px 5px;word-break: normal;font-size: 8px; border: 1px solid #5c5954;" ');
    dvListviewAll = dvListviewAll.replace(/class="tdd"/g,'style="padding:5px 5px;word-break: normal;font-size: 8px; border: 1px solid #5c5954; border-right: transparent; border-bottom: transparent;"');
    dvListviewAll = dvListviewAll.replace(/class="bd-lb-white"/g,'style="border-top:1px solid #5c5954; border-left: 1px solid #fff;border-bottom: 1px solid #fff;padding:5px 5px;word-break: normal;font-size: 8px;"');
    dvListviewAll = dvListviewAll.replace(/class="font-b fc-000 text-center bg-eb"/g,`style="font-weight: bold; font-family:'${'open_sanssemibold'}';color:#000;text-align: center;background-color: #ebd79a;padding:5px 5px;word-break: normal;font-size: 8px; border: 1px solid #5c5954;border-right: transparent; border-bottom: 1px solid #5c5954;"`);
    dvListviewAll = dvListviewAll.replace(/class="font-b fc-000 bg-eb"/g,`style="font-weight: bold; font-family:'${'open_sanssemibold'}';color:#000;background-color: #ebd79a;padding:5px 5px;word-break: normal;font-size: 8px; border: 1px solid #5c5954; border-right: transparent; border-bottom: 1px solid #5c5954;"`);
    dvListviewAll = dvListviewAll.replace(/class="bd-tblr-white"/g,'style="border-left: 1px solid #fff;border-right: 1px solid #fff;border-bottom: transparent;"');

    // dvListview = dvListview.replace(/\/original\//g,'/thumbnail/');

    let htmlTemplate = '';

    if (showGridView) {
        htmlTemplate = `<html>
                            <head>
                                <title>Mol online 2016</title>
                                <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
                            </head>
                            <body style="margin:0;padding:0; font-family: 'Open Sans', sans-serif; font-size: 10px;">
                                <form>
                                    <div style="${styleBodyWrapper}">
                                        <div>
                                            <div style="${styleColsm12}">
                                                <div style="${stylePanel}">
                                                    <div>
                                                        <div style="${styleTotal1}">
                                                            ${dvTotal1}
                                                        </div>
                                                        <div style="${styleTotal2}">
                                                            ${dvTotal2}
                                                        </div>
                                                        <div style="${styleSearchproduct}">
                                                            ${printPage == 'all'? dvGridviewAll: dvGridview}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </body>
                        </html>`;
    }

    if (showListView) {
        htmlTemplate = `<html>
                            <head>
                                <title>Mol online 2016</title>
                                <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
                            </head>
                            <body style="margin:0;padding:0; font-family: 'Open Sans', sans-serif; font-size: 10px;">
                                <form>
                                    <div style="${styleBodyWrapper}">
                                        <div>
                                            <div style="${styleColsm12}">
                                                <div style="${stylePanel}">
                                                    <div>
                                                        <div style="${styleTotal1}">
                                                            ${dvTotal1}
                                                        </div>
                                                        <div style="${styleTotal2}">
                                                            ${dvTotal2}
                                                        </div>
                                                        <div style="${styleSearchproduct}">
                                                            ${printPage == 'all'? dvListviewAll: dvListview}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </body>
                        </html>`;
    }

    return htmlTemplate;

}
