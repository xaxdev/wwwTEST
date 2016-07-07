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

        // Check if gemstone is an empty object
        if (Object.keys(gemstone).length > 0) {
            item.gemstones.push(gemstone);
        }
    }

    // add image, if not existed
    if (record.imageName.length > 0 && item.gallery.findIndex(image => image.original.match(new RegExp(`${record.imageName}.${record.imageType}$`)) !== null) === -1) {
        const image = {
            original: `${config.gallery.original}/${record.company}/${record.imageName}.${record.imageType}`,
            thumbnail: `${config.gallery.thumbnail}/${record.company}/${record.imageName}.${record.imageType}`
        };

        item.gallery.push(image);
    }

    // add certificate, if not existed
    if (record.CertificateNo.length > 0 && item.certificates.findIndex(certificate => certificate.number === record.CertificateNo) === -1) {
        const certificate = {
            number: record.CertificateNo,
            agency: record.CertificateAgency,
            site: record.CertificateWarehouse,
            image: {
                original: `${config.gallery.original}/${record.company}/${record.CertificateImageName}.${record.CertificateImageType}`,
                thumbnail: `${config.gallery.thumbnail}/${record.company}/${record.CertificateImageName}.${record.CertificateImageType}`
            }
        };

        item.certificates.push(certificate);
    }

    if (item.imageName !== undefined) {
      delete item.imageName;
    }

    if (item.imageType !== undefined) {
      delete item.imageType
    }

    if (item.CertificateNo !== undefined) {
        delete item.CertificateNo;
    }

    if (item.CertificateAgency !== undefined) {
        delete item.CertificateAgency;
    }

    if (item.CertificateWarehouse !== undefined) {
        delete item.CertificateWarehouse;
    }

    if (item.CertificateImageName !== undefined) {
        delete item.CertificateImageName;
    }

    if (item.CertificateImageType !== undefined) {
        delete item.CertificateImageType;
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
            item.certificates = [];
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
