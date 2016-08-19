--SELECT [Type] AS code
--		,[ARTICLEDESCRIPTION] AS name
--FROM [MWD_DB].[dbo].[CRWMOLSPARETYPE]
--WHERE [TYPE] <> ''
--GROUP BY [Type],[ARTICLEDESCRIPTION]
SELECT	[Code] AS code
		,Ltrim([Name]) AS name
FROM	[ITORAMA].[dbo].[SparePartType]
GROUP BY [Code],Ltrim([Name])
