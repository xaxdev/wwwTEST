USE [ITORAMA]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [01_Items]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON

  BEGIN TRANSACTION
  IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Items]') AND type in (N'U'))
  BEGIN
    TRUNCATE TABLE [dbo].[Items]
  END
  ELSE
  BEGIN
    CREATE TABLE [dbo].[Items](
	    [Id] [bigint] NOT NULL,
	    [Reference] [nvarchar](20) NOT NULL,
	    [Name] [nvarchar](60) NULL,
	    [Description] [nvarchar](1000) NULL,
	    [Company] [nvarchar](4) NULL,
	    [Warehouse] [nvarchar](10) NOT NULL,
	    [WarehouseName] [nvarchar](60) NULL,
	    [Collection] [nvarchar](20) NOT NULL,
	    [Brand] [nvarchar](20) NOT NULL,
	    [Vendor] [nvarchar](20) NULL,
	    [MetalType] [nvarchar](20) NOT NULL,
	    [MetalColor] [nvarchar](20) NOT NULL,
	    [DominantStone] [nvarchar](20) NOT NULL,
	    [ItemCreatedDate] [datetime2](3) NULL,
	    [Hierarchy] [nvarchar](254) NOT NULL,
	    [SKU] [nvarchar](20) NOT NULL,
	    [VendorItemReferance] [nvarchar](20) NOT NULL,
	    [Quantity] [decimal](32, 16) NOT NULL,
	    [GrossWeight] [decimal](32, 16) NOT NULL,
	    [MustHave] [int] NOT NULL,
	    [Markup] [decimal](32, 16) NOT NULL,
	    [ActualCostUSD] [decimal](32, 3) NULL,
	    [UpdatedCostUSD] [decimal](32, 3) NULL,
	    [PriceUSD] [decimal](32, 3) NULL,
	    [ActualCostNonUSD] [decimal](32, 16) NOT NULL,
	    [UpdatedCostNonUSD] [decimal](32, 16) NOT NULL,
	    [PriceNonUSD] [decimal](32, 16) NOT NULL,
      [Site] [nvarchar](10) NOT NULL,
      [CreatedDate] [datetime] NOT NULL
    ) ON [PRIMARY]
  END

  INSERT INTO [dbo].[Items]
      ([Id]
      ,[Reference]
      ,[Name]
      ,[Description]
      ,[Company]
      ,[Warehouse]
      ,[WarehouseName]
      ,[Collection]
      ,[Brand]
      ,[Vendor]
      ,[MetalType]
      ,[MetalColor]
      ,[DominantStone]
      ,[ItemCreatedDate]
      ,[Hierarchy]
      ,[SKU]
      ,[VendorItemReferance]
      ,[Quantity]
      ,[GrossWeight]
      ,[MustHave]
      ,[Markup]
      ,[ActualCostUSD]
      ,[UpdatedCostUSD]
      ,[PriceUSD]
      ,[ActualCostNonUSD]
      ,[UpdatedCostNonUSD]
      ,[PriceNonUSD]
      ,[Site]
      ,[CreatedDate])
  SELECT
      i.[RECID]
      , [Reference]
      , i.[Name]
      , [DESCRIPTION]
      , UPPER([CompnayId])
      , [WAREHOUSE]
      , [WarehouseName]
      , [COLLECTIONCODE]
      , [BRANDCODE]
      , [Vendor]
      , [MetalType]
      , [MetalColor]
      , [DominantStone]
      , [ItemCreatedDate]
      , [ProductHierarchy]
      , [ItemName]
      , [VendorItemReferance]
      , [Quantity]
      , [GROSSWEIGHT]
      , [MUSTHAVE]
      , [Markup]
      , [GroupCostUSD]
      , [UpdatedCostTUSD]
      , [PublicPriceUSD]
      , [GroupCost]
      , [UpdatedCost]
      , [PublicPrice]
      , w.[INVENTSITEID]
      , GETUTCDATE()
  FROM [MWD_DB].[dbo].[CRWMOLINVENTORYMASTERS] i
  INNER JOIN [MWD_DB].[dbo].[CRWWAREHOUSE] w
     ON i.[WAREHOUSE] = w.[INVENTLOCATIONID]

  COMMIT TRANSACTION
END
