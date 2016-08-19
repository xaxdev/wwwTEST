SELECT	[Code] AS code
		,Ltrim([Name]) AS name
FROM	[ITORAMA].[dbo].[AccessoryType]
GROUP BY [Code],Ltrim([Name])
