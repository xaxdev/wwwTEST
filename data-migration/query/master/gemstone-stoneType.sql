SELECT DISTINCT
  LTRIM(RTRIM([NameAlias])) AS 'code',
  LTRIM(RTRIM([NameAlias])) AS 'name'
FROM [ITORAMA].[dbo].[ItemGemstones]
WHERE [NameAlias] <> ''
ORDER BY name
