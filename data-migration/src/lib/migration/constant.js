export const MAIN_DATABASE = 'ITORAMA';
export const ITEM_TABLE = '[ITORAMA].[dbo].[Items]';
export const ITEM_ID = '[Id]';
export const MOVEMENT_TABLE = '[ITORAMA].[dbo].[MovementActivities]';
export const MOVEMENT_ID = '[Id]';
export const GOC_TABLE = '[ITORAMA].[dbo].[GOC]';
export const GOC_ID = '[Id]';
export const SOLDITEM_TABLE = '[ITORAMA].[dbo].[SoldItems]';
export const SOLDITEM_ID = '[Id]';
export const CUSTOMER_TABLE = '[ITORAMA].[dbo].[Customers]';
export const CUSTOMER_ID = '[Id]';

// Exchange Rates
export const EXCHANGE_RATE_QUERY = './query/exchange_rate.sql';
export const ALL_EXCHANGE_RATE_QUERY = './query/all_exchange_rate.sql';

// Items
export const JEWELRY_QUERY = './query/jewelry.sql';
export const STONES_QUERY = './query/stones.sql';
export const WATCHES_QUERY = './query/watches.sql';
export const OBA_QUERY = './query/oba.sql';
export const ACCESSORY_QUERY = './query/accessory.sql';
export const SPARE_PARTS_QUERY = './query/spare_parts.sql';
export const SOLDITEM_QUERY = './query/sold_item.sql';
export const SOLDITEM_JEWELRY_QUERY = './query/sold_item_jewelry.sql';
export const SOLDITEM_STONES_QUERY = './query/sold_item_stone.sql';
export const SOLDITEM_WATCHES_QUERY = './query/sold_item_watch.sql';
export const SOLDITEM_OBA_QUERY = './query/sold_item_oba.sql';
export const SOLDITEM_ACCESSORY_QUERY = './query/sold_item_accessory.sql';
export const SOLDITEM_SPARE_PARTS_QUERY = './query/sold_item_spare_part.sql';

// Images
export const IMAGE_JEWELRY_QUERY = './query/jewelry_image.sql';
export const IMAGE_STONES_QUERY = './query/stones_image.sql';
export const IMAGE_WATCHES_QUERY = './query/watches_image.sql';
export const IMAGE_OBA_QUERY = './query/oba_image.sql';
export const IMAGE_ACCESSORY_QUERY = './query/accessory_image.sql';
export const IMAGE_SPARE_PARTS_QUERY = './query/spare_parts_image.sql';

export const SOLDITEM_IMAGE_JEWELRY_QUERY = './query/sold_item_jewelry_image.sql';
export const SOLDITEM_IMAGE_STONES_QUERY = './query/sold_item_stone_image.sql';
export const SOLDITEM_IMAGE_WATCHES_QUERY = './query/sold_item_watch_image.sql';
export const SOLDITEM_IMAGE_OBA_QUERY = './query/sold_item_oba_image.sql';
export const SOLDITEM_IMAGE_ACCESSORY_QUERY = './query/sold_item_accessory_image.sql';
export const SOLDITEM_IMAGE_SPARE_PARTS_QUERY = './query/sold_item_spare_part_image.sql';

// Master
export const COMPANY_QUERY = './query/master/company.sql';
export const LOCATION_QUERY = './query/master/location.sql';
export const WAREHOUSE_QUERY = './query/master/warehouse.sql';
export const COUNTRY_QUERY = './query/master/country.sql';
export const CUT_QUERY = './query/master/cut.sql';
export const CUTSHAP_QUERY = './query/master/cutShap.sql';
export const COLOR_QUERY = './query/master/color.sql';
export const CLARITY_QUERY = './query/master/clarity.sql';
export const SYMMETRY_QUERY = './query/master/symmetry.sql';
export const FLUORESCENCE_QUERY = './query/master/fluorescence.sql';
export const ORIGIN_QUERY = './query/master/origin.sql';
export const COLLECTION_QUERY = './query/master/collection.sql';
export const BRAND_QUERY = './query/master/brand.sql';
export const METALTYPE_QUERY = './query/master/metalType.sql';
export const METALCOLOR_QUERY = './query/master/metalColor.sql';
export const CERTIFICATEAGENCY_QUERY = './query/master/certificateAgency.sql';
export const DIALINDEX_QUERY = './query/master/dialIndex.sql';
export const DIALCOLOR_QUERY = './query/master/dialColor.sql';
export const DIALMETAL_QUERY = './query/master/dialMetal.sql';
export const BUCKLETYPE_QUERY = './query/master/buckleType.sql';
export const STRAPTYPE_QUERY = './query/master/strapType.sql';
export const STRAPCOLOR_QUERY = './query/master/strapColor.sql';
export const JEWELRYCATEGORY_QUERY = './query/master/jewelryCategory.sql';
export const WATCHCATEGORY_QUERY = './query/master/watchCategory.sql';
export const ACCESSORYTYPE_QUERY = './query/master/accessoryType.sql';
export const SPAREPARTTYPE_QUERY = './query/master/sparePartType.sql';
export const DOMINATSTONES_QUERY = './query/master/dominantStone.sql';
export const GEMSTONE_STONETYPE_QUERY = './query/master/gemstone-stoneType.sql';
export const STONETYPE_QUERY = './query/master/stoneCategory.sql';
export const HIERARCHY_QUERY = './query/master/hierarchy.sql';
export const ARTICLE_QUERY = './query/master/article.sql';
export const CUSTOMER_QUERY = './query/master/customer.sql';
export const SALECHANNEL_QUERY = './query/master/saleChannel.sql';
export const RINGSIZE_QUERY = './query/master/ringsize.sql';

// Sold Master
export const SOLD_BRAND_QUERY = './query/master/soldbrand.sql';
export const SOLD_BUCKLETYPE_QUERY = './query/master/soldbuckleType.sql';
export const SOLD_CERTIFICATEAGENCY_QUERY = './query/master/soldcertificateAgency.sql';
export const SOLD_CLARITY_QUERY = './query/master/soldclarity.sql';
export const SOLD_COLLECTION_QUERY = './query/master/soldcollection.sql';
export const SOLD_COLOR_QUERY = './query/master/soldcolor.sql';
export const SOLD_CUT_QUERY = './query/master/soldcut.sql';
export const SOLD_CUTSHAP_QUERY = './query/master/soldcutShap.sql';
export const SOLD_DIALMETAL_QUERY = './query/master/solddialMetal.sql';
export const SOLD_DIALCOLOR_QUERY = './query/master/solddialColor.sql';
export const SOLD_METALCOLOR_QUERY = './query/master/soldmetalColor.sql';
export const SOLD_METALTYPE_QUERY = './query/master/soldmetalType.sql';
export const SOLD_ORIGIN_QUERY = './query/master/soldorigin.sql';
export const SOLD_STRAPCOLOR_QUERY = './query/master/soldstrapColor.sql';
export const SOLD_STRAPTYPE_QUERY = './query/master/soldstrapType.sql';

// from array
export const CURRENCY_DATA = '../../../query/master/currency.js';
export const ROLE_DATA = '../../../query/master/role.js';
export const PRODUCTGROUP_DATA = '../../../query/master/productGroup.js';

// Hierarchy
export const HIERARCHY_TREE_QUERY = './query/hierarchy.sql';

// set
export const SET_QUERY = './query/set.sql';

// set sold
export const SET_SOLD_QUERY = './query/set_sold_item.sql';

// CertificateWarehouse
export const CERTIFICATE_QUERY = './query/certificate.sql';
export const SOLDITEM_CERTIFICATE_QUERY = './query/sold_item_certificate.sql';

// Stone Lot Number
export const STONESLOT_QUERY = './query/lot.sql';

// Movement Activities
export const MOVEMENT_QUERY = './query/activity.sql';

// GOC
export const GOC_QUERY = './query/goc.sql';
