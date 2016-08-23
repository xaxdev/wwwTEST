SELECT	[Code] AS code
		,Ltrim([Name]) AS name
FROM [ITORAMA].[dbo].[WatchType]
GROUP BY [Code],Ltrim([Name])
