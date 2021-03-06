import React, { Component, PropTypes } from 'react';
import numberFormat from '../../../utils/convertNumberformat';
import { FULLPATH_LOCALFILE } from '../../../constants/productdetailconstants';
import compareBy from '../../../utils/compare';

export default function GenTemplateHtml(that, dataSet, ROOT_URL, _totalPublicPriceSet, _totalUpdatedCostSet, _totalSetItems, _totalPages){
    const userLogin = JSON.parse(sessionStorage.logindata);

    const printPrice = 'public';
    const env = ENVIRONMENT;

    const listView = 'width: 100%;border-radius: 0;margin-bottom: 0 !important;border: 0;box-shadow: none;';
    const tableStyle = 'width: 100%;max-width: 100%;margin-bottom: 20px;border: 1px solid #ddd;background-color: transparent;border-spacing: 0;border-collapse: collapse;';
    const imgCenter = 'margin: 0 auto;text-align: center;width: 500px;position: relative;';
    const divTotal = `background-color: #dddddd;float: left;width: 100%;padding: 10px 10px;text-align: center;font-family: '${'Open Sans'}', sans-serif;font-size: 14px;`
    const fontbfc000  = `font-weight: bold;font-family: '${'Open Sans'}';color: #000;margin: 0 0 10px;`;
    const fontw9 = `font-weight: 900;text-align: center;color: #383735;font-family: '${'Open Sans'}', sans-serif;font-size: 14px;`
    const paddinglf15 = 'padding: 0 15px;text-align: center;'
    const thead = 'background-color: #383735;color: #ffffff;border-top: 1px solid #383735;vertical-align: middle;border-color: inherit;'
    const th = 'border-top: 0;border: 1px solid #5c5954;vertical-align: middle;padding: 5px;'
    const td = 'padding: 5px 5px;word-break: normal;border: 1px solid #5c5954;'
    const tdLeft = 'padding: 5px 5px;word-break: normal;border: 1px solid #5c5954;text-align: left !important;'
    const tdRight = 'padding: 5px 5px;word-break: normal;border: 1px solid #5c5954;text-align: Right !important;'
    const bdlbwhite = 'vertical-align: middle;padding: 5px;';
    const bgebtdtextCenter = `border: 1px solid #5c5954;vertical-align: middle;padding: 5px;line-height: 1.42857143;word-break: initial !important;font-weight: bold;font-family: '${'Open Sans'}';color: #000;background-color: #ebd79a;text-align: center;`
    const bgebtdtextRight = `border: 1px solid #5c5954;vertical-align: middle;padding: 5px;line-height: 1.42857143;word-break: initial !important;font-weight: bold;font-family: '${'Open Sans'}';color: #000;background-color: #ebd79a;text-align: right;`
    const hidden = 'display: none !important;visibility: hidden !important;'

    const chkGroupCost = userLogin.permission.price == 'All'
                            ? that.state.groupCost? true: false
                            : false;
    const chkUpdateCost = userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All'
                            ? that.state.updatedCost? true: false
                            : false;
    const chkSellingCost = userLogin.permission.price == 'Public' || userLogin.permission.price == 'Updated' || userLogin.permission.price == 'All'
                            ? that.state.sellingCost? true: false
                            : false;
    let htmlTemplate = '';

    htmlTemplate = `<html>
                        <head>
                            <title>Mol online 2016</title>
                            <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
                        </head>
                        <body style="margin:0;padding:0; font-family: 'Open Sans', sans-serif; font-size:10px;">
                            <form>
                                <div style="${listView}">
                                    <div id="dvTotal">
                                        <div>
                                            <div id="dvTotalSetItems" style="${divTotal}">
                                                <span>
                                                    <span style="${fontbfc000}">All Pages :</span>
                                                    <span style="${fontw9}">
                                                        <span>${_totalPages}</span>
                                                        <span> Pages </span>
                                                    </span>
                                                    <span style="${paddinglf15}">|</span>
                                                </span>
                                                <span>
                                                    <span style="${fontbfc000}">Total SetItems :</span>
                                                    <span style="${fontw9}">
                                                        <span>${_totalSetItems}</span>
                                                        <span> Sets </span>
                                                    </span>
                                                </span>`
                                                if (chkSellingCost) {
                                                    htmlTemplate = htmlTemplate + `<span>
                                                                                        <span style="${paddinglf15}">|</span>
                                                                                        <span style="${fontbfc000}">Total Retail Price (Set) :</span>
                                                                                        <span style="${fontw9}">
                                                                                            <span>${_totalPublicPriceSet}</span>
                                                                                            <span> USD</span>
                                                                                        </span>
                                                                                    </span>`
                                                }
                                                if (chkUpdateCost) {
                                                    htmlTemplate = htmlTemplate + `<span>
                                                                                        <span style="${paddinglf15}"> | </span>
                                                                                        <span style="${fontbfc000}">Total Updated Cost(Set) :</span>
                                                                                        <span style="${fontw9}">
                                                                                            <span>${_totalUpdatedCostSet}</span>
                                                                                            <span> USD</span>
                                                                                        </span>
                                                                                    </span>`
                                                }
            htmlTemplate = htmlTemplate + `</div>
                                        </div>
                                    </div>`
    dataSet.map((item) => {
        const totalActualCost = (item.totalActualCost) != undefined ? numberFormat(item.totalActualCost['USD']) : '-';
        const totalUpdatedCost = (item.totalUpdatedCost) != undefined ? numberFormat(item.totalUpdatedCost['USD']) : '-';
        const totalPrice = (item.totalPrice) != undefined ? numberFormat(item.totalPrice['USD']) : '-';

        let imagesProduct = '';

        let imagesGallery = [];
        let imagesOrder = [];
        if (item.authorization) {
            if (item.image.length > 1) {
                // First checked defaultImage = 1
                imagesGallery = item.image.find((im) => {
                    return im.defaultSetImage == 1;
                })
                if (!!imagesGallery) {
                    // If has defaultImage = 1
                    imagesProduct = (imagesGallery) != undefined
                        ? imagesGallery.original : '/images/blank.gif';
                }else{
                    // checked lastModifiedDateImage by using lastModifiedDateImage
                    imagesOrder = item.image.sort(compareBy('lastModifiedDateSetImage','desc',null));
                    imagesProduct = (imagesOrder.length) != 0 ? imagesOrder[0].original : '/images/blank.gif';
                }
            }else{
                imagesProduct = (item.image) != undefined
                    ? (item.image.length) != 0 ? item.image[0].original : '/images/blank.gif'
                    : '/images/blank.gif';
            }
        }else{
            imagesProduct = (item.authorization)
                ? (item.image.length) != 0 ? item.image[0].original : '/images/blank.gif'
                :'/images/blank.gif';
        }


        const imgPath = env == 'production'
                                ? `${ROOT_URL}${imagesProduct}`
                                : `${ROOT_URL}${imagesProduct}`;
        let imgPathPublic = env == 'production'
                                ? 'file:///home/mol/www/projects/mol/web/code/plugins/http/public'
                                : env == 'staging'
                                    ?'file:///home/mol/www/projects/staging/mol/web/code/plugins/http/public'
                                    :`file:///${FULLPATH_LOCALFILE}web/code/plugins/http/public`;
        let tagbarspecialgrid = `position: absolute;top: 0px;z-index: 999;width: 88px;height: 93px;background: url(${imgPathPublic}/js/plugins/http/public/images/img_special_discount_grid.png)right top no-repeat;`
        const isSpecialDisc = item.specialDiscount != undefined ? item.specialDiscount == 1?true:false : false;
        htmlTemplate = htmlTemplate + `<div style="padding: 15px;position: relative;">
                                        <table id="listView" style="${tableStyle}" >
                                            <thead id="listView" style="${thead}">
                                                <tr>
                                                    <th style="${th}"><span>Item Reference</span></th>
                                                    <th style="${th}"><span>Location</span></th>
                                                    <th style="${th}"><span>Description</span></th>
                                                    <th style="${th}"><span>Stone Detail</span></th>`
                                                    if (chkGroupCost) {
                                                        htmlTemplate = htmlTemplate + `<th style="${th}">
                                                                                            <span>Initial Cost (USD)</span></th>`
                                                    }
                                                    if (chkUpdateCost) {
                                                        htmlTemplate = htmlTemplate + `<th style="${th}">
                                                                                            <span>Updated Cost (USD)</span></th>`
                                                    }
                                                    if (chkSellingCost) {
                                                        htmlTemplate = htmlTemplate + `<th style="${th}">
                                                                                            <span>Retail Price (USD)</span></th>`
                                                    }
                htmlTemplate = htmlTemplate + `</tr>
                                            </thead>
                                            <tbody id="${item.setReference}">`
                                            if (item.items != undefined) {
                                                item.items.map((subitem) => {
                                                    const actualCost = (subitem.actualCost) != undefined ? numberFormat(subitem.actualCost['USD']) : '-'
                                                    const updatedCost = (subitem.updatedCost) != undefined ? numberFormat(subitem.updatedCost['USD']) : '-'
                                                    const price = (subitem.price) != undefined ? numberFormat(subitem.price['USD']) : '-'
                                                    htmlTemplate = htmlTemplate +
                                                   `<tr id="${subitem.id}">
                                                        <td style="${td}">${subitem.reference}</td>
                                                        <td style="${td}">${subitem.warehouse}</td>
                                                        <td style="${td}">${subitem.description}</td>
                                                        <td style="${tdLeft}">${subitem.stoneDetail}</td>`
                                                        if (chkGroupCost) {
                                                            htmlTemplate = htmlTemplate + `<td style="${tdRight}">${actualCost}</td>`
                                                        }
                                                        if (chkUpdateCost) {
                                                            htmlTemplate = htmlTemplate + `<td style="${tdRight}">${updatedCost}</td>`
                                                        }
                                                        if (chkSellingCost) {
                                                            htmlTemplate = htmlTemplate + `<td style="${tdRight}">${price}</td>`
                                                        }

                    htmlTemplate = htmlTemplate + `</tr>`
                                                })
                                            }
                htmlTemplate = htmlTemplate +  `<tr>
                                                    <td colspan="3" style="${bdlbwhite}"></td>
                                                    <td style="${bgebtdtextCenter}">Total</td>`
                                                    if (chkGroupCost) {
                                                        htmlTemplate = htmlTemplate + `<td style="${bgebtdtextRight}">${totalActualCost}</td>`
                                                    }
                                                    if (chkUpdateCost) {
                                                        htmlTemplate = htmlTemplate + `<td style="${bgebtdtextRight}">${totalUpdatedCost}</td>`
                                                    }
                                                    if (chkSellingCost) {
                                                        htmlTemplate = htmlTemplate + `<td style="${bgebtdtextRight}">${totalPrice}</td>`
                                                    }
                htmlTemplate = htmlTemplate + `</tr>
                                            </tbody>
                                        </table>
                                        <div id="imgset" style="${imgCenter}">
                                            <span style="${(isSpecialDisc)? tagbarspecialgrid:''}"></span>
                                            <img src="${imgPath}" name="${item.setReference}" id="${item.setReference}" style="${imgCenter}">
                                        </div>
                                    </div>`
    })
    htmlTemplate = htmlTemplate + `</div>
                            </form>
                        </body>
                    </html>`;

    return htmlTemplate;

}
