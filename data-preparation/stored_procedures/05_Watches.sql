USE [ITORAMA]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [05_Watches]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON

  BEGIN TRANSACTION
  IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Watches]') AND type in (N'U'))
  BEGIN
    TRUNCATE TABLE [dbo].[Watches]
  END
  ELSE
  BEGIN
    CREATE TABLE [dbo].[Watches](
	    [ItemReference] [nvarchar](20) NOT NULL,
	    [DESCRIPTION] [nvarchar](1000) NULL,
	    [Type] [nvarchar](20) NOT NULL,
	    [MetalType] [nvarchar](20) NOT NULL,
	    [MetalColor] [nvarchar](20) NOT NULL,
	    [SERIALNUMBER] [nvarchar](20) NOT NULL,
	    [Movement] [nvarchar](20) NOT NULL,
	    [Complication] [nvarchar](20) NOT NULL,
	    [StrapType] [nvarchar](10) NOT NULL,
	    [StrapColor] [nvarchar](20) NOT NULL,
	    [DialIndex] [nvarchar](20) NOT NULL,
	    [DialColor] [nvarchar](20) NOT NULL,
	    [DialMetal] [nvarchar](20) NOT NULL,
	    [BuckleType] [nvarchar](20) NOT NULL,
	    [IsLimited] [int] NOT NULL,
	    [LimitedEdition] [nvarchar](20) NOT NULL,
	    [ProductionDate] [datetime2](3) NULL,
      [CreatedDate] [datetime] NOT NULL
    ) ON [PRIMARY]
  END
  
  INSERT INTO [dbo].[Watches]
           ([ItemReference]
           ,[DESCRIPTION]
           ,[Type]
           ,[MetalType]
           ,[MetalColor]
           ,[SERIALNUMBER]
           ,[Movement]
           ,[Complication]
           ,[StrapType]
           ,[StrapColor]
           ,[DialIndex]
           ,[DialColor]
           ,[DialMetal]
           ,[BuckleType]
           ,[IsLimited]
           ,[LimitedEdition]
           ,[ProductionDate]
           ,[CreatedDate])
  SELECT 
        [Reference]
        ,[DESCRIPTION]
        ,[Type]
        ,[MetalType]
        ,[MetalColor]
        ,[SERIALNUMBER]
        ,[Movement]
        ,[Complication]
        ,[StrapType]
        ,[StrapColor]
        ,[DialIndex]
        ,[DialColor]
        ,[DialMetal]
        ,[BuckleType]
        ,[IsLimited]
        ,[LimitedEdition]
        ,[ProductionDate]
        , GETUTCDATE()
  FROM [MWD_DB].[dbo].[CRWMOLWATCH]
  
  COMMIT TRANSACTION
END
