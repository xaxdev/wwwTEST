SELECT [BRANDCODE] as code
      ,Ltrim([BRANDDESC]) as name
  FROM [MWD_DB].[dbo].[CRWBRANDMASTER]
  Order by Ltrim([BRANDDESC])
