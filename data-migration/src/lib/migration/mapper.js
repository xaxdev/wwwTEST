import config from '../../../config';

const gemstones = ['gemstone_id', 'gemstone_cut', 'gemstone_color', 'gemstone_clarity', 'gemstone_cost', 'gemstone_carat', 'gemstone_quantity', 'gemstone_origin', 'gemstone_symmetry', 'gemstone_fluorescence'];

const mapProperties = (item, record) => {
    // add gemstone, if not existed
    if (item.gemstones.findIndex(gemstone => gemstone.id === record.gemstone_id) === -1) {
        const gemstone = {};

        gemstones.forEach(property => {
            if (record[property] !== undefined) {
                const match = property.match(/^gemstone_(\w+)$/);
                if (match) {
                    const value = record[property];
                    gemstone[match[1]] = value;
                    delete item[property];
                }
            }
        });

        if (record.certificate_number !== undefined && record.certificate_number.length > 0) {
            gemstone.certificate = {};

            gemstone.certificate.number = record.certificate_number;

            if (record.certificate_agency !== undefined) {
                gemstone.certificate.agency = record.certificate_agency;
            }
        }

        if (item.certificate_number !== undefined) {
            delete item.certificate_number;
        }

        // Check if gemstone is an empty object
        if (Object.keys(gemstone).length > 0) {
            item.gemstones.push(gemstone);
        }
    }

    // add image, if not existed
    if (record.image.length > 0 && item.gallery.findIndex(image => image.original.match(new RegExp(`${record.image}$`)) !== null) === -1) {
        const image = {
            original: `${config.gallery.original}/${record.image}`,
            thumbnail: `${config.gallery.thumbnail}/${record.image}`
        };

        delete item.image;
        item.gallery.push(image);
    }
};

const mapItem = recordset => {
    const items = [];
    let id = 0;

    for (let record of recordset) {
        if (id != record.id) {
            id = Number(record.id);
            const item = {...record};
            item.gemstones = [];
            item.gallery = [];
            items.push(item);
        }

        const latest = items[items.length - 1];
        mapProperties(latest, record);
    }

    return items;
};

const mapMaster = recordset => {
    const records = [];
    let id = 0;

    for (let record of recordset) {
      id++;
      const row = {
        ...record,
        id
      };
      records.push(row);
    }

    return records;
};

export { mapItem, mapMaster };
