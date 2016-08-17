SELECT ROW_NUMBER() OVER(ORDER BY [ITO_CATEGORYPATH]) AS [id]
      ,[NAME] AS 'name'
      ,[ITO_PARENTCATEGORYPATH] AS 'parent'
      ,[ITO_CATEGORYPATH] AS 'path'
      ,CASE
          WHEN [ITO_CATEGORYPATH] LIKE '%Jewelry%' THEN 'Jewelry'
          WHEN [ITO_CATEGORYPATH] LIKE '%Stone%' THEN 'Stone'
          WHEN [ITO_CATEGORYPATH] LIKE '%Watch%' THEN 'Watch'
          WHEN [ITO_CATEGORYPATH] LIKE '%OBA%' THEN 'OBA'
          WHEN [ITO_CATEGORYPATH] LIKE '%Accessories%' THEN 'Accessories'
          WHEN [ITO_CATEGORYPATH] LIKE '%Spare%' THEN 'Spare'
          ELSE ''
       END AS [type]
FROM [MWD_DB].[dbo].[ECORESCATEGORY]
ORDER BY path
