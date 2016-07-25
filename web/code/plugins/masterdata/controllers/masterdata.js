const Boom = require('boom');
const _ = require('lodash');

const internals = {
  filters: []
};

module.exports = {
  auth: false,
  handler: (request, reply) => {

    const elastic = request.server.plugins.elastic.client;


    internals.query = JSON.parse(
    `{
     "size": 5000,
    "query": {
            "match_all" : {}
        }
    }`);
    let type = 'roles,currencies,companies,locations,warehouses,countries,productGroups,stoneType,gemstoneStoneType,cut,cutShape,cutGrades,colors,colorGrades,clarities,certificateLabs,polishs,symmetries,treatments,fluorescences,origins,jewelryCategories,collections,brands,ringSizes,dominantStones,metalTypes,metalColours,certificateAgencys,watchCategories,movements,dialIndexs,dialColors,dialMetals,buckleTypes,strapTypes,strapColors,complications'
    // let type = 'roles,currencies';
    const alldata = elastic
      .search({
        index: 'mol',
        type: type,
        body:internals.query
      });

      Promise.all([alldata])
        .then(function([alldata]) {

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
      const stoneType = alldata.hits.hits.filter((element)=> {{
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


      const responsesata = {
        roles:_.sortBy(rolesget.map((element)=> element._source),'name'),
        currencies:_.sortBy(currenciesget.map((element)=> element._source),'name'),
        companies:_.sortBy(companiesget.map((element)=> element._source),'name'),
        locations:_.sortBy(locationsget.map((element)=> element._source),'name'),
        warehouses:_.sortBy(warehousesget.map((element)=> element._source),'name'),
        countries:_.sortBy(countriesget.map((element)=> element._source),'name'),
        productGroups:_.sortBy(productGroupsget.map((element)=> element._source),'name'),
        stoneType:_.sortBy(stoneTypeget.map((element)=> element._source),'code'),
        gemstoneStoneType:_.sortBy(gemstoneStoneTypeget.map((element)=> element._source),'code'),
        cutShape:_.sortBy(cutShapeget.map((element)=> element._source),'name'),
        cut:_.sortBy(cutget.map((element)=> element._source),'name'),
        cutGrades:_.sortBy(cutGradesget.map((element)=> element._source),'name'),
        colors:_.sortBy(colorsget.map((element)=> element._source),'name'),
        colorGrades:_.sortBy(colorGradesget.map((element)=> element._source),'name'),
        clarities:_.sortBy(claritiesget.map((element)=> element._source),'name'),
        certificateLabs:_.sortBy(certificateLabsget.map((element)=> element._source),'name'),
        polishs:_.sortBy(polishsget.map((element)=> element._source),'name'),
        symmetries:_.sortBy(symmetriesget.map((element)=> element._source),'name'),
        treatments:_.sortBy(treatmentsget.map((element)=> element._source),'name'),
        fluorescences:_.sortBy(fluorescencesget.map((element)=> element._source),'name'),
        origins:_.sortBy(originsget.map((element)=> element._source),'name'),
        jewelryCategories:_.sortBy(jewelryCategoriesget.map((element)=> element._source),'name'),
        collections:_.sortBy(collectionsget.map((element)=> element._source),'name'),
        brands:_.sortBy(brandsget.map((element)=> element._source),'name'),
        ringSizes:_.sortBy(ringSizesget.map((element)=> element._source),'name'),
        dominantStones:_.sortBy(dominantStonesget.map((element)=> element._source),'code'),
        metalTypes:_.sortBy(metalTypesget.map((element)=> element._source),'name'),
        metalColours:_.sortBy(metalColoursget.map((element)=> element._source),'name'),
        certificateAgencys:_.sortBy(certificateAgencysget.map((element)=> element._source),'name'),
        watchCategories:_.sortBy(watchCategoriesget.map((element)=> element._source),'name'),
        movements:_.sortBy(movementsget.map((element)=> element._source),'name'),
        dialIndexs:_.sortBy(dialIndexsget.map((element)=> element._source),'name'),
        dialColors:_.sortBy(dialColorsget.map((element)=> element._source),'name'),
        dialMetals:_.sortBy(dialMetalsget.map((element)=> element._source),'name'),
        buckleTypes:_.sortBy(buckleTypesget.map((element)=> element._source),'name'),
        strapTypes:_.sortBy(strapTypesget.map((element)=> element._source),'name'),
        strapColors:_.sortBy(strapColorsget.map((element)=> element._source),'name'),
        complications:_.sortBy(complicationsget.map((element)=> element._source),'name')
      };
      elastic.close();
      return reply(JSON.stringify(responsesata,null,4));

    })
    .catch(function (error) {
      console.log(error);
      elastic.close();
      return reply(Boom.badImplementation(err));
    });

  }
};
