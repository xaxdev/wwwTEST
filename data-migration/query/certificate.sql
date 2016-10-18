SELECT [ITORAMA].[dbo].[CertificateMaster].[RecId] AS 'id'
      ,[ITORAMA].[dbo].[CertificateMaster].[Name] AS 'name'
      ,[ITORAMA].[dbo].[CertificateMaster].[SKU] AS 'sku'
      ,[ITORAMA].[dbo].[CertificateMaster].[Item] AS 'reference'
      ,ISNULL(cert.[AGENCYID], '') AS 'agency'
      ,'CER' AS 'type'
      ,[ITORAMA].[dbo].[CertificateMaster].[Site] AS 'site'
      ,[ITORAMA].[dbo].[CertificateMaster].[SiteName] AS 'siteName'
      ,[ITORAMA].[dbo].[CertificateMaster].[Warehouse] AS 'warehouse'
      ,[ITORAMA].[dbo].[CertificateMaster].[WarehouseName] AS 'warehouseName'
      ,[ITORAMA].[dbo].[CertificateMaster].[CertificateCreateDate] AS 'itemCreatedDate'
      ,[ITORAMA].[dbo].[CertificateMaster].[Company] AS 'company'
      , ISNULL(company.[Name], '') AS 'companyName'
      ,ISNULL(certimage.[FILENAME], '') AS [imageName]
      ,ISNULL(certimage.[FILETYPE], '') AS [imageType]
FROM [ITORAMA].[dbo].[CertificateMaster]
LEFT JOIN [ITORAMA].[dbo].[ItemCertificates] cert
  ON [ITORAMA].[dbo].[CertificateMaster].[Item] = cert.[CERTIFICATIONNO]
LEFT JOIN [ITORAMA].[dbo].[ItemImages] certimage
    ON [ITORAMA].[dbo].[CertificateMaster].[Item] = certimage.[ITEMID]
    AND certimage.[Company] = 'mme'
LEFT JOIN [ITORAMA].[dbo].[Company] company
    ON [ITORAMA].[dbo].[CertificateMaster].[Company] = company.[Code]
WHERE [ITORAMA].[dbo].[CertificateMaster].[RecId] BETWEEN @from AND @to
ORDER BY [ITORAMA].[dbo].[CertificateMaster].[RecId]
