SELECT item.[Id] AS 'id'
    , UPPER(item.[Reference]) AS 'reference'
    , item.[Name] AS 'name'
    , item.[DESCRIPTION] AS 'description'
    , UPPER(item.[Company]) AS 'company'
    , ISNULL(company.[Name], '') AS 'companyName'
    , item.[WAREHOUSE] AS 'warehouse'
    , item.[WarehouseName] AS 'warehouseName'
    , item.[Site] AS 'site'
    , item.[SiteName] AS 'siteName'
    , item.[Collection] AS 'collection'
    , item.[CollectionName] AS 'collectionName'
    , item.[Brand] AS 'brand'
    , item.[BrandName] AS 'brandName'
    , ISNULL(item.[Vendor], '') AS 'vendor'
    , ISNULL(item.[VendorName], '') AS 'vendorName'
    , item.[MetalType] AS 'metalType'
    , ISNULL(item.[MetalTypeName], '') AS 'metalTypeName'
    , item.[MetalColor] AS 'metalColor'
    , ISNULL(item.[MetalColorName], '') AS 'metalColorName'
    , item.[DominantStone] AS 'dominant'
    , ISNULL(dominantstone.[Name], '') AS 'dominantStoneName'
    , item.[ItemCreatedDate] AS 'itemCreatedDate'
    , item.[Hierarchy] AS 'hierarchy'
    , item.[SKU] AS 'sku'
    , item.[VendorItemReferance] AS 'venderReference'
    , item.[Quantity] AS 'quantity'
    , item.[GROSSWEIGHT] AS 'grossWeight'
    , item.[NetWeight] AS 'netWeight'
    , item.[MUSTHAVE] AS 'mustHave'
    , item.[Markup] AS 'markup'
    , item.[ActualCost] AS 'actualCost'
    , item.[UpdatedCost] AS 'updatedCost'
    , item.[Price] AS 'price'
    , item.[Currency] AS 'currency'
    , item.[Unit] AS 'unit'
    , item.[SpecialDisc] AS 'specialDiscount'
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
    , 'OBA' AS 'type'
    , ISNULL(oba.[Dimensions], '') AS 'dimensions'
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
    , ISNULL(cert.CERTIFICATIONNO, '') AS [CertificateNo]
    , ISNULL(cert.AGENCYID, '') AS [CertificateAgency]
    , ISNULL(cert.INVENTLOCATIONID, '') AS [CertificateWarehouse]
    , ISNULL(certimage.[FILENAME], '') AS [CertificateImageName]
    , ISNULL(certimage.[FILETYPE], '') AS [CertificateImageType]
    , ISNULL(certimage.[DEFAULTIMAGE], 0) AS 'certificateDefaultImage'
    , ISNULL(certimage.[LASTMODIFIEDDATE], '') AS 'certificateLastModifiedDateImage'
    , certmaster.[CertificateCreateDate] AS [CertifiedDate]
FROM [ITORAMA].[dbo].[Items] item
LEFT JOIN [ITORAMA].[dbo].[ItemGemstones] gemstone
    ON item.[Reference] = gemstone.[ItemReference]
    AND item.[Company] = gemstone.[Company]
INNER JOIN [ITORAMA].[dbo].[OBA] oba
    ON item.[Reference] = oba.[ItemReference]
    AND item.[Company] = oba.[Company]
LEFT JOIN [ITORAMA].[dbo].[ItemImages] img
    ON item.[Reference] = img.[ITEMID]
    AND img.[Company] = item.[Company]
    AND img.[TYPEID] in ('Image')
LEFT JOIN [ITORAMA].[dbo].[ItemImages] imgOther
    ON item.[Reference] = imgOther.[ITEMID]
    AND item.[Company] = imgOther.[Company]
    AND imgOther.[TYPEID] in ('COA','DBC','Monograph')
LEFT JOIN [ITORAMA].[dbo].[ItemCertificates] cert
    ON gemstone.[Certificate] = cert.[CERTIFICATIONNO]
    AND item.[Company] = cert.[Company]
LEFT JOIN [ITORAMA].[dbo].[ItemImages] certimage
    ON cert.[CERTIFICATIONNO] = certimage.[ITEMID]
    AND certimage.[Company] = item.[Company]
    AND certimage.[TYPEID] in ('Image','COA','DBC','Monograph')
LEFT JOIN [ITORAMA].[dbo].[CertificateMaster] certmaster
    ON cert.[CERTIFICATIONNO] = certmaster.[Item]
    AND item.[Company] = certmaster.[Company]
LEFT JOIN [ITORAMA].[dbo].[DominantStone] dominantstone
    ON dominantstone.[Code] = item.[DominantStone]
LEFT JOIN [ITORAMA].[dbo].[Company] company
    ON item.[Company] = company.[Code]
WHERE item.[Id] BETWEEN @from AND @to
ORDER BY item.[Id]
