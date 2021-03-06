SELECT [ITORAMA].[dbo].[CertificateMaster].[RecId] AS 'id'
      , [ITORAMA].[dbo].[CertificateMaster].[Name] AS 'name'
      , [ITORAMA].[dbo].[CertificateMaster].[SKU] AS 'sku'
      , UPPER([ITORAMA].[dbo].[CertificateMaster].[Item]) AS 'reference'
      , ISNULL(cert.[AGENCYID], '') AS 'agency'
      , 'CER' AS 'type'
      , [ITORAMA].[dbo].[CertificateMaster].[Site] AS 'site'
      , [ITORAMA].[dbo].[CertificateMaster].[SiteName] AS 'siteName'
      , [ITORAMA].[dbo].[CertificateMaster].[Warehouse] AS 'warehouse'
      , [ITORAMA].[dbo].[CertificateMaster].[WarehouseName] AS 'warehouseName'
      , [ITORAMA].[dbo].[CertificateMaster].[CertificateCreateDate] AS 'itemCreatedDate'
      , [ITORAMA].[dbo].[CertificateMaster].[Company] AS 'company'
      , ISNULL(company.[Name], '') AS 'companyName'
      , ISNULL(certimage.[FILENAME], '') AS 'imageName'
      , ISNULL(certimage.[FILETYPE], '') AS 'imageType'
      , ISNULL(certimage.[TYPEID], '') AS 'imageTypeId'
      , ISNULL(certimage.[Company], '') AS 'imageCompany'
      , ISNULL(certimage.[DEFAULTIMAGE], 0) AS 'defaultImage'
      , ISNULL(certimage.[LASTMODIFIEDDATE], '') AS 'lastModifiedDate'
FROM [ITORAMA].[dbo].[CertificateMaster]
LEFT JOIN [ITORAMA].[dbo].[ItemCertificates] cert
  ON [ITORAMA].[dbo].[CertificateMaster].[Item] = cert.[CERTIFICATIONNO]
LEFT JOIN [ITORAMA].[dbo].[ItemImages] certimage
    ON [ITORAMA].[dbo].[CertificateMaster].[Item] = certimage.[ITEMID]
    AND certimage.[Company] = 'mme'
    AND certimage.[TYPEID] in ('Image','COA','DBC','Monograph')
LEFT JOIN [ITORAMA].[dbo].[Company] company
    ON [ITORAMA].[dbo].[CertificateMaster].[Company] = company.[Code]
WHERE [ITORAMA].[dbo].[CertificateMaster].[RecId] BETWEEN @from AND @to
ORDER BY [ITORAMA].[dbo].[CertificateMaster].[RecId]
