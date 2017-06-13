SELECT [CUTCODE] as code
      ,[NAME] as name
	  ,[MOLNUMBER] as [priority]
FROM  [MWD_DB].[dbo].[CRWCUT]
Order by [MOLNUMBER] DESC,[NAME] ASC
