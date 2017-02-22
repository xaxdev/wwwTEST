SELECT movement.[Id] AS 'id'
	  ,movement.[ItemReference] AS 'reference'
      ,movement.[Sku] AS 'sku'
      ,ISNULL(movement.[Company], '') AS 'company'
      ,ISNULL(movement.[FromWareHouse], '') AS 'fromWareHouse'
      ,ISNULL(movement.[FromWarehouseName], '') AS 'fromWarehouseName'
      ,movement.[PhysicalInvent] AS 'physicalInvent'
      ,movement.[TimeFrom] AS 'timeFrom'
      ,ISNULL(movement.[ToWareHouse], '') AS 'toWareHouse'
      ,ISNULL(movement.[ToWareHouseName], '') AS 'toWareHouseName'
      ,movement.[TimeTo] AS 'timeTo'
	  ,'mov' AS 'type'
  FROM [ITORAMA].[dbo].[MovementActivities] movement
  INNER JOIN [ITORAMA].[dbo].[Items] item
	ON item.[Reference] = movement.[ItemReference]
	AND item.[SKU] = movement.[Sku]
  WHERE movement.[Id] BETWEEN @from AND @to
  ORDER BY movement.[ItemReference],movement.[Sku]
