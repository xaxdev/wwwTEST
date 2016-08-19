--SELECT	[Type] AS code
--		  ,[ARTICLEDESCRIPTION] AS name
--FROM	[MWD_DB].[dbo].[CRWMOLACCESSORYTYPE]
--GROUP BY [Type],[ARTICLEDESCRIPTION]
SELECT	[Code] AS code
		,Ltrim([Name]) AS name
FROM	[ITORAMA].[dbo].[AccessoryType]
GROUP BY [Code],Ltrim([Name])
