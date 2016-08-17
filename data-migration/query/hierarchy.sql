WITH HIERARCHY  AS
(
 SELECT ROW_NUMBER() OVER(ORDER BY [ITO_CATEGORYPATH]) AS [id]
     ,[NAME] AS 'name'
     ,[ITO_PARENTCATEGORYPATH] AS 'parent'
     ,[ITO_CATEGORYPATH] AS 'path'
     ,CASE
         WHEN [ITO_CATEGORYPATH] LIKE 'Mouawad Inventory\Merchandise\Jewelry%' THEN 'Jewelry'
         WHEN [ITO_CATEGORYPATH] LIKE 'Mouawad Inventory\Merchandise\Stone%' THEN 'Stone'
         WHEN [ITO_CATEGORYPATH] LIKE 'Mouawad Inventory\Merchandise\Watch%' THEN 'Watch'
         WHEN [ITO_CATEGORYPATH] LIKE 'Mouawad Inventory\Merchandise\OBA%' THEN 'OBA'
         WHEN [ITO_CATEGORYPATH] LIKE 'Mouawad Inventory\Merchandise\Accessories%' THEN 'Accessories'
         WHEN [ITO_CATEGORYPATH] LIKE 'Mouawad Inventory\Merchandise\Spare%' THEN 'Spare'
         ELSE ''
      END AS [type]
 FROM [MWD_DB].[dbo].[ECORESCATEGORY]
)

SELECT *
FROM HIERARCHY
ORDER BY path
