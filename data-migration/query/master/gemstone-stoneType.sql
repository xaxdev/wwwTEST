SELECT DISTINCT
  LTRIM(RTRIM([StoneTypeId])) AS 'code',
  CASE
    WHEN [StoneTypeName] IS NULL THEN LTRIM(RTRIM([StoneTypeId]))
    ELSE LTRIM(RTRIM([StoneTypeName]))
    END AS 'name'
FROM [ITORAMA].[dbo].[ItemGemstones]
WHERE [StoneTypeId] <> ''
ORDER BY name
