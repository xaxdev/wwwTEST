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
    , item.[Brand] AS 'brand'
    , item.[Vendor] AS 'vendor'
    , item.[MetalType] AS 'metalType'
    , item.[MetalColor] AS 'metalColor'
    , item.[DominantStone] AS 'dominant'
    , item.[ItemCreatedDate] AS 'itemCreatedDate'
    , item.[Hierarchy] AS 'hierarchy'
    , item.[SKU] AS 'sku'
    , item.[VendorItemReferance] AS 'venderReference'
    , item.[GROSSWEIGHT] AS 'grossWeight'
    , item.[MUSTHAVE] AS 'mustHave'
    , item.[Markup] AS 'markup'
    , item.[ActualCost] AS 'actualCost'
    , item.[UpdatedCost] AS 'updatedCost'
    , item.[Price] AS 'price'
    , item.[Currency] AS 'currency'
    , item.[Unit] AS 'unit'
    , 'STO' AS 'type'
    , ISNULL(stone.[Type],'') AS 'subType'
    , ISNULL(stone.[LotNumber],'') AS 'lotNumber'
    , ISNULL(stone.[Cut],'') AS 'cut'
    , ISNULL(stone.[Color],'') AS 'color'
    , ISNULL(stone.[Clarity],'') AS 'clarity'
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
    , certmaster.[CERTIFICATECREATEDDATE] AS [CertifiedDate]
FROM [ITORAMA].[dbo].[Items] item
LEFT JOIN [ITORAMA].[dbo].[ItemGemstones] gemstone
  ON item.[Reference] = gemstone.[ItemReference]
  AND item.[Company] = gemstone.[Company]
INNER JOIN [ITORAMA].[dbo].[Stones] stone
  ON item.[Reference] = stone.[ItemReference]
  AND item.[Company] = stone.[Company]
LEFT JOIN [ITORAMA].[dbo].[ItemImages] img
  ON item.[Id] = img.[ITEMRECID]
  AND item.[Company] = img.[Company]
LEFT JOIN [ITORAMA].[dbo].[ItemCertificates] cert
  ON gemstone.[Certificate] = cert.[CERTIFICATIONNO]
  AND item.[Company] = cert.[Company]
LEFT JOIN [ITORAMA].[dbo].[ItemImages] certimage
  ON cert.INTSKUNUMBER = certimage.ITEMID
  AND item.[Company] = certimage.[Company]
LEFT JOIN [MWD_DB].[dbo].[CRWMOLCERTIFCATEMASTER] certmaster
  ON cert.[CERTIFICATIONNO] = certmaster.[SKU]
WHERE item.[Id] BETWEEN @from AND @to
ORDER BY item.[Id]
