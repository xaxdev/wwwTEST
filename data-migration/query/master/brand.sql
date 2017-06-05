SELECT [BRANDCODE] as code
      ,Ltrim([BRANDDESC]) as name
	  ,[MOLNUMBER] as [priority]
FROM [MWD_DB].[dbo].[CRWBRANDMASTER]
Order by [MOLNUMBER],Ltrim([BRANDDESC])
