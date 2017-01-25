USE [ITORAMA]

SELECT jewelry.[SetReference] AS 'setReference'
      ,item.[Id] AS 'id'
      ,item.[Reference] AS 'reference'
      ,item.[Price] AS 'price'
      ,item.[Currency] AS 'currency'
      ,ISNULL(setimg.[FILENAME], '') AS 'setImageName'
      ,ISNULL(setimg.[FILETYPE], '') AS 'setImageType'
      ,ISNULL(img.[FILENAME], '') AS 'imageName'
      ,ISNULL(img.[FILETYPE], '') AS 'imageType'
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
WHERE jewelry.[SetReference] <> ''
ORDER BY jewelry.[SetReference], item.[Id]
