USE [ITORAMA]

SELECT jewelry.[SetReference] AS 'setReference'
      ,item.[Id] AS 'id'
      ,item.[Reference] AS 'reference'
      ,item.[Price] AS 'price'
	  ,item.[ActualCost] AS 'actualCost'
	  ,item.[UpdatedCost] AS 'updatedCost'
	  ,item.[Markup] AS 'markup'
      ,item.[WAREHOUSE] AS 'warehouse'
	  ,item.[WarehouseName] AS 'warehouseName'
      ,item.[Currency] AS 'currency'
	  ,item.[SKU] AS 'sku'
	  ,item.[VendorItemReferance] AS 'venderReference'
      ,UPPER(item.[Company]) AS 'company'
	  ,ISNULL(company.[Name], '') AS 'companyName'
      ,ISNULL(setimg.[FILENAME], '') AS 'setImageName'
      ,ISNULL(setimg.[FILETYPE], '') AS 'setImageType'
      ,ISNULL(img.[FILENAME], '') AS 'imageName'
      ,ISNULL(img.[FILETYPE], '') AS 'imageType'
	  ,item.[CreatedDate] AS 'createdDate'
FROM [ITORAMA].[dbo].[Jewelry] jewelry
INNER JOIN [ITORAMA].[dbo].[Items] item
  ON item.[Reference] = jewelry.[ItemReference]
  AND item.[Company] = jewelry.[Company]
LEFT JOIN [ITORAMA].[dbo].[ItemImages] setimg
  ON jewelry.[SetReference] = setimg.[ITEMID]
  AND setimg.[Company] = 'mme'
  AND setimg.[TYPEID] = 'Image'
LEFT JOIN [ITORAMA].[dbo].[ItemImages] img
  ON item.[Id] = img.[ITEMRECID]
  AND item.[Company] = img.[Company]
  AND img.[TYPEID] = 'Image'
LEFT JOIN [ITORAMA].[dbo].[Company] company
  ON item.[Company] = company.[Code]
WHERE jewelry.[SetReference] <> ''
ORDER BY jewelry.[SetReference], item.[Id]
