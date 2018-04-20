SELECT [Id]  AS 'id'
      ,[AccountNumber] AS 'accountNumber'
      ,ISNULL([FirstName], '') AS 'firstName'
      ,ISNULL([LastName], '') AS 'lastName'
      ,ISNULL([MiddleName], '') AS 'middleName'
      ,ISNULL([RetailMobilePrimary], '') AS 'retailMobilePrimary'
      ,ISNULL([RetailMobileSecondary], '') AS 'retailMobileSecondary'
      ,ISNULL([Email], '') AS 'email'
FROM  [ITORAMA].[dbo].[Customers]
WHERE [Id] BETWEEN @from AND @to
ORDER BY [Id]
--GROUP BY [AccountNumber],[FirstName],[LastName],[MiddleName],[RetailMobilePrimary],[RetailMobileSecondary],[Email]
