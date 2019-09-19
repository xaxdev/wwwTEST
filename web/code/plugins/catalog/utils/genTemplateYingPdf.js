import React, { Component, PropTypes } from 'react';
import numberFormat from './convertNumberformat';
import config from './config';

export default function GenTemplateHtml(data){

    // const imagesLogo = 'file:///home/mol/www/projects/mol/web/code/plugins/http/public/images/Image_logo.jpg'
    // const imagesLogo = 'http://localhost:3005/images/Image_logo.jpg'
    const imagesLogo = 'http://mol.mouawad.com/images/Image_logo.jpg'
    let imagesSet = 'http://mol.mouawad.com/images/products/original/'

    let htmlTemplate = '';

    htmlTemplate = `<html>
                        <head>
                            <title>Mol online 2016</title>
                            <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
                        </head>
                        <body>
                            ${data.map(function(item, index){  
                                const { items } = item
                                const imagesSetUrl = imagesSet + item.setImages.replace(' ','%20')
                                const totalPrice = items.reduce((prev, curr) => prev + (Number(curr.priceInUSD) || 0), 0);
                                
                                return(`
                                    <table width="100%" border="0">
                                        <tbody>
                                            <tr>
                                                <td height="145" align="center" ><img width="564" height="85" alt="image" src="${imagesLogo}" /></td>
                                            </tr>
                                            <tr>
                                                <td height="534" align="center"><img width="358" height="509" alt="image" src="${imagesSetUrl}" /></td>
                                            </tr>
                                            <tr>
                                                <td align="center">
                                                    <table style="border-collapse:collapse;margin-left:6.42pt" cellspacing="0">
                                                        <tr style="height:22pt">
                                                            <td style="width:27pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="color: black; font-family:Times New Roman, serif; font-style: normal; font-weight:bold; text-decoration: none; font-size: 9pt;padding-top: 5pt;padding-left: 1pt;text-indent: 0pt;text-align: center;"><strong><span style="color: black; font-family:Times New Roman, serif; font-style: normal; font-weight:bold; text-decoration: none; font-size: 9pt;">لسلستلا</span></strong></p></td>
                                                            <td style="width:116pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="color: black; font-family:Times New Roman, serif; font-style: normal; font-weight:bold; text-decoration: none; font-size: 9pt;padding-top: 5pt;padding-left: 34pt;padding-right: 33pt;text-indent: 0pt;text-align: center;"><strong><span style="color: black; font-family:Times New Roman, serif; font-style: normal; font-weight:bold; text-decoration: none; font-size: 9pt;">ةعطقلا مقر</span></strong></p></td>
                                                            <td style="width:240pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="color: black; font-family:Times New Roman, serif; font-style: normal; font-weight:bold; text-decoration: none; font-size: 9pt;padding-top: 5pt;padding-left: 101pt;padding-right: 99pt;text-indent: 0pt;text-align: center;"><strong><span style="color: black; font-family:Times New Roman, serif; font-style: normal; font-weight:bold; text-decoration: none; font-size: 9pt;">تافصاوملا</span></strong></p></td>
                                                            <td style="width:74pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="color: black; font-family:Times New Roman, serif; font-style: normal; font-weight:bold; text-decoration: none; font-size: 9pt;padding-top: 5pt;padding-left: 15pt;text-indent: 0pt;text-align: left;"><strong><span style="color: black; font-family:Times New Roman, serif; font-style: normal; font-weight:bold; text-decoration: none; font-size: 9pt;">يلامجﻹا غلبملا</span></strong></p></td>
                                                        </tr>
                                                        ${items.map(function(item, index){
                                                            return(`
                                                                <tr style="height:23pt">
                                                                    <td style="width:27pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="color: black; font-family:Times New Roman, serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 8pt;padding-top: 6pt;padding-left: 1pt;text-indent: 0pt;text-align: center;"><strong><span style="color: black; font-family:Times New Roman, serif; font-style: normal; font-weight:bold; text-decoration: none; font-size: 9pt;">${index+1}</span></strong></p></td>
                                                                    <td style="width:116pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="color: black; font-family:Times New Roman, serif; font-style: normal; font-weight:bold; text-decoration: none; font-size: 9pt;padding-top: 6pt;padding-left: 35pt;padding-right: 33pt;text-indent: 0pt;text-align: center;"><span style="color: black; font-family:Times New Roman, serif; font-style: normal; font-weight:bold; text-decoration: none; font-size: 9pt;">${item.reference}</span></p></td>
                                                                    <td style="width:240pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="color: black; font-family:Times New Roman, serif; font-style: normal; font-weight:bold; text-decoration: none; font-size: 9pt;padding-top: 6pt;text-indent: 0pt;text-align: right;"><strong><span style="color: black; font-family:Times New Roman, serif; font-style: normal; font-weight:bold; text-decoration: none; font-size: 9pt;">${item.description}</span></strong></p></td>
                                                                    <td style="width:74pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="color: black; font-family:Times New Roman, serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 8pt;padding-top: 6pt;padding-right: 3pt;text-indent: 0pt;text-align: right;"><strong><span style="color: black; font-family:Times New Roman, serif; font-style: normal; font-weight:bold; text-decoration: none; font-size: 9pt;">${numberFormat(item.priceInUSD)}</span></strong></p></td>
                                                                </tr>
                                                            `)
                                                        }).join('')}
                                                        <tr style="height:17pt">
                                                            <td style="width:383pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt" colspan="3"><p style="color: black; font-family:Times New Roman, serif; font-style: normal; font-weight:bold; text-decoration: none; font-size: 9pt;padding-top: 2pt;padding-left: 163pt;padding-right: 162pt;text-indent: 0pt;text-align: center;"><strong><span style="color: black; font-family:Times New Roman, serif; font-style: normal; font-weight:bold; text-decoration: none; font-size: 9pt;">Total / عومجملا</span></strong></p></td>
                                                            <td style="width:74pt;border-top-style:solid;border-top-width:1pt;border-left-style:solid;border-left-width:1pt;border-bottom-style:solid;border-bottom-width:1pt;border-right-style:solid;border-right-width:1pt"><p style="color: black; font-family:Times New Roman, serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 8pt;padding-top: 3pt;padding-right: 3pt;text-indent: 0pt;text-align: right;"><strong><span style="color: black; font-family:Times New Roman, serif; font-style: normal; font-weight:bold; text-decoration: none; font-size: 9pt;">${numberFormat(totalPrice)}</span></strong></p></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td height="116" valign="bottom">
                                                    <p style="text-indent: 0pt;text-align: left;"><br/></p>
                                                    <p style="color: black; font-family:Times New Roman, serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 8pt;padding-left: 5pt;text-indent: 0pt;text-align: center;">وعسلا ةيبرعلا ةكلمملا - 4030123957 :ت.س - (012) 610 6195 :سكاف ،(012) 610 6194 ،(012) 610 6193 ،(012) 610 6192 :فتاه 21441 ةدج 1526 .ب.ص ،ريوكس ليمج ىنبم ،ةيلحتلا عراش :يسيئرلا زك</p>
                                                    <p style="color: black; font-family:Times New Roman, serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 8pt;padding-top: 2pt;padding-left: 5pt;text-indent: 0pt;text-align: center;">(012) 283 3125 فتاه ،ريوكس ليمج ،ةدج - (011) 293 4555 فتاه ،رتنس زانكأ ،ضايرلا - (013) 894 5747 فتاه ،لوم دشارلا ،ربخلا</p>
                                                    <p style="color: black; font-family:Times New Roman, serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 8pt;padding-top: 2pt;padding-left: 5pt;text-indent: 0pt;text-align: center;">Head Office: Tahlia Street, Jameel Square Bldg., Tel: (012) 610 6192, (012) 610 6193, (012) 610 6194, Fax: (012) 6106195, P.O. Box: 1526 Jeddah 21441, Kingdom of Saudi Arabia</p>
                                                    <p style="color: black; font-family:Times New Roman, serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 8pt;padding-top: 2pt;padding-left: 5pt;text-indent: 0pt;text-align: center;">Al Rashed Mall, Khobar Tel: (013) 894 5747, Aknaz Center, Riyadh Tel: (011) 293 4555, Jameel Square, Jeddah Tel: (012) 283 3125</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                `);
                            }).join('')}
                        </body>
                    </html>`;

    return htmlTemplate;
}
