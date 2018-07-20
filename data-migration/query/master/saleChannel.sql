SELECT [SalesChannel]  AS 'code'
      ,[Description] AS 'name'
FROM  [ITORAMA].[dbo].[SalesChannels]
GROUP BY [SalesChannel], [Description]
