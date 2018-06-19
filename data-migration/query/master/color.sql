SELECT [COLOURCODE] as code
      ,[COLOURDESC] as name
	  ,[MOLNUMBER] as [priority]
FROM [MWD_DB].[dbo].[CRWCOLOR]
WHERE [MOL1] = 1
Order by [MOLNUMBER] DESC,[NAME] ASC
