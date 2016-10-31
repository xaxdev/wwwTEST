import { Client } from 'elasticsearch'
import config from './config'

(async _ => {
    const enviroment = process.argv[2] || 'development'
    const client = new Client(config.elasticsearch[enviroment])
    try {
        const indices = await client.indices.get({ index: 'mol*', allowNoIndices: true })
        const keys = Object.keys(indices)
        const target = keys.filter(key => !indices[key].aliases.mol)
        if (!!target.length) {
            await client.indices.delete({ index: target })
            console.log('succeeded!!')
            return
        }
        console.log('no indices to delete');
    } catch (e) {
        console.log(e)
    }
})()
