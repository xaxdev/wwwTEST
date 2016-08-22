import Path from 'path'
import config from '../../../config'
import * as file from '../utils/file'
import * as constant from './constant'
import { db } from '../utils/db'
import { es } from '../utils/es';

const getitemSets = async (index, exchangeRates) => {
    try {
        console.log('Set!!!');
        const query = await file.read(Path.resolve(constant.SET_QUERY))
        const records = await db.exec(query, config.db)
        const itemSets = [];
        let reference = '';
        for (let record of records) {
            if (record.setReference !== reference) {
                reference = record.setReference
                const itemSet = {
                    reference: record.setReference,
                    items: [],
                    totalPrice: {}
                }

                if (!!record.setImageName && !!record.setImageType) {
                    itemSet.image = {
                        original: `${config.gallery.original}/${record.setImageName}.${record.setImageType}`,
                        thumbnail: `${config.gallery.thumbnail}/${record.setImageName}.${record.setImageType}`
                    }
                }

                itemSets.push(itemSet)
            }

            const current = itemSets[itemSets.length - 1]
            const item = {
                id: record.id,
                reference: record.reference,
                image: {
                    original: `${config.gallery.original}/${record.imageName}.${record.imageType}`,
                    thumbnail: `${config.gallery.thumbnail}/${record.imageName}.${record.imageType}`
                },
                price: {}
            }

            const exchangeRateFromUSDToHomeCurrency = exchangeRates.filter(exchangeRate => exchangeRate.from === 'USD' && exchangeRate.to === record.currency)[0];
            const rates = exchangeRates.filter(exchangeRate => exchangeRate.from === record.currency);

            // price in other currencies
            for (let rate of rates) {
                item.price[rate.to] = record.price * rate.exchangeRate / 100;
                current.totalPrice[rate.to] = (current.totalPrice[rate.to] || 0) + item.price[rate.to]
            }

            // price in USD
            if (!!exchangeRateFromUSDToHomeCurrency) {
                item.price.USD = record.price * 100 / exchangeRateFromUSDToHomeCurrency.exchangeRate
                current.totalPrice.USD = (current.totalPrice.USD || 0) + item.price.USD
            }

            // price in home currency
            item.price[record.currency] = record.price;
            current.totalPrice[record.currency] = (current.totalPrice[record.currency] || 0) + item.price[record.currency]

            current.items.push(item)
        }

        await es.upload(itemSets, {...config.elasticsearch, index, type: 'setitems' })
    } catch (err) {
        throw err
    }
}

export { getitemSets }
