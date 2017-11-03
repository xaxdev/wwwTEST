SELECT	[Code] AS code
		,Ltrim([Name]) AS name
		,[Priority] AS priority
FROM [ITORAMA].[dbo].[JewelryType]
GROUP BY [Code],Ltrim([Name])
