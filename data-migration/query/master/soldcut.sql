SELECT [CUTCODE] as code
      ,[NAME] as name
	  ,[MOLNUMBER] as [priority]
FROM  [MWD_DB].[dbo].[CRWCUT]
--WHERE [MOL1] = 1
Order by [MOLNUMBER] DESC,[NAME] ASC
