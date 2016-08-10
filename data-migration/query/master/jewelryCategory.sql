SELECT	[Code] AS code
		,Ltrim([Name]) AS name
FROM [ITORAMA].[dbo].[JewelryType]
GROUP BY [Code],Ltrim([Name])
