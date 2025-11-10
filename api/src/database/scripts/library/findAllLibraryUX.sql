SELECT
    l.id,
    l.name,
    l.description,
    COUNT(lb.book_id) AS book_count
FROM
    library l
    JOIN library_book lb ON l.id = lb.library_id
GROUP BY
    l.id,
    l.name,
    l.description
;