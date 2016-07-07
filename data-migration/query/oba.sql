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
    , item.[ActualCostUSD] AS 'actualCostUSD'
    , item.[UpdatedCostUSD] AS 'updatedCostUSD'
    , item.[PriceUSD] AS 'priceUSD'
    , item.[ActualCostNonUSD] AS 'actualCostNonUSD'
    , item.[UpdatedCostNonUSD] AS 'updatedCostNonUSD'
    , item.[PriceNonUSD] AS 'priceNonUSD'
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
    , 'OBA' AS 'type'
    , ISNULL(oba.[Type], '') AS 'subType'
    , ISNULL(oba.[Dimensions], '') AS 'dimensions'
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
INNER JOIN [ITORAMA].[dbo].[OBA] oba
  ON item.[Reference] = oba.[ItemReference]
LEFT JOIN [MWD_DB].[dbo].[ITO_ITEMIMAGE] img
  ON item.[Id] = img.[ITEMRECID]
  AND item.[Company] = img.[DATAAREAID]
LEFT JOIN [MWD_DB].[dbo].[CRWMOLCERTIFICATE_LINE] cert
  ON gemstone.[Certificate] = cert.[CERTIFICATIONNO]
  AND item.[Company] = cert.[DATAAREAID]
LEFT JOIN [MWD_DB].[dbo].[ITO_ITEMIMAGE] certimage
  ON cert.INTSKUNUMBER = certimage.ITEMID
  AND item.[Company] = certimage.[DATAAREAID]
WHERE item.[Id] BETWEEN @from AND @to
ORDER BY item.[Id]
