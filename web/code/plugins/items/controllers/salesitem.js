const Boom = require('boom');
import Elasticsearch from 'elasticsearch'
const Promise = require('bluebird');
const GetMovement = require('../utils/getMovement');
const GetGOC = require('../utils/getGOC');

const internals = {
    filters: []
};

module.exports = {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {
        // const elastic = new Elasticsearch.Client({
        //     host: request.elasticsearch.host,
        //     keepAlive: false
        // });
        // const id = request.params.id;
        // internals.query = JSON.parse(
        //     `{
        //       "query":
        //         {
        //          "match": {"id": "${id}"}
        //         }
        //     }`
        // );
        // const getProductDetail =  elastic.search({
        //     index: 'mol_solditems',
        //     type: 'solditems',
        //     body: internals.query
        // });
        // const getSetreference = getProductDetail.then((response) => {
        //     try {
        //         const [productResult] = response.hits.hits.map((element) => element._source);
        //         if (!productResult) {
        //             return reply(Boom.badRequest('Couldn\'t found data of item:' + id));
        //         }
        //         const query = JSON.parse(
        //             `{
        //               "query":{
        //                    "constant_score": {
        //                      "filter": {
        //                        "bool": {
        //                          "must": [
        //                            {
        //                              "match": {
        //                                "reference": "${productResult.setReference}"
        //                              }
        //                            }
        //                          ]
        //                        }
        //                      }
        //                    }
        //                 }
        //               }`
        //         );
        //
        //         return elastic.search({
        //             index: 'mol_solditems',
        //             type: 'solditems',
        //             body: query
        //         });
        //     } catch (err) {
        //         console.log(err);
        //         return reply(Boom.badImplementation(err));
        //     }
        // });
        //
        // const getMovements = getProductDetail.then((response) => {
        //     try {
        //         const [productResult] = response.hits.hits.map((element) => element._source);
        //         if (!productResult) {
        //             return reply(Boom.badRequest('Couldn\'t found data of item:' + id));
        //         }
        //         const query =  GetMovement(productResult.reference,productResult.sku);
        //
        //         return elastic.search({
        //             index: 'mol_solditems',
        //             type: 'activities',
        //             body: query
        //         });
        //     } catch (err) {
        //         console.log(err);
        //         return reply(Boom.badImplementation(err));
        //     }
        // });
        //
        // const getGOCs = getProductDetail.then((response) => {
        //     try {
        //         const [productResult] = response.hits.hits.map((element) => element._source);
        //         if (!productResult) {
        //             return reply(Boom.badRequest('Couldn\'t found data of item:' + id));
        //         }
        //         const query =  GetGOC(productResult.reference,productResult.sku);
        //
        //         return elastic.search({
        //             index: 'mol_solditems',
        //             type: 'activities',
        //             body: query
        //         });
        //     } catch (err) {
        //         console.log(err);
        //         return reply(Boom.badImplementation(err));
        //     }
        // });
        // try {
        //     Promise.all([getProductDetail, getSetreference, getMovements, getGOCs]).spread((productDetail, setReference, movements, gocs) => {
        //         const [productResult] = productDetail.hits.hits.map((element) => element._source);
        //         // add certificate images to item gallery
        //         if (!!productResult.gemstones) {
        //             let certificateImages = productResult.gemstones.reduce((certificateImages, gemstone) => (gemstone.certificate && gemstone.certificate.images)? certificateImages.concat(gemstone.certificate.images) : certificateImages, [])
        //
        //             //change path original image of certificate by korakod
        //             certificateImages = certificateImages.map((images) => {
        //                                     let { original, thumbnail } = images;
        //                                     original = original.replace('/images/products/original','/original');
        //                                     thumbnail = thumbnail.replace('/images/products/thumbnail','/original');
        //                                     return {...images, original, thumbnail};
        //                                 });
        //             productResult.gallery.push(...certificateImages)
        //         }
        //
        //         const [setReferenceData] = setReference.hits.hits.map((element) => element._source);
        //         if(typeof setReferenceData === 'undefined'){
        //             productResult.setReferenceData = '';
        //         } else {
        //             let len = setReferenceData.items.length;
        //
        //             let productdata = [];
        //             for (let i = 0; i < len; i++) {
        //                if(productResult.id !== setReferenceData.items[i].id){
        //                   productdata.push({
        //                       id: setReferenceData.items[i].id,
        //                       image:setReferenceData.items[i].image
        //                   });
        //                }
        //             }
        //             const responseSetData = {
        //               totalprice:setReferenceData.totalPrice,
        //               setimage: (!!setReferenceData.image)
        //                         ? setReferenceData.image.length != 0
        //                             ?setReferenceData.image[0].original
        //                             : null
        //                         : null,
        //               products:productdata
        //             }
        //             productResult.setReferenceData = responseSetData;
        //         }
        //         let movement = movements.hits.hits.map((element) => element._source);
        //         // console.log(movement);
        //         movement = movement.filter((item) => {
        //             return item.physicalInvent != 1;
        //         })
        //         const goc = gocs.hits.hits.map((element) => element._source);
        //         const activities = {
        //             movement: movement,
        //             goc: goc
        //         };
        //
        //         productResult.activities = activities;
        //
        //         elastic.close();
        //         return reply(JSON.stringify(productResult, null, 4));
        //     })
        //     .catch(function(err) {
        //         elastic.close();
        //         console.log(err);
        //         return reply(Boom.badImplementation(err));
        //     });
        //
        //     return reply(salesProductResult);
        //
        // } catch (err) {
        //     elastic.close();
        //     return reply(Boom.badImplementation(err));
        // }
        let salesProductResult = {}
        salesProductResult = [
            ...salesProductResult,
            {
                'activities': {
                    'movement': [
                        {
                            'company' : "mme",
                            'fromWareHouse' : "MBC.FAC1",
                            'fromWarehouseName' : "Mouawad Bangkok Merchandising Location",
                            'id' : "75108",
                            'physicalInvent' : 0,
                            'reference' : "1000019652",
                            'sku' : "CUS187G34",
                            'timeFrom':"2017-06-23T02:37:11.000Z",
                            'timeTo':"2017-07-05T07:01:47.000Z",
                            'toWareHouse':"MGT.HO1",
                            'toWareHouseName':"Central Safe , Head Office",
                            'type':"mov"
                        },
                        {
                            'company':"mat",
                            'fromWareHouse':"MGT.HO1",
                            'fromWarehouseName':"Central Safe , Head Office",
                            'id':"75109",
                            'physicalInvent':0,
                            'reference':"1000019652",
                            'sku':"CUS187G34",
                            'timeFrom':"2017-07-05T07:01:47.000Z",
                            'timeTo':"2017-07-05T11:50:47.000Z",
                            'toWareHouse':"SAU.AM1",
                            'toWareHouseName':"Alrashid Mall",
                            'type':"mov",
                        }
                    ],
                    'goc': []
                },
                'actualCost':{
                    'CHF' : 669.6575600000001,
                    'JOD' : 495.42064,
                    'KWD' : 200.73982500000002,
                    'OMR' : 269.22753,
                    'QAR' : 2547.42774,
                    'SAR' : 2624.05,
                    'USD' : 699.7466666666667
                },
                'brand' : "Mouawad",
                'brandName' : "Mouawad",
                'certificates' : [],
                'collection' : "GRANDEELLIPSEACCESS",
                'collectionName' : "Grande Ellipse Accessories",
                'company' : "MME",
                'companyName' : "Mouawad MENA DMCC",
                'currency' : "SAR",
                'description' : "Prayer Beads, Silver 925, Red Agate",
                'dominant' : "AGA",
                'dominantStoneName' : "Agate",
                'filesMonograph' : [],
                'gallery' : [
                    {
                        'conpany' : "mat",
                        'original' : "/images/products/original/1435673 Customer_MME-081847.jpg",
                        'thumbnail' : "/images/products/thumbnail/1435673 Customer_MME-081847.jpg"
                    }
                ],
                'grossWeight' : 67.151,
                'hierarchy' : "Mouawad Inventory\\Merchandise\\Jewelry\\Customer SKU",
                'id' : "5637954656",
                'imageCompany' : "mat",
                'imageTypeId' : "Image",
                'imagesCOA' : [],
                'imagesDBC' : [],
                'itemCreatedDate' : "2017-06-23T00:00:00.000Z",
                'markup' : 4,
                'metalColor' : "WHITE",
                'metalColorName' : "White",
                'metalType' : "SILVER",
                'metalTypeName' : "Silver",
                'mustHave' : 0,
                'name' : "Prayer Beads, Silver 925, Red Agate",
                'netWeight' : 14.687,
                'price':{
                    'CHF' : 2684.9592,
                    'JOD' : 1986.3647999999998,
                    'KWD' : 804.8565000000001,
                    'OMR' : 1079.4546,
                    'QAR' : 10213.7868,
                    'SAR' : 10521,
                    'USD' : 2805.6
                },
                'priority' : 0,
                'quantity' : 1,
                'reference' : "1000019652",
                'setReference' : "",
                'setReferenceData' : "",
                'site' : "MME-CNS",
                'siteName' : "MME Consignment Site",
                'size' : "",
                'sku' : "CUS187G34",
                'stoneDetail' : "AGA - 35Pcs 262.320Ct",
                'subType' : "PRBD",
                'subTypeName' : "Prayer Beads",
                'type' : "JLY",
                'unit' : "Pcs",
                'updatedCost' : {
                    'CHF':669.6575600000001,
                    'JOD':495.42064,
                    'KWD':200.73982500000002,
                    'OMR':269.22753,
                    'QAR':2547.42774,
                    'SAR':2624.05,
                    'USD':699.7466666666667
                },
                'venderReference':"1435673",
                'vendor':"",
                'vendorName':"",
                'warehouse':"MME.CONS",
                'warehouseName':"MME Consigment Warehouse",
                'netAmount':{
                    'CHF':669.6575600000001,
                    'JOD':495.42064,
                    'KWD':200.73982500000002,
                    'OMR':269.22753,
                    'QAR':2547.42774,
                    'SAR':2624.05,
                    'USD':699.7466666666667
                },
                'marginPercent':5,
                'margin':{
                    'CHF':669.6575600000001,
                    'JOD':495.42064,
                    'KWD':200.73982500000002,
                    'OMR':269.22753,
                    'QAR':2547.42774,
                    'SAR':2624.05,
                    'USD':699.7466666666667
                },
                'discPercent':0,
                'discountAmountUSD':77.92,
                'postedDate': "2015-10-04T13:56:24.000Z",
                'salesChannelType': "RETAIL",
                'customer': "CUS0001327",
                'customerName': "ABDULLAH  ALBALUSHI",
                'invoicedId': "MMU-SI0000012",
                'invoiceDate': "2015-10-03T00:00:00.000Z",
                'salesPersonName': "Marilou Cabales"
            }
        ]
        return reply(JSON.stringify(salesProductResult, null, 4));
    }
};
