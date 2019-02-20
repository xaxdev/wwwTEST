SELECT UPPER(item.[Reference]) AS 'reference'
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
    , item.[GROSSWEIGHT] AS 'grossWeight'
    , item.[NetWeight] AS 'netWeight'
    , item.[MUSTHAVE] AS 'mustHave'
    , item.[Markup] AS 'markup'
    , item.[ActualCost] AS 'actualCost'
    , item.[UpdatedCost] AS 'updatedCost'
    , item.[Price] AS 'price'
    , item.[Currency] AS 'currency'
    , item.[Unit] AS 'unit'
    , ISNULL(item.[HierarchyName], '') AS 'hierarchyName'
    , ISNULL(gemstone.[NameAlias], '') AS 'gemstone_stoneTypeId'
    , ISNULL(gemstone.[StoneTypeName], '') AS 'gemstone_stoneTypeName'
    , ISNULL(gemstone.[Type], '') AS 'gemstone_type'
    , ISNULL(gemstone.[Unit], '') AS 'gemstone_unit'
    , 'STO' AS 'type'
    , ISNULL(stone.[Name],'') AS 'subType'
    , ISNULL(stone.[Name],'') AS 'subTypeName'
    , ISNULL(stone.[LotNumber],'') AS 'lotNumber'
    , ISNULL(stone.[Cut],'') AS 'cut'
    , ISNULL(stone.[CutName],'') AS 'cutName'
    , ISNULL(stone.[Color],'') AS 'color'
    , ISNULL(stone.[ColorName],'') AS 'colorName'
    , ISNULL(stone.[Clarity],'') AS 'clarity'
    , ISNULL(stone.[ClarityName],'') AS 'clarityName'
    , ISNULL(stone.[Carat],'') AS 'carat'
    , ISNULL(stone.[Quantity],'') AS 'quantity'
    , ISNULL(stone.[GemstoneType],'') AS 'gemstoneType'
    , ISNULL(gemstone.[Origin], '') AS 'origin'
    , ISNULL(gemstone.[Symmetry], '') AS 'symmetry'
    , ISNULL(gemstone.[Fluorescence], '') AS 'fluorescence'
    , ISNULL(gemstone.[Cost], 0) AS 'cost'
    , ISNULL(img.[FILENAME], '') AS 'imageName'
    , ISNULL(img.[FILETYPE], '') AS 'imageType'
    , ISNULL(img.[TYPEID], '') AS 'imageTypeId'
    , ISNULL(img.[Company], '') AS 'imageCompany'
    , ISNULL(img.[DEFAULTIMAGE], 0) AS 'defaultImage'
    , ISNULL(img.[LASTMODIFIEDDATE], '') AS 'lastModifiedDate'
    , ISNULL(cert.CERTIFICATIONNO, '') AS [CertificateNo]
    , ISNULL(cert.AGENCYID, '') AS [CertificateAgency]
    , ISNULL(cert.INVENTLOCATIONID, '') AS [CertificateWarehouse]
    , ISNULL(certimage.[FILENAME], '') AS [CertificateImageName]
    , ISNULL(certimage.[FILETYPE], '') AS [CertificateImageType]
    , ISNULL(certimage.[Company], '') AS [CertificateImageCompany]
    , ISNULL(certimage.[DEFAULTIMAGE], 0) AS 'certificateDefaultImage'
    , ISNULL(certimage.[LASTMODIFIEDDATE], '') AS 'certificateLastModifiedDate'
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
    ON item.[Reference] = img.[ITEMID]
    --AND img.[Company] = item.[Company]
    AND img.[TYPEID] in ('Image','COA','DBC','Monograph')
LEFT JOIN [ITORAMA].[dbo].[ItemCertificates] cert
  ON gemstone.[Certificate] = cert.[CERTIFICATIONNO]
  AND item.[Company] = cert.[Company]
LEFT JOIN [ITORAMA].[dbo].[ItemImages] certimage
  ON cert.[CERTIFICATIONNO] = certimage.[ITEMID]
  AND certimage.[Company] = item.[Company]
  AND certimage.[TYPEID] in ('Image','COA','DBC','Monograph')
LEFT JOIN [ITORAMA].[dbo].[CertificateMaster] certmaster
  ON cert.[CERTIFICATIONNO] = certmaster.[Item]
  AND item.[Company] = certmaster.[Company]
LEFT JOIN [ITORAMA].[dbo].[DominantStone] dominantstone
  ON dominantstone.[Code] = item.[DominantStone]
LEFT JOIN [ITORAMA].[dbo].[Company] company
  ON item.[Company] = company.[Code]
WHERE item.[Id] BETWEEN @from AND @to
ORDER BY item.[Reference]
