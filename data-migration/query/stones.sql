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
    , item.[ActualCostUSD] AS 'actualCostUSD'
    , item.[UpdatedCostUSD] AS 'updatedCostUSD'
    , item.[PriceUSD] AS 'priceUSD'
    , item.[ActualCostNonUSD] AS 'actualCostNonUSD'
    , item.[UpdatedCostNonUSD] AS 'updatedCostNonUSD'
    , item.[PriceNonUSD] AS 'priceNonUSD'
    , 'STO' AS 'type'
    , ISNULL(stone.[Type],'') AS 'subType'
    , ISNULL(stone.[LotNumber],'') AS 'lotNumber'
    , ISNULL(stone.[Cut],'') AS 'cut'
    , ISNULL(stone.[Color],'') AS 'color'
    , ISNULL(stone.[Clarity],'') AS 'clarity'
    , ISNULL(stone.[Carat],'') AS 'carat'
    , ISNULL(stone.[Quantity],'') AS 'quantity'
    , ISNULL(img.[FILENAME], '') AS 'imageName'
    , ISNULL(img.[FILETYPE], '') AS 'imageType'
FROM [ITORAMA].[dbo].[Items] item
INNER JOIN [ITORAMA].[dbo].[Stones] stone
ON item.[Reference] = stone.[ItemReference]
LEFT JOIN [MWD_DB].[dbo].[ITO_ITEMIMAGE] img
ON item.[Id] = img.[ITEMRECID]
WHERE item.[Id] BETWEEN @from AND @to
ORDER BY item.[Id]
