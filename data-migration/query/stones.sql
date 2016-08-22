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
    , item.[GROSSWEIGHT] AS 'grossWeight'
    , item.[NetWeight] AS 'netWeight'
    , item.[MUSTHAVE] AS 'mustHave'
    , item.[Markup] AS 'markup'
    , item.[ActualCost] AS 'actualCost'
    , item.[UpdatedCost] AS 'updatedCost'
    , item.[Price] AS 'price'
    , item.[Currency] AS 'currency'
    , item.[Unit] AS 'unit'
    , ISNULL(gemstone.[StoneTypeId], '') AS 'gemstone_stoneTypeId'
    , ISNULL(gemstone.[StoneTypeName], '') AS 'gemstone_stoneTypeName'
    , ISNULL(gemstone.[Type], '') AS 'gemstone_type'
    , ISNULL(gemstone.[Unit], '') AS 'gemstone_unit'
    , 'STO' AS 'type'
    , ISNULL(stone.[Type],'') AS 'subType'
    , ISNULL(stone.[Type],'') AS 'subTypeName'
    , ISNULL(stone.[LotNumber],'') AS 'lotNumber'
    , ISNULL(stone.[Cut],'') AS 'cut'
    , ISNULL(stone.[CutName],'') AS 'cutName'
    , ISNULL(stone.[Color],'') AS 'color'
    , ISNULL(stone.[ColorName],'') AS 'colorName'
    , ISNULL(stone.[Clarity],'') AS 'clarity'
    , ISNULL(stone.[ClarityName],'') AS 'clarityName'
    , ISNULL(stone.[Carat],'') AS 'carat'
    , ISNULL(stone.[Quantity],'') AS 'quantity'
    , ISNULL(gemstone.[Origin], '') AS 'origin'
    , ISNULL(gemstone.[Symmetry], '') AS 'symmetry'
    , ISNULL(gemstone.[Fluorescence], '') AS 'fluorescence'
    , ISNULL(gemstone.[Cost], 0) AS 'cost'
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
INNER JOIN [ITORAMA].[dbo].[Stones] stone
  ON item.[Reference] = stone.[ItemReference]
  AND item.[Company] = stone.[Company]
  AND stone.[Warehouse] NOT LIKE '%CONS%'
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
  ON cert.[CERTIFICATIONNO] = certmaster.[Item]
  AND item.[Company] = certmaster.[Company]
WHERE item.[Id] BETWEEN @from AND @to
ORDER BY item.[Id]
