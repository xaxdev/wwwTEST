SELECT [COLLECTIONCODE] as code
      ,[COLLECTIONDESC] as name
	  ,[MOLNUMBER] as [priority]
FROM [MWD_DB].[dbo].[CRWCOLLECTION]
Order by [MOLNUMBER] DESC,[NAME] ASC
