USE [ITORAMA]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [02_ItemGemstones]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON

  BEGIN TRANSACTION
  IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ItemGemstones]') AND type in (N'U'))
  BEGIN
    TRUNCATE TABLE [dbo].[ItemGemstones]
  END
  ELSE
  BEGIN
    CREATE TABLE [dbo].[ItemGemstones](
      [Id] [int] NOT NULL,
	    [ItemReference] [nvarchar](20) NOT NULL,
	    [GemstoneId] [nvarchar](20) NOT NULL,
	    [Clarity] [nvarchar](20) NOT NULL,
	    [Cut] [nvarchar](20) NOT NULL,
	    [Color] [nvarchar](20) NOT NULL,
	    [Certificate] [nvarchar](60) NOT NULL,
	    [Quantity] [decimal](32, 16) NOT NULL,
	    [Carat] [decimal](32, 16) NOT NULL,
	    [Origin] [nvarchar](10) NOT NULL,
	    [Symmetry] [nvarchar](20) NOT NULL,
	    [Fluorescence] [nvarchar](20) NOT NULL,
	    [Cost] [decimal](32, 16) NOT NULL,
      [CreatedDate] [datetime] NOT NULL
    ) ON [PRIMARY]
  END

  INSERT INTO [dbo].[ItemGemstones]
           ([Id]
           ,[ItemReference]
           ,[GemstoneId]
           ,[Clarity]
           ,[Cut]
           ,[Color]
           ,[Certificate]
           ,[Quantity]
           ,[Carat]
           ,[Origin]
           ,[Symmetry]
           ,[Fluorescence]
           ,[Cost]
           ,[CreatedDate])
   SELECT ROW_NUMBER() OVER (ORDER BY [Reference]) AS Id
          ,  [Reference]
          , [ITEMID]
          , [CLARITYCODE]
          , [CUTCODE]
          , [COLOURCODE]
          , [CERTIFICATIONNO]
          , [QTY]
          , [PDSCWQTY]
          , [ORIGINCODE]
          , [SYMMETRYCODE]
          , [FLUORESCENCECODE]
          , [ACTUALCVALUE]
          , GETUTCDATE()
  FROM [MWD_DB].[dbo].[CRWMOLITEMGEMSTONE]
  ORDER BY [Reference]

  COMMIT TRANSACTION
END
