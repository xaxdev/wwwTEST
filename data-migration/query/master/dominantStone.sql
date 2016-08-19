SELECT DISTINCT
  LTRIM(RTRIM([DominantStone])) AS 'code',
  CASE
    WHEN [DominantStoneName] IS NULL THEN LTRIM(RTRIM([DominantStone]))
    ELSE LTRIM(RTRIM([DominantStoneName]))
    END AS 'name'
FROM [ITORAMA].[dbo].[Items]
WHERE [DominantStone] <> ''  AND (LTRIM(RTRIM([DominantStoneName])) <> '' OR [DominantStoneName] <> NULL )
ORDER BY name
