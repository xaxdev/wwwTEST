SELECT 	[Article_Grouping] AS name,
		CASE [Article_Grouping]
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
FROM 	[ITORAMA].[dbo].[Items]
WHERE 	[Article_Grouping] <> ''
GROUP BY [Article_Grouping]
