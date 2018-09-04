USE [ITORAMA]

SELECT [Id] AS 'id'
      ,[SetReference] AS 'setReference'
      ,UPPER([Reference]) AS 'reference'
      ,[InvoicedId] AS 'invoicedId'
      ,[InvoiceDate] AS 'invoiceDate'
	  ,[ItemType] AS 'itemType'
      ,[Priority] AS 'priority'
      ,[Description] AS 'description'
      ,[Price] AS 'price'
      ,[ActualCost] AS 'actualCost'
      ,[UpdatedCost] AS 'updatedCost'
      ,[NetAmount] AS 'netAmount'
      ,[Margin] AS 'margin'
      ,[DiscountAmountUSD] AS 'discountAmountUSD'
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
      ,[PostedDate] AS 'postedDate'
FROM [ITORAMA].[dbo].[SetSoldItems]
ORDER BY [SetReference], [Priority] DESC, [Reference]