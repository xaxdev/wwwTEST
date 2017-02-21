SELECT [Id] AS 'id'
	  ,[ItemReference] AS 'reference'
      ,[Sku] AS 'sku'
      ,ISNULL([Company], '') AS 'company'
      ,ISNULL([FromWareHouse], '') AS 'fromWareHouse'
      ,ISNULL([FromWarehouseName], '') AS 'fromWarehouseName'
      ,[PhysicalInvent] AS 'physicalInvent'
      ,[TimeFrom] AS 'timeFrom'
      ,ISNULL([ToWareHouse], '') AS 'toWareHouse'
      ,ISNULL([ToWareHouseName], '') AS 'toWareHouseName'
      ,[TimeTo] AS 'timeTo'
  FROM [ITORAMA].[dbo].[MovementActivities]
  WHERE [Id] BETWEEN @from AND @to
