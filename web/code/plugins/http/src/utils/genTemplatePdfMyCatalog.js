export default function GenTemplateHtml(ROOT_URL, imagesReplace, dv){

    let dvTotalItems = dv.dvTotalItems;
    let dvTotalSetItems = dv.dvTotalSetItems;
    let dvGridview = dv.dvGridview;

    let styleTotal =`background-color: #dddddd;float: left;width: 100%;padding: 10px 0px;text-align: center; font-family: '${'Open Sans'}', sans-serif; font-size:10px;border-bottom: 1px solid #fff;`;
    let styleBodyWrapper ='margin: 0;padding: 0;';
    let styleContainerMarginb4 ='margin-bottom: 0%;padding-right: 15px;padding-left: 15px;margin-right: auto;margin-left: auto;';
    let styleColsm12 ='width: 100%;';
    let stylePanel ='border-radius: 0;margin-bottom: 0 !important;border: 0;box-shadow: none;';

    let stylePadding ='padding: 15px 0;';
    let styleSearchproduct  ='position: relative;';
    let styleSearchproductGride  ='text-align: center;font-size: 10px;position: relative;z-index: 2;padding: 15px 11px 0 11px;height: 380px;cursor: pointer;';
    let colmd3colsm3nopadding  = 'width: 25%;padding: 0;float: left;height: 380px;';
    let pullRight  = 'float: right!important;';
    let gridAdd  = 'float: left;margin-top: 0;z-index: 1;position: relative;cursor: pointer;';
    let iconAdd28  = `background: url(${ROOT_URL}/images/icon-add-28.png) no-repeat center;width: 28px;height: 28px;float: left;cursor: pointer;`;
    let checkbox  = 'padding-left: 10px;padding-right: 10px;margin-top: 2px;float: left;z-index: 1;position: relative;cursor: pointer;margin-bottom: 10px;';
    let checkbox1  = 'margin: 0 14px 0 10px;';
    let quickView  = 'margin-right: 0px;max-width: 23px;position: absolute;right: 0px;';
    let fontbfc000  = `font-family: '${'open_sanssemibold'}';color: #000;margin: 0 0 10px;`;
    let productdetailh = 'height: 85px;overflow: hidden;word-wrap: break-word;margin: 0 0 10px;';
    let stylePrice = 'color: #ae8f3b; font-weight: bold;';
    let thumbnaillgrid = 'margin: 0 auto; height: 200px; overflow: hidden;';
    let thumbnaillgridimg = 'position: absolute; left: 50%; top: 50%; height: auto; width: auto; padding-bottom: 20px; transform: translate(-50%,-50%);';

    dvTotalItems = dvTotalItems.replace(/class="font-b fc-000"/g,'style="font-weight: bold; color: #000;"');
    dvTotalItems = dvTotalItems.replace(/class="padding-lf15"/g,'style="padding: 0 5px;"');
    dvTotalSetItems = dvTotalSetItems.replace(/class="font-b fc-000"/g,'style="font-weight: bold; color: #000;"');
    dvTotalSetItems = dvTotalSetItems.replace(/class="padding-lf15"/g,'style="padding: 0 5px;"');

    dvGridview = dvGridview.replace(/class="searchresult-prodcut "/g,`style="${styleSearchproductGride}"`);
    // dvGridview = dvGridview.replace(/\/images\//g,imagesReplace);
    dvGridview = dvGridview.replace(/\/images\//g,'file:///var/www/mol/web/code/plugins/http/public/images/');
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
    dvGridview = dvGridview.replace(/<img/g,'<img style="width:120px" ');
    dvGridview = dvGridview.replace(/\/original\//g,'/thumbnail/');

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
                                                          ${dvGridview}
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
