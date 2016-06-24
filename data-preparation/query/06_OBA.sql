USE [ITORAMA]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [06_OBA]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON

  BEGIN TRANSACTION
  IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[OBA]') AND type in (N'U'))
  BEGIN
    TRUNCATE TABLE [dbo].[OBA]
  END
  ELSE
  BEGIN
    CREATE TABLE [dbo].[OBA](
	    [ItemReference] [nvarchar](20) NOT NULL,
	    [Dimensions] [nvarchar](10) NOT NULL,
	    [Type] [nvarchar](20) NOT NULL,
      [CreatedDate] [datetime] NOT NULL
    ) ON [PRIMARY]
  END
  
  INSERT INTO [dbo].[OBA]
           ([ItemReference]
           ,[Dimensions]
           ,[Type]
           ,[CreatedDate])
  SELECT 
        [REFERENCE]
        ,[Dimensions]
        ,[Type]
        , GETUTCDATE()
  FROM [MWD_DB].[dbo].[CRWMOLOBA]
  
  COMMIT TRANSACTION
END
