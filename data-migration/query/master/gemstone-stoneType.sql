SELECT DISTINCT
  [StoneTypeId] AS 'code',
  CASE
    WHEN [StoneTypeName] IS NULL THEN [StoneTypeId]
    ELSE [StoneTypeName]
    END AS 'name'
FROM [ITORAMA].[dbo].[ItemGemstones]
WHERE [StoneTypeId] <> ''
ORDER BY [StoneTypeId]
