SELECT DISTINCT
  LTRIM(RTRIM([NameAlias])) AS 'code',
  LTRIM(RTRIM([NameAlias])) AS 'name'
FROM [ITORAMA].[dbo].[ItemGemstones]
WHERE [NameAlias] <> '' AND [Type] in ('Loose Diamond','Stone')
ORDER BY name
