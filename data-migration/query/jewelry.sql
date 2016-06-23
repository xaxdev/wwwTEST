SELECT item.[Id] AS 'id'
  , item.[Reference] AS 'reference'
    , item.[Name] AS 'name'
    , item.[DESCRIPTION] AS 'description'
    , UPPER(item.[Company]) AS 'company'
    , item.[WAREHOUSE] AS 'warehouse'
    , item.[WarehouseName] AS 'warehouseName'
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
    , ISNULL(gemstone.[Cut], '') AS 'gemstone_cut'
    , ISNULL(gemstone.[Color], '') AS 'gemstone_color'
    , ISNULL(gemstone.[Clarity], '') AS 'gemstone_clarity'
    , ISNULL(gemstone.[Cost], 0) AS 'gemstone_cost'
    , ISNULL(gemstone.[Carat], 0) AS 'gemstone_carat'
    , ISNULL(gemstone.[Quantity], 0) AS 'gemstone_quantity'
    , ISNULL(gemstone.[Origin], '') AS 'gemstone_origin'
    , ISNULL(gemstone.[Symmetry], '') AS 'gemstone_symmetry'
    , ISNULL(gemstone.[Fluorescence], '') AS 'gemstone_fluorescence'
    , ISNULL(gemstone.[Certificate], '') AS 'certificate_number'
    , 'JLY' AS 'type'
    , ISNULL(jewelry.[Type], '') AS 'subType'
    , ISNULL(jewelry.[Size], '') AS 'size'
    , ISNULL(jewelry.[SetReference], '') AS 'setReference'
FROM [ITORAMA].[dbo].[Items] item
LEFT JOIN [ITORAMA].[dbo].[ItemGemstones] gemstone
ON item.[Reference] = gemstone.[ItemReference]
INNER JOIN [ITORAMA].[dbo].[Jewelry] jewelry
ON item.[Reference] = jewelry.[ItemReference]
WHERE item.[Id] BETWEEN @from AND @to
ORDER BY item.[Id]
