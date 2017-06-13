SELECT [COLOURCODE] as code
      ,[COLOURDESC] as name
	  ,[MOLNUMBER] as [priority]
FROM [MWD_DB].[dbo].[CRWCOLOR]
Order by [MOLNUMBER] DESC,[NAME] ASC
