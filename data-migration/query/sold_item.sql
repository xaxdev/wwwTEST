SELECT	SOL.[Id] AS 'id'
		, UPPER(SOL.[Reference]) AS 'reference'
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
		, SOL.[GroupCost] AS 'actualCost'
		, SOL.[UpdatedCost] AS 'updatedCost'
		, SOL.[PublicPriceReporting] AS 'publicPriceReporting'
		, SOL.[PP] AS 'price'
		, SOL.[CValueReporting] AS 'cValueReporting'
		, SOL.[Discount_amount_USD] AS 'discountAmountUSD'
		, SOL.[Margin] AS 'margin'
		, SOL.[DiscPercent] AS 'discPercent'
		, ISNULL(SOL.[Store], '') AS 'store'
		, ISNULL(SOL.[SalesChannelType], '') AS 'salesChannel'
		, ISNULL(saleschannels.[Description], '') AS 'salesChannelName'
		, ISNULL(SOL.[CustomerId], '') AS 'customer'
		, ISNULL(LTrim(SOL.[CustomerName]), '') AS 'customerName'
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
		, SOL.[MarkupPercentage] AS 'markupPercentage'
		, ISNULL(SOL.[RetailProductCategory], '') AS 'retailProductCategory'
		, ISNULL(SOL.[Hierarchy], '') AS 'hierarchy'
		, SOL.[NetAmount_Local] AS 'netAmountLocal'
		, SOL.[Tax_Local] AS 'taxLocal'
		, ISNULL(SOL.[CurrencyCode], '') AS 'currency'
		, UPPER(SOL.[DataAreaId]) AS 'company'
		, ISNULL(SOL.[Partition], '') AS 'partition'
		, SOL.[PostedDate] AS 'postedDate'
		, ISNULL(SOL.[CatRecId], '') AS 'catRecId'
		, ISNULL(SOL.[Article_Grouping], '') AS 'articleGrouping'
		, ISNULL(SOL.[StoneDetail], '') AS 'stoneDetail'
		, ISNULL(SOL.[DominantStone], '') AS 'dominantStone'
		, ISNULL(SOL.[CertificateNumber], '') AS 'certificatedNumber'
		, ISNULL(img.[FILENAME], '') AS 'imageName'
		, ISNULL(img.[FILETYPE], '') AS 'imageType'
		, ISNULL(img.[TYPEID], '') AS 'imageTypeId'
		, ISNULL(img.[Company], '') AS 'imageCompany'
		, type = CASE	WHEN SOL.[Type] = 'Jewelry' THEN 'JLY'
						WHEN SOL.[Type] = 'Watch' THEN 'WAT'
						WHEN SOL.[Type] = 'Stones' THEN 'STO'
						WHEN SOL.[Type] = 'Accessories' THEN 'ACC'
						WHEN SOL.[Type] = 'OBA' THEN 'OBA'
						WHEN SOL.[Type] = 'Spare' THEN 'SPA'
						WHEN SOL.[Type] = 'Raw Material' THEN 'RMT'
						ELSE ''
		  END
		, ISNULL(SOL.[SetReference], '') AS 'setReference'
		, gemstone.[Id] AS 'gemstone_id'
		, ISNULL(gemstone.[Cut], '') AS 'gemstone_cut'
		, ISNULL(gemstone.[CutName], '') AS 'gemstone_cutName'
		, ISNULL(gemstone.[Color], '') AS 'gemstone_color'
		, ISNULL(gemstone.[ColorName], '') AS 'gemstone_colorName'
		, ISNULL(gemstone.[Clarity], '') AS 'gemstone_clarity'
		, ISNULL(gemstone.[ClarityName], '') AS 'gemstone_clarityName'
		, ISNULL(gemstone.[Cost], 0) AS 'gemstone_cost'
		, ISNULL(gemstone.[Carat], 0) AS 'gemstone_carat'
		, ISNULL(gemstone.[Quantity], 0) AS 'gemstone_quantity'
		, ISNULL(gemstone.[Origin], '') AS 'gemstone_origin'
		, ISNULL(gemstone.[Symmetry], '') AS 'gemstone_symmetry'
		, ISNULL(gemstone.[Fluorescence], '') AS 'gemstone_fluorescence'
		, ISNULL(gemstone.[StoneTypeId], '') AS 'gemstone_stoneTypeId'
		, ISNULL(gemstone.[StoneTypeName], '') AS 'gemstone_stoneTypeName'
		, ISNULL(gemstone.[Type], '') AS 'gemstone_type'
		, ISNULL(gemstone.[Unit], '') AS 'gemstone_unit'
		, ISNULL(JLYT.[Priority], '') AS 'priority'
		, ISNULL(cert.CERTIFICATIONNO, '') AS [CertificateNo]
		, ISNULL(cert.AGENCYID, '') AS [CertificateAgency]
		, ISNULL(cert.INVENTLOCATIONID, '') AS [CertificateWarehouse]
		, ISNULL(certimage.[FILENAME], '') AS [CertificateImageName]
		, ISNULL(certimage.[FILETYPE], '') AS [CertificateImageType]
		, ISNULL(certimage.[Company], '') AS [CertificateImageCompany]
		, certmaster.[CertificateCreateDate] AS [CertifiedDate]
FROM	[ITORAMA].[dbo].[SoldItems] AS SOL
		LEFT JOIN [ITORAMA].[dbo].[ItemGemstones] gemstone
			ON SOL.[Reference] = gemstone.[ItemReference]
			AND SOL.[DataAreaId] = gemstone.[Company]
        LEFT JOIN [ITORAMA].[dbo].[ItemImages] img
            ON SOL.[Reference] = img.[ITEMID]
            AND img.[TYPEID] in ('Image','COA','DBC','Monograph')
		LEFT JOIN [ITORAMA].[dbo].[JewelryType] AS JLYT
			ON SOL.[ArticleCode] = JLYT.[Code] AND SOL.[Type] = 'Jewelry'
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
		LEFT JOIN [ITORAMA].[dbo].[SalesChannels] saleschannels
  			ON saleschannels.[SalesChannel] = SOL.[SalesChannelType]
			AND UPPER(SOL.[DataAreaId]) = UPPER(saleschannels.[DataAreaId])
WHERE	1=1
		AND SOL.[Id] BETWEEN @from AND @to
ORDER BY SOL.[Id]
