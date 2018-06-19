SELECT [BRANDCODE] as code
      ,Ltrim([BRANDDESC]) as name
	  ,[MOLNUMBER] as [priority]
FROM [MWD_DB].[dbo].[CRWBRANDMASTER]
WHERE [MOL1] = 1
Order by [MOLNUMBER] DESC,Ltrim([BRANDDESC]) ASC
