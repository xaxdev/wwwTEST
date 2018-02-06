SELECT 	[ARTICLE_GROUPING] AS name,
		CASE [ARTICLE_GROUPING]
		WHEN 'SET' THEN 'JLY'
		WHEN 'Gents' THEN 'JLY'
		WHEN 'Ladies' THEN 'JLY'
		WHEN 'Gents Watch' THEN 'WAT'
		WHEN 'Ladies Watch' THEN 'WAT'
		WHEN 'Stones' THEN 'STO'
		WHEN 'Accessories' THEN 'ACC'
		WHEN 'OBA' THEN 'OBA'
		WHEN 'Spareparts' THEN 'SPA'
		ELSE ''
		END AS catalog
FROM 	[MWD_DB].[dbo].[INVENTTABLE]
WHERE 	[ARTICLE_GROUPING] <> ''
GROUP BY [ARTICLE_GROUPING]