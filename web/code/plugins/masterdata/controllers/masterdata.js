const Boom = require('boom');
const _ = require('lodash');

const internals = {
    filters: []
};

module.exports = {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {
        const elastic = request.server.plugins.elastic.client;
        internals.query = JSON.parse(
            `{
             "size": 5000,
            "query": {
                    "match_all" : {}
                }
            }`
        );
        let type = `roles,currencies,companies,locations,warehouses,countries,productGroups,stoneType,
        gemstoneStoneType,cut,cutShape,cutGrades,colors,colorGrades,clarities,certificateLabs,polishs,
        symmetries,treatments,fluorescences,origins,jewelryCategories,collections,brands,ringSizes,dominantStones,
        metalTypes,metalColours,certificateAgencys,watchCategories,movements,dialIndexs,dialColors,dialMetals,
        buckleTypes,strapTypes,strapColors,complications,hierarchy,accessoryTypes,sparePartTypes,articles`;

        const alldata = elastic.search({
            index: 'mol',
            type: type,
            body:internals.query
        });

        Promise.all([alldata]).then(function([alldata]) {
            const rolesget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'roles';
            }})
            const currenciesget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'currencies';
            }})
            const companiesget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'companies';
            }})
            const locationsget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'locations';
            }})
            const warehousesget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'warehouses';
            }})
            const countriesget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'countries';
            }})
            const productGroupsget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'productGroups';
            }})
            const stoneTypeget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'stoneType';
            }})
            const gemstoneStoneTypeget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'gemstoneStoneType';
            }})
            const cutShapeget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'cutShape';
            }})
            const cutget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'cut';
            }})
            const cutGradesget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'cutGrades';
            }})
            const colorsget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'colors';
            }})
            const colorGradesget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'colorGrades';
            }})
            const claritiesget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'clarities';
            }})
            const certificateLabsget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'certificateLabs';
            }})
            const polishsget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'polishs';
            }})
            const symmetriesget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'symmetries';
            }})
            const treatmentsget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'treatments';
            }})
            const fluorescencesget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'fluorescences';
            }})
            const originsget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'origins';
            }})
            const jewelryCategoriesget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'jewelryCategories';
            }})
            const collectionsget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'collections';
            }})
            const brandsget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'brands';
            }})
            const ringSizesget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'ringSizes';
            }})
            const dominantStonesget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'dominantStones';
            }})
            const metalTypesget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'metalTypes';
            }})
            const metalColoursget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'metalColours';
            }})
            const certificateAgencysget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'certificateAgencys';
            }})
            const watchCategoriesget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'watchCategories';
            }})
            const movementsget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'movements';
            }})
            const dialIndexsget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'dialIndexs';
            }})
            const dialColorsget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'dialColors';
            }})
            const dialMetalsget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'dialMetals';
            }})
            const buckleTypesget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'buckleTypes';
            }})
            const strapTypesget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'strapTypes';
            }})
            const strapColorsget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'strapColors';
            }})
            const complicationsget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'complications';
            }})
            const hierarchyget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'hierarchy';
            }})
            const accessoryTypesget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'accessoryTypes';
            }})
            const sparePartTypesget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'sparePartTypes';
            }})
            const articlesTypesget = alldata.hits.hits.filter((element)=> {{
                return element._type == 'articles';
            }})

            const responsesata = {
                roles: _.sortBy(rolesget.map((element)=> element._source),'name'),
                currencies: _.sortBy(currenciesget.map((element)=> element._source),'name'),
                companies: _.sortBy(companiesget.map((element)=> element._source),'name'),
                locations: _.sortBy(locationsget.map((element)=> element._source),'code'),
                warehouses: _.sortBy(warehousesget.map((element)=> element._source),'code'),
                countries: _.sortBy(countriesget.map((element)=> element._source),'name'),
                productGroups: _.sortBy(productGroupsget.map((element)=> element._source),'name'),
                stoneType: _.sortBy(stoneTypeget.map((element)=> element._source),'code'),
                gemstoneStoneType: _.sortBy(gemstoneStoneTypeget.map((element)=> element._source),'code'),
                cutShape: _.sortBy(cutShapeget.map((element)=> element._source),'name'),
                cut: _.orderBy(cutget.map((element)=> element._source),['priority', 'name'],['desc', 'asc']),
                cutGrades: _.sortBy(cutGradesget.map((element)=> element._source),'name'),
                colors: _.orderBy(colorsget.map((element)=> element._source),['priority', 'name'],['desc', 'asc']),
                colorGrades: _.sortBy(colorGradesget.map((element)=> element._source),'name'),
                clarities: _.orderBy(claritiesget.map((element)=> element._source),['priority', 'name'],['desc', 'asc']),
                certificateLabs: _.sortBy(certificateLabsget.map((element)=> element._source),'name'),
                polishs: _.sortBy(polishsget.map((element)=> element._source),'name'),
                symmetries: _.sortBy(symmetriesget.map((element)=> element._source),'name'),
                treatments: _.sortBy(treatmentsget.map((element)=> element._source),'name'),
                fluorescences: _.sortBy(fluorescencesget.map((element)=> element._source),'name'),
                origins: _.sortBy(originsget.map((element)=> element._source),'code'),
                jewelryCategories: _.sortBy(jewelryCategoriesget.map((element)=> element._source),'name'),
                collections: _.orderBy(collectionsget.map((element)=> element._source),['priority', 'name'],['desc', 'asc']),
                brands: _.orderBy(brandsget.map((element)=> element._source),['priority', 'name'],['desc', 'asc']),
                ringSizes: _.sortBy(ringSizesget.map((element)=> element._source),'name'),
                dominantStones: _.sortBy(dominantStonesget.map((element)=> element._source),'code'),
                metalTypes: _.sortBy(metalTypesget.map((element)=> element._source),'code'),
                metalColours: _.sortBy(metalColoursget.map((element)=> element._source),'code'),
                certificateAgencys: _.sortBy(certificateAgencysget.map((element)=> element._source),'code'),
                watchCategories: _.sortBy(watchCategoriesget.map((element)=> element._source),'name'),
                movements: _.sortBy(movementsget.map((element)=> element._source),'name'),
                dialIndexs: _.sortBy(dialIndexsget.map((element)=> element._source),'code'),
                dialColors: _.sortBy(dialColorsget.map((element)=> element._source),'code'),
                dialMetals: _.sortBy(dialMetalsget.map((element)=> element._source),'code'),
                buckleTypes: _.sortBy(buckleTypesget.map((element)=> element._source),'code'),
                strapTypes: _.sortBy(strapTypesget.map((element)=> element._source),'code'),
                strapColors: _.sortBy(strapColorsget.map((element)=> element._source),'code'),
                complications: _.sortBy(complicationsget.map((element)=> element._source),'name'),
                hierarchy: _.sortBy(hierarchyget.map((element)=> element._source),'path'),
                accessoryType: _.sortBy(accessoryTypesget.map((element)=> element._source),'code'),
                sparePartType: _.sortBy(sparePartTypesget.map((element)=> element._source),'code'),
                articles: _.sortBy(articlesTypesget.map((element)=> element._source),'name')
            };
            elastic.close();
            return reply(JSON.stringify(responsesata,null,4));
        })
        .catch(function (error) {
            elastic.close();
            return reply(Boom.badImplementation(err));
        });
    }
};
