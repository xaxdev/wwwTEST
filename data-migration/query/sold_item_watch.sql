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
		, ISNULL(img.[FILENAME], '') AS 'imageName'
		, ISNULL(img.[FILETYPE], '') AS 'imageType'
		, ISNULL(img.[TYPEID], '') AS 'imageTypeId'
		, ISNULL(img.[Company], '') AS 'imageCompany'
		, ISNULL(img.[DEFAULTIMAGE], 0) AS 'defaultImage'
		, ISNULL(img.[LASTMODIFIEDDATE], '') AS 'lastModifiedDateImage'
		, ISNULL(imgOther.[FILENAME], '') AS 'imageOtherName'
		, ISNULL(imgOther.[FILETYPE], '') AS 'imageOtherType'
		, ISNULL(imgOther.[TYPEID], '') AS 'imageOtherTypeId'
		, ISNULL(imgOther.[Company], '') AS 'imageOtherCompany'
		, ISNULL(imgOther.[DEFAULTIMAGE], 0) AS 'defaultImageOther'
		, ISNULL(imgOther.[LASTMODIFIEDDATE], '') AS 'lastModifiedDateImageOther'
		, ISNULL(bomDoc.[FILENAME], '') AS 'bomDocName'
		, ISNULL(bomDoc.[FILETYPE], '') AS 'bomDocType'
		, ISNULL(bomDoc.[TYPEID], '') AS 'bomDocTypeId'
		, ISNULL(bomDoc.[Company], '') AS 'bomDocCompany'
		, ISNULL(bomDoc.[DEFAULTIMAGE], 0) AS 'defaultBomDoc'
		, ISNULL(bomDoc.[LASTMODIFIEDDATE], '') AS 'lastModifiedDateBomDoc'
		, 'WAT' AS 'type'
		, ISNULL(watch.[Type], '') AS 'subType'
		, ISNULL(watch.[TypeName], '') AS 'subTypeName'
		, ISNULL(watch.[SERIALNUMBER], '') AS 'serialNumber'
		, ISNULL(watch.[Movement], '') AS 'movement'
		, ISNULL(watch.[MovementName], '') AS 'movementName'
		, ISNULL(watch.[Complication], '') AS 'complication'
		, ISNULL(watch.[ComplicationName], '') AS 'complicationName'
		, ISNULL(watch.[StrapType], '') AS 'strapType'
		, ISNULL(watch.[StrapTypeName], '') AS 'strapTypeName'
		, ISNULL(watch.[StrapColor], '') AS 'strapColor'
		, ISNULL(watch.[StrapColorName], '') AS 'strapColorName'
		, ISNULL(watch.[DialIndex], '') AS 'dialIndex'
		, ISNULL(watch.[DialIndexName], '') AS 'dialIndexName'
		, ISNULL(watch.[DialColor], '') AS 'dialColor'
		, ISNULL(watch.[DialColorName], '') AS 'dialColorName'
		, ISNULL(watch.[DialMetal], '') AS 'dialMetal'
		, ISNULL(watch.[DialMetalName], '') AS 'dialMetalName'
		, ISNULL(watch.[BuckleType], '') AS 'buckleType'
		, ISNULL(watch.[BuckleTypeName], '') AS 'buckleTypeName'
		, CAST(ISNULL(watch.[IsLimited], 0) AS BIT) AS 'limitedEdition'
		, ISNULL(watch.[LimitedEdition], '') AS 'limitedEditionNumber'
		, ISNULL(watch.[ProductionDate], '') AS 'productionDate'
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
		, ISNULL(gemstone.[NameAlias], '') AS 'gemstone_stoneTypeId'
		, ISNULL(gemstone.[StoneTypeName], '') AS 'gemstone_stoneTypeName'
		, ISNULL(gemstone.[Type], '') AS 'gemstone_type'
		, ISNULL(gemstone.[Unit], '') AS 'gemstone_unit'
		, ISNULL(cert.CERTIFICATIONNO, '') AS [CertificateNo]
		, ISNULL(cert.AGENCYID, '') AS [CertificateAgency]
		, ISNULL(cert.INVENTLOCATIONID, '') AS [CertificateWarehouse]
		, ISNULL(certimage.[FILENAME], '') AS [CertificateImageName]
		, ISNULL(certimage.[FILETYPE], '') AS [CertificateImageType]
		, ISNULL(certimage.[Company], '') AS [CertificateImageCompany]
		, ISNULL(certimage.[DEFAULTIMAGE], 0) AS 'certificateDefaultImage'
		, ISNULL(certimage.[LASTMODIFIEDDATE], '') AS 'certificateLastModifiedDateImage'
		, certmaster.[CertificateCreateDate] AS [CertifiedDate]
		, SOL.[OldData] AS 'isOldData'
FROM	[ITORAMA].[dbo].[SoldItems] AS SOL
		LEFT JOIN [ITORAMA].[dbo].[ItemGemstones] gemstone
			ON SOL.[Reference] = gemstone.[ItemReference]
			AND SOL.[DataAreaId] = gemstone.[Company]
        LEFT JOIN [ITORAMA].[dbo].[ItemImages] img
            ON SOL.[Reference] = img.[ITEMID]
			AND SOL.[DataAreaId] = img.[Company]
            AND img.[TYPEID] in ('Image')
		LEFT JOIN [ITORAMA].[dbo].[ItemImages] imgOther
		    ON SOL.[Reference] = imgOther.[ITEMID]
		    AND SOL.[DataAreaId] = imgOther.[Company]
		    AND imgOther.[TYPEID] in ('COA','DBC','Monograph')
		LEFT JOIN [ITORAMA].[dbo].[SoldItemCertificates] cert
			ON gemstone.[Certificate] = cert.[CERTIFICATIONNO]
			AND SOL.[DataAreaId] = cert.[Company]
		LEFT JOIN [ITORAMA].[dbo].[ItemImages] certimage
			ON cert.[CERTIFICATIONNO] = certimage.[ITEMID]
			AND certimage.[Company] = SOL.[DataAreaId]
			AND certimage.[TYPEID] in ('Image','COA','DBC','Monograph')
		LEFT JOIN [ITORAMA].[dbo].[ItemImages] bomDoc
		    ON SOL.[Reference] = bomDoc.[ITEMID]
		    AND SOL.[DataAreaId] = bomDoc.[Company]
		    AND bomDoc.[TYPEID] in ('File')
			AND bomDoc.[FILETYPE] in ('xls','xlsx')
		LEFT JOIN [ITORAMA].[dbo].[CertificateMaster] certmaster
			ON cert.[CERTIFICATIONNO] = certmaster.[Item]
			AND SOL.[DataAreaId] = certmaster.[Company]
		LEFT JOIN [ITORAMA].[dbo].[Company] company
			ON SOL.[DataAreaId] = company.[Code]
		LEFT JOIN [ITORAMA].[dbo].[Customers] cus
			ON SOL.[CustomerId] = cus.[AccountNumber]
		LEFT JOIN [ITORAMA].[dbo].[SoldWatches] watch
		    ON SOL.[Reference] = watch.[ItemReference]
		    AND SOL.[DataAreaId] =  watch.[Company]
		LEFT JOIN [ITORAMA].[dbo].[DominantStone] dominantstone
  			ON dominantstone.[Code] = SOL.[DominantStone]
		LEFT JOIN [ITORAMA].[dbo].[SalesChannels] saleschannels
  			ON saleschannels.[SalesChannel] = SOL.[SalesChannelType]
			AND UPPER(SOL.[DataAreaId]) = UPPER(saleschannels.[DataAreaId])
WHERE	1=1
		AND SOL.[Type] = 'Watch'
		AND SOL.[Id] BETWEEN @from AND @to
ORDER BY SOL.[Id]
