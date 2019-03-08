SELECT item.[Id] AS 'id'
    , UPPER(item.[Reference]) AS 'reference'
    , item.[Name] AS 'name'
    , item.[DESCRIPTION] AS 'description'
    , UPPER(item.[Company]) AS 'company'
    , ISNULL(company.[Name], '') AS 'companyName'
    , item.[WAREHOUSE] AS 'warehouse'
    , item.[WarehouseName] AS 'warehouseName'
    , item.[Site] AS 'site'
    , item.[SiteName] AS 'siteName'
    , item.[Collection] AS 'collection'
    , item.[CollectionName] AS 'collectionName'
    , item.[Brand] AS 'brand'
    , item.[BrandName] AS 'brandName'
    , ISNULL(item.[Vendor], '') AS 'vendor'
    , ISNULL(item.[VendorName], '') AS 'vendorName'
    , item.[MetalType] AS 'metalType'
    , ISNULL(item.[MetalTypeName], '') AS 'metalTypeName'
    , item.[MetalColor] AS 'metalColor'
    , ISNULL(item.[MetalColorName], '') AS 'metalColorName'
    , item.[DominantStone] AS 'dominant'
    , ISNULL(dominantstone.[Name], '') AS 'dominantStoneName'
    , item.[ItemCreatedDate] AS 'itemCreatedDate'
    , item.[Hierarchy] AS 'hierarchy'
    , item.[SKU] AS 'sku'
    , item.[VendorItemReferance] AS 'venderReference'
    , item.[Quantity] AS 'quantity'
    , item.[GROSSWEIGHT] AS 'grossWeight'
    , item.[NetWeight] AS 'netWeight'
    , item.[MUSTHAVE] AS 'mustHave'
    , item.[Markup] AS 'markup'
    , item.[ActualCost] AS 'actualCost'
    , item.[UpdatedCost] AS 'updatedCost'
    , item.[Price] AS 'price'
    , item.[Currency] AS 'currency'
    , item.[Unit] AS 'unit'
    , item.[SpecialDisc] AS 'specialDiscount'
    , ISNULL(item.[HierarchyName], '') AS 'hierarchyName'
    , ISNULL(item.[Article_Grouping], '') AS 'articleGrouping'
    , 'WAT' AS 'type'
    , ISNULL(watch.[Type], '') AS 'subType'
    , ISNULL(watch.[TypeName], '') AS 'subTypeName'
    , ISNULL(watch.[SERIALNUMBER], '') AS 'serialNumber'
    , ISNULL(watch.[Movement], '') AS 'movement'
    , ISNULL(watch.[MovementName], '') AS 'movementName'
    , ISNULL(watch.[Complication], '') AS 'complication'
    , ISNULL(watch.[ComplicationName], '') AS 'complicationName'
    , ISNULL(watch.[StrapType], '') AS 'strapType'
    , ISNULL(watch.[StrapTypeName], '') AS 'strapTypeName'
    , ISNULL(watch.[StrapColor], '') AS 'strapColor'
    , ISNULL(watch.[StrapColorName], '') AS 'strapColorName'
    , ISNULL(watch.[DialIndex], '') AS 'dialIndex'
    , ISNULL(watch.[DialIndexName], '') AS 'dialIndexName'
    , ISNULL(watch.[DialColor], '') AS 'dialColor'
    , ISNULL(watch.[DialColorName], '') AS 'dialColorName'
    , ISNULL(watch.[DialMetal], '') AS 'dialMetal'
    , ISNULL(watch.[DialMetalName], '') AS 'dialMetalName'
    , ISNULL(watch.[BuckleType], '') AS 'buckleType'
    , ISNULL(watch.[BuckleTypeName], '') AS 'buckleTypeName'
    , CAST(ISNULL(watch.[IsLimited], 0) AS BIT) AS 'limitedEdition'
    , ISNULL(watch.[LimitedEdition], '') AS 'limitedEditionNumber'
    , ISNULL(watch.[ProductionDate], '') AS 'productionDate'
    , ISNULL(imgOtherMME.[FILENAME], '') AS 'imageOtherNameMME'
    , ISNULL(imgOtherMME.[FILETYPE], '') AS 'imageOtherTypeMME'
    , ISNULL(imgOtherMME.[TYPEID], '') AS 'imageOtherTypeIdMME'
    , ISNULL(imgOtherMME.[Company], '') AS 'imageOtherCompanyMME'
    , ISNULL(imgOtherMME.[DEFAULTIMAGE], 0) AS 'defaultImageOtherMME'
    , ISNULL(imgOtherMME.[LASTMODIFIEDDATE], '') AS 'lastModifiedDateImageOtherMME'
    , ISNULL(bomDocMME.[FILENAME], '') AS 'bomDocNameMME'
    , ISNULL(bomDocMME.[FILETYPE], '') AS 'bomDocTypeMME'
    , ISNULL(bomDocMME.[TYPEID], '') AS 'bomDocTypeIdMME'
    , ISNULL(bomDocMME.[Company], '') AS 'bomDocCompanyMME'
    , ISNULL(bomDocMME.[DEFAULTIMAGE], 0) AS 'defaultBomDocMME'
    , ISNULL(bomDocMME.[LASTMODIFIEDDATE], '') AS 'lastModifiedDateBomDocMME'
FROM [ITORAMA].[dbo].[Items] item
INNER JOIN [ITORAMA].[dbo].[Watches] watch
    ON item.[Reference] = watch.[ItemReference]
    AND item.[Company] =  watch.[Company]
LEFT JOIN [ITORAMA].[dbo].[ItemImages] imgOtherMME
    ON item.[Reference] = imgOtherMME.[ITEMID]
    AND imgOtherMME.[Company] = 'mme'
    AND imgOtherMME.[TYPEID] in ('COA','DBC','Monograph')
LEFT JOIN [ITORAMA].[dbo].[ItemImages] bomDocMME
    ON item.[SKU] = bomDocMME.[ITEMID]
    AND bomDocMME.[Company] = 'mme'
    AND bomDocMME.[TYPEID] in ('File')
	AND bomDocMME.[FILETYPE] in ('xls','xlsx')
LEFT JOIN [ITORAMA].[dbo].[DominantStone] dominantstone
    ON dominantstone.[Code] = item.[DominantStone]
LEFT JOIN [ITORAMA].[dbo].[Company] company
    ON item.[Company] = company.[Code]
WHERE   item.[Id] BETWEEN @from AND @to
ORDER BY item.[Id]
