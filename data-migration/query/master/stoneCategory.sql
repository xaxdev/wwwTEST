SELECT DISTINCT
  LTRIM(RTRIM([Name])) AS 'code',
  LTRIM(RTRIM([Name])) AS 'name'
FROM [ITORAMA].[dbo].[Stones]
WHERE [Name] <> ''
ORDER BY name
