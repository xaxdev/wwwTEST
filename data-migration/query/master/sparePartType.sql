SELECT	[Code] AS code
		,Ltrim([Name]) AS name
FROM	[ITORAMA].[dbo].[SparePartType]
GROUP BY [Code],Ltrim([Name])
