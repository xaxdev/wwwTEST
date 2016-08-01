SELECT item.[Id] AS 'id'
  , item.[Reference] AS 'reference'
    , item.[Name] AS 'name'
    , item.[DESCRIPTION] AS 'description'
    , UPPER(item.[Company]) AS 'company'
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
    , ISNULL(item.[DominantStoneName], '') AS 'dominantStoneName'
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
    , gemstone.[Id] AS 'gemstone_id'
    , ISNULL(gemstone.[Cut], '') AS 'gemstone_cut'
    , ISNULL(gemstone.[CutName], '') AS 'gemstone_cutName'
    , ISNULL(gemstone.[Color], '') AS 'gemstone_color'
    , ISNULL(gemstone.[ColorName], '') AS 'gemstone_colorName'
    , ISNULL(gemstone.[Clarity], '') AS 'gemstone_clarity'
    , ISNULL(gemstone.[ClarityName], '') AS 'gemstone_clarityName'
    , ISNULL(gemstone.[Cost], 0) AS 'gemstone_cost'
    , ISNULL(gemstone.[Carat], 0) AS 'gemstone_carat'
    , ISNULL(gemstone.[Quantity], 0) AS 'gemstone_quantity'
    , ISNULL(gemstone.[Origin], '') AS 'gemstone_origin'
    , ISNULL(gemstone.[Symmetry], '') AS 'gemstone_symmetry'
    , ISNULL(gemstone.[Fluorescence], '') AS 'gemstone_fluorescence'
    , ISNULL(gemstone.[StoneTypeId], '') AS 'gemstone_stoneTypeId'
    , ISNULL(gemstone.[StoneTypeName], '') AS 'gemstone_stoneTypeName'
    , ISNULL(gemstone.[Type], '') AS 'gemstone_type'
    , ISNULL(gemstone.[Unit], '') AS 'gemstone_unit'
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
    , ISNULL(img.[FILENAME], '') AS 'imageName'
    , ISNULL(img.[FILETYPE], '') AS 'imageType'
    , ISNULL(cert.CERTIFICATIONNO, '') AS [CertificateNo]
    , ISNULL(cert.AGENCYID, '') AS [CertificateAgency]
    , ISNULL(cert.INVENTLOCATIONID, '') AS [CertificateWarehouse]
    , ISNULL(certimage.[FILENAME], '') AS [CertificateImageName]
    , ISNULL(certimage.[FILETYPE], '') AS [CertificateImageType]
    , certmaster.[CertificateCreateDate] AS [CertifiedDate]
FROM [ITORAMA].[dbo].[Items] item
LEFT JOIN [ITORAMA].[dbo].[ItemGemstones] gemstone
  ON item.[Reference] = gemstone.[ItemReference]
  AND item.[Company] = gemstone.[Company]
INNER JOIN [ITORAMA].[dbo].[Watches] watch
  ON item.[Reference] = watch.[ItemReference]
  AND item.[Company] =  watch.[Company]
LEFT JOIN [ITORAMA].[dbo].[ItemImages] img
  ON item.[Id] = img.[ITEMRECID]
  AND item.[Company] = img.[Company]
LEFT JOIN [ITORAMA].[dbo].[ItemCertificates] cert
  ON gemstone.[Certificate] = cert.[CERTIFICATIONNO]
  AND item.[Company] = cert.[Company]
LEFT JOIN [ITORAMA].[dbo].[ItemImages] certimage
  ON cert.[CERTIFICATIONNO] = certimage.[ITEMID]
  AND certimage.[Company] = 'mme'
LEFT JOIN [ITORAMA].[dbo].[CertificateMaster] certmaster
  ON cert.[CERTIFICATIONNO] = certmaster.[SKU]
  AND item.[Company] = certmaster.[Company]
WHERE item.[Id] BETWEEN @from AND @to
ORDER BY item.[Id]
