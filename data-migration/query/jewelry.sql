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
    , item.[Quantity] AS 'quantity'
    , item.[GROSSWEIGHT] AS 'grossWeight'
    , item.[MUSTHAVE] AS 'mustHave'
    , item.[Markup] AS 'markup'
    , item.[ActualCost] AS 'actualCost'
    , item.[UpdatedCost] AS 'updatedCost'
    , item.[Price] AS 'price'
    , item.[Currency] AS 'currency'
    , gemstone.[Id] AS 'gemstone_id'
    , ISNULL(gemstone.[Cut], '') AS 'gemstone_cut'
    , ISNULL(gemstone.[Color], '') AS 'gemstone_color'
    , ISNULL(gemstone.[Clarity], '') AS 'gemstone_clarity'
    , ISNULL(gemstone.[Cost], 0) AS 'gemstone_cost'
    , ISNULL(gemstone.[Carat], 0) AS 'gemstone_carat'
    , ISNULL(gemstone.[Quantity], 0) AS 'gemstone_quantity'
    , ISNULL(gemstone.[Origin], '') AS 'gemstone_origin'
    , ISNULL(gemstone.[Symmetry], '') AS 'gemstone_symmetry'
    , ISNULL(gemstone.[Fluorescence], '') AS 'gemstone_fluorescence'
    , 'JLY' AS 'type'
    , ISNULL(jewelry.[Type], '') AS 'subType'
    , ISNULL(jewelry.[Size], '') AS 'size'
    , ISNULL(jewelry.[SetReference], '') AS 'setReference'
    , ISNULL(img.[FILENAME], '') AS 'imageName'
    , ISNULL(img.[FILETYPE], '') AS 'imageType'
    , ISNULL(cert.CERTIFICATIONNO, '') AS [CertificateNo]
    , ISNULL(cert.AGENCYID, '') AS [CertificateAgency]
    , ISNULL(cert.INVENTLOCATIONID, '') AS [CertificateWarehouse]
    , ISNULL(certimage.[FILENAME], '') AS [CertificateImageName]
    , ISNULL(certimage.[FILETYPE], '') AS [CertificateImageType]
FROM [ITORAMA].[dbo].[Items] item
LEFT JOIN [ITORAMA].[dbo].[ItemGemstones] gemstone
  ON item.[Reference] = gemstone.[ItemReference]
  AND item.[Company] = gemstone.[Company]
INNER JOIN [ITORAMA].[dbo].[Jewelry] jewelry
  ON item.[Reference] = jewelry.[ItemReference]
  AND item.[Company] = jewelry.[Company]
LEFT JOIN [ITORAMA].[dbo].[ItemImages] img
  ON item.[Id] = img.[ITEMRECID]
  AND item.[Company] = img.[Company]
LEFT JOIN [ITORAMA].[dbo].[ItemCertificates] cert
  ON gemstone.[Certificate] = cert.[CERTIFICATIONNO]
  AND item.[Company] = cert.[Company]
LEFT JOIN [ITORAMA].[dbo].[ItemImages] certimage
  ON cert.[INTSKUNUMBER] = certimage.[ITEMID]
  AND item.[Company] = certimage.[Company]
WHERE item.[Id] BETWEEN @from AND @to
ORDER BY item.[Id]
