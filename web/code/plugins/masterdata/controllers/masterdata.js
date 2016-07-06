const Boom = require('boom');

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
    let type = 'roles,currencies,companies,locations,warehouses,countries,productGroups,stoneType,cut,cutShape,cutGrades,colors,colorGrades,clarities,certificateLabs,polishs,symmetries,treatments,fluorescences,origins,jewelryCategories,collections,brands,ringSizes,dominantStones,metalTypes,metalColours,certificateAgencys,watchCategories,movements,dialIndexs,dialColors,dialMetals,buckleTypes,strapTypes,strapColors,complications'
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
      const stoneTypeget = alldata.hits.hits.filter((element)=> {{
        return element._type == 'stoneType';
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
        roles:rolesget.map((element)=> element._source),
        currencies:currenciesget.map((element)=> element._source),
        companies:companiesget.map((element)=> element._source),
        locations:locationsget.map((element)=> element._source),
        warehouses:warehousesget.map((element)=> element._source),
        countries:countriesget.map((element)=> element._source),
        productGroups:productGroupsget.map((element)=> element._source),
        stoneType:stoneTypeget.map((element)=> element._source),
        cutShape:cutShapeget.map((element)=> element._source),
        cut:cutget.map((element)=> element._source),
        cutGrades:cutGradesget.map((element)=> element._source),
        colors:colorsget.map((element)=> element._source),
        colorGrades:colorGradesget.map((element)=> element._source),
        clarities:claritiesget.map((element)=> element._source),
        certificateLabs:certificateLabsget.map((element)=> element._source),
        polishs:polishsget.map((element)=> element._source),
        symmetries:symmetriesget.map((element)=> element._source),
        treatments:treatmentsget.map((element)=> element._source),
        fluorescences:fluorescencesget.map((element)=> element._source),
        origins:originsget.map((element)=> element._source),
        jewelryCategories:jewelryCategoriesget.map((element)=> element._source),
        collections:collectionsget.map((element)=> element._source),
        brands:brandsget.map((element)=> element._source),
        ringSizes:ringSizesget.map((element)=> element._source),
        dominantStones:dominantStonesget.map((element)=> element._source),
        metalTypes:metalTypesget.map((element)=> element._source),
        metalColours:metalColoursget.map((element)=> element._source),
        certificateAgencys:certificateAgencysget.map((element)=> element._source),
        watchCategories:watchCategoriesget.map((element)=> element._source),
        movements:movementsget.map((element)=> element._source),
        dialIndexs:dialIndexsget.map((element)=> element._source),
        dialColors:dialColorsget.map((element)=> element._source),
        dialMetals:dialMetalsget.map((element)=> element._source),
        buckleTypes:buckleTypesget.map((element)=> element._source),
        strapTypes:strapTypesget.map((element)=> element._source),
        strapColors:strapColorsget.map((element)=> element._source),
        complications:complicationsget.map((element)=> element._source)
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
