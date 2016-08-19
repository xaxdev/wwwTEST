SELECT	[Code] AS code
  ,Ltrim([Name]) AS name
FROM [ITORAMA].[dbo].[DominantStone]
GROUP BY [Code],Ltrim([Name])
