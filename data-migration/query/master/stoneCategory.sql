SELECT DISTINCT
  LTRIM(RTRIM([Type])) AS 'code',
  LTRIM(RTRIM([Type])) AS 'name'
FROM [ITORAMA].[dbo].[Stones]
WHERE [Type] <> ''
ORDER BY name