const gemstones = ['gemstone_cut', 'gemstone_color', 'gemstone_clarity', 'gemstone_cost', 'gemstone_carat', 'gemstone_quantity', 'gemstone_origin', 'gemstone_symmetry', 'gemstone_fluorescence'];

const mapGemstone = (item, record) => {
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

    item.gemstones.push(gemstone);
};

const mapItem = recordset => {
    const items = [];
    let id = 0;

    for (let record of recordset) {
        if (id != record.id) {
            id = Number(record.id);
            const item = {...record};
            item.gemstones = [];
            items.push(item);
        }

        const latest = items[items.length - 1];
        mapGemstone(latest, record);
    }

    return items;
};

const mapMaster = recordset => {
    const records = [];
    let id = 0;

    for (let record of recordset) {
      id++;
      const row = {...record};
      row.id = id;
      records.push(row);
    }

    return records;
};

export { mapItem, mapMaster };
