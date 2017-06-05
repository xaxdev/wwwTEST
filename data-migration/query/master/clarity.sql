SELECT [CLARITYCODE] as code
      ,[NAME] as name
	  ,[MOLNUMBER] as [priority]
FROM [MWD_DB].[dbo].[CRWCLARITY]
Order by [MOLNUMBER],[NAME]
