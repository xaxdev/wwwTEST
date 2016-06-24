USE [ITORAMA]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [03_Jewelry]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON

  BEGIN TRANSACTION
  IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Jewelry]') AND type in (N'U'))
  BEGIN
    TRUNCATE TABLE [dbo].[Jewelry]
  END
  ELSE
  BEGIN
    CREATE TABLE [dbo].[Jewelry](
	    [ItemReference] [nvarchar](20) NOT NULL,
	    [Name] [nvarchar](1000) NULL,
	    [Type] [nvarchar](20) NOT NULL,
	    [DominantStone] [nvarchar](20) NOT NULL,
	    [Size] [nvarchar](10) NOT NULL,
	    [SetReference] [nvarchar](20) NOT NULL,
      [CreatedDate] [datetime] NOT NULL
    ) ON [PRIMARY]
  END
  
  INSERT INTO [dbo].[Jewelry]
          ([ItemReference]
          ,[Name]
          ,[Type]
          ,[DominantStone]
          ,[Size]
          ,[SetReference]
          ,[CreatedDate])
  SELECT 
          [Reference]
          ,[DESCRIPTION]
          ,[Type]
          ,[DominantStone]
          ,[Size]
          ,[SetReference]
          , GETUTCDATE()
  FROM [MWD_DB].[dbo].[CRWMOLJEWELRY]

  COMMIT TRANSACTION
END
