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
		--, ISNULL(SOL.[ArticleCode], '') AS 'subType'
		--, ISNULL(SOL.[ArticleDescription], '') AS 'subTypeName'
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
		, ISNULL(img.[FILENAME], '') AS 'imageName'
		, ISNULL(img.[FILETYPE], '') AS 'imageType'
		, ISNULL(img.[TYPEID], '') AS 'imageTypeId'
		, ISNULL(img.[Company], '') AS 'imageCompany'
		, 'STO' AS 'type'
		, ISNULL(stone.[Name],'') AS 'subType'
		, ISNULL(stone.[Name],'') AS 'subTypeName'
		, ISNULL(stone.[LotNumber],'') AS 'lotNumber'
		, ISNULL(stone.[Cut],'') AS 'cut'
		, ISNULL(stone.[CutName],'') AS 'cutName'
		, ISNULL(stone.[Color],'') AS 'color'
		, ISNULL(stone.[ColorName],'') AS 'colorName'
		, ISNULL(stone.[Clarity],'') AS 'clarity'
		, ISNULL(stone.[ClarityName],'') AS 'clarityName'
		, ISNULL(stone.[Carat],0) AS 'carat'
		, ISNULL(stone.[Quantity],0) AS 'quantity'
		, ISNULL(stone.[GemstoneType],'') AS 'gemstoneType'
		, ISNULL(SOL.[SetReference], '') AS 'setReference'
		, ISNULL(gemstone.[NameAlias], '') AS 'gemstone_stoneTypeId'
		, ISNULL(gemstone.[StoneTypeName], '') AS 'gemstone_stoneTypeName'
		, ISNULL(gemstone.[Type], '') AS 'gemstone_type'
		, ISNULL(gemstone.[Unit], '') AS 'gemstone_unit'
		, ISNULL(gemstone.[Origin], '') AS 'origin'
		, ISNULL(gemstone.[Symmetry], '') AS 'symmetry'
		, ISNULL(gemstone.[Fluorescence], '') AS 'fluorescence'
		, ISNULL(gemstone.[Cost], 0) AS 'cost'
		, ISNULL(cert.CERTIFICATIONNO, '') AS [CertificateNo]
		, ISNULL(cert.AGENCYID, '') AS [CertificateAgency]
		, ISNULL(cert.INVENTLOCATIONID, '') AS [CertificateWarehouse]
		, ISNULL(certimage.[FILENAME], '') AS [CertificateImageName]
		, ISNULL(certimage.[FILETYPE], '') AS [CertificateImageType]
		, certmaster.[CertificateCreateDate] AS [CertifiedDate]
FROM	[ITORAMA].[dbo].[SoldItems] AS SOL
		LEFT JOIN [ITORAMA].[dbo].[ItemGemstones] gemstone
			ON SOL.[Reference] = gemstone.[ItemReference]
			AND SOL.[DataAreaId] = gemstone.[Company]
        LEFT JOIN [ITORAMA].[dbo].[ItemImages] img
            ON SOL.[Reference] = img.[ITEMID]
            AND img.[TYPEID] in ('Image','COA','DBC','Monograph')
		LEFT JOIN [ITORAMA].[dbo].[SoldItemCertificates] cert
			ON gemstone.[Certificate] = cert.[CERTIFICATIONNO]
			AND SOL.[DataAreaId] = cert.[Company]
		LEFT JOIN [ITORAMA].[dbo].[ItemImages] certimage
			ON cert.[CERTIFICATIONNO] = certimage.[ITEMID]
			AND certimage.[Company] = SOL.[DataAreaId]
			AND certimage.[TYPEID] in ('Image','COA','DBC','Monograph')
		LEFT JOIN [ITORAMA].[dbo].[CertificateMaster] certmaster
			ON cert.[CERTIFICATIONNO] = certmaster.[Item]
			AND SOL.[DataAreaId] = certmaster.[Company]
		LEFT JOIN [ITORAMA].[dbo].[Company] company
			ON SOL.[DataAreaId] = company.[Code]
		LEFT JOIN [ITORAMA].[dbo].[Customers] cus
			ON SOL.[CustomerId] = cus.[AccountNumber]
		LEFT JOIN [ITORAMA].[dbo].[SoldStones] stone
		    ON SOL.[Reference] = stone.[ItemReference]
		    AND SOL.[DataAreaId] = stone.[Company]
		    AND stone.[Warehouse] NOT LIKE '%CONS%'
		LEFT JOIN [ITORAMA].[dbo].[DominantStone] dominantstone
  			ON dominantstone.[Code] = SOL.[DominantStone]
		LEFT JOIN [ITORAMA].[dbo].[SalesChannels] saleschannels
			ON saleschannels.[SalesChannel] = SOL.[SalesChannelType]
			AND UPPER(SOL.[DataAreaId]) = UPPER(saleschannels.[DataAreaId])
WHERE	1=1
		AND SOL.[Type] = 'Stones'
		AND SOL.[Id] BETWEEN @from AND @to
ORDER BY SOL.[Id]
