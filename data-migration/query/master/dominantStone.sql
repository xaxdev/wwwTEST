SELECT DISTINCT
  [DominantStone] AS 'code',
  CASE
    WHEN [DominantStoneName] IS NULL THEN [DominantStone]
    ELSE [DominantStoneName]
    END AS 'name'
FROM [ITORAMA].[dbo].[Items]
WHERE [DominantStone] <> ''
ORDER BY [DominantStone]
