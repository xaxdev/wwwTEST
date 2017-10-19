USE [ITORAMA]

SELECT [Id] AS 'id'
      ,[SetReference] AS 'setReference'
      ,[Reference] AS 'reference'
      ,[Description] AS 'description'
      ,[Price] AS 'price'
      ,[ActualCost] AS 'actualCost'
      ,[UpdatedCost] AS 'updatedCost'
      ,[Markup] AS 'markup'
      ,[Warehouse] AS 'warehouse'
      ,[WarehouseName] AS 'warehouseName'
      ,[Currency] AS 'currency'
      ,[SKU] AS 'sku'
      ,[VendorReferance] AS 'venderReference'
      ,[Company] AS 'company'
      ,[CompanyName] AS 'companyName'
      ,[SetImageName] AS 'setImageName'
      ,[SetImageType] AS 'setImageType'
      ,[ImageName] AS 'imageName'
      ,[ImageType] AS 'imageType'
      ,[Type] AS 'type'
      ,[Hierarchy] AS 'hierarchy'
      ,[GrossWeight] AS 'grossWeight'
      ,[StoneDetail] AS 'stoneDetail'
      ,[CreatedDate] AS 'createdDate'
FROM [ITORAMA].[dbo].[SetItem]
ORDER BY [SetReference], [Reference]
