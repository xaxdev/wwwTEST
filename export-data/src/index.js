'use strict';
import * as process from './process';

import config from '../config';

const amqp = require('amqplib/callback_api');

const init = async _ => {
  try {
    amqp.connect(config.rabbit.url, function(err, conn) {
      conn.createChannel(function(err, ch) {
        let q = 'excel';

        ch.assertQueue(q, {durable: false});

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function(msg) {
          process.search(msg);
        }, {noAck: true});
      });
    });
  } catch (err) {
      console.log('err-->',err);
      throw err
  }
}

init()
      .then(_ => {
          console.log('Export data start');
      })
      .catch(err => {
          console.log(err);
      });

// const es = {
//   "hits": {
//     "hits": [
//       {
//         "_source": {
//           "reference": "VY4000003",
//           "site": "MME.AT",
//           "price": {
//             "CHF": 4107.6,
//             "AED": 15750,
//             "EUR": 3764.25,
//             "QAR": 15624,
//             "OMR": 1652.175,
//             "SAR": 16093.35,
//             "USD": 4291.553133514986,
//             "KWD": 1233.225,
//             "LBP": 6562500.525,
//             "JOD": 3039.75
//           },
//           "description": "Gents Ring  Platinum  White Diamonds",
//           "currency": "AED",
//           "updatedCost": {
//             "CHF": 1865.348528,
//             "AED": 7152.41,
//             "EUR": 1709.42599,
//             "QAR": 7095.1907200000005,
//             "OMR": 750.2878089999999,
//             "SAR": 7308.332538000001,
//             "USD": 1948.8855585831063,
//             "KWD": 560.0337030000001,
//             "LBP": 2980171.0717469994,
//             "JOD": 1380.41513
//           },
//           "id": "5637193935",
//           "warehouse": "UAE.JSA1",
//           "actualCost": {
//             "CHF": 1861.689504,
//             "AED": 7138.38,
//             "EUR": 1706.07282,
//             "QAR": 7081.272959999999,
//             "OMR": 748.8160620000001,
//             "SAR": 7293.996684000001,
//             "USD": 1945.0626702997274,
//             "KWD": 558.935154,
//             "LBP": 2974325.237946,
//             "JOD": 1377.70734
//           }
//         }
//       },
//       {
//         "_source": {
//           "reference": "VY4000002",
//           "site": "MME.AT",
//           "price": {
//             "CHF": 691.12,
//             "AED": 2650,
//             "EUR": 633.3499999999999,
//             "QAR": 2628.8,
//             "OMR": 277.985,
//             "SAR": 2707.77,
//             "USD": 722.0708446866485,
//             "KWD": 207.495,
//             "LBP": 1104166.755,
//             "JOD": 511.45
//           },
//           "description": "Gents Ring  Sterling Silver  Blue Sapphire",
//           "currency": "AED",
//           "updatedCost": {
//             "CHF": 206.09980799999997,
//             "AED": 790.26,
//             "EUR": 188.87214,
//             "QAR": 783.93792,
//             "OMR": 82.898274,
//             "SAR": 807.487668,
//             "USD": 215.32970027247956,
//             "KWD": 61.877358,
//             "LBP": 329275.026342,
//             "JOD": 152.52018
//           },
//           "id": "5637193936",
//           "warehouse": "UAE.JSA1",
//           "actualCost": {
//             "CHF": 205.935504,
//             "AED": 789.63,
//             "EUR": 188.72156999999999,
//             "QAR": 783.31296,
//             "OMR": 82.83218699999999,
//             "SAR": 806.843934,
//             "USD": 215.15803814713897,
//             "KWD": 61.828028999999994,
//             "LBP": 329012.52632099995,
//             "JOD": 152.39859
//           }
//         }
//       },
//       {
//         "_source": {
//           "reference": "VY102082",
//           "site": "MME.AT",
//           "price": {
//             "CHF": 2373.2799999999997,
//             "AED": 9100,
//             "EUR": 2174.9,
//             "QAR": 9027.2,
//             "OMR": 954.59,
//             "SAR": 9298.380000000001,
//             "USD": 2479.5640326975476,
//             "KWD": 712.53,
//             "LBP": 3791666.97,
//             "JOD": 1756.3
//           },
//           "description": "Gent's Ring  18k White Gold  Semi Precious",
//           "currency": "AED",
//           "updatedCost": {
//             "CHF": 587.29552,
//             "AED": 2251.9,
//             "EUR": 538.2040999999999,
//             "QAR": 2233.8848000000003,
//             "OMR": 236.22431,
//             "SAR": 2300.9914200000003,
//             "USD": 613.5967302452316,
//             "KWD": 176.32377,
//             "LBP": 938291.7417299999,
//             "JOD": 434.61670000000004
//           },
//           "id": "5637193937",
//           "warehouse": "MME.TRAN",
//           "actualCost": {
//             "CHF": 617.738704,
//             "AED": 2368.63,
//             "EUR": 566.10257,
//             "QAR": 2349.68096,
//             "OMR": 248.469287,
//             "SAR": 2420.2661340000004,
//             "USD": 645.4032697547684,
//             "KWD": 185.46372900000003,
//             "LBP": 986929.245621,
//             "JOD": 457.14559
//           }
//         }
//       },
//       {
//         "_source": {
//           "reference": "VV1C002290",
//           "site": "MME.AT",
//           "price": {
//             "CHF": 1303.9999999999998,
//             "AED": 5000,
//             "EUR": 1195,
//             "QAR": 4960,
//             "OMR": 524.5,
//             "SAR": 5109.000000000001,
//             "USD": 1362.3978201634877,
//             "KWD": 391.5,
//             "LBP": 2083333.5,
//             "JOD": 965
//           },
//           "description": "Gent's Ring  Bicolor",
//           "currency": "AED",
//           "updatedCost": {
//             "CHF": 319.60779199999996,
//             "AED": 1225.49,
//             "EUR": 292.89211,
//             "QAR": 1215.6860800000002,
//             "OMR": 128.553901,
//             "SAR": 1252.205682,
//             "USD": 333.9209809264305,
//             "KWD": 95.955867,
//             "LBP": 510620.87418299995,
//             "JOD": 236.51957000000002
//           },
//           "id": "5637193942",
//           "warehouse": "MBC.MEL",
//           "actualCost": {
//             "CHF": 335.97299200000003,
//             "AED": 1288.24,
//             "EUR": 307.88935999999995,
//             "QAR": 1277.93408,
//             "OMR": 135.136376,
//             "SAR": 1316.3236320000003,
//             "USD": 351.0190735694823,
//             "KWD": 100.869192,
//             "LBP": 536766.709608,
//             "JOD": 248.63032000000004
//           }
//         }
//       },
//       {
//         "_source": {
//           "reference": "VV1C000521",
//           "site": "MME.AT",
//           "price": {
//             "CHF": 1942.96,
//             "AED": 7450,
//             "EUR": 1780.55,
//             "QAR": 7390.4,
//             "OMR": 781.505,
//             "SAR": 7612.41,
//             "USD": 2029.9727520435968,
//             "KWD": 583.335,
//             "LBP": 3104166.915,
//             "JOD": 1437.85
//           },
//           "description": "Gemsone Classic 18k White Gold  Sapphire",
//           "currency": "AED",
//           "updatedCost": {
//             "CHF": 480.94910400000003,
//             "AED": 1844.13,
//             "EUR": 440.74707,
//             "QAR": 1829.3769600000003,
//             "OMR": 193.44923700000004,
//             "SAR": 1884.3320340000002,
//             "USD": 502.48773841961855,
//             "KWD": 144.39537900000002,
//             "LBP": 768387.561471,
//             "JOD": 355.91709000000003
//           },
//           "id": "5637193957",
//           "warehouse": "SIN.FH1",
//           "actualCost": {
//             "CHF": 504.72363199999995,
//             "AED": 1935.29,
//             "EUR": 462.53430999999995,
//             "QAR": 1919.8076800000001,
//             "OMR": 203.011921,
//             "SAR": 1977.4793220000001,
//             "USD": 527.3269754768393,
//             "KWD": 151.533207,
//             "LBP": 806370.897843,
//             "JOD": 373.51097000000004
//           }
//         }
//       }
//     ]
//   }
// }
//
// const items = [
//   {
//     "id": "5637251941",
//     "reference": "B4000652",
//     "description": "Bracelet  18K White-Yellow Gold  White Diamond & Sapphire(5GRS)"
//   },
//   {
//     "id": "5637229967",
//     "reference": "R1013994",
//     "description": "Ring Steel  Turquoise Satinated (Trebor Carina)"
//   },
//   {
//     "id": "5637193957",
//     "reference": "VV1C000521",
//     "description": "Gemsone Classic 18k White Gold  Sapphire"
//   }
// ]
//
// const user = {
//   "permission": {
//     "onhandLocation": {
//       "id": 268,
//       "type": "All",
//       "places": [
//         "MME.AT"
//       ]
//     },
//     "onhandWarehouse": {
//       "id": 221,
//       "type": "All",
//       "places": [
//         "MBC.MEL"
//       ]
//     },
//     "id": 1,
//     "productGroup": 63,
//     "price": "All"
//   },
//   "id": 1,
//   "firstName": "Jittawe",
//   "lastName": "Tandhanand",
//   "email": "jittawe@itorama.com",
//   "username": "jt",
//   "currency": "USD",
//   "role": "Admin",
//   "status": true,
//   "company": "MBS",
//   "location": "MBS-APS",
//   "warehouse": "MBS.APPR",
//   "webOnly": true,
//   "device": "127.0.0.1",
//   "scope": [
//     "admin"
//   ]
// }
//
// const source = x => x._source
//
// const get = es => item => {
//   const oh = es.map(source).find(d => Number(d.id) === Number(item.id))
//   return { ...item, ...oh, availability: !!oh }
// }
//
// const compose = (...fs) => x => fs.reduce((p, f) => f(p), x)
//
// const inStock = x => x.map(get(es.hits.hits))
//
// const authorize = u => {
//   const sites = u.permission.onhandLocation.places
//   const warehouses = u.permission.onhandWarehouse.places
//
//   return x => x.map(item => {
//     const authorization = ((sites.length === 0 || (item.site && sites.indexOf(item.site) !== -1))
//       && (warehouses.length === 0 || (item.warehouse && warehouses.indexOf(item.warehouse) !== -1))) || false
//     return { ...item, authorization }
//   })
// }
//
// const prepare = compose(inStock, authorize(user))
//
// const data = prepare(items)
// console.log('Hello')
