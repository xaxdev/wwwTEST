SELECT	[Type] AS code
		,[ARTICLEDESCRIPTION] AS name
FROM	[MWD_DB].[dbo].[CRWMOLWATCHTYPE]
WHERE [TYPE] <> ''
GROUP BY [Type],[ARTICLEDESCRIPTION]