SELECT goc.[Id]
      ,ISNULL(goc.[GOC_Number], '') AS 'gocNumber'
      ,goc.[Consignment_Type]
      ,ISNULL(goc.[STATUS], '') AS 'status'
      ,ISNULL(goc.[Date], '') AS 'date'
      ,ISNULL(goc.[Customer_ID], '') AS 'customerID'
      ,ISNULL(goc.[First_Name], '') AS 'firstName'
      ,ISNULL(goc.[Middle_Name], '') AS 'middleName'
      ,ISNULL(goc.[Last_Name], '') AS 'lastName'
      ,UPPER(ISNULL(goc.[Item_Referance], '')) AS 'reference'
      ,ISNULL(goc.[Sku], '') AS 'sku'
      ,goc.[Qty]
      ,ISNULL(goc.[Comments], '') AS 'comments'
      ,ISNULL(goc.[Warehouse], '') AS 'warehouse'
	  ,ISNULL(warehouse.[NAME], '') AS 'warehouseName'
      ,'goc' AS 'type'
  FROM [ITORAMA].[dbo].[GOC] goc
  INNER JOIN [ITORAMA].[dbo].[Items] item
	ON item.[Reference] = goc.[Item_Referance]
	AND item.[SKU] = goc.[Sku]
  LEFT JOIN [MWD_DB].[dbo].[CRWWAREHOUSE] warehouse
    ON warehouse.[INVENTLOCATIONID] = goc.[Warehouse]
  WHERE goc.[Id] BETWEEN @from AND @to
  ORDER BY goc.[Id]
