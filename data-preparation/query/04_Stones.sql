USE [ITORAMA]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [04_Stones]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON

  BEGIN TRANSACTION
  IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Stones]') AND type in (N'U'))
  BEGIN
    TRUNCATE TABLE [dbo].[Stones]
  END
  ELSE
  BEGIN
    CREATE TABLE [dbo].[Stones](
	    [ItemReference] [nvarchar](20) NOT NULL,
	    [Name] [nvarchar](20) NULL,
	    [Cut] [nvarchar](20) NULL,
	    [Color] [nvarchar](20) NULL,
	    [Clarity] [nvarchar](20) NULL,
	    [LotNumber] [nvarchar](20) NOT NULL,
	    [Quantity] [decimal](32, 16) NOT NULL,
	    [Carat] [decimal](32, 16) NOT NULL,
	    [Type] [varchar](50) NULL,
      [CreatedDate] [datetime] NOT NULL
    ) ON [PRIMARY]
  END
  
  INSERT INTO [dbo].[Stones]
           ([ItemReference]
           ,[Name]
           ,[Cut]
           ,[Color]
           ,[Clarity]
           ,[LotNumber]
           ,[Quantity]
           ,[Carat]
           ,[Type]
           ,[CreatedDate])
  
  SELECT 
        [REFERENCE]
        ,[NAMEALIAS]
        ,[CUT]
        ,[COLOR]
        ,[CLARITY]
        ,[LOTNUMBER]
        ,[QTY]
        ,[TOTALCARATWEIGHT]
        ,[TYPENAME]
        , GETUTCDATE()
  FROM [MWD_DB].[dbo].[CRWMOLSTONE]

  COMMIT TRANSACTION
END
