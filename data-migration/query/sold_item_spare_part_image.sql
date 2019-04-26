SELECT	SOL.[Id] AS 'id'
		, UPPER(SOL.[Reference]) AS 'reference'
		, ISNULL(SOL.[Description], '') AS 'description'
		, SOL.[Sku] AS 'sku'
		, SOL.[VendorItemReferance] AS 'venderReference'
		, SOL.[SalesId] AS 'salesId'
		, SOL.[Quantity] AS 'quantity'
		, SOL.[GrossWeight] AS 'grossWeight'
		, ISNULL(SOL.[SalesPersonId], '') AS 'salesPerson'
		, ISNULL(SOL.[SalesPersonName], '') AS 'salesPersonName'
		, ISNULL(SOL.[Warehouse], '') AS 'warehouse'
		, ISNULL(SOL.[WarehouseName], '') AS 'warehouseName'
		, ISNULL(SOL.[InvoicedId], '') AS 'invoicedId'
		, SOL.[InvoiceDate] AS 'invoiceDate'
		, SOL.[SumLineDiscReporting] AS 'sumLineDiscReporting'
		, SOL.[NetAmount] AS 'netAmount'
		, SOL.[GroupCost] AS 'actualCost'
		, SOL.[UpdatedCost] AS 'updatedCost'
		, SOL.[PublicPriceReporting] AS 'publicPriceReporting'
		, SOL.[PP] AS 'price'
		, SOL.[CValueReporting] AS 'cValueReporting'
		, SOL.[Discount_amount_USD] AS 'discountAmountUSD'
		, SOL.[Margin] AS 'margin'
		, SOL.[DiscPercent] AS 'discPercent'
		, SOL.[MetalType] AS 'metalType'
		, ISNULL(SOL.[MetalTypeName], '') AS 'metalTypeName'
		, SOL.[MetalColor] AS 'metalColor'
		, ISNULL(SOL.[MetalColorName], '') AS 'metalColorName'
		, ISNULL(SOL.[Store], '') AS 'store'
		, ISNULL(SOL.[SalesChannelType], '') AS 'salesChannel'
		, ISNULL(saleschannels.[Description], '') AS 'salesChannelName'
		, ISNULL(SOL.[CustomerId], '') AS 'customer'
		, ISNULL(LTrim(SOL.[CustomerName]), '') AS 'customerName'
		, ISNULL(cus.[Email], '') AS 'customerEmail'
		, ISNULL(cus.[RetailMobilePrimary], '') AS 'customerPhone'
		, ISNULL(SOL.[ArticleCode], '') AS 'subType'
		, ISNULL(SOL.[ArticleDescription], '') AS 'subTypeName'
		, ISNULL(SOL.[CategoryCode], '') AS 'category'
		, ISNULL(SOL.[CategoryDescription], '') AS 'categoryName'
		, ISNULL(SOL.[CollectionCode], '') AS 'collection'
		, ISNULL(SOL.[CollectionDescription], '') AS 'collectionName'
		, ISNULL(SOL.[BrandCode], '') AS 'brand'
		, ISNULL(SOL.[BrandDescription], '') AS 'brandName'
		, SOL.[MustHave] AS 'mustHave'
		, ISNULL(SOL.[InventSizeId], '') AS 'size'
		, ISNULL(SOL.[InventSiteId], '') AS 'site'
		, ISNULL(SOL.[Site], '') AS 'siteName'
		, SOL.[MarkupPercentage] AS 'markup'
		, ISNULL(SOL.[RetailProductCategory], '') AS 'retailProductCategory'
		, ISNULL(SOL.[Hierarchy], '') AS 'hierarchy'
		, ISNULL(SOL.[RetailProductCategory], '') AS 'hierarchyName'
		, SOL.[NetAmount_Local] AS 'netAmountLocal'
		, SOL.[Tax_Local] AS 'taxLocal'
		, ISNULL(SOL.[CurrencyCode], '') AS 'currency'
		, UPPER(SOL.[DataAreaId]) AS 'company'
		, ISNULL(company.[Name], '') AS 'companyName'
		, ISNULL(SOL.[Partition], '') AS 'partition'
		, SOL.[PostedDate] AS 'postedDate'
		, SOL.[ItemCreatedDate] AS 'itemCreatedDate'
		, ISNULL(SOL.[CatRecId], '') AS 'catRecId'
		, ISNULL(SOL.[Article_Grouping], '') AS 'articleGrouping'
		, ISNULL(SOL.[StoneDetail], '') AS 'stoneDetail'
		, ISNULL(SOL.[DominantStone], '') AS 'dominantStone'
		, ISNULL(dominantstone.[Name], '') AS 'dominantStoneName'
		, ISNULL(SOL.[CertificateNumber], '') AS 'certificatedNumber'
		, ISNULL(imgOtherMME.[FILENAME], '') AS 'imageOtherNameMME'
	    , ISNULL(imgOtherMME.[FILETYPE], '') AS 'imageOtherTypeMME'
	    , ISNULL(imgOtherMME.[TYPEID], '') AS 'imageOtherTypeIdMME'
	    , ISNULL(imgOtherMME.[Company], '') AS 'imageOtherCompanyMME'
	    , ISNULL(imgOtherMME.[DEFAULTIMAGE], 0) AS 'defaultImageOtherMME'
	    , ISNULL(imgOtherMME.[LASTMODIFIEDDATE], '') AS 'lastModifiedDateImageOtherMME'
		, ISNULL(bomDocMME.[FILENAME], '') AS 'bomDocNameMME'
	    , ISNULL(bomDocMME.[FILETYPE], '') AS 'bomDocTypeMME'
	    , ISNULL(bomDocMME.[TYPEID], '') AS 'bomDocTypeIdMME'
	    , ISNULL(bomDocMME.[Company], '') AS 'bomDocCompanyMME'
	    , ISNULL(bomDocMME.[DEFAULTIMAGE], 0) AS 'defaultBomDocMME'
	    , ISNULL(bomDocMME.[LASTMODIFIEDDATE], '') AS 'lastModifiedDateBomDocMME'
		, 'SPA' AS 'type'
		, ISNULL(spareparts.[BuckleType], '') AS 'buckleType'
		, ISNULL(spareparts.[BuckleTypeName], '') AS 'buckleTypeName'
		, SOL.[OldData] AS 'isOldData'
FROM	[ITORAMA].[dbo].[SoldItems] AS SOL
		LEFT JOIN [ITORAMA].[dbo].[SparePart] spareparts
		    ON SOL.[Reference] = spareparts.[ItemReference]
		    AND SOL.[DataAreaId] = spareparts.[Company]
		LEFT JOIN [ITORAMA].[dbo].[ItemImages] imgOtherMME
		    ON SOL.[Reference] = imgOtherMME.[ITEMID]
		    AND imgOtherMME.[Company] = 'mme'
		    AND imgOtherMME.[TYPEID] in ('COA','DBC','Monograph')
		LEFT JOIN [ITORAMA].[dbo].[ItemImages] bomDocMME
		    ON SOL.[Reference] = bomDocMME.[ITEMID]
		    AND bomDocMME.[Company] = 'mme'
		    AND bomDocMME.[TYPEID] in ('File')
			AND bomDocMME.[FILETYPE] in ('xls','xlsx')
		LEFT JOIN [ITORAMA].[dbo].[Company] company
			ON SOL.[DataAreaId] = company.[Code]
		LEFT JOIN [ITORAMA].[dbo].[Customers] cus
			ON SOL.[CustomerId] = cus.[AccountNumber]
		LEFT JOIN [ITORAMA].[dbo].[DominantStone] dominantstone
  			ON dominantstone.[Code] = SOL.[DominantStone]
		LEFT JOIN [ITORAMA].[dbo].[SalesChannels] saleschannels
  			ON saleschannels.[SalesChannel] = SOL.[SalesChannelType]
			AND UPPER(SOL.[DataAreaId]) = UPPER(saleschannels.[DataAreaId])
WHERE	1=1
		AND SOL.[Type] = 'Spare'
		AND SOL.[Id] BETWEEN @from AND @to
ORDER BY SOL.[Id]
