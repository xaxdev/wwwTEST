SELECT [ITORAMA].[dbo].[SoldCertificateMaster].[RecId] AS 'id'
      ,[ITORAMA].[dbo].[SoldCertificateMaster].[Name] AS 'name'
      ,[ITORAMA].[dbo].[SoldCertificateMaster].[SKU] AS 'sku'
      ,UPPER([ITORAMA].[dbo].[SoldCertificateMaster].[Item]) AS 'reference'
      ,ISNULL(cert.[AGENCYID], '') AS 'agency'
      ,'CER' AS 'type'
      ,[ITORAMA].[dbo].[SoldCertificateMaster].[Site] AS 'site'
      ,[ITORAMA].[dbo].[SoldCertificateMaster].[SiteName] AS 'siteName'
      ,[ITORAMA].[dbo].[SoldCertificateMaster].[Warehouse] AS 'warehouse'
      ,[ITORAMA].[dbo].[SoldCertificateMaster].[WarehouseName] AS 'warehouseName'
      ,[ITORAMA].[dbo].[SoldCertificateMaster].[CertificateCreateDate] AS 'itemCreatedDate'
      ,[ITORAMA].[dbo].[SoldCertificateMaster].[Company] AS 'company'
      , ISNULL(company.[Name], '') AS 'companyName'
      ,ISNULL(certimage.[FILENAME], '') AS [imageName]
      ,ISNULL(certimage.[FILETYPE], '') AS [imageType]
FROM [ITORAMA].[dbo].[SoldCertificateMaster]
LEFT JOIN [ITORAMA].[dbo].[SoldItemCertificates] cert
  ON [ITORAMA].[dbo].[SoldCertificateMaster].[Item] = cert.[CERTIFICATIONNO]
LEFT JOIN [ITORAMA].[dbo].[ItemImages] certimage
    ON [ITORAMA].[dbo].[SoldCertificateMaster].[Item] = certimage.[ITEMID]
    AND certimage.[Company] = 'mme'
    AND certimage.[TYPEID] in ('Image','COA','DBC','Monograph')
LEFT JOIN [ITORAMA].[dbo].[Company] company
    ON [ITORAMA].[dbo].[SoldCertificateMaster].[Company] = company.[Code]
WHERE 1=1
	AND [ITORAMA].[dbo].[SoldCertificateMaster].[RecId] BETWEEN @from AND @to
ORDER BY [ITORAMA].[dbo].[SoldCertificateMaster].[RecId]
