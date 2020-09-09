import Path from 'path'
import config from '../../../config'
import * as file from '../utils/file'
import * as constant from './constant'
import { db } from '../utils/db'

const delimiter = '\\\\\\\\'

const getSources = async _ => {
    try {
        const query = await file.read(Path.resolve(constant.HIERARCHY_TREE_QUERY))
        const records = await db.exec(query, config.db)
        const jewelry = records.filter(element => element.type === 'Jewelry')
        const stone = records.filter(element => element.type === 'Stone')
        const watch = records.filter(element => element.type === 'Watch')
        const oba = records.filter(element => element.type === 'OBA')
        const accessory = records.filter(element => element.type === 'Accessories')
        const spare = records.filter(element => element.type === 'Spare')
        const hierarchy = {
            jewelry: {},
            stone: {},
            watch: {},
            oba: {},
            accessory: {},
            spare: {}
        }

        jewelry.forEach(record => {
            add(hierarchy.jewelry, record)
        })

        stone.forEach(record => {
            add(hierarchy.stone, record)
        })

        watch.forEach(record => {
            add(hierarchy.watch, record)
        })

        oba.forEach(record => {
            add(hierarchy.oba, record)
        })

        accessory.forEach(record => {
            add(hierarchy.accessory, record)
        })

        spare.forEach(record => {
            add(hierarchy.spare, record)
        })

        const destination = Path.resolve(__dirname, '../../../../mol/web/code/plugins/http/src/utils/treeview')

        Object.keys(hierarchy).forEach(async key => {
            await file.write(`${destination}/${key}.json`, JSON.stringify(hierarchy[key], null, 4))
        })
    } catch (err) {
        throw err
    }
}

const add = (node, data) => {
    if (Object.getOwnPropertyNames(node).length === 0) {
        merge(node, data)
    }

    if (node.code === data.parent.replace(/\\/g, delimiter)) {
        if (node.children === undefined) {
            node.children = []
        }

        node.children.push({
            id: data.id,
            label: data.name,
            code: data.path.replace(/\\/g, delimiter)
        })
    } else {
        node.children && node.children.forEach(child => {
            add(child, data)
        })
    }
}

const merge = (destination, source) => {
    destination.id = source.id
    destination.label = source.name
    destination.code = source.path.replace(/\\/g, delimiter)
    destination.children = []
}

export { getSources }
