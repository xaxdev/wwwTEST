SELECT SOL.[Id] AS 'id'
      , SOL.[Reference] AS 'reference'
      , ISNULL(SOL.[Description], '') AS 'description'
      , SOL.[Sku] AS 'sku'
      , SOL.[SalesId] AS 'salesId'
      , SOL.[Quantity] AS 'quantity'
      , ISNULL(SOL.[SalesPersonId], '') AS 'salesPerson'
      , ISNULL(SOL.[SalesPersonName], '') AS 'salesPersonName'
      , ISNULL(SOL.[Warehouse], '') AS 'warehouse'
      , ISNULL(SOL.[WarehouseName], '') AS 'warehouseName'
      , ISNULL(SOL.[InvoicedId], '') AS 'invoicedId'
      , SOL.[InvoiceDate] AS 'invoiceDate'
      , SOL.[SumLineDiscReporting] AS 'sumLineDiscReporting'
      , SOL.[NetAmount] AS 'netAmount'
      , SOL.[GroupCost] AS 'groupCost'
      , SOL.[UpdatedCost] AS 'updatedCost'
      , SOL.[PublicPriceReporting] AS 'publicPriceReporting'
      , SOL.[PP] AS 'publicPrice'
      , SOL.[CValueReporting] AS 'cValueReporting'
      , SOL.[Discount_amount_USD] AS 'discountAmountUSD'
      , SOL.[Margin] AS 'margin'
      , SOL.[DiscPercent] AS 'discPercent'
      , ISNULL(SOL.[Store], '') AS 'store'
      , ISNULL(SOL.[SalesChannelType], '') AS 'salesChannelType'
      , ISNULL(SOL.[CustomerId], '') AS 'customer'
      , ISNULL(SOL.[CustomerName], '') AS 'customerName'
      , ISNULL(SOL.[ArticleCode], '') AS 'article'
      , ISNULL(SOL.[ArticleDescription], '') AS 'articleName'
      , ISNULL(SOL.[CategoryCode], '') AS 'category'
      , ISNULL(SOL.[CategoryDescription], '') AS 'categoryName'
      , ISNULL(SOL.[CollectionCode], '') AS 'collection'
      , ISNULL(SOL.[CollectionDescription], '') AS 'collectionName'
      , ISNULL(SOL.[BrandCode], '') AS 'brand'
      , ISNULL(SOL.[BrandDescription], '') AS 'brandName'
      , SOL.[MustHave] AS 'mustHave'
      , ISNULL(SOL.[InventSizeId], '') AS 'inventSizeId'
      , ISNULL(SOL.[InventSiteId], '') AS 'inventSiteId'
      , SOL.[MarkupPercentage] AS 'markupPercentage'
      , ISNULL(SOL.[RetailProductCategory], '') AS 'retailProductCategory'
      , ISNULL(SOL.[Hierarchy], '') AS 'hierarchy'
      , ISNULL(SOL.[Site], '') AS 'site'
      , SOL.[NetAmount_Local] AS 'netAmountLocal'
      , SOL.[Tax_Local] AS 'taxLocal'
      , ISNULL(SOL.[CurrencyCode], '') AS 'currencyCode'
      , UPPER(SOL.[DataAreaId]) AS 'company'
      , ISNULL(SOL.[Partition], '') AS 'partition'
      , SOL.[PostedDate] AS 'postedDate'
      , ISNULL(SOL.[CatRecId], '') AS 'catRecId'
      , ISNULL(SOL.[Article_Grouping], '') AS 'articleGrouping'
      , ISNULL(SOL.[StoneDetail], '') AS 'stoneDetail'
      , ISNULL(SOL.[DominantStone], '') AS 'dominantStone'
	  , ISNULL(SOL.[CertificateNumber], '') AS 'certificateNumber'
      , type = CASE  WHEN JLY.ItemReference IS NOT  NULL THEN 'JLY'
					 WHEN WAT.ItemReference IS NOT  NULL THEN 'WAT'
					 WHEN STO.ItemReference IS NOT  NULL THEN 'STO'
					 WHEN ACC.ItemReference IS NOT  NULL THEN 'ACC'
					 WHEN OBA.ItemReference IS NOT  NULL THEN 'OBA'
					 WHEN CER.Item IS NOT  NULL THEN 'CER'
                     ELSE ''
		END
  FROM [ITORAMA].[dbo].[SoldItems] AS SOL
        LEFT JOIN [ITORAMA].[dbo].[Jewelry] AS JLY
			ON JLY.ItemReference = SOL.Reference
		LEFT JOIN [ITORAMA].[dbo].[Watches] AS WAT
			ON WAT.ItemReference = SOL.Reference
		LEFT JOIN [ITORAMA].[dbo].[Stones] AS STO
			ON STO.ItemReference = SOL.Reference
		LEFT JOIN [ITORAMA].[dbo].[Accessory] AS ACC
			ON ACC.ItemReference = SOL.Reference
		LEFT JOIN [ITORAMA].[dbo].[OBA] AS OBA
			ON OBA.ItemReference = SOL.Reference
		LEFT JOIN [ITORAMA].[dbo].[SparePart] AS SPA
			ON SPA.ItemReference = SOL.Reference
		LEFT JOIN [ITORAMA].[dbo].[CertificateMaster] AS CER
			ON CER.Item = SOL.Reference
  WHERE SOL.[Id] BETWEEN @from AND @to
  ORDER BY SOL.[Id]
